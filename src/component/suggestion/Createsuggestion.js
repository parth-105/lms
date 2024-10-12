// components/SuggestionForm.js
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import useLocalStorage from '@/helpers/useLocalStorage.js';
import { useToast } from "@/hooks/use-toast"

const Createsuggestion = () => {
    const { toast } = useToast()
    const [topic, setTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [loading, setloading] = useState(false)
    // const student = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const router = useRouter();

    const subjects = [

        "Javascript",
        "React",
        "Node",
        "MongoDB",
        "GK",
        "ML",
        "ebusiness",
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setloading(true)
            if (!topic || !subject) {
                toast({
                    title: "Validation Error",
                    description: "Please fill in all required fields.",
                });
                setloading(false)
                return;
            }
            const response = await axios.post("/api/suggestion/addsuggestion", {
                topic,
                subject,
                author: data.name,
                student: data._id,
                photoURL: data.photoURL

            });

            if (data.isInstructor) {
                router.push('/instructor')
            } else {
                router.push('/student');
            }
            setloading(false)
        } catch (error) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
            });
            setloading(false)
        }
        finally {
            setloading(false)
        }
    };



    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Suggestion Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
                        <textarea
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="mt-1 block w-full h-32 p-4 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
                        <select
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        >
                            <option value="">Select a subject</option>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                    >
                        {loading ? "loding" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Createsuggestion;