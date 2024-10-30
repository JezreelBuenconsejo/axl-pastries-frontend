import React from "react";
import CategoryBG from "~/public/assets/images/category/categoryBG.png";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { ChevronRight } from "lucide-react";

type CategoryCardProps = {
	link: Url;
	categoryName: string;
	description?: string;
	img?: string;
};
const CategoryCard: React.FC<CategoryCardProps> = props => {
	return (
		<div className="mb-10 max-w-[368px]">
			<div className="relative">
				<img src={CategoryBG.src} alt="Background" className="h-[6.125rem] w-auto" />
				{props.img && (
					<img
						src={props.img}
						alt="Cake"
						className="absolute bottom-[1.875rem] left-1/2 h-auto w-[150px] -translate-x-1/2"
					/>
				)}
			</div>
			<div className="min-h-[218px] rounded-lg bg-[#F6F8FF] px-6 py-3.5">
				<div className="my-auto h-fit">
					<h3 className="mb-4 text-center text-2xl font-bold leading-6 text-black">{props.categoryName}</h3>
					{props.description && (
						<p className="mb-4 text-center text-lg font-medium leading-6 text-fontColor-gray">
							{props.description}
						</p>
					)}
					<Link
						className="group flex w-full items-center justify-center gap-2 rounded-xl border border-main-purple px-7 py-2.5 text-xl font-semibold text-main-purple transition-all duration-150 hover:bg-main-purple hover:text-white"
						href={props.link}
					>
						<span>Learn More</span>
						<ChevronRight className="stroke-main-purple transition-all duration-150 group-hover:stroke-white" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CategoryCard;
