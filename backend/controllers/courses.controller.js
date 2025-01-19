const { sequelize } = require("../Connection_db/DB_Connection");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const CoursesModel = require("../models/Courses/courses.model");
const { validationResult } = require("express-validator");

// ---------------------------------------------------------------- List All Courses ----------------------------------------------------------------

module.exports.Add_Courses = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const courses = req.body.courses;
  const userId = req.user.id; // Assuming the user is attached via the Authorization middleware
  // console.log(req.files, "files"); // Log uploaded files
  // console.log(courses, "courses"); // Log courses data

  try {
    // Check if the input is an array or a single object
    const coursesArray = Array.isArray(courses) ? courses : [courses];

    // Validate if the array is empty
    if (coursesArray.length === 0) {
      return res.status(400).json({ error: "No courses provided" });
    }

    // Loop through the courses array to insert each course
    const addedCourses = [];
    for (let i = 0; i < coursesArray.length; i++) {
      const {
        course_title,
        course_description,
        course_duration,
        course_price,
      } = coursesArray[i];

      // Find the corresponding file for this course
      const courseImageField = `courses[${i}][course_image]`;
      const courseImageFile = req.files.find(
        (file) => file.fieldname === courseImageField
      );

      if (!courseImageFile) {
        return res
          .status(400)
          .json({ error: `Image file is required for course ${i}` });
      }

      // Insert into the database using Sequelize
      const newCourse = await CoursesModel.create({
        course_title,
        course_description,
        course_duration,
        course_price,
        userId,
        course_image: courseImageFile.filename, // Save the filename in the database
      });

      addedCourses.push(newCourse); // Collect the added courses for the response
    }

    return res.status(201).json({
      message: `${addedCourses.length} course(s) added successfully`,
      courses: addedCourses,
    });
  } catch (error) {
    console.error("Error adding courses:", error); // Log the actual error for debugging
    return res.status(500).json({ error: error.message });
  }
};
module.exports.Delete_Course = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(`Deleting course with ID: ${courseId}`);

    // Find the course by ID
    const course = await CoursesModel.findOne({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Extract the image path from the course
    const imagePath = course.course_image; // Assuming `imagePath` stores the relative file path
    console.log(`Image path in DB: ${imagePath}`);

    // Delete the course record
    await course.destroy();

    // Ensure the correct image path
    const absolutePath = path.resolve("uploads", "courses", imagePath);

    console.log(`Full image path to delete: ${absolutePath}`);

    // Check if the image file exists before attempting to delete
    if (fs.existsSync(absolutePath)) {
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error(`Failed to delete image at ${absolutePath}:`, err);
          return res
            .status(500)
            .json({ message: "Error deleting image from server" });
        }
        console.log(`Image deleted successfully: ${absolutePath}`);
      });
    } else {
      console.log(`Image file does not exist at: ${absolutePath}`);
    }

    // Send success response
    return res
      .status(200)
      .json({ message: "Course and associated image deleted successfully" });
  } catch (error) {
    console.error(`Error deleting course: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.All_Courses = async (req, res) => {
  try {
    console.log("Getting all courses");
    console.log(req.body);
    const courses = await CoursesModel.findAll({
      where: { userId: req.user.id },
    });
    if (courses.length < 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "All Course successfully get", courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.Update_Course = async (req, res) => {
  try {
    const couserId = req.params.courseId;

    if (!couserId) {
      return res.status(404).json({ message: "Course not found" });
    }
    const course = await CoursesModel.findOne({ where: { id: couserId } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
