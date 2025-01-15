"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/client/supabase";
import { FaSpinner } from "react-icons/fa";
import { AlertDialog, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const VerifyEmail: React.FC = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const accessToken = searchParams.get("access_token");

	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		if (!accessToken) {
			setStatus("Invalid verification link.");
			setIsSuccess(false);
			setLoading(false);
			return;
		}

		supabase.auth
			.verifyOtp({
				token_hash: accessToken,
				type: "signup"
			})
			.then(({ error }) => {
				if (error) {
					console.error("Error verifying email:", error.message);
					setStatus(
						error.message.includes("expired") || error.message.includes("invalid")
							? "Verification link is expired or invalid."
							: "Failed to verify email. Please try again or contact support."
					);
					setIsSuccess(false);
				} else {
					setStatus("Email verified successfully!");
					setIsSuccess(true);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [accessToken]);

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
			<div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
				{loading ? (
					<div className="flex flex-col items-center justify-center gap-2">
						<FaSpinner className="mb-4 h-12 w-12 animate-spin fill-main-purple motion-reduce:animate-[spin_1.5s_linear_infinite]" />
						<h1 className="text-2xl font-bold text-gray-700">Verifying your email...</h1>
					</div>
				) : (
					<AlertDialog open={true}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className={isSuccess ? "text-main-purple" : "text-red-500"}>
									{isSuccess ? "Success" : "Error"}
								</AlertDialogTitle>
								<AlertDialogDescription>{status}</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<Button
									onClick={() => {
										router.push(isSuccess ? "/login" : "/");
									}}
									className="w-full"
								>
									{isSuccess ? "Go to Login" : "Go to Home"}
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)}
			</div>
		</div>
	);
};

export default VerifyEmail;
