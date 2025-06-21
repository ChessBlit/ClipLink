import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white flex flex-col items-center justify-center">
            {/* Main Footer Content */}
            <div className="min-w-full mx-auto px-4 py-8 flex justify-center">
                <div className="md:grid-cols-4 gap-8">

                    <div className="md:col-span-2 flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <Image src="/favicon.svg" width={20} height={20} alt='...' />
                            </div>
                            <h3 className="text-xl font-bold">Cliplink</h3>
                        </div>
                        <p className="text-blue-200 mb-4 max-w-md text-center">
                            The fastest and most reliable URL shortener. Create clean, professional short links in seconds.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://github.com/chessBlit" className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                                <Image src="/github.svg" alt="..." width={30} height={30}/>
                            </Link>
                        </div>
                    </div>


                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-blue-700">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-blue-200 text-sm">
                            &copy; 2025 Cliplink. Released under the MIT License.
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-blue-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>All systems operational</span>
                            </div>
                            <div className="text-blue-200">
                                Made with ❤️ by <Link href="https://github.com/chessBlit" className='underline'>ChessBlit</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer