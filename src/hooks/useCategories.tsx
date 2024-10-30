import { useState, useEffect } from "react";
import AxlPastriesClient from "@/client/client";
import { Category } from "@/types/categories";

export function useCategories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);

	async function fetchCategories() {
		setCategoriesLoading(true);
		const data = await AxlPastriesClient.getCategories();
		setCategories(data);
		setCategoriesLoading(false);
	}
	useEffect(() => {
		fetchCategories();
	}, []);

	return { categories, fetchCategories, categoriesLoading };
}
