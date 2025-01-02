"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResetPassword = () => {
	const searchParams = useSearchParams();
	const username = searchParams.get("username");
	const resetCode = searchParams.get("code");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post("http://localhost:8080/reset-password", {
				code: resetCode,
				password,
				username
			});

			setMessage(response.data.message);
			setError("");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.error || "An error occurred. Please try again.");
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
			setMessage("");
		}
	};

	return (
		<form
			onSubmit={handleResetPassword}
			className="mx-auto w-full max-w-md space-y-4 rounded-md bg-white p-6 shadow-md"
		>
			<Input
				type="password"
				value={password}
				placeholder="Enter new password"
				onChange={e => setPassword(e.target.value)}
			/>
			<Input
				type="password"
				value={confirmPassword}
				placeholder="Confirm new password"
				onChange={e => setConfirmPassword(e.target.value)}
			/>
			<Button type="submit">Reset Password</Button>
			{message && (
				<div>
					<p className="mt-2 text-green-500">{message}</p> <Link href="/login">Login</Link>
				</div>
			)}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};

export default ResetPassword;
