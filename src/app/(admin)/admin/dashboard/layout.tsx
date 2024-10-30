"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		// If no token is found, redirect to the login page
		if (!storedToken) {
			router.push("/admin/login");
			return;
		}

		setLoading(false);
	}, []);

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
			<aside className="hidden w-48 bg-main-lightPurple p-4 text-main-purple md:block">
				<h2 className="mb-6 text-2xl font-bold">{localStorage.getItem("username")}</h2>
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
