import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchItems = () => {
  return axios.get(`${API_URL}/items`);
};

export const addItem = (item) => {
  return axios.post(`${API_URL}/items`, item);
};

export const updateItem = (id, item) => {
  return axios.put(`${API_URL}/items/${id}`, item);
};

export const deleteItem = (id) => {
  return axios.delete(`${API_URL}/items/${id}`);
};
