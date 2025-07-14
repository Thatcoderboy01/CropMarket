import React, { useEffect, useState, useRef } from 'react';
import { SendHorizonal } from 'lucide-react';
import { io } from 'socket.io-client';

const socket = io('https://cropmarket-hfds.onrender.com/'); // ✅ Backend URL

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // 🧠 Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🛠️ Socket listener setup
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, { ...data, from: 'other' }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // 📨 Send message
  const handleSend = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const messageData = {
      text: trimmed,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', messageData);
    setMessages((prev) => [...prev, { ...messageData, from: 'me' }]);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between bg-green-600 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">💬 Live Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-md break-words ${
                msg.from === 'me'
                  ? 'ml-auto bg-green-500 text-white'
                  : 'mr-auto bg-white border text-gray-700'
              }`}
              title={new Date(msg.timestamp).toLocaleTimeString()}
            >
              {msg.text}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm">No messages yet...</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center p-4 border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSend}
          className="ml-3 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          aria-label="Send"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;