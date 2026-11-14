import { useEffect, useState } from "react";
import {useNavigate , useLocation} from "react-router-dom";
import { getOrders } from "../api/api";

const MyOrders = () => {
  const navigate =useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true ;

    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      // Redirect users who are not logged in
      if (!token) {
        navigate("/login", { replace: true , state:{from: location},
        });
        return;
      }

      try {
        const data = await getOrders();

        if (isMounted){
          setOrders(data.data || []);
          setError("");
        }
      } catch (error) {
        const message = (error.message || "").toLowerCase();


        if(
          message.includes("invalid or expired token ")  ||
          message.includes("token expired") ||
          message.includes("unauthorized")
        ){
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login", { replace: true , state:{from: location},
          });
          return;
        }


        if(isMounted){
          setError(error.message || "Failed to Load orders.");
        }
      } finally {
        if(isMounted){
          setLoading(false);
        }
      }
    };

    fetchOrders();
  
    return () => {
      isMounted = false;
    };
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          My Orders
        </h1>

        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          My Orders
        </h1>

        <div className="border border-red-300 bg-red-50 text-red-700 rounded-lg p-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="border rounded-lg p-6">
          <p className="text-gray-600">
            You have no orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                <div>
                  <p className="font-semibold">
                    Order ID
                  </p>

                  <p className="text-sm text-gray-600 break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Order Date
                  </p>

                  <p className="text-sm text-gray-600">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">
                    Status
                  </p>

                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-5 space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="w-28 h-28 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="font-semibold text-lg">
                        {item.product.title}
                      </h2>

                      <p className="text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="font-semibold mt-2">
                        {item.price.toFixed(2)}ETB
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Item total: 
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}ETB
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-5 space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method</span>

                  <span className="font-medium">
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Address</span>

                  <span className="font-medium text-right max-w-md">
                    {order.shippingAddress}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>

                  <span>
                    {order.totalAmount.toFixed(2)}ETB
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;