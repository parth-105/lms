"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useLocalStorage from "@/helpers/useLocalStorage.js";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"





export default function Answercard({ awnserfile, assignmentId }) {
  const router = useRouter();
  const { toast } = useToast()

  const [loading, setloading] = useState(false)
  const [data, setData] = useLocalStorage('e-learning-user', '');
 


  const markAsCompleted = (assignmentId, studentId) => {
    setloading(true)
    axios.post('/api/assignment/statusupdateofassignment', { assignmentId, studentId, status: 'submitted' })
    toast({
      title: "Assignment was done",
      description: "Assignment was mark as done.",
  });
   
    router.push('/instructor/assignments/list-submited-assignment')
    setloading(false)
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Submitted Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {awnserfile.map((submission) => (
          <Card key={submission._id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={submission?.studentid?.avtar} alt={submission?.studentid?.name} />
                <AvatarFallback>{submission?.studentid?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle>{submission?.studentid?.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full  ">
                <a href={submission?.awnserfileurl} target="_blank" rel="noopener noreferrer">
                  Open Answer File
                </a>
              </Button>

              {submission.status !== 'submitted' && (
                <Button 
                  onClick={() => markAsCompleted(assignmentId, submission.studentid._id)}
                  className="w-full ml-2">
                  {loading ? (<Button className="w-full " disabled>
                    <Loader2 className=" text-white mr-2 h-4 w-4 animate-spin" />
                     wait
                  </Button>) : "Done"}
                </Button>

              )}

            </CardContent>
          </Card>
        ))
        }
      </div >
    </div >
  )
}