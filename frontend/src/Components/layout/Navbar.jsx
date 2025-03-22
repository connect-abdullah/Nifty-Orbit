import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBrandsCategories } from '../../apis/api';
import { useAuth } from '../auth/AuthContext'; // adjust the path

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState({});

  const { user } = useAuth();
  const adminEmail = "abdulla23h@gmail.com"; // your specific admin email

  const BRANDS_PER_PAGE = 6;
  const CATEGORIES_PER_ROW = 3;
  const INITIAL_ROWS_TO_SHOW = 3;

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Fetch brands from the API
    const fetchBrands = async () => {
      try {
        const response = await fetchBrandsCategories();
        if (!response.ok) {
          throw new Error('Failed to fetch brands');
        }
        const data = await response.json();
        // Transform the data to match the expected structure
        const transformedBrands = data.map(brand => ({
          id: brand.brand_id, // Add brand_id
          name: brand.brand_name,
          logo: `/images/${brand.brand_name.toLowerCase()}.svg`, // Assuming logos are named accordingly
          categories: brand.categories
        }));
        setBrands(transformedBrands);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredBrands.length / BRANDS_PER_PAGE);

  // Get current brands to display
  const currentBrands = filteredBrands.slice(
    currentPage * BRANDS_PER_PAGE,
    (currentPage + 1) * BRANDS_PER_PAGE
  );

  // Move to next page
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Move to previous page
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Toggle category expansion
  const toggleCategoryExpansion = (brandIndex) => {
    setExpandedCategories({
      ...expandedCategories,
      [brandIndex]: !expandedCategories[brandIndex]
    });
  };

  // Check if a brand has more categories than the initial display limit
  const hasMoreCategories = (categories) => {
    return categories.length > CATEGORIES_PER_ROW * INITIAL_ROWS_TO_SHOW;
  };

  // Get categories to display based on expansion state
  const getCategoriesToDisplay = (categories, brandIndex) => {
    if (expandedCategories[brandIndex] || !hasMoreCategories(categories)) {
      return categories;
    }
    return categories.slice(0, CATEGORIES_PER_ROW * INITIAL_ROWS_TO_SHOW);
  };

  // Handle brand name click
  const handleBrandClick = (brandName) => {
    navigate(`/products/${brandName}`); // Navigate to /products/{BrandName}
  };

  return (
    <nav className="relative bg-gradient-to-r from-[#37376f] via-[#4b0082] to-[#875595] p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* {/ Logo /} */}
        <div className="text-white text-2xl font-bold">
          <Link to='/'>
            <img src="/Logo.png" className="text-white h-10" alt="Logo" />
          </Link>
        </div>

        {/* {/ Desktop Navigation /} */}
        <div className="hidden lg:flex flex-grow justify-center md:items-center">
          <ul className="flex space-x-6">
            <li><Link to="/" className="text-white hover:text-gray-400">Home</Link></li>
            <li><Link to="/aboutus" className="text-white hover:text-gray-400">About</Link></li>
            <li className="relative group">
              <button className="text-white hover:text-gray-200">Brand</button>
              <div className="absolute top-full left-0 w-[900px] bg-white rounded-lg shadow-lg mt-2 py-4 px-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 max-h-[820px] overflow-y-auto">
                {/* {/ Search Bar - Sticky at the top /} */}
                <div className="sticky top-0 bg-white pt-1 pb-3 z-10">
                  <input
                    type="text"
                    placeholder="Search brands..."
                    className="w-full px-4 py-2 rounded border border-gray-300 text-black placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* {/ Brands List /} */}
                <div className="grid grid-cols-1 gap-6 cursor-pointer">
                  {currentBrands.map((brand, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center mb-3">
                        <img src={brand.logo} alt={brand.name} className="h-8 mr-3" />
                        <h3
                          className="text-xl font-bold text-[#4b0082] hover:text-[#a10cb5] cursor-pointer"
                          onClick={() => handleBrandClick(brand.name)} // Handle brand name click
                        >
                          {brand.name}
                        </h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {getCategoriesToDisplay(brand.categories, index).map((category, catIndex) => (
                          <Link
                            key={catIndex}
                            to={`/products/${brand.id}/${category.toLowerCase().replace((/\s+/g).toString(), '-')}`}
                            className="text-gray-700 hover:text-[#a10cb5] hover:underline"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                      {hasMoreCategories(brand.categories) && (
                        <button
                          onClick={() => toggleCategoryExpansion(index)}
                          className="mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                        >
                          {expandedCategories[index] ? 'See Less' : 'See More'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* {/ Pagination controls - Sticky at the bottom /} */}
                {totalPages > 1 && (
                  <div className="sticky bottom-0 bg-white pt-3 border-t border-gray-200 pb-1 z-10">
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                      >
                        Previous
                      </button>
                      <span className="text-gray-600">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className={`px-4 py-2 rounded ${currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
            <li><Link to="/contactus" className="text-white hover:text-gray-400">Contact</Link></li>
            <li><Link to="/Itsector" className="text-white hover:text-gray-400">Hardware</Link></li>
            {user && user.email === adminEmail && (
              <li><Link to="/portal" className="text-white hover:text-gray-400">Portal</Link></li>
            )}
          </ul>
        </div>

        {/* {/ Search Bar & Buttons /} */}
        <div className="flex items-center md:space-x-4 sm:space-x-4">
          <div className="hidden md:flex">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 rounded-lg border-2 border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 bg-transparent"
            />
          </div>
          <Link to="/login" className="block text-white py-2 px-4 hover:text-gray-400">Login</Link>
              <Link to="/cart" className="block text-white py-2 px-4 hover:text-gray-400]">
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
          <Link to="/quote" className="bg-white text-purple-700 py-1 mr-[20px] px-3 rounded-lg hover:bg-purple-700 hover:text-white transition-all duration-300">
            Get A Quote
          </Link>
          <Link to="/track" className="bg-purple-700 text-white py-1 mr-[20px] px-3 rounded-lg hover:bg-white hover:text-purple-700 transition-all duration-300">
            Track Progress
          </Link>
          {/* {/ Hamburger Menu /} */}
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

      {/* {/ Mobile Menu /} */}
      {isOpen && (
        <div className="lg:hidden mt-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 bg-transparent"
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
                <div className="ml-4 mt-1 rounded-lg shadow-lg py-2 bg-purple-400 max-h-113 overflow-y-auto">
                  <div className="sticky top-0 bg-purple-400 pt-1 pb-2 px-4 z-10">
                    <input
                      type="text"
                      placeholder="Search brands..."
                      className="w-full px-4 py-2 rounded border border-white text-white placeholder-gray-300 bg-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {currentBrands.map((brand, index) => (
                    <div key={index} className="mb-4 px-4">
                      <div className="flex items-center mb-2">
                        <img src={brand.logo} alt={brand.name} className="h-6 mr-2" />
                        <h3
                          className="font-bold text-white hover:text-purple-900 cursor-pointer"
                          onClick={() => handleBrandClick(brand.name)} // Handle brand name click
                        >
                          {brand.name}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 ml-2">
                        {getCategoriesToDisplay(brand.categories, `mobile-${index}`).map((category, catIndex) => (
                          <Link
                            key={catIndex}
                            to={`/products/${brand.id}/${category.toLowerCase().replace((/\s+/g).toString(), '-')}`}
                            className="text-white hover:text-purple-900 text-sm"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                      {hasMoreCategories(brand.categories) && (
                        <button
                          onClick={() => toggleCategoryExpansion(`mobile-${index}`)}
                          className="mt-2 text-white hover:text-purple-900 text-sm font-medium"
                        >
                          {expandedCategories[`mobile-${index}`] ? 'See Less' : 'See More'}
                        </button>
                      )}
                    </div>
                  ))}

                  {/* {/ Mobile Pagination controls /} */}
                  {totalPages > 1 && (
                    <div className="sticky bottom-0 bg-purple-400 pt-3 border-t border-purple-500 px-4 pb-1 z-10">
                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 0}
                          className={`px-3 py-1 rounded text-sm ${currentPage === 0 ? 'bg-purple-300 text-purple-100 cursor-not-allowed' : 'bg-white text-purple-700 hover:bg-purple-100'}`}
                        >
                          Previous
                        </button>
                        <span className="text-white text-sm">
                          Page {currentPage + 1}/{totalPages}
                        </span>
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages - 1}
                          className={`px-3 py-1 rounded text-sm ${currentPage === totalPages - 1 ? 'bg-purple-300 text-purple-100 cursor-not-allowed' : 'bg-white text-purple-700 hover:bg-purple-100'}`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </li>
            <li><Link to="/contactus" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Contact</Link></li>
            <li><Link to="/Itsector" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Hardware</Link></li>
            <li><Link to="/payment" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Payment</Link></li>
            <li><Link to="/login" className="block text-white py-2 px-4 hover:bg-[#81639d98]">Login</Link></li>
            <li>
              <Link to="/cart" className="block text-white py-2 px-4 hover:bg-[#81639d98]">
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
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;