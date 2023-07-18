const router = require("express").Router();
const { Types } = require("mongoose");
const { Staff, Student } = require("../models/user");

// Server route for retrieving user profile
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    let user = null;
    console.log("ID", id);
    const staff = await Staff.findById(id).exec();
    if (staff) {
      user = staff;
    } else {
      const student = await Student.findById(id).exec();
      if (student) {
        user = student;
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server route for updating user information
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { firstName, lastName, email } = req.body;

    let user = null;
    let model = null;

    const staff = await Staff.findById(id).exec();
    if (staff) {
      user = staff;
      model = Staff;
    } else {
      const student = await Student.findById(id).exec();
      if (student) {
        user = student;
        model = Student;
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    }

    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      await user.save();

      // Fetch updated profile data
      const updatedUser = await model.findById(id).exec();
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE Staff by ID
router.delete("/:id", async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE Student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
