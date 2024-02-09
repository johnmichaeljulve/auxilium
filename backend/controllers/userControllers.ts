import { Response, Request } from "express";
import { createUser, deleteUser, loginUser, updateUser } from "../services/userService";
const asyncHandler = require("express-async-handler");

//@desc Login user by req.body
//@route GET /api/users/:id
//@access Public
const loginUserHandler = asyncHandler(async (req: Request, res: Response) => {
	const user = await loginUser(req.body)
	res.status(200).json(user);
});

//@desc Create a user
//@route POST /api/users/:id
//@access Public
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
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
	loginUserHandler,
};
