import type { Metadata } from "next";
import "./globals.css";
import favicon from "~/public/favicon.ico";

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
			<body className={`overflow-x-hidden antialiased min-h-screen`}>{children}</body>
		</html>
	);
}
