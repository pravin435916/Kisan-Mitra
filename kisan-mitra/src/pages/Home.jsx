import React from 'react'
import '../css/globals.css'
import { Navbar } from './Navbar'
import { About } from './About'
import { Feedback } from './Feedback'
import { Carousell } from './Carousell'
import { Footer } from '../component/Footer'
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";
import Info from './Info'
import Loader from '../component/loader/Loader'
import { Link } from 'react-router-dom'
import { FaLeaf, FaCloudSun, FaSeedling } from 'react-icons/fa';
export const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='h-screen w-full flex justify-center items-center'><Loader /></div>
  }
  return (
    <>
      <Navbar />
      <div className='relative w-full h-screen  gap-12 z-20 '>
        <img className='w-[70%] absolute bottom-0 left-0 h-full z-10' src="/assets/home/kisan.svg" alt="" />
        <div className='absolute z-10 top-80 right-96 text-white flex flex-col font-bold'>
          {isAuthenticated && (
            <div>
              <h2>Hello , {user.name}</h2>
            </div>
          )}
          <span className='text-7xl'>Keep Your</span>
          <span className='text-7xl'>Plant alive</span>
          <span className='text-xl text-center'>Protect Your crop , Early Detection , Better Yeild</span>
        </div>
        <img className='absolute top-0 z-0 w-full h-full' src="/assets/bg/bg.png" alt="" />
        <div className='absolute flex gap-4 bottom-10 right-44 z-50'>
          <Link to="/disease-detection">
            <button className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 bg-green-50 rounded-lg transition-all hover:bg-green-600 hover:text-white">
              <FaLeaf />
              Disease Detection
            </button>
          </Link>

          <Link to="/weather-prediction">
            <button className="flex items-center gap-2 px-4 py-2 border border-yellow-500 text-yellow-500 bg-yellow-50 rounded-lg transition-all hover:bg-yellow-500 hover:text-white">
              <FaCloudSun />
              Weather Prediction
            </button>
          </Link>

          <Link to="/crop-recommendation">
            <button className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 bg-green-50 rounded-lg transition-all hover:bg-green-600 hover:text-white">
              <FaSeedling />
              Crop Recommendation
            </button>
          </Link>

          <Link to="/nearby-soil-testing-labs">
            <button className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 bg-green-50 rounded-lg transition-all hover:bg-green-600 hover:text-white">
              <FaSeedling />
              Soil Testing Labs
            </button>
          </Link>
        </div>
      </div>
      <Carousell />
      <Info/>
      {/* <Detection /> */}
      <Feedback />
      <Footer />
    </>
  )
}