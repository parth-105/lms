"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Book, Calendar, Clock, FileVideo2, Layout, LayoutDashboard, ListTodo, LogOut, Menu, MessageSquarePlus, User, X } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useLocalStorage from '@/helpers/useLocalStorage.js'

export default function LMSNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [userData, setUserData] = useState(null);


    const logout = () => {
        deleteLocalStorageItem('e-learning-user'); // Replace 'yourKey' with the key of the item you want to delete
        deleteCookie('e-learninigtoken'); // Replace 'yourCookieName' with the name of the cookie you want to delete
        // Optionally, redirect to the login page or home page
       
      };


    useEffect(() => {
        // This code will only run on the client side
        const storedData = localStorage.getItem('e-learning-user');

        //  setld(storedData);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
            
        }

    }, []);


    const NavItems = () => (
        <>
            
            {userData?.isAdmin ?
                <Link href="/admin" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                    <Clock className="w-5 h-5" />
                    <span>Pending request</span>
                </Link>
                : null}

            <Link href="/suggestion/create-suggestion" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                <MessageSquarePlus className="w-5 h-5" />
                <span>Create Suggestion</span>
            </Link>

            <Link href="/suggestion/all-suggestion" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                <ListTodo className="w-5 h-5" />
                <span>Show All Suggestions</span>
            </Link>

            {userData?.isInstructor ?
                <Link href="/instructor/Create-video" className="flex items-center space-x-2 text-gray-700 hover:bg-gray-100 rounded-md p-2">
                    <FileVideo2 className="w-5 h-5" />
                    <span>Create Video</span>
                </Link>
                : null}

        </>
    )

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4 md:px-6">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline"  className="ml-40 md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="w-full">
                        <div className="flex justify-between items-center mb-4">
                            {/* <Link href="/" className="flex items-center space-x-2">
                <Book className="h-6 w-6" />
                <span className="font-bold">LMS App</span>
              </Link> */}
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                        </div>
                        <nav className="flex flex-col gap-4">
                            <NavItems />
                        </nav>
                    </SheetContent>
                </Sheet>
                {/* <Link href="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
          <Book className="h-6 w-6" />
          <span className="font-bold">LMS App</span>
        </Link> */}
                <div className="hidden md:flex md:items-center md:gap-5">
                    <NavItems />
                </div>
                <div className="ml-auto flex items-center gap-4">
                    {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full overflow-hidden transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                  className="rounded-full"
                  height={32}
                  width={32}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 animate-in slide-in-from-top-1 fade-in-20"
              align="end"
              forceMount
            >
              <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-secondary">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-secondary">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
                </div>
            </div>
        </nav>
    )
}