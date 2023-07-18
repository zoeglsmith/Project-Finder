const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    requiredSkills: { type: String, required: true },
    scholarships: { type: String, required: false },
    contactInfo: { type: String, required: true },
  },
  { collection: "Project" }
); // specify collection name here

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
