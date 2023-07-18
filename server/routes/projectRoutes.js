const router = require("express").Router();
const { Project, validate } = require("../models/user");

// Route for creating a new project
router.post("/", async (req, res) => {
  console.log("THIS IS Project API");

  try {
    const project = new Project(req.body);
    await project.save();
    const jsonData = { project };
    res.send(jsonData);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for retrieving all projects
// Define a route to retrieve all projects

// Route for retrieving all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().lean().exec();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get details of a specific project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean().exec();
    if (!project) {
      res.status(404).send("Project not found");
    } else {
      res.send(project);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
