import { useState, useEffect } from "react";
import {  Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Testing = () => {
//   const { brandId } = useParams(); 
  const [products, setProducts] = useState([]); // Store products as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <>   
      <Navbar />
      <div className="min-h-screen flex flex-col md:flex-row gap-6">
        {/* Sidebar on the left */}
        <div className="w-full md:w-1/4">
          <Sidebar brand="Fake Store" />
        </div>
        <div className="w-full md:w-3/4">
          {/* Brand Header */}
         
          {/* Products Section */}
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="relative text-white p-4 rounded-xl shadow-lg flex flex-col items-center transition-transform hover:scale-105 cursor-pointer overflow-hidden">
                    <div className="absolute inset-0 bg-[#2a1143]"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-32 md:w-50 md:h-50 rounded-lg mb-4 object-cover transition-transform hover:scale-110 cursor-pointer"
                      />
                      <h2 className="text-lg font-bold text-center">{product.title}</h2>
                      <p className="text-sm text-center text-gray-300">
                        {product.description.length > 100
                          ? product.description.substring(0, 100) + "..."
                          : product.description}
                      </p>
                      <p className="text-purple-400 text-2xl text-right">${product.price}</p>
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
        </div>
      </div>
    </>
  );
}; 

export default Testing;
