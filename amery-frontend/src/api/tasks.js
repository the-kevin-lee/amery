// used for connecting CRUD to the backend

import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL ?
    `${import.meta.env.VITE_BACKEND_URL}/tasks` :
    "http://localhost:5000/tasks";

const getTasks = async (token) => {
    return axios.get(API_URL, {headers: {Authorization: `Bearer ${token}`}});
};

const createTask = async (token, message) => {
    return axios.post(API_URL, {message}, {headers: {Authorization: `Bearer ${token}`}});
};

const updateTask = async (token, id, message, completed) => {
    return axios.put(`${API_URL}/${id}`, {message, completed}, {headers: {Authorization: `Bearer ${token}`}});
}

const deleteTask = async (token, id) => {
    return axios.delete(`${API_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`}});
}
    
export default {createTask, getTasks, updateTask, deleteTask};