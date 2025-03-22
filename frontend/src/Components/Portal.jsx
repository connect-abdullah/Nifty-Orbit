import { useEffect, useState } from "react";
import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import { productList } from "../apis/api";
import bgimage from "../assets/5418488_2828411.png";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_part_number: "",
    product_price: "",
    product_short_description: "",
    product_condition: "",
    product_sub_condition: "",
    product_quantity: "",
    product_image: null, // file object if needed
    product_preview: "", // URL for preview
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await productList();
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setAllProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product?.product_part_number.toLowerCase().includes(value.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter(
      (product) => product?.product_product_id !== id
    );
    setProducts(updatedProducts);
    setAllProducts(updatedProducts);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({
        ...prev,
        product_image: file,
        product_preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEdit = (product) => {
    setEditProductId(product.product_product_id);
    setNewProduct({
      product_part_number: product?.product_part_number,
      product_price: product?.product_price,
      product_short_description: product?.product_short_description,
      product_condition: product?.product_condition,
      product_sub_condition: product?.product_sub_condition,
      product_quantity: product?.product_quantity,
      product_image: product?.product_image || null,
      product_preview: product?.product_image || "",
    });
    setShowPopup(true);
  };

  // This handleNewProductChange handles text/number inputs.
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleNewProductSubmit = (e) => {
    e.preventDefault();
    const productToSave = {
      product_product_id: editProductId || Date.now(),
      product_part_number: newProduct?.product_part_number,
      product_price: newProduct?.product_price,
      product_short_description: newProduct?.product_short_description,
      product_condition: newProduct?.product_condition,
      product_sub_condition: newProduct?.product_sub_condition,
      product_quantity: newProduct?.product_quantity,
      product_image: newProduct?.product_preview, // Save the preview URL as the image field
    };

    if (editProductId) {
      const updatedProducts = products.map((p) =>
        p.product_product_id === editProductId ? productToSave : p
      );
      setProducts(updatedProducts);
      setAllProducts(updatedProducts);
    } else {
      setProducts([productToSave, ...products]);
      setAllProducts([productToSave, ...allProducts]);
    }

    setShowPopup(false);
    setNewProduct({
      product_part_number: "",
      product_price: "",
      product_short_description: "",
      product_condition: "",
      product_sub_condition: "",
      product_quantity: "",
      product_image: null,
      product_preview: "",
    });
    setEditProductId(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col gap-6 px-2 sm:px-4">
        <div className="w-full px-2 sm:px-4 md:px-20 relative flex flex-col items-center">
          <button
            className="absolute top-4 right-4 md:top-8 md:right-20 bg-purple-400 text-sm md:text-base text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-white hover:text-purple-700 transition"
            onClick={() => {
              setShowPopup(true);
              setEditProductId(null);
            }}
          >
            Add Product
          </button>

          <h1 className="text-3xl md:text-5xl text-white font-bold text-center mb-6 p-6 mt-12 md:mt-0">
            Products ({products.length})
          </h1>

          <div className="mb-8 flex justify-center w-full">
            <input
              placeholder="Search by Part Number..."
              className="px-4 py-2 w-full max-w-md rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-gray-800 focus:text-white text-black font-bold text-sm sm:text-base md:text-lg"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products?.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {products.slice(0, visibleCount).map((product) => (
                <div
                  key={product?.product_product_id}
                  className="relative text-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 cursor-pointer overflow-hidden bg-[#2a1143]"
                >
                  <img
                    src={
                      product?.product_image ||
                      "https://via.placeholder.com/150"
                    }
                    alt={product?.product_part_number}
                    className="w-32 h-32 md:w-50 md:h-50 rounded-lg mb-4 object-cover"
                  />
                  <h2 className="text-lg font-bold text-center">
                    {product?.product_part_number}
                  </h2>
                  <p className="text-sm text-center text-gray-300">
                    {product?.product_short_description}
                  </p>
                  <p className="text-sm text-center">
                    Condition: {product?.product_condition}
                  </p>
                  <p className="text-sm text-center text-gray-400">
                    Sub Condition: {product?.product_sub_condition}
                  </p>
                  <p className="text-purple-400 text-2xl text-right">
                    ${product?.product_price}
                  </p>
                  <p className="text-sm text-center text-gray-300">
                    Quantity: {product?.product_quantity}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 px-3 py-1 rounded-md text-white hover:bg-yellow-600 text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product.product_product_id)}
                      className="bg-red-500 px-3 py-1 rounded-md text-white hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {visibleCount < products.length && (
        <div className="mt-6 flex justify-center w-full">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {showPopup && (
        <div
          style={{ backgroundImage: `url(${bgimage})` }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <form
            onSubmit={handleNewProductSubmit}
            className="bg-purple-100 p-7 rounded-xl space-y-1.5 w-full max-w-md overflow-y-auto max-h-[90vh]"
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-bold">
              {editProductId ? "Update Product" : "Add New Product"}
            </h2>

            <label>Part Number</label>
            <input
              type="text"
              name="product_part_number"
              value={newProduct?.product_part_number}
              onChange={handleNewProductChange}
              placeholder="Part Number"
              className="w-full border p-2 rounded"
              required
            />

            <label>Price</label>
            <input
              type="number"
              name="product_price"
              value={newProduct?.product_price}
              onChange={handleNewProductChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
              required
            />

            <label>Short Description</label>
            <textarea
              name="product_short_description"
              value={newProduct?.product_short_description}
              onChange={handleNewProductChange}
              placeholder="Short Description"
              className="w-full border p-2 rounded"
              required
            ></textarea>

            <label>Condition</label>
            <input
              type="text"
              name="product_condition"
              value={newProduct?.product_condition}
              onChange={handleNewProductChange}
              placeholder="Condition"
              className="w-full border p-2 rounded"
              required
            />

            <label>Sub Condition</label>
            <input
              type="text"
              name="product_sub_condition"
              value={newProduct?.product_sub_condition}
              onChange={handleNewProductChange}
              placeholder="Sub Condition"
              className="w-full border p-2 rounded"
              required
            />

            <label>Quantity</label>
            <input
              type="number"
              name="product_quantity"
              value={newProduct?.product_quantity}
              onChange={handleNewProductChange}
              placeholder="Quantity"
              className="w-full border p-2 rounded"
              required
            />

            <label>Product Image</label>
            <input
              type="file"
              name="product_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded bg-white"
              required={!editProductId}
            />

            {newProduct?.preview && (
              <div className="mt-2">
                <img
                  src={newProduct.product_preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {editProductId ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPopup(false);
                  setEditProductId(null);
                  setNewProduct({
                    product_part_number: "",
                    product_price: "",
                    product_short_description: "",
                    product_condition: "",
                    product_sub_condition: "",
                    product_quantity: "",
                    product_image: null,
                    product_preview: "",
                  });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {showSuccess && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Product {editProductId ? "updated" : "added"} successfully!
        </div>
      )}

      <Footer />
    </>
  );
};

export default AllProducts;
