"use client"
import React, { useEffect, useState } from 'react';
import LoadingAnimation from '../components/LoadingAnimation';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';

const Links = () => {
    const [links, setLinks] = useState([]);
    const [filteredLinks, setFilteredLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const getData = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/generate");
            const data = await res.json();
            // Sort by date in increasing order
            const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time));
            setLinks(sortedData);
            setFilteredLinks(sortedData); // Initialize filtered links
            console.log(sortedData);
        } catch (error) {
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = async (e) => {
        await fetch(`/api/generate`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: e })
        });
        getData()
    }

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredLinks(links);
        } else {
            const filtered = links.filter(link => 
                link.url.toLowerCase().includes(term.toLowerCase()) ||
                link.text.toLowerCase().includes(term.toLowerCase()) ||
                `${process.env.NEXT_PUBLIC_HOST}${link.text}`.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredLinks(filtered);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Update filtered links when links change
    useEffect(() => {
        handleSearch(searchTerm);
    }, [links]);

    return <>
        {(!loading && (links.length === 0)) && <>
            <main className='min-h-screen py-4 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex justify-center items-center px-3'>
                <div className='bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl max-w-sm mx-auto text-center'>
                    <h3 className='text-lg md:text-xl font-bold text-white mb-2'>No shortened links to display</h3>
                    <p className='text-blue-100 text-sm mb-4'>Want to make some?</p>
                    <Link href={"/shorten"} prefetch={true} className='glow-button inline-block px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-300 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm'>
                        Try now!
                    </Link>
                </div>
            </main>
        </>}

        {!loading && links.length > 0 &&
            <main className='min-h-screen py-4 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 px-2'>
                <div className='max-w-2xl mx-auto space-y-4'>
                    {/* Search Bar */}
                    <SearchBar 
                        onSearch={handleSearch}
                        placeholder="Search by URL, shortened link, or keyword..."
                        className="mb-6"
                    />

                    {/* Search Results Info */}
                    {searchTerm && (
                        <div className='bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-lg'>
                            <p className='text-white text-sm'>
                                {filteredLinks.length > 0 
                                    ? `Found ${filteredLinks.length} result${filteredLinks.length !== 1 ? 's' : ''} for "${searchTerm}"`
                                    : `No results found for "${searchTerm}"`
                                }
                            </p>
                        </div>
                    )}

                    {/* Links List */}
                    <div className='space-y-3'>
                        {filteredLinks.map((item, index) => {
                            return (
                                <div key={item.text} className='bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100'>

                                    {/* Header with Number */}
                                    <div className='flex items-center mb-3'>
                                        <div className='bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-1 px-3 rounded-lg text-sm' id={`${item.text}`}>
                                            #{searchTerm ? index + 1 : links.findIndex(i => { return i.text === item.text }) + 1}
                                        </div>
                                    </div>

                                    {/* URLs Container */}
                                    <div className='space-y-2'>
                                        {/* Original URL */}
                                        <div className='bg-gray-50 p-2 rounded-lg border'>
                                            <div className='flex justify-between items-center gap-2'>
                                                <div className='flex-1 text-gray-700 text-sm overflow-hidden'>
                                                    <div className='overflow-ellipsis whitespace-nowrap select-none overflow-hidden' style={{ padding: 0 }}>
                                                        {item.url}
                                                    </div>
                                                </div>
                                                <div className='flex gap-1 flex-shrink-0'>
                                                    <div className='p-1 hover:bg-gray-200 rounded transition-colors'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/yxwmgaav.json"
                                                            trigger="hover"
                                                            className="cursor-pointer rotate-[-45deg]"
                                                            onClick={() => window.open(`${item.url}`, "_blank")}
                                                            style={{ width: 18, height: 18 }}>
                                                        </lord-icon>
                                                    </div>
                                                    <div className='p-1 hover:bg-gray-200 rounded transition-colors'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            className="cursor-pointer"
                                                            onClick={() => navigator.clipboard.writeText(item.url)}
                                                            style={{ width: 18, height: 18 }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shortened URL */}
                                        <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                                            <div className='flex justify-between items-center gap-2'>
                                                <div className='text-blue-800 font-medium text-sm flex-1 break-all'>
                                                    {`${process.env.NEXT_PUBLIC_HOST}${item.text}`}
                                                </div>
                                                <div className='flex-shrink-0'>
                                                    <div className='p-1 hover:bg-blue-200 rounded transition-colors'>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                            className="cursor-pointer"
                                                            onClick={() => navigator.clipboard.writeText(`https://localhost:3000/${item.text}`)}
                                                            style={{ width: 18, height: 18 }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* No Results Message */}
                    {searchTerm && filteredLinks.length === 0 && (
                        <div className='bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl text-center'>
                            <h3 className='text-lg font-bold text-white mb-2'>No matches found</h3>
                            <p className='text-blue-100 text-sm'>Try adjusting your search terms</p>
                        </div>
                    )}
                </div>
            </main>
        }

        {loading && (
            <LoadingAnimation />
        )}
    </>;

};

export default Links;