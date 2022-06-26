import { Button } from "@material-ui/core";
import { UserType } from "../utilities/enum";
import Card from "./card";

const ProductDataItemComponent: React.FC<{
  value: any;
  userType: UserType;
  email: String;
  setAddProductFormValuesFunction: any;
  setOpenAddProductDialogFunction: any;
  fetchProductsFunction: any;
  children?: React.ReactNode;
}> = ({
  children,
  value,
  userType,
  email,
  setAddProductFormValuesFunction,
  setOpenAddProductDialogFunction,
  fetchProductsFunction,
}) => {
  let productOrderQuanity = 0;

  async function orderProduct(
    productName: any,
    productPrice: any,
    quantity: any,
    sellerEmail: any,
    buyerEmail: any
  ) {
    //order product data
    const responsePost = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productPrice,
        quantity,
        sellerEmail,
        buyerEmail,
      }),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);
  }

  async function deleteProduct(productId: any) {
    //delete productdata
    const responseDelete = await fetch("/api/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    //test response
    const dataDelete = await responseDelete.json();
    console.log(dataDelete);

    fetchProductsFunction();
  }

  return (
    <Card>
      <div className="flex flex-col h-60 overflow-y-scroll">
        <div className="text-4xl font-semibold py-1">{value.productName}</div>
        <div className="text-2xl py-1">{`$${value.productPrice}`}</div>
        <div className="lg py-1">{value.productDescription}</div>
        <div className="lg text-slate-500 py-1">{value.sellerEmail}</div>
        {userType === UserType.Buyer ? (
          <div className="flex flex-col py-1 items-center h-full">
            <input
              defaultValue={1}
              type="number"
              placeholder="Quantity"
              className="w-1/2 border-2 text-center"
              min={1}
              onChange={(newVal) => {
                productOrderQuanity = Number(newVal.target.value);
              }}
            />

            <div className="flex flex-row justify-evenly items-center">
              <Button
                onClick={(event) => {
                  orderProduct(
                    value.productName,
                    value.productPrice,
                    productOrderQuanity,
                    value.sellerEmail,
                    email
                  );
                }}
              >
                <div className="bg-red-600 px-5 py-1 rounded-lg">Order Now</div>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-row justify-evenly items-center py-1 self-end h-full">
            <Button
              onClick={(event) => {
                setAddProductFormValuesFunction();
                setOpenAddProductDialogFunction();
              }}
            >
              <div className="bg-red-600 px-5 py-1 rounded-lg text-slate-100">
                Update
              </div>
            </Button>
            <Button
              onClick={() => {
                //value._id
                deleteProduct(value._id);
              }}
            >
              <div className="bg-red-600 px-5 py-1 rounded-lg text-slate-100">
                Delete
              </div>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductDataItemComponent;
