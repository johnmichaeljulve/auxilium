import { Response, Request } from "express";
import mongoose from "mongoose";
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../services/projectService";
const asyncHandler = require("express-async-handler");

interface IGetUserAuthInfoRequest extends Request {
	user: mongoose.Types.ObjectId;
}

//@desc Get all projects
//@route GET /api/projects
//@access Public
const getProjectsHandler = asyncHandler(async (req: Request, res: Response) => {
	const projects = await getProjects();

	res.status(200).json(projects);
});

//@desc Get project by id
//@route GET /api/projects/my-projects
//@access Private
const getProjectHandler = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
	const project = await getProject( req.user._id )
	
	res.status(200).json(project);
});

//@desc Create a project
//@route POST /api/projects/:id
//@access Private
const createProjectHandler = asyncHandler(
	async (req: IGetUserAuthInfoRequest, res: Response) => {
		const createdProject = await createProject(req.body, req.user._id)

		res.status(201).json(createdProject);
	}
);

//@desc Update a project by id
//@route PUT /api/projects/:id
//@access Private
const updateProjectHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const updatedProject = await updateProject(req.params.id, req.body)

		res.status(202).json({
			message: `Project with ID of ${req.params.id} is updated`,
			"Project Information": updatedProject,
		});
	}
);

//@desc Delete a project by id
//@route DELETE /api/projects/:id
//@access Private
const deleteProjectHandler = asyncHandler(
	async (req: Request, res: Response) => {
		await deleteProject(req.params.id)
		
		res.status(200).json({
			message: `Project with ID of ${req.params.id} is deleted.`
		});
	}
);

module.exports = {
	getProjectsHandler,
	getProjectHandler,
	createProjectHandler,
	updateProjectHandler,
	deleteProjectHandler,
};
