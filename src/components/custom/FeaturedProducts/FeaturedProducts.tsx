"use client";
import React from "react";
import FeaturedProductCard, { ProductList } from "./FeaturedProductCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

type FeaturedProductsProps = {
	products: ProductList[];
};
const FeaturedProducts: React.FC<FeaturedProductsProps> = props => {
	return (
		<section className="mx-auto my-24  flex w-full max-w-[1440px] flex-col px-5 lg:px-20">
			<Carousel>
				<CarouselContent>
					{React.Children.toArray(
						props.products.map(item => (
							<CarouselItem  className="basis-[350px]">
								<FeaturedProductCard
									img={item.img}
									category={item.category}
									name={item.name}
									weight={item.weight}
									price={item.price}
								/>
							</CarouselItem>
						))
					)}
				</CarouselContent>
			</Carousel>
		</section>
	);
};

export default FeaturedProducts;
