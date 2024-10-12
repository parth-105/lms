import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'
import Link from "next/link";



export default function VideoCard({ video }) {
  return (
    <Link href={`/videoplay/${video._id}`} >
    <Card className=" w-72 h-72 cursor-pointer overflow-hidden">
      <div className="relative">
        <img src={video?.thambnail}alt={video.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Button variant="secondary" size="icon">
            <Play className="h-6 w-6" />
          </Button>
        </div>
        {/* <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">
          {video.duration}
        </div> */}
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg"> {video.title}</CardTitle>
        <div className="flex items-center mt-2">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={video?.instructor?.photoURL} alt={video?.instructor?.name} />
            <AvatarFallback>{video?.instructor?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardDescription>{video?.instructor?.name}</CardDescription>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}