'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useGames } from "../lib/useGames";

import { translations } from "../translate/translation";
import { useLanguage } from "../translate/LanguageContext";

import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {

  const { lang } = useLanguage();
  const { games } = useGames();

  const isLoading = !games || games.length === 0;

  const skeletonCount = 32;

  return (
    <div
      style={{
        padding: '40px 20px',
        backgroundColor: '#000',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >

      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className='w-[90%] text-left'
      >

        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-left mb-10 tracking-wide drop-shadow-[2px_2px_8px_rgba(0,0,0,0.7)]">
          {translations[lang].games}
        </h1>


        <div className="grid gap-5 w-full justify-center
          grid-cols-2
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
          xl:grid-cols-7
          2xl:grid-cols-8"
        >

          {/* SKELETON */}
          {isLoading && Array.from({ length: skeletonCount }).map((_, index) => (

            <div
              key={index}
              className="
                relative
                w-full
                aspect-square
                rounded-xl
                overflow-hidden
                bg-green-500
                border border-green-400
                shadow-md shadow-green-500/20
              "
            >

              {/* image skeleton */}
              <Skeleton className="absolute inset-0 bg-green-400/50 animate-pulse" />

              {/* title skeleton */}
              <div className="absolute bottom-0 w-full bg-black px-2 py-2 flex justify-center">
                <Skeleton className="h-4 w-[70%] bg-black/80 animate-pulse" />
              </div>

            </div>

          ))}


          {/* REAL GAMES */}
          {!isLoading && games.map((game) => (

            <Link
              key={game.slug}
              href={`/game/${game.slug}`}
              className="
                relative
                w-full
                aspect-square
                rounded-xl
                overflow-hidden
                bg-black
                border border-green-500
                shadow-md shadow-black
                hover:scale-105
                hover:shadow-lg
                hover:shadow-green-500/40
                transition-all duration-200
              "
            >

              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                className="object-cover"
              />

              <div
                className="
                  absolute bottom-0 w-full
                  px-2 py-2
                  text-center
                  font-bold
                  text-sm
                  bg-black/80
                  text-black
                  truncate
                  text-white
                "
              >
                {game.title}
              </div>

            </Link>

          ))}

        </div>

      </div>
    </div>
  );
}