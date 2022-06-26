import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  productName: String,
  productPrice: Number,
  productDescription: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
