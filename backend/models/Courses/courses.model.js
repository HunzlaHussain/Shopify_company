const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Connection_db/DB_Connection");
const UserModel = require("../User/user.model");
const CoursesModel = sequelize.define(
  "courses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    course_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "courses",
  }
);

module.exports = CoursesModel;
