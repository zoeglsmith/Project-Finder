const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports = () => {
	const db_name = "Users";
	const db_password = process.env.DB_PASSWORD;
	const db_url = `mongodb+srv://admin:${encodeURIComponent(db_password)}@cluster0.wpgxqup.mongodb.net/${db_name}?retryWrites=true&w=majority`;
	const options = {
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
	};


  try {
    mongoose.connect(db_url, options);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("Could not connect to database");
  }
};
