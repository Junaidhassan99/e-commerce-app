import mongoose from "mongoose";

const SellerProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  shopname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25,
  },
  address: {
    type: String,
    minLength: 10,
  },
  mobile: String,
});

export default mongoose.models.Sellers ||
  mongoose.model("Sellers", SellerProfileSchema);
