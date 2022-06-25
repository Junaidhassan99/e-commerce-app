import mongoose from "mongoose";

const BuyerProfileSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
  address: String,
  mobile: String,
});

export default mongoose.models.Buyers ||
  mongoose.model("Buyers", BuyerProfileSchema);
