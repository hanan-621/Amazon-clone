const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Create User
router.post("/", createUser);

// Login User
router.post("/login", loginUser);

// Admin: Get All Users
router.get("/", protect, admin, getUsers);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    user: req.user,
  });
});

// Get User by ID
router.get("/:id", getUserById);

// Admin: Update User Role
router.put("/:id/role", protect, admin, updateUserRole);

// Admin: Delete User
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
