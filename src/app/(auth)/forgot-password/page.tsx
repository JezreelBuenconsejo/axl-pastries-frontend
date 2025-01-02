"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AxlPastriesClient from "@/client/client";
import Link from "next/link";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError("");

		try {
			const response = await AxlPastriesClient.forgotPassword(email);
			setMessage(response.message);
		} catch (err) {
			console.log(err)
			setError("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-md rounded bg-white p-6 shadow-md">
			<h1 className="mb-4 text-2xl font-bold">Forgot Password</h1>
			<form onSubmit={handleForgotPassword} className="space-y-4">
				<div>
					<Label htmlFor="email" className="block text-sm font-medium">
						Email Address
					</Label>
					<Input
						type="email"
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
						className="mt-1 w-full rounded border p-2"
					/>
				</div>
				<Button type="submit" disabled={loading}>
					{loading ? "Sending..." : "Send Reset Link"}
				</Button>
				{message && (
					<div>
						<p className="mt-2 text-green-500">{message}</p> <Link href="/">Go back to Home</Link>
					</div>
				)}
				{error && <p className="mt-2 text-red-500">{error}</p>}
			</form>
		</div>
	);
};

export default ForgotPassword;
