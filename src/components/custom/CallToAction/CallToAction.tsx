import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import React from "react";
import Phone from "~/public/assets/images/cta/phone.png";

const CallToAction: React.FC = () => {
	return (
		<section className="mx-auto my-24 flex w-full max-w-[1440px] px-5 lg:px-20">
			<div className="relative flex w-full flex-col justify-between rounded-2xl bg-gradient-to-r from-[#ECD9FF] via-[#BCF7FF] to-[#ECD9FF] px-11 py-14 md:flex-row">
				<div className="mx-auto flex flex-col gap-6 text-center md:mx-0 md:max-w-[271px] md:text-start xl:max-w-none">
					<h3 className="text-2xl font-bold leading-7 lg:text-3xl">Order by phone number</h3>
					<a href="tel:9751152891" className="text-base font-medium leading-5 hover:text-main-purple">
						(+63)975 115 2891
					</a>
				</div>
				<img
					alt="Phone"
					src={Phone.src}
					className="mx-auto h-auto w-full max-w-[363px] md:absolute md:bottom-1/2 md:left-1/2 md:-translate-x-1/2 md:translate-y-[55%]"
				/>
				<Button onClick={() => {
					toast({
						title: "Coming Soon!",
						description: "Currently under development.",
						duration: 3000
					});
				}} className="hover:bg-main-lightblue my-auto h-fit rounded-xl bg-main-purple px-10 py-3.5 text-xl font-semibold leading-normal text-white transition-all duration-300 hover:border hover:border-black hover:text-black">
					Order Now!
				</Button>
			</div>
		</section>
	);
};

export default CallToAction;
