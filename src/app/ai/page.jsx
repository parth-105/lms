'use client'
import { useState, useRef, useEffect } from 'react';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Constants
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const chatBoxRef = useRef(null);

    // Scroll to the bottom of the chat whenever messages are updated
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

        async function runChat(prompt) {
            setLoading(true); // Set loading to true while generating the response

            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });

            const generationConfig = {
                temperature: 0.9,
                topK: 1,
                topP: 1,
                maxOutputTokens: 2048,
            };

            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];

            // Prepare chat history to include previous messages
            const chatHistory = messages.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }));

            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: chatHistory,
            });

            try {
                const result = await chat.sendMessage(prompt);
                const response = result.response;
                setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: response.text() }]);
            } catch (error) {
                setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
            } finally {
                setLoading(false); // Set loading to false after the response is received
            }
        }

    const handleSendMessage = async () => {
        if (prompt.trim() === '') return;

        const userMessage = { sender: 'user', text: prompt };
        setMessages([...messages, userMessage]);
        setPrompt('');

        runChat(prompt);
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #007bff;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                }
                `}
            </style>
            <h1 style={styles.title}>AI Chat App</h1>
            <div ref={chatBoxRef} style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ ...styles.message, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                        <p><strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}</p>
                    </div>
                ))}
                {loading && (~
                    <div style={styles.loadingContainer}>
                        <div className="spinner"></div>
                        <p style={styles.loadingText}>Generating response...</p>
                    </div>
                )}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? handleSendMessage() : null}
                    style={styles.input}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} style={styles.button}>Send</button>
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f7f8fa',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '30px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '2rem',
    },
    chatBox: {
        border: '1px solid #ccc',
        padding: '20px',
        marginBottom: '20px',
        height: '500px',
        overflowY: 'scroll',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.05)',
        position: 'relative', // Ensure loading indicator is positioned correctly
    },
    message: {
        margin: '10px 0',
        padding: '15px',
        backgroundColor: '#e1e1e1',
        borderRadius: '10px',
        maxWidth: '100%',
        alignSelf: 'flex-end',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: '15px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        marginRight: '15px',
        fontSize: '18px',
    },
    button: {
        padding: '15px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    loadingContainer: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        width: '0%',
    },
    loadingText: {
        marginTop: '10px',
        color: '#333',
        fontSize: '16px',
    },
};
