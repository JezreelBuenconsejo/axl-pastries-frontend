import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type ContentWrapperProps = {
	className?: string;
	children: ReactNode;
};
const ContentWrapper: React.FC<ContentWrapperProps> = props => {
	return (
		<section className={cn("my-24 flex flex-col justify-center px-5 lg:px-20", props.className)}>
			{props.children}
		</section>
	);
};

export default ContentWrapper;
