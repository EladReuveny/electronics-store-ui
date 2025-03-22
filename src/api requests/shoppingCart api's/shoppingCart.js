import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/shopping-cart";

/**
 * Fetch the shopping cart for a user.
 * @param {number} userId
 * @returns {Promise<Object>} Cart details
 */
export const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Add a product to the cart.
 * @param {number} userId
 * @param {number} productId
 * @param {number} quantity
 * @returns {Promise<Object>} Updated cart
 */
export const addProductToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/${userId}/add-product/${productId}?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error adding product ${productId} to cart for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Clear a user's shopping cart.
 * @param {number} userId
 * @returns {Promise<void>}
 */
export const clearCart = async (userId) => {
  try {
    await axios.put(`${API_BASE_URL}/user/${userId}/clear-cart`);
  } catch (error) {
    console.error(`Error clearing cart for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Remove a product from the cart.
 * @param {number} userId
 * @param {number} productId
 * @returns {Promise<Object>} Updated cart
 */
export const removeProductFromCart = async (userId, productId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user/${userId}/remove-product/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error removing product ${productId} from cart for user ${userId}:`,
      error
    );
    throw error;
  }
};

/**
 * Checkout the cart and place an order.
 * @param {number} userId
 * @returns {Promise<Object>} Order details
 */
export const checkout = async (userId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/${userId}/checkout`
    );
    return response.data;
  } catch (error) {
    console.error(`Error checking out for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Update a cart item's quantity.
 * @param {number} userId
 * @param {number} itemId
 * @param {number} quantity
 * @returns {Promise<Object>} Updated shopping cart.
 */
export const updateItemQuantity = async (userId, itemId, quantity) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user/${userId}/update-quantity/${itemId}?quantity=${quantity}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating item ${itemId} quantity for user ${userId}:`,
      error
    );
    throw error;
  }
}
