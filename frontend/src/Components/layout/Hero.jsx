import Image1 from "../../assets/crouSAL1.jpg";
import Image2 from "../../assets/carousal_img3.jpg";
import Image3 from "../../assets/hardware.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import bgimg from "../../assets/Abeautifulsemi-transparentgalaxy background.webp";
import PropTypes from "prop-types";

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
      "Innovation knows no limits, and we embrace the challenge of pushing technology beyond conventional constraints. Through extensive research, dynamic problem-solving, ",
  },
  {
    id: 3,
    img: Image3,
    title: "Transforming Ideas into Reality",
    description:
      "From conceptualization to execution, we specialize in transforming visionary ideas into tangible, high-impact technological solutions. Our expertise lies in bridging the gap.",
  },
];

// Custom Arrows (hidden on small devices)
const PrevArrow = ({ onClick }) => (
  <button
    className="mt-32 md:block absolute left-0 md:left-5 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-3 md:p-3 rounded-full z-20 hover:bg-white/30"
    onClick={onClick}
  >
    <FaChevronLeft size={24} />
  </button>
);

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const NextArrow = ({ onClick }) => (
  <button
    className="mt-32 md:block absolute right-0 md:right-5 top-1/2 transform -translate-y-1/2 text-white bg-black/30 p-3 md:p-3 rounded-full z-20 hover:bg-white/20"
    onClick={onClick}
  >
    <FaChevronRight size={24} />
  </button>
);

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const Hero = () => {
  const settings = {
    dots: false,
    arrows: true, // Arrows are enabled but hidden on small devices
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen w-full flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${bgimg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="p-4 relative z-10 w-full">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id} className="w-full flex items-center justify-center">
              <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-20 py-10 w-full">
                {/* Text Section */}
                <div className="w-full md:w-1/2 text-left space-y-4 md:mb-20 md:ml-10">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">{data.title}</h1>
                  <p className="text-lg sm:text-lg drop-shadow-md">{data.description}</p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
                  <img
                    src={data.img}
                    alt=""
                    className="w-full max-w-sm md:max-w-3xl lg:max-w-xl object-contain rounded-lg border border-white/30 shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;