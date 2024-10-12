"use client"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
//import Social from '../Social/Social'

const Footer = () => {
  const menuItems = ['Services', 'About', 'Courses', 'Contact Us']
  const router = useRouter()
  
  const page = (item) => {
    if (item === 'Contact Us') router.push('https://bluesky-gamma.vercel.app');
    else if (item === 'About') router.push('https://bluesky-gamma.vercel.app');
  }



  return (
    <div className="w-full bottom-0 flex items-center justify-center bg-gray-200 text-cornflowerBlue">
      <div className="w-full px-4 text-blue-600 flex flex-col">
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 md:flex-row md:justify-between flex-col">
            <div className="px-8 md:px-2 text-base lg:px-8">
              <Link href="/">
                <div className="text-4xl text-cornflowerBlue" style={{ fontFamily: 'Pacifico' }}>
                  Bluesky
                </div>
              </Link>
              <p className="text-cornflowerBlue">
                An Excellence center for education
              </p>
              <p className="text-cornflowerBlue">
                Founder -     PARTH KALATHIYA / PARTH KORAT
              </p>
            </div>
            <div className="flex flex-col md:pr-8 px-8">
              <div className="flex flex-row space-x-8 items-center justify-between">
                {menuItems.map((item, index) => (
                  <div
                    className="hidden md:block cursor-pointer text-cornflowerBlue hover:opacity-80"
                    key={index}
                  >
                    {item === 'Contact Us' || item === 'About' ? (
                      <button onClick={() => page(item)}>{item} </button>
                    ) : (
                      <a href={`/#${item}`}>{item} </a>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-row space-x-8 items-center justify-between mt-4">
                {/* <Social {...socialUrls} /> */}
              </div>
            </div>
          </div>
          <hr className="border-cornflowerBlue leading-loose text-cornflowerBlue" />
          <p className="w-full text-center my-6 text-cornflowerBlue">
            Copyright © 2024 Bluesky. All rights reserved, to BlueSky.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
