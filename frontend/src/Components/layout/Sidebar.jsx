import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ brand }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://quick-signs-bake.loca.lt/brand/${brand}`);
        console.log("Raw Response:", response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        console.log("Response Text:", text);

        if (!text) {
          throw new Error("Empty response from the server");
        }

        const data = JSON.parse(text);
        console.log("Parsed Data:", data);

        if (data.productCategories && Array.isArray(data.productCategories)) {
          setCategories(data.productCategories);
        } else {
          console.error("No product categories found in the response");
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchCategories();
    }
  }, [brand]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${brand}/${categoryId}`);
  };

  return (
    <aside className="w-64 bg-gray-900 p-4 min-h-screen text-white">
      <h2 className="text-2xl font-semibold mb-4 p-2">Categories of {brand}</h2>

      {loading ? (
        <p className="text-gray-400">Loading categories...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
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
              <li key={categoryItem.product_category_id} className="mb-2">
                <button
                  className={`text-white ${
                    category == categoryItem.product_category_id
                      ? "font-bold underline"
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(categoryItem.product_category_id)}
                >
                  {categoryItem.category_name}
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