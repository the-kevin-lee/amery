import Chat from "../components/Chat";
import { useEffect, useState } from "react";

const ChatPage = () => {
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        // Get token from localStorage when component mounts
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            <h2>AI Automation Assistant</h2>
            {token ? (
                <Chat token={token} onNewTasks={() => {}} />
            ) : (
                <p>Loading chat interface...</p>
            )}
        </div>
    );
};

export default ChatPage;