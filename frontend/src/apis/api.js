// const baseUrl = "http://localhost:8000/api";

export const baseUrl = "https://shiny-cats-smell.loca.lt";

const headers = {
  headers: { "Content-Type": "application/json" },
};

import axios from "axios";

export const registerUser = async (formData) => {``
  const response = await axios.post(
    `${baseUrl}/users`,
    formData,
    headers
  );
  return response;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(
    `${baseUrl}/auth/`,
    { email, password },
    headers
  );
  return response;
};

// ProductListing
export const fetchBrands = async () => {
  try {
    const response = await fetch(`${baseUrl}/brand`, headers);
    if (!response.ok) throw new Error("Failed to fetch brands");
    return response;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const fetchBrandsCategories = async () => {
  try {
    const response = await fetch(`${baseUrl}/brand/categories`, headers);
    if (!response.ok) throw new Error("Failed to fetch brands");
    return response;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const productList = async () => {
  try {
    const response = await fetch(
      `${baseUrl}/products`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};


// Get Quote Api
export const getQuote = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/quote`, data, headers);
    return response;
  } catch (error) {
    console.error("Error sending quote:", error);
    throw error;
  }
};

// Contact Us Api
export const contactUs = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/contact`, formData, headers);
    return response;
  } catch (error) {
    console.error("Error sending quote:", error);
    throw error;
  }
};



// Product Details Page
// export const fetchProductById = async (id) => {
//   const response = await fetch(`${baseUrl}/products/${id}`); 
//   if (!response.ok) {
//     throw new Error('Failed to fetch product by ID');
//   }
//   return response;
// };
