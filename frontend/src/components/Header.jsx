import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../api/api";

const Header = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState("Ethiopia");

  const loadCartCount = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const data = await getCart();

      const count = (data.items || []).reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);

    loadCartCount();

    const handleCartUpdated = () => {
      loadCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdated);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdated
      );
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(search.trim())}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setCartCount(0);

    navigate("/login");
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* Main Header */}
      <div className="flex items-center gap-3 px-3 py-3">
        
        {/* Amazon Style Logo */}
        <Link to="/" className="shrink-0">
                  <img src="/images/amazon-logo.png" alt="Amazon"
                  className="w-[110px] h-auto object-contain" />
         </Link>

        {/* Location */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-xl">
            📍
          </span>

          <div className="flex flex-col">
            <span className="text-xs text-gray-300">
              Deliver to
            </span>

            <select
              value={location}
              onChange={handleLocationChange}
              className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
            >
              <option
                value="Ethiopia"
                className="text-black"
              >
                Ethiopia
              </option>

              <option
                value="United States"
                className="text-black"
              >
                United States
              </option>

              <option
                value="United Kingdom"
                className="text-black"
              >
                United Kingdom
              </option>

              <option
                value="Canada"
                className="text-black"
              >
                Canada
              </option>

              <option
                value="Germany"
                className="text-black"
              >
                Germany
              </option>

              <option
                value="France"
                className="text-black"
              >
                France
              </option>

              <option
                value="United Arab Emirates"
                className="text-black"
              >
                United Arab Emirates
              </option>

              <option
                value="Saudi Arabia"
                className="text-black"
              >
                Saudi Arabia
              </option>
            </select>
          </div>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 min-w-0"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Amazon"
            className="w-full rounded-l-md border-2 border-gray-300 bg-white px-4 py-2 text-black outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="rounded-r-md bg-yellow-400 px-5 text-black hover:bg-yellow-500"
          >
            🔍
          </button>
        </form>

        {/* Mobile Account */}
        <div className="ml-auto flex items-center gap-2 md:hidden">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm"
              type="button"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm"
              type="button"
            >
              Sign in
            </button>
          )}

          <span className="text-xl">
            👤
          </span>
        </div>

        {/* Desktop Account */}
        <div className="hidden md:block shrink-0">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-left"
              type="button"
            >
              <p className="text-xs">
                Hello, User
              </p>

              <p className="font-bold">
                Logout
              </p>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-left"
              type="button"
            >
              <p className="text-xs">
                Hello, sign in
              </p>

              <p className="font-bold">
                Account & Lists
              </p>
            </button>
          )}
        </div>

        {/* Returns & Orders */}
        <button
          onClick={() => navigate("/orders")}
          className="hidden md:block text-left shrink-0"
          type="button"
        >
          <p className="text-xs">
            Returns
          </p>

          <p className="font-bold">
            & Orders
          </p>
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-1 shrink-0"
          type="button"
        >
          <span className="text-2xl">
            🛒
          </span>

          <span className="text-sm font-bold">
            {cartCount}
          </span>
        </button>
      </div>

      {/* Mobile Location */}
      <div className="sm:hidden px-3 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">
            📍
          </span>

          <span className="text-xs text-gray-300">
            Deliver to
          </span>

          <select
            value={location}
            onChange={handleLocationChange}
            className="bg-transparent text-sm font-bold text-white outline-none"
          >
            <option
              value="Ethiopia"
              className="text-black"
            >
              Ethiopia
            </option>

            <option
              value="United States"
              className="text-black"
            >
              United States
            </option>

            <option
              value="United Kingdom"
              className="text-black"
            >
              United Kingdom
            </option>

            <option
              value="Canada"
              className="text-black"
            >
              Canada
            </option>

            <option
              value="Germany"
              className="text-black"
            >
              Germany
            </option>

            <option
              value="France"
              className="text-black"
            >
              France
            </option>

            <option
              value="United Arab Emirates"
              className="text-black"
            >
              United Arab Emirates
            </option>

            <option
              value="Saudi Arabia"
              className="text-black"
            >
              Saudi Arabia
            </option>
          </select>
        </div>
      </div>

      {/* Mobile Search */}
      <form
        onSubmit={handleSearch}
        className="px-3 pb-3 md:hidden"
      >
        <div className="flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Amazon"
            className="w-full rounded-l-md border-2 border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-yellow-400"
          />

          <button
            type="submit"
            className="rounded-r-md bg-yellow-400 px-5 text-black hover:bg-yellow-500"
          >
            🔍
          </button>
        </div>
      </form>
    </header>
  );
};

export default Header;
