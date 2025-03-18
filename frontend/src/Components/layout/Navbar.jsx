import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(40); // Initial brands to show (4 columns * 10 records)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/brands.json')
      .then(response => response.json())
      .then(data => setBrands(data.brands))
      .catch(error => console.error('Error loading brands:', error));
  }, []);

  const loadMoreBrands = () => {
    setVisibleBrands(prev => prev + 40); // Load 40 more brands (4 columns * 10 records)
  };

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to split brands into 4 columns
  const splitBrandsIntoColumns = (brands, columns = 4) => {
    const columnSize = Math.ceil(brands.length / columns);
    return Array.from({ length: columns }, (_, i) =>
      brands.slice(i * columnSize, (i + 1) * columnSize)
    );
  };

  return (
    <nav className="relative bg-gradient-to-r from-[#37376f] via-[#4b0082] to-[#875595] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">MyLogo</div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-grow justify-center md:items-center">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-white hover:text-gray-400">Home</Link></li>
            <li><Link to="/aboutus" className="text-white hover:text-gray-400">About</Link></li>
            <li className="relative group">
              <button className="text-white hover:text-gray-200">Brand</button>
              <ul className="absolute top-full left-0 w-[800px] bg-[#9969C7] rounded-lg shadow-lg mt-2 py-4 px-4 grid grid-cols-4 gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 max-h-[500px] overflow-y-auto">
                <div className="col-span-4">
                  <input
                    type="text"
                    placeholder="Search brands..."
                    className="w-full px-2 py-1 mb-4 rounded border border-white text-white placeholder-gray-300 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {splitBrandsIntoColumns(filteredBrands.slice(0, visibleBrands)).map((column, colIndex) => (
                  <div key={colIndex} className="space-y-2">
                    {column.map((brand, index) => (
                      <li key={index}>
                        <Link
                          to={`/products/${brand.toLowerCase()}`}
                          className="block text-white py-1 px-2 hover:bg-[#a10cb5] rounded"
                        >
                          {brand}
                        </Link>
                      </li>
                    ))}
                  </div>
                ))}
                {visibleBrands < filteredBrands.length && (
                  <div className="col-span-4 flex justify-center mt-4">
                    <button
                      onClick={loadMoreBrands}
                      className="text-white py-2 px-4 bg-[#a10cb5] rounded-lg hover:bg-[#8a0a9e] transition-all duration-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </ul>
            </li>
            <li><Link to="/contactus" className="text-white hover:text-gray-400">Contact</Link></li>
            <li><Link to="/Itsector" className="text-white hover:text-gray-400">Hardware</Link></li>
          </ul>
        </div>

        {/* Search Bar & Buttons */}
        <div className="flex items-center md:space-x-4 sm:pace-x-4">
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2"
            />
          </div>
          <Link to="/login" className="text-white hover:text-purple-400">Login</Link>
          <Link to="/cart" className="text-white hover:text-purple-700 cursor-pointer">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
          <Link to="/quote" className="bg-white text-purple-700 py-1 px-3 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300">
            Get A Quote
          </Link>
          <Link to="/track" className="bg-purple-700 text-white py-1 px-3 rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-300">
            Track Progress
          </Link>
          {/* Hamburger Menu */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2"
          />
          <ul className="mt-2">
            <li><Link to="/" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Home</Link></li>
            <li><Link to="/aboutus" className="block text-white py-2 px-4 hover:bg-[#81639d98]">About</Link></li>
            <li>
              <button
                onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                className="block w-full text-left text-white py-2 px-4 hover:bg-[#81639d98]"
              >
                Brands
              </button>
              {isMobileCategoriesOpen && (
                <ul className="ml-4 mt-1 rounded-lg shadow-lg py-2 bg-purple-400">
                  {brands.map((brand, index) => (
                    <li key={index}>
                      <Link
                        to={`/products/${brand.toLowerCase()}`}
                        className="block text-white py-2 px-4 hover:bg-[#81639d98]"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li><Link to="/contactus" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Contact</Link></li>
            <li><Link to="/Itsector" className="block text-white py-2 px-4 hover:bg-[#81639d98]">About Hardware</Link></li>
            <li><Link to="/payment" className="block text-white py-2 px-4 hover:bg-[#81639d98]">payment</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;