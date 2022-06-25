import mongoose from "mongoose";
import BuyerProfileModel from "../../../mongoose_models/buyer-profile-models";
import SellerProfileModel from "../../../mongoose_models/seller-profile-models";
import { UserType } from "../../../utilities/enum";

export default async function handler(req: any, res: any) {
  let result = "Unknown";

  // await mongoose
  //   .connect(
  //     "mongodb+srv://junaidhassan:password000jh@cluster0.53cvgvs.mongodb.net/data?retryWrites=true&w=majority"
  //   )
  //   .then(() => (result = "Connected to MongoDB"))
  //   .catch(() => {
  //     result = "Failed to Connected to MongoDB";
  //   });

  switch (req.method) {
    case "GET": {
      const quertData = req.query;

      console.log(`Get Test: ${quertData}`);

      res.status(200).json("Nothing to show");
      break;
    }
    case "POST": {
      //post request stores signup data of seller and buyer

      //Do not parse this to json this is JS object
      const body = req.body;

      const userType = body.userType;
      const data = body.data;

      if (userType === UserType.Buyer) {
        //store user signup data in database
        const createBuyerModel = await BuyerProfileModel.create({ ...data });
        await createBuyerModel.save();

        res.status(200).json(data);
      } else {
        //store user signup data in database
        const createSellerModel = await SellerProfileModel.create({ ...data });
        await createSellerModel.save();

        res.status(200).json(data);
      }

      break;
    }
    default: {
      res.status(404).json("Not Found");
      break;
    }
  }
}
