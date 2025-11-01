import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { GoDotFill } from 'react-icons/go';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineSend } from 'react-icons/ai';
import { chatSession } from "../utils/gemini";
import toast from 'react-hot-toast';
const ChatBot = () => {
  const [menu, setMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const popUP = () => {
    setMenu(!menu);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const closePopup = () => {
    setMenu(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSubmit();
      setInputText('');
    }
  };

  const handleMessageSubmit = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      text: inputText,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      setLoading(true);

      // Prepare the user input prompt
      const userInput = `User question: ${inputText}. Provide a detailed answer about plants and farming in very short (1-2 lines).`;

      // Initialize chat session and send message
      const result = await chatSession.sendMessage(userInput);

      console.log(result); // Log the result for debugging

      // Process the result and extract the text response
      const botResponse = {
        text: result.response.text(), // Adjust according to the library's response format
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);

    } catch (error) {
      console.error('Error:', error);
      toast.error("Error communicating with AI.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div>
      <img
        className="fixed w-16 h-16 bottom-10 right-10 p-1 bg-white text-white rounded-full cursor-pointer z-50"
        onClick={popUP}
        src="/assets/ai_plant/g.avif"
        alt="ChatBot Icon"
        title="Talk to ChatBot"
      />
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 20 }}
            onMouseLeave={() => setMenu(false)}
            className="fixed flex justify-between items-center w-80 h-[26rem] bg-gray-100 flex-col right-20 bottom-32 rounded-lg overflow-hidden z-40"
          >
            <div className="flex w-full justify-between items-center bg-black h-18 text-white p-4 shadow-2xl">
              <div className="flex gap-2">
                <img className="w-12 h-12 rounded-full" src="/assets/ai_plant/pila.avif" alt="Bot Avatar" />
                <div className="flex flex-col justify-center items-center">
                  <span>Chat Bot</span>
                  <div className="flex items-center text-[#43EE7D]">
                    <span>
                      <GoDotFill />
                    </span>
                    <span> Online</span>
                  </div>
                </div>
              </div>
              <span className="text-2xl cursor-pointer" onClick={closePopup}>
                <RxCrossCircled />
              </span>
            </div>
            <div className="flex flex-col p-2 overflow-y-auto flex-end justify-end pt-4 h-full overflow-hidden">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1 text-sm my-2 p-2 rounded-lg ${
                    message.sender === 'user' ? 'bg-green-300 shadow self-end' : 'bg-white shadow'
                  }`}
                >
                  <span>{message.text}</span>
                  {message.sender === 'user' ? (
                    <div className="bg-green-400 w-8 h-8 p-2 border rounded-full">
                      <img src="http://clipart-library.com/images/6Tp66Bp7c.png" alt="User Avatar" />
                    </div>
                  ) : (
                    <img className="w-8 h-8 border rounded-full" src="/assets/ai_plant/cute.avif" alt="Bot Avatar" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="w-full mx-10 px-6 py-4 rounded-lg flex gap-2 items-center bg-transparent">
              <input
                className="outline-none border bg-transparent rounded-lg w-full text-black p-2"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Type your question here"
                value={inputText}
              />
              <span className="text-3xl cursor-pointer text-green-600" onClick={handleMessageSubmit}>
                <AiOutlineSend />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;