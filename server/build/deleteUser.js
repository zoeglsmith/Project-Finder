const router = require("express").Router();
const {
  Staff,
  Student
} = require("../models/user");

// DELETE API endpoint for deleting a user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.body.userId; // Retrieve the id from req.body
    console.log("User ID:", id);

    // Check if the user is a staff or student
    const isStaff = await Staff.findOne({
      _id: id
    });
    const isStudent = await Student.findOne({
      _id: id
    });

    // Delete the user from the correct collection
    let result;
    if (isStaff) {
      result = await Staff.deleteOne({
        _id: id
      });
    } else if (isStudent) {
      result = await Student.deleteOne({
        _id: id
      });
    } else {
      console.log("User not found");
      return res.status(404).json({
        message: "User not found"
      });
    }
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    console.log("User deleted");
    return res.status(200).json({
      message: "User deleted"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});
module.exports = router;