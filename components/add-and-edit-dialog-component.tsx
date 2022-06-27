import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

const AddAndEditDialogComponent: React.FC<{
  openAddProductDialog: any;
  addProductFormValues: any;
  authEmail: String;
  setOpenAddProductDialogFunction: any;
  fetchProductsFunction: any;
  children?: React.ReactNode;
}> = ({
  children,
  openAddProductDialog,
  addProductFormValues,
  authEmail,
  setOpenAddProductDialogFunction,
  fetchProductsFunction,
}) => {
  async function addProduct(event: any) {
    event.preventDefault();

    console.log("add product submit");

    const productName = event.target.productName.value;
    const productPrice = event.target.productPrice.value;
    const productDescription = event.target.productDescription.value;

    console.log(productName);
    console.log(productPrice);
    console.log(productDescription);

    //post productdata
    const responsePost = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productPrice,
        productDescription,
        sellerEmail: authEmail,
      }),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);

    fetchProductsFunction();
    setOpenAddProductDialogFunction();
  }

  async function updateProduct(event: any) {
    event.preventDefault();

    const productName = event.target.productName.value;
    const productPrice = event.target.productPrice.value;
    const productDescription = event.target.productDescription.value;

    //post productdata
    const responsePost = await fetch("/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productPrice,
        productDescription,
        productId: addProductFormValues.productId,
        sellerEmail: authEmail,
      }),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);

    fetchProductsFunction();
    setOpenAddProductDialogFunction();
  }

  return (
    <Dialog
      open={openAddProductDialog.isOpen}
      onClose={setOpenAddProductDialogFunction}
    >
      <div className="px-3">
        <DialogTitle>
          <div className="font-bold">
            {!openAddProductDialog.isEdit ? "Add Product" : "Edit Product"}
          </div>
        </DialogTitle>

        <DialogContent className="font-normal">
          <form
            id="add-product-form"
            onSubmit={(event: any) =>
              openAddProductDialog.isEdit
                ? updateProduct(event)
                : addProduct(event)
            }
          >
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
                minLength={3}
                maxLength={15}
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
                min={0}
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
                minLength={5}
                maxLength={50}
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
            className="bg-red-600"
          >
            Save
          </Button>
          <Button
            onClick={setOpenAddProductDialogFunction}
            color="primary"
            autoFocus
          >
            <div className="text-red-600">Close</div>
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AddAndEditDialogComponent;
