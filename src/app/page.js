import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import Banner from '../component/Banner/Banner'
import Badges from '../component/Badges/Badges'
import Cards from '../component/Cards/Cards'
 import Courses from '../component/Courses/Courses'
//import Testimonials from '../component/Testimonials/Testimonials'
import Footer from '../component/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Badges />
      <Cards />
      <Courses />
      <Footer />
    </>
  )
}

export default Home
