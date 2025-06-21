import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cliplink - Shorten your links",
  description: "Cliplink - Shorten your links",
  icons: {
    icon: "/mainFavicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-100`}
      >
        <Navbar />

        {children}
        <Footer />

        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
