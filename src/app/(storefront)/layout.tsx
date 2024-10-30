import Footer from "@/components/common/footer/Footer";
import { Navbar } from "@/components/common/nav/Navbar";
import { MenuList } from "@/constants/menu";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar menu={MenuList} />
			<main className="flex flex-col items-center justify-between overflow-x-hidden">{children}</main>
			<Footer />
		</>
	);
}
