const API_URL = "https://amazon-clone-cs0k.onrender.com";

// ====================
// Products
// ====================

const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data;
};

const createProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product");
  }

  return data;
};

const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }

  return data;
};

const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }

  return data;
};

// ====================
// Users
// ====================

const getUsers = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get users");
  }

  return data.data;
};

const updateUserRole = async (userId, role) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user role");
  }

  return data.data;
};

const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user");
  }

  return data;
};

// ====================
// Authentication
// ====================

const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

// ====================
// Cart
// ====================

const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data;
};

const getCart = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get cart");
  }

  return data;
};

const updateCartQuantity = async (productId, quantity) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart quantity");
  }

  return data;
};

const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove product from cart");
  }

  return data;
};

// ====================
// Payments
// ====================

// Initialize Chapa payment
const initializePayment = async (paymentData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/payments/initialize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to initialize payment");
  }

  return data;
};

// Verify Chapa payment
const verifyPayment = async (txRef) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/payments/verify?tx_ref=${encodeURIComponent(txRef)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payment verification failed");
  }

  return data;
};

// Create Cash on Delivery order
const createCashOnDeliveryOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/payments/cash-on-delivery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to place COD order");
  }

  return data;
};

// ====================
// Orders
// ====================

const placeOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to place order");
  }

  return data;
};

const getOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get orders");
  }

  return data;
};

const getAllOrders = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders/admin`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get all orders");
  }

  return data;
};

const updateOrderStatus = async (orderId, status) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
};

// ====================
// Export
// ====================

export {
  // Products
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,

  // Users
  getUsers,
  updateUserRole,
  deleteUser,

  // Authentication
  loginUser,
  registerUser,

  // Cart
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,

  // Payments
  initializePayment,
  verifyPayment,
  createCashOnDeliveryOrder,

  // Orders
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
};

export default API_URL;