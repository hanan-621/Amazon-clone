import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import PaymentResult from "./pages/PaymentResult";

import InfoPage from "./pages/InfoPages";

import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment-result" element={<PaymentResult/>}/>

        {/* Footer Information Pages */}
        <Route
          path="/about"
          element={<InfoPage page="about" />}
        />

        <Route
          path="/careers"
          element={<InfoPage page="careers" />}
        />

        <Route
          path="/contact"
          element={<InfoPage page="contact" />}
        />

        <Route
          path="/sell"
          element={<InfoPage page="sell" />}
        />

        <Route
          path="/affiliate"
          element={<InfoPage page="affiliate" />}
        />

        <Route
          path="/advertise"
          element={<InfoPage page="advertise" />}
        />

        <Route
          path="/help"
          element={<InfoPage page="help" />}
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
        />

        <Route
          path="/admin/products"
          element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
        />

        <Route
          path="/admin/orders"
          element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
        />

        <Route
          path="/admin/users"
          element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
        />


          {/* 404 Page */}
      <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />
    </>
  );
};

export default App;
