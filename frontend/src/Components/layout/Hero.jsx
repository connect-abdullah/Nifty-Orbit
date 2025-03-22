import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image1 from "../../assets/crouSAL1.jpg";
import Image2 from "../../assets/carousal_img3.jpg";
import Image3 from "../../assets/hardware.jpg";


// Define the image data
const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "Engineering the Future",
    description:
      "We are at the forefront of innovation, engineering cutting-edge solutions that push the boundaries of technology. By integrating creativity with advanced methodologies",
  },
  {
    id: 2,
    img: Image2,
    title: "Innovating Beyond Boundaries",
    description:
      "Innovation knows no limits, and we embrace the challenge of pushing technology beyond conventional constraints.",
  },
  {
    id: 3,
    img: Image3,
    title: "Transforming Ideas into Reality",
    description:
      "From conceptualization to execution, we specialize in transforming visionary ideas into tangible, high-impact technological solutions.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Function to handle next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === ImageList.length - 1 ? 0 : prev + 1));
  };
  
  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? ImageList.length - 1 : prev - 1));
  };
  
  // Function to handle dot navigation
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };
  
  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  return (
    <div className="relative w-full h-[92vh] overflow-hidden bg-black">
      {/* {/ Left Arrow /} */}
      <button
        className="absolute  h-[100%] top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-3  z-20 hover:bg-white/30"
        onClick={prevSlide}
      >
        <FaChevronLeft size={24} />
      </button>
      
      {/* {/ Slides /} */}
      <div className="w-full h-full">
        {ImageList.map((item, index) => (
          <div 
            key={item.id} 
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 flex flex-col md:flex-row ${
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* {/ Image Section (Left) /} */}
            <div className="w-full md:w-1/2 h-full relative">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 "></div>
            </div>
            
            {/* {/ Content Section (Right) /} */}
            <div className="w-full md:w-1/2 h-full bg-black flex flex-col justify-center items-start p-8 md:p-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{item.title}</h2>
              <p className="text-lg text-white/80 mb-8">{item.description}</p>
          
            </div>
          </div>
        ))}
      </div>
      
      {/* {/ Right Arrow /} */}
      <button
        className="absolute right-1 h-[100%] top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-3  z-20 hover:bg-white/20"
        onClick={nextSlide}
      >
        <FaChevronRight size={24} />
      </button>
      
      {/* {/ Dots Navigation /} */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {ImageList.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero;