import { checkIfValidObjectId } from "../database/db";
import UserModel from "../models/userModel";
import { IUserSchema } from "../models/schema/userSchema";
import { sanitizeUser } from "../sanitizers/userSanitizer";
import { UserType } from "../types/userTypes";


export async function getUsers(): Promise<UserType[]> {
	try {
		const users = await UserModel.find();
		if(!users) throw new Error("No users found")

		return users;
	} catch (err) {
		throw new Error("Error User not found!");
	}
}

export async function createUser(user: UserType): Promise<IUserSchema> {
	const sanitizedUser = sanitizeUser(user)
	try	{
		const createdUser = await UserModel.create(sanitizedUser)
		if(!createdUser) throw new Error("User not a created")
		
		return createdUser
	}catch (err){
		throw new Error("Error User not created")
	}
}

export async function getUser(userId: string): Promise<IUserSchema> {
	checkIfValidObjectId(userId)
	try {
		const user = await UserModel.findById(userId)
		if(!user) throw new Error("NO User found!")
		
		return user
	}catch( err ){
		throw new Error("Error User not found!")
	}
}

export async function updateUser(userId: string, user: UserType): Promise<IUserSchema>{
	checkIfValidObjectId(userId)
	const sanitizedUser = sanitizeUser(user)
	try{
		const updatedUser = await UserModel.findByIdAndUpdate(userId, sanitizedUser, {new: true})
		if(!updatedUser) throw new Error("NO User found!")

		return updatedUser
	}catch (err){
		throw new Error("Error User not updated!")
    }
}

export async function deleteUser(userId: string): Promise<void> {
	checkIfValidObjectId(userId)
	try{
		const deletedUser = await UserModel.findByIdAndDelete(userId)
		if(!deletedUser) throw new Error("NO User found!")

	}catch ( err ){
		throw new Error("Error User not deleted!")
	}
}