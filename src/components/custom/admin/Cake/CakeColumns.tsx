import { Cake } from "@/types/cake";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { formatDateTime } from "@/lib/utils";

export const cakeColumns: ColumnDef<Cake>[] = [
	{
		accessorKey: "id",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					ID
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: "featured_image_url",
		header: () => <div className="mx-auto text-center">Featured Image</div>,
		cell: ({ row }) => (
			<img src={row.getValue("featured_image_url")} alt="" className="mx-auto aspect-square w-36 object-cover" />
		)
	},
	{
		accessorKey: "images",
		header: () => <div className="mx-auto text-center">Images</div>,
		cell: ({ row }) => {
			const images: string[] = row.getValue("images");
			return (
				<>
					{images != null && images.length > 0 ? (
						<Carousel className="w-36">
							<CarouselContent>
								{images.map((image, index) => (
									<CarouselItem key={index}>
										<img src={image} alt="" className="h-36 w-36 object-cover" />
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="absolute left-0 h-6 w-6 border-0 bg-black stroke-main-purple p-0" />
							<CarouselNext className="absolute right-0 h-6 w-6 border-0 bg-black stroke-main-purple p-0" />
						</Carousel>
					) : (
						<div className="mx-auto text-center">No Images Available</div>
					)}
				</>
			);
		}
	},
	{
		accessorKey: "name",
		header: "Name"
	},
	{
		accessorKey: "category_name",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Category
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: "flavor",
		header: "Flavor"
	},
	{
		accessorKey: "description",
		header: "Description"
	},
	{
		accessorKey: "base_price",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Base Price
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		}
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Created
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="w-20">{formatDateTime(row.getValue("created_at"))}</div>;
		}
	},
	{
		accessorKey: "updated_at",
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Updated
					<ArrowUpDown className="h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <div className="w-20">{formatDateTime(row.getValue("updated_at"))}</div>;
		}
	}
];
