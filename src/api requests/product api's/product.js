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
 * @returns {Promise<Object>} Added product
 */
export const addProduct = async (product) => {
  try {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error.response?.data;
  }
};

/**
 * Update product details
 * @param {number} productId
 * @param {Object} productUpdateDTO
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (productId, productUpdateDTO) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${productId}`, productUpdateDTO);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productId}:`, error);
    throw error.response?.data;
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

/**
 * Delete selected products
 * 
 * @param {Array} selectedProductsIds A list of product IDs to be removed.
 * @returns {Promise<Object>} A response message confirming deletion.
 */
export const removeSelectedProducts = async (selectedProductsIds) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/remove-selected-products`, selectedProductsIds);
    return response.data;
  } catch (error) {
    console.error("Error removing selected products:", error);
    throw error.response?.data;
  }
};
