import type { Metadata } from "next";
import "./globals.css";
import favicon from "~/public/favicon.ico";

export const metadata: Metadata = {
  title: "Axl Pastries",
  description: "Cakes and desserts for you!",
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
