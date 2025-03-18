// import React from "react";
import Img1 from "../../assets/Server.jpg";
import Img2 from "../../assets//router2.jpg";
import Img3 from "../../assets/hardware.jpg";
import { FaStar } from "react-icons/fa";


const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Server",
    description:
      " UCS is a line of data center servers designed to integrate compute, networking, and storage capabilities into a single system",
  },
  {
    id: 2,
    img: Img2,
    title: "Router",
    description:
    "Routers provide high availability, comprehensive security, integrated wireless, ease of management, and advanced Quality"    ,
  },
  {
    id: 3,
    img: Img3,
    title: "Switches",
    description:
      "switch is a networking device that acts as a central hub, connecting multiple devices like computers, printers",
  },
];

const TopProducts = ({ handleOrderPopup }) => {
  return (
    <>
    
    <div className="container mx-auto px-4 py-12">
      {/* Header section */}
      <div className="text-center mb-12">
      
        <h1 data-aos="fade-up" className="text-5xl font-bold text-white mb-6">
          Best Products
        </h1>
      </div>
      
      {/* Body section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {ProductsData.map((data) => (
          <div
            key={data.id}
            data-aos="zoom-in"
            className=" text-white rounded-2xl bg-gradient-to-br from-[#6f4fc7] via-[#070458] to-[#3e0c65]  shadow-xl duration-300 group w-80 flex flex-col items-center p-6"
          >
            {/* Image section */}
            <div className="w-40 h-40 flex justify-center items-center overflow-hidden rounded-lg">
              <img
                src={data.img}
                alt={data.title}
                className="object-cover w-full h-full transform group-hover:scale-105 duration-300 drop-shadow-md"
                />
            </div>
            
            {/* Details section */}
            <div className="text-center mt-4 w-full">
              {/* Star rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
              </div>
              <h1 className="text-xl font-bold mb-2">{data.title}</h1>
              <p className="text-white-500  duration-300 text-sm mb-4">
                {data.description}
              </p>
              <button
                className="bg-primary hover:scale-105 duration-300 text-white py-2 px-6 rounded-full group-hover:bg-white group-hover:text-purple-800"
                onClick={handleOrderPopup}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
                </>
  );
};

export default TopProducts;
