import mongoose from "mongoose";
import { compareSync } from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
UserSchema.methods.compareCode = (password, hasPassword) => {
  return compareSync(password, hasPassword);
};
export const UserModel = mongoose.model("User", UserSchema);
