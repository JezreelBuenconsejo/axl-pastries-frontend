import React from "react";

type HeroProps = {
	backgroundPath?: string;
	heroImage?: string;
	title: string;
	subtile?: string;
};
const Hero: React.FC<HeroProps> = props => {
	const backgroundImage = props.backgroundPath ? { backgroundImage: `url('${props.backgroundPath}')` } : undefined;
	return (
		<section
			className={`mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 bg-cover bg-center px-5 py-5 md:flex-row md:justify-between md:gap-6 md:py-20 lg:min-h-[683px] lg:gap-4 lg:px-20 lg:py-12`}
			style={backgroundImage}
		>
			<div className="flex flex-1 flex-col gap-4 md:min-w-[400px] lg:gap-6">
				<h1 className="text-4xl font-bold lg:text-6xl lg:leading-tight">{props.title}</h1>
				{props.subtile && <p className="text-lg font-medium leading-6">{props.subtile}</p>}
			</div>
			<div className="flex">
				<img
					src={props.heroImage ? props.heroImage : ""}
					alt="Cake"
					className="aspect-video h-auto w-full max-w-[662px] rounded-landingPage object-cover"
				/>
			</div>
		</section>
	);
};

export default Hero;
