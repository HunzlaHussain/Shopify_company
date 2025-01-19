const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the directory path for uploaded files
const directoryPath = path.join(__dirname, "../uploads/courses");

// Ensure the directory exists, create it if necessary
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath, { recursive: true });
}

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directoryPath); // Folder to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate unique filename by appending the current timestamp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Filter to allow only certain file types (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, or JPG files are allowed!"), false);
  }
};

// Set the upload configuration (storage, fileFilter, fileSize limit)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Export the upload middleware to be used in routes
module.exports = upload;
