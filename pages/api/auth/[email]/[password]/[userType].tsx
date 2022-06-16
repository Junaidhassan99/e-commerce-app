import mongoose from "mongoose";
import BuyerProfileModel from "../../../../../mongoose-models/buyer-profile-models";
import SellerProfileModel from "../../../../../mongoose-models/seller-profile-models";
import { UserType } from "../../../../../utilities/enum";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      const quertData = req.query;

      const userType= quertData.userType;
      const email = quertData.email;
      const password = quertData.password;

      

      if (userType === "0") {
        //buyer
        //store user signup data in database
        // const createBuyerModel = await BuyerProfileModel.create({ ...data });
        // await createBuyerModel.save();
        
        console.log(email);
        res.status(200).json(email);
      } else {
        //store user signup data in database
        // const createSellerModel = await SellerProfileModel.create({ ...data });
        // await createSellerModel.save();

        console.log(password);
        res.status(200).json(password);
      }

      break;
    }

    default: {
      res.status(404).json("Not Found");
      break;
    }
  }
}
