import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { ListItem } from "./Navbar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { UserCircle } from "lucide-react";
import { OrderIcon } from "../icons/icons";
import Link from "next/link";

export type BurgerMenuProps = {
	isOpen: boolean;
	menu: ListItem[];
	onNavigate?: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = (props: BurgerMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const [menuHeight, setMenuHeight] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => {
			if (menuRef.current && menuRef.current.offsetHeight > 0) {
				setMenuHeight(menuRef.current.offsetHeight);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [props.isOpen]);

	const accountClicked = () => {
		toast({
			title: "Account area coming soon",
			description: "We will let you sign in and track orders here.",
			duration: 3000
		});
	};
	return (
		<div
			ref={menuRef}
			className={cn(
				"z-1 gap- absolute left-0 flex min-h-fit w-full flex-col justify-between bg-white px-6 py-2 transition-all duration-500 ease-in md:hidden md:pt-4 lg:hidden"
			)}
			style={{ top: `${props.isOpen ? "100%" : `-${menuHeight}px`}` }}
		>
			<div className="mx-auto my-auto flex flex-col items-center justify-center gap-4 text-center w-full">
				{props.menu.map(menu => (
					<Button asChild variant="none" key={menu.path} className="border-b-0 py-1 text-lg font-medium transition-all duration-200 hover:scale-125 hover:text-main-purple">
						<Link href={menu.path} onClick={props.onNavigate}>
							{menu.list}
						</Link>
					</Button>
				))}

				<div className="flex items-center justify-center gap-4 py-5 border-t w-full">
					<Button asChild variant="none" className="group h-auto p-0">
						<Link href="/checkout" onClick={props.onNavigate}>
							<OrderIcon class="fill-main-purple stroke-main-purple transition-all duration-150 group-hover:fill-main-lightBlue group-hover:stroke-main-lightBlue" />
						</Link>
					</Button>
					<Button onClick={accountClicked} variant="none" className="group h-auto p-0">
						<UserCircle className="h-12 w-12 stroke-main-purple transition-all duration-150 group-hover:stroke-main-lightBlue" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
