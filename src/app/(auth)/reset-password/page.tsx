"use client";

import React, { useState, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/client/supabase";

const resetPasswordSchema = z
	.object({
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Password must be at least 6 characters")
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

const ResetPassword = () => {
  const urlHash = window.location.hash;
  const queryParams = new URLSearchParams(urlHash.replace("#", ""));
  const accessToken = queryParams.get("access_token");

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	});

	const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
		setIsLoading(true);
		setMessage("");
		setError("");

		if (!accessToken) {
			setError("Invalid or missing reset token. Please try again.");
			setIsLoading(false);
			return;
		}

		try {
			// Use Supabase to update the password using the access token
			const { error } = await supabase.auth.updateUser({
				password: values.password
			});

			if (error) {
				throw new Error(error.message);
			}

			setMessage("Password reset successfully! You can now log in.");
		} catch (err: unknown) {
			console.error(err);
			setError("Failed to reset password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-extrabold text-gray-800">
						Reset Your Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					{!accessToken ? (
						<p className="text-center text-red-500">Invalid or missing reset token. Please try again.</p>
					) : (
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
					)}
					{message && <p className="mt-4 text-center text-green-500">{message}</p>}
					{error && <p className="mt-4 text-center text-red-500">{error}</p>}
				</CardContent>
			</Card>
		</div>
	);
};

const ResetPasswordPage: React.FC = () => {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen items-center justify-center">
					<h1 className="text-xl font-bold text-gray-700">Loading...</h1>
				</div>
			}
		>
			<ResetPassword />
		</Suspense>
	);
};

export default ResetPasswordPage;
