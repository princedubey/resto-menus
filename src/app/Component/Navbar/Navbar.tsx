'use client'
import React, { useState,useEffect } from 'react'
import Container from '../Container'
import Topbar from './Topbar'
import Image from 'next/image'
import Logo from '../../assets/food-logo.png';
import {  FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { IoMdLogOut } from "react-icons/io";
import { Merienda } from 'next/font/google';
import Menubar from './Menubar'

const merienda = Merienda({
  subsets: ['latin'],
});


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 40;
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  return (
    <div className="relative">
      <Topbar isScrolled={isScrolled} />
      <div className={`${isScrolled ? 'fixed top-0 left-0 right-0 z-[100]' : ''} transition-all duration-300`}>
        <nav className={`${isScrolled ? 'bg-primary text-onPrimary' : 'bg-surface text-onSurface'} transition duration-300 border-b border-gray-200 w-full py-4 ${isScrolled ? 'shadow-md' : ''}`}>
        <Container>
          <div className='flex flex-wrap justify-between items-center'>
            <div className='flex items-center'>
              <Image src={Logo} alt='logo' className='w-16 h-16 object-cover' />
              <h1 className={`text-xl md:text-2xl font-extrabold ml-2 ${merienda.className} font-merienda`}>LadySticks and Cravings</h1>
            </div>
            <div className='flex md:hidden'>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-2xl'>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <div className={`w-full md:w-auto md:flex items-center mt-4 md:mt-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className=' bg-secondary border  border-secondary/5 flex items-center rounded-lg md:mr-6'>
                <h1 className='py-1 rounded-l-lg bg-surface text-onSurface text-lg flex items-center mb-2 md:mb-0 px-2 '>
                    Rishabh Sinha
                </h1>
                <FaUserCircle className='inline mx-3 text-xl text-onPrimary' />
              </div>
              <div className='bg-secondary text-onPrimary  text-center px-2 py-1 rounded-full '>
                <IoMdLogOut className='inline text-lg mb-[2px]  ' />
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <Menubar />
      </div>
      {isScrolled && <div className="h-[64px]" />} {/* Placeholder to prevent content jump */}
    </div>
  )
}

export default Navbar