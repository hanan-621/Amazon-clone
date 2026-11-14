import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();

        setOrders(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      const data = await updateOrderStatus(
        orderId,
        status
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? data.data
            : order
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-5">
                <div>
                  <p className="font-bold">
                    Order ID
                  </p>

                  <p className="text-sm break-all">
                    {order._id}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Customer
                  </p>

                  <p>{order.user?.name}</p>
                  <p className="text-sm text-gray-600">
                    {order.user?.email}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Status
                  </p>

                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(
                        order._id,
                        event.target.value
                      )
                    }
                    className="border rounded px-3 py-2 mt-1"
                  >
                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="shipped">
                      Shipped
                    </option>

                    <option value="delivered">
                      Delivered
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>

              <div className="border-t pt-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b pb-4"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-20 h-20 object-contain"
                    />

                    <div>
                      <h2 className="font-semibold">
                        {item.product.title}
                      </h2>

                      <p>
                        Quantity: {item.quantity}
                      </p>

                      <p>
                        Price: 
                        {item.price.toFixed(2)}ETB
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-5 pt-5">
                <p>
                  <strong>Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  <strong>Shipping:</strong>{" "}
                  {order.shippingAddress}
                </p>

                <p className="text-xl font-bold mt-3">
                  Total: 
                  {order.totalAmount.toFixed(2)}ETB
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;