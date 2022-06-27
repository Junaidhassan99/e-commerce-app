import mongoose from "mongoose";

const BuyerProfileSchema = new mongoose.Schema({
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
  fullname: {
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

export default mongoose.models.Buyers ||
  mongoose.model("Buyers", BuyerProfileSchema);
