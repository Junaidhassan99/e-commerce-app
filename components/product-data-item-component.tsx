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
      <div className="flex flex-col">
        <div className="text-4xl font-semibold">{value.productName}</div>
        <div className="text-2xl">{`$${value.productPrice}`}</div>
        <div className="lg">{value.productDescription}</div>
        <div className="lg text-slate-500">{value.sellerEmail}</div>
        {userType === UserType.Buyer ? (
          <div className="flex flex-col ">
            <div className="w-1/2">
              <input
                defaultValue={0}
                type="number"
                placeholder="Quantity"
                className="w-14 border-2"
                onChange={(newVal) => {
                  productOrderQuanity = Number(newVal.target.value);
                }}
              />
            </div>
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
          <div className="flex flex-row justify-evenly items-center">
            <Button
              onClick={(event) => {
                setAddProductFormValuesFunction();
                setOpenAddProductDialogFunction();
              }}
            >
              <div className="bg-red-600 px-5 py-1 rounded-lg">Update</div>
            </Button>
            <Button
              onClick={() => {
                //value._id
                deleteProduct(value._id);
              }}
            >
              <div className="bg-red-600 px-5 py-1 rounded-lg">Delete</div>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductDataItemComponent;
