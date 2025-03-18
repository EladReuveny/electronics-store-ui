import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/order";

/**
 * Fetch orders by user ID
 * @param {number} userId
 * @returns {Promise<Array>} Orders
 */
export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; //
  }
};

/**
 * Update order status by order ID
 * @param {number} orderId
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${orderId}/update`);
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

/**
 * Fetch all orders
 * @returns {Promise<Array>} All orders
 */
export const getAllOrders = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};
