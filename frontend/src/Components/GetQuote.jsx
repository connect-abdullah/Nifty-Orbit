import { useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import {getQuote} from "../apis/api"

export default function GetAQuote() {
  const [productCodes] = useState([
    "Cisco-ISR4331-V/K9",
    "Cisco-ISR4451-X/K9",
    "Cisco-ISR4451-X/K9",
    "Dell-ISR4451-X/K9",
    "HP-ISR4451-X/K9",
    "Lenovo-ISR4451-X/K9",
    "Other",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filteredCodes, setFilteredCodes] = useState(productCodes);
  const [showDropdown, setShowDropdown] = useState(false);
  const [condition, setCondition] = useState("New");
  const [quantity, setQuantity] = useState("");
  const [target_price, settarget_price] = useState("");
  const [name, setName] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Select");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredCodes(
      productCodes.filter((code) =>
        code.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSelect = (code) => {
    setInputValue(code);
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      productcode: inputValue,
      condition,
      quantity,
      status,
      target_price,
      name,
      phoneno,
      message,
    };

    try {
      const response = await getQuote(data);
      const result = await response;
      console.log("Server Response:", result);
      alert("Quote request sent successfully!");

      // reset data after sending
      setInputValue("");
      setFilteredCodes(productCodes);
      setShowDropdown(false);
      setStatus("No");
      setCondition("New");
      setQuantity("");
      settarget_price("");
      setName("");
      setphoneno("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white">
          Fill Out The Form Below
        </h2>
        <div className="bg-gray-200 shadow-lg rounded-lg p-6 mt-6 w-full max-w-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-700 font-medium">
                Enter your product codes for quote:
              </label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Search or enter product code"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              />
              {showDropdown && filteredCodes.length > 0 && (
                <ul className="absolute left-0 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                  {filteredCodes.map((code, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-300 cursor-pointer"
                      onMouseDown={() => handleSelect(code)}
                    >
                      {code}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex space-x-4">
              <select
                className="w-1/2 p-2 border rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Select">Select status</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              <select
                className="w-1/2 p-2 border rounded-md"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option>New</option>
                <option>Used</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <input
                type="number"
                placeholder="Quantity"
                className="w-1/2 p-2 border rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Target Price"
                className="w-1/2 p-2 border rounded-md"
                value={target_price}
                onChange={(e) => settarget_price(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border rounded-md"
              value={phoneno}
              onChange={(e) => setphoneno(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Get In Touch With Us
          </h3>
          <p className="text-gray-600 mt-2">
            Quick answers await you! Email or call for a 6-hour turnaround, or
            chat with us now for instant support.
          </p>
          <a href="/contactus">
            <button className="mt-4 bg-purple-700 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition">
              Contact Us
            </button>
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
