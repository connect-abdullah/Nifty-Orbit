import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { FaPaypal } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "pk_test_sample_key");

const API_URL = 'http://localhost:8000/api'; // or your actual backend URL

const CheckoutForm = ({ formData, handleInputChange, loading, message, setLoading, setMessage, orderTotal }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Validate form data
      if (!formData.email || !formData.firstName || !formData.lastName || !formData.address) {
        throw new Error("Please fill in all required fields");
      }

      console.log('Attempting to send data:', formData);

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add CORS headers
          'Access-Control-Allow-Origin': '*',
        },
        credentials: 'include', // if using cookies
        body: JSON.stringify(formData)
      });

      // Log the response status
      console.log('Response status:', response.status);

      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success response:', data);
      setMessage("Order submitted successfully!");
    } catch (error) {
      console.error('Detailed error:', error);
      setMessage(error.message || "Connection to server failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData?.cardNumber}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2 rounded"
          required
          maxLength="16"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="cardExpiry"
            placeholder="MM/YY"
            value={formData?.cardExpiry}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength="5"
          />
          <input
            type="text"
            name="cardCVC"
            placeholder="CVC"
            value={formData?.cardCVC}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
            maxLength="3"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg font-bold text-lg mb-2 transition duration-200"
      >
        {loading ? "Processing..." : `Pay ${orderTotal}`}
      </button>
      
      <button 
        type="button"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition duration-200"
        onClick={() => console.log('PayPal payment clicked')}
      >
        <FaPaypal className="text-2xl" /> Pay with PayPal
      </button>

      {message && (
        <p className={message.includes("success") ? "text-green-500" : "text-red-500"}>
          {message}
        </p>
      )}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [createAccount, setCreateAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Log the received state for debugging
  console.log("Payment page received state:", location.state);
  
  // Check which mode we're in (full cart or single product)
  const isFullCart = location.state?.isFullCart || false;
  const cartItems = location.state?.cartItems || [];
  const totalAmount = location.state?.totalAmount || 0;
  
  // For single product case
  const product = location.state?.product || {
    name: "No product selected",
    price: 0,
    image: "https://via.placeholder.com/50"
  };

  // Calculate order details based on mode
  const subtotal = isFullCart ? totalAmount : (product.price || 0);
  const shipping = 0;
  const taxRate = 0.20; // 20% tax rate
  const tax = parseFloat(subtotal) * taxRate;
  const orderTotal = (parseFloat(subtotal) + shipping + tax).toFixed(2);
  
  // Update form data with the correct amount
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    city: '',
    state: '',
    amount: orderTotal,
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    orderDetails: {
      isFullCart: isFullCart,
      items: isFullCart ? cartItems : [product],
      subtotal: parseFloat(subtotal),
      shipping: shipping,
      tax: tax,
      total: parseFloat(orderTotal)
    }
  });

  // Handle form data changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold mb-6 text-indigo-50 text-center">CHECKOUT</h1>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-300 p-6 rounded-lg shadow-lg">
          {/* Shipping Address */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
            
            <div className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id="create-account" 
                className="mr-2"
                onChange={(e) => setCreateAccount(e.target.checked)}
              />
              <label htmlFor="create-account">Create New Account</label>
            </div>

            {createAccount && (
              <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password *" 
                className="border p-2 w-full mb-2 rounded"
                required={createAccount}
                minLength="6"
              />
            )}

            {/* Add required attribute to necessary fields */}
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
            {/* Add similar required attributes to other necessary fields */}
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company (Optional)" 
              className="border p-2 w-full mb-2 rounded"
            />
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Street Address *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
            <input 
              type="text" 
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State/Province *" 
              className="border p-2 w-full mb-2 rounded"
              required
            />
          </div>

          {/* Payment Method */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <CheckoutForm 
              formData={formData}
              handleInputChange={handleInputChange}
              loading={loading}
              message={message}
              setLoading={setLoading}
              setMessage={setMessage}
              orderTotal={`£${orderTotal}`}
            />
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between py-2 border-b">
              <span>Cart Subtotal</span>
              <span className="font-bold">£{parseFloat(subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>£{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Tax</span>
              <span className="font-bold">£{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 text-xl font-bold">
              <span>Order Total</span>
              <span>£{orderTotal}</span>
            </div>
            
            {/* Show either multiple items or single product */}
            {isFullCart ? (
              <div className="mt-4 max-h-60 overflow-y-auto">
                <h4 className="font-semibold mb-2">Items ({cartItems.length})</h4>
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border p-2 rounded-lg mb-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 mr-2 object-cover" />
                    <div className="flex-grow">
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <div className="flex justify-between">
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-xs">£{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center border p-4 rounded-lg mb-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 mr-4 object-cover" />
                <div className="flex-grow">
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600">£{product.price?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;