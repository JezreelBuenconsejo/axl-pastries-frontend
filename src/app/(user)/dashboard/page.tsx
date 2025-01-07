"use client";

import { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/client/supabase";
import useAuthStore from "@/app-store/AuthStore";

const CustomerDashboard = () => {
	const { isLoggedIn, token, setAuth, clearAuth } = useAuthStore();
	const [userDetails, setUserDetails] = useState<{ email: string | null; name: string | null }>({
		email: null,
		name: null
	});
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const initializeUser = async () => {
			let localToken = localStorage.getItem("token");

			// Check if `access_token` is present in URL
			if (!localToken) {
				const urlHash = window.location.hash;
				const queryParams = new URLSearchParams(urlHash.replace("#", ""));
				const accessToken = queryParams.get("access_token");

				if (accessToken) {
					// Store token in localStorage and Zustand
					localStorage.setItem("token", accessToken);
					setAuth(accessToken);
					console.log("Login success:", accessToken);
					// Clear hash from URL
					window.history.replaceState({}, document.title, window.location.pathname);
					localToken = accessToken;
				}
			}

			// If no token, redirect to login
			if (!localToken) {
				clearAuth();
				router.push("/login");
				return;
			}

			const { data: user, error } = await supabase.auth.getUser(localToken);

			if (error || !user) {
				console.error("Error fetching user details:", error);
				clearAuth();
				router.push("/login");
				return;
			}

			const userName =
				user.user.user_metadata.name ||
				`${user.user.user_metadata.first_name || ""} ${user.user.user_metadata.last_name || ""}`.trim() ||
				"Customer";

			// Update Zustand and local state
			setAuth(localToken);
			setUserDetails({
				email: user.user.email || "No Email",
				name: userName
			});

			setLoading(false);
		};

		initializeUser();
	}, [clearAuth, router, setAuth]);

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error("Error during logout:", error);
			return;
		}
		localStorage.clear();
		clearAuth();
		router.push("/login");
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="flex w-full items-center justify-center">
			<Card className="w-full max-w-lg bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg">
				<CardHeader>
					<CardTitle className="text-center text-2xl font-extrabold text-gray-800">
						Welcome, {userDetails.name ?? "Customer"}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<p className="text-lg font-medium">Email: {userDetails.email}</p>
						<Button
							className="w-full rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default CustomerDashboard;
