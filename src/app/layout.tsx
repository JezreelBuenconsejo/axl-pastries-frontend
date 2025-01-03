import type { Metadata } from "next";
import "./globals.css";
import favicon from "~/public/favicon.ico";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
	title: "Axl Pastries",
	description: "Cakes and desserts for you!",
	icons: {
		icon: favicon.src
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-h-screen overflow-x-hidden antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
