"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import useLocalStorage from "@/helpers/useLocalStorage.js";

import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const MyComponent = () => {

    const { toast } = useToast()
    const router = useRouter();
    const [data, setData] = useLocalStorage('e-learning-user', '');
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        isInstructor: false,

    })

    const [showPassword, setShowPassword] = useState(false)


    const [isChecked, setIsChecked] = useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChangeradio = (event) => {
       
        setSelectedValue(event.target.value === 'true');
        setUser({ ...user, isInstructor: event.target.value })
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleOnChange = (e) => {
        setIsChecked(!isChecked);
       
        setUser({ ...user, isInstructor: e.target.checked })
    };


    const handleSwitchChange = () => {
        setUser({
            ...user,
            isInstructor: !user.isInstructor,
        });
    };

    const onLogin = async () => {
        if (!user.email || !user.password) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
            });
            return;
        }
        try {
            setLoading(true);
          
            const response = await axios.post("/api/login", user);
          
        

            if (response.data.pending) {
                router.push("/pendingpage");
              
            }
            else {
                if (response.data.Login.isInstructor) {
                    localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
                    router.push("/instructor");
                    toast({
                        title: "Instructor Login Successfull!",
                        description: "Keep Teaching !",
                    })
                }
                else {
                    router.push("/student");
                    localStorage.setItem('e-learning-user', JSON.stringify(response.data.Login));
                    toast({
                        title: "Student Login Successfull!",
                        description: "Enjoy Your Learning !",
                    })
                }
                setLoading(false);
            }
        } catch (error) {

           
            toast({
                title: `${error.message}`,
                description: "Something Went Wrong!!!!",
            })

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <section className="min-h-screen flex items-stretch text-white">
            <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10">
                    <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                    <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
                </div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: '#161616' }}>
                <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <div className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input
                                type="email"
                                name="email"
                                id="email"

                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                placeholder="name@company.com"
                                required />
                        </div>


                        {/* <Label htmlFor="password">Password</Label> */}
                        <div className="relative pb-2 pt-4">
                            <Input
                                id="password"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                className="  absolute right-0 top-4 h-full px-3 py-2 hover:bg-transparent"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                                ) : (
                                    <EyeIcon className="h-4 w-4 text-gray-500" />
                                )}
                            </Button>
                        </div>


                        {/* <div className="pb-2 pt-4">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-black rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                required />
                        </div> */}
                        
                        {/* <div className="pb-2 pt-4">
                            <div className="flex items-start">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            checked={isChecked}
                                            onChange={handleOnChange}
                                            aria-describedby="remember"

                                            type="checkbox"
                                            className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="text-sm ml-3">
                                        <label htmlFor="remember" className="font-medium text-white dark:text-gray-300">login as instructor</label>
                                    </div>
                                </div>
                            </div>
                        </div> */}


                        <div className="flex items-center justify-center space-x-4">
                            <span className={`text-sm font-medium ${user.isInstructor ? 'text-purple-600' : 'text-gray-500'}`}>
                                Instructor
                            </span>
                            <div
                                className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${user.isInstructor ? 'bg-purple-600' : 'bg-green-500'
                                    }`}
                                onClick={handleSwitchChange}
                            >
                                <div
                                    className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${user.isInstructor ? 'translate-x-7' : 'translate-x-0'
                                        }`}
                                />
                            </div>
                            <span className={`text-sm font-medium ${user.isInstructor ? 'text-gray-500' : 'text-green-600'}`}>
                                Student
                            </span>
                        </div>

                        {/* <div className="space-y-2  gap-4 ">
                            <Label className="text-gray-300">Role</Label>
                            <RadioGroup className="flex flex-col items-center space-x-2 " defaultValue="false">
                                <div className="flex gap-6 mt-2">
                                <Label>
                                    <Input
                                        type="radio"
                                        value="true"
                                        checked={selectedValue === true}
                                        onChange={handleChangeradio}
                                    />
                                    instructor
                                </Label>
                                <Label>
                                    <Input
                                        type="radio"
                                        value="false"
                                        checked={selectedValue === false}
                                        onChange={handleChangeradio}
                                    />
                                    student
                                </Label>
                                </div>
                                <p>Login as : {selectedValue ? 'instructor' : 'student'}</p>
                            </RadioGroup>
                        </div> */}

                        <div className="px-4 pb-2 pt-4">
                            <Button
                                type="submit"
                                onClick={onLogin}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {loading ? (<Button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled>
                                    <Loader2 className=" text-white mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>) : "Login"}
                            </Button>
                        </div>

                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?
                            <Link href="/signup"
                                className="text-blue-700 hover:underline dark:text-blue-500"> signup</Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyComponent;
