import { model } from "mongoose";
import userSchema, { IUserSchema } from "./schema/userSchema";

const UserModel = model<IUserSchema>("User", userSchema); 

module.exports = {UserModel}
