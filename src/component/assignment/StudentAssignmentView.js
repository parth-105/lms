"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { uploadpdfFileAndGetUrl } from '@/helpers/FirebasepdfUpload'
import useLocalStorage from "@/helpers/useLocalStorage.js"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"



export default function StudentAssignmentView({ assignmentid }) {
  const { toast } = useToast()
  const router = useRouter();
  const [answerFile, setAnswerFile] = useState(null)
  const [assignment, setassignment] = useState({})
  const [loading, setloading] = useState(false)
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [answer, setAnswer] = useState({
    studentid: data._id,
    awnserfileurl: ""
  });



  useEffect(() => {
    const fetchCourses = async () => {
      setloading(true)
      try {
        const res = await axios.post('/api/assignment/assignment-by-id', { id: assignmentid });

      
        setassignment(res.data.assignment);
        setloading(false);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setloading(false)
      }finally{
        setloading(false)
      }
    };

    fetchCourses();
  }, []);



  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      if (answerFile) {
        setloading(true);
        const awnserurl = await uploadpdfFileAndGetUrl(answerFile);

        if (!awnserurl) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill in all required fields.",
          });
          return;
        }

   

        const res = await axios.post('/api/assignment/uploadassignmentawnser', { id: assignmentid, answer: { ...answer, awnserfileurl: awnserurl }, student: data._id });


        if (res.data.success) {
          setAnswerFile(null);
          setloading(false);
          router.push("/student/assignments/AssignmentList")
        }
      } else {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please fill in all required fields.",
        });
        setAnswerFile(null);
      }
    }
    catch (error) {
      toast({
        variant: "destructive",
        title: "Internal server problem",
        description: "Please wait for we will solve this problem.",
      });
      setloading(false);
    }finally{
      setloading(false);
    }
  };

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput && !answerFile) {
      fileInput.value = '';
    }
  }, [answerFile]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{assignment?.title}</CardTitle>
        <CardDescription>{assignment?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Question File</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Question PDF</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Assignment Question</DialogTitle>
                  <DialogDescription>Review the assignment question carefully before submitting your answer.</DialogDescription>
                </DialogHeader>
                <iframe
                  src={`${assignment?.questionfile}#toolbar=0`}
                  className="w-full h-full"
                  title="Assignment Question PDF"
                />
              </DialogContent>
            </Dialog>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="answerFile">Upload Answer File</Label>
              <Input
                id="answerFile"
                type="file"
                onChange={(e) => setAnswerFile(e.target.files?.[0])}
                required
              />
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        {/* <Button type="submit" onClick={handleSubmit}>{loading ? "loding" : 'Submit Assignment'}</Button> */}

        <Button
          type="submit"
          onClick={handleSubmit}>
          {loading ? (<Button disabled>
            <Loader2 className=" text-white mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>) : 'Submit Assignment'}
        </Button>

      </CardFooter>
    </Card>
  )
}