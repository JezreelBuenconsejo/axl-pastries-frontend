"use client";

import AxlPastriesClient from "@/client/client";
import ContentWrapper from "@/components/common/content-wrapper/ContentWrapper";
import { Certified, GoodPrice, HighQuality } from "@/components/common/icons/icons";
import CallToAction from "@/components/custom/CallToAction/CallToAction";
import Categories from "@/components/custom/Category/Categories";
import FeaturedProducts from "@/components/custom/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/custom/Hero/Hero";
import ValuesCard from "@/components/custom/ValuesCard/ValuesCard";
import { Cake } from "@/types/cake";
import { useEffect, useState } from "react";
import heroImg from "~/public/assets/images/hero/Hero.jpg";
import heroBG from "~/public/assets/images/hero/heroBG.png";

export default function Home() {
	const [products, setProducts] = useState<Cake[] | []>([]);
	const heroVideoSrc = `./assets/hero_vid.mp4`;
	const fetchCakes = async () => {
		try {
			const cakes = await AxlPastriesClient.getCakes();
			setProducts(cakes);
		} catch (error) {
			console.error("Failed to fetch cakes:", error);
		}
	};
	useEffect(() => {
		fetchCakes();
	}, []);
	return (
		<>
			<Hero
				backgroundPath={heroBG.src}
				heroImage={heroImg.src}
				title="Delicious cakes and desserts for you!"
				subtile="We have a large selection of delicious cakes, desserts and pastries. Suitable for both holidays and regular days. Delicious!"
			/>
			<Categories />
			<ContentWrapper className="my-0 mb-24 w-full">
				<div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 rounded-3xl border border-main-purple/10 bg-gradient-to-br from-main-purple/10 via-white to-main-lightBlue/10 p-6 shadow-lg md:flex-row md:items-center md:gap-10 md:p-10">
					<div className="space-y-3 md:w-2/5">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-main-purple/80">Inside the kitchen</p>
						<h2 className="text-3xl font-bold sm:text-4xl">See how your treats come to life</h2>
						<p className="text-base text-fontColor-gray">
							Take a quick peek at our bakers crafting the cakes, cupcakes, and pastries you love. Fresh ingredients, careful
							details, and a lot of heart—all right here in Puerto Princesa City.
						</p>
						<ul className="space-y-2 text-sm text-main-purple">
							<li>• Local ingredients, baked daily</li>
							<li>• Custom designs and heartfelt messages</li>
							<li>• Delivery routes focused on Puerto Princesa City</li>
						</ul>
					</div>
					<div className="relative w-full overflow-hidden rounded-3xl border border-white/60 bg-black shadow-2xl md:w-3/5">
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-main-purple/30 via-transparent to-main-lightBlue/20" />
						<video
							className="aspect-video w-full rounded-2xl bg-black object-cover"
							src={heroVideoSrc}
							autoPlay
							muted
							loop
							playsInline
						/>
						<div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-main-purple shadow-md">
							Kitchen reel
						</div>
					</div>
				</div>
			</ContentWrapper>
			<ContentWrapper className="mb-24 mt-0 flex max-w-[1440px] gap-10 md:flex-row md:gap-5">
				<ValuesCard
					title="Good price"
					img={<GoodPrice />}
					description="We create affordable prices due to well-established processes, modern energy-efficient production, and direct wholesale purchases of ingredients."
				/>
				<ValuesCard
					title="A high quality"
					img={<HighQuality />}
					description={[
						"Modern production",
						"Own production of blanks for desserts",
						"The best suppliers of raw materials",
						"Own logistics",
						"Own wide network of stores"
					]}
				/>
				<ValuesCard
					title="All products are certified"
					img={<Certified />}
					description="Our products pass all modern quality checks. Every ingredient, every product is checked by state quality guarantors and our long-standing reputation."
				/>
			</ContentWrapper>
			<CallToAction />

			<FeaturedProducts products={products} />
		</>
	);
}
