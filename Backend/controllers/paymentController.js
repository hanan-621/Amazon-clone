const crypto = require("crypto");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

  const CHAPA_URL =
  "https://api.chapa.co/v1/transaction/initialize";

  const CHAPA_VERIFY_URL =
  "https://api.chapa.co/v1/transaction/verify";

const initializePayment = async (req, res) => {
  try {
    if (!process.env.CHAPA_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Chapa secret key is missing",
      });
    }

    const userId = req.user.userId || req.user.id || req.user._id;

    const{shippingAddress} = req.body;

    if(!shippingAddress){
      return res.status(400).json({
        success:false,
        message:"Shipping address is required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart || !cart.items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists",
        });
      }

      if (
        !Number.isFinite(product.price) ||
        product.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product price or quantity",
        });
      }

      orderItems.push({
        product: product._id,
        title: product.title,
        image: product.image || "",
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    totalAmount = Number(totalAmount.toFixed(2));

    if (totalAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount",
      });
    }

    const txRef = `amazon-${crypto.randomUUID()}`;

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      currency: "ETB",
      paymentMethod: "chapa",
      paymentStatus: "pending",
      txRef,
      status: "pending",
    });

    const nameParts = user.name.trim().split(/\s+/);

    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "Customer";

    const chapaResponse = await fetch(
      CHAPA_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "ETB",
          tx_ref: txRef,
          customer: {
            first_name: firstName,
            last_name: lastName,
            email: user.email,
          },
          meta: {
            order_id: order._id.toString(),
          },
          return_url:
            `${process.env.CLIENT_URL}/payment-result?tx_ref=${encodeURIComponent(txRef)}`,
        }),
      }
    );

    const chapaData = await chapaResponse.json();
    console.log("Amazon txRef:", txRef);
console.log("Chapa initialize response:", chapaData);


    const checkoutUrl =
      chapaData.data?.checkout_url ||
      chapaData.checkout_url;

    if (!chapaResponse.ok || !checkoutUrl) {
      order.paymentStatus = "failed";
      await order.save();

      console.error("Chapa initialization failed:", chapaData);

      return res.status(502).json({
        success: false,
        message: "Unable to initialize Chapa payment",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment initialized",
      checkoutUrl,
      txRef,
      orderId: order._id,
    });
  } catch (error) {
    console.error("Initialize payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to initialize payment",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const txRef = req.query.tx_ref;
    console.log("Returned tx_ref:",txRef);
    

    if (!txRef) {
      return res.status(400).json({
        success: false,
        message: "Transaction reference is required",
      });
    }

    const userId = req.user.userId || req.user.id || req.user._id;

    const order = await Order.findOne({
      txRef,
      user: userId,
      paymentMethod: "chapa",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        paymentStatus: "paid",
        message: "Payment already verified",
      });
    }

    const chapaResponse = await fetch(
      `${CHAPA_VERIFY_URL}/${encodeURIComponent(txRef)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const chapaData = await chapaResponse.json();
    const payment = chapaData.data;
    console.log("FULL CHAPA VERIFY RESPONSE:", JSON.stringify(chapaData, null, 2));

    if (!chapaResponse.ok || !payment) {
      console.error("Chapa HTTP status:",chapaResponse.status);
      console.error("Chapa verification response:",chapaData);
      return res.status(502).json({
        success: false,
        message: "Unable to verify payment with Chapa",
      });
    }

    const verifiedAmount = Number(payment.amount);
    const verifiedCurrency = String(
      payment.currency || ""
    ).toUpperCase();

      const verifiedReference =
      payment.tx_ref || "";

    if (
      chapaData.status !== "success" ||
      payment.status !== "success" ||
      verifiedAmount !== order.totalAmount ||
      verifiedCurrency !== order.currency ||
      verifiedReference !== order.txRef
    ) {
      return res.status(400).json({
        success: false,
        paymentStatus: payment.status || "unverified",
        message: "Payment could not be verified",
      });
    }

    order.paymentStatus = "paid";
    order.status = "processing";

    await order.save();

    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    return res.status(200).json({
      success: true,
      paymentStatus: "paid",
      message: "Payment verified successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Verify payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};





const createCashOnDeliveryOrder = async (req, res) => {
  try {
    const userId = req.user.userId || req.user.id || req.user._id;

    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart || !cart.items.length) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    // Validate products and stock before creating the order
    for (const item of cart.items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "A product in your cart no longer exists",
        });
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }

      // Stock validation
      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}. Available stock: ${product.stock}`,
        });
      }

      orderItems.push({
        product: product._id,
        title: product.title,
        image: product.image || "",
        price: product.price,
        quantity: item.quantity,
      });

      totalAmount += product.price * item.quantity;
    }

    totalAmount = Number(totalAmount.toFixed(2));

    // Create order only after all stock validations pass
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      currency: "ETB",
      paymentMethod: "cash_on_delivery",
      paymentStatus: "pending",
      status: "pending",
    });

    // Clear cart only after successful order creation
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    return res.status(201).json({
      success: true,
      message: "Cash on Delivery order created",
      order,
    });
  } catch (error) {
    console.error("Cash on delivery error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};



module.exports = {
  initializePayment,
  verifyPayment,
  createCashOnDeliveryOrder,
};