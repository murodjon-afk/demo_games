'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGames } from "../../lib/useGames";

export default function FullGamePage() {
  const { slug } = useParams();
  const router = useRouter();
          const { games } = useGames();

  const game = games.find((g) => g.slug === slug);

  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Игра не найдена
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">

      {/* Игра во весь экран */}
      <iframe
        src={game.iframeSrc}
        className="w-full h-full border-0"
        allow="fullscreen; autoplay; encrypted-media"
        allowFullScreen
        scrolling="no"
        title={game.title}
      />

      {/* Маленькая прозрачная кнопка назад */}
      <button
        onClick={() => router.back()}
        className="
          absolute
          top-4
          left-4
          px-3
          py-1.5
          text-xs
          bg-black/40
          text-white
          rounded-lg
          backdrop-blur-md
          hover:bg-black/60
          transition
        "
      >
        ← Назад
      </button>
    </div>
  );
}
