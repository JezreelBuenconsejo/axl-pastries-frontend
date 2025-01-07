"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/client/supabase";

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address")
});

const ForgotPassword = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: ""
		}
	});

	const handleForgotPassword = async (values: { email: string }) => {
		setIsLoading(true);
		setMessage("");
		setError("");

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
				redirectTo: `${window.location.origin}/reset-password`
			});

			if (error) {
				throw new Error(error.message);
			}

			setMessage("A password reset email has been sent to your email address.");
		} catch (err: unknown) {
			console.error(err);
			setError("Failed to send password reset email. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Card className="w-full max-w-md bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-extrabold text-gray-800">Forgot Password</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input placeholder="Enter your email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full py-2" disabled={isLoading}>
								{isLoading ? "Loading..." : "Submit"}
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

export default ForgotPassword;
