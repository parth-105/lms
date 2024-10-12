"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Briefcase, BookOpen, Building2, Clock } from "lucide-react"

export default function InstructorProfileViewEdit() {
  const [instructor, setInstructor] = useState({
    name: "Dr. Jane Smith",
    role: "Senior Instructor",
    email: "jane.smith@university.edu",
    department: "Computer Science",
    bio: "Dr. Jane Smith is a renowned expert in Artificial Intelligence and Machine Learning. With over 15 years of experience in both academia and industry, she brings a wealth of knowledge to her classes. Dr. Smith has published numerous papers in top-tier conferences and journals, and has been recognized with several teaching awards.",
    courses: ["Introduction to AI", "Advanced Machine Learning", "Neural Networks"],
    officeHours: "Monday and Wednesday, 2:00 PM - 4:00 PM",
    imageUrl: "/placeholder.svg?height=256&width=256"
  })

  const [editedInstructor, setEditedInstructor] = useState({ ...instructor })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedInstructor(prev => ({ ...prev, [name]: value }))
  }

  const handleCoursesChange = (e) => {
    setEditedInstructor(prev => ({ ...prev, courses: e.target.value.split(',').map(course => course.trim()) }))
  }

  const handleSave = () => {
    setInstructor(editedInstructor)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Instructor Profile</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editedInstructor.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={editedInstructor.role}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editedInstructor.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Input
                  id="department"
                  name="department"
                  value={editedInstructor.department}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={editedInstructor.bio}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="courses" className="text-right">
                  Courses
                </Label>
                <Input
                  id="courses"
                  name="courses"
                  value={editedInstructor.courses.join(', ')}
                  onChange={handleCoursesChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="officeHours" className="text-right">
                  Office Hours
                </Label>
                <Input
                  id="officeHours"
                  name="officeHours"
                  value={editedInstructor.officeHours}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogTrigger asChild>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogTrigger>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-32 h-32">
            <AvatarImage src={instructor.imageUrl} alt={instructor.name} />
            <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">{instructor.name}</h2>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Briefcase className="w-4 h-4" />
              <span>{instructor.role}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${instructor.email}`} className="text-blue-600 hover:underline">{instructor.email}</a>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Building2 className="w-4 h-4" />
              <span>{instructor.department}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Biography</h3>
            <p className="text-muted-foreground">{instructor.bio}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Courses Taught</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.courses.map((course, index) => (
                <Badge key={index} variant="secondary">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Office Hours</h3>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{instructor.officeHours}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}