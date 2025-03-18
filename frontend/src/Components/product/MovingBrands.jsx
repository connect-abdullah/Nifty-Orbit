import  { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const brandImages = [
  { name: "Acer", src: "https://img-prd-pim.poorvika.com/brand/acer-logo.png" },
  { name: "HP", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpL_GV0ajeVVK45evGFJprPbSrs43X57nsig&s" },
  { name: "Broadcom", src: "https://cdn.prod.website-files.com/6640cd28f51f13175e577c05/665056605392d38619a4764b_1abf82a6-43c2-5e5c-aaf7-e3dd05409271.svg" },
  { name: "Cisco", src: "https://www.svgrepo.com/show/331335/cisco.svg" },
  { name: "Meraki", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe_9RP2Allums_ycv6TJhRtdlbfOkaBPOdaw&s" },
  { name: "Dell", src: "https://txo-vendor-logos.s3.eu-west-2.amazonaws.com/dell.png" },
  { name: "Emacs", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg7ay6ractPh0jAhgF29_8KLoPzK37Z84oP_eNyTW6wa0EDPlieu30DuE1oeJNe4mIqhY&usqp=CAU" },
  { name: "Epyc", src: "https://en.wikichip.org/w/images/8/80/amd_epyc_logo.png" },
  { name: "Finisar", src: "https://media.licdn.com/dms/image/v2/C4E12AQFM_wJBPVwGpg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1544810433946?e=2147483647&v=beta&t=m_cDrnM_GVjcMe3IafI097-HgLmklli0PJX58UMb9no" },
  { name: "Hp", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmW2_wauqaglMEDGm-ICc8GNMcaQvJxBwsYQ&s" },
  { name: "IBM", src: "https://cdn-icons-png.freepik.com/512/5969/5969147.png" },
  { name: "Imation", src: "https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/1/AmazonStores/ATVPDKIKX0DER/43c938b2cc35de4f737f16d8f564403c.w600.h600._RO299,1,0,0,0,0,0,0,0,0,15_FMpng_.png" },
  { name: "Intel", src: "https://w7.pngwing.com/pngs/541/896/png-transparent-circle-intel-round-icon-popular-services-brands-vol-2-icon.png" },
  { name: "Jabra", src: "https://go-telecom.transforms.svdcdn.com/production/images/jabra-logo_circle.png?w=1200&h=1200&q=80&fm=webp&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&dm=1692284190&s=f5eced9901e3c6e3a7ab7922d86122f1" },
  { name: "Junifier", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmdrCLMIECfd4MHoT6Fj6gp_hMnzV3nx78uw&s" },
  { name: "Lenovo", src: "https://wallpapers.com/images/high/lenovo-logo-red-circle-lzy3spbdak4fcvus-2.png" },
  { name: "Windows", src: "https://www.shareicon.net/download/2016/07/06/86278_windows_512x512.png" },
  { name: "Mikrotik", src: "https://netdata.cloud/img/mikrotik.png" },
  { name: "Nexus", src: "https://cdn.worldvectorlogo.com/logos/nexus-3.svg" },
  { name: "Nokia", src: "https://banner2.cleanpng.com/20180619/ywo/kisspng-nokia-3-nokia-5-nokia-6315i-nokia-6136-dal-corp-5b29c5ed962b38.6328554415294643016151.jpg" },
  { name: "Nvidia", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOk17ViKkpPbRyJQewdaG-nnsszrkeYT5gLg&s" },
  { name: "Q Logic", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfxGjyX9BXEG83_qEFdYFX3VbByrLePA3XA&s" },
  { name: "Sony", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMe44zVSEuUao_sUIMf5hgBlU2cI9WCMSYZQ&s" },
  { name: "Ssc", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2gT2J7MTqbrekSs4EfPjbHV2GVQmiossdjmrCyeyIqoagyNimt-5D10e7NcxuQ0gkRU&usqp=CAU" },
  { name: "Samsung", src: "https://stickypng.com/wp-content/uploads/2023/07/628ca4299f55578313059355.png" },
  { name: "yhdaa", src: "https://i.fbcd.co/products/resized/resized-750-500/yh-circle-logo-design-2-34d875c24f51d896a792b79417fe0324305d5f0189f42030f889138f25ce9e40.jpg" },
  { name: "Zebra", src: "https://thumbs.dreamstime.com/b/zebra-head-logo-simple-icon-circle-great-brand-335455777.jpg" },
 
]

const MovingBrands = () => {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);
  let isDragging = false;
  let startX, scrollLeft;

  // Auto-scroll effect
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const scrollSpeed = 1; // Adjust for speed
    let animationFrame;

    const smoothScroll = () => {
      if (!isPaused && !isDragging) {
        marquee.scrollLeft += scrollSpeed;
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  // Dragging functions
  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - marqueeRef.current.offsetLeft;
    scrollLeft = marqueeRef.current.scrollLeft;
    marqueeRef.current.style.cursor = "grabbing";
  };

  const handleMouseUp = () => {
    isDragging = false;
    marqueeRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      className="overflow-hidden bg-blue-900 py-4 relative whitespace-nowrap"
      ref={marqueeRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "hidden",
        cursor: "grab",
      }}
    >
      <div className="flex items-center">
        {/* Duplicate brand list for seamless infinite scrolling */}
        {[...brandImages, ...brandImages].map((brand, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            <Link to={`/products/${brand.name.toLowerCase()}`}>
              <img
                src={brand.src}
                className="w-19 h-19 rounded-full border-gray-300 border-5 hover:scale-105 transition-transform duration-300"
                alt={brand.name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingBrands;