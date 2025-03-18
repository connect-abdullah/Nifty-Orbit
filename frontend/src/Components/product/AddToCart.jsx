import  { useState } from "react";
import router from "../../assets/Router.jpg";
import switchimg from "../../assets/Switches 2.jpg";
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
const Cart = () => {
  // Sample cart data
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 1,
      image: router, // Replace with actual image URL
    },
    {
      id: 2,
      name: "Product 2",
      price: 150,
      quantity: 1,
      image: switchimg,
    },
  ]);

  // Handle quantity change (increment/decrement)
  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item
    );
    setCartItems(updatedCart);
  };

  // Handle delete item from cart
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Shopping Cart</h1>

        <div className="space-y-5">
          {cartItems.length === 0 ? (
            <p className="text-center text-xl">Your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-300"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                {/* Product Details */}
                <div className="flex flex-col ml-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-600">${item.price}</span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrement")}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increment")}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                {/* Buttons Container */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/payment')}
                    className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                  >
                    Pay Now
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-right">
          <span className="font-semibold text-lg text-white">
            Total: ${calculateTotal()}
          </span>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
