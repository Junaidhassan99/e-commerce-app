import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 1,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
