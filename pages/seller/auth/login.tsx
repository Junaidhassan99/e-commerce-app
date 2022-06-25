import Link from "next/link";
import Card from "../../../components/card";
import LogInComponent from "../../../components/login-component";
import { UserType } from "../../../utilities/enum";

const SellerLogInScreen = () => {
  return <LogInComponent userType={UserType.Seller} />;
};

export default SellerLogInScreen;
