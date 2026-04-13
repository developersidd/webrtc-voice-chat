import mongoose, { Schema, model } from "mongoose";

const RoomSchema = new Schema(
  {
    topic: { type: String, required: [true, "Room topic is required"] },
    roomType: {
      type: String,
      required: [true, "Room type is required"],
      enum: ["open", "social", "private"],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Owner ID is required"],
      ref: "User",
    },
    speakers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    listeners: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);
const Room = model("Room", RoomSchema);
export default Room;
