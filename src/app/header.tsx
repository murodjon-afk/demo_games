// src/app/header/Header.tsx
'use client'

import { useState } from "react"
import Image from "next/image"
import { Oswald } from "next/font/google";
import Link from 'next/link'

const oswald = Oswald({ 
  subsets: ['latin'], 
  weight: ['400','500','700']
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={`w-full flex justify-center bg-black relative ${oswald.className}`}>

        <div className="w-[90%] h-[70px] px-6 mt-2 flex items-center justify-between
                        bg-white rounded-full relative z-10">

          {/* Лого */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative rounded-full overflow-hidden">
              <Image
                src="/logo.png"
                alt="GameHub Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-black font-bold text-xl md:text-2xl">
              Demo Games
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 text-black font-semibold">
            <Link href="/">Home</Link>
            <Link href="/game">Games</Link>
            <Link href="/about">About</Link>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">

            <button className="hidden md:block px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-400 transition">
              Search
            </button>

            {/* Burger */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center relative z-[10000]"
              onClick={() => setMenuOpen(true)}
            >
              <span className="absolute w-6 h-0.5 bg-black -translate-y-2"></span>
              <span className="absolute w-6 h-0.5 bg-black"></span>
              <span className="absolute w-6 h-0.5 bg-black translate-y-2"></span>
            </button>

          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden z-[9998]
        ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Широкое, но не длинное меню */}
      <div
        className={`fixed top-0 left-0 w-full h-[400px]
        bg-gradient-to-b from-black to-gray-900 text-white
        p-10 shadow-2xl
        transform transition-transform duration-300 md:hidden z-[9999]
        ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >

        {/* Кнопка закрытия */}
        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-bold hover:text-green-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Меню */}
        <nav className="flex flex-col items-center justify-center space-y-8 text-2xl font-semibold mt-10">

          <Link href="/" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            Home
          </Link>

          <Link href="/game" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            Games
          </Link>

          <Link href="/about" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            About
          </Link>

          <button className="mt-4 px-6 py-3 bg-green-500 rounded-xl text-lg hover:bg-green-400 transition">
            Search
          </button>

        </nav>
      </div>
    </>
  )
}
