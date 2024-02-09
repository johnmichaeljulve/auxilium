import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { SECRET } from "../utils/config";
const {UserModel} = require("../models/userModel");

interface IGetUserAuthInfoRequest extends Request {
	user: string;
}

const requireAuth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res
			.status(401)
			.json({ error: "Authorization token is required" });
	}

	const token = authorization.split(" ")[1];

	try {
		const { _id } = jwt.verify(token, SECRET);
		req.user = await UserModel.findById({ _id }).select("_id name");
		next();
	} catch (err) {
		res.status(401).json({ error: "Request is not authorized" });
	}
};

module.exports = requireAuth;
