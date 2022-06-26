import mongoose from "mongoose";
import orderModel from "../../../mongoose_models/order-models";
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

      const reqEmail = quertData.reqEmail;
      const userType = quertData.userType;

      let responseProducts;
      if (userType === "0") {
        console.log("In Buyer");
        //buyer
        responseProducts = await orderModel.find({
          buyerEmail: reqEmail,
        });
      } else {
        //seller
        responseProducts = await orderModel.find({
          sellerEmail: reqEmail,
        });
      }

      res.status(200).json(responseProducts);
      break;
    }
    case "POST": {
      const data = req.body;

      console.log(data);

      //store product data in database
      const createProductModel = await orderModel.create({ ...data });
      await createProductModel.save();

      res.status(200).json(data);

      break;
    }
    case "PUT": {
      break;
    }
    case "DELETE": {
      break;
    }
    default: {
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
