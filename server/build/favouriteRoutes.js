const router = require("express").Router();
const {
  Project,
  validate
} = require("../models/user");
router.post("/:id", async (req, res) => {
  try {
    const project = new Project(req.body);
    console.log("Project".project);

    // Perform any necessary validation or data processing here

    // Save the favorited project to the database
    const savedProject = await Project.create(project);
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;