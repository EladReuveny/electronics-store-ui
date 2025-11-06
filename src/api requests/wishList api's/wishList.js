import { api } from "../../config";

const BASE_URL = "wish-lists";

/**
 * Get the wishlist for a user.
 * @param {number} userId
 * @returns {Promise<Object[]>} User's wishlist
 */
export const getWishList = async (userId) => {
  try {
    const response = await api.get(`/${BASE_URL}/user/${userId}`);
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
    const response = await api.post(
      `/${BASE_URL}/user/${userId}/add-product/${productId}`
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
    const response = await api.delete(
      `/${BASE_URL}/user/${userId}/remove-product/${productId}`
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
    const response = await api.post(
      `/${BASE_URL}/user/${userId}/move-to-cart/${productId}?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart: ", error.message);
    throw new Error(error.response.data);
  }
};

/**
 * Clear a user's wish list.
 * @param {number} userId
 * @returns {Promise<Object>} Updated wishlist
 */
export const clearWishList = async (userId) => {
  try {
    const response = await api.put(
      `/${BASE_URL}/user/${userId}/clear-wishlist`
    );
    return response.data;
  } catch (error) {
    console.error(`Error clearing wishlist for user ${userId}:`, error);
    throw error;
  }
};
