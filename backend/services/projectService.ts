import mongoose from "mongoose";
import { checkIfValidObjectId } from "../database/db";
import ProjectModel from "../models/projectModel";
import projectSchema, { IProjectSchema } from "../models/schema/projectSchema";
import { sanitizeProject } from "../sanitizers/projectSanitizer";
import { ProjectType } from "../types/projectTypes";

interface userId {
	_id: mongoose.Types.ObjectId
}


export async function getProjects(): Promise<IProjectSchema[]> {
	try {
		const projects = await ProjectModel.find().sort({createdAt: -1});
		if(!projects) throw new Error("No Project found!")

		return projects;
	} catch (err) {
		throw new Error("Error Project not found!");
	}
}
//todo
// fix mongo db saving the additional data

export async function createProject(project: ProjectType, user_id: userId, user_name: String): Promise<IProjectSchema> {
	const sanitizedProject = {...project, user_id, raised: 0, contributor: [], team: [user_name], contact: []} //sanitize
	try	{
		const createdProject = await ProjectModel.create(sanitizedProject)
		
		return createdProject
	}catch (err){
		throw new Error("Error Project not created" + err.message)
	}
}

export async function getProject(user_id: string): Promise<IProjectSchema> {
	try {
		const projects = await ProjectModel.findById(user_id);
		if(!projects) throw new Error("No Project found!")
		return projects 
	}catch( err ){
		throw new Error("Error Project not found!")
	}
}

export async function updateProject(projectId: string, project: ProjectType): Promise<IProjectSchema>{
	checkIfValidObjectId(projectId)
	console.log(project)
	const sanitizedProject = project
	try{
		const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, sanitizedProject, {new: true})
		if(!updatedProject) throw new Error("No Project found!")

		return updatedProject
	}catch (err){
		throw new Error("Error Project not updated!")
	}
}

export async function deleteProject(projectId: string): Promise<void> {
	checkIfValidObjectId(projectId)
	try{
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)
		if(!deletedProject) throw new Error("No Project found!")

	}catch ( err ){
		throw new Error("Error Project not deleted!")
	}
}