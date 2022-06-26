import mongoose from "mongoose";
import ProductModel from "../../../mongoose_models/product-models";
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
      break;
    }
    case "POST": {
      const data = req.body;

      console.log(data);

      //store product data in database
      const createProductModel = await ProductModel.create({ ...data });
      await createProductModel.save();

      res.status(200).json(data);

      break;
    }
    default: {
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
