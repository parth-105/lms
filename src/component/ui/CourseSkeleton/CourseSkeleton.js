"use client"
import { Card, CardContent, CardTitle, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"



export default function CourseSkeleton() {

    

    return (
        <div className="flex flex-row w-full gap-4" >
       
        <Card className="overflow-hidden w-72 h-96 ">
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full bg-gray-300" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
          <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full bg-gray-300" />
        </CardFooter>
      </Card>

      <Card className="overflow-hidden  w-72 h-96">
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full bg-gray-300" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
          <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full bg-gray-300" />
        </CardFooter>
      </Card>


      <Card className="overflow-hidden  w-72 h-96">
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full bg-gray-300" />
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
          <Skeleton className="h-4 w-1/2 mb-2 bg-gray-200" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full bg-gray-300" />
        </CardFooter>
      </Card>
        
        </div>
    )
  }