"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import AxlPastriesClient from "@/client/client";

// Schema for form validation using Zod
const loginSchema = z.object({
	username: z.string().min(1, {
		message: "Username is required"
	}),
	password: z.string().min(1, {
		message: "Password is required"
	})
});

const Login = () => {
	const router = useRouter();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: ""
		}
	});

	const handleLogin = async (values: z.infer<typeof loginSchema>) => {
		setIsLoading(true);
		setError("");
		try {
			const response = await AxlPastriesClient.userLogin({
				username: values.username,
				password: values.password
			});

			console.log("Login success:", response.token);

			localStorage.setItem("token", response.token);
			localStorage.setItem("username", values.username);

			router.push("/dashboard");
		} catch (err) {
			console.log(err)
			setError("Username or Password is incorrect");
		}
		setIsLoading(false);
	};

	return (
		<div className="mx-auto w-full max-w-md rounded-lg bg-gradient-to-tr from-blue-50 to-blue-100/50 p-8 shadow-lg">
			<h2 className="mb-6 text-center text-2xl font-extrabold text-main-purple">Welcome Back</h2>
			{error && <p className="mb-4 rounded-lg bg-red-100 p-3 text-center text-red-500">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold text-gray-700">Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your username"
										{...field}
										className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									/>
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
								<FormLabel className="text-sm font-semibold text-gray-700">Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Enter your password"
										{...field}
										className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-center justify-between">
						<Button type="submit" className="w-full rounded-md py-2 font-semibold text-white" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</div>
					<div className="mt-4 flex flex-col items-center gap-2 text-sm">
						<Link href="/forgot-password" className="text-blue-500 hover:underline">
							Forgot Password?
						</Link>
						<span>Don’t have an account?{" "}
						<Link href="/signup" className="text-blue-500 hover:underline">
							Sign up
						</Link></span>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Login;
