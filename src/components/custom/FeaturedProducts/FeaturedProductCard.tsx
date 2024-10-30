import { OrderIcon } from "../../common/icons/icons";
import React from "react";

type FeaturedProductCardProps = {
	img?: string;
	category: string;
	name: string;
	price: number;
};
const FeaturedProductCard: React.FC<FeaturedProductCardProps> = props => {
	return (
		<div className="my-1 flex w-full flex-col justify-between rounded-lg p-6 shadow-md md:w-[293px]">
			<div className="mx-auto flex w-fit justify-center">
				<img
					className="aspect-square rounded-cakeShape border-2 border-main-purple object-cover"
					src={props.img}
					alt=""
					width={undefined}
				/>
			</div>
			<span className="pointer-events-none select-none text-[#878787]">{props.category}</span>
			<h3 className="pointer-events-none select-none text-2xl font-bold leading-7">{props.name}</h3>
			<div className="flex justify-between">
				<div className="pointer-events-none flex select-none flex-col justify-center gap-1">
					<h5 className="text-lg font-bold leading-5">Starts @ P{props.price}</h5>
				</div>
				<button className="group rounded-full border border-main-purple p-3.5 hover:bg-main-purple">
					<OrderIcon
						heightAndWidth={24}
						class="fill-main-purple stroke-main-purple transition-all duration-150 group-hover:fill-white group-hover:stroke-white"
					/>
				</button>
			</div>
		</div>
	);
};

export default FeaturedProductCard;
