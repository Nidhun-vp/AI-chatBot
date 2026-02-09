import { useState } from "react";
import { sendMessage } from "../services/ChatApi";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);

      const botMsg = {
        text: res.data.botReply,
        sender: "bot"
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { text: "Error talking to AI 😢", sender: "bot" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Chatbot 🤖</div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}
        {loading && <div className="typing">Bot is typing...</div>}
      </div>

      <div className="chat-footer">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
