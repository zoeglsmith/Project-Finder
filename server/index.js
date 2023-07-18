const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const deleteUser = require("./routes/deleteUser");
const ProfileRoute = require("./routes/ProfileRoute");
const Favourites = require("./routes/favouriteRoutes");
dotenv.config();

//database connection
connection();
//Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
//...

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// //Rouets
app.use("/api/users", userRoutes);
app.use("/api/delete", deleteUser);
app.use("/api/profile", ProfileRoute);

app.use("/api/project", projectRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/favourites", Favourites);


const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
