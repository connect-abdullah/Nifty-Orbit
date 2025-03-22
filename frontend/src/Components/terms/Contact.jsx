import { useState } from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { contactUs } from "../../apis/api";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await contactUs(formData);

      console.log("Server Response:", response);
      alert("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phoneno: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  //   {
  //     "name":"noor",
  //     "phoneno": "1267836",
  //     "email": "noor@gmail.com",
  //     "message": "This mail is send for testing"
  // }

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-white flex items-center justify-center p-6 mt-10">
        <div className="w-full max-w-5xl bg-opacity-20 bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 p-10 rounded-2xl backdrop-blur-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-center text-gray-200 mb-6">
            Feel free to reach out to us
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 bg-opacity-30 text-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full p-3 bg-opacity-30 text-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  required
                />
              </div>
              <input
                type="tel"
                name="phoneno"
                value={formData.phoneno}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 bg-opacity-30 text-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                className="w-full p-3 bg-opacity-30 text-white border border-gray-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-400 hover:bg-indigo-300"
                } text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-500/50`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Contact Info Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-700 p-3 rounded-full shadow-md shadow-indigo-600">
                  📞
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Call</h4>
                  <p className="text-gray-300">+1 303 800 6160</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-indigo-700 p-3 rounded-full shadow-md shadow-indigo-500">
                  📍
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Address</h4>
                  <p className="text-gray-300">ENGLEWOOD CO 80111 USA</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-indigo-700 p-3 rounded-full shadow-md shadow-indigo-500">
                  📧
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p className="text-gray-300">niftyorbit@gmail.com</p>
                  <p className="text-gray-300">niftyorbit@yahoo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
