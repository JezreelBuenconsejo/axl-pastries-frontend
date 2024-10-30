import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoriesList } from "@/constants/categories";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";

const Categories: React.FC = () => {
	return (
		<section className="my-24 flex max-w-[1440px] flex-col justify-center px-5 lg:px-20">
			<div className="mt-16 grid gap-7 md:grid-cols-2">
				{CategoriesList.map((category, index) => (
					<div key={v4()} className={cn(index === 0 && "md:-mt-8", index % 2 === 0 && "md:-mt-16")}>
						<CategoryCard
							img={category.imageURL}
							categoryName={category.name}
							description={category.description}
							link={category.path}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default Categories;
