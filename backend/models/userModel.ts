import { model } from "mongoose";
import userSchema from "./schema/userSchema";
import { UserType } from "../types/userTypes";

const UserModel = model<UserType>("User", userSchema); //IProjectchema supposed to be

export default UserModel;
