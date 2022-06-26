import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { UserType } from "../utilities/enum";

const InfoDialogComponent: React.FC<{
  openInfoDialog: boolean;
  setOpenInfoDialogFunction: any;
  authData: any;
  userType: UserType;
  children?: React.ReactNode;
}> = ({
  children,
  openInfoDialog,
  setOpenInfoDialogFunction,
  authData,
  userType,
}) => {
  return (
    <Dialog open={openInfoDialog} onClose={setOpenInfoDialogFunction}>
      <div className="px-3">
        <DialogTitle>
          <div className="font-bold">{"User Info"}</div>
        </DialogTitle>
        <DialogContent className="font-normal">
          <div className="py-1">{`Email: ${authData.email}`}</div>
          {userType === UserType.Buyer ? (
            <div className="py-1">{`Full Name: ${authData.fullname}`}</div>
          ) : (
            <div className="py-1">{`Shop Name: ${authData.shopname}`}</div>
          )}
          <div className="py-1">{`Address: ${authData.address}`}</div>
          <div className="py-1">{`Contact Number: ${authData.mobile}`}</div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={setOpenInfoDialogFunction}
            // color="primary"
            autoFocus
          >
            <div className="text-red-600">Close</div>
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default InfoDialogComponent;
