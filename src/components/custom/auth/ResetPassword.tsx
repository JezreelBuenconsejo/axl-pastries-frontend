"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [accessToken, setAccessToken] = useState<string | null>(null);
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

	useEffect(() => {
		// Check if the access token is in the fragment
		const fragment = window.location.hash.substring(1);
		const fragmentParams = new URLSearchParams(fragment);
		const token = fragmentParams.get("access_token");

		if (token) {
			// Move the token to the query parameters
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.set("access_token", token);
			window.history.replaceState(null, "", newUrl.toString());

			// Clear the fragment
			window.location.hash = "";

			setAccessToken(token);
			supabase.auth.setSession({
				access_token: token,
				refresh_token: ""
			});
		} else {
			// Check if the token is already in query parameters
			const tokenFromQuery = searchParams.get("access_token");
			if (tokenFromQuery) {
				setAccessToken(tokenFromQuery);
				supabase.auth.setSession({
					access_token: tokenFromQuery,
					refresh_token: ""
				});
			} else {
				setError("Invalid or missing reset token.");
			}
		}
	}, [searchParams]);

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
			// Update the user's password
			const { error: updateError } = await supabase.auth.updateUser({
				password: values.password
			});

			if (updateError) {
				throw new Error(updateError.message);
			}

			setMessage("Password reset successfully! You can now log in.");
			setTimeout(() => router.push("/login"), 3000); // Redirect after success
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				setError("Failed to reset password. Please try again.");
			} else {
				console.error("Unknown error:", err);
				setError("An unknown error occurred.");
			}
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
					{message && <p className="mt-4 text-center text-green-500">{message}</p>}
					{error && <p className="mt-4 text-center text-red-500">{error}</p>}
				</CardContent>
			</Card>
		</div>
	);
};

export default ResetPassword;
