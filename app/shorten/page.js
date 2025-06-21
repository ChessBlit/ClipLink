"use client"
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import isURL from 'validator/lib/isURL';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Shorten = () => {
    const notify = (text, delay = 2000) => toast.success(text, {
        position: "top-right",
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    const notifyErr = (text, delay = 2000) => toast.error(text, {
        position: "top-right",
        autoClose: delay,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
    const [shortenedUrl, setShortenedUrl] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError
    } = useForm();

    const logic = async (data) => {
        let a = await getData()
        let b = a.filter(item => item.text === data.text)

        if (b.length === 0) {
            return true;
        }
        return false;
    }

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortenedUrl);
            notify("URL copied to clipboard!", 1000)
        } catch (err) {
            console.error('Failed to copy text: ', err);
            notifyErr("Couldn't copy text to clipboard", 1000)
            
        }
    };

    const onSubmit = async (data) => {
        // Reset shortened URL when submitting new URL
        setShortenedUrl("");

        // Validate URL with validator
        if (!isURL(data.url, {
            require_protocol: false,
            require_valid_protocol: true,
            protocols: ['http', 'https'],
            require_host: true,
            require_tld: true
        })) {
            setError("url", {
                type: "manual",
                message: "Please enter a valid URL (e.g., https://example.com)"
            });
            return;
        }

        // Add https:// if no protocol is specified
        if (!/^https?:\/\//i.test(data.url)) {
            data.url = 'https://' + data.url;
        }

        let isValid = await logic(data)
        if (isValid) {
            const res = await fetch("/api/generate/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                // Set the shortened URL
                setShortenedUrl(`${window.location.origin}/${data.text}`);
                notify("Shortened URL Generated!")
            }
        } else {
            setError("text", {
                type: "manual",
                message: "This text already exists"
            });
        }
    }

    async function getData() {
        const res = await fetch("/api/generate/")
        const r = await res.json();
        return r;
    }

    return (
        <>
            <ToastContainer pauseOnFocusLoss={false} />
            <main className="bg-gradient-to-br from-blue-100 to-cyan-100 min-h-screen sm:min-h-screen sm:m-0 flex justify-center flex-col items-center sm:p-0">
                <div className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white min-h-screen sm:m-0 sm:min-h-0 py-8 sm:py-12 w-[100vw] sm:w-[90vw] md:w-[70vw] lg:w-[50vw] flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 sm:rounded-3xl justify-center items-center shadow-xl'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl mb-2 mx-auto font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100'>
                        Shorten your URL!
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[95%] sm:max-w-md flex flex-col gap-4 sm:gap-9">
                        <div className="relative group flex items-center justify-center w-full">
                            <input
                                {...register("url", {
                                    required: "URL is required"
                                })}
                                type="text"
                                placeholder='Enter the original URL'
                                className="min-w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-transparent transition-all duration-300 outline-none focus:border-white/50 focus:bg-white placeholder:text-gray-400"
                            />
                            {errors.url && (
                                <p className="absolute -bottom-5 right-0 text-red-200 text-xs sm:text-sm font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {errors.url.message}
                                </p>
                            )}
                        </div>

                        <div className="relative group flex items-center justify-center w-full">
                            <input
                                {...register("text", {
                                    required: "Custom text is required",
                                    minLength: {
                                        value: 2,
                                        message: "Text must be at least 2 characters long"
                                    }, validate: {
                                        notReserved: (value) =>
                                            !['shorten', 'about', 'links'].includes(value.toLowerCase()) ||
                                            "Cannot use 'shorten', 'about' or 'links' as custom text",
                                        noSpaces: (value) =>
                                            !/\s/.test(value) ||
                                            "Custom text cannot contain spaces",
                                        noSpecialChars: (value) =>
                                            /^[a-zA-Z0-9-_]+$/.test(value) ||
                                            "Only letters, numbers, hyphens '-' and underscores '_' are allowed"
                                    }
                                })}
                                type="text"
                                placeholder={'Enter your custom short link text'}
                                className="min-w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-transparent transition-all duration-300 outline-none focus:border-white/50 focus:bg-white placeholder:text-gray-400"
                            />
                            {errors.text && (
                                <p className="absolute -bottom-6 left-0 text-red-200 text-xs sm:text-sm font-medium flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    {errors.text.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-6 sm:mt-8 w-full sm:w-48 mx-auto cursor-pointer text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 disabled:cursor-not-allowed transition-all duration-300 font-medium rounded-xl text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-3.5 text-center shadow-lg hover:shadow-xl focus:ring-4 focus:ring-cyan-300 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Generate!
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {shortenedUrl && (
                        <div className="w-full max-w-[95%] sm:max-w-md mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 flex flex-col gap-2">
                            <p className="text-xs sm:text-sm text-white/80">Your shortened URL:</p>
                            <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                                <input
                                    type="text"
                                    value={shortenedUrl}
                                    readOnly
                                    className="w-full flex-grow px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm text-gray-800 bg-white/90 backdrop-blur-sm border-2 border-transparent"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="cursor-pointer w-full sm:w-auto px-4 py-2 text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>

    )
}

export default Shorten