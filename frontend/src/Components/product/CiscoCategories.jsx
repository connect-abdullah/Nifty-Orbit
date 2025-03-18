import { useEffect, useState } from "react";

const CiscoCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dry-sheep-lose.loca.lt/product-category/cisco")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Cisco Product Categories</h2>
      <ul className="list-disc pl-5">
        {categories.map((category) => (
          <li key={category.product_category_id} className="mb-2">
            <strong>{category.category_name}</strong> (ID: {category.product_category_id})
            <p className="text-sm text-gray-600">Brand: {category.brand.brand_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CiscoCategories;
