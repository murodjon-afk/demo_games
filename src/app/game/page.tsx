'use client';

import Link from 'next/link';
import Image from 'next/image';
import { games } from '../data/games';
import { translations } from "../translate/translation";
import { useLanguage } from "../translate/LanguageContext";
export default function Home() {
        const { lang } = useLanguage();
  
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
        className=' w-[90%] text-left'
      >
    <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-left mb-10 tracking-wide drop-shadow-[2px_2px_8px_rgba(0,0,0,0.7)]">
  {translations[lang].games}    
</h1>


        {/* Сетка карточек */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '20px',
            width: '100%',
          }}
          className=' w-[100%]'
        >
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/game/${game.slug}`}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '12px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: '#fff',
                backgroundColor: '#111',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'scale(1.05)';
                el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.8)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'scale(1)';
                el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.6)';
              }}
            >
              <Image
                src={game.thumbnail}
                alt={game.title}
                fill
                style={{ objectFit: 'cover' }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  background: 'rgba(26,26,26,0.85)',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                className='text-white'
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
