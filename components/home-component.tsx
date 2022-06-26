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
import ProductDataItemComponent from "./product-data-item-component";

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
                return (
                  <div key={value._id} className="w-1/4 p-2">
                    <ProductDataItemComponent
                      email={allAuthData.authData.email}
                      userType={userType}
                      value={value}
                      setAddProductFormValuesFunction={() => {
                        setAddProductFormValues({
                          productName: value.productName,
                          productPrice: value.productPrice,
                          productDescription: value.productDescription,
                          productId: value._id,
                        });
                      }}
                      setOpenAddProductDialogFunction={() => {
                        setOpenAddProductDialog({
                          isOpen: true,
                          isEdit: true,
                        });
                      }}
                      fetchProductsFunction={fetchProductsData}
                    />
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
        authEmail={allAuthData.authData.email}
        fetchProductsFunction={fetchProductsData}
        setOpenAddProductDialogFunction={() =>
          setOpenAddProductDialog({ isOpen: false, isEdit: false })
        }
      />
    </div>
  );
};

export default HomeComponent;
