'use client' 
import Link from 'next/link'
import { useRef, useEffect } from "react";
import { Oswald } from "next/font/google";
import Image from "next/image"
import GameCarousel from '../app/GameCarousel'

const oswald = Oswald({ 
  subsets: ['latin'], 
  weight: ['400','500','700']
});

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          videoRef.current!.muted = true;
          videoRef.current!.play();
        });
      }
    }
  }, []);

  return (
    <div className={`min-h-screen main-gradient  text-white flex  items-start px-4 sm:px-8 md:px-12 lg:px-24 py-8 flex-col gap-[25px]`}>

      {/* ================= Hero / Main ================= */}
      {/* flex-col-reverse на мобильных, flex-row на md+ */}
      <main className="flex flex-col sm:flex-col md:flex-row items-center md:items-end space-y-6 sm:space-y-6 md:space-y-0 md:space-x-6 w-full">

        {/* Текст и Лого (на мобильных сверху) */}
        <div className="flex flex-col items-start space-y-6 w-full md:w-1/2">
          <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 relative rounded-full border-4 border-green-500 ">
            <Image
              src="/logo.png"
              alt="GameHub Logo"
              fill
              className="object-contain rounded-full"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-green-400">
            DEMO GAMES
          </h1>
          
          <p className={`text-base sm:text-lg md:text-2xl lg:text-3xl opacity-80 w-full md:w-[500px] ${oswald.className}`}>
            Добро пожаловать на наш игровой портал! Здесь вы найдёте последние новости игровой индустрии, обзоры игр, гайды и эксклюзивные материалы. Идеальное место для всех геймеров, от новичков до профи.
          </p>
          
          <Link
            href="/game"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-green-500 rounded-lg text-base sm:text-lg md:text-xl font-semibold hover:bg-green-400 transition"
          >
            Играть Игры
          </Link>
        </div>

        {/* Видео (на мобильных снизу) */}
  <div className="w-full md:w-1/2 h-60 sm:h-80 md:h-[600px] lg:h-[750px] overflow-hidden rounded-lg flex justify-center items-center bg-black hidden md:flex">
  <video
    src="/mascot.mp4"
    autoPlay
    loop
    
    playsInline
    className="w-full h-full object-contain"
  />
</div>

        <div className=" w-[100%] md:hidden ">
      <GameCarousel />
    </div>
      </main> 
         <div className=" w-[100%] hidden md:flex ">
      <GameCarousel />
    </div>
      <div className="w-full md:w-1/2 h-60 sm:h-80 md:h-[600px] lg:h-[750px] overflow-hidden rounded-lg flex justify-center items-center bg-black md:hidden flex-col py-4">
  <video
    src="/mascot.mp4"
    autoPlay
    loop
    playsInline
    className="w-full h-full object-contain"
  />
  <h1 className={`text-basec   sm:text-lg md:text-2xl lg:text-3xl opacity-80  md:w-[500px] ${oswald.className}`}>Demo - Наш Маскот , профи игрок в шутерах</h1>
</div>
    </div>
  )
}
