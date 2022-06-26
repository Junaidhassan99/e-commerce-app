import { useSelector } from "react-redux";
import { UserType } from "../utilities/enum";
import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfo, faQuestion } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { wrapper } from "../store/store";
import Card from "./card";

const HomeComponent = () => {
  const allAuthData = useSelector((state: any) => state.auth);
  const userType = allAuthData.userType;

  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openAddProductDialog, setOpenAddProductDialog] = useState({
    isOpen: false,
    isEdit: false,
  });
  const [productsData, setProductsData] = useState<any[]>([]);
  const [addProductFormValues, setAddProductFormValues] = useState({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productId: "",
  });

  const fetchProductsData = useCallback(async () => {
    let responseGet: any;
    if (userType === UserType.Buyer) {
      responseGet = await fetch(`/api/product`);
    } else {
      responseGet = await fetch(
        `/api/product?reqEmail=${allAuthData.authData.email}`
      );
    }

    if (responseGet !== undefined) {
      const dataGet = await responseGet.json();

      console.log(dataGet);

      setProductsData(dataGet);
    }
  }, [allAuthData.authData.email, userType]);

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
        sellerEmail: allAuthData.authData.email,
      }),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);

    fetchProductsData();

    setOpenAddProductDialog({ isOpen: false, isEdit: false });
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
        sellerEmail: allAuthData.authData.email,
      }),
    });

    //test response
    const dataPost = await responsePost.json();
    console.log(dataPost);

    fetchProductsData();

    setOpenAddProductDialog({ isOpen: false, isEdit: false });
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

    fetchProductsData();
  }

  useEffect(() => {
    console.log("useEffect");

    fetchProductsData();
  }, [fetchProductsData]);

  return (
    <div>
      {allAuthData.authData === undefined ? (
        <div>Please Login</div>
      ) : (
        <div className="flex flex-col">
          {/* App Bar */}
          <div className="bg-red-700 h-16 w-full px-[10%] fixed flex flex-row items-center">
            <div className="text-4xl font-bold whitespace-nowrap">
              Seller Dashboard
            </div>
            <div className="w-full"></div>
            {userType !== UserType.Buyer && (
              <Button
                onClick={() => {
                  setAddProductFormValues({
                    productName: "",
                    productPrice: 0,
                    productDescription: "",
                    productId: "",
                  });

                  setOpenAddProductDialog({ isOpen: true, isEdit: false });
                }}
              >
                <FontAwesomeIcon className="px-5" icon={faPlus} size="2x" />
              </Button>
            )}
            <Button onClick={() => setOpenInfoDialog(true)}>
              <FontAwesomeIcon className="px-5" icon={faInfo} size="2x" />
            </Button>
            <Button onClick={async () => {}}>
              <FontAwesomeIcon className="px-5" icon={faQuestion} size="2x" />
            </Button>
          </div>

          {/* Body */}
          <div className="pt-24 px-[10%]">
            <div className="flex flex-row flex-wrap">
              {productsData.map((value) => (
                <div key={value._id} className="w-1/4 p-2">
                  <Card>
                    <div className="flex flex-col">
                      <div className="text-4xl font-semibold">
                        {value.productName}
                      </div>
                      <div className="text-2xl">{`$${value.productPrice}`}</div>
                      <div className="lg">{value.productDescription}</div>
                      <div className="lg text-slate-500">
                        {value.sellerEmail}
                      </div>
                      {userType === UserType.Buyer ? (
                        <div className="flex flex-col ">
                          <div className="w-1/2">
                            <input
                              type="number"
                              placeholder="Quantity"
                              className="w-14 border-2"
                            />
                          </div>
                          <div className="flex flex-row justify-evenly items-center">
                            <Button onClick={(event) => {}}>
                              <div className="bg-red-600 px-5 py-1 rounded-lg">
                                Order Now
                              </div>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-evenly items-center">
                          <Button
                            onClick={(event) => {
                              setAddProductFormValues({
                                productName: value.productName,
                                productPrice: value.productPrice,
                                productDescription: value.productDescription,
                                productId: value._id,
                              });

                              setOpenAddProductDialog({
                                isOpen: true,
                                isEdit: true,
                              });
                            }}
                          >
                            <div className="bg-red-600 px-5 py-1 rounded-lg">
                              Update
                            </div>
                          </Button>
                          <Button
                            onClick={() => {
                              //value._id
                              deleteProduct(value._id);
                            }}
                          >
                            <div className="bg-red-600 px-5 py-1 rounded-lg">
                              Delete
                            </div>
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Dialog */}
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        <div className="px-3">
          <DialogTitle>
            <div className="font-bold">{"User Info"}</div>
          </DialogTitle>
          <DialogContent className="font-normal">
            <div className="py-1">{`Email: ${allAuthData.authData.email}`}</div>
            {userType === UserType.Buyer ? (
              <div className="py-1">{`Full Name: ${allAuthData.authData.fullname}`}</div>
            ) : (
              <div className="py-1">{`Shop Name: ${allAuthData.authData.shopname}`}</div>
            )}
            <div className="py-1">{`Address: ${allAuthData.authData.address}`}</div>
            <div className="py-1">{`Contact Number: ${allAuthData.authData.mobile}`}</div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenInfoDialog(false)}
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog
        open={openAddProductDialog.isOpen}
        onClose={() =>
          setOpenAddProductDialog({ isOpen: false, isEdit: false })
        }
      >
        <div className="px-3">
          <DialogTitle>
            <div className="font-bold">{"Add Product"}</div>
          </DialogTitle>

          <DialogContent className="font-normal">
            <form
              id="add-product-form"
              onSubmit={(event) =>
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
              onClick={() =>
                setOpenAddProductDialog({ isOpen: false, isEdit: false })
              }
              color="primary"
              autoFocus
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default HomeComponent;
