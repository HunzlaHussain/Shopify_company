"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("courses", "course_duration", {
      type: Sequelize.STRING,
      allowNull: false, // or true if null values are allowed
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("courses", "course_duration", {
      type: Sequelize.INTEGER,
      allowNull: false, // or true if null values are allowed
    });
  },
};
