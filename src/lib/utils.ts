import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleFileInputChange<T extends File | File[] | null>(
	e: React.ChangeEvent<HTMLInputElement>,
	setFile: React.Dispatch<React.SetStateAction<T>>,
	isArray?: boolean
) {
	if (e.target.files && e.target.files.length > 0) {
		const files = isArray ? Array.from(e.target.files) : e.target.files[0];
		setFile(files as T);
	}
}
