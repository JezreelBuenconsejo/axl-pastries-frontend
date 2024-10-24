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
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateCakeDialog from "./UpdateCakeDialog";
import { Cake } from "@/types/cake";
import DeleteCakeDialog from "./DeleteCakeDialog";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CakeTablePagination } from "./CakeTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // For Updating Cake Details
  cakeDetails: Cake;
  setCakeDetails: React.Dispatch<React.SetStateAction<Cake>>;
  handleUpdateCake: (id: number) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // For Deleting Cake
  handleDeleteCake: (id: number) => void;

  // For Both
  isLoading: boolean;
  dialogCloseRef: React.RefObject<HTMLButtonElement>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  cakeDetails,
  setCakeDetails,
  handleUpdateCake,
  handleFileChange,
  isLoading,
  dialogCloseRef,
  handleDeleteCake,
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
      columnFilters,
    },
  });
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <DeleteCakeDialog
                        handleDeleteCake={handleDeleteCake}
                        id={row.getValue("id") as number}
                        dialogCloseRef={dialogCloseRef}
                        isLoading={isLoading}
                      />
                      <UpdateCakeDialog
                        cakeDetails={cakeDetails}
                        handleUpdateCake={handleUpdateCake}
                        handleFileChange={handleFileChange}
                        setCakeDetails={setCakeDetails}
                        isLoading={isLoading}
                        dialogCloseRef={dialogCloseRef}
                        id={row.getValue("id") as number}
                        existingCakeDetails={row.original as Cake}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin mx-auto" />
                  ) : (
                    "No Cake Found"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CakeTablePagination table={table} />
    </>
  );
}
