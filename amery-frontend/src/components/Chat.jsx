import { useState, useEffect, useRef } from "react";
import messagesAPI from "../api/messages";
import "./Chat.css";

const Chat = ({ token, onNewTasks }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

        const taskList = response.data.createdTasks
          .map((task) => `• ${task.message}`)
          .join("\n");

        setMessages((prev) => [
          ...prev,
          {
            id: `system-${Date.now()}`,
            content: `✓ Added ${response.data.createdTasks.length} new tasks to your list: \n${taskList}`,
            is_from_user: false,
            message_type: "system",
          },
        ]);
      }

      //clear input field
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content:
            "Sorry, the message could not be processsed. Please try again",
          is_from_user: false,
          message_type: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getMessagesClass = (msg) => {
    if (msg.is_from_user) return "user-message";
    if (msg.message_type === "system") return "system-message";
    if (msg.message_type === "error") return "error-message";
    return "ai-message";
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${getMessagesClass(msg)}`}>
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
