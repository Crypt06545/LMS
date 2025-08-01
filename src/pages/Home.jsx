import Hero from '@/components/Hero'
import React from 'react'
import BestLearn from './BestLearn'


const Home = () => {
  return (
    <div className='container px-6 md:px-10 mx-auto min-h-screen'>
      <Hero/>
      <BestLearn/>
    </div>
  )
}

export default Home
