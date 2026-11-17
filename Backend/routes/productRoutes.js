const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts
} = require("../controllers/productController");

const router = express.Router();

// Get all products
router.get("/", getProducts);

// Search and filter products
router.get("/search", searchProducts);

// Seed products
router.post("/seed",protect,admin, seedProducts);

// Get single product
router.get("/:id", getProductById);

// Create product
router.post("/", protect, admin, createProduct);

// Update product
router.put("/:id",protect,admin, updateProduct);

// Delete product
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
