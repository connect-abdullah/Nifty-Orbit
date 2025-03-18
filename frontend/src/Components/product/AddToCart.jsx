import { useState, useEffect } from "react";
// These imports are not used in the code and can be removed
import Navbar from "../layout/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { getCartItems, updateCartItemQuantity, removeFromCart, proceedToCheckout } from '../utils/cartUtils';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from cookies when component mounts
  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    const newQuantity = action === "increment" ? 
      item.quantity + 1 : 
      Math.max(1, item.quantity - 1);

    const updatedCart = updateCartItemQuantity(id, newQuantity);
    setCartItems(updatedCart);
  };

  // Handle delete item
  const handleDelete = (id) => {
    const updatedCart = removeFromCart(id);
    setCartItems(updatedCart);
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  // Add function to handle checkout for all items
  const handleCheckoutAll = () => {
    proceedToCheckout(navigate);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Shopping Cart</h1>

        <div className="space-y-5">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-white mb-4">Your cart is empty!</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex flex-col ml-4">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-600">${item.price}</span>
                </div>

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

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate('/payment', { 
                      state: { 
                        product: {
                          ...item,
                          totalPrice: item.price * item.quantity
                        }
                      }
                    })}
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

        {cartItems.length > 0 && (
          <div className="mt-6 flex flex-col items-end">
            <span className="font-semibold text-lg text-white mb-3">
              Total: ${calculateTotal()}
            </span>
            <button
              onClick={handleCheckoutAll}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition duration-200"
            >
              Proceed with All Items
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Cart;
