import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { FaPaypal } from "react-icons/fa";

const stripePromise = loadStripe("your-stripe-public-key"); // Replace with actual Stripe publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setMessage("Payment method is not available.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else {
      setMessage("Payment successful! Your order is confirmed.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-2 rounded w-full" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-purple-500 text-white p-3 rounded-lg font-bold text-lg"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
      <button className="w-full bg-purple-500 text-white p-3 rounded-lg font-bold text-lg flex items-center justify-center gap-2">
  <FaPaypal className="text-2xl text-blue-300" /> Pay with PayPal
</button>
    </form>
  );
};

const Payment = () => {
  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen flex flex-col items-center mt-10">
        <h1 className="text-4xl font-bold mb-6 text-indigo-50 text-center">CHECKOUT</h1>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-300 p-6 rounded-lg shadow-lg">
          {/* Shipping Address */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
            <input type="email" placeholder="Email Address" className="border p-2 w-full mb-2 rounded" />
            <div className="flex items-center mb-2">
              <input type="checkbox" id="create-account" className="mr-2" />
              <label htmlFor="create-account">Create New Account</label>
            </div>
            <input type="text" placeholder="First Name" className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="Company" className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="Street Address" className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="City" className="border p-2 w-full mb-2 rounded" />
            <input type="text" placeholder="State/Province" className="border p-2 w-full mb-2 rounded" />
          </div>

          {/* Payment Method */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between py-2 border-b">
              <span>Cart Subtotal</span>
              <span className="font-bold">£45.00</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping</span>
              <span>£0.00</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Tax</span>
              <span className="font-bold">£9.00</span>
            </div>
            <div className="flex justify-between py-2 text-xl font-bold">
              <span>Order Total</span>
              <span>£54.00</span>
            </div>
            <div className="flex items-center border p-4 rounded-lg mb-4">
              <img src="https://via.placeholder.com/50" alt="Product" className="w-12 h-12 mr-4" />
              <div className="flex-grow">
                <h4 className="font-semibold">PS-2651-1 - Cisco 650-Watt AC 240V Power Supply</h4>
                <p className="text-gray-600">£45.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;