import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUser(userData);
        } else {
            console.error("Unable to retrieve user data, check dashboard.jsx");
        }

    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }


    return (
        <>
        <h1>
            Welcome, {user?.username + "!" || "User!"}
        </h1>
        <p>{user?.email || "No email"}</p>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
};

export default Dashboard;