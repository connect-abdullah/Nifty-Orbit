import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBrands } from "../../apis/api"

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [brands, setBrands] = useState([]);
  const [expandedBrand, setExpandedBrand] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubCategory, setExpandedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();
  const { brand: brandNameFromUrl } = useParams(); // Get brand name from URL

  useEffect(() => {
    const brands = async () => {
      try {
        const response = await fetchBrands();
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }
        const data = await response.json();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    brands();
  }, []);

  // Filter brands to only show the brand from the URL by default
  const filteredBrands = brands.filter(
    (brandItem) => brandItem.brand_name.toLowerCase() === brandNameFromUrl?.toLowerCase()
  );

  // Filter brands based on search term (for search functionality)
  const searchedBrands = brands.filter((brandItem) =>
    brandItem.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandClick = (brandName) => {
    setExpandedBrand((prev) => (prev === brandName ? null : brandName));
  };

  const handleCategoryClick = (categoryName) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
    setExpandedSubCategory(null); // Collapse sub-categories when switching categories
  };

  const handleSubCategoryClick = (subCategoryName) => {
    setExpandedSubCategory((prev) => (prev === subCategoryName ? null : subCategoryName));
  };

  const renderDropdownArrow = (isExpanded) => {
    return (
      <span className="ml-1">
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </span>
    );
  };

  const handleViewProducts = (brandName) => {
    navigate(`/products/${brandName}`); // Navigate to the brand's product page
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4 p-2">Brands</h2>

      {/* {/ Search Box /} */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search brands..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* {/ Display the brand from the URL by default /} */}
      {loading ? (
        <p className="text-gray-400">Loading brands...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : filteredBrands.length === 0 ? (
        <p className="text-gray-400">No brand found.</p>
      ) : (
        <ul>
          {filteredBrands.map((brandItem) => (
            <li key={brandItem.brand_id} className="mb-2">
              <div className="flex items-center">
                <button
                  className={`flex-grow text-left text-white p-2 rounded-lg ${
                    expandedBrand === brandItem.brand_name ? "bg-purple-700 font-bold" : "hover:bg-purple-600"
                  }`}
                  onClick={() => handleBrandClick(brandItem.brand_name)}
                >
                  {brandItem.brand_name}
                  {renderDropdownArrow(expandedBrand === brandItem.brand_name)}
                </button>
                {/* {/ Arrow button to view products /} */}
                <button
                  className="ml-2 p-2 text-white hover:bg-purple-600 rounded-lg"
                  onClick={() => handleViewProducts(brandItem.brand_name)}
                  title="View products"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              {expandedBrand === brandItem.brand_name && (
                <ul className="ml-4 mt-2">
                  {brandItem.categories.map((categoryItem) => (
                    <li key={categoryItem.category_id} className="mb-2">
                      <button
                        className={`w-full text-left text-white p-2 rounded-lg flex justify-between items-center ${
                          expandedCategory === categoryItem.category_name
                            ? "bg-purple-700 font-bold"
                            : "hover:bg-purple-600"
                        }`}
                        onClick={() => handleCategoryClick(categoryItem.category_name)}
                      >
                        <span>{categoryItem.category_name}</span>
                        {renderDropdownArrow(expandedCategory === categoryItem.category_name)}
                      </button>
                      {expandedCategory === categoryItem.category_name && (
                        <ul className="ml-4 mt-2">
                          {categoryItem.subcategories.map((subCategoryItem) => (
                            <li key={subCategoryItem.subcategory_id} className="mb-2">
                              <button
                                className={`w-full text-left text-white p-2 rounded-lg flex justify-between items-center ${
                                  expandedSubCategory === subCategoryItem.subcategory_name
                                    ? "bg-purple-700 font-bold"
                                    : "hover:bg-purple-600"
                                }`}
                                onClick={() => handleSubCategoryClick(subCategoryItem.subcategory_name)}
                              >
                                <span>{subCategoryItem.subcategory_name}</span>
                                {renderDropdownArrow(expandedSubCategory === subCategoryItem.subcategory_name)}
                              </button>
                              {expandedSubCategory === subCategoryItem.subcategory_name && (
                                <ul className="ml-4 mt-2">
                                  {subCategoryItem.products.map((product) => (
                                    <li key={product.product_id} className="mb-2">
                                      <button
                                        className={`w-full text-left text-white p-2 rounded-lg ${
                                          expandedSubCategory === subCategoryItem.subcategory_name
                                            ? "bg-purple-800 font-bold"
                                            : "hover:bg-purple-700"
                                        }`}
                                        onClick={() =>
                                          navigate(
                                            `/products/${brandItem.brand_name}/${categoryItem.category_name}/${subCategoryItem.subcategory_name}/${product.product_name}`
                                          )
                                        }
                                      >
                                        {product.product_name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* {/ Display searched brands when typing in the search box /} */}
      {searchTerm && (
        <>
          <h3 className="text-xl font-semibold mb-2 p-2">Search Results</h3>
          <ul>
            {searchedBrands.map((brandItem) => (
              <li key={brandItem.brand_id} className="mb-2">
                <div className="flex items-center">
                  <button
                    className={`flex-grow text-left text-white p-2 rounded-lg ${
                      expandedBrand === brandItem.brand_name ? "bg-purple-700 font-bold" : "hover:bg-purple-600"
                    }`}
                    onClick={() => handleBrandClick(brandItem.brand_name)}
                  >
                    {brandItem.brand_name}
                    {renderDropdownArrow(expandedBrand === brandItem.brand_name)}
                  </button>
                  {/* {/ Arrow button to view products /} */}
                  <button
                    className="ml-2 p-2 text-white hover:bg-purple-600 rounded-lg"
                    onClick={() => handleViewProducts(brandItem.brand_name)}
                    title="View products"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {expandedBrand === brandItem.brand_name && (
                  <ul className="ml-4 mt-2">
                    {brandItem.categories.map((categoryItem) => (
                      <li key={categoryItem.category_id} className="mb-2">
                        <button
                          className={`w-full text-left text-white p-2 rounded-lg flex justify-between items-center ${
                            expandedCategory === categoryItem.category_name
                              ? "bg-purple-700 font-bold"
                              : "hover:bg-purple-600"
                          }`}
                          onClick={() => handleCategoryClick(categoryItem.category_name)}
                        >
                          <span>{categoryItem.category_name}</span>
                          {renderDropdownArrow(expandedCategory === categoryItem.category_name)}
                        </button>
                        {expandedCategory === categoryItem.category_name && (
                          <ul className="ml-4 mt-2">
                            {categoryItem.subcategories.map((subCategoryItem) => (
                              <li key={subCategoryItem.subcategory_id} className="mb-2">
                                <button
                                  className={`w-full text-left text-white p-2 rounded-lg flex justify-between items-center ${
                                    expandedSubCategory === subCategoryItem.subcategory_name
                                      ? "bg-purple-700 font-bold"
                                      : "hover:bg-purple-600"
                                  }`}
                                  onClick={() => handleSubCategoryClick(subCategoryItem.subcategory_name)}
                                >
                                  <span>{subCategoryItem.subcategory_name}</span>
                                  {renderDropdownArrow(expandedSubCategory === subCategoryItem.subcategory_name)}
                                </button>
                                {expandedSubCategory === subCategoryItem.subcategory_name && (
                                  <ul className="ml-4 mt-2">
                                    {subCategoryItem.products.map((product) => (
                                      <li key={product.product_id} className="mb-2">
                                        <button
                                          className={`w-full text-left text-white p-2 rounded-lg ${
                                            expandedSubCategory === subCategoryItem.subcategory_name
                                              ? "bg-purple-800 font-bold"
                                              : "hover:bg-purple-700"
                                          }`}
                                          onClick={() =>
                                            navigate(
                                              `/products/${brandItem.brand_name}/${categoryItem.category_name}/${subCategoryItem.subcategory_name}/${product.product_name}`
                                            )
                                          }
                                        >
                                          {product.product_name}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;