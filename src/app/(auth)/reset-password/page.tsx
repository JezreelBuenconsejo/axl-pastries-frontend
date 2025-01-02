"use client";
import React, { useState, useMemo, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResetPasswordComponent = () => {
	const searchParams = useSearchParams();

	// Extract `username` and `resetCode` from search params
	const username = useMemo(() => searchParams.get("username"), [searchParams]);
	const resetCode = useMemo(() => searchParams.get("code"), [searchParams]);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Handler for resetting the password
	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setMessage("");
			return;
		}

		// Ensure `username` and `resetCode` are valid
		if (!username || !resetCode) {
			setError("Invalid reset link. Please try again.");
			setMessage("");
			return;
		}

		setLoading(true); // Start loading state
		try {
			const response = await axios.post("http://localhost:8080/reset-password", {
				code: resetCode,
				password,
				username
			});

			setMessage(response.data.message || "Password reset successfully!");
			setError("");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.error || "An error occurred. Please try again.");
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
			setMessage("");
		} finally {
			setLoading(false); // End loading state
		}
	};

	return (
		<form
			onSubmit={handleResetPassword}
			className="mx-auto w-full max-w-md space-y-4 rounded-md bg-white p-6 shadow-md"
		>
			<h1 className="text-center text-xl font-bold">Reset Your Password</h1>

			<Input
				type="password"
				value={password}
				placeholder="Enter new password"
				onChange={e => setPassword(e.target.value)}
				required
			/>
			<Input
				type="password"
				value={confirmPassword}
				placeholder="Confirm new password"
				onChange={e => setConfirmPassword(e.target.value)}
				required
			/>
			<Button type="submit" disabled={loading} className="w-full">
				{loading ? "Resetting..." : "Reset Password"}
			</Button>

			{message && (
				<div className="mt-4 text-center">
					<p className="text-green-500">{message}</p>
					<Link href="/login" className="text-blue-500 underline">
						Go to Login
					</Link>
				</div>
			)}
			{error && <p className="mt-2 text-center text-red-500">{error}</p>}
		</form>
	);
};

const ResetPassword: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResetPasswordComponent />
		</Suspense>
	);
};

export default ResetPassword;
