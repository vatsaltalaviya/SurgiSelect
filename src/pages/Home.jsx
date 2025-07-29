import React from 'react'
import HomeBanner from '../components/HomeBanner'
import HomeCrousel from '../components/HomeCrousel'
import HomeProductDisplay from '../components/HomeProductDisplay'
import { useSelector } from 'react-redux'

const Home = () => {
  
  return (
    <>
    <HomeBanner />
    <HomeCrousel />
    <HomeProductDisplay />
    </>
  )
}

export default Home
