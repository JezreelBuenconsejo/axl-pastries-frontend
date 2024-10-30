import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TrashIcon } from "lucide-react";
type DeleteCategoryDialogProps = {
	handleDeleteCategory: (id: number) => void;
	id: number;
	dialogCloseRef: React.RefObject<HTMLButtonElement>;
	isLoading: boolean;
};
const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = props => {
	return (
		<Dialog>
			<DialogTrigger className="text-red-500">Delete</DialogTrigger>
			<DialogContent className="w-fit bg-white">
				<DialogHeader>
					<DialogTitle className="pr-5 text-xl">Are you sure you want to delete this category?</DialogTitle>
				</DialogHeader>
				<div className="mt-4 flex justify-end">
					<DialogClose ref={props.dialogCloseRef} className="mr-4 rounded bg-gray-300 px-4 py-2">
						Cancel
					</DialogClose>
					<Button
						onClick={() => props.handleDeleteCategory(props.id)}
						className="rounded bg-red-500 px-4 py-2 text-white"
					>
						{props.isLoading ? (
							<FaSpinner className="animate-spin" />
						) : (
							<>
								<TrashIcon className="w-4" /> Delete
							</>
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default DeleteCategoryDialog;
