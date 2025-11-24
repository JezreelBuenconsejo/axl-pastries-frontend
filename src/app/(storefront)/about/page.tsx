import ContentWrapper from "@/components/common/content-wrapper/ContentWrapper";

const AboutPage = () => {
	return (
		<section className="w-full bg-white">
			<div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-14 lg:px-20">
				<header className="space-y-4 text-center">
					<h1 className="text-4xl font-bold sm:text-5xl">About Axl{"'"}s Pastries</h1>
					<p className="text-lg text-fontColor-gray">
						We{"'"}re a neighborhood bakery bringing handcrafted cakes, cupcakes, and sweets to every celebration.
						From timeless classics to playful flavors, we bake with care, quality ingredients, and a lot of heart.
					</p>
				</header>

				<ContentWrapper className="flex flex-col gap-10 lg:flex-row">
					<div className="flex-1 space-y-5 rounded-2xl bg-neutral-100 p-8">
						<h2 className="text-2xl font-bold">Our Story</h2>
						<p className="text-base leading-7 text-fontColor-gray">
							Axl{"'"}s Pastries started with a single goal: to make every day feel like a special occasion.
							What began as weekend bakes for friends and family turned into a full kitchen dedicated to
							crafting cakes, cupcakes, and desserts that taste as good as they look.
						</p>
						<p className="text-base leading-7 text-fontColor-gray">
							We pair well-loved recipes with modern techniques, sourcing great ingredients and keeping
							our process intentional — so every slice, bite, and box that leaves our oven is something we{"'"}re proud of.
						</p>
					</div>

					<div className="flex-1 space-y-4 rounded-2xl border border-main-purple/15 p-8 shadow-sm">
						<h2 className="text-2xl font-bold">What We Believe</h2>
						<ul className="space-y-3 text-base leading-7 text-fontColor-gray">
							<li>• Quality first: we bake in small batches and choose ingredients we trust.</li>
							<li>• Inventive flavors: classics stay, but we love surprising twists and seasonal menus.</li>
							<li>• Made for sharing: designs that travel well and desserts sized for any gathering.</li>
							<li>• Warm service: we want ordering and pickup to feel as sweet as the desserts themselves.</li>
						</ul>
					</div>
				</ContentWrapper>
			</div>
		</section>
	);
};

export default AboutPage;
