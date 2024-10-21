import { OrderIcon } from "../../common/icons/icons";
import React from "react";

export type ProductList = {
  img: string;
  category: string;
  name: string;
  weight: number;
  price: number;
};

type FeaturedProductCardProps = {
  img: string;
  category: string;
  name: string;
  weight: number;
  price: number;
};
const FeaturedProductCard: React.FC<FeaturedProductCardProps> = (props) => {
  return (
    <div className="rounded-lg shadow-md p-6 w-full md:w-[293px] h-[369px] flex flex-col justify-between">
      <div className="flex justify-center w-fit mx-auto">
        <img src={props.img} alt="" />
      </div>
      <span className="text-[#878787] pointer-events-none select-none">{props.category}</span>
      <h3 className="text-2xl font-bold leading-7 pointer-events-none select-none">{props.name}</h3>
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-1 pointer-events-none select-none">
          <span className="text-[#878787]">{props.weight}kg</span>
          <h5 className="text-lg font-bold leading-5">P{props.price}</h5>
        </div>
        <button className="rounded-full p-3.5 border border-main-purple group hover:bg-main-purple">
          <OrderIcon
            heightAndWidth={24}
            class="transition-all duration-150 stroke-main-purple fill-main-purple group-hover:stroke-white group-hover:fill-white"
          />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
