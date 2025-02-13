import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:5000/api/users" });

export const createUser = (data) => apiClient.post("/create", data);
export const fetchUsers = () => apiClient.get("/list");
export const updateUser = (id, data) => apiClient.put(`update/${id}`, data);
export const getUser = (id) => apiClient.get(`/${id}`);
export const deleteUser = (id) => apiClient.delete(`/delete/${id}`);
