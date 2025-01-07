"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { supabase } from "@/client/supabase";
import { FaSpinner } from "react-icons/fa";
import useAuthStore from "@/app-store/AuthStore";

// Define validation schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function AdminLogin() {
  const {setAuth} = useAuthStore();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError(null);

      // Supabase Admin Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw new Error("Invalid credentials");
      }

      if (data.session) {
        const token = data.session.access_token;

        // Store token and email in localStorage
        localStorage.setItem("token", token);
        setAuth(token);

        console.log("Admin Login Success:", data.user);
        router.push("/admin/dashboard");
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold">Admin Login</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <div>
              <Button
                type="submit"
                className="mt-4 w-full bg-main-purple py-2 text-xl font-medium text-white"
                disabled={isLoading}
              >
                {isLoading ? <FaSpinner className="h-7 animate-spin" /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
