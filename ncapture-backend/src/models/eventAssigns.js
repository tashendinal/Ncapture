import mongoose from "mongoose";

const eventAssignsSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    role: {
      type: String,
      enum: ["videographer", "photographer", "announcer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    reason: { type: String, default: "", },
  },
  {
    timestamps: true,
  }
);

const eventAssignsModel = mongoose.model("eventAssigns", eventAssignsSchema);

export default eventAssignsModel;
