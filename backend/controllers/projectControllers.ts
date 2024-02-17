import { Response, Request } from "express";
import mongoose from "mongoose";
import { createProject, deleteProject, getMyProject, getProject, getProjects, updateProject } from "../services/projectService";
const asyncHandler = require("express-async-handler");

interface IGetUserAuthInfoRequest extends Request {
	user: {_id: mongoose.Types.ObjectId, name: String};
}

//@desc Get all projects
//@route GET /api/projects
//@access Public
const getProjectsHandler = asyncHandler(async (req: Request, res: Response) => {
	const projects = await getProjects();

	res.status(200).json(projects);
});

//@desc Get project by id
//@route GET /api/projects/:id
//@access Private
const getProjectHandler = asyncHandler(async (req: Request, res: Response) => {
	const project = await getProject( req.params.id )
	
	res.status(200).json(project);
});

//@desc Get project by user id
//@route GET /api/projects/my-projects
//@access Private
const getMyProjectHandler = asyncHandler(async (req: IGetUserAuthInfoRequest, res: Response) => {
	const project = await getMyProject( req.user._id )

	res.status(200).json(project)
})

//@desc Create a project
//@route POST /api/projects/:id
//@access Private
const createProjectHandler = asyncHandler(
	async (req: IGetUserAuthInfoRequest, res: Response) => {
		const createdProject = await createProject(req.body, req.user._id, req.user.name)

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
			updatedProject
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
	getMyProjectHandler,
	createProjectHandler,
	updateProjectHandler,
	deleteProjectHandler,
};
