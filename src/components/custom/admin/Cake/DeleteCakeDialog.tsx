import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSpinner } from "react-icons/fa";
import {  DialogTitle } from "@radix-ui/react-dialog";
import { TrashIcon } from "lucide-react";
type DeleteCakeDialogProps = {
  handleDeleteCake: (id: number) => void;
  id: number;
  dialogCloseRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
};
const DeleteCakeDialog: React.FC<DeleteCakeDialogProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger className="text-red-500">
        Delete
      </DialogTrigger>
      <DialogContent className="bg-white w-fit">
        <DialogHeader>
          <DialogTitle className="pr-5 text-xl">
            Are you sure you want to delete this cake?
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <DialogClose
            ref={props.dialogCloseRef}
            className="mr-4 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => props.handleDeleteCake(props.id)}
            className="px-4 py-2 bg-red-500 text-white rounded"
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
export default DeleteCakeDialog;
