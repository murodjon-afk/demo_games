import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import LayoutWrapper from "./LayoutWrapper";

export const metadata: Metadata = {
  title: "Demo Games ",
  description: "Играй в лучшие Demo Games игры без регистрации и скачивания. Бесплатные онлайн игры прямо в браузере.",
  keywords: [
    "demo games",
    "игры без регистрации",
    "игры онлайн бесплатно",
    "браузерные игры",
    "играть бесплатно",
    "games",
    "online games",
    "demo",
    "games without registration",
    "free games"
  ],
  authors: [{ name: "Demo Games" }],
  
  openGraph: {
    title: "Demo Games ",
    description: "Лучшие бесплатные онлайн игры без регистрации.",
    url: "https://demogames-sigma.vercel.app/", 
    siteName: "Demo Games",
    images: [
      {
        url: "https://demogames-sigma.vercel.app/", 
        width: 512,
        height: 512,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Demo Games – Игры без регистрации",
    description: "Лучшие бесплатные онлайн игры без регистрации.",
  images: ["/logo.png"], 
    creator: "Muro",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={` antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
