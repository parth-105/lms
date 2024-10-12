"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Award, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation';



export default function ExamCard({exam})

{

    const router = useRouter();

    return (
        <Card className="w-72 h-72 max-w-md mx-auto text-wrap ">
            <CardHeader>
                <CardTitle className=" text-wrap text-2xl font-bold">{exam?.name}</CardTitle>
                <Badge variant="secondary" className="text-sm font-medium">
                    {exam?.category}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Award className="w-5 h-5 mr-2 text-primary" />
                        <span className="text-sm font-medium">Total Marks:</span>
                    </div>
                    <span className="font-semibold">{exam?.totalMarks}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                        <span className="text-sm font-medium">Passing Marks:</span>
                    </div>
                    <span className="font-semibold">{exam?.passingMarks}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">Duration:</span>
                    </div>
                    <span className="font-semibold">{exam.duration} Seconds</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full transition-transform hover:scale-105" onClick={() => router.push(`/student/write-exam/${exam._id}`)}>
                    Start Exam
                </Button>
            </CardFooter>
        </Card>
    )
}