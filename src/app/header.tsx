'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { Oswald } from "next/font/google";
import Link from 'next/link'
import Modal from "./modal" // путь к компоненту модалки

const oswald = Oswald({ 
  subsets: ['latin'], 
  weight: ['400','500','700']
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [muted, setMuted] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("site-muted")
    if (saved === "true") {
      muteAll(true)
    }
  }, [])

  const muteAll = (force?: boolean) => {
    const newState = force ?? !muted
    setMuted(newState)
    localStorage.setItem("site-muted", String(newState))

    // Все аудио/видео
    const media = document.querySelectorAll("audio, video")
    media.forEach((el) => {
      ;(el as HTMLMediaElement).muted = newState
    })

    // Все iframe
    const iframes = document.querySelectorAll("iframe")
    iframes.forEach((frame) => {
      if (newState) {
        frame.setAttribute("muted", "true")
      } else {
        frame.removeAttribute("muted")
      }
    })
  }

  return (
    <>
      <header className={`w-full flex justify-center bg-black relative ${oswald.className}`}>

        <div className="w-[90%] h-[70px] px-6 mt-2 flex items-center justify-between
                        bg-white rounded-full relative z-10">

          {/* Лого */}
<Link href="/" className="flex items-center space-x-3">            <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-green-400">
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
</Link>          

          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-8 text-black font-semibold">
            <Link href="/"             className="hover:text-green-400 transition">Главная</Link>
            <Link href="/game"            className="hover:text-green-400 transition">Игры</Link>
            <Link href="/about"            className="hover:text-green-400 transition">О нас</Link>
            <Link href="/search"            className="hover:text-green-400 transition">Поиск</Link>
          </nav>

          {/* Правая часть */}
          <div className="flex items-center space-x-4">

            {/* Кнопка Mute с эмоджи */}
       <button
  onClick={() => muteAll()}
  className="flex items-center justify-center w-[43px] h-[43px] text-xl bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer
             max-[500px]:w-[35px] max-[500px]:h-[35px] max-[500px]:text-lg"
  title={muted ? "Muted" : "Sound On"}
>
  {muted ? "🔇" : "🔊"}
</button>

<button
  className="flex items-center justify-center w-[43px] h-[43px] text-xl bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer
             max-[500px]:w-[35px] max-[500px]:h-[35px] max-[500px]:text-lg"
  onClick={() => setIsModalOpen(true)}
>
  📞
</button>


{/* Вызов модалки — на уровне Header, отдельно */}
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h2 className="text-2xl font-bold text-green-500">Контакты</h2>
  <p className="text-white/90">Email: contact@demogames.com</p>
  <p className="text-white/90">Телефон: +998 88 460 65 75</p>
  <button
    onClick={() => setIsModalOpen(false)}
    className="mt-4 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
  >
    Закрыть
  </button>
</Modal>


        

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

      {/* Мобильное меню */}
      <div
        className={`fixed top-0 left-0 w-full h-[400px]
        bg-gradient-to-b from-black to-gray-900 text-white
        p-10 shadow-2xl
        transform transition-transform duration-300 md:hidden z-[9999]
        ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >

        <div className="flex justify-end">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-bold hover:text-green-400 transition"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center space-y-8 text-2xl font-semibold mt-10">

          <Link href="/" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            Главная
          </Link>

          <Link href="/game" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            Игры
          </Link>

          <Link href="/About" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            О нас
          </Link>

           <Link href="/search" onClick={() => setMenuOpen(false)}
            className="hover:text-green-400 transition">
            Поиск
          </Link>

        </nav>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-2xl font-bold text-green-500">Контакты</h2>
                <p className="text-white/90">Email: contact@demogames.com</p>
                <p className="text-white/90">Телефон: +998 88 460 65 75</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
                >
                  Закрыть
                </button>
              </Modal>
      </div>
    </>
  )
}
