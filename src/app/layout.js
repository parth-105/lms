import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SkillStream - Empowering Learning Everywhere',
  description: 'SkillStream is a comprehensive Learning Management System designed to revolutionize the way education is delivered. Our platform offers a seamless and interactive learning experience, empowering educators and students to achieve their full potential.',
  keywords: 'LMS, Learning Management System, Online Learning, Education, Courses, E-learning, Virtual Classroom, Student Portal, Teacher Resources',
  author: 'Bluesky team',
  openGraph: {
    title: 'SkillStream - Empowering Learning Everywhere',
    description: 'Join SkillStream, the ultimate Learning Management System, and transform your educational experience with our innovative tools and resources. Discover a new way of learning today!',
    url: '',
    images: [
      {
        url: '',
        width: 800,
        height: 600,
        alt: 'SkillStream Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillStream - Empowering Learning Everywhere',
    description: 'Experience the future of education with SkillStream. Our LMS offers cutting-edge features to enhance learning and teaching. Start your journey with us today!',
    image: '',
  },
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
       
        <Toaster />
        </body>
    </html>
  )
}