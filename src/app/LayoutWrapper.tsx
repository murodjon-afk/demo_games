'use client';

import { usePathname } from 'next/navigation';
import Header from './header';
import Footer from './footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullPage = pathname.startsWith('/full');

  return (
    <>
      {!isFullPage && <Header />}

      {children}

      {!isFullPage && <Footer />}
    </>
  );
}
