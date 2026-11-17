import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts } from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedCategory =
    searchParams.get("category") || "All Products";

  const [priceFilter, setPriceFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [discountFilter, setDiscountFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState(false);
  const [deliveryFilter, setDeliveryFilter] = useState(false);
  const [conditionFilter, setConditionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    // Search Filter
    .filter((product) => {
      if (!searchQuery.trim()) {
        return true;
      }

      const search = searchQuery.toLowerCase().trim();

      return (
        product.title.toLowerCase().includes(search) ||
        product.brand.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      );
    })

    // Category Filter
    .filter((product) => {
      if (selectedCategory === "All Products") {
        return true;
      }

      return (
        product.category.toLowerCase() ===
        selectedCategory.toLowerCase()
      );
    })

    // Price Filter
    .filter((product) => {
      if (priceFilter === "under2500") {
        return product.price < 2500;
      }

      if (priceFilter === "2500to5000") {
        return product.price >= 2500 && product.price <= 5000;
      }

      if (priceFilter === "5000to10000") {
        return product.price > 5000 && product.price <= 10000;
      }

      if (priceFilter === "over10000") {
        return product.price > 10000;
      }

      return true;
    })

    // Brand Filter
    .filter((product) => {
      if (brandFilter === "all") {
        return true;
      }

      return product.brand === brandFilter;
    })

    // Rating Filter
    .filter((product) => {
      if (ratingFilter === "4") {
        return product.rating.rate >= 4;
      }

      if (ratingFilter === "4.5") {
        return product.rating.rate >= 4.5;
      }

      return true;
    })

    // Discount Filter
    .filter((product) => {
      const discount =
        ((product.oldPrice - product.price) /
          product.oldPrice) *
        100;

      if (discountFilter === "10") {
        return discount >= 10;
      }

      if (discountFilter === "20") {
        return discount >= 20;
      }

      return true;
    })

    // Availability Filter
    .filter((product) => {
      if (stockFilter) {
        return product.stock > 0;
      }

      return true;
    })

    // Delivery Filter
    .filter((product) => {
      if (deliveryFilter) {
        return product.freeDelivery === true;
      }

      return true;
    })

    // Condition Filter
    .filter((product) => {
      if (conditionFilter === "all") {
        return true;
      }

      return product.condition === conditionFilter;
    })

    // Sorting
    .sort((a, b) => {
      if (sortBy === "priceLow") {
        return a.price - b.price;
      }

      if (sortBy === "priceHigh") {
        return b.price - a.price;
      }

      if (sortBy === "rating") {
        return b.rating.rate - a.rating.rate;
      }

      return 0;
    });

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-300 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategory}
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              {filteredProducts.length} products
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-sm text-gray-700"
            >
              Sort by:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
            >
              <option value="featured">Featured</option>
              <option value="priceLow">
                Price: Low to High
              </option>
              <option value="priceHigh">
                Price: High to Low
              </option>
              <option value="rating">
                Customer Rating
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">

          {/* Filters */}
          <aside className="w-full shrink-0 rounded-lg bg-white p-5 shadow-sm md:w-56 md:self-start">

            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Filters
            </h2>

            {/* Price */}
            <div className="border-b border-gray-200 pb-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Price
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="all"
                    checked={priceFilter === "all"}
                    onChange={(e) =>
                      setPriceFilter(e.target.value)
                    }
                  />
                  All prices
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="under2500"
                    checked={priceFilter === "under2500"}
                    onChange={(e) =>
                      setPriceFilter(e.target.value)
                    }
                  />
                  Under 2500ETB
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="2500to5000"
                    checked={priceFilter === "2500to5000"}
                    onChange={(e) =>
                      setPriceFilter(e.target.value)
                    }
                  />
                  2500ETB - 5000ETB
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="5000to10000"
                    checked={priceFilter === "5000to10000"}
                    onChange={(e) =>
                      setPriceFilter(e.target.value)
                    }
                  />
                  5000ETB - 10000ETB
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="over10000"
                    checked={priceFilter === "over10000"}
                    onChange={(e) =>
                      setPriceFilter(e.target.value)
                    }
                  />
                  Over 10000ETB
                </label>

              </div>
            </div>

            {/* Brand */}
            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Brand
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="all"
                    checked={brandFilter === "all"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  All brands
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="Apple"
                    checked={brandFilter === "Apple"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  Apple
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="Samsung"
                    checked={brandFilter === "Samsung"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  Samsung
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="Sony"
                    checked={brandFilter === "Sony"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  Sony
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="Nike"
                    checked={brandFilter === "Nike"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  Nike
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="brand"
                    value="Dell"
                    checked={brandFilter === "Dell"}
                    onChange={(e) =>
                      setBrandFilter(e.target.value)
                    }
                  />
                  Dell
                </label>

              </div>
            </div>

            {/* Customer Rating */}
            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Customer Rating
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="rating"
                    value="all"
                    checked={ratingFilter === "all"}
                    onChange={(e) =>
                      setRatingFilter(e.target.value)
                    }
                  />
                  All ratings
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="rating"
                    value="4.5"
                    checked={ratingFilter === "4.5"}
                    onChange={(e) =>
                      setRatingFilter(e.target.value)
                    }
                  />
                  ⭐ 4.5 & up
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    checked={ratingFilter === "4"}
                    onChange={(e) =>
                      setRatingFilter(e.target.value)
                    }
                  />
                  ⭐ 4 & up
                </label>

              </div>
            </div>

            {/* Discount */}
            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Discount
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="discount"
                    value="all"
                    checked={discountFilter === "all"}
                    onChange={(e) =>
                      setDiscountFilter(e.target.value)
                    }
                  />
                  All discounts
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="discount"
                    value="10"
                    checked={discountFilter === "10"}
                    onChange={(e) =>
                      setDiscountFilter(e.target.value)
                    }
                  />
                  10% off or more
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="discount"
                    value="20"
                    checked={discountFilter === "20"}
                    onChange={(e) =>
                      setDiscountFilter(e.target.value)
                    }
                  />
                  20% off or more
                </label>

              </div>
            </div>

            {/* Availability */}
            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Availability
              </h3>

              <label className="flex gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={stockFilter}
                  onChange={(e) =>
                    setStockFilter(e.target.checked)
                  }
                />
                In Stock
              </label>
            </div>

            {/* Delivery */}
            <div className="border-b border-gray-200 py-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Delivery
              </h3>

              <label className="flex gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={deliveryFilter}
                  onChange={(e) =>
                    setDeliveryFilter(e.target.checked)
                  }
                />
                FREE Delivery
              </label>
            </div>

            {/* Condition */}
            <div className="pt-5">
              <h3 className="mb-3 font-semibold text-gray-900">
                Condition
              </h3>

              <div className="space-y-3 text-sm text-gray-700">

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="condition"
                    value="all"
                    checked={conditionFilter === "all"}
                    onChange={(e) =>
                      setConditionFilter(e.target.value)
                    }
                  />
                  All conditions
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="condition"
                    value="New"
                    checked={conditionFilter === "New"}
                    onChange={(e) =>
                      setConditionFilter(e.target.value)
                    }
                  />
                  New
                </label>

                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="condition"
                    value="Used"
                    checked={conditionFilter === "Used"}
                    onChange={(e) =>
                      setConditionFilter(e.target.value)
                    }
                  />
                  Used
                </label>

              </div>
            </div>

          </aside>

          {/* Products */}
          <section className="flex-1">

            {filteredProducts.length > 0 ? (
              <div className="space-y-4">

                {filteredProducts.map((product) => {

                  const discount = Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  );

                  return (
                    <article
                      key={product._id}
                      className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row"
                    >

                      {/* Product Image */}
                      <div className="flex h-56 w-full shrink-0 items-center justify-center sm:w-56">
                        <Link to={`/products/${product._id}`}>
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-65 w-full object-contain"
                          />
                        </Link>
                      </div>

                      {/* Product Information */}
                      <div className="flex flex-1 flex-col">

                        <p className="text-sm text-gray-500">
                          {product.brand}
                        </p>

                        <Link to={`/products/${product._id}`}>
                          <h2 className="mt-1 text-xl font-semibold leading-7 text-gray-900">
                            {product.title}
                          </h2>
                        </Link>

                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                          {product.description}
                        </p>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-medium text-blue-600">
                            ⭐ {product.rating.rate}
                          </span>

                          <span className="text-sm text-gray-500">
                            ({product.rating.count} ratings)
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <span className="text-2xl font-bold text-gray-900">
                            {product.price}ETB
                          </span>

                          <span className="text-sm text-gray-500 line-through">
                            {product.oldPrice}ETB
                          </span>

                          <span className="text-sm font-medium text-red-600">
                            {discount}% off
                          </span>
                        </div>

                        {/* Delivery */}
                        <p className="mt-2 text-sm text-gray-700">
                          {product.freeDelivery
                            ? "FREE delivery"
                            : "Delivery available"}
                        </p>

                        {/* Stock */}
                        <p
                          className={`mt-1 text-sm font-medium ${
                            product.stock > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {product.stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>

                        {/* Condition */}
                        <p className="mt-1 text-sm text-gray-600">
                          Condition: {product.condition}
                        </p>

                        {/* Add to Cart */}
                        <button
                          className="mt-4 w-full rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-yellow-500 sm:w-40"
                        >
                          Add to Cart
                        </button>

                      </div>
                    </article>
                  );
                })}

              </div>
            ) : (
              <div className="rounded-lg bg-white p-10 text-center">
                <p className="text-gray-500">
                  No products found.
                </p>
              </div>
            )}

          </section>
        </div>
      </div>
    </main>
  );
};

export default Products;
