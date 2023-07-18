const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const SALT_ROUNDS = 10;
const JWTPRIVATEKEY = "hdffjhgoerjgsgjeogjedlrnd";

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

const staffSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
  },
  { collection: "Staff" }
);

staffSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      userEmail: this.email,
    },
    JWTPRIVATEKEY
  );
  return token;
};

staffSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
  }
  next();
});

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    degree: { type: String, required: true },
    interest: { type: [String], required: true },
    skills: { type: [String], required: true },
  },
  { collection: "Student" }
);

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      userId: this._id,
      userEmail: this.email,
    },
    JWTPRIVATEKEY
  );
  return token;
};

studentSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
  }
  next();
});

const Staff = mongoose.model("Staff", staffSchema);
const Student = mongoose.model("Student", studentSchema);
const Project = mongoose.model("Project", projectSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    department: Joi.string().required().label("Department"),
  });
  const result = schema.validate(data);
  console.log("Validation Result:", result);

  return result;
};

module.exports = { Staff, Student, Project, validate };
