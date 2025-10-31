'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Info, FileText } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '대시보드', icon: Home },
    { href: '/households', label: '가구 목록', icon: Users },
    { href: '/infographic', label: '인포그래픽', icon: FileText },
    { href: '/about', label: '프로젝트 소개', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-8">
              <div className="w-8 h-8 bg-gradient-sejong rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SJ</span>
              </div>
              <span className="font-bold text-gray-900">세종시 위기가구 AI</span>
            </Link>
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
