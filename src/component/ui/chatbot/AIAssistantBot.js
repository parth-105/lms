'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, Loader2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

// Constants
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;



export default function AIAssistantBot() {
    const [isOpen, setIsOpen] = useState(false)


    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const chatBoxRef = useRef(null);

 

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

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (prompt.trim() === '') return;

        const userMessage = { sender: 'user', text: prompt };
        setMessages([...messages, userMessage]);
        setPrompt('');
       


        runChat(prompt);
    }


    return (
        <>

            <div className="fixed bottom-4 right-4 z-40">
                <div className="fixed h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-full flex  bottom-8 right-12 z-50 ">

                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center h-full w-full rounded-full">

                        <div onClick={() => setIsOpen(true)} >
                            <Bot className="h-6 w-6 text-white" />
                            <span className="sr-only">Open AI Assistant</span>
                        </div>
                    </div>
                </div >
            </div>

            {
                isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Card className="w-full max-w-md h-[80vh] flex flex-col shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium">AI Assistant</CardTitle>
                                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                                    <X className="h-4  w-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex-grow overflow-hidden">
                                <ScrollArea className="h-full w-full pr-4">
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block p-2 rounded-lg ${message.sender
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-secondary text-secondary-foreground'
                                                    }`}
                                            >
                                                {message.text}
                                            </span>
                                        </div>
                                    ))}
                                    {loading && (
                                        <div className="flex justify-center items-center mt-4">
                                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                            <span className="ml-2 text-sm text-muted-foreground">AI is thinking...</span>
                                        </div>
                                    )}
                                </ScrollArea>
                            </CardContent>
                            <CardFooter>
                                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                                    <Input
                                        placeholder="Type your message..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="flex-grow"
                                    />
                                    <Button type="submit" variant='outline'>
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send message</span>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </div>

                )}
        </>
    )
}