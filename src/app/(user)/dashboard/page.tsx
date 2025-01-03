"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AxlPastriesClient from "@/client/client";

const CustomerDashboard = () => {
	const [userDetails, setUserDetails] = useState({
		username: "",
		firstName: "",
		lastName: "",
		email: ""
	});
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchUserDetails = async () => {
			const token = localStorage.getItem("token");

			if (!token) {
				router.push("/login");
				return;
			}

			try {
				const response = await AxlPastriesClient.getUserDetails();
				setUserDetails({
					username: response.username || "",
					firstName: response.first_name || "",
					lastName: response.last_name || "",
					email: response.email || ""
				});
			} catch (error) {
				console.error("Error fetching user details:", error);
				router.push("/login");
			} finally {
				setLoading(false);
			}
		};

		fetchUserDetails();
	}, [router]);

	const handleLogout = () => {
		localStorage.clear();
		router.push("/");
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
						Welcome, {userDetails.firstName} {userDetails.lastName}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<p className="text-lg font-medium">
							<span className="font-semibold">Username:</span> {userDetails.username}
						</p>
						<p className="text-lg font-medium">
							<span className="font-semibold">Email:</span> {userDetails.email}
						</p>
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
