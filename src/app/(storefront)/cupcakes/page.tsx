"use client";

import { useCallback } from "react";
import CategoryProductsPage from "@/components/custom/Category/CategoryProductsPage";
import { Cake } from "@/types/cake";

const CupcakesPage: React.FC = () => {
	const filterCupcakes = useCallback((product: Cake) => {
		const category = (product.category_name ?? "").toLowerCase();
		return category.includes("cupcake");
	}, []);

	return (
		<CategoryProductsPage
			title="Cupcakes"
			description="Small, sweet, and shareable — choose your favorite cupcake flavor and jump to the product page to order."
			filter={filterCupcakes}
			emptyMessage="No cupcakes are available right now. Please check back soon!"
		/>
	);
};

export default CupcakesPage;
