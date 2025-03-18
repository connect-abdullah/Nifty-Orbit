import { useEffect, useState } from "react";

const BrandData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://cute-lands-carry.loca.lt/brand/A10")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Brand: {data.brand_name}</h1>
      <img src={data.brand_image} alt={data.brand_name} width="100" />

      <h2>Products:</h2>
      {data.products.length > 0 ? (
        <ul>
          {data.products.map(product => (
            <li key={product.product_id}>
              <h3>{product.short_description}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Condition: {product.condition} ({product.sub_condition})</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default BrandData;
