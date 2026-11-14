import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    brand: "",
    author: "",
    price: "",
    oldPrice: "",
    image: "",
    category: "",
    rating: {
      rate: "",
      count: "",
    },
    reviewCount: "",
    stock: "",
    condition: "New",
    freeDelivery: true,
  });

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setNewProduct({
      title: "",
      description: "",
      brand: "",
      author: "",
      price: "",
      oldPrice: "",
      image: "",
      category: "",
      rating: {
        rate: "",
        count: "",
      },
      reviewCount: "",
      stock: "",
      condition: "New",
      freeDelivery: true,
    });

    setEditingProductId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      rating: {
        ...newProduct.rating,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const productData = {
        title: newProduct.title,
        description: newProduct.description,
        brand: newProduct.brand,
        author: newProduct.author,
        price: Number(newProduct.price),
        oldPrice: newProduct.oldPrice
          ? Number(newProduct.oldPrice)
          : undefined,
        image: newProduct.image,
        category: newProduct.category,
        rating: {
          rate: newProduct.rating.rate
            ? Number(newProduct.rating.rate)
            : 0,
          count: newProduct.rating.count
            ? Number(newProduct.rating.count)
            : 0,
        },
        reviewCount: newProduct.reviewCount
          ? Number(newProduct.reviewCount)
          : 0,
        stock: Number(newProduct.stock),
        condition: newProduct.condition,
        freeDelivery: newProduct.freeDelivery,
      };

      if (editingProductId) {
        const updatedProduct = await updateProduct(
          editingProductId,
          productData
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === editingProductId
              ? updatedProduct
              : product
          )
        );

        setSuccess("Product updated successfully.");
      } else {
        const createdProduct = await createProduct(productData);

        setProducts((prevProducts) => [
          ...prevProducts,
          createdProduct,
        ]);

        setSuccess("Product added successfully.");
      }

      resetForm();
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);

    setNewProduct({
      title: product.title || "",
      description: product.description || "",
      brand: product.brand || "",
      author: product.author || "",
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
      image: product.image || "",
      category: product.category || "",
      rating: {
        rate: product.rating?.rate ?? "",
        count: product.rating?.count ?? "",
      },
      reviewCount: product.reviewCount ?? "",
      stock: product.stock ?? "",
      condition: product.condition || "New",
      freeDelivery: product.freeDelivery ?? true,
    });

    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== productId
        )
      );

      setSuccess("Product deleted successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Manage Products
          </h1>

          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Manage Products
          </h1>

          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              }

              setShowForm(!showForm);
              setError("");
              setSuccess("");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold"
          >
            {showForm ? "Close Form" : "Add Product"}
          </button>

        </div>

        {success && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded-lg p-4 mb-6">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white border rounded-lg p-6 mb-8"
          >

            <h2 className="text-xl font-semibold mb-6">
              {editingProductId
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <input
                type="text"
                name="title"
                value={newProduct.title}
                onChange={handleChange}
                placeholder="Product title"
                required
                className="border rounded-md px-4 py-3"
              />

              <input
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="border rounded-md px-4 py-3"
              />

              <input
                type="text"
                name="author"
                value={newProduct.author}
                onChange={handleChange}
                placeholder="Author (for books)"
                className="border rounded-md px-4 py-3"
              />

              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Price"
                min="0"
                step="0.01"
                required
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="oldPrice"
                value={newProduct.oldPrice}
                onChange={handleChange}
                placeholder="Old Price"
                min="0"
                step="0.01"
                className="border rounded-md px-4 py-3"
              />

              <input
                type="text"
                name="image"
                value={newProduct.image}
                onChange={handleChange}
                placeholder="/images/products/product.jpg"
                required
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
                min="0"
                required
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="rate"
                value={newProduct.rating.rate}
                onChange={handleRatingChange}
                placeholder="Rating (0 - 5)"
                min="0"
                max="5"
                step="0.1"
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="count"
                value={newProduct.rating.count}
                onChange={handleRatingChange}
                placeholder="Rating count"
                min="0"
                className="border rounded-md px-4 py-3"
              />

              <input
                type="number"
                name="reviewCount"
                value={newProduct.reviewCount}
                onChange={handleChange}
                placeholder="Review count"
                min="0"
                className="border rounded-md px-4 py-3"
              />

              <select
                name="condition"
                value={newProduct.condition}
                onChange={handleChange}
                className="border rounded-md px-4 py-3"
              >
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Refurbished">
                  Refurbished
                </option>
              </select>

            </div>

            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Product description"
              required
              rows="5"
              className="w-full border rounded-md px-4 py-3 mt-5"
            />

            <label className="flex items-center gap-3 mt-5">
              <input
                type="checkbox"
                checked={newProduct.freeDelivery}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    freeDelivery: e.target.checked,
                  })
                }
                className="w-5 h-5"
              />

              <span className="font-medium">
                Free Delivery
              </span>
            </label>

            <div className="flex gap-3 mt-6">

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                {editingProductId
                  ? "Update Product"
                  : "Save Product"}
              </button>

              {editingProductId && (
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        )}

        <div className="bg-white border rounded-lg overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Product
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Stock
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-t"
                >

                  <td className="p-4 font-semibold">
                    {product.title}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    {Number(product.price).toFixed(2)}ETB
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">

                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AdminProducts;

