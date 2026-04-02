const router = require("express").Router();

const Project = require("../models/projects.model");

//GET:
router.get("/projects", (req, res) => {
	Project.find({})
		.then((projects) => {
			console.log("Retrieved projects");
			res.status(200).json(projects);
		})
		.catch((error) => {
			console.error("Error while retrieving projects ->", error);
			res.status(500).json({ error: "Failed to retrieve projects" });
		});
});

router.get("/projects/:projectId", (req, res) => {
	const { projectId } = req.params;

	Project.findById(projectId)
		.then((project) => {
			console.log("Project retrieved");
			res.status(200).json(project);
		})
		.catch((err) => {
			console.error("Error while retrieving the project \n\n", err);
			res.status(500).json({ error: "failed to retrieve project" });
		});
});

//POST:
router.post("/projects", (req, res) => {
	const newProject = req.body;

	Project.create(newProject)
		.then((response) => {
			console.log("Success creating the project", response);
			res.status(200).json(response);
		})
		.catch((err) => {
			console.error("Error creating the project \n\n", err);
			res.status(500).json(err);
		});
});

//PUT:
router.put("/projects/:projectId", (req, res) => {
	const { projectId } = req.params;
	const update = req.body;

	Project.findByIdAndUpdate(projectId, update, { new: true })
		.then((project) => {
			console.log("Success upadating the project \n\n", project);
			res.status(200).json(project);
		})
		.catch((err) => {
			console.error("Error updating the project", err);
			res.status(500).json(err);
		});
});

//DELETE:

router.delete("/projects/:projectId", (req, res) => {
	const { projectId } = req.params;

	Project.findByIdAndDelete(projectId)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			console.error("Error deleting the project \n\n", err);
			res.status(500).json({ error: "Failed to delete project" });
		});
});

module.exports = router;
