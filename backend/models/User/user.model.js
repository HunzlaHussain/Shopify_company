const { DataTypes } = require("sequelize");
const { sequelize } = require("../../Connection_db/DB_Connection");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = sequelize.define(
  "UserModel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",

    hooks: {
      beforeSave: async (user) => {
        if (user.password) {
          const saltRounds = 10;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

// Add the Compare_Password method to the model's prototype
UserModel.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Add the Generate Token method to the model's prototype
UserModel.prototype.GenerateToken = function () {
  const token = jwt.sign(
    {
      id: this.id,
      email: this.email,
      name: this.name,
    },
    process.env.SCERET_KEY,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

// Export the UserModel
module.exports = UserModel;
