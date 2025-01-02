import Footer from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/nav/Navbar";
import { MenuList } from "@/constants/menu";

export default function UserLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col justify-between">
			<Navbar menu={MenuList} />
			<main className="flex flex-col items-center justify-between overflow-x-hidden py-2">{children}</main>
			<Footer />
		</div>
	);
}
