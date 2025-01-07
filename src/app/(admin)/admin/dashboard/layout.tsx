"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { supabase } from "@/client/supabase";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const verifyAdmin = async () => {
			// Fetch current user from Supabase
			const { data: { user }, error } = await supabase.auth.getUser();

			if (error || !user) {
				console.error("Error fetching user or user not found:", error);
				router.push("/admin/login");
				return;
			}

			// Check if the user has the "admin" role in metadata
			const role = user.user_metadata?.role;
			if (role !== "admin") {
				alert("You are not an admin");
				router.push("/dashboard");
				return;
			}

			// Set username from user data
			setUsername(user.user_metadata.full_name ?? "Admin");
			setLoading(false);
		};

		verifyAdmin();
	}, [router]);

	if (loading) {
		return (
			<div className="flex h-screen flex-col items-center justify-center gap-3">
				<FaSpinner className="animate-spin" />
				<p>Loading</p>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen w-full">
			<aside className="w-30 hidden bg-main-lightPurple p-4 text-main-purple md:block">
				<h2 className="mb-6 text-2xl font-bold capitalize">{username}</h2>
				<nav>
					<ul className="space-y-4 font-semibold text-main-purple transition-colors duration-300">
						<li>
							<Link href="/admin/dashboard/" className="hover:text-gray-950">
								Dashboard
							</Link>
						</li>
						<li>
							<Link href="/admin/dashboard/cakes" className="hover:text-gray-950">
								Cakes
							</Link>
						</li>
						<li>
							<Link href="/admin/dashboard/categories" className="hover:text-gray-950">
								Categories
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<main className="flex-1 overflow-auto overflow-x-hidden bg-gray-100 p-8">{children}</main>
		</div>
	);
}
