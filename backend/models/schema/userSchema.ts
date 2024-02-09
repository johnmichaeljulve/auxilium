import { Types, Schema } from "mongoose";
import { UserType } from "../../types/userTypes";
import bcrypt from 'bcrypt'
import HttpException from "../../utils/httpException";

export interface IUserSchema extends UserType {
	_id: Types.ObjectId;
	token: string
}

const userSchema = new Schema<IUserSchema>(
	{
		name: {
			type: String,
			required: true,
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
        resetPasswordToken: String,
        resetPasswordExpires: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.statics.signup = async function (name: string, email: string, password: string): Promise<IUserSchema> {
    const exist = await this.findOne({ email })

	if(exist) {
        throw Error("Email already exist")
	}

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({ name, email, password: hash })
    
    return user
}

userSchema.statics.login = async function (email: string, password: string): Promise <IUserSchema>{
	const user = await this.findOne({ email })

	if(!email || !password){
		throw new Error("Invalid input.")
	}

	if(!user) {
        throw new HttpException('Incorrect email or password.', 400)
	}

	const match = await bcrypt.compare(password, user.password)
	if(!match) throw new Error("Incorrect email or password.")

	return user
}

export default userSchema;
