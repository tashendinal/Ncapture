import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    invites: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    statusMessage: {
      type: String,
      default: "",
    },
    requiredEventRoles: { type: [String], enum: ['photographer', 'videographer', 'announcer'] },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("events", eventSchema);

export default eventModel;
