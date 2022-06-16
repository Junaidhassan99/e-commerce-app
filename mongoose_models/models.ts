import mongoose from "mongoose";

const buyerProfileSchema = new mongoose.Schema({
  email: String,
  password: String,
  fullname: String,
  address: String,
  mobile: String,
});

const sellerProfileSchema = new mongoose.Schema({
    email: String,
    password: String,
    shopname: String,
    address: String,
    mobile: String,
  });

export const buyerProfileModel = mongoose.model("Buyers", buyerProfileSchema);
