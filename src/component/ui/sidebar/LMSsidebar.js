// @/components/Layout/index.js
"use client"

import React, { useEffect, useState } from 'react'

import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, FileVideo2, Book, LogOut, Clock } from 'lucide-react'
import { BookOpen, Home, LayoutDashboard, User, FileQuestion, BarChart, Video, ClipboardList, Send, PlusCircle, FolderPlus, MessageSquarePlus, VideoPlus, ListTodo } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import useLocalStorage from '@/helpers/useLocalStorage.js';
import LMSNavbar from '../navbar/LMSNavbar'
import axios from 'axios'


export default function LMSsidebar({ children }) {
    // Concatenate page title (if exists) to site title


    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)


    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);


    const deleteLocalStorageItem = (key) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    };


    const logout = () => {
        const res = axios.delete('/api/logout')
        localStorage.removeItem('e-learning-user');
        window.location.reload();

    };

    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');

      
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
          
        }

    }, []);

    useEffect(() => {
        // This will run whenever userData changes
        if (userData) {
    
        }
    }, [userData]);

    return (
        <>
            <div className="flex h-screen  bg-white">
                {/* Sidebar */}
                <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-30`}>
                    <ScrollArea className="flex-grow">
                        <div className="p-4 flex items-center justify-between">
                            <Book className="h-6 w-6" />
                            <h2 className="text-2xl font-bold text-primary">LMS App</h2>
                            <GoSidebarExpand variant="ghost" s onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg> */}
                                close
                            </GoSidebarExpand>
                        </div>
                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <Home className="w-5 h-5" />
                                        <span>Home</span>
                                    </Link>
                                </li> : null}

                                {!userData?.isInstructor ? <li>
                                    <Link href="/student" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <Home className="w-5 h-5" />
                                        <span>Home</span>
                                    </Link>
                                </li> : null}


                                {userData?.isAdmin ?
                                    <Link href="/admin" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <Clock className="w-5 h-5" />
                                        <span>Pending request</span>
                                    </Link>
                                    : null}

                                <li>
                                    <Link href="/course" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>All-Course</span>
                                    </Link>
                                </li>


                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/my-Coureses" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <BookOpen className="w-5 h-5" />
                                        <span>My-Courses</span>
                                    </Link>
                                </li> : null}

                                {!userData?.isInstructor ? <li>
                                    <Link href="/student/my-courses" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <BookOpen className="w-5 h-5" />
                                        <span>My-Courses</span>
                                    </Link>
                                </li> : null}


                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/exams/add" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <PlusCircle className="w-5 h-5" />
                                        <span>Add Quiz</span>
                                    </Link>
                                </li> : null}

                                {!userData?.isInstructor ? <li>
                                    <Link href="/student/all-exam" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>All-Exam</span>
                                    </Link>
                                </li> : null}

                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/exams" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <FileQuestion className="w-5 h-5" />
                                        <span>All-Quiz</span>
                                    </Link>
                                </li> : null}

                                {!userData?.isInstructor ? <li>
                                    <Link href="/student/reports" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <BarChart className="w-5 h-5" />
                                        <span>Quiz Report</span>
                                    </Link>
                                </li> : null}


                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/reports" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <LayoutDashboard className="w-5 h-5" />
                                        <span>All-Reports</span>
                                    </Link>
                                </li> : null}




                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/addcourse" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <FolderPlus className="w-5 h-5" />
                                        <span>Create Course</span>
                                    </Link>
                                </li> : null}


                                {/* {userData?.isInstructor ? <li>
                                    <Link href="/instructor/Create-video" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <FileVideo2 className="w-5 h-5" />
                                        <span>Create Video</span>
                                    </Link>
                                </li> : null} */}

                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/assignments/create-assignment" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <ClipboardList className="w-5 h-5" />
                                        <span>Create-Assignment</span>
                                    </Link>
                                </li> : null}


                                {userData?.isInstructor ? <li>
                                    <Link href="/instructor/assignments/list-submited-assignment" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <ClipboardList className="w-5 h-5" />
                                        <span></span>List assignments
                                    </Link>
                                </li> : null}


                                {!userData?.isInstructor ? <li>
                                    <Link href="/student/assignments/AssignmentList" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <Send className="w-5 h-5" />
                                        <span>Submit Assignment</span>
                                    </Link>
                                </li> : null}



                                {/* <li>
                                    <Link href="/suggestion/create-suggestion" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <MessageSquarePlus className="w-5 h-5" />
                                        <span>Create Suggestion</span>
                                    </Link>
                                </li>
                                <li>


                                    <Link href="/suggestion/all-suggestion" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <ListTodo className="w-5 h-5" />
                                        <span>Show All Suggestions</span>
                                    </Link>
                                </li> */}

                                <li>
                                    <Link href="/live-session" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <Video className="w-5 h-5" />
                                        <span>Live Session</span>
                                    </Link>
                                </li>


                                {/* <li>
                                    <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                                        <User className="w-5 h-5" />
                                        <span>Profile</span>
                                    </Link>
                                </li> */}

                            </ul>
                        </nav>
                    </ScrollArea>
                </aside>

                {/* Main Content */}
                <div className=" w-full rounded-lg flex-1 flex flex-col overflow-hidden">
                    {/* Navbar */}
                    <header className="bg-white shadow-sm z-20 sticky top-0">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                            <GoSidebarCollapse variant="ghost" onClick={() => setIsSidebarOpen(true)} className=" md:hidden">
                                open
                            </GoSidebarCollapse >
                            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                                <LMSNavbar />
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-8 w-8 rounded-full overflow-hidden transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                        >
                                            <Avatar>
                                                <AvatarImage src={userData?.photoURL} alt="profilepic" />
                                                <AvatarFallback>{userData?.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56 animate-in slide-in-from-top-1 fade-in-20"
                                        align="end"
                                        forceMount
                                    >
                                        <DropdownMenuItem className="cursor-pointer transition-colors  hover:bg-gray-100">
                                            <Link className='flex justify-between' href="/profile" >
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer transition-colors  hover:bg-gray-100">
                                            <Button onClick={logout} >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </Button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-1 rounded-3xl bg-gray-100">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}