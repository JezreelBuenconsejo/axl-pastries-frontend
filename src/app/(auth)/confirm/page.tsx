"use client";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import AxlPastriesClient from "@/client/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaSpinner } from "react-icons/fa";
import { cn } from "@/lib/utils";

const ConfirmComponent: React.FC = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const username = useMemo(() => searchParams.get("username"), [searchParams]);
	const code = useMemo(() => searchParams.get("code"), [searchParams]);

	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		const confirmAccount = async () => {
			if (!code || !username) {
				setStatus("Invalid confirmation link.");
				setLoading(false);
				return;
			}

			try {
				const response = await AxlPastriesClient.confirmAccount(code, username);

				if (response.status === 200) {
					setStatus("Account confirmed successfully! Redirecting to login...");
					setIsSuccess(true);
					setTimeout(() => {
						router.push("/login");
					}, 2500);
				} else {
					setStatus("Failed to confirm account. Please try again or contact support.");
					setIsSuccess(false);
				}
			} catch (error) {
				console.error("Error confirming account:", error);
				setStatus("Failed to confirm account. Please try again or contact support.");
				setIsSuccess(false);
			} finally {
				setLoading(false);
			}
		};

		confirmAccount();
	}, [code, username, router]);

	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
			<div className="max-w-lg rounded-lg bg-white p-8 text-center shadow-lg">
				{loading ? (
					<div className="flex flex-col items-center justify-center gap-2">
						<FaSpinner className="mb-4 h-12 w-12 animate-spin fill-main-purple motion-reduce:animate-[spin_1.5s_linear_infinite]" />
						<h1 className="text-2xl font-bold text-gray-700">Confirming your account...</h1>
					</div>
				) : (
					<Alert variant={isSuccess ? "default" : "destructive"}>
						<AlertTitle
							className={cn("text-2xl font-bold", isSuccess ? "text-main-purple" : "text-red-500")}
						>
							{isSuccess ? "Success" : "Error"}
						</AlertTitle>
						<AlertDescription>
							<div className="flex flex-col items-center justify-center gap-2">
								{status}{" "}
								{isSuccess && (
									<FaSpinner className="h-5 w-5 animate-spin fill-main-purple motion-reduce:animate-[spin_1.5s_linear_infinite]" />
								)}
							</div>
						</AlertDescription>
					</Alert>
				)}
			</div>
		</div>
	);
};

const ConfirmPage: React.FC = () => {
	return (
		<Suspense fallback={<div>Loading confirmation page...</div>}>
			<ConfirmComponent />
		</Suspense>
	);
};

export default ConfirmPage;
