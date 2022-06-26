import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  quantity: Number,
  sellerEmail:String,
  buyerEmail:String,
});

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
