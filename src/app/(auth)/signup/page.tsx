"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider, sendVerificationEmail } from "@/client/firebase";
import { FaFacebook } from "react-icons/fa";
import useAuthStore from "@/app-store/AuthStore";

const signupSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		username: z.string().min(1, "Username is required"),
		email: z.string().email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Password must be at least 6 characters")
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"]
	});

const Signup = () => {
	const { setAuth } = useAuthStore();
	const router = useRouter();
	const [error, setError] = useState("");
	const [showSuccessDialog, setShowSuccessDialog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const handleSignup = async (values: z.infer<typeof signupSchema>) => {
		setIsLoading(true);
		setError("");
		try {
			// Firebase signup
			const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

			// Send email verification
			const user = userCredential.user;
			await sendVerificationEmail();

			// Retrieve the ID token
			const token = await user.getIdToken();
			console.log("Signup success:", user);

			setAuth(token, user.email || values.email);

			// Show success dialog
			setShowSuccessDialog(true);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				setError(err.message || "An error occurred during signup");
			} else {
				console.error("Unknown error:", err);
				setError("An unknown error occurred.");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignup = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);

			const token = await result.user.getIdToken();
			const username = result.user.displayName || result.user.email || "Google User";

			localStorage.setItem("token", token);
			localStorage.setItem("username", username);

			setAuth(token, username); // Set global state

			// Redirect to the dashboard
			router.push("/dashboard");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Google Sign-Up Error:", error.message);
				setError(error.message);
			} else {
				console.error("Unknown error:", error);
				setError("An unknown error occurred.");
			}
		}
	};

	const handleFacebookSignup = async () => {
		try {
			const result = await signInWithPopup(auth, facebookProvider);
			
			const token = await result.user.getIdToken();
			const username = result.user.displayName || result.user.email || "Facebook User";

			localStorage.setItem("token", token);
			localStorage.setItem("username", username);

			setAuth(token, username); // Set global state

			// Redirect to the dashboard
			router.push("/dashboard");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Facebook Sign-Up Error:", error.message);
				setError(error.message);
			} else {
				console.error("Unknown error:", error);
				setError("An unknown error occurred.");
			}
		}
	};

	return (
		<div className="mx-auto w-full max-w-lg rounded-lg bg-gradient-to-tr from-blue-50 to-blue-100/50 p-8 shadow-lg">
			<h2 className="mb-6 text-center text-2xl font-extrabold text-main-purple">Create an Account</h2>
			{error && (
				<Alert variant="destructive" className="mb-6">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your first name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter your last name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="Enter your username" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
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
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Confirm your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="hover:bg-main-purple-hover w-full rounded-md bg-main-purple py-2 font-semibold text-white"
						disabled={isLoading}
					>
						{isLoading ? "Signing Up..." : "Sign Up"}
					</Button>
				</form>
			</Form>
			<div className="mt-4 space-y-4">
				<Button
					onClick={handleGoogleSignup}
					className="w-full rounded-md border bg-white py-2 font-semibold text-black hover:bg-blue-600 hover:text-white"
				>
					Sign Up with Google <img src="assets/images/google.png" alt="Google" className="w-10" />
				</Button>
				<Button
					onClick={handleFacebookSignup}
					className="group w-full rounded-md border bg-white py-2 font-semibold text-black hover:bg-blue-600 hover:text-white"
				>
					Sign Up with Facebook <FaFacebook className="h-8 w-8 fill-blue-500 group-hover:fill-white" />
				</Button>
			</div>
			{/* Success Dialog */}
			<AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
				<AlertDialogContent className="bg-white">
					<AlertDialogHeader>
						<AlertDialogTitle>Signup Successful!</AlertDialogTitle>
						<AlertDialogDescription>
							Your account has been created successfully. Please check your email to confirm your account.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button
							onClick={() => {
								router.push("/");
								setShowSuccessDialog(false);
							}}
							className="w-full"
						>
							Back to Home
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default Signup;
