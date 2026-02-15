// components/Footer.tsx
import Link from "next/link";
import Image from "next/image"
export default function Footer() {
  return (
    <footer
      className="text-white py-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/footer.jpg')" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Лого и название */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
           <div className="w-20 h-20 relative rounded-full overflow-hidden">
                      <Image
                        src="/logo.png"
                        alt="GameHub Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
        </div>

        {/* Навигация */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-green-500 transition">Главная</Link>
          <Link href="/games" className="hover:text-green-500 transition">Игры</Link>
          <Link href="/about" className="hover:text-green-500 transition">О нас</Link>
          <Link href="/contact" className="hover:text-green-500 transition">Контакты</Link>
        </div>

      </div>

      {/* Нижняя строка */}
      <div className="mt-6 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Game Hub. Все права защищены.
      </div>
    </footer>
  );
}
