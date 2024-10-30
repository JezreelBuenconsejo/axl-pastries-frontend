"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();

	// Logout function
	const handleLogout = () => {
		// Clear the stored username and token
		localStorage.removeItem("username");
		localStorage.removeItem("token");

		// Redirect to the login page after logout
		router.push("/admin/login");
	};

	return (
		<div className="dashboard overflow-hidden">
			<h1>Welcome, {localStorage.getItem("username")}</h1>
			<p className="break-all">Your token is: {localStorage.getItem("token")}</p>
			<Button className="mt-4 rounded bg-red-500 px-4 py-2 text-white" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}
