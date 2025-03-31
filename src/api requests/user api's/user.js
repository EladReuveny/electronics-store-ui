import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/user";

/**
 * Fetch all users.
 * @returns {Promise<Object[]>} List of users
 */
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Fetch user by ID.
 * @param {number} userId
 * @returns {Promise<Object>} User details
 */
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

/**
 * Register a new user.
 * @param {Object} user User details
 * @returns {Promise<Object>} Registered user
 */
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Update user details.
 * @param {number} userId
 * @param {Object} userUpdateDTO Updated user details
 * @returns {Promise<Object>} Updated user
 */
export const updateUser = async (userId, userUpdateDTO) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${userId}/update`,
      userUpdateDTO
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data);
  }
};

/**
 * Delete user.
 * @param {number} userId
 * @returns {Promise<void>}
 */
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${userId}/delete`);
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

/**
 * Log in user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} Authenticated user details
 */
export const loginUser = async (userLoginDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userLoginDTO);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
