'use client';

import Link from 'next/link';
import Image from 'next/image';
import { games } from '../data/games';

export default function Home() {
  return (
    <div
      style={{
        padding: '40px 20px',
        backgroundColor: '#000',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        
      }}
      
    >
      <div className="w-[90%] mx-[auto] flex-col"   style={{
    display: 'flex',
    justifyContent: 'center'

  }}>
        <h1
        style={{
          color: '#fff',
          fontSize: '48px',
          fontWeight: 700,
          textAlign: 'left',
margin: '0 auto',
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
          letterSpacing: '1px'
        }}
      >
        Игры
      </h1>

      {/* Сетка карточек */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, 200px)', // фиксированная ширина карточки
          gap: '40px',
          maxWidth: '100%',
          margin: '0 auto',
          justifyContent: 'center' // карточки прижаты к левому краю
          
        }}
      >
        {games.map((game) => (
          <Link
            key={game.slug}
            href={`/game/${game.slug}`}
            style={{
              position: 'relative',
              width: '220px',          // фиксированная ширина
              aspectRatio: '1 / 1',    // квадрат
              borderRadius: '12px',
              overflow: 'hidden',
              textDecoration: 'none',
              color: '#fff',
              backgroundColor: '#111',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
              transition: 'transform 0.2s, box-shadow 0.2s'
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
              sizes="220px"
            />

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '8px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                background: 'rgba(26,26,26,0.85)'
              }}
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
