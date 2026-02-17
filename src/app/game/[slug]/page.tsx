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
      setIsFullscreen(
        !!document.fullscreenElement ||
        !!containerRef.current?.classList.contains('mobile-fullscreen')
      );
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

  const handleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (el.requestFullscreen) {
      try {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } catch {
        enableMobileFullscreen(el);
      }
    } else {
      enableMobileFullscreen(el);
    }
  };

  const enableMobileFullscreen = (el: HTMLDivElement) => {
    el.classList.add(
      'fixed',
      'inset-0',
      'z-[9999]',
      'w-screen',
      'h-screen',
      'rounded-none',
      'mobile-fullscreen'
    );
    setIsFullscreen(true);
  };

  const exitFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }

    el.classList.remove(
      'fixed',
      'inset-0',
      'z-[9999]',
      'w-screen',
      'h-screen',
      'rounded-none',
      'mobile-fullscreen'
    );

    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b1120] to-black flex items-start justify-center px-4 py-6">

      {/* 📺 TV рамка */}
      <div className="w-[90%]  bg-[#0f1e3d] rounded-[40px] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">

        {/* Заголовок внутри TV */}
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center mb-6 tracking-wide">
          {game.title}
        </h1>

        {/* Игровой контейнер — твой оригинальный стиль */}
        <div
          ref={containerRef}
          className="
            relative
            w-[100%]
            mx-auto
            aspect-[4/5]
            md:aspect-video
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
            allow="fullscreen; autoplay; encrypted-media"
            allowFullScreen
            scrolling="no"
            title={game.title}
          />

          {isFullscreen && (
            <button
              onClick={exitFullscreen}
              className="
                absolute
                top-4
                right-4
                w-10
                h-10
                text-lg
                bg-black/70
                text-white
                rounded-full
                backdrop-blur-md
                flex
                items-center
                justify-center
                hover:scale-110
                transition
              "
            >
              ✕
            </button>
          )}
        </div>

        {/* Кнопка остаётся такой же */}
        {!isFullscreen && (
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
        )}

      </div>
    </div>
  );
}
