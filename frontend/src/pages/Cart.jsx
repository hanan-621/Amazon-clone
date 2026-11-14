import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../api/api";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


 // Fetch cart
  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      // Redirect users who are not logged in
      if (!token) {
        navigate("/login", { replace: true});
        return;
      }

      try {
        const data = await getCart();

        if (isMounted) {
          setCart(data.items || []);
          setError("");
        }
      } catch (error) {
        const message = error.message.toLowerCase();

        if (
          message.includes("invalid or expired token") ||
          message.includes("token expired") ||
          message.includes("unauthorized")
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true });
          return;
        }

        if (isMounted) {
          setError(error.message || "Failed to load cart.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, [navigate]);



  // Update quantity
  const handleQuantityChange = async (
    productId,
    newQuantity
  ) => {
    if (newQuantity < 1) {
      return;
    }

    try {
      const data = await updateCartQuantity(
        productId,
        newQuantity
      );

      setCart(data.items || []);

      // Tell Header that the cart has changed
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      setError(error.message);
    }
  };

  // Remove product
  const handleRemove = async (productId) => {
    try {
      const data = await removeFromCart(productId);

      setCart(data.items || []);

      // Tell Header that the cart has changed
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      setError(error.message);
    }
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Shopping Cart
        </h1>

        <p className="text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="border rounded-lg p-6">
          <p className="text-gray-600">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Products */}
          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (
              <div
                key={item.product._id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row gap-5"
              >

                {/* Product Image */}
                <div className="w-full sm:w-40 h-40 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Information */}
                <div className="flex-1">

                  <h2 className="text-xl font-semibold mb-2">
                    {item.product.title}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    {item.product.description}
                  </p>

                  <p className="text-lg font-semibold mb-2">
                   {item.product.price}ETB
                  </p>

                  <p className="text-green-700 font-medium">
                    In Stock
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">

                    <span className="font-semibold">
                      Quantity:
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      -
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="w-8 h-8 border rounded hover:bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    onClick={() =>
                      handleRemove(item.product._id)
                    }
                    className="text-red-600 hover:text-red-800 hover:underline mt-4"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* Cart Summary */}
          <div className="border rounded-lg p-6 h-fit">

            <h2 className="text-xl font-bold mb-5">
              Cart Summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Subtotal:</span>

                <span>
                  {subtotal.toFixed(2)}ETB
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping:</span>

                <span className="text-green-700">
                  FREE
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>

                <span>
                  {total.toFixed(2)}ETB
                </span>
              </div>

            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 font-semibold"
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;