import { Response, Request } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/userService";
const asyncHandler = require("express-async-handler");

//@desc Get all users
//@route GET /api/users
//@access Public
const getUsersHandler = asyncHandler(async (req: Request, res: Response) => {
	const users = await getUsers();

	res.status(200).json(users);
});

//@desc Get user by id
//@route GET /api/users/:id
//@access Public
const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
	const user = await getUser(req.params.id)
	res.status(200).json(user);
});

//@desc Create a user
//@route POST /api/users/:id
//@access Private
const createUserHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const createdUser = await createUser(req.body)

		res.status(201).json(createdUser);
	}
);

//@desc Update a user by id
//@route PUT /api/users/:id
//@access Private
const updateUserHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const updatedUser = await updateUser(req.params.id, req.body)

		res.status(202).json({
			message: `User with ID of ${req.params.id} is updated`,
			userInformation: updatedUser,
		});
	}
);

//@desc Delete a user by id
//@route DELETE /api/users/:id
//@access Private
const deleteUserHandler = asyncHandler(
	async (req: Request, res: Response) => {
		await deleteUser(req.params.id)
		
		res.status(200).json({
			message: `User with ID of ${req.params.id} is deleted.`
		});
	}
);

module.exports = {
	getUsersHandler,
	getUserHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
};
