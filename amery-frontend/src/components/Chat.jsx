import { useState, useEffect } from "react";
import messagesAPI from "../api/messages";
import "./Chat.css";

const Chat = ({ token, onNewTasks }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(null);

  //fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await messagesAPI.getMessages(token);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages to UI", error);
      }
    };
    fetchMessages();
  }, [token]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setLoading(true);
    try {
      const response = await messagesAPI.sendMessages(token, inputMessage);
      setMessages((prev) => [
        ...prev,
        response.data.userMessage,
        response.data.aiMessage,
      ]);

      if (response.data.createdTasks?.length > 0) {
        onNewTasks();
      }

      //clear input field
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.is_from_user ? "user-message" : "ai-message"
            }`}
          >
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
  
        {/* loading message */}
        {loading && <div className="loading-indicator">thinking...</div>}
      </div>
  
      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={loading === true}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={loading === true || !inputMessage.trim()}
          className="chat-button"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
  
};


export default Chat;
