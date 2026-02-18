'use client';

import { useParams, useRouter } from 'next/navigation';
import { games } from '@/app/data/games';
import { redirect } from 'next/navigation'

export default function GamePage() {
  const { slug } = useParams();
  const router = useRouter();

  const game = games.find((g) => g.slug === slug);

 if (!game) {
  redirect('/not-found')
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b1120] to-black flex items-start justify-center px-4 py-6">

      <div className="w-[90%] bg-[#0f1e3d] rounded-[40px] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

        <h1 className="text-white text-2xl md:text-4xl font-bold text-center mb-6 tracking-wide">
          {game.title}
        </h1>

        <div
          className="
            relative
            w-full
            mx-auto
            aspect-[4/5]
            md:aspect-video
            bg-black
            rounded-3xl
            overflow-hidden
            shadow-[0_20px_60px_rgba(0,0,0,0.7)]
            border border-white/10
          "
        >
          <iframe
            src={game.iframeSrc}
            className="w-full h-full border-0"
            allow="fullscreen; autoplay; encrypted-media"
            allowFullScreen
            scrolling="no"
            title={game.title}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push(`/full/${game.slug}`)}
            className="
              px-8
              py-3
              text-sm
              md:text-base
              font-bold
              text-white
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-indigo-600
              hover:scale-105
              active:scale-95
              transition
              shadow-lg
            "
          >
            Fullscreen
          </button>
        </div>

      </div>
    </div>
  );
}
