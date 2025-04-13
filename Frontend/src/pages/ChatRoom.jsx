import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with your backend URL if needed

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto border rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat Room</h2>
      <div className="flex-1 overflow-y-auto p-2 border rounded bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 my-1 bg-blue-200 rounded w-fit max-w-xs">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
