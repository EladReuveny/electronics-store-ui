import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/wish-list";

/**
 * Get the wishlist for a user.
 * @param {number} userId
 * @returns {Promise<Object[]>} User's wishlist
 */
export const getWishList = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching wishlist for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Add a product to the user's wishlist.
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<Object>} Updated wishlist
 */
export const addProductToWishList = async (userId, productId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/${userId}/add-product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error adding product ${productId} to wishlist for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Remove a product from the user's wishlist.
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<Object>} Updated wishlist
 */
export const removeProductFromWishList = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user/${userId}/remove-product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error removing product ${productId} from wishlist for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Move a product from the wishlist to the shopping cart.
 * @param {number} userId
 * @param {number} productId
 * @param {number} [quantity = 1] quantity
 * @returns {Promise<Object>} Updated wishlist
 */
export const moveToShoppingCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/${userId}/move-to-cart/${productId}?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error moving product ${productId} from wishlist to cart for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Clear a user's wish list.
 * @param {number} userId
 * @returns {Promise<Object>} Updated wishlist
 */
export const clearWishList = async (userId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${userId}/clear-wishlist`);
    return response.data;
  } catch (error) {
    console.error(`Error clearing wishlist for user ${userId}:`, error);
    throw error;
  }
}
