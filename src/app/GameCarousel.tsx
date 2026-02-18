'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

import { games } from '../app/data/games'

export default function GameCarousel() {
  return (
    <div className="w-full py-4 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0} // карточки вплотную
        slidesPerView={'auto'} // ширина карточки управляет
        loop={false} // ❌ отключаем бесконечный loop
        autoplay={{
          delay: 500, // автопрокрутка
          disableOnInteraction: false,
        }}
      >
        {games.map((game) => (
          <SwiperSlide
            key={game.slug}
            style={{ width: '200px' }} // фиксированная ширина
          >
            <Link
              href={`/game/${game.slug}`}
              className="relative w-[160px] h-[160px] rounded-lg overflow-hidden bg-[#111] block cursor-pointer hover:scale-105 transition-transform duration-300 "
            >
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 w-full px-2 py-1 text-center text-xs font-bold bg-[rgba(0,0,0,0.7)] truncate">
                {game.title}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
