import "./Signup.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../api/authentication";


const Signup = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.signupUser(username, firstname, lastname, email, password);
            navigate("/"); // redirect
        } catch (error) {
            setError(error.message || "Signup failed.");
            console.error("Check Signup.jsx. Signup submission failed with:", error.message
                || "Unable to retrieve signup submission error."
            );
        }
    }

return (
    <>
    <div className="signup-container">
        <h1>Sign Up Here</h1>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
            <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
            
            <input 
            type="text" 
            placeholder="First Name" 
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required />
          
            <input 
            type="text" 
            placeholder="Last Name" 
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required />
            
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
           
            <button type="submit" className="signup-button">Sign Up</button>

        </form>
        <p>Already have an account? <Link to="/">Login Here</Link></p>
    </div>
    </>
)

};


export default Signup;