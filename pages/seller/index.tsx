import { useSelector } from "react-redux";

const SellerHomeScreen = () => {
  const allAuthData = useSelector((state: any) => state.auth);

  return (
    <div className="flex flex-col">
      {allAuthData.authData === undefined ? (
        <div>Please Login</div>
      ) : (
        <div className="flex flex-col">
          <div>{allAuthData.authData._id}</div>
          <div>{allAuthData.authData.email}</div>
          <div>{allAuthData.authData.password}</div>
          <div>{allAuthData.authData.shopname}</div>
          <div>{allAuthData.authData.address}</div>
          <div>{allAuthData.authData.mobile}</div>
        </div>
      )}
    </div>
  );
};

export default SellerHomeScreen;
