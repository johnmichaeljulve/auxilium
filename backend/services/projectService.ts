import { checkIfValidObjectId } from "../database/db";
import ProjectModel from "../models/projectModel";
import { IProjectSchema } from "../models/schema/projectSchema";
import { sanitizeProject } from "../sanitizers/projectSanitizer";
import { ProjectType } from "../types/projectTypes";


export async function getProjects(): Promise<ProjectType[]> {
	try {
		const projects = await ProjectModel.find();
		if(!projects) throw new Error("No projects found")

		return projects;
	} catch (err) {
		throw new Error("Error Project not found!");
	}
}

export async function createProject(project: ProjectType): Promise<IProjectSchema> {
	const sanitizedProject = project //sanitize
	try	{
		const createdProject = await ProjectModel.create(sanitizedProject)
		if(!createdProject) throw new Error("Project not a created")
		
		return createdProject
	}catch (err){
		throw new Error("Error Project not created" + err.message)
	}
}

export async function getProject(projectId: string): Promise<IProjectSchema> {
	checkIfValidObjectId(projectId)
	try {
		const project = await ProjectModel.findById(projectId)
		if(!project) throw new Error("NO Project found!")
		
		return project 
	}catch( err ){
		throw new Error("Error Project not found!")
	}
}

export async function updateProject(projectId: string, project: ProjectType): Promise<IProjectSchema>{
	checkIfValidObjectId(projectId)
	const sanitizedProject = sanitizeProject(project)
	try{
		const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, sanitizedProject, {new: true})
		if(!updatedProject) throw new Error("NO Project found!")

		return updatedProject
	}catch (err){
		throw new Error("Error Project not updated!")
	}
}

export async function deleteProject(projectId: string): Promise<void> {
	checkIfValidObjectId(projectId)
	try{
		const deletedProject = await ProjectModel.findByIdAndDelete(projectId)
		if(!deletedProject) throw new Error("NO Project found!")

	}catch ( err ){
		throw new Error("Error Project not deleted!")
	}
}