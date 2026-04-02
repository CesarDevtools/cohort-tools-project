const router = require("express").Router();

const Student = require("../models/students.model.js");

//GET:

router.get("/students", (req, res) => {
	Student.find({})
		.populate("projects")
		.then((students) => {
			console.log("Retrieved students -> \n\n", students);
			res.status(200).json(students);
		})
		.catch((error) => {
			console.error("Error while retrieving books ->", error);
			res.status(500).json({ error: "Failed to retrieve books" });
		});
});

router.get("/students/:studentId", (req, res) => {
	const { studentId } = req.params;

	Student.findById(studentId)
		.populate("projects")
		.then((student) => {
			console.log("Success, student retrived \n\n", student);
			res.status(200).json(student);
		})
		.catch(() => {
			console.error("Error while retrieving the student \n\n", err);
			res.status(500).json({ error: "failed to retrieve student" });
		});
});

router.get("/students/project/:projectId", (req, res) => {
	const { projectId } = req.params;
	const query = { projects: projectId };

	Student.find(query)
		.populate("projects")
		.then((students) => {
			console.log("Success retriving students \n\n", students);
			res.status(200).json(students);
		})
		.catch(() => {
			console.error("Failed to retrive the students \n\n", err);
			res.status(500).json(err);
		});
});

//POST:

router.post("/students", (req, res) => {
	const newStudent = req.body;

	Student.create(newStudent)
		.then((student) => {
			console.log("Success creatign student \n\n", student);
			res.status(201).json(student);
		})
		.catch((err) => {
			console.error("Failed to create student \n\n", err);
			res.status(500).json(err);
		});
});

//PUT:

router.put("/students/:studentId", (req, res) => {
	const { studentId } = req.params;
	const update = req.body;

	Student.findByIdAndUpdate(studentId, update, { new: true })
		.then((student) => {
			console.log("Success updating student \n\n", student);
			res.status(200).json(student);
		})
		.catch((error) => {
			console.error("Error updating student \n\n", error);
			res.status(500).json(error);
		});
});

//DELETE:

router.delete("/students/:studentId", (req, res) => {
	const { studentId } = req.params;

	Student.findByIdAndDelete(studentId)
		.then((student) => {
			console.log("Success deleting student \n\n", student);
			res.status(200).json(student);
		})
		.catch((error) => {
			console.error("Error deleting student \n\n", error);
			res.status(500).json(error);
		});
});

module.exports = router;
