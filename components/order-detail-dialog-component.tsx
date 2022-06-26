import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { UserType } from "../utilities/enum";

const OrderDetailDialogComponent: React.FC<{
  openViewOrderDialog: boolean;
  setOpenViewOrderDialogFunction: any;
  ordersData: any[];
  userType: UserType;
  children?: React.ReactNode;
}> = ({
  children,
  openViewOrderDialog,
  setOpenViewOrderDialogFunction,
  ordersData,
  userType,
}) => {
  return (
    <Dialog open={openViewOrderDialog} onClose={setOpenViewOrderDialogFunction}>
      <div className="px-3">
        <DialogTitle>
          <div className="font-bold">
            {userType === UserType.Buyer ? "My Orders" : "View Orders"}
          </div>
        </DialogTitle>
        <DialogContent className="font-normal">
          <div className="pr-16">
            <div className="flex flex-row py-2">
              <div className="px-4 w-1/4 font-semibold">{"Name"}</div>
              <div className="px-4 w-1/4 font-semibold">{"Price"}</div>
              <div className="px-4 w-1/4 font-semibold">{"Quantity"}</div>
              <div className="px-4 w-1/4 font-semibold">
                {userType === UserType.Buyer ? "Seller Emails" : "Buyer Emails"}
              </div>
            </div>
            <Divider className="w-full" />
            {ordersData.map((item) => {
              return (
                <div key={item._id}>
                  <div className="flex flex-row py-2">
                    <div className="px-4 w-1/4">{item.productName}</div>
                    <div className="px-4 w-1/4">{item.productPrice}</div>
                    <div className="px-4 w-1/4">x{item.quantity}</div>
                    <div className="px-4 w-1/4">
                      {userType === UserType.Buyer
                        ? item.sellerEmail
                        : item.buyerEmail}
                    </div>
                  </div>
                  <Divider className="w-full" />
                </div>
              );
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={setOpenViewOrderDialogFunction}
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

export default OrderDetailDialogComponent;
