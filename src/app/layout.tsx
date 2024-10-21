import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/common/nav/Navbar";
import { MenuList } from "@/constants/menu";
import Footer from "@/components/common/footer/Footer";
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
      <body className={`antialiased`}>
        <Navbar menu={MenuList} />
        <main className="flex flex-col items-center justify-between overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
