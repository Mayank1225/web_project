import { API_URL } from "../auth/authAPI";
import axios from 'axios';


export const addProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/add-product`, productData);
      return response.data; // Return product data on successful addition
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.error || "Failed to add product.");
      }
      throw new Error("Network error. Please try again later.");
    }
  };

export const getUserProducts = async (ownerEmail) => {
  try {
    const response = await axios.post(`${API_URL}/get-products`, { ownerEmail });
    return response.data; // Return products on success
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Failed to fetch products.");
    }
    throw new Error("Network error. Please try again later.");
  }
};