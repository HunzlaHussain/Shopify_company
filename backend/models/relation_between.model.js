const UserModel = require("../models/User/user.model");
const CoursesModel = require("../models/Courses/courses.model");

// In a relationships file or after defining both models
UserModel.hasMany(CoursesModel, {
  foreignKey: "userId", // Ensure this matches the key in the CoursesModel
  as: "courses", // Alias for association
});

CoursesModel.belongsTo(UserModel, {
  foreignKey: "userId", // Ensure this matches the key in the CoursesModel
  as: "user", // Alias for association
});
