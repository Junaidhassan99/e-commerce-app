import Link from "next/link";
import Card from "../../../components/card";
import LogInComponent from "../../../components/login-component";
import { UserType } from "../../../utilities/enum";

const BuyerLogInScreen = () => {
  return <LogInComponent userType={UserType.Buyer} />;
};

export default BuyerLogInScreen;
