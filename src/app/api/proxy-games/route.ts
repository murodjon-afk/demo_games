import { NextResponse } from "next/server";
const API_URL = process.env.API_URL!; // <-- без NEXT_PUBLIC_

export async function GET() {
  try {
    const res = await fetch("https://demogames-api.vercel.app/api/games");
    const data = await res.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // CORS разрешение
      },
    });
  } catch (err) {
    console.error("Ошибка при proxy fetch:", err);
    return NextResponse.json({ error: "Не удалось загрузить игры" }, { status: 500 });
  }
}
