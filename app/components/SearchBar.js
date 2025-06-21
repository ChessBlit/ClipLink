import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const SearchBar = ({ onSearch, placeholder = "Search links...", className = "" }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        if (onSearch) {
            onSearch('');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Real-time search as user types
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className={`w-full max-w-2xl mx-auto ${className}`}>
            <div className="relative">
                <div className={`relative flex items-center p-2 gap-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border ${isFocused ? 'border-blue-400 ring-2 ring-blue-200' : 'border-blue-100'
                    }`}>
                    {/* Search Icon */}
                    <div className="flex items-center justify-center pl-4 pr-2">
                        <lord-icon
                            src="https://cdn.lordicon.com/hoetzosy.json"
                            trigger="hover"
                            className={`w-5 h-5 transition-colors duration-200 ${isFocused ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                        </lord-icon>
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                        placeholder={placeholder}
                        className="flex-1 py-3 px-2 text-gray-700 bg-transparent border-none outline-none placeholder-gray-400 text-sm font-medium"
                    />

                    {/* Clear Button */}
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="flex items-center justify-center p-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                            <RxCross2 className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SearchBar;