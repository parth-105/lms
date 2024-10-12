"use client"
import useLocalStorage from '@/helpers/useLocalStorage.js';
import Link from 'next/link';
import React from 'react'
import { usePathname } from 'next/navigation';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
const SidebarWithLogo = () => {
    const pathname = usePathname();
    const [data, setData] = useLocalStorage('e-learning-user', '');



    return (
        <div>
            <Sidebar>
                <Menu>
                    <MenuItem className={`${pathname === '/course' ? 'bg-blue-500' : ''}`}><Link href='/course' > All-Coureses</Link></MenuItem>
                    {data.isInstructor ?
                        <MenuItem className={`${pathname === '/instructor/my-Coureses' ? 'bg-blue-500' : ''}`}> <Link href='/instructor/my-Coureses'> My-Coureses</Link></MenuItem>
                        : null
                    }

                    {!data.isInstructor ?
                        <MenuItem className={`${pathname === '/student/my-courses' ? 'bg-blue-500' : ''}`}> <Link href='/student/my-courses'> My-Coureses</Link></MenuItem>
                        : null
                    }

                    <SubMenu label="Quiz">
                        {data.isInstructor ?
                            <MenuItem className={`${pathname === '/instructor/exams/add' ? 'bg-blue-500' : ''}`}><Link href='/instructor/exams/add'> Add-Quiz</Link> </MenuItem>
                            : null
                        }
                        {data.isInstructor ?
                            <MenuItem className={`${pathname === '/instructor/exams' ? 'bg-blue-500' : ''}`}> <Link href='/instructor/exams'> All-Quiz</Link></MenuItem>
                            : null
                        }
                        {!data.isInstructor ?
                            <MenuItem className={`${pathname === '/student/reports' ? 'bg-blue-500' : ''}`}> <Link href='/student/reports'> Quiz-Report</Link></MenuItem>
                            : null
                        }

                        {data.isInstructor ?
                            <MenuItem className={`${pathname === '/instructor/reports' ? 'bg-blue-500' : ''}`}> <Link href='/instructor/reports'> All-Report</Link></MenuItem>
                            : null
                        }

                        {!data.isInstructor ?
                            <MenuItem className={`${pathname === '/student/all-exam' ? 'bg-blue-500' : ''}`}> <Link href='/student/all-exam'> All-Exam</Link></MenuItem>
                            : null
                        }

                    </SubMenu>
                    {data.isInstructor ?
                        <MenuItem className={`${pathname === '/instructor/addcourse' ? 'bg-blue-500' : ''}`}> <Link href='/instructor/addcourse'> Create-courses</Link></MenuItem>
                        : null
                    }
                    {data.isInstructor ?
                        <MenuItem className={`${pathname === '/instructor/Create-video' ? 'bg-blue-500' : ''}`}> <Link href='/instructor/Create-video'> Create-video</Link></MenuItem>
                        : null
                    }
                    <SubMenu label="Suggestion">

                        <MenuItem className={`${pathname === '/suggestion/create-suggestion' ? 'bg-blue-500' : ''}`}><Link href='/suggestion/create-suggestion'>Add-suggestion</Link> </MenuItem>

                    </SubMenu>
                    <MenuItem className={`${pathname === '/live-session' ? 'bg-blue-500' : ''}`}><Link href='/live-session'>Live-Session</Link> </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SidebarWithLogo
