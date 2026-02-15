'use client';

import { useParams } from 'next/navigation';
import { games } from '../../data/games';
import { useRef, useState, useEffect } from 'react';

export default function GamePage() {
  const { slug } = useParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const game = games.find(g => g.slug === slug);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!game)
    return <div style={{ color: '#fff', padding: '20px' }}>Игра не найдена</div>;

  const enterFullscreen = () => {
    if (!isMobile && iframeRef.current) {
      // ПК: стандартный fullscreen, центрирование браузером
      iframeRef.current.requestFullscreen();
    } else {
      // Мобильный fullscreen: кастомный
      setIsFullscreen(true);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: 10 }}>
      {/* Обычный вид */}
    {/* Обычный режим */}
{!isFullscreen && (
  <>
    <h1
      style={{
        color: '#fff',
        fontSize: isMobile ? 22 : 36,
        fontWeight: 700,
        marginBottom: 15,
        textAlign: 'center',
      }}
    >
      {game.title}
    </h1>

    {/* Центрируем iframe */}
    <div
      style={{
        display: 'flex',           // flex-контейнер
        justifyContent: 'center',  // центрируем горизонтально
        alignItems: 'center',      // вертикально (если нужно)
        width: '100%',
        marginBottom: 15,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1500px',
          height: isMobile ? '50vh' : '60vh',
          borderRadius: isMobile ? 0 : 12,
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        <iframe
          ref={iframeRef}
          src={game.iframeSrc}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
          scrolling="no"
          title={game.title}
        />
      </div>
    </div>

    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
      <button
        onClick={enterFullscreen}
        style={{
          padding: '12px 25px',
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
          backgroundColor: '#1e40af',
          border: 'none',
          borderRadius: 10,
          cursor: 'pointer',
        }}
      >
        Fullscreen
      </button>
    </div>
  </>
)}


      {/* Fullscreen мобильный */}
      {isFullscreen && isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 9999,
          }}
        >
          <iframe
            ref={iframeRef}
            src={game.iframeSrc}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vh',
              height: '100vw',
              transform: 'translate(-50%, -50%) rotate(90deg)',
              border: 'none',
            }}
            allowFullScreen
            scrolling="no"
            title={game.title}
          />

          <button
            onClick={exitFullscreen}
            style={{
              position: 'fixed',
              top: 20,
              left: 20,
              zIndex: 10000,
              padding: '12px 16px',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#dc2626',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
