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
type AddCakeDialogProps = {
	cakeDetails: Cake;
	setCakeDetails: React.Dispatch<React.SetStateAction<Cake>>;
	setFeaturedImage: React.Dispatch<React.SetStateAction<File | null>>;
	setImages: React.Dispatch<React.SetStateAction<File[]>>;
	handleAddCake: () => void;
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
	categories: Category[];
};
const AddCakeDialog: React.FC<AddCakeDialogProps> = props => {
	const [previews, setPreviews] = useState<string[]>([]);
	const [featuredPreview, setFeaturedPreview] = useState<string>("");
	return (
		<Dialog>
			<DialogTrigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
				Add New Cake
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Add New Cake</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={e => {
						e.preventDefault();
						Promise.resolve(props.handleAddCake())
							.then(() => {
								setPreviews([]);
								setFeaturedPreview("");
							})
							.catch(error => {
								console.error("Error while adding cake:", error);
							});
					}}
				>
					<div className="mb-4">
						<Label className="block text-sm font-medium">Name</Label>
						<Input
							type="text"
							className="w-full rounded border p-2"
							value={props.cakeDetails.name}
							onChange={e =>
								props.setCakeDetails({
									...props.cakeDetails,
									name: e.target.value
								})
							}
							required
						/>
					</div>
					<div className="mb-4">
						<Label className="block text-sm font-medium">Category</Label>
						<Select
							onValueChange={value =>
								props.setCakeDetails({
									...props.cakeDetails,
									category_id: parseInt(value)
								})
							}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent className="bg-white">
								{props.categories.map(category => (
									<SelectItem key={category.id} value={category.id.toString()}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="mb-4">
						<Label className="block text-sm font-medium">Description</Label>
						<Textarea
							rows={3}
							className="w-full rounded border p-2"
							value={props.cakeDetails.description}
							onChange={e =>
								props.setCakeDetails({
									...props.cakeDetails,
									description: e.target.value
								})
							}
							required
						/>
					</div>

					<div className="mb-4">
						<Label className="block text-sm font-medium">Flavor</Label>
						<Input
							type="text"
							className="w-full rounded border p-2"
							value={props.cakeDetails.flavor}
							onChange={e =>
								props.setCakeDetails({
									...props.cakeDetails,
									flavor: e.target.value
								})
							}
							required
						/>
					</div>
					<div className="mb-4">
						<Label className="block text-sm font-medium">Price</Label>
						<Input
							type="number"
							step="0.01"
							className="w-full rounded border p-2"
							value={props.cakeDetails.base_price}
							onChange={e =>
								props.setCakeDetails({
									...props.cakeDetails,
									base_price: parseFloat(e.target.value)
								})
							}
							required
						/>
					</div>
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
								required
								name="featured-image"
								onChange={e => {
									handleFileInputChange(e, props.setFeaturedImage);
									if (e.target.files) {
										const preview = URL.createObjectURL(e.target.files[0]);
										setFeaturedPreview(preview);
									}
								}}
								className="absolute -z-10 w-0 appearance-none opacity-0"
							/>
						</Label>
					</div>

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
										handleFileInputChange(e, props.setImages, true);
										if (e.target.files) {
											const previews = Array.from(e.target.files).map(file =>
												URL.createObjectURL(file)
											);
											setPreviews(prev => [...prev, ...previews]);
										}
									}}
									className="hidden appearance-none"
								/>
							</Label>

							{previews.map((src, index) => (
								<div
									key={index}
									className="flex h-20 w-20 cursor-pointer items-center justify-center rounded border-2 border-black"
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
						<DialogClose ref={props.dialogCloseRef} className="mr-4 rounded bg-gray-300 px-4 py-2">
							Cancel
						</DialogClose>
						<Button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
							{props.isLoading ? <FaSpinner className="animate-spin" /> : "Add"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default AddCakeDialog;
