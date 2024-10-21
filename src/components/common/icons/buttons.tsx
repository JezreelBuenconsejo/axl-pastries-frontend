import { cn } from "@/lib/utils";

export interface BurgerIconProps {
	isOpen: boolean;
}

export const BurgerIcon = ({ isOpen }: BurgerIconProps) => {
	return (
		<div className="flex h-4 w-full max-w-10 flex-col justify-between">
			<span
				className={cn(
					"block h-0.5 w-full transform rounded-lg bg-current text-black transition duration-500 ease-in-out",
					{
						"translate-y-1.5 rotate-45": isOpen,
						"rotate-0": !isOpen
					}
				)}
			/>
			<span
				className={cn(
					"block h-0.5 w-full transform rounded-lg bg-current text-black transition duration-200 ease-in-out",
					{
						"opacity-0": isOpen,
						"opacity-100": !isOpen
					}
				)}
			/>
			<span
				className={cn(
					"block h-0.5 w-full transform rounded-lg bg-current text-black transition duration-500 ease-in-out",
					{
						"-translate-y-2 -rotate-45": isOpen,
						"rotate-0": !isOpen
					}
				)}
			/>
		</div>
	);
};
