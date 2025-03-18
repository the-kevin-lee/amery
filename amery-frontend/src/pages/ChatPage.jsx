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
        }
    }, []);


    // handling new tasks by AI
    const handleNewTasks = () => {
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    const viewNewTasks = () => {
        navigate("/dashboard");
    }

    return (
        <div>
            <h2 className="chatpage-title">AMERY</h2>
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