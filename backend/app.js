const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Database Connection
const { Connection_db } = require("./Connection_db/DB_Connection");
const userRouter = require("./routes/user.route");
const coursesRouter = require("./routes/courses.route");
var cors = require("cors");

const cookieParser = require("cookie-parser"); // Import cookie-parser

Connection_db();

// Middleware to parse JSON body
app.use(cors()); // Enable CORS for all routes
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies to req.body object
app.use(express.json()); // Parse JSON bodies to req.body object
app.use(cookieParser()); // To parse cookies
app.use("/users/api", userRouter);
app.use("/courses/api", coursesRouter);

module.exports = app;
