import { Types, Schema } from "mongoose";
import { UserType } from "../../types/userTypes";

export interface IUserSchema extends UserType {
	_id: Types.ObjectId;
}

const userSchema = new Schema<UserType>(
	{
		username: {
			type: String,
			required: true,	
			unique: true,
		},
		email: {
			type: String,
			required: true,	
            unique: true,
		},
		password: {
			type: String,
			required: true,	
		},
		isAdmin: {
			type: Boolean,
            default: false,
            
		},
        resetPasswordToken: String,
        resetPasswordExpires: Date,
	},
	{
		timestamps: true,
	}
);

export default userSchema;
