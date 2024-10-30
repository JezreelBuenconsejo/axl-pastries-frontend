import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Category } from "@/types/categories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
type AddCategoryDialogProps = {
	categoryDetails: Category;
	setCategoryDetails: React.Dispatch<React.SetStateAction<Category>>;
	handleAddCategory: () => void;
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
};
const AddCategoryDialog: React.FC<AddCategoryDialogProps> = props => {
	return (
		<Dialog>
			<DialogTrigger className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
				Add New Category
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>Add New Category</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={e => {
						e.preventDefault();
						props.handleAddCategory();
					}}
				>
					<div className="space mb-4">
						<Label className="block text-sm font-medium">Category</Label>
						<Input
							type="text"
							className="w-full rounded border p-2"
							value={props.categoryDetails.name}
							onChange={e => props.setCategoryDetails({ ...props.categoryDetails, name: e.target.value })}
							required
						/>
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
export default AddCategoryDialog;
