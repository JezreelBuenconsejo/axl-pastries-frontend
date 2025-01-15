"use client";

import ResetPassword from "@/components/custom/auth/ResetPassword";
import VerifyEmail from "@/components/custom/auth/VerifyEmail";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const ModePageContent: React.FC = () => {
	const searchParams = useSearchParams();
	const mode = searchParams.get("mode");

	if (mode === "resetPassword") {
		return <ResetPassword />;
	} else if (mode === "verifyEmail") {
		return <VerifyEmail />;
	} else {
		return (
			<div className="flex h-screen items-center justify-center">
				<h1 className="text-xl font-bold text-red-500">Invalid or missing mode parameter.</h1>
			</div>
		);
	}
};

const ModePage: React.FC = () => {
	return (
		<Suspense
			fallback={
				<div className="flex h-screen items-center justify-center">
					<h1 className="text-xl font-bold text-gray-700">Loading...</h1>
				</div>
			}
		>
			<ModePageContent />
		</Suspense>
	);
};

export default ModePage;
