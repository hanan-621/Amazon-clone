import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getAllOrders, getUsers } from "../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError("");

        const [products, ordersResponse, users] = await Promise.all([
          getProducts(),
          getAllOrders(),
          getUsers(),
        ]);

        const orders = ordersResponse.data || [];

        const customers = users.filter(
          (user) => user.role === "customer"
        );

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          totalCustomers: customers.length,
        });
      } catch (err) {
        console.error("Dashboard statistics error:", err);
        setError(err.message || "Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="bg-white border rounded-lg p-6"
            >
              <p className="text-gray-500">
                {stat.title}
              </p>

              <p className="text-3xl font-bold mt-2">
                {loading ? "Loading..." : stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Link
            to="/admin/products"
            className="bg-white border rounded-lg p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              Manage Products
            </h2>
            <p className="text-gray-600 mt-2">
              Add, edit and delete products.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white border rounded-lg p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              Manage Orders
            </h2>
            <p className="text-gray-600 mt-2">
              View and update customer orders.
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-white border rounded-lg p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">
              Manage Users
            </h2>
            <p className="text-gray-600 mt-2">
              View, update roles and delete users.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
