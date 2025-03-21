import "./Login.css"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../api/authentication";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await auth.loginUser(email, password);
            localStorage.setItem("token", data.token); // storing JWT token
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard"); // redirect to dashboard
        } catch (error) {
            setError(error.message || "Email or password is incorrect. Please try again.");
            console.error("Check Login.jsx. Login submission failed with:", error.message 
                || "Unable to retrieve login submission error."
            );
           
        };
    }

    return (
        <>
            <div className="login-container">
                <h1>Login Here</h1>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required />
                    
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p>Don&apos;t Have an account? <Link to="/signup">Sign Up Here</Link> </p>
            </div>
        </>

    )
};

export default Login;