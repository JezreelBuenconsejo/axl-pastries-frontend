"use client";

import { useEffect, useState } from "react";
import { OrderIcon } from "../icons/icons";
import { BurgerIcon } from "../icons/buttons";
import { Logo } from "../icons/logo";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BurgerMenu from "./BurgerMenu";
import { UserCircle } from "lucide-react";
import useAuthStore from "@/app-store/AuthStore";
import { toast } from "@/hooks/use-toast";

export type ListItem = {
	list: string;
	path: string;
};
type NavbarProps = {
	menu: ListItem[];
};
export const Navbar: React.FC<NavbarProps> = props => {
	const [open, setOpen] = useState(false);

	const { isLoggedIn, setAuth } = useAuthStore();
	useEffect(() => {
		const token = localStorage.getItem("token");
		const userName = localStorage.getItem("username");
		if (token && userName) {
			setAuth(token, userName);
		}
	}, [setAuth, isLoggedIn]);

	const linkClicked = () => {
		toast({
			title: "Coming Soon!",
			description: "Currently under development.",
			duration: 3000,
		});
	}
	return (
		<section className="relative z-[2] font-montserrat">
			<nav className="relative z-10 mx-auto flex max-w-[1440px] justify-between bg-white p-6 px-5 lg:px-20">
				<Link className="flex w-fit items-center justify-center gap-3 md:gap-6" href={"/"}>
					<Logo />
					<span className="mt-2 bg-gradient-to-r from-main-purple to-main-lightBlue bg-clip-text font-signika text-xl font-bold text-transparent sm:text-3xl">
						Axl{"'"}s Pastries
					</span>
				</Link>
				<div className="z-10 flex items-center gap-2 md:gap-10">
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList className="mt-2 w-full flex-col gap-6 bg-white font-montserrat text-lg font-medium md:relative md:top-0 md:flex md:w-fit md:flex-row md:gap-4 md:border-none md:bg-transparent md:pb-0 lg:gap-8">
							{props.menu.map(menu => (
								<NavigationMenuItem
									key={menu.list}
									className="scale-100 transition-all duration-200 hover:scale-110"
								>
									<Button onClick={linkClicked} variant="none" className="p-0">
										<NavigationMenuLink className="text-lg border-b-0 py-1 transition-all duration-200 hover:scale-125 hover:text-main-purple">
											{menu.list}
										</NavigationMenuLink>
									</Button>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
					<div className="items-center justify-between gap-4 hidden sm:flex">
						<Button onClick={linkClicked} variant="none" className="group h-auto p-0">
							<OrderIcon class="fill-main-purple stroke-main-purple transition-all duration-150 group-hover:fill-main-lightBlue group-hover:stroke-main-lightBlue" />
						</Button>
						<Button onClick={linkClicked} variant="none" className="group h-auto p-0">
							<UserCircle className="h-12 w-12 stroke-main-purple transition-all duration-150 group-hover:stroke-main-lightBlue" />
						</Button>
					</div>

					<Button
						variant="none"
						className="mt-2 flex w-6 p-0 md:hidden"
						onClick={() => {
							setOpen(!open);
						}}
					>
						<BurgerIcon isOpen={open} />
					</Button>
				</div>
			</nav>
			<BurgerMenu isOpen={open} menu={props.menu} />
		</section>
	);
};
