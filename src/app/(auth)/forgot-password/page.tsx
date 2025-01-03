"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AxlPastriesClient from "@/client/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address")
});

const ForgotPassword = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);
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
			const response = await AxlPastriesClient.forgotPassword(values.email);
			setMessage(response.message);
			setDialogOpen(true);
		} catch (err) {
			console.error(err);
			setError("An error occurred. Please try again.");
			setDialogOpen(true);
		}
		setIsLoading(false);
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
										<FormControl className="border-black">
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
				</CardContent>
			</Card>

			{/* Alert Dialog */}
			<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<AlertDialogContent className="bg-white">
					<AlertDialogHeader>
						<AlertDialogTitle className={cn("text-2xl", error ? "text-red-500" : "text-main-purple")}>
							{error ? "Error" : "Success"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{error || (
								<div className="flex flex-col gap-1">
									{message}{" "}
									<Link href="/" className="font-medium text-blue-500 underline">
										Go back to Home
									</Link>
								</div>
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

export default ForgotPassword;
