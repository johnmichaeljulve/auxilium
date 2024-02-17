import express from "express";
const router = express.Router();
const {
	getProjectsHandler,
	getProjectHandler,
	createProjectHandler,
	updateProjectHandler,
	deleteProjectHandler,
	getMyProjectHandler,
} = require("../controllers/projectControllers");

const requireAuth = require("../middleware/requireAuth");

router.route("/").get(getProjectsHandler);
router.route("/my-projects").get(requireAuth, getMyProjectHandler)
router.route("/:id").get(getProjectHandler);

router.use(requireAuth);



router.route("/").post(createProjectHandler);
router.route("/:id").put(updateProjectHandler).delete(deleteProjectHandler);

module.exports = router;
