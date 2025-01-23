import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ["user"] },
});

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
