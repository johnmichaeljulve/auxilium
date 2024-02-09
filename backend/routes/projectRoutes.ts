import express from "express";
const router = express.Router();
const {
	getProjectsHandler,
	getProjectHandler,
	createProjectHandler,
	updateProjectHandler,
	deleteProjectHandler,
} = require("../controllers/projectControllers");

const requireAuth = require("../middleware/requireAuth");

router.route("/").get(getProjectsHandler);

router.use(requireAuth);

router.route("/my-projects").get(getProjectHandler);
router.route("/").post(createProjectHandler);
router.route("/:id").put(updateProjectHandler).delete(deleteProjectHandler);

module.exports = router;
