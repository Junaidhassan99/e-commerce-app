import { useSelector } from "react-redux";
import { UserType } from "../utilities/enum";

const HomeComponent = () => {
  const allAuthData = useSelector((state: any) => state.auth);
  const userType = allAuthData.userType;

  return (
    <div className="flex flex-col">
      {allAuthData.authData === undefined ? (
        <div>Please Login</div>
      ) : (
        <div className="flex flex-col">
          <div>{allAuthData.authData._id}</div>
          <div>{allAuthData.authData.email}</div>
          <div>{allAuthData.authData.password}</div>
          {userType === UserType.Buyer ? (
            <div>{allAuthData.authData.fullname}</div>
          ) : (
            <div>{allAuthData.authData.shopname}</div>
          )}
          <div>{allAuthData.authData.address}</div>
          <div>{allAuthData.authData.mobile}</div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;
