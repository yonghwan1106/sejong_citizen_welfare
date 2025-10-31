import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '세종시 위기가구 선제 발굴 AI 플랫폼 - 세종시사회복지서비스원 2025년 시민복지아이디어 공모전 출품작',
  description: '빅데이터와 AI 기반 잠재적 위기가구 선제 발굴 시스템 - 세종시사회복지서비스원 2025년 시민복지아이디어 공모전 출품작',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
