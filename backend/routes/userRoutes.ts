import express from "express";
const router = express.Router();
const {
	getUserHandler,
	getUsersHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
	loginUserHandler,
} = require("../controllers/userControllers");

router.route("/signup").post(createUserHandler);

router.route("/login").post(loginUserHandler);

router.route("/login/:id").put(updateUserHandler).delete(deleteUserHandler);

module.exports = router;
