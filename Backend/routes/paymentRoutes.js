const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  initializePayment,
  verifyPayment,
  createCashOnDeliveryOrder,
} = require("../controllers/paymentController");

router.post("/initialize", protect, initializePayment);
router.get("/verify", protect, verifyPayment);
router.post(
  "/cash-on-delivery",
  protect,
  createCashOnDeliveryOrder
);

module.exports = router;