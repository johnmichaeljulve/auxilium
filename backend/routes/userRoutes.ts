import express from 'express'
const router = express.Router()
const {getUserHandler, getUsersHandler, createUserHandler, updateUserHandler, deleteUserHandler} = require("../controllers/userControllers")

router.route("/").get(getUsersHandler).post(createUserHandler)

router.route("/:id").get(getUserHandler).put(updateUserHandler).delete(deleteUserHandler)

module.exports = router