"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Load chat history from localStorage on mount (client-side only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const savedMessages = JSON.parse(localStorage.getItem("chat")) || [];
                setMessages(savedMessages);
            } catch (error) {
                console.error("Failed to load chat history:", error);
                localStorage.removeItem("chat"); // Reset corrupt storage
            }
        }
    }, []);

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Function to handle sending messages
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, userMessage];
            if (typeof window !== "undefined") {
                localStorage.setItem("chat", JSON.stringify(updatedMessages));
            }
            return updatedMessages;
        });

        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(`/api/chat`, { message: input });
            const botMessage = { role: "assistant", content: response.data.reply };

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, botMessage];
                if (typeof window !== "undefined") {
                    localStorage.setItem("chat", JSON.stringify(updatedMessages));
                }
                return updatedMessages;
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[550px] w-full">
            <div className="grid grid-flow-row grid-rows-5 h-[100%] w-[80%] mx-auto p-4 border-[1px] border-gray-200 rounded-lg shadow-lg mt-[130px]">
                <div className="overflow-y-auto p-2 row-span-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`p-2 my-1 w-full rounded-md ${msg.role === "user" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-black text-left"}`}>
                            {msg.content}
                        </div>
                    ))}
                    {/* Invisible div to track scrolling */}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="flex items-center mt-2 row-span-1">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1 p-2 rounded-lg border-[0.5px] border-gray-300 focus:outline-none"
                        placeholder="Ask anything..."
                    />
                    <button onClick={sendMessage} className="ml-2 p-2 px-[20px] bg-black text-white rounded-lg font-semibold cursor-pointer">
                        {loading ? "..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}
