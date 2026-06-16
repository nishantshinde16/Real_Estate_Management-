import axios from "axios";

const API_URL = "http://localhost:5000/api/feedbacks";

export const createFeedback = (data) => {
  return axios.post(API_URL, data);
};

export const getFeedbacks = () => {
  return axios.get(API_URL);
};
export const updateFeedbackStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}`, { status });
};

export const deleteFeedback = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};