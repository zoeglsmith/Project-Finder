const router = require("express").Router();
const { Staff, Student } = require("../models/user");
const bcrypt = require("bcrypt");
const validate = require("./validate");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const JWTPRIVATEKEY = "hdffjhgoerjgsgjeogjedlrnd";

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(
    "Received login request with email and password:",
    email,
    password
  );

  let user = await Staff.findOne({ email });
  let userType = "";

  if (user) {
    userType = "Staff";
  } else {
    user = await Student.findOne({ email });
    userType = "Student";
  }

  console.log("USER:", user);

  if (user) {
    bcrypt
      .compare(password, user.password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(401).send({
            message: "Incorrect email or password",
          });
        }

        jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
            userType: userType,
          },
          JWTPRIVATEKEY,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              console.error(err);
              return res.status(500).send({
                message: "Internal server error",
              });
            }

            res.json({
              token,
              userId: user._id, // Include userId in the response
              firstName: user.firstName,
              userType: userType,
            });
          }
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Internal server error",
        });
      });
  } else {
    res.status(404).send({
      message: "Email not found",
    });
  }
});

module.exports = router;
