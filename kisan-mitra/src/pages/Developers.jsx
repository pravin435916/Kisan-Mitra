import React from 'react'
import './custom.css'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export const Developers = () => {
    return (
        <div class="main-box-container flex gap-8">
            <span className='text-7xl font-bold'>Developers</span>
            <div class="box-container">
                <img className='img' src="/assets/home/pravin.jpeg" />
                <span className='font-bold text-xl '>Pravin Nandankar</span>
                <p className='text-[1rem]'>
                    Pravin Nandankar is a mysterious and enigmatic character who possesses unparalleled skill in martial arts and a deep connection to the ancient arts of swordsmanship. Despite their formidable abilities, Haruki often prefers to keep to themselves, shrouded in secrecy and rarely revealing their true intentions.
                </p>
                <div className='flex gap-2 items-center mt-6'>
                    <span><FaInstagram /></span>
                    <span><FaLinkedin /></span>
                    <span><FaXTwitter /></span>
                </div>
            </div>
            <div class="box-container">
                <img className='img' src="/assets/home/vansh.jpg" />
                <span className=' font-bold text-xl'>Vansh Kolte</span>
                <p className='text-[1rem]'>
                    Haruki Kurogane is a mysterious and enigmatic character who possesses unparalleled skill in martial arts and a deep connection to the ancient arts of swordsmanship. Despite their formidable abilities, Haruki often prefers to keep to themselves, shrouded in secrecy and rarely revealing their true intentions.
                </p>

                <div className='flex gap-2 items-center mt-6'>
                    <span><FaInstagram /></span>
                    <span><FaLinkedin /></span>
                    <span><FaXTwitter /></span>
                </div>
            </div>
        </div>
    )
}