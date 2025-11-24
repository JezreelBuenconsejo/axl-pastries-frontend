const faqs = [
	{
		question: "How do I order a cake or cupcakes?",
		answer:
			"Browse the Cakes or Cupcakes pages, choose a product, and you’ll be taken to the product page to confirm flavors, sizes, and quantities."
	},
	{
		question: "Do you offer custom designs?",
		answer:
			"Yes! Share your inspiration or event details and we’ll tailor flavors and designs. Reach out early so we can reserve a bake slot."
	},
	{
		question: "How far in advance should I place an order?",
		answer:
			"Most cakes and cupcakes can be prepared within 48 hours. For custom designs or large events, we recommend booking 5–7 days ahead."
	},
	{
		question: "Can you accommodate dietary preferences?",
		answer:
			"We can adjust certain recipes for less sugar, specific flavor swaps, or simple decorations. Let us know your needs and we’ll confirm options."
	},
	{
		question: "Do you deliver?",
		answer:
			"We offer scheduled pickups and partner deliveries within the area. Delivery availability depends on location and order size."
	}
];

const FAQPage = () => {
	return (
		<section className="w-full">
			<div className="mx-auto max-w-[900px] px-5 py-14 lg:px-10">
				<header className="space-y-3 text-center">
					<h1 className="text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
					<p className="text-lg text-fontColor-gray">
						Quick answers about ordering, timelines, and what to expect from Axl{"'"}s Pastries.
					</p>
				</header>

				<div className="mt-10 space-y-4">
					{faqs.map(item => (
						<details
							key={item.question}
							className="group rounded-2xl border border-main-purple/20 bg-white px-6 py-4 shadow-sm transition hover:border-main-purple"
						>
							<summary className="cursor-pointer list-none text-lg font-semibold text-black transition group-open:text-main-purple">
								{item.question}
							</summary>
							<p className="mt-3 text-base leading-7 text-fontColor-gray">{item.answer}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQPage;
