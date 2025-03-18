import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/product";

/**
 * Fetch all products
 * @returns {Promise<Array>} List of products
 */
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/**
 * Fetch a product by ID
 * @param {number} productId
 * @returns {Promise<Object>} Product details
 */
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

/**
 * Add a new product
 * @param {Object} product
 * @returns {Promise<Object>} Created product
 */
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

/**
 * Update product details
 * @param {number} productId
 * @param {Object} product
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (productId, product) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${productId}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error;
  }
};

/**
 * Delete a product by ID
 * @param {number} productId
 * @returns {Promise<void>}
 */
export const deleteProductById = async (productId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${productId}`);
  } catch (error) {
    console.error(`Error deleting product ${productId}:`, error);
    throw error;
  }
};

/**
 * Get products by category
 * @param {string} category
 * @returns {Promise<Array>} List of products in the category
 */
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};

/**
 * Search products by name
 * @param {string} query
 * @returns {Promise<Array>} Search results
 */
export const searchProductsByName = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    throw error;
  }
};
