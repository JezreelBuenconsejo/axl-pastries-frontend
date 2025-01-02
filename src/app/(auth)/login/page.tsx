"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
    const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			// Replace with your backend API endpoint
			const response = await axios.post("http://localhost:8080/login", {
				username,
				password
			});

			console.log("Login success:", response.data);

			localStorage.setItem("token", response.data.token);
			localStorage.setItem("username", username);

			// Redirect to the user dashboard
			router.push("/dashboard");
		} catch (err: any) {
			setError(err.response?.data?.error || "An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="mx-auto w-full max-w-md rounded-md bg-white p-6 shadow-md" onSubmit={handleLogin}>
			<h2 className="mb-4 text-xl font-bold">Login</h2>
			{error && <p className="mb-4 text-red-500">{error}</p>}
			<div className="mb-4">
				<label htmlFor="username" className="block text-sm font-medium">
					Username
				</label>
				<Input
					id="username"
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block text-sm font-medium">
					Password
				</label>
				<Input
					id="password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</div>
			<div className="flex items-center justify-between">
				<Button type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</Button>
				<div className="flex flex-col gap-2">
					<Link href="/forgot-password" className="text-sm text-blue-500">
						Forgot Password?
					</Link>
					<Link href="/signup" className="text-sm text-blue-500">
						Sign up
					</Link>
				</div>
			</div>
		</form>
	);
};

export default Login;
