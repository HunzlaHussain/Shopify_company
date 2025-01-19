const { sequelize } = require("../Connection_db/DB_Connection");
const dotenv = require("dotenv");
dotenv.config();
const UserModel = require("../models/User/user.model");
const { validationResult } = require("express-validator");
var Cookies = require("cookies");

// ----------------------------------------------------------------Signup ----------------------------------------------------------------
module.exports.User_Signup = async (req, res) => {
  const errors = validationResult(req);
  if (errors.length) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already exists" }] });
    }

    await UserModel.create({ name, email, password });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
};

//----------------------------------------------------------------Login Form ----------------------------------------------------------------
// Login Controller
module.exports.User_Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }

    // Compare the provided password with the hashed password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid password" }] });
    }

    // Generate a token
    const token = user.GenerateToken();

    // Exclude the password field from the response
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Set token in cookies
    const cookies = new Cookies(req, res);
    cookies.set("token", token);

    res.json({
      message: "User logged in successfully",
      token,
      userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
};
