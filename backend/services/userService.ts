import { checkIfValidObjectId } from "../database/db";
const {UserModel} =  require("../models/userModel")
import { IUserSchema } from "../models/schema/userSchema";
import { sanitizeUser } from "../sanitizers/userSanitizer";
import { UserType } from "../types/userTypes";
const jwt = require('jsonwebtoken')
import mongoose from "mongoose";
import {SECRET} from '../utils/config'

const createToken = (_id: mongoose.Types.ObjectId) => {
	return jwt.sign({_id}, SECRET, {expiresIn: '1d'})
}

export async function getUsers(): Promise<UserType[]> {
	try {
		const users = await UserModel.find();
		if(!users) throw new Error("No users found")

		return users;
	} catch (err) {
		throw new Error("Error User not found!");
	}
}

export async function loginUser(user: UserType): Promise <IUserSchema> {
	const {email, password} = user

	try{
		const user = await UserModel.login(email, password)
		if(!user) throw new Error("User not logged in")

		const token = createToken(user._id)

		return {...user._doc, token}
	}catch(err){
		throw new Error(err.message)
	}
}

export async function createUser(user: UserType): Promise<IUserSchema> {
	const sanitizedUser = sanitizeUser(user)
	const {name, email, password} = sanitizedUser
	try	{
		const createdUser = await UserModel.signup(name, email, password)
		if(!createdUser) throw new Error("User not a created")

		const token = createToken(createdUser._id)
		return {...createdUser._doc, token}
	}catch (err){
		throw new Error(err.message)
	}
}

export async function getUser(userId: string): Promise<IUserSchema> {
	checkIfValidObjectId(userId)
	try {
		const user = await UserModel.findById(userId)
		if(!user) throw new Error("No User found!")
		
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