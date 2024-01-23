import mongoose from 'mongoose'
import {MONGO_URI} from '../utils/config'
import HttpException from '../utils/httpException'

export const connectDB = async () =>{
    if(!MONGO_URI){
        console.log("MONGO_URI must be defined!")
        process.exit(1)
    }

    try{
        await mongoose.connect(MONGO_URI)
        console.log("Database connected")
    }catch(e){
        console.error(e.message)
        process.exit(1)
    }
}

export function checkIfValidObjectId(projectId: string): void{
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new HttpException(`Error: ${projectId} is not a valid ID`, 400)
    }
}