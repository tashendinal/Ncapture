import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["lecturer", "staff", "administrator", "mediaAdmin", "mediaMember"],
      default: "lecturer",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

export default userModel;
