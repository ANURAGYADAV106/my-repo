import axios from "axios";

// Your backend base URL
// const API = "http://localhost:4000";

// Create Paste
export const createPaste = (data) => {
  return axios.post(`/api/pastes`, data);
};

// Get Paste (API JSON version – optional)
export const getPaste = (id) => {
  return axios.get(`/api/pastes/${id}`);
};

// Health check
export const healthCheck = () => {
  return axios.get(`/api/health`);
};
