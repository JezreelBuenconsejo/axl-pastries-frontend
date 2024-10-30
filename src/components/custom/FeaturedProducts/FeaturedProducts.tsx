"use client";
import React from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Cake } from "@/types/cake";

type FeaturedProductsProps = {
	products: Cake[];
};
const FeaturedProducts: React.FC<FeaturedProductsProps> = props => {
	return (
		<section className="mx-auto my-24 flex w-full max-w-[1440px] flex-col">
			<Carousel
				opts={{
					align: "start"
				}}
			>
				<CarouselContent className="first:pl-5 md:first:pl-20">
					{React.Children.toArray(
						props.products.map(item => (
							<CarouselItem className="px-5 sm:basis-[250px] md:basis-[350px]">
								<FeaturedProductCard
									img={item.featured_image_url}
									category={"Cake"}
									name={item.name}
									price={item.base_price}
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
