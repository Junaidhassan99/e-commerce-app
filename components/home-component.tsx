import { useSelector } from "react-redux";
import { UserType } from "../utilities/enum";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faInfo } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const HomeComponent = () => {
  const allAuthData = useSelector((state: any) => state.auth);
  const userType = allAuthData.userType;

  const [openInfoDialog, setOpenInfoDialog] = useState(false);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  function addProduct(event: any) {
    event.preventDefault();

    console.log("add product submit");

    const productName = event.target.productName.value;
    const price = event.target.price.value;

    console.log(productName);
    console.log(price);
  }

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
            <Button onClick={() => setOpenAddProductDialog(true)}>
              <FontAwesomeIcon className="px-5" icon={faPlus} size="2x" />
            </Button>
            <Button onClick={() => setOpenInfoDialog(true)}>
              <FontAwesomeIcon className="px-5" icon={faInfo} size="2x" />
            </Button>
          </div>

          {/* Body */}
          <div className="pt-24 px-[10%]"></div>
        </div>
      )}

      {/* Info Dialog */}
      <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)}>
        <div className="px-3">
          <DialogTitle>
            <div className="font-bold">{"User Info"}</div>
          </DialogTitle>
          <DialogContent className="font-normal">
            <div>{`Email: ${allAuthData.authData.email}`}</div>
            {userType === UserType.Buyer ? (
              <div>{`Full Name: ${allAuthData.authData.fullname}`}</div>
            ) : (
              <div>{`Shop Name: ${allAuthData.authData.shopname}`}</div>
            )}
            <div>{`Address: ${allAuthData.authData.address}`}</div>
            <div>{`Contact Number: ${allAuthData.authData.mobile}`}</div>
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
        open={openAddProductDialog}
        onClose={() => setOpenAddProductDialog(false)}
      >
        <div className="px-3">
          <DialogTitle>
            <div className="font-bold">{"Add Product"}</div>
          </DialogTitle>

          <DialogContent className="font-normal">
            <form id="add-product-form" onSubmit={addProduct}>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="productName">
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Type your product name"
                  className="outline-0 border-b-2 w-60"
                ></input>
              </div>
              <div className="flex flex-col p-3">
                <label className="text-sm py-1" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Type product price"
                  className="outline-0 border-b-2 w-60"
                ></input>
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
              onClick={() => setOpenAddProductDialog(false)}
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
