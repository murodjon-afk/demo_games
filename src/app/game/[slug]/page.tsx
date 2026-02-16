'use client';

import { useParams } from 'next/navigation';
import { games } from '../../data/games';
import { useRef, useState, useEffect } from 'react';

export default function GamePage() {
  const { slug } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const game = games.find((g) => g.slug === slug);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  if (!game) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-semibold">
        Игра не найдена
      </div>
    );
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      containerRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b1120] to-black flex flex-col items-center px-4 py-6">

      {/* Заголовок */}
      <h1 className="text-white text-2xl md:text-4xl font-bold text-center mb-6 tracking-wide">
        {game.title}
      </h1>

      {/* Игровой контейнер */}
      <div
        ref={containerRef}
        className="
          relative
          w-[90%]

          aspect-[4/5]          /* mobile выше */
          md:aspect-video       /* desktop 16:9 */
          bg-black
          rounded-3xl
          overflow-hidden
          shadow-[0_20px_60px_rgba(0,0,0,0.7)]
          border border-white/10
          transition-all
          duration-300
        "
      >
        <iframe
          src={game.iframeSrc}
          className="w-full h-full border-0"
          allowFullScreen
          scrolling="no"
          title={game.title}
        />

        {/* Кнопка выхода (минимальная, аккуратная) */}
        {isFullscreen && (
          <button
            onClick={exitFullscreen}
            className="
              absolute
              top-3
              right-3
              w-7
              h-7
              text-xs
              bg-black/40
              text-white
              rounded-full
              backdrop-blur-sm
              flex
              items-center
              justify-center
              opacity-70
              hover:opacity-100
              transition
            "
          >
            ✕
          </button>
        )}
      </div>

      {/* Кнопка Fullscreen */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleFullscreen}
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
  );
}
