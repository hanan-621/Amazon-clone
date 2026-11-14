import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);

  const linkClass =
    "cursor-pointer transition-colors duration-200 hover:text-yellow-400";

  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Home & Kitchen",
  ];

  return (
    <nav className="relative bg-gray-800 text-white">
      <div className="flex gap-6 overflow-x-auto px-4 py-3 text-sm font-medium whitespace-nowrap">

        {/* All */}
        <button
          type="button"
          onClick={() =>
            setShowCategories((previous) => !previous)
          }
          aria-expanded={showCategories}
          className={`${linkClass} shrink-0`}
        >
          ☰ All
        </button>

        {/* Deals */}
        <Link
          to="/products"
          className={`${linkClass} shrink-0`}
        >
          Deals
        </Link>

        {/* Lists - UI Only */}
        <button
          type="button"
          onClick={() =>
            window.alert(
              "Lists feature is available for a future update."
            )
          }
          className={`${linkClass} shrink-0`}
        >
          Lists
        </button>

        {/* Video - UI Only */}
        <button
          type="button"
          onClick={() =>
            window.alert(
              "Video feature is available for a future update."
            )
          }
          className={`${linkClass} shrink-0`}
        >
          Video
        </button>

        {/* Music - UI Only */}
        <button
          type="button"
          onClick={() =>
            window.alert(
              "Music feature is available for a future update."
            )
          }
          className={`${linkClass} shrink-0`}
        >
          Music
        </button>

        {/* Best Sellers */}
        <Link
          to="/products"
          className={`${linkClass} shrink-0`}
        >
          Best Sellers
        </Link>

        {/* New Releases */}
        <Link
          to="/products"
          className={`${linkClass} shrink-0`}
        >
          New Releases
        </Link>

      </div>

      {/* Categories Dropdown */}
      {showCategories && (
        <>
          <button
            type="button"
            aria-label="Close categories menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setShowCategories(false)}
          />

          <div className="absolute left-4 top-full z-50 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white text-gray-900 shadow-xl">

            <div className="bg-gray-100 px-4 py-3 font-bold">
              Shop by Category
            </div>

            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(
                  category
                )}`}
                onClick={() => setShowCategories(false)}
                className="block border-t border-gray-100 px-4 py-3 transition-colors hover:bg-gray-100 hover:text-orange-600"
              >
                {category}
              </Link>
            ))}

            <Link
              to="/products"
              onClick={() => setShowCategories(false)}
              className="block border-t border-gray-200 px-4 py-3 font-semibold text-blue-700 hover:bg-gray-100"
            >
              View All Products →
            </Link>

          </div>
        </>
      )}

    </nav>
  );
};

export default Navbar;

