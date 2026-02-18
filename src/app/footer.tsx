// components/Footer.tsx
'use client'
import Link from "next/link";
import Image from "next/image"
import Modal from "./modal" // путь к компоненту модалки
import { useState} from "react";
import { translations } from "./translate/translation";
import { useLanguage } from "./translate/LanguageContext";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { lang } = useLanguage();

  return (
    <footer
      className="text-white py-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/footer.jpg')" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Лого и название */}
        <div className="flex flex-col items-center space-x-3 mb-4 md:mb-0">
  <div className="w-20 h-20 relative rounded-full overflow-hidden border-4 border-green-500 flex items-center justify-center">
    <Image
      src="/logo.png"
      alt="GameHub Logo"
      fill
      className="object-contain"
    />
  </div>
    <span className="text-green-400 font-bold text-xl md:text-2xl">
              Demo Games
            </span>
</div>


        {/* Навигация */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-green-500 transition">{translations[lang].home}</Link>
          <Link href="/game" className="hover:text-green-500 transition">                 {translations[lang].games}</Link>
          <Link href="/about" className="hover:text-green-500 transition">                 {translations[lang].about}</Link>
<button
  className="hover:text-green-500 transition"
  onClick={() => setIsModalOpen(true)}
>
                   {translations[lang].contactsTitle}

</button>
        </div>

      </div>

      {/* Нижняя строка */}
      <div className="mt-6 text-center text-green-500 text-sm">
                 {translations[lang].footerRights}

        <br />
                 {translations[lang].footermadkid}
      </div>

   <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h2 className="text-2xl font-bold text-green-500 mb-4">                   {translations[lang].contactsTitle}</h2>

  <div className="flex flex-col gap-3">
    {/* Email */}
    <div className="flex items-center gap-2 text-white/90">
      <Image src="/email.webp" alt="Email" width={24} height={24} />
      <span>muro21601@gmail.com</span>
    </div>


<a
  href="https://www.instagram.com/muro__m_m/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-white/90 hover:text-green-500 transition"
>
  <Image src="/insta.avif" alt="Instagram" width={24} height={24} />
  <span>                   {translations[lang].contactsInstagram} </span>
</a>

{/* Telegram */}
<a
  href="https://t.me/muro_tojik"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-white/90 hover:text-green-500 transition"
>
  <Image src="/tg.jpg" alt="Telegram" width={24} height={24} />
  <span>                   {translations[lang].contactsTelegram}</span>
</a>

  </div>

  <button
    onClick={() => setIsModalOpen(false)}
    className="mt-4 px-4 py-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition"
  >
                   {translations[lang].close}
  </button>
</Modal>


    </footer>
  );
}
