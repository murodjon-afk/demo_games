'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { useGames } from "./lib/useGames";
import { Skeleton } from "@/components/ui/skeleton"

import 'swiper/css'

export default function GameCarousel() {
  const { games } = useGames();

  const isLoading = !games || games.length === 0

  // больше skeleton карточек для красивого вида
  const skeletonCount = 12

  return (
    <div className="w-full py-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={'auto'}
        loop={false}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
      >

        {/* SKELETON */}
        {isLoading &&
          Array.from({ length: skeletonCount }).map((_, index) => (
            <SwiperSlide
              key={index}
              style={{ width: '160px' }}
              className="!flex !justify-center"
            >
              <div className="relative w-[160px] h-[160px] rounded-lg overflow-hidden">

                {/* image skeleton */}
                <Skeleton className="absolute inset-0 rounded-lg bg-green-500" />

                {/* title skeleton */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/80">
                  <Skeleton className="h-3 w-[80%] mx-auto bg-white" />
                </div>

              </div>
            </SwiperSlide>
          ))
        }

        {/* REAL CARDS */}
        {!isLoading && games.map((game) => (
          <SwiperSlide
            key={game.slug}
            style={{ width: '160px' }}
            className="!flex !justify-center"
          >
            <Link
              href={`/game/${game.slug}`}
              className="relative w-[160px] h-[160px] rounded-lg overflow-hidden bg-[#111] block cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-center text-xs font-bold bg-black/70 truncate">
                {game.title}
              </div>
            </Link>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  )
}