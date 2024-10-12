"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import useLocalStorage from '@/helpers/useLocalStorage.js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"




import axios from "axios"
import { uploadpdfFileAndGetUrl } from "@/helpers/FirebasepdfUpload"

export default function InstructorAssignmentForm() {

  const { toast } = useToast()
  const router = useRouter();
  const [data, setData] = useLocalStorage('e-learning-user', '');
  const [courses, setCourses] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setloading] = useState(false)
  const [featcloading,setfeatchloding] = useState(false)
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    questionFile: ""
  })

  const handleChange = (event) => {
   
    setSelectedValue(event);
  };

  useEffect(() => {
    setfeatchloding(true)
    const fetchCourses = async () => {
      try {
        const res = await axios.post('/api/course/get-course-by-id', { id: data._id });
       

     
        setCourses(res.data.courses);
        setfeatchloding(false)
      } catch (error) {

        toast({
          variant: "destructive",
          title: "Internal server problem",
          description: "Please wait we will try to solve these problem.",
        });
       
        setfeatchloding(false)
      }
      finally{
        setfeatchloding(false)
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    try {
      setloading(true)
      e.preventDefault()
      if (assignment.questionFile) {
        setloading(true);
        const questionurl = await uploadpdfFileAndGetUrl(assignment.questionFile);

      

       

        const res = await axios.post('/api/assignment/uploadassignment', { title: assignment.title, description: assignment.description, questionfile: questionurl, couses: selectedValue, instructor: data._id });

       

        if (res.data.success) {
          // setAnswerFile(null);
          setloading(false);
          router.push("/instructor");
        }
      } else {
       
       // alert("Please upload an answer file before submitting.");
        setAnswerFile(null);
      }
    }
    catch (error) {
      toast({
        variant: "destructive",
        title: `please fill all field`,
        description: "Please fill in all required fields.",
      });
      setloading(false)
    }
    finally {
      setloading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Assignment</CardTitle>
        <CardDescription>Upload a new assignment for your students.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Course">Assignment Subject/course</Label>
              <Select onValueChange={handleChange} >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Courese title" />
                </SelectTrigger>
                <SelectContent>

                  {courses.map((option) => (
                    <SelectItem key={option.value} value={option._id}>
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
             
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Assignment Title</Label>
              <Input
                id="title"
                placeholder="Enter assignment title"
                value={assignment.title}
                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter assignment description"
                value={assignment.description}
                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="questionFile">Upload Question PDF</Label>
              <Input
                id="questionFile"
                type="file"
                accept=".pdf"
                onChange={(e) => setAssignment({ ...assignment, questionFile: e.target.files?.[0] || null })}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {/* <Button type="submit" onClick={handleSubmit}>{ loading ? "loding" : "Create Assignment"}</Button> */}

        <Button
          type="submit"
          onClick={handleSubmit}>
          {loading ? (<Button className="w-full" disabled>
            <Loader2 className=" text-white mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>) : "Create Assignment"}
        </Button>

      </CardFooter>
    </Card>
  )
}