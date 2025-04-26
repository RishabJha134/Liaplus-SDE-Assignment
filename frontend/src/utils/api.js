import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Posts API
export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch posts" };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch post" };
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post("/posts", postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create post" };
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.patch(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update post" };
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete post" };
  }
};

export default api;
