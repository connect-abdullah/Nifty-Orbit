import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { addToCart } from '../utils/cartUtils';
import { productList } from "../../apis/api";

const ProductList = () => {
  const { brand } = useParams(); // Use `brand` to match the route parameter
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await productList();
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data || []);

        // Debug: Log brand and product brand names
        console.log("Brand from URL:", brand); // Debugging
        console.log(
          "Product brand names:",
          data.map(product => product.brand_brand_name)
        );

        // Filter products by brand_brand_name (case-insensitive and trimmed)
        const filtered = data.filter(product => {
          const brandLower = brand?.toLowerCase().trim(); // Normalize brand
          const productBrandName = product.brand_brand_name?.toLowerCase().trim(); // Normalize product brand name
          return productBrandName === brandLower;
        });

        console.log("Filtered products:", filtered);
        setFilteredProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand]); // Re-fetch when brand changes

  const handleAddToCart = (product) => {
    const productToAdd = {
      id: product.product_product_id,
      name: product.product_part_number,
      price: parseFloat(product.product_price),
      description: product.product_short_description,
      brand: product.brand_brand_name,
      category: product.category_category_name,
      quantity: 1
    };

    addToCart(productToAdd);
    alert(`Added ${product.product_part_number} to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row gap-6">
        {/* {/ Sidebar on the left /} */}
        <div className="w-full md:w-1/4">
          <Sidebar brand={brand} products={products} />
        </div>

        <div className="w-full md:w-3/4">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center mb-6 p-6">
            Products of Brand {brand}
          </h1>

          {/* {/ Loading and Error Messages /} */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredProducts?.length === 0 ? (
            <p className="text-center text-gray-500">
              No products available for this brand.
            </p>
          ) : (
            <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.product_product_id}`}
                  key={product.product_product_id}
                  state={{ product }} // Pass the product data as state
                >
                  <div className="relative text-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1143]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <img
                        src={product?.brand?.brand_image || "https://via.placeholder.com/150"}
                        alt={product?.brand_brand_name}
                        className="w-32 h-32 md:w-50 md:h-50 rounded-lg mb-4 object-cover transition-transform hover:scale-110 cursor-pointer"
                      />
                      <h2 className="text-lg font-bold text-center">
                        {product?.brand_brand_name}
                      </h2>
                      <p className="text-sm text-center text-gray-300">
                        {product?.product_short_description}
                      </p>
                      <p className="text-sm text-center">{product?.category_category_name}</p>
                      <p className="text-purple-400 text-2xl text-right">
                        ${product?.product_price}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          Add to Cart
                        </button>
                        <button
                          className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-400 hover:text-white transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(`/payment`, { state: { product } });
                          }}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;