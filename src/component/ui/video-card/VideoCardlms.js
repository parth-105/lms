import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play } from "lucide-react"
import Link from "next/link"


import { useRouter } from 'next/navigation';

export default function VideoCardlms({ video }) {

  const router = useRouter();

  const handleClick = (videoid) => {
    router.push(`/videoplay/${videoid}`); 
  };


  return (
    <Card onClick={() => handleClick(video._id)} className="w-72 h-72 overflow-hidden">
        {/* <Link href={`/videoplay/${video._id}`} > */}
      <div className="relative w-full h-48 aspect-video group cursor-pointer" >
        <img
          src={video?.thambnail} 
          alt= {video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute h-full inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-80">
          <Play className="w-16 h-16 text-white" />
        </div>
        {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div> */}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2"> {video.title}</h3>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={video?.instructor?.photoURL} alt={video?.instructor?.name} />
            <AvatarFallback>{video?.instructor?.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">{video?.instructor?.name}</p>
        </div>
      </CardContent>
      {/* </Link> */}
    </Card>
  )
}