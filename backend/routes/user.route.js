const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControllers = require("../controllers/user.controller");
//signup routes
router.post("/signup", [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  userControllers.User_Signup,
]);

//login routes
router.post("/login", [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  userControllers.User_Login,
]);
module.exports = router;
