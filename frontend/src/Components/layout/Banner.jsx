import Premium from '../../assets/tools.webp';
import upgrade from '../../assets/upgrade.webp';
import support from '../../assets/support.webp';
import shipping from '../../assets/fastshipping.webp';

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-[#8787d9] via-[#6548cd] to-[#1a0e55] py-3 text-white">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {[
          { img: Premium, title: "Premium Tools", desc: "Get the best hardware tools for every project." },
          { img: upgrade, title: "Upgrade Your Gear", desc: "Latest hardware updates and accessories." },
          { img: support, title: "24/7 Support", desc: "Expert guidance for all your hardware needs." },
          { img: shipping, title: "Fast Shipping", desc: "Quick delivery to get you started faster." }
        ].map((item, index) => (
          <div key={index} className="p-4 group">
            <img
              src={item.img}
              alt={item.title}
              className="mx-auto w-20 h-20 transition-transform duration-300 transform group-hover:scale-125"
            />
            <h3 className="text-lg font-bold mt-2">{item.title}</h3>
            <p className="text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
