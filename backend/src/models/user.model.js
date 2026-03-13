import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
    },

    username: {
      type: String,
      required: [true, "Username is required"],
    },
    bio: {
      type: String,
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"],
    },
    activated: {
      type: Boolean,
      default: false,
      required: false,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
const User = model("User", UserSchema);
export default User;
