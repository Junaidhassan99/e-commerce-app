import Link from "next/link";
import Card from "../../../components/card";
import SignUpComponent from "../../../components/signup-component";
import { UserType } from "../../../utilities/enum";

const BuyerSignUpScreen = () => {
  return <SignUpComponent userType={UserType.Buyer} />;
};

export default BuyerSignUpScreen;
