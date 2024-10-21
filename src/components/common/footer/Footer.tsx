"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "../icons/logo";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { HiMiniPaperAirplane } from "react-icons/hi2";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
	message: z.string().min(1, { message: "Required" })
});
const Footer: React.FC = () => {
	const d = new Date();
	const year = d.getFullYear();
	const logoRef = useRef<HTMLDivElement>(null);
	const brandsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (logoRef.current && brandsRef.current) {
			const logoWidth = logoRef.current.offsetWidth;
			const brandsWidth = brandsRef.current.offsetWidth;

			const maxWidth = Math.max(logoWidth, brandsWidth) + 2;

			logoRef.current.style.width = `${maxWidth}px`;
			brandsRef.current.style.width = `${maxWidth}px`;
		}
	}, []);
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: ""
		}
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}
	return (
		<footer className="bg-gradient-to-r from-main-lightPurple  via-main-skyBlue to-main-lightPurple p-6 px-5 lg:px-20">
			<div className="mx-auto flex max-w-[1440px] flex-col justify-between">
				<div className="flex flex-col justify-between md:flex-row md:items-center md:gap-2">
					<div className="flex w-fit items-center justify-center gap-6" id="logo" ref={logoRef}>
						<Logo />
						<span className="mt-2 whitespace-nowrap bg-gradient-to-r from-main-purple to-main-lightBlue bg-clip-text font-signika text-3xl font-bold text-transparent">
							Axl{"'"}s Pastries
						</span>
					</div>
					<span className="ml-12 hidden whitespace-nowrap text-lg font-medium md:block lg:ml-0">
						2020 - {year} Axl{"'"}s Pastries
					</span>

					<Separator orientation="horizontal" className="my-4 block bg-black md:hidden" />

					<div className="mb-4 flex justify-start gap-4 md:mb-0 md:justify-end" id="brands" ref={brandsRef}>
						<Link href={"https://www.facebook.com/AxlsMomPastriesAndThrifties"}>
							<FaFacebookF className="transition-all duration-300 hover:fill-main-purple" />
						</Link>{" "}
						<Link href={"https://www.facebook.com/AxlsMomPastriesAndThrifties"}>
							<FaInstagram className="transition-all duration-300 hover:fill-main-purple" />
						</Link>{" "}
						<Link href={"https://www.facebook.com/AxlsMomPastriesAndThrifties"}>
							<FaTiktok className="transition-all duration-300 hover:fill-main-purple" />
						</Link>{" "}
					</div>
				</div>
				<Separator orientation="horizontal" className="mb-4 mt-6 hidden bg-black md:block" />
				<div className="grid gap-6 md:grid-cols-2 lg:flex">
					<ul className="mt-2 flex flex-1 flex-col gap-6 font-montserrat text-base font-medium">
						<li className="font-bold">About Us</li>
						<li>
							<Link href="/cooperation">Cooperation</Link>
						</li>
						<li>
							<Link href="/payment-and-delivery">Payment and Delivery</Link>
						</li>
						<li>
							<Link href="/returns-and-product-shortages">Returns and Product Shortages</Link>
						</li>
					</ul>
					<ul className="mt-2 flex  flex-1 flex-col gap-6 font-montserrat text-base font-medium">
						<li className="font-bold">Assortment</li>
						<li>
							<Link href="/cooperation">Cakes</Link>
						</li>
						<li>
							<Link href="/payment-and-delivery">Cupcakes</Link>
						</li>
						<li>
							<Link href="/returns-and-product-shortages">Desserts</Link>
						</li>
						<li>
							<Link href="/returns-and-product-shortages">Muffins</Link>
						</li>
					</ul>
					<ul className="mt-2 flex  flex-1 flex-col gap-6 font-montserrat text-base font-medium">
						<li className="font-bold">Contacts</li>
						<li>
							Address of facilities:{" "}
							<Link href="https://www.google.com/maps?ll=9.762002,118.74956&z=18&t=h&hl=en&gl=PH&mapclient=embed&q=9%C2%B045%2743.2%22N+118%C2%B044%2759.6%22E+9.762000,+118.749889@9.761999999999999,118.7498889">
								116 Andres Road, Barangay San Pedro, <br></br>
								Puerto Princesa City, Palawan 5300
							</Link>
						</li>
						<li>
							Contact phone number: <br></br>
							<Link href={"tel:09751152891"}>+63 975 115 2891</Link>
						</li>
					</ul>
					<div className="mt-2 flex  flex-1 flex-col gap-6 font-montserrat text-base font-medium">
						<span className="font-bold">Feedback to us:</span>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								<FormField
									control={form.control}
									name="message"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div className="flex items-center justify-between rounded-lg bg-white p-4">
													<Input
														type="text"
														placeholder="Write to us"
														className="flex h-auto w-full border-none p-0 text-base outline-none focus-visible:outline-none focus-visible:ring-white"
														{...field}
													/>
													<Button type="submit" variant="default" className="h-auto p-0">
														<HiMiniPaperAirplane className="h-4 w-4 transition-all duration-300 hover:fill-main-purple" />
													</Button>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</div>
				</div>

				<span className="mt-6 block text-base font-medium md:hidden">
					2020 - {year} Axl{"'"}s Pastries
				</span>
			</div>
		</footer>
	);
};

export default Footer;
