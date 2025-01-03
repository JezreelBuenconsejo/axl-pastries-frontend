"use client";

import React, { useState, useMemo, Suspense } from "react";
import AxlPastriesClient from "@/client/client";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordComponent = () => {
  const searchParams = useSearchParams();

  const username = useMemo(() => searchParams.get("username"), [searchParams]);
  const resetCode = useMemo(() => searchParams.get("code"), [searchParams]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    isError: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
	setIsLoading(true);
    if (!username || !resetCode) {
      setDialogContent({
        title: "Error",
        description: "Invalid reset link. Please try again.",
        isError: true,
      });
      setDialogOpen(true);
      return;
    }

    try {
      const response = await AxlPastriesClient.resetPassword(resetCode, values.password, username);
      setDialogContent({
        title: "Success",
        description: response.message || "Password reset successfully!",
        isError: false,
      });
      setDialogOpen(true);
    } catch (err) {
      console.error(err);
      setDialogContent({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        isError: true,
      });
      setDialogOpen(true);
    }
	setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center w-full">
      <Card className="w-full max-w-md shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-extrabold text-gray-800">Reset Your Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm new password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full py-2" disabled={isLoading}>
                {isLoading ? "Loading..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Alert Dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-1">
              {dialogContent.description}
              {!dialogContent.isError && (
                <Link href="/login" className="font-medium text-blue-500 underline">
                  {" "}
                  Go to Login
                </Link>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const ResetPassword: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default ResetPasswordComponent;
