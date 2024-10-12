"use client"
"use client"

import { useEffect, useState } from "react"
import { Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import axios from "axios"



export default function InstructorRequests() {
  const { toast } = useToast()
  const [requests, setRequests] = useState([
    { id: "1", email: "john.doe@example.com", date: "2023-06-01" },
    { id: "2", email: "jane.smith@example.com", date: "2023-06-02" },
    { id: "3", email: "bob.johnson@example.com", date: "2023-06-03" },
    { id: "4", email: "alice.williams@example.com", date: "2023-06-04" },
    { id: "5", email: "charlie.brown@example.com", date: "2023-06-05" },
  ])

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      const response = await axios.get('/api/pending-instructors');
    
      setInstructors(response.data.pendingInstructors);
    };
    fetchInstructors();
  }, []);

  const approveInstructor = async (id) => {
    await axios.post(`/api/approve-instructor/${id}`);
    setInstructors(instructors.filter(instructor => instructor._id !== id));
    alert("aproved")
  };

  const handleApprove = async(id) => {
    await axios.post(`/api/approve-instructor/${id}`);
    setInstructors(instructors.filter(instructor => instructor._id !== id));
    toast({
      title: "Request Approved",
      description: "The instructor registration request has been approved.",
    })
  }

  const handleDecline = (id) => {
    setInstructors(instructors.filter(instructor => instructor._id !== id));
    toast({
      title: "Request Declined",
      description: "The instructor registration request has been declined.",
      variant: "destructive",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Instructor Registration Requests</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              {/* <TableHead>Date</TableHead> */}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instructors?.map((instructor) => (
              <TableRow key={instructor._id}>
                <TableCell className="font-medium">{instructor.email}</TableCell>
                {/* <TableCell>{request.date}</TableCell> */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(instructor._id)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Check className="mr-1 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDecline(instructor._id)}
                    >
                      <X className="mr-1 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}