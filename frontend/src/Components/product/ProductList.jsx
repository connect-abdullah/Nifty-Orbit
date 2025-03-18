import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import { productList, fetchBrands } from "../../apis/api";

const ProductList = () => {
  const { brand } = useParams();
  const [products, setProducts] = useState([]); // State for fetched products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const brands = await fetchBrands();
        console.log("Brands data:", brands);
        
        // Find the brand using brand_name which is the correct property based on provided structure
        const brandData = brands.find(b => 
          b.brand_name && b.brand_name.toLowerCase() === brand.toLowerCase()
        );
        
        if (!brandData) {
          console.error("Brand not found:", brand);
          console.log("Available brands:", brands.map(b => b.brand_name));
          throw new Error("Brand not found");
        }
        
        // Use brand_id instead of id
        const response = await productList(brandData.brand_id);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brand]); // Runs whenever brand changes

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row gap-6">
        {/* Sidebar on the left */}
        <div className="w-full md:w-1/4">
          <Sidebar brand={brand} />
        </div>

        <div className="w-full md:w-3/4">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center mb-6 p-6">
            Products of {brand}
          </h1>

          {/* Loading and Error Messages */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : products?.length === 0 ? (
            <p className="text-center text-gray-500">
              No products available for {brand}
            </p>
          ) : (
            <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link to={`/product/${product.product_id}`} key={product.product_id}>
                  <div className="relative text-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1143]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <img
                        src={product?.brand?.brand_image || "https://via.placeholder.com/150"}
                        alt={product?.brand?.brand_name}
                        className="w-32 h-32 md:w-50 md:h-50 rounded-lg mb-4 object-cover transition-transform hover:scale-110 cursor-pointer"
                      />
                      <h2 className="text-lg font-bold text-center">
                        {product?.brand?.brand_name}
                      </h2>
                      <p className="text-sm text-center text-gray-300">
                        {product?.short_description}
                      </p>
                      <p className="text-sm text-center">{product?.product_category?.category_name}</p>
                      <p className="text-purple-400 text-2xl text-right">
                        ${product?.price}
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button
                          className="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-purple-700 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(`/cart`, { state: { product } });
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