import React from 'react'
import {motion} from 'framer-motion'
import { Developers } from './Developers'
export const About = () => {
  return (
    <>
    <div id='about' className='w-full h-full flex flex-col justify-center items-center'>
       {/* <motion.img
        initial={{opacity:0,y:-100}}
        whileInView={{opacity:1,y:30}}
        transition={{type:"spring"}}
       className='w-[60vw] z-40' src="/assets/home/model.svg" alt="" /> */}
    <Developers/>
    </div>
    </>
  )
}