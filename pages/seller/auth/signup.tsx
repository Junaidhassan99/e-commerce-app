import Link from "next/link";
import Card from "../../../components/card";
import SignUpComponent from "../../../components/signup-component";
import { UserType } from "../../../utilities/enum";

const SellerSignUpScreen = () => {
  return <SignUpComponent userType={UserType.Seller} />;
};

export default SellerSignUpScreen;
