import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBrands } from "../../apis/api";
import PropTypes from "prop-types";
import { baseUrl } from "../../apis/api";

const Sidebar = ({ brand }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const brands = await fetchBrands();
        console.log("Brands data:", brands);
        
        // Find the brand using brand_name which is the correct property based on provided structure
        const brandData = brands.find(b => 
          b.brand_name && b.brand_name.toLowerCase() === brand.toLowerCase()
        );
        
        if (!brandData) {
          console.error("Brand not found:", brand);
          console.log("Available brands:", brands.map(b => b.brand_name));
          throw new Error("Brand not found");
        }
        
        // Use brand_id instead of id
        const response = await fetch(`${baseUrl}/categories?brandId=${brandData.brand_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchCategories();
    }
  }, [brand]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${brand}/${categoryId}`); // Update the URL
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4 p-2">Categories of {brand}</h2>

      {loading ? (
        <p className="text-gray-400">Loading categories...</p>
      ) : (
        <ul>
          <li className="mb-2">
            <button
              className={`text-white ${!category ? "font-bold underline" : ""}`}
              onClick={() => navigate(`/products/${brand}`)}
            >
              All Products
            </button>
          </li>
          {Array.isArray(categories) &&
            categories.map((categoryItem) => (
              <li key={categoryItem?.product_id || categoryItem?.product_category_id} className="mb-2">
                <button
                  className={`text-white ${
                    category == categoryItem?.product_id || category == categoryItem?.product_category_id
                      ? "font-bold underline"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(categoryItem?.product_id || categoryItem?.product_category_id)}>
                  {categoryItem.short_description || categoryItem.category_name}
                </button>
              </li>
            ))}
        </ul>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  brand: PropTypes.string.isRequired,
};

export default Sidebar;