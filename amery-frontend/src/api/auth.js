import axios from "axios";



const back_end_API_url = "http://localhost:5000";


const loginUser = async ( email, password) => {
    try {
        const response = await axios.post(`${back_end_API_url}/auth/login`, {

            email,
            password
        });
        return response.data; // receiving JWT token 
    } catch (error) {
        throw error.response?.data?.message || "Login failed through auth.js.";
    }
};

const signupUser = async (username, firstname, lastname, email, password) => {
    try {
        const response = await axios.post(`${back_end_API_url}/auth/signup`, {
            username,
            firstname,
            lastname,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Signup failed through auth.js.";
    };
};


export default {loginUser, signupUser};
