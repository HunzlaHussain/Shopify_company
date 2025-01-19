"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      course_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      course_image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
