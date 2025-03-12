// messages API

import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL 
    ? `${import.meta.env.VITE_BACKEND_URL}/messages` 
    : "http://localhost:5000/messages"; 

const getMessages = async (token) => {
    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};

const sendMessages = async (token, content) => {
    return axios.post(API_URL, 
        { content },
        { headers: {
            Authorization: `Bearer ${token}`
        }}
    )
}; 

export default {getMessages, sendMessages};