import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
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
  productDescription: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  sellerEmail: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
