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
      const quertData = req.query;

      const reqEmail = quertData.reqEmail;

      let responseProducts;
      if (reqEmail === undefined) {
        //get all objs from product collection
        responseProducts = await ProductModel.find({});
      } else {
        //get only reqEmail objs from product collection
        responseProducts = await ProductModel.find({
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
      const createProductModel = await ProductModel.create({ ...data });
      await createProductModel.save();

      res.status(200).json(data);

      break;
    }
    case "PUT": {
      const data = req.body;

      console.log(`Put data: ${data.productName}`);
      console.log(`Put data: ${data.productPrice}`);
      console.log(`Put data: ${data.productDescription}`);
      console.log(`Put data: ${data.productId}`);
      console.log(`Put data: ${data.sellerEmail}`);

      const responseUpdate = await ProductModel.findOneAndUpdate(
        { _id: data.productId },
        {
          productName: data.productName,
          productPrice: data.productPrice,
          productDescription: data.productDescription,
        },
        {
          new: true,
        }
      );

      res.status(200).json(responseUpdate);

      break;
    }
    case "DELETE": {
      const data = req.body;

      console.log(`Delete Id: ${data.productId}`);

      const responseDelete: any = await ProductModel.findOneAndRemove({
        _id: data.productId,
      });

      res.status(200).json(responseDelete);

      break;
    }
    default: {
      res.status(404).json("Req Not Found");
      break;
    }
  }
}
