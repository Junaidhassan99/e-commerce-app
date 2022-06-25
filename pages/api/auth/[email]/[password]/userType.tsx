import mongoose from "mongoose";
import BuyerProfileModel from "../../../../../mongoose_models/buyer-profile-models";
import SellerProfileModel from "../../../../../mongoose_models/seller-profile-models";
import { UserType } from "../../../../../utilities/enum";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      const quertData = req.query;

      const userType = quertData.userType;
      const email = quertData.email;
      const password = quertData.password;

      if (userType === "0") {
        //buyer

        //search a buyer by email
        const responseBuyerProfile = await BuyerProfileModel.findOne({
          email: email,
        });

        //console.log(response);
        res.status(200).json(responseBuyerProfile);
      } else {
        //seller

        //search a seller by email
        const responseSellerProfile = await BuyerProfileModel.findOne({
          email: email,
        });

        //console.log(response);
        res.status(200).json(responseSellerProfile);
      }

      break;
    }

    default: {
      res.status(404).json("Not Found");
      break;
    }
  }
}
