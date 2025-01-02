"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";

const Signup = () => {
	const router = useRouter();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);
		try {
			// Replace with your backend API endpoint
			const response = await axios.post("http://localhost:8080/register", {
				first_name: firstName,
				last_name: lastName,
				username,
				email,
				password
			});

			console.log("Signup success:", response.data);
			alert("Signup successful! Check your email to confirm your account");
			router.push("/");
		} catch (err: any) {
			setError(err.response?.data?.error || "An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="mx-auto w-full max-w-md rounded-md bg-white p-6 shadow-md" onSubmit={handleSignup}>
			<h2 className="mb-4 text-xl font-bold">Sign Up</h2>
			{error && <p className="mb-4 text-red-500">{error}</p>}
			<div className="mb-4">
				<label htmlFor="firstName" className="block text-sm font-medium">
					First Name
				</label>
				<Input
					id="firstName"
					type="text"
					placeholder="Enter your first name"
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="lastName" className="block text-sm font-medium">
					Last Name
				</label>
				<Input
					id="lastName"
					type="text"
					placeholder="Enter your last name"
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="lastName" className="block text-sm font-medium">
					Username
				</label>
				<Input
					id="username"
					type="text"
					placeholder="Enter your Username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium">
					Email
				</label>
				<Input
					id="email"
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={e => setEmail(e.target.value)}
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
			<div className="mb-4">
				<label htmlFor="confirmPassword" className="block text-sm font-medium">
					Confirm Password
				</label>
				<Input
					id="confirmPassword"
					type="password"
					placeholder="Confirm your password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
				/>
			</div>
			<Button type="submit" disabled={loading}>
				{loading ? "Signing up..." : "Sign Up"}
			</Button>
		</form>
	);
};

export default Signup;
