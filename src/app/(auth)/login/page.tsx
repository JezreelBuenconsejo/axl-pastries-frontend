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
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/client/firebase";
import { FaFacebook } from "react-icons/fa";
import useAuthStore from "@/app-store/AuthStore";

// Schema for form validation using Zod
const loginSchema = z.object({
	email: z.string().min(1, {
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
	const { setAuth } = useAuthStore();

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const handleLogin = async (values: z.infer<typeof loginSchema>) => {
		setIsLoading(true);
		setError("");
		try {
			// Firebase sign-in
			const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

			// Token for API requests
			const token = await userCredential.user.getIdToken();
			const username = userCredential.user.displayName || values.email || "User";

			localStorage.setItem("token", token);
			localStorage.setItem("username", username);

			setAuth(token, username); // Set global state

			console.log("Login success:", userCredential.user);
			router.push("/dashboard");
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				setError(err.message || "An error occurred during login");
			} else {
				console.error("Unknown error:", err);
				setError("An unknown error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};
	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			console.log("Google Login Success:", result.user);

			const token = await result.user.getIdToken();
			const username = result.user.displayName || result.user.email || "Google User";

			localStorage.setItem("token", token);
			localStorage.setItem("username", username);

			setAuth(token, username); // Set global state

			router.push("/dashboard"); // Redirect to dashboard
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Google Login Error:", err.message);
				setError(err.message);
			} else {
				console.error("Unknown error:", err);
				setError("An unknown error occurred.");
			}
		}
	};

	const handleFacebookLogin = async () => {
		try {
			const result = await signInWithPopup(auth, facebookProvider);
			console.log("Facebook Login Success:", result.user);

			const token = await result.user.getIdToken();
			const username = result.user.displayName || result.user.email || "Facebook User";

			localStorage.setItem("token", token);
			localStorage.setItem("username", username);

			setAuth(token, username); // Set global state

			router.push("/dashboard"); // Redirect to dashboard
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error("Facebook Login Error:", err.message);
				setError(err.message);
			} else {
				console.error("Unknown error:", err);
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		<div className="mx-auto w-full max-w-md rounded-lg bg-gradient-to-tr from-blue-50 to-blue-100/50 p-8 shadow-lg">
			<h2 className="mb-6 text-center text-2xl font-extrabold text-main-purple">Welcome Back</h2>
			{error && <p className="mb-4 rounded-lg bg-red-100 p-3 text-center text-red-500">{error}</p>}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-semibold text-gray-700">Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email"
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
						<Button
							type="submit"
							className="w-full rounded-md py-2 font-semibold text-white"
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</div>
					<div className="mt-4 flex flex-col items-center gap-2 text-sm">
						<Link href="/forgot-password" className="text-blue-500 hover:underline">
							Forgot Password?
						</Link>
						<span>
							Don’t have an account?{" "}
							<Link href="/signup" className="text-blue-500 hover:underline">
								Sign up
							</Link>
						</span>
					</div>
				</form>
			</Form>

			<div className="mt-4 space-y-4">
				<Button
					onClick={handleGoogleLogin}
					className="w-full rounded-md border bg-white py-2 font-semibold text-black hover:bg-blue-600 hover:text-white"
				>
					Login with Google <img src="assets/images/google.png" alt="Google" className="w-10" />
				</Button>
				<Button
					onClick={handleFacebookLogin}
					className="group w-full rounded-md border bg-white py-2 font-semibold text-black hover:bg-blue-600 hover:text-white"
				>
					Login with Facebook <FaFacebook className="h-8 w-8 fill-blue-500 group-hover:fill-white" />
				</Button>
			</div>
		</div>
	);
};

export default Login;
