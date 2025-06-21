"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className='flex items-center justify-between p-3 h-16 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white w-full'>
      <Link href={"/"}><div className="logo font-bold text-xl flex gap-2 items-center justify-center"><Image src="/favicon.svg" width={20} height={20} alt="logo"></Image>Cliplink</div></Link>

      {/* Mobile navbar */}
      <div className="flex items-center gap-2 sm:hidden">
        <Link href="/shorten">
          <button className='glow-button px-3 py-2 text-sm'>Shorten!</button>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {!menuOpen ? <IoIosMenu className="w-6 h-6" /> : <RxCross2 className='w-6 h-6' />}
        </button>
      </div>

      {/* Desktop navbar */}

      <ul className="hidden sm:flex gap-3 items-center">
        <Link href="/"><li>Home</li></Link>
        <Link href="/links"><li>All Links</li></Link>
        <Link href="/shorten">
          <li><button className='glow-button px-4 py-2.5'>Shorten!</button></li>
        </Link>
      </ul>

      {/* Dropdown for mobile phones */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-900 sm:hidden flex flex-col text-sm z-50 border-t border-blue-700/50 shadow-lg">
          <Link
            className='hover:bg-blue-800 p-4 transition-colors duration-200 border-b border-blue-700/30 last:border-b-0'
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <li className="text-blue-100 hover:text-white">Home</li>
          </Link>

          <Link
            className='hover:bg-blue-800 p-4 transition-colors duration-200 border-b border-blue-700/30 last:border-b-0'
            href="/links"
            onClick={() => setMenuOpen(false)}
          >
            <li className="text-blue-100 hover:text-white">All Links</li>
          </Link>
        </ul>
      )}


    </nav>
  )
}

export default Navbar