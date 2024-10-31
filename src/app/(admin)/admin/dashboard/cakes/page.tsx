"use client";

import React, { useEffect, useRef, useState } from "react";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";
import AddCakeDialog from "@/components/custom/admin/Cake/AddCakeDialog";
import { CakeDataTable } from "@/components/custom/admin/Cake/CakeTable";
import { cakeColumns } from "@/components/custom/admin/Cake/CakeColumns";
import { useCategories } from "@/hooks/useCategories";

export default function CakesPage() {
	const [cakes, setCakes] = useState<Cake[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { categories } = useCategories();
	const [cakeDetails, setCakeDetails] = useState<Cake>({
		name: "",
		flavor: "",
		description: "",
		base_price: 0,
		category_id: categories[0]?.id ?? 0
	});
	const [featuredImage, setFeaturedImage] = useState<File | null>(null);
	const [images, setImages] = useState<File[]>([]);
	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	// Fetch cakes on page load
	useEffect(() => {
		async function fetchCakes() {
			setIsLoading(true);
			try {
				const data = await AxlPastriesClient.getCakes();
				console.log(data);
				setCakes(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch cakes", error);
				setIsLoading(false);
			}
		}
		fetchCakes();
	}, []);

	// Handle form submission for adding a new cake
	const handleAddCake = async () => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("name", cakeDetails.name);
		formData.append("flavor", cakeDetails.flavor);
		formData.append("base_price", cakeDetails.base_price.toString());
		formData.append("category_id", cakeDetails.category_id.toString());

		if (cakeDetails.description) {
			formData.append("description", cakeDetails.description);
		}
		if (featuredImage) {
			formData.append("featured_image", featuredImage);
		}
		if (images.length > 0) {
			for (const image of images) {
				formData.append("images", image);
			}
		}

		try {
			await AxlPastriesClient.addCake(formData);
			const updatedCakes = await AxlPastriesClient.getCakes();
			setCakes(updatedCakes);
			setCakeDetails({
				name: "",
				flavor: "",
				description: "",
				base_price: 0,
				category_id: categories[0]?.id ?? 0
			});
			setFeaturedImage(null);
			dialogCloseRef.current?.click();
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to add cake", error);
			setIsLoading(false);
		}
	};

	// Handle form submission for updating an existing cake
	async function handleUpdateCake(id: number) {
		setIsLoading(true);
		const formData = new FormData();
		formData.append("name", cakeDetails.name);
		formData.append("flavor", cakeDetails.flavor);
		formData.append("base_price", cakeDetails.base_price.toString());
		formData.append("category_id", cakeDetails.category_id.toString());
		if (cakeDetails.description) {
			formData.append("description", cakeDetails.description);
		}
		if (featuredImage) {
			formData.append("featured_image", featuredImage);
		}

		if (images.length > 0) {
			for (const element of images) {
				formData.append("images", element);
			}
		}
		try {
			await AxlPastriesClient.updateCake(id, formData);
			const updatedCakes = await AxlPastriesClient.getCakes();
			setCakes(updatedCakes);
			setCakeDetails({
				name: "",
				flavor: "",
				description: "",
				base_price: 0,
				category_id: categories[0]?.id ?? 0
			});
			setFeaturedImage(null);
			dialogCloseRef.current?.click();
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to update cake", error);
			setIsLoading(false);
		}
	}

	const handleDeleteCake = async (id: number) => {
		try {
			setIsLoading(true);
			await AxlPastriesClient.deleteCake(id);
			const updatedCakes = await AxlPastriesClient.getCakes();
			setCakes(updatedCakes);
			dialogCloseRef.current?.click();
			setIsLoading(false);
		} catch (error) {
			console.error("Failed to delete cake", error);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-y-4">
				<h1 className="text-3xl font-bold">Cakes</h1>
				<AddCakeDialog
					cakeDetails={cakeDetails}
					handleAddCake={handleAddCake}
					setCakeDetails={setCakeDetails}
					setFeaturedImage={setFeaturedImage}
					setImages={setImages}
					isLoading={isLoading}
					dialogCloseRef={dialogCloseRef}
					categories={categories}
				/>
			</div>
			<CakeDataTable
				columns={cakeColumns}
				data={cakes ?? []}
				cakeDetails={cakeDetails}
				setCakeDetails={setCakeDetails}
				setFeaturedImage={setFeaturedImage}
				setImages={setImages}
				isLoading={isLoading}
				dialogCloseRef={dialogCloseRef}
				handleUpdateCake={handleUpdateCake}
				handleDeleteCake={handleDeleteCake}
				categories={categories}
			/>
		</div>
	);
}
