const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-indigo-900 to-blue-900 text-white p-8 mt-20 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Explore Our Universe Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Explore Our Universe</h3>
          <ul className="space-y-2">
            <li>
              <a href="/quote" className="hover:text-purple-400">
                Customer Service
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-purple-400">
                My Account
              </a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-purple-400">
                About Us
              </a>
            </li>
            
           
            <li>
              <a href="/cart" className="hover:text-purple-400">
              Add to cart
              </a>
            </li>
            <li>
              <a href="/payment" className="hover:text-purple-400">
                Payment Methods
              </a>
            </li>
           
           
            <li>
              <a href="/faqs" className="hover:text-purple-400">
                FAQs
              </a>
            </li>
           
            <li>
              <a href="/privacypolicy" className="hover:text-purple-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/Termsandcondition" className="hover:text-purple-400">
                Terms & Conditions
              </a>
            </li>
          
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
          <a
              href="https://www.instagram.com/your-instagram-account"
              className="text-white hover:text-purple-400"
            >
              <img
                src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR0LLTqDd5WUncTAWmJI34sS0HZUsF8retg&s'
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.instagram.com/your-instagram-account"
              className="text-white hover:text-purple-400"
            >
              <img
                src="https://store-images.s-microsoft.com/image/apps.30645.9007199266245907.cb06f1f9-9154-408e-b4ef-d19f2325893b.ac3b465e-4384-42a8-9142-901c0405e1bc"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://www.instagram.com/your-instagram-account"
              className="text-white hover:text-purple-400"
            >
              <img
                src="https://img.freepik.com/premium-vector/x-new-social-network-black-app-icon-twitter-rebranded-as-x-twitter-s-logo-was-changed_277909-568.jpg?semt=ais_hybrid"
                alt="Instagram"
                className="w-6 h-6"
              />
            </a>
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email here..."
              className="p-2 rounded bg-gray-800 text-white w-full"
            />
          </div>
          <ul className="space-y-2">
            <li>
              <a href="/contactus" className="hover:text-purple-400">
                Contact Us
              </a>
            </li>
     
        
        
          </ul>
        </div>

        {/* Tools & Services Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Tools & Services</h3>
          <ul className="space-y-2">
           
            <li>
              <a href="/Itsector" className="hover:text-purple-400">
                IT Hardware Rental
              </a>
            </li>
          
            <li>
              <a href="/signup" className="hover:text-purple-400">
                Create a Trade Account
              </a>
            </li>
          </ul>
        </div>

    
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-gray-800 pt-8 text-center">
        <p className="mb-2">
          Call Us:{" "}
          <a href="tel:+44443223439" className="hover:text-purple-400">
            +44 (0) 443 223 439
          </a>
        </p>
        <p className="mb-2">
          Email:{" "}
          <a
            href="mailto:info@niftyorbit.com"
            className="hover:text-purple-400"
          >
            info@niftyorbit.com
          </a>
        </p>
        <p className="mb-4">
          Address: 123 Cosmos Lane, Star City, Niftyorbit, UN 12345
        </p>
        <p className="text-sm">
          Copyright © 2025 Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
