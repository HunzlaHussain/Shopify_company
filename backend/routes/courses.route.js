const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const Middleware = require("../middleware/authentication");
const coursesControllers = require("../controllers/courses.controller");
const fileUpload = require("../middleware/fileUpload");

// Add Courses Routes

router.post(
  "/add",
  [
    body("courses.*.course_title")
      .isLength({ min: 1 })
      .withMessage("Please provide a title")
      .notEmpty()
      .withMessage("Title cannot be empty"),

    body("courses.*.course_description")
      .isLength({ min: 1 })
      .withMessage("Description is required")
      .notEmpty()
      .withMessage("Description cannot be empty"),

    body("courses.*.course_duration")
      .isLength({ min: 1 })
      .withMessage("Duration is required")
      .notEmpty()
      .withMessage("Duration cannot be empty"),

    body("courses.*.course_price")
      .isLength({ min: 1 })
      .withMessage("Price is required")
      .notEmpty()
      .withMessage("Price cannot be empty"),

    // Image validation for each course
    body("courses.*.course_image")
      .isLength({ min: 1 })
      .withMessage("Image is required")
      .notEmpty()
      .withMessage("Image cannot be empty"),
  ],
  Middleware.Authorization,
  fileUpload.any(), // File upload middleware
  coursesControllers.Add_Courses
);

//Delete Course
router.delete(
  "/delete/:courseId",
  Middleware.Authorization,
  coursesControllers.Delete_Course
);

//all Course
router.get(
  "/allcourse",
  Middleware.Authorization,
  coursesControllers.All_Courses
);

//Update Course
router.put(
  "/update/:courseId",
  Middleware.Authorization,
  coursesControllers.Update_Course
);
module.exports = router;
