"use client";

import React, { useEffect, useRef, useState } from "react";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";
import { CakeDataTable } from "@/components/custom/admin/Cake/CakeTable";
import { cakeColumns } from "@/components/custom/admin/Cake/CakeColumns";
import { useCategories } from "@/hooks/useCategories";
import CakeDialog from "@/components/custom/admin/Cake/CakeDialog";

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

	useEffect(() => {
		refreshCakes();
	}, []);

	const createFormData = () => {
		const formData = new FormData();
		formData.append("name", cakeDetails.name);
		formData.append("flavor", cakeDetails.flavor);
		formData.append("base_price", cakeDetails.base_price.toString());
		formData.append("category_id", cakeDetails.category_id.toString());
		if (cakeDetails.description) formData.append("description", cakeDetails.description);
		if (featuredImage) formData.append("featured_image", featuredImage);
		images.forEach(image => formData.append("images", image));
		return formData;
	};

	const resetCakeForm = () => {
		setCakeDetails({
			name: "",
			flavor: "",
			description: "",
			base_price: 0,
			category_id: categories[0]?.id ?? 0
		});
		setFeaturedImage(null);
		dialogCloseRef.current?.click();
	};

	const refreshCakes = async () => {
		setIsLoading(true);
		try {
			const data = await AxlPastriesClient.getCakes();
			setCakes(data);
		} catch (error) {
			console.error("Failed to fetch cakes", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddCake = async () => {
		setIsLoading(true);
		try {
			await AxlPastriesClient.addCake(createFormData());
			await refreshCakes();
			resetCakeForm();
		} catch (error) {
			console.error("Failed to add cake", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUpdateCake = async (id: number) => {
		setIsLoading(true);
		try {
			await AxlPastriesClient.updateCake(id, createFormData());
			await refreshCakes();
			resetCakeForm();
		} catch (error) {
			console.error("Failed to update cake", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDeleteCake = async (id: number) => {
		setIsLoading(true);
		try {
			await AxlPastriesClient.deleteCake(id);
			await refreshCakes();
			resetCakeForm();
		} catch (error) {
			console.error("Failed to delete cake", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-y-4">
				<h1 className="text-3xl font-bold">Cakes</h1>
				<CakeDialog
					cakeDetails={cakeDetails}
					setCakeDetails={setCakeDetails}
					setFeaturedImage={setFeaturedImage}
					setImages={setImages}
					handleSubmit={handleAddCake}
					isLoading={isLoading}
					dialogCloseRef={dialogCloseRef}
					categories={categories}
					mode="add"
					triggerLabel="Add New Cake"
				/>
			</div>
			<CakeDataTable
				columns={cakeColumns}
				data={cakes}
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
