import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Check Plant', href: '/detect' },
        { text: 'Feedbacks', href: '/feedback' },
    ];

    return (
        <>
            <nav className="absolute w-full h-24 bg-transparant z-50 p-4 flex justify-between items-center">
                <div className='flex gap-12 items-center'>
                    <img className='w-6' src="/assets/home/kisan.png" alt="" />
                     <span className='text-white font-bold absolute left-10 top-10'>Kisan मित्र</span>
                </div>
                <div className="flex gap-8 absolute right-10 top-10 ">
                    {isAuthenticated ? (
                        <button className='text-xl btn text-black bg-white' onClick={() => logout({ returnTo: window.location.origin })}>Sign out</button>
                    ) : (
                        <button className='text-xl btn text-black bg-white' onClick={() => loginWithRedirect()}>Sign in</button>
                    )}
                    <button onClick={toggleNavbar} type="button" className="flex flex-col gap-3 items-center justify-center p-2 rounded-m transition duration-150 ease-in-out">
                        <div className={`w-12 h-0.5 bg-white ${isOpen ? 'rotate-45' : ''} transition-all duration-300`}></div>
                        <div className={`w-12 h-0.5 bg-white mt-1 ${isOpen ? '-rotate-45' : ''} transition-all duration-300`}></div>
                    </button>
                </div>
            </nav>
            {
                isOpen &&
                <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='flex gap-6 absolute w-full bg-black h-screen  justify-center items-center flex-col z-40'>
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            className="block text-5xl text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                        >
                            {link.text}
                        </motion.a>
                    ))}
                </motion.div>
                </>
            }
        </>
    );
};