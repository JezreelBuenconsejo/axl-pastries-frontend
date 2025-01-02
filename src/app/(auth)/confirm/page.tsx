"use client";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const ConfirmPage = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	// Extract `username` and `code` from search params
	const username = useMemo(() => searchParams.get("username"), [searchParams]);
	const code = useMemo(() => searchParams.get("code"), [searchParams]);

	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState("");

	useEffect(() => {
		const confirmAccount = async () => {
			if (!code || !username) {
				setStatus("Invalid confirmation link.");
				setLoading(false);
				return;
			}

			try {
				const response = await axios.post("http://localhost:8080/confirm", {
					code,
					username
				});

				if (response.status === 200) {
					setStatus("Account confirmed successfully! Redirecting to login...");
					setTimeout(() => {
						router.push("/login");
					}, 3000); // Redirect to login after 3 seconds
				} else {
					setStatus("Failed to confirm account. Please try again or contact support.");
				}
			} catch (error) {
				console.error("Error confirming account:", error);
				setStatus("Failed to confirm account. Please try again or contact support.");
			} finally {
				setLoading(false);
			}
		};

		confirmAccount();
	}, [code, username, router]);

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
			<div className="max-w-lg rounded-md bg-white p-6 text-center shadow-md">
				{loading ? (
					<h1 className="text-2xl font-bold text-gray-700">Confirming your account...</h1>
				) : (
					<h1 className="text-2xl font-bold text-gray-700">{status}</h1>
				)}
			</div>
		</div>
	);
};

export default ConfirmPage;
