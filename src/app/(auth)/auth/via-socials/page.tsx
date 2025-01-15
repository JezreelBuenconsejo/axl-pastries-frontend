"use client";

import { useEffect } from "react";
import { supabase } from "@/client/supabase";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app-store/AuthStore";

const OAuthCallback = () => {
	const router = useRouter();
	const { setAuth } = useAuthStore();

	useEffect(() => {
		const updateUserMetadata = async () => {
			const fragment = new URLSearchParams(window.location.hash.substring(1));
			const accessToken = fragment.get("access_token");
			const refreshToken = fragment.get("refresh_token");

			if (!accessToken || !refreshToken) {
				console.error("Access token not found in the URL fragment.");
				router.push("/login");
				return;
			}

			// Set the session in Supabase
			const { error: sessionError } = await supabase.auth.setSession({
				access_token: accessToken,
				refresh_token: refreshToken
			});

			if (sessionError) {
				console.error("Error setting session:", sessionError.message);
				router.push("/login");
				return;
			}

			// Fetch user details after setting the session
			const { data: sessionData } = await supabase.auth.getSession();
			const user = sessionData?.session?.user;

			if (!user) {
				console.error("No user found in the session.");
				router.push("/login");
				return;
			}

			localStorage.setItem("token", accessToken);
			localStorage.setItem("username", user.email || "No Email");
			setAuth(accessToken, user.email || "No Email");

			const currentRole = user.user_metadata?.role;

			if (currentRole !== "user") {
				const { error: updateError } = await supabase.auth.updateUser({
					data: {
						role: "user"
					}
				});

				if (updateError) {
					console.error("Error updating metadata:", updateError.message);
				} else {
					console.log("Metadata updated successfully!");
				}
			} else {
				console.log("User already has role: 'user'. No update needed.");
			}

			// Redirect to the dashboard
			router.push("/dashboard");
		};

		updateUserMetadata();
	}, [router]);

	return <div>Completing OAuth...</div>;
};

export default OAuthCallback;
