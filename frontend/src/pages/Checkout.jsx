import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  initializePayment,
  createCashOnDeliveryOrder,
} from "../api/api";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data.items || data.data?.items || []);
      } catch (error) {
        setError(error.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.product?.price || 0) * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !fullName.trim() ||
      !address.trim() ||
      !city.trim() ||
      !country.trim() ||
      !phone.trim()
    ) {
      setError("Please fill in all shipping information.");
      return;
    }
       
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!phoneRegex.test(phone.trim())) {
        setError("Please enter a valid phone number (7-15 digits).");
         return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const shippingAddress =
      `${fullName.trim()}, ${address.trim()}, ${city.trim()}, ` +
      `${country.trim()}, Phone: ${phone.trim()}`;

    try {
      setPlacingOrder(true);

      if (paymentMethod === "chapa") {
        const result = await initializePayment({ shippingAddress });

        if (!result.checkoutUrl) {
          throw new Error("Chapa checkout link was not returned.");
        }

        // Redirect the customer to Chapa's hosted checkout.
        window.location.href = result.checkoutUrl;
        return;
      }

      const result = await createCashOnDeliveryOrder({
        shippingAddress,
      });

      if (result.success === false) {
        throw new Error(result.message || "Could not place order.");
      }

      alert("Cash on Delivery order placed successfully!");
      navigate("/orders");
    } catch (error) {
      setError(error.message || "Unable to place your order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-6">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="mb-6 border border-red-300 bg-red-50 text-red-700 rounded-lg p-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-5">
              Shipping Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  pattern="[+]?[0-9]{7,15}"
                   minLength={7}
                   maxLength={16}
                  inputMode="tel"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-5">Payment Method</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="chapa"
                  checked={paymentMethod === "chapa"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                <div>
                  <p className="font-medium">Credit / Debit Card</p>
                  <p className="text-sm text-gray-500">
                    Pay securely through Chapa test checkout.
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay when your order is delivered.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-5">Your Items</h2>

            <div className="space-y-5">
              {cart.map((item) => {
                const product = item.product;

                if (!product) return null;

                return (
                  <div
                    key={product._id}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-semibold mt-2">
                        {(Number(product.price) * item.quantity).toFixed(2)}ETB 
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}ETB </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-700">FREE</span>
            </div>

            <hr />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)}ETB </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={placingOrder || cart.length === 0}
            className="w-full mt-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-semibold disabled:opacity-50"
          >
            {placingOrder
              ? "Processing..."
              : paymentMethod === "chapa"
                ? "Continue to Chapa"
                : "Place COD Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;