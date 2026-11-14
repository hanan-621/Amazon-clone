import { Link } from "react-router-dom";

const Footer = () => {
  const linkClass =
    "text-gray-300 transition-colors duration-200 hover:text-yellow-400";

  return (
    <footer className="mt-10 bg-gray-900 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* Get to Know Us */}
          <div>
            <h2 className="mb-5 text-lg font-bold">
              Get to Know Us
            </h2>

            <ul className="space-y-3">
              <li>
                <Link to="/about" className={linkClass}>
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/careers" className={linkClass}>
                  Careers
                </Link>
              </li>

              <li>
                <Link to="/contact" className={linkClass}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h2 className="mb-5 text-lg font-bold">
              Make Money with Us
            </h2>

            <ul className="space-y-3">
              <li>
                <Link to="/sell" className={linkClass}>
                  Sell Products
                </Link>
              </li>

              <li>
                <Link to="/affiliate" className={linkClass}>
                  Become an Affiliate
                </Link>
              </li>

              <li>
                <Link to="/advertise" className={linkClass}>
                  Advertise Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h2 className="mb-5 text-lg font-bold">
              Customer Service
            </h2>

            <ul className="space-y-3">
              <li>
                <Link to="/login" className={linkClass}>
                  Your Account
                </Link>
              </li>

              <li>
                <Link to="/orders" className={linkClass}>
                  Returns
                </Link>
              </li>

              <li>
                <Link to="/help" className={linkClass}>
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop With Us */}
          <div>
            <h2 className="mb-5 text-lg font-bold">
              Shop With Us
            </h2>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/products?category=electronics"
                  className={linkClass}
                >
                  Electronics
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=fashion"
                  className={linkClass}
                >
                  Fashion
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=books"
                  className={linkClass}
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  to="/products?category=Home%20%26%20Kitchen"
                  className={linkClass}
                >
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-7 text-center">

          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-white"
          >
            amazon<span className="text-yellow-400">.</span>
          </Link>

          <p className="mt-4 text-sm text-gray-400">
            © 2026 Amazon Clone. All rights reserved.
          </p>

          

        </div>

      </div>

    </footer>
  );
};

export default Footer;
