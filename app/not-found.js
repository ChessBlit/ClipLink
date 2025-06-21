"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'


// Broken Link SVG Component (updated with blue theme)
const BrokenLinkIcon = ({ className = "w-24 h-24" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.8">
      {/* Left chain link */}
      <path 
        d="M25 40c-5.523 0-10 4.477-10 10s4.477 10 10 10h6c1.657 0 3-1.343 3-3s-1.343-3-3-3h-6c-1.657 0-3-1.343-3-3s1.343-3 3-3h6"
        stroke="#60A5FA" 
        strokeWidth="3" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right chain link */}
      <path 
        d="M75 40c5.523 0 10 4.477 10 10s-4.477 10-10 10h-6c-1.657 0-3-1.343-3-3s1.343-3 3-3h6c1.657 0 3-1.343 3-3s-1.343-3-3-3h-6"
        stroke="#60A5FA" 
        strokeWidth="3" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Break marks */}
      <line x1="42" y1="47" x2="46" y2="43" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="43" x2="46" y2="47" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      
      <line x1="54" y1="47" x2="58" y2="43" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="43" x2="58" y2="47" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </g>
  </svg>
)

// Home Icon SVG
const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
)

// Plus Icon SVG
const PlusIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

export default function Custom404() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="py-5 flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center text-white max-w-2xl mx-auto relative z-10">
        
        {/* Logo and Brand */}
        <div className="flex items-center justify-center mb-12">
          <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm border border-blue-400/20 mr-4">
            <Image src={"/favicon.svg"} alt='ClipLink Logo' width={40} height={40} className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              ClipLink
            </h1>
            <p className="text-sm text-blue-200/70 mt-1">URL Shortening Service</p>
          </div>
        </div>

        {/* 404 Error with blue tint and glow effect */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
            404
          </div>
          {/* Glow effect behind the text */}
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-blue-400/20 blur-sm -z-10">
            404
          </div>
        </div>

        {/* Broken link illustration with enhanced styling */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-400/20">
            <BrokenLinkIcon className="w-24 h-24" />
          </div>
        </div>

        {/* Error message with improved styling */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Link Not Found
          </h2>
          <div className="max-w-md mx-auto p-6 bg-blue-500/10 rounded-xl backdrop-blur-sm border border-blue-400/20">
            <p className="text-lg text-blue-100/90 leading-relaxed">
              The shortened URL you're looking for doesn't exist, has expired, or may have been removed.
            </p>
          </div>
        </div>

        {/* Enhanced action buttons with blue theme */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link 
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center shadow-lg hover:shadow-blue-500/25 hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-400/20"
          >
            <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Return Home
          </Link>
          
          <Link 
            href="/shorten"
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 min-w-[180px] justify-center shadow-lg hover:shadow-blue-400/25 hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-300/20"
          >
            <PlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Create New Link
          </Link>
        </div>

      </div>
    </div>
  )
}