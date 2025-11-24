"use client";

import { useCallback } from "react";
import CategoryProductsPage from "@/components/custom/Category/CategoryProductsPage";
import { Cake } from "@/types/cake";

const CakesPage: React.FC = () => {
	const filterCakes = useCallback((product: Cake) => {
		const category = (product.category_name ?? "").toLowerCase();
		return category.includes("cake") && !category.includes("cupcake");
	}, []);

	return (
		<CategoryProductsPage
			title="Our Cakes"
			description="Explore our signature cakes — crafted for celebrations big and small, baked with care, and ready to delight."
			filter={filterCakes}
			emptyMessage="No cakes are available right now. Please check back soon!"
		/>
	);
};

export default CakesPage;
