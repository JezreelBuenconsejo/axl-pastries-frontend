"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { TablePagination } from "@/components/common/data-table/TablePagination";
import { Category } from "@/types/categories";
import DeleteCakeDialog from "../Cake/DeleteCakeDialog";
import CategoryDialog from "./CategoryDialog";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isTableLoading: boolean;

	// For Updating Category Details
	categoryDetails: Category;
	setCategoryDetails: React.Dispatch<React.SetStateAction<Category>>;
	handleUpdateCategory: (id: number) => void;

	// For Deleting Category
	handleDeleteCategory: (id: number) => void;

	// For Both
	isDialogLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
}

export function CategoryDataTable<TData, TValue>({
	columns,
	data,
	categoryDetails,
	setCategoryDetails,
	handleUpdateCategory,
	isTableLoading,
	isDialogLoading,
	dialogCloseRef,
	handleDeleteCategory
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			sorting,
			columnFilters
		}
	});
	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
								<TableHead className="text-center">Actions</TableHead>
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
									<TableCell>
										<div className="flex flex-col gap-2">
											<DeleteCakeDialog
												handleDeleteCake={handleDeleteCategory}
												id={row.getValue("id")}
												dialogCloseRef={dialogCloseRef}
												isLoading={isDialogLoading}
											/>
											<CategoryDialog
												categoryDetails={categoryDetails}
												setCategoryDetails={setCategoryDetails}
												handleAction={() => handleUpdateCategory(categoryDetails.id)}
												existingCategoryDetails={row.original as Category}
												isLoading={isDialogLoading}
												dialogCloseRef={dialogCloseRef}
												dialogType="Update"
												triggerClassName="text-yellow-500"
												dialogTriggerLabel="Update"
											/>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length + 1} className="h-24 text-center">
									{isTableLoading ? (
										<FaSpinner className="mx-auto animate-spin" />
									) : (
										"No Category Found"
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TablePagination table={table} />
		</>
	);
}
