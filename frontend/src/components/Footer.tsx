export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-white mb-1">
              세종시 위기가구 선제 발굴 AI 플랫폼
            </p>
            <p className="text-xs text-gray-400">
              세종시사회복지서비스원 2025년 시민복지아이디어 공모전 출품작
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-gray-400">
              © 2025 세종시 위기가구 조기 발견 AI 플랫폼. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by Claude 4.0 Sonnet · Next.js 15
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
