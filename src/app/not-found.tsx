'use client'

import Link from "next/link"
import { Oswald } from "next/font/google"

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export default function NotFound() {
  return (
    <div className={`min-h-screen flex flex-col md:flex-row items-center justify-center bg-black text-white px-6 gap-12 ${oswald.className}`}>

      {/* 🎥 Видео персонажа */}
      <div className="w-full md:w-1/2 max-w-[700px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-contain "
        >
          <source src="/mascot2.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 🎮 Текстовая часть */}
      <div className="text-center md:text-left max-w-lg">

        <h1 className="text-6xl md:text-8xl font-bold mb-6 
                       bg-gradient-to-r from-green-400 to-emerald-600 
                       bg-clip-text text-transparent">
          404
        </h1>

        <p className="text-xl md:text-2xl mb-4 font-semibold">
          Level Not Found 👾
        </p>

        <p className="text-gray-400 mb-8">
          The mascot searched everywhere… but this page doesn’t exist.
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-green-500 rounded-full 
                     font-semibold hover:bg-green-400 
                     transition hover:scale-105 duration-300 shadow-lg"
        >
          Return to DemoGames
        </Link>

      </div>
    </div>
  )
}
