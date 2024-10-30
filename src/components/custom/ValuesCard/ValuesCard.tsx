import React from "react";

type ValuesCardProps = {
	title: string;
	description?: string | string[];
	img?: React.ReactNode;
};
const ValuesCard: React.FC<ValuesCardProps> = props => {
	return (
		<div className="flex w-full max-w-[368px] flex-col items-center gap-4">
			{props.img}
			<h3 className="text-center text-2xl font-bold leading-7">{props.title}</h3>
			<div className="mb-4 text-center text-base font-medium leading-5 text-[#878787]">
				{Array.isArray(props.description) ? (
					<ul>{React.Children.toArray(props.description.map(item => <li>• {item}</li>))}</ul>
				) : (
					<p>{props.description}</p>
				)}
			</div>
		</div>
	);
};

export default ValuesCard;
