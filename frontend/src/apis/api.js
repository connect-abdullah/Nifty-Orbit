// const baseUrl = "http://localhost:8000/api";

export const baseUrl = "https://quick-signs-bake.loca.lt";

const headers = {
  headers: { "Content-Type": "application/json" },
};

import axios from "axios";

export const registerUser = async (formData) => {
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

export const fetchBrands = async () => {
  try {
    const response = await fetch(`${baseUrl}/brand`, headers);
    if (!response.ok) throw new Error("Failed to fetch brands");
    return response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const productList = async (brandId) => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is undefined");
    }
    const response = await fetch(
      `${baseUrl}/products/filter?brandId=${brandId}`,
      headers
    );
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};