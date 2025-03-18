import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/ChatPage.css";

const ChatPage = () => {
    const [token, setToken] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Get token from localStorage when component mounts
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        };
        try {
            const parts = storedToken.split('.');
            if (parts.length === 3) {
                try {
                    const payLoad = JSON.parse(atob(parts[1]));
                    const expiration = payLoad.exp * 1000;

                    if (Date.now() < expiration) {
                        setToken(storedToken)
                    } else {
                        console.error("Token expired.");
                        localStorage.removeItem("token");
                        navigate("/");
                    }
                } catch (parseError) {
                    console.error("Error parsing token:", parseError);
                    setToken(storedToken)
                }
            } else {
                console.error("Invalid token format");
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (error) {
            console.error("Token validation error:", error);
            localStorage.removeItem("token");
            navigate("/")
        }
    }, [navigate]);


    // handling new tasks by AI
    const handleNewTasks = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 15000);
    }

    const viewNewTasks = () => {
        navigate("/dashboard");
    }

    return (
        <div>
            <h2 className="chatpage-title"><div className="merriweather-title">AMERY</div></h2>
            {/* render view tasks if tasks were created by AI */}
            {showNotification && (
                <div className="task-notification" >
                    <p>Ready to view tasks?</p>
                    <button onClick={viewNewTasks}>View Tasks</button>
                    </div>
            )}

            {/* rendering chat interface */}
            {token ? (
                <Chat token={token} onNewTasks={handleNewTasks} />
            ) : (
                <p>Loading chat interface...</p>
            )}
        </div>
    );
};

export default ChatPage;