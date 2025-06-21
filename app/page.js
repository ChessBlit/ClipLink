import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/5 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Content Section */}
        <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex flex-col justify-center gap-6 px-4 sm:px-6 lg:px-8 py-8 flex-1 order-2 lg:order-1 relative">
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/25 rounded-full blur-lg"></div>
          </div>

          <div className="relative z-10">
            <h1 className="main-head text-center text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
              Welcome To Cliplink!
            </h1>

            <div className="mt-6 max-w-2xl mx-auto">
              <div className="backdrop-blur-sm bg-white/30 border border-blue-200/50 rounded-2xl p-6 shadow-lg">
                <p className="text-center px-2 sm:px-6 text-sm sm:text-base lg:text-lg leading-relaxed text-blue-900/90">
                  This is a very straightforward Link shortening app that allows you to shorten any link you want.
                  Moreover, you can also view the links you have shortened in the past. Also, this app doesn't
                  require you to sign up or log in to use it. You can just shorten your link and copy it.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link href={"/shorten"} className="glow-button flex justify-center items-center px-8 py-3" style={{borderRadius: 12}}>Try Now!</Link>

              <Link href={"/about"} className="relative inline-flex items-center justify-center p-0.5 cursor-pointer overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-green-200 dark:focus:ring-green-600">
                <span className="relative px-8 py-3 transition-all ease-in duration-150 bg-white dark:bg-gray-900 rounded-xl group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Read More
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="bg-gradient-to-bl from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center flex-1 order-1 lg:order-2 relative p-3">
          {/* Decorative background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-90 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-100 w-16 h-16 bg-blue-300/25 rounded-full blur-lg"></div>
          </div>

          <div className="relative h-[250px] sm:h-[300px] lg:h-[400px] w-full rounded-full z-10">
            <Image
              src="/vector.jpg"
              className="mix-blend-multiply opacity-80 object-contain rounded-2xl"
              fill
              alt="Cliplink illustration"
            />
          </div>
        </div>
      </div>
    </main>
  );
}