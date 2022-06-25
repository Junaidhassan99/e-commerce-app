import mongoose from "mongoose";
import BuyerProfileModel from "../../../mongoose_models/buyer-profile-models";
import SellerProfileModel from "../../../mongoose_models/seller-profile-models";
import { UserType } from "../../../utilities/enum";

export default async function handler(req: any, res: any) {
  if (
    mongoose.connection.readyState === 0 ||
    mongoose.connection.readyState === 3
  ) {
    //if mongo is disconnected

    let dbConnectionStatusString = "Unknown";

    await mongoose
      .connect(
        "mongodb+srv://junaidhassan:password000jh@cluster0.53cvgvs.mongodb.net/data?retryWrites=true&w=majority"
      )
      .then(() => (dbConnectionStatusString = "Connected to MongoDB"))
      .catch(() => {
        dbConnectionStatusString = "Failed to Connected to MongoDB";
      });

    console.log(dbConnectionStatusString);
  }

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

        res.status(200).json(responseBuyerProfile);
      } else {
        //seller

        //search a seller by email
        const responseSellerProfile = await SellerProfileModel.findOne({
          email: email,
        });

        res.status(200).json(responseSellerProfile);
      }

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
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
