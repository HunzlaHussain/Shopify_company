const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User/user.model");

module.exports.Authorization = async function (req, res, next) {
  try {
    // Retrieve token from cookies or Authorization header
    const token =
      req.cookies?.token || // From cookies
      (req.headers.authorization && req.headers.authorization.split(" ")[1]); // From Authorization header

    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, "hello_world_key");
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", err: err });
    }

    // Check if decoded token contains a valid user ID
    if (!decoded.id) {
      return res
        .status(401)
        .json({ message: "Invalid token, missing user ID" });
    }

    // Retrieve user from the database
    const user = await UserModel.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authorization middleware:", error);
    res
      .status(500)
      .json({ error: "Server error authenticating user: " + error.message });
  }
};
