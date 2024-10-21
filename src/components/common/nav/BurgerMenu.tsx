import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { ListItem } from "./Navbar";
import Link from "next/link";

export type BurgerMenuProps = {
	isOpen: boolean;
	menu: ListItem[];
};

const BurgerMenu: React.FC<BurgerMenuProps> = (props: BurgerMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const [menuHeight, setMenuHeight] = useState<number>(0);
	const [mobileNotifCenter, setMobileNotifCenter] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (menuRef.current && menuRef.current.offsetHeight > 0) {
				setMenuHeight(menuRef.current.offsetHeight);
			}
			if (!props.isOpen) {
				setTimeout(() => setMobileNotifCenter(false), 500);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [props.isOpen]);
	return (
		<div
			ref={menuRef}
			className={cn(
				"z-1 gap- absolute left-0 flex min-h-fit  w-full flex-col justify-between bg-white px-6  py-2 transition-all duration-500 ease-in md:hidden md:pt-4 lg:hidden"
			)}
			style={{ top: `${props.isOpen ? "100%" : `-${menuHeight}px`}` }}
		>
			<div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-center">
				{props.menu.map(menu => (
					<Link
						href={menu.path}
						key={menu.path}
						className="border-b-0 py-1 text-lg font-medium transition-all duration-200 hover:scale-125 hover:text-main-purple"
					>
						{menu.list}
					</Link>
				))}
			</div>
		</div>
	);
};

export default BurgerMenu;
