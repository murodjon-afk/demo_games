'use client'

import { useState } from "react"
import Image from "next/image"
import Modal from "../modal" // путь к компоненту модалки

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center relative overflow-hidden">

      {/* Видео-маскот */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      >
        <source src="/mascot.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Логотип */}
      <div className="relative z-10 mt-10 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-green-500 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Demo Games Logo"
          fill
          className="object-contain"
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-20 mt-8 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500">
          Demo Games
        </h1>

        <p className="text-lg md:text-2xl max-w-3xl text-white/90">
          Добро пожаловать на Demo Games — ваш хаб для увлекательных HTML5 игр.  
          Здесь вы можете играть, исследовать и наслаждаться последними играми от ведущих разработчиков без регистрации.  
          Мы создаём пространство для развлечений и медиа-контента для всех.   
        </p>

        <p className="text-md md:text-lg text-white/70 max-w-3xl">
          Все игры и материалы предоставлены сайтом madkidgames.com.
        </p>

        {/* Текст о сотрудничестве с кнопкой */}
        <p className="text-md md:text-lg text-white/70 max-w-3xl">
          При желании сотрудничества и рекламодательства обращайтесь{' '}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-green-500 underline hover:text-green-400 transition"
          >
            по контактам
          </button>.
        </p>
      </div>

      {/* Вызов модалки */}
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
  )
}
