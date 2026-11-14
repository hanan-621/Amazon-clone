const express = require("express");

const {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Customer
router.post("/", protect, createOrder);

router.get("/", protect, getOrders);

// Admin
router.get("/admin", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;