"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";

type CategoryProductsPageProps = {
	title: string;
	description: string;
	filter: (product: Cake) => boolean;
	emptyMessage?: string;
};

const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({
	title,
	description,
	filter,
	emptyMessage = "No products available right now."
}) => {
	const [products, setProducts] = useState<Cake[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const cakes = await AxlPastriesClient.getCakes();
				setProducts(cakes);
			} catch (err) {
				console.error(err);
				setError("We couldn't load products. Please try again shortly.");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	const filteredProducts = useMemo(() => products.filter(filter), [products, filter]);

	return (
		<section className="w-full">
			<div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-14 lg:px-20">
				<header className="mx-auto max-w-3xl space-y-4 text-center">
					<h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
					<p className="text-lg text-fontColor-gray">{description}</p>
				</header>

				{loading ? (
					<div className="text-center text-lg text-fontColor-gray">Loading products...</div>
				) : error ? (
					<div className="text-center text-lg text-red-600">{error}</div>
				) : filteredProducts.length === 0 ? (
					<div className="text-center text-lg text-fontColor-gray">{emptyMessage}</div>
				) : (
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredProducts.map(product => (
							<Link
								key={product.id}
								href={`/product?id=${product.id}`}
								className="group flex flex-col overflow-hidden rounded-2xl border border-main-purple/15 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-main-purple hover:shadow-lg"
							>
								<div className="relative mb-4 aspect-square overflow-hidden bg-neutral-100">
									{product.featured_image_url ? (
										<img
											src={product.featured_image_url}
											alt={product.name}
											className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center text-sm text-fontColor-gray">
											Image coming soon
										</div>
									)}
								</div>
								<div className="flex flex-1 flex-col gap-2 px-5 pb-5">
									<span className="text-xs font-semibold uppercase tracking-wide text-main-purple">
										{product.category_name ?? "Pastry"}
									</span>
									<h3 className="text-xl font-bold leading-6 text-black">{product.name}</h3>
									{product.description && (
										<p className="text-sm leading-6 text-fontColor-gray">{product.description}</p>
									)}
									<div className="mt-auto flex items-center justify-between pt-2 text-base font-semibold">
										<span>Starts @ P{product.base_price}</span>
										<span className="text-main-purple transition-colors duration-150 group-hover:text-main-lightBlue">
											View product
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default CategoryProductsPage;
