const router = require("express").Router();
const { Staff, Student, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const SALT = 10;

//POST for SignUp
router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(Number(SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const staff = new Staff(req.body);
    console.log("Request Body:", req.body);
    await staff.save();
    const jsonData = { staff };
    res.send(jsonData);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: "User already exists" });
    } else {
      const student = new Student(req.body);
      console.log("Request Body:", req.body);
      await student.save();
      const jsonData = { student };
      res.send(jsonData);
    }
  }
});

module.exports = router;
