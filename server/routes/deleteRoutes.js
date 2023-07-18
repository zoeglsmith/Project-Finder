// const express = require("express");
// const router = express.Router();
// const { Staff, Student } = require("../models");
// const { Staff, Student, validate } = require("../models/user");

// // DELETE Staff by ID
// router.delete("/api/staff/:id", async (req, res) => {
//   try {
//     const staff = await Staff.findByIdAndDelete(req.params.id);
//     if (!staff) {
//       return res.status(404).json({ error: "Staff not found" });
//     }
//     res.status(200).json({ message: "Staff deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting staff:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // DELETE Student by ID
// router.delete("/api/student/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) {
//       return res.status(404).json({ error: "Student not found" });
//     }
//     res.status(200).json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting student:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
