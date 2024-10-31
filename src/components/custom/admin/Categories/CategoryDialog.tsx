import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { Category } from "@/types/categories";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CategoryDialogProps = {
	categoryDetails: Category;
	setCategoryDetails: React.Dispatch<React.SetStateAction<Category>>;
	handleAction: () => void;
	isLoading: boolean;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
	dialogType: "Add" | "Update";
	triggerClassName?: string;
	dialogTriggerLabel: string;
	existingCategoryDetails?: Category;
};

const CategoryDialog: React.FC<CategoryDialogProps> = ({
	categoryDetails,
	setCategoryDetails,
	handleAction,
	isLoading,
	dialogCloseRef,
	dialogType,
	triggerClassName,
	dialogTriggerLabel,
	existingCategoryDetails
}) => {
	return (
		<Dialog>
			<DialogTrigger
				className={triggerClassName ?? "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"}
				onClick={() => {
					if (dialogType === "Update" && existingCategoryDetails) {
						setCategoryDetails(existingCategoryDetails);
					}
				}}
			>
				{dialogTriggerLabel}
			</DialogTrigger>
			<DialogContent className="bg-white">
				<DialogHeader>
					<DialogTitle>{dialogType} Category</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={e => {
						e.preventDefault();
						handleAction();
					}}
				>
					<div className="mb-4">
						<Label className="block text-sm font-medium">Category Name</Label>
						<Input
							type="text"
							className="w-full rounded border p-2"
							value={categoryDetails.name}
							onChange={e => setCategoryDetails({ ...categoryDetails, name: e.target.value })}
							required
						/>
					</div>
					<div className="flex justify-end">
						<DialogClose ref={dialogCloseRef} className="mr-4 rounded bg-gray-300 px-4 py-2">
							Cancel
						</DialogClose>
						<Button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
							{isLoading ? <FaSpinner className="animate-spin" /> : dialogType}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default CategoryDialog;
