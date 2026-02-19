'use client'

import { useEffect, useState } from "react";

export interface Game {
  title: string;
  slug: string;
  category: string;
  iframeSrc: string;
  thumbnail: string;
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = "/api/proxy-games";

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Ошибка сети: ${res.status}`);
        const data: Game[] = await res.json();

        setGames(data);
      } catch (err) {
        setError("Ошибка при загрузке игр");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [apiUrl]);

  return { games, loading, error };
}
