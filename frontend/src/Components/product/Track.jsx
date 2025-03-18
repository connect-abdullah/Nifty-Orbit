import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';

const TrackingPage = ({ isLoggedIn }) => {
  const [orderID, setOrderID] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleTrackClick = () => {
    if (isLoggedIn) {
      navigate(`/tracking?orderID=${orderID}&billingEmail=${billingEmail}`);
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-6 text-center">Track Your Order</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Order ID</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Found in your order confirmation email"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-2">Billing Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Email you used during checkout"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
            />
          </div>
          <button
            className="w-full p-3 text-white font-semibold rounded-lg transition bg-purple-500 hover:bg-purple-600"
            onClick={handleTrackClick}
          >
            Track
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Login Required</h2>
            <p className="text-gray-700 text-center mb-4">
              You need to be logged in to track your order.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackingPage;
