import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Cake } from "@/types/cake";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/categories";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { handleFileInputChange } from "@/lib/utils";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

type CakeDialogProps = {
	cakeDetails: Cake;
	setCakeDetails: React.Dispatch<React.SetStateAction<Cake>>;
	setFeaturedImage: React.Dispatch<React.SetStateAction<File | null>>;
	setImages: React.Dispatch<React.SetStateAction<File[]>>;
	handleSubmit: () => Promise<void>;
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
	categories: Category[];
	mode: "add" | "update";
	triggerLabel: string;

	existingCakeDetails?: Cake;
};

const CakeDialog: React.FC<CakeDialogProps> = ({
	cakeDetails,
	setCakeDetails,
	setFeaturedImage,
	setImages,
	handleSubmit,
	isLoading,
	dialogCloseRef,
	categories,
	mode,
	triggerLabel,
	existingCakeDetails
}) => {
	const [previews, setPreviews] = useState<string[]>([]);
	const [featuredPreview, setFeaturedPreview] = useState<string>("");

	return (
		<Dialog>
			<DialogTrigger
				className={
					mode === "update" ? "text-yellow-500" : "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				}
				onClick={() => {
					if (mode === "update" && existingCakeDetails) {
						setCakeDetails(existingCakeDetails);
						setFeaturedPreview(existingCakeDetails.featured_image_url ?? "");
					}
				}}
			>
				{triggerLabel}
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>{mode === "add" ? "Add New Cake" : "Update Cake"}</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={e => {
						e.preventDefault();
						handleSubmit()
							.then(() => {
								setPreviews([]);
								setFeaturedPreview("");
							})
							.catch(error => {
								console.error("Error:", error);
							});
					}}
				>
					{/* Name Input */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Name</Label>
						<Input
							type="text"
							value={cakeDetails.name}
							onChange={e => setCakeDetails({ ...cakeDetails, name: e.target.value })}
							required
						/>
					</div>
					{/* Category Select */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Category</Label>
						<Select
							onValueChange={value =>
								setCakeDetails({
									...cakeDetails,
									category_id: parseInt(value)
								})
							}
							required
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{categories
									? categories.map(category => (
											<SelectItem
												key={category.category_id}
												value={category.category_id.toString()}
											>
												{category.name}
											</SelectItem>
										))
									: "No categories created"}
							</SelectContent>
						</Select>
					</div>
					{/* Description */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Description</Label>
						<Textarea
							rows={3}
							value={cakeDetails.description}
							onChange={e => setCakeDetails({ ...cakeDetails, description: e.target.value })}
							required
						/>
					</div>
					{/* Flavor */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Flavor</Label>
						<Input
							type="text"
							value={cakeDetails.flavor}
							onChange={e => setCakeDetails({ ...cakeDetails, flavor: e.target.value })}
							required
						/>
					</div>
					{/* Price */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Price</Label>
						<Input
							type="number"
							step="0.01"
							value={cakeDetails.base_price}
							onChange={e => setCakeDetails({ ...cakeDetails, base_price: parseFloat(e.target.value) })}
							required
						/>
					</div>
					{/* Featured Image */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Featured Image</Label>
						<Label
							htmlFor="featured-image"
							className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded border-2 border-black"
							style={{
								backgroundImage: `url(${featuredPreview})`,
								backgroundSize: "cover"
							}}
						>
							<PlusCircleIcon className="h-6 w-6" />
							<Input
								type="file"
								id="featured-image"
								accept="image/*"
								required={mode === "add"}
								onChange={e => {
									handleFileInputChange(e, setFeaturedImage);
									if (e.target.files) setFeaturedPreview(URL.createObjectURL(e.target.files[0]));
								}}
								className="absolute -z-10 w-0 appearance-none opacity-0"
							/>
						</Label>
					</div>
					{/* Additional Images */}
					<div className="mb-4">
						<Label className="block text-sm font-medium">Additional Images</Label>
						<div className="flex gap-2">
							<Label
								htmlFor="additional-images"
								className="flex h-20 w-20 cursor-pointer items-center justify-center rounded border-2 border-black"
							>
								<PlusCircleIcon className="h-6 w-6" />
								<Input
									type="file"
									id="additional-images"
									accept="image/*"
									multiple
									onChange={e => {
										handleFileInputChange(e, setImages, true);
										if (e.target.files) {
											const previews = Array.from(e.target.files).map(file =>
												URL.createObjectURL(file)
											);
											setPreviews(previews);
										}
									}}
									className="hidden appearance-none"
								/>
							</Label>
							{previews.map((src, index) => (
								<div
									key={index}
									className="flex h-20 w-20 items-center justify-center rounded border-2 border-black"
								>
									<img
										src={src}
										alt={`Preview ${index + 1}`}
										className="h-full w-full object-cover"
									/>
								</div>
							))}
						</div>
					</div>
					<div className="flex justify-end">
						<DialogClose ref={dialogCloseRef} className="mr-4 rounded bg-gray-300 px-4 py-2">
							Cancel
						</DialogClose>
						<Button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
							{isLoading ? <FaSpinner className="animate-spin" /> : mode === "add" ? "Add" : "Update"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CakeDialog;
