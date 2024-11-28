"use client";

import React, { useRef, useState } from "react";
import AxlPastriesClient from "@/client/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Category } from "@/types/categories";
import { CategoryDataTable } from "@/components/custom/admin/Categories/CategoriesTable";
import { useCategories } from "@/hooks/useCategories";
import CategoryDialog from "@/components/custom/admin/Categories/CategoryDialog";

export default function CategoriesPage() {
	const { categories, fetchCategories, categoriesLoading } = useCategories();
	const [isDialogLoading, setIsDialogLoading] = useState(false);
	const [categoryDetails, setCategoryDetails] = useState<Category>({
		category_id: 0,
		name: ""
	});
	const dialogCloseRef = useRef<HTMLButtonElement>(null);

	// Handle form submission for adding a new category
	const handleAddCategory = async () => {
		setIsDialogLoading(true);
		const categoryData = {
			name: categoryDetails.name ?? ""
		};
		try {
			await AxlPastriesClient.addCategory(categoryData);
			fetchCategories();
			setCategoryDetails({
				category_id: categories[categories.length - 1].category_id,
				name: ""
			});
			dialogCloseRef.current?.click();
			setIsDialogLoading(false);
		} catch (error) {
			console.error("Failed to add category", error);
			setIsDialogLoading(false);
		}
	};
	async function handleUpdateCategory(id: number) {
		setIsDialogLoading(true);
		const categoryData = {
			name: categoryDetails.name
		};
		try {
			await AxlPastriesClient.updateCategory(id, categoryData);
			fetchCategories();
			setCategoryDetails({
				category_id: categories[categories.length - 1].category_id,
				name: ""
			});
			dialogCloseRef.current?.click();
			setIsDialogLoading(false);
		} catch (error) {
			console.error("Failed to update category", error);
			setIsDialogLoading(false);
		}
	}

	const handleDeleteCategory = async (id: number) => {
		try {
			setIsDialogLoading(true);
			await AxlPastriesClient.deleteCategory(id);
			fetchCategories();
			dialogCloseRef.current?.click();
			setIsDialogLoading(false);
		} catch (error) {
			console.error("Failed to delete category", error);
			setIsDialogLoading(false);
		}
	};

	const columns: ColumnDef<Category>[] = [
		{
			accessorKey: "category_id",
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
						ID
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			}
		},
		{
			accessorKey: "name",
			header: "Name"
		}
	];
	return (
		<div>
			<div className="mb-6 flex flex-wrap items-center justify-between gap-y-4">
				<h1 className="text-3xl font-bold">Categories</h1>
				<CategoryDialog
					categoryDetails={categoryDetails}
					setCategoryDetails={setCategoryDetails}
					handleAction={handleAddCategory}
					isLoading={isDialogLoading}
					dialogCloseRef={dialogCloseRef}
					dialogType="Add"
					dialogTriggerLabel="Add New Category"
				/>
			</div>
			<CategoryDataTable
				columns={columns}
				data={categories ?? []}
				categoryDetails={categoryDetails}
				setCategoryDetails={setCategoryDetails}
				isDialogLoading={isDialogLoading}
				isTableLoading={categoriesLoading}
				dialogCloseRef={dialogCloseRef}
				handleUpdateCategory={handleUpdateCategory}
				handleDeleteCategory={handleDeleteCategory}
			/>
		</div>
	);
}
