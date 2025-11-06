import { api } from "../../config";

const BASE_URL = "orders";

/**
 * Fetch orders by user ID
 * @param {number} userId
 * @returns {Promise<Array>} Orders
 */
export const getOrdersByUserId = async (userId) => {
  try {
    const response = await api.get(`/${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; //
  }
};

/**
 * Update order status by order ID
 * @param {number} orderId
 * @param {Object} newOrderStatus
 * @returns {Promise<Object>} Updated order
 */
export const updateOrderStatus = async (orderId, newOrderStatus) => {
  try {
    const response = await api.put(`/${BASE_URL}/${orderId}`, newOrderStatus, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await api.get(`/${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

/**
 * Fetch all orders
 * @returns {Promise<Array>} All orders (XML format)
 */
export const getAllOrdersAsXML = async () => {
  try {
    const response = await api.get(`/${BASE_URL}/all/xml-format`, {
      headers: {
        Accept: "application/xml",
      },
      responseType: "text",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

/**
 * Cancel an order by its ID.
 * @param {number} orderId The ID of the order to be canceled.
 * @returns {Promise<string>} A success message if the cancellation is successful.
 * @throws {Error} Throws an error if the request fails.
 */
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.delete(`/${BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error.response?.data;
  }
};
