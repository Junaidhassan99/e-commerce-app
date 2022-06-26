import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const AddAndEditDialogComponent: React.FC<{
  openAddProductDialog: any;
  setOpenAddProductDialogFunction: any;
  addProductFormValues: any;
  onSubmitFormFunction: any;
  children?: React.ReactNode;
}> = ({
  children,
  openAddProductDialog,
  setOpenAddProductDialogFunction,
  addProductFormValues,
  onSubmitFormFunction,
}) => {
  return (
    <Dialog
      open={openAddProductDialog.isOpen}
      onClose={setOpenAddProductDialogFunction}
    >
      <div className="px-3">
        <DialogTitle>
          <div className="font-bold">{"Add Product"}</div>
        </DialogTitle>

        <DialogContent className="font-normal">
          <form id="add-product-form" onSubmit={onSubmitFormFunction}>
            <div className="flex flex-col py-3">
              <label className="text-sm py-1" htmlFor="productName">
                Product Name
              </label>
              <input
                defaultValue={addProductFormValues.productName}
                id="productName"
                type="text"
                placeholder="Type your product name"
                className="outline-0 border-b-2 w-60"
              ></input>
            </div>
            <div className="flex flex-col py-3">
              <label className="text-sm py-1" htmlFor="productPrice">
                Product Price
              </label>
              <input
                defaultValue={addProductFormValues.productPrice}
                id="productPrice"
                type="number"
                placeholder="Type product price"
                className="outline-0 border-b-2 w-60"
                step=".01"
              ></input>
            </div>

            <div className="flex flex-col py-3">
              <label className="text-sm py-1" htmlFor="productDescription">
                Product Description
              </label>
              <textarea
                defaultValue={addProductFormValues.productDescription}
                id="productDescription"
                name="text"
                placeholder="Type product description"
                className="outline-0 border-b-2 w-60"
              ></textarea>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            form="add-product-form"
            value="Submit"
            color="primary"
            autoFocus
          >
            Save
          </Button>
          <Button
            onClick={setOpenAddProductDialogFunction}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddAndEditDialogComponent;
