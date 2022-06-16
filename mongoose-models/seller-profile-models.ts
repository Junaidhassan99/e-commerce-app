import mongoose from "mongoose";

const SellerProfileSchema = new mongoose.Schema({
  email: String,
  password: String,
  shopname: String,
  address: String,
  mobile: String,
});

export default mongoose.models.Sellers ||
  mongoose.model("Sellers", SellerProfileSchema);
