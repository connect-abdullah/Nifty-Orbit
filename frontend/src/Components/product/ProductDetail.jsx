import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { addToCart } from "../utils/cartUtils";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("ProductDetail: Location State:", location.state); // Debugging
  console.log("ProductDetail: Product ID from URL:", id); // Debugging

  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(false);

  // Fallback fetch logic if location.state is missing
  useEffect(() => {
    if (!product) {
      console.log("Fetching product data from API..."); // Debugging
      setLoading(true);
      fetch(`https://shiny-cats-smell.loca.lt/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched product data:", data); // Debugging
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product data:", err); // Debugging
          setLoading(false);
        });
    }
  }, [id, product]);

  // Zoom & Quantity logic
  const [selectedImage, setSelectedImage] = useState("https://via.placeholder.com/500");
  const [quantity, setQuantity] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (product) {
      console.log("Setting selected image for product:", product); // Debugging
      if (product?.brand?.brand_image) {
        setSelectedImage(product.brand.brand_image);
      } else if (product?.product_image) {
        setSelectedImage(product.product_image);
      }
    }
  }, [product]);

  if (loading || !product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading product...</p>
        </div>
      </>
    );
  }

  console.log("Rendering product details for:", product); // Debugging

  // Handle thumbnails
  const images = [];
  if (product.brand && product.brand.brand_image) {
    images.push(product.brand.brand_image);
  }
  if (product.product_image && (!product.brand || product.product_image !== product.brand.brand_image)) {
    images.push(product.product_image);
  }
  if (images.length === 0) {
    images.push("https://via.placeholder.com/500");
  }

  const handleThumbnailClick = (img) => {
    console.log("Thumbnail clicked:", img); // Debugging
    setSelectedImage(img);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: product.product_product_id,
      name: product.product_part_number,
      price: parseFloat(product.product_price || 0),
      image: selectedImage,
      description: product.product_short_description,
      brand: product.brand?.brand_name,
      category: product.category?.category_name,
      quantity: quantity,
    };

    console.log("Adding product to cart:", productToAdd); // Debugging
    addToCart(productToAdd);
    alert(`Added ${quantity} item(s) to cart`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center p-6 md:p-6">
        <div className="bg-gray-300 shadow-lg rounded-lg p-6 max-w-4xl w-full flex flex-col md:flex-row">
          {/* {/ Product Image Section /} */}
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            {/* {/ Main Image with Zoom /} */}
            <div
              className="relative overflow-hidden w-full rounded-lg border"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={selectedImage}
                alt={product.product_part_number || "Product Image"}
                className={`w-full h-auto transition-transform duration-300 ${
                  isZoomed ? "scale-150" : "scale-100"
                }`}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }}
              />
            </div>

            {/* {/ Thumbnails /} */}
            {images.length > 1 && (
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
            )}
          </div>

          {/* {/ Product Details Section /} */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold">{product.product_part_number || "Product"}</h1>

              {product.brand?.brand_name && (
                <p className="text-sm text-gray-600 mt-1">Brand: {product.brand.brand_name}</p>
              )}

              {product.category?.category_name && (
                <p className="text-sm text-gray-600">Category: {product.category.category_name}</p>
              )}

              {product.product_condition && (
                <p className="text-sm text-gray-600">Condition: {product.product_condition}</p>
              )}

              <p className="text-gray-700 mt-4">
                {product.product_short_description || "No description available"}
              </p>

              {product.product_long_description && (
                <div className="mt-4">
                  <h3 className="font-semibold">Description:</h3>
                  <p className="text-gray-700">{product.product_long_description}</p>
                </div>
              )}

              <p className="text-2xl font-semibold mt-4 text-green-600">
                ${parseFloat(product.product_price || 0).toFixed(2)}
              </p>

              {product.product_quantity && (
                <p className="text-sm text-gray-600 mt-1">
                  Available: {product.product_quantity} in stock
                </p>
              )}
            </div>

            {/* {/ Quantity Selector & Buttons /} */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <span className="mr-2">Quantity:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  min="1"
                  max={product.product_quantity || 99}
                  className="border border-black p-2 rounded-md w-16 text-center"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-900 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        product: {
                          ...product,
                          quantity: quantity,
                          totalPrice: parseFloat(product.product_price || 0) * quantity,
                        },
                      },
                    })
                  }
                  className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;