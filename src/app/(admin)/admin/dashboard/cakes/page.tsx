"use client";

import React, { useEffect, useRef, useState } from "react";
import AxlPastriesClient from "@/client/client";
import { Cake } from "@/types/cake";
import AddCakeDialog from "@/components/custom/admin/Cake/AddCakeDialog";
import { DataTable } from "@/components/custom/admin/Cake/CakeTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function CakesPage() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cakeDetails, setCakeDetails] = useState<Cake>({
    name: "",
    flavor: "",
    description: "",
    price: 0,
  });
  const [image, setImage] = useState<File | null>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  // Fetch cakes on page load
  useEffect(() => {
    async function fetchCakes() {
      setIsLoading(true);
      try {
        const data = await AxlPastriesClient.getCakes();
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
    formData.append("price", cakeDetails.price.toString());
    if (cakeDetails.description) {
      formData.append("description", cakeDetails.description);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      await AxlPastriesClient.addCake(formData);
      const updatedCakes = await AxlPastriesClient.getCakes();
      setCakes(updatedCakes);
      setCakeDetails({
        name: "",
        flavor: "",
        description: "",
        price: 0,
      });
      setImage(null);
      dialogCloseRef.current?.click();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to add cake", error);
      setIsLoading(false);
    }
  };
  async function handleUpdateCake(id: number) {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", cakeDetails.name);
    formData.append("flavor", cakeDetails.flavor);
    formData.append("price", cakeDetails.price.toString());
    if (cakeDetails.description) {
      formData.append("description", cakeDetails.description);
    }
    if (image) {
      formData.append("image", image);
    }
    try {
      await AxlPastriesClient.updateCake(id, formData);
      const updatedCakes = await AxlPastriesClient.getCakes();
      setCakes(updatedCakes);
      setCakeDetails({
        name: "",
        flavor: "",
        description: "",
        price: 0,
      });
      setImage(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };
  const columns: ColumnDef<Cake>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ row }) => (
        <img src={row.getValue("image_url")} alt="" className="w-36 mx-auto" />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "flavor",
      header: "Flavor",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-y-4">
        <h1 className="text-3xl font-bold">Cakes</h1>
        <AddCakeDialog
          cakeDetails={cakeDetails}
          handleAddCake={handleAddCake}
          handleFileChange={handleFileChange}
          setCakeDetails={setCakeDetails}
          isLoading={isLoading}
          dialogCloseRef={dialogCloseRef}
        />
      </div>
      <DataTable
        columns={columns}
        data={cakes}
        cakeDetails={cakeDetails}
        setCakeDetails={setCakeDetails}
        isLoading={isLoading}
        dialogCloseRef={dialogCloseRef}
        handleUpdateCake={handleUpdateCake}
        handleFileChange={handleFileChange}
        handleDeleteCake={handleDeleteCake}
      />
    </div>
  );
}
