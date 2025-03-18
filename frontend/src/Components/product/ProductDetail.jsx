import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../product/Products";
import Navbar from "../layout/Navbar";


const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState("https://via.placeholder.com/500");
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Find the product by ID
  const product = id ? products.find((p) => p.id === Number(id)) : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || "https://via.placeholder.com/500");
    }
  }, [product]);

  if (!product) {
    return <h2 className="text-center text-gray-500 mt-10">Product not found</h2>;
  }

  // Ensure images array is populated without unnecessary duplicates
  const images = [product.image];
  if (product.thumbnail && product.thumbnail !== product.image) {
    images.push(product.thumbnail);
  }

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  // Handle Mouse Movement for Zoom Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // Convert to percentage
    const y = ((e.clientY - top) / height) * 100; // Convert to percentage
    setZoomPosition({ x, y });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col justify-center items-center p-6: md:p-6">
      <div className="bg-gray-300 shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row">
        {/* Product Image Section */}
        <div className="w-1/2 p-4 flex flex-col items-center">
          {/* Main Image with Dynamic Zoom */}
          <div
            className="relative overflow-hidden w-full rounded-lg border"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className={`w-full h-auto transition-transform duration-300 ${
                isZoomed ? "scale-150" : "scale-100"
              }`}
              style={{
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex mt-4 space-x-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 rounded-md shadow cursor-pointer transition-all duration-200 border-2 
                  ${selectedImage === img ? "border-blue-500" : "border-transparent"} hover:opacity-80`}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold mt-4 text-green-600">
            ${product.price ? product.price.toFixed(2) : "100"}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-6 flex items-center">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="border border-black p-2 rounded-md w-16 text-center"
            />
            <button
              onClick={() => alert(`Added ${quantity} ${product.name}(s) to cart`)}
              className="ml-4 bg-blue-900 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 mt-2 md:mt-0"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate(`/payment`, { state: { product }})}
              className="ml-4 bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition duration-200 mt-2 md:mt-0"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
