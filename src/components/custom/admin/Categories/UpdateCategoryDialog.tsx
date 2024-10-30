import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Category } from "@/types/categories";
type AddCategoryDialogProps = {
	categoryDetails: Category;
	existingCategoryDetails: Category;
	setCategoryDetails: React.Dispatch<React.SetStateAction<Category>>;
	handleUpdateCategory: (id: number) => void;
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
	id: number;
};
const UpdateCategoryDialog: React.FC<AddCategoryDialogProps> = props => {
	return (
		<Dialog>
			<DialogTrigger
				className="text-yellow-500"
				onClick={() => {
					props.setCategoryDetails(props.existingCategoryDetails);
				}}
			>
				Update
			</DialogTrigger>
			<DialogContent className="bg-white" aria-description="Add Category">
				<DialogHeader>
					<DialogTitle>Update Category</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={e => {
						e.preventDefault();
						props.handleUpdateCategory(props.id);
					}}
				>
					<div className="mb-4">
						<label className="block text-sm font-medium">Name</label>
						<input
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
							{props.isLoading ? <FaSpinner className="animate-spin" /> : "Update"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default UpdateCategoryDialog;
