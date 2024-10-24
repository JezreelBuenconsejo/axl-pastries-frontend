import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogClose,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { FaSpinner } from "react-icons/fa";
  import { Cake } from "@/types/cake";
  type AddCakeDialogProps = {
    cakeDetails: Cake;
    existingCakeDetails: Cake;
    setCakeDetails: React.Dispatch<React.SetStateAction<Cake>>;
    handleUpdateCake: (id:number) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    dialogCloseRef: React.RefObject<HTMLButtonElement>;
    id: number;

  };
  const UpdateCakeDialog: React.FC<AddCakeDialogProps> = (props) => {
    return (
      <Dialog>
        <DialogTrigger className="text-yellow-500" onClick={() => {props.setCakeDetails(props.existingCakeDetails)}}>
          Update
        </DialogTrigger>
        <DialogContent className="bg-white" aria-description="Add Cake">
          <DialogHeader>
            <DialogTitle>Update Cake</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.handleUpdateCake(props.id);
            }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={props.cakeDetails.name}
                onChange={(e) =>
                  props.setCakeDetails({ ...props.cakeDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                rows={3}
                className="w-full border rounded p-2"
                value={props.cakeDetails.description}
                onChange={(e) =>
                  props.setCakeDetails({
                    ...props.cakeDetails,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-sm font-medium">Flavor</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={props.cakeDetails.flavor}
                onChange={(e) =>
                  props.setCakeDetails({ ...props.cakeDetails, flavor: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full border rounded p-2"
                value={props.cakeDetails.price}
                onChange={(e) =>
                  props.setCakeDetails({
                    ...props.cakeDetails,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image</label>
              <input type="file" accept="image/*" onChange={props.handleFileChange} />
            </div>
            <div className="flex justify-end">
              <DialogClose
                ref={props.dialogCloseRef}
                className="mr-4 px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </DialogClose>
              <Button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {props.isLoading ? <FaSpinner className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  export default UpdateCakeDialog;
  