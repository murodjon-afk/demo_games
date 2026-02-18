'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { games } from "../data/games";
import { translations } from "../translate/translation";
import { useLanguage } from "../translate/LanguageContext";
export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
    const { lang } = useLanguage();

  // Получаем уникальные категории из данных games
  const categories = ["All", ...Array.from(new Set(games.map(g => g.category)))];

  // Фильтруем игры по названию и категории
  const filteredGames = games.filter((game) => {
    const matchesQuery = game.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || game.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="bg-black min-h-screen font-sans px-5 py-10">
      <div className="w-[90%] mx-auto flex flex-col items-center text-left">
        {/* Заголовок */}
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-10 tracking-wide drop-shadow-[2px_2px_8px_rgba(0,0,0,0.7)]">
                   {translations[lang].toSearch}
        </h1>

        {/* Поисковое поле и категории */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full md:w-1/2">
          <input
            type="text"placeholder={translations[lang].gameName}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 border border-green-500 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Сетка карточек */}
        {filteredGames.length === 0 ? (
          <>
            <p className="text-white/60 mb-5">Undefined</p>
            <div className="w-full md:w-2/3 lg:w-1/2 h-60 sm:h-80 md:h-[400px] lg:h-[500px] overflow-hidden rounded-lg flex justify-center items-center bg-black mx-auto">
              <video
                src="/mascot3.MP4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </>
        ) : (
        <div className="grid gap-5 w-full justify-center
                grid-cols-3      /* ≤375px: 2 карточки в ряд */
                sm:grid-cols-4   /* ≥640px: 3 карточки */
                md:grid-cols-5   /* ≥768px: 4 карточки */
                lg:grid-cols-6  /* ≥1024px: 5 карточки */
                xl:grid-cols-7   /* ≥1280px: 6 карточки */
                2xl:grid-cols-8" /* ≥1536px: 7 карточки */ 
>
  {filteredGames.map((game) => (
    <Link
      key={game.slug}
      href={`/game/${game.slug}`}
      className="relative rounded-lg overflow-hidden cursor-pointer bg-[#111] shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl aspect-[1/1]"
    >
      <Image
        src={game.thumbnail}
        alt={game.title}
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute bottom-0 w-full text-center font-bold text-sm bg-[rgba(26,26,26,0.85)] overflow-hidden whitespace-nowrap text-ellipsis px-2 py-1 text-white">
        {game.title}
      </div>
    </Link>
  ))}
</div>



        )}
      </div>
    </div>
  );
}
