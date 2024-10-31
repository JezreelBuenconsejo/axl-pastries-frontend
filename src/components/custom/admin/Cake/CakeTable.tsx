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
import { Cake } from "@/types/cake";
import DeleteCakeDialog from "./DeleteCakeDialog";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TablePagination } from "@/components/common/data-table/TablePagination";
import { Category } from "@/types/categories";
import CakeDialog from "./CakeDialog";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];

	// For Updating Cake Details
	cakeDetails: Cake;
	setCakeDetails: React.Dispatch<React.SetStateAction<Cake>>;
	setFeaturedImage: React.Dispatch<React.SetStateAction<File | null>>;
	setImages: React.Dispatch<React.SetStateAction<File[]>>;
	handleUpdateCake: (id: number) => void;
	categories: Category[];

	// For Deleting Cake
	handleDeleteCake: (id: number) => void;

	// For Both
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
}

export function CakeDataTable<TData, TValue>({
	columns,
	data,
	cakeDetails,
	setCakeDetails,
	setFeaturedImage,
	setImages,
	handleUpdateCake,
	isLoading,
	dialogCloseRef,
	handleDeleteCake,
	categories
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
			<div className="flex items-center py-4">
				<Input
					placeholder="Search name..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={event => table.getColumn("name")?.setFilterValue(event.target.value)}
					className="max-w-sm"
				/>
			</div>
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
												handleDeleteCake={handleDeleteCake}
												id={row.getValue("id")}
												dialogCloseRef={dialogCloseRef}
												isLoading={isLoading}
											/>
											<CakeDialog
												cakeDetails={cakeDetails}
												setCakeDetails={setCakeDetails}
												setFeaturedImage={setFeaturedImage}
												setImages={setImages}
												handleSubmit={async () => handleUpdateCake(row.getValue("id"))}
												isLoading={isLoading}
												dialogCloseRef={dialogCloseRef}
												categories={categories}
												existingCakeDetails={row.original as Cake}
												mode="update"
												triggerLabel="Update"
											/>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									{isLoading ? <FaSpinner className="mx-auto animate-spin" /> : "No Cake Found"}
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
