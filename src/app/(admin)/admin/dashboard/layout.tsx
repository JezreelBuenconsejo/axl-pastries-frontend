"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import AxlPastriesClient from "@/client/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const verifyAdmin = async () => {
			const storedToken = localStorage.getItem("token");

			if (!storedToken) {
				router.push("/admin/login");
				return;
			}

			try {
				const response = await AxlPastriesClient.verifyAdmin();

				if (response.role !== "admin") {
					alert("You are not an admin")
					router.push("/dashboard");
					throw new Error("Unauthorized");
				}

				setUsername(response.username); // Assuming username is returned
				setLoading(false);
			} catch (error) {
				console.log(error);
				alert("You are not an admin")
				router.push("/dashboard");
			}
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
			<aside className="hidden w-30 bg-main-lightPurple p-4 text-main-purple md:block">
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
