"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { AdminLoginRequest } from "@/types/auth";
import AxlPastriesClient from "@/client/client";
import { FaSpinner } from "react-icons/fa";

// Define validation schema using Zod
const formSchema: z.ZodType<AdminLoginRequest> = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await AxlPastriesClient.adminLogin(values);
      localStorage.setItem("token", res.token as string);
      localStorage.setItem("username", values.username);
      router.push("/admin/dashboard");
      setIsLoading(false);
    } catch {
      setError(`Login Failed`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-center text-2xl font-bold">Admin Login</h2>
        <Form {...form} >
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage  />
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
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
            <div>
              
            <Button type="submit" className="w-full mt-4 bg-main-purple py-2 text-xl font-medium text-white">
              {isLoading ? <FaSpinner className="animate-spin h-7" /> : "Login"}
            </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
