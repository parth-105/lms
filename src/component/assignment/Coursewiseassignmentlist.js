"use client"
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, FileTextIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useLocalStorage from '@/helpers/useLocalStorage.js'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"



const Coursewiseassignmentlist = ({ Course }) => {
  const [data, setData] = useLocalStorage('e-learning-user', '');

  const loggedInStudentId = data._id; // Assuming this is the logged-in student's ID

  // const studentSubmission = Course.assignment?.awnserfile.find(ans => ans?.studentid === loggedInStudentId);
  // const isSubmitted = studentSubmission?.status === 'submitted';
  // const isPending = studentSubmission?.status === 'pending';
  // const hasNotSubmitted = !studentSubmission;

  return (
    <div className="container mx-auto p-4 cursor-pointer">
      <h1 className="text-2xl font-bold mb-6">{`${Course.title} Assignment`}</h1>
      <div className="grid  gap-6 md:grid-cols-2 lg:grid-cols-3">
        { Course?.assignment.length>0 ? (
        Course?.assignment.map((assignment) => (

          <Card key={assignment._id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{assignment?.title}</CardTitle>
              <CardDescription>{assignment?.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">

            </CardContent>
            {<CardFooter className="flex justify-between items-center">
              {/* <Badge
                className={assignment?.awnserfile.length === 0 ? 'bg-yellow-300 ' : 'bg-green-300'}
                variant={'secondary'}
              > */}

              {assignment?.awnserfile.length === 0 ? (
                <Badge className="bg-yellow-200 text-black ">
                  pending
                </Badge>
              ) : (
                assignment?.awnserfile.some(ans => ans?.studentid === data._id) ? (
                  assignment?.awnserfile.map((ans) => (
                    ans?.studentid === data._id && (
                      <Badge
                        key={ans.studentid}
                        className={ans?.status === 'submitted' ? 'bg-green-300 text-black' : 'bg-yellow-300 text-black '}
                      >

                        {ans?.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </Badge>
                    )
                  ))
                ) : (
                  <Badge className="bg-yellow-300 text-black ">
                    Pending
                  </Badge>
                )
              )}

              {/* </Badge> */}


              <div>
                {assignment?.awnserfile.length  === 0 &&  assignment?.awnserfile.studentid ===data._id  ? (
                 
                   
                    <Button variant="outline">
                    <Link href={`/student/assignments/submit-assignment/${assignment._id}`} passHref>
                      Submit Assignment
                      </Link>
                    </Button>
                  
                ) : (
                  assignment?.awnserfile.map((ans) => (
                    ans?.studentid === loggedInStudentId ? (
                      <div
                        key={ans.studentid}
                      >

                        {ans?.status === 'submitted' ? (
                          <Button variant="outline" disabled>
                            Assignment Submitted
                          </Button>
                        ) : (
                          <Button variant="outline">
                            <Link href={`/student/assignments/submit-assignment/${assignment._id}`} passHref>
                            Submit Assignment
                            </Link>
                          </Button>
                        )}
                      </div>
                    ) : null
                  ))
                )}

                {assignment?.awnserfile.every(ans => ans?.studentid !== loggedInStudentId) && (
                  <Button variant="outline">
                    <Link href={`/student/assignments/submit-assignment/${assignment._id}`} passHref>
                      Submit Assignment
                    </Link>
                  </Button>
                )}
              </div>
              {/* <Link href={`/student/assignments/submit-assignment/${assignment._id}`} passHref>
                <Button variant="outline">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                </Button>
              </Link> */}
            </CardFooter>}
          </Card>

        )) 
      ):
        <p>there are curruntly not any assignment</p>
      }
      </div>
    </div>
  )
}

export default Coursewiseassignmentlist
