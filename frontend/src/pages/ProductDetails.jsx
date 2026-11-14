import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../api/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://amazon-clone-cs0k.onrender.com/api/products/${id}`
        );

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold">
          Product not found
        </h2>
      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);

      // Tell Header that the cart has changed
      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="flex justify-center items-start">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-[400px] object-contain"
          />
        </div>

        {/* Product Information */}
        <div>
          <p className="text-blue-600 text-sm mb-2">
            {product.brand}
          </p>

          <h1 className="text-3xl font-semibold mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">
              ★ {product.rating.rate}
            </span>

            <span className="text-blue-600">
              {product.rating.count} ratings
            </span>
          </div>

          <hr className="mb-4" />

          {/* Price */}
          <div className="mb-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold">
                {product.price}ETB
              </span>

              <span className="text-gray-500 line-through">
                {product.oldPrice}ETB
              </span>
            </div>

            <p className="text-red-600 mt-1">
              {discount}% off
            </p>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h2 className="font-bold mb-2">
              About this item
            </h2>

            <p className="text-gray-700 leading-6">
              {product.description}
            </p>
          </div>

          {/* Delivery */}
          <p className="mb-2">
            <span className="font-semibold">
              Delivery:{" "}
            </span>

            {product.freeDelivery
              ? "FREE Delivery"
              : "Standard Delivery"}
          </p>

          {/* Condition */}
          <p className="mb-2">
            <span className="font-semibold">
              Condition:{" "}
            </span>

            {product.condition}
          </p>

          {/* Stock */}
          <p
            className={`font-semibold ${
              product.stock > 0
                ? "text-green-700"
                : "text-red-600"
            }`}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Quantity + Buttons */}
          <div className="mt-6 border-t pt-6">

            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <span className="font-semibold">
                  Quantity:
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.max(1, prev - 1)
                    )
                  }
                  className="w-9 h-9 border rounded hover:bg-gray-100"
                >
                  -
                </button>

                <span className="w-8 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(product.stock, prev + 1)
                    )
                  }
                  className="w-9 h-9 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
              >
                Add to Cart
              </button>

              <button
                disabled={product.stock === 0}
                className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
              >
                Buy Now
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;