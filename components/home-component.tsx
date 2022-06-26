import { useSelector } from "react-redux";
import { UserType } from "../utilities/enum";
import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faInfo,
  faQuestion,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { wrapper } from "../store/store";
import Card from "./card";
import InfoDialogComponent from "./info-dialog-component";
import OrderDetailDialogComponent from "./order-detail-dialog-component";
import AddAndEditDialogComponent from "./add-and-edit-dialog-component";

const HomeComponent = () => {
  const allAuthData = useSelector((state: any) => state.auth);
  const userType = allAuthData.userType;

  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openViewOrderDialog, setOpenViewOrderDialog] = useState(false);
  const [openAddProductDialog, setOpenAddProductDialog] = useState({
    isOpen: false,
    isEdit: false,
  });
  const [productsData, setProductsData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);

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

  const fetchOrdersData: any = useCallback(async () => {
    console.log("fetch order data fn");

    //It is only for sellers
    const responseGet = await fetch(
      `/api/order?reqEmail=${allAuthData.authData.email}`
    );

    if (responseGet !== undefined) {
      const dataGet = await responseGet.json();

      console.log(dataGet);

      setOrdersData(dataGet);
    }
  }, [allAuthData.authData.email]);

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
            <Button
              onClick={() => {
                console.log("inside");
                fetchOrdersData();
                setOpenViewOrderDialog(true);
              }}
            >
              <FontAwesomeIcon className="px-5" icon={faAngleDown} size="2x" />
            </Button>
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
              {productsData.map((value) => {
                let productOrderQuanity = 0;
                return (
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
                                defaultValue={0}
                                type="number"
                                placeholder="Quantity"
                                className="w-14 border-2"
                                onChange={(newVal) => {
                                  productOrderQuanity = Number(
                                    newVal.target.value
                                  );
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
                                    allAuthData.authData.email
                                  );
                                }}
                              >
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
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View Order Dialog */}
      <OrderDetailDialogComponent
        openViewOrderDialog={openViewOrderDialog}
        ordersData={ordersData}
        setOpenViewOrderDialogFunction={() => setOpenViewOrderDialog(false)}
      />

      {/* Info Dialog */}
      <InfoDialogComponent
        openInfoDialog={openInfoDialog}
        authData={allAuthData.authData}
        userType={userType}
        setOpenInfoDialogFunction={() => {
          setOpenInfoDialog(false);
        }}
      />

      {/* Add Product Dialog */}
      <AddAndEditDialogComponent
        openAddProductDialog={openAddProductDialog}
        addProductFormValues={addProductFormValues}
        onSubmitFormFunction={(event: any) =>
          openAddProductDialog.isEdit ? updateProduct(event) : addProduct(event)
        }
        setOpenAddProductDialogFunction={() =>
          setOpenAddProductDialog({ isOpen: false, isEdit: false })
        }
      />
    </div>
  );
};

export default HomeComponent;
