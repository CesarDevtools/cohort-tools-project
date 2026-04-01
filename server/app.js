const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const Project = require("./models/projects.model");
const Student = require("./models/students.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});


/********************/
/***PROJECTS ROUTES**/
/********************/

app.get("/projects", (req, res) => {
  Project.find({})
    .then((projects) => {
      console.log("Retrieved projects", );
      res.status(200).json(projects);
    })
    .catch((error) => {
      console.error("Error while retrieving projects ->", error);
      res.status(500).json({ error: "Failed to retrieve projects" });
    });
});

app.get("/projects/:projectId", (req, res) => {
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

app.post("/projects", (req, res) => {

	const newProject = req.body

	Project.create(newProject)
		.then((response) => {
			console.log("Success creating the project", response)
			res.status(200).json(response)
		})
		.catch((err) => {
			console.error("Error creating the project \n\n", err)
			res.status(500).json(err)
		})
})

app.put("/projects/:projectId", (req, res) => {

	const {projectId} = req.params
	const update = req.body

	Project.findByIdAndUpdate(projectId, update, {new: true})
		.then((project) => {
			console.log("Success upadating the project \n\n", project)
			res.status(200).json(project)
		})
		.catch((err) => {
			console.error("Error updating the project", err)
			res.status(500).json(err)
		})
})


/********************/
/***STUDENTS ROUTES**/
/********************/


app.get("/students", (req, res) => {
  Student.find({})
    .populate("projects")
    .then((students) => {
      console.log("Retrieved books ->", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving books ->", error);
      res.status(500).json({ error: "Failed to retrieve books" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));
