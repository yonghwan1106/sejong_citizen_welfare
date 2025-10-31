import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users, TrendingUp, Bell } from 'lucide-react';
import Link from 'next/link';

// 목업 통계 데이터
const stats = {
  totalHouseholds: 127,
  criticalRisk: 12,
  highRisk: 28,
  mediumRisk: 45,
  lowRisk: 42,
  interventionsToday: 8,
  interventionsThisWeek: 34,
  crisisPrevented: 156,
};

const recentAlerts = [
  {
    id: 1,
    householdId: '2024-SJ-0001',
    region: '조치원읍 신흥리',
    riskScore: 85,
    type: '복합 위기',
    time: '5분 전',
  },
  {
    id: 2,
    householdId: '2024-SJ-0023',
    region: '한솔동',
    riskScore: 82,
    type: '경제 위기',
    time: '1시간 전',
  },
  {
    id: 3,
    householdId: '2024-SJ-0045',
    region: '나성동',
    riskScore: 78,
    type: '건강 악화',
    time: '2시간 전',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                세종시 위기가구 선제 발굴 AI 플랫폼
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                세종시사회서비스원 복지 담당자 대시보드
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">
                실시간 모니터링 중
              </Badge>
              <div className="text-sm text-gray-600">
                마지막 업데이트: 방금 전
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                총 관리 가구
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalHouseholds}</div>
              <p className="text-xs text-muted-foreground mt-1">
                전월 대비 +5.2%
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900">
                긴급 개입 필요
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">
                {stats.criticalRisk + stats.highRisk}
              </div>
              <p className="text-xs text-red-700 mt-1">
                매우 높음 {stats.criticalRisk} · 높음 {stats.highRisk}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                금주 개입 건수
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.interventionsThisWeek}</div>
              <p className="text-xs text-muted-foreground mt-1">
                오늘 {stats.interventionsToday}건
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-900">
                위기 예방 성공
              </CardTitle>
              <Bell className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {stats.crisisPrevented}
              </div>
              <p className="text-xs text-green-700 mt-1">
                전년 대비 +32%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 최근 알림 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>실시간 알림</CardTitle>
            <CardDescription>
              고위험 가구가 감지되었습니다. 긴급 개입을 검토해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {alert.householdId}
                      </div>
                      <div className="text-sm text-gray-600">
                        {alert.region} · {alert.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="critical">
                      위험도: {alert.riskScore}점
                    </Badge>
                    <div className="text-sm text-gray-500">
                      {alert.time}
                    </div>
                    <Link
                      href={`/households/${alert.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 위험도별 분포 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>위험도별 가구 분포</CardTitle>
              <CardDescription>
                AI 예측 기반 위험 등급 분류
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">매우 높음 (RED)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stats.criticalRisk}</span>
                    <span className="text-sm text-gray-500">가구</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(stats.criticalRisk / stats.totalHouseholds) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm font-medium">높음 (ORANGE)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stats.highRisk}</span>
                    <span className="text-sm text-gray-500">가구</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(stats.highRisk / stats.totalHouseholds) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm font-medium">보통 (YELLOW)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stats.mediumRisk}</span>
                    <span className="text-sm text-gray-500">가구</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(stats.mediumRisk / stats.totalHouseholds) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">낮음 (GREEN)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{stats.lowRisk}</span>
                    <span className="text-sm text-gray-500">가구</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(stats.lowRisk / stats.totalHouseholds) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>빠른 액션</CardTitle>
              <CardDescription>
                주요 기능 바로가기
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/households"
                  className="p-6 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                >
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-medium">전체 가구 목록</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stats.totalHouseholds}가구
                  </div>
                </Link>

                <Link
                  href="/households?filter=critical"
                  className="p-6 border-2 border-dashed rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center"
                >
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <div className="font-medium">긴급 개입 대상</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stats.criticalRisk}가구
                  </div>
                </Link>

                <div className="p-6 border-2 border-dashed rounded-lg opacity-50 cursor-not-allowed text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="font-medium text-gray-500">개입 관리</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {stats.interventionsThisWeek}건 (금주)
                  </div>
                  <div className="text-xs text-gray-400 mt-2">준비 중</div>
                </div>

                <div className="p-6 border-2 border-dashed rounded-lg opacity-50 cursor-not-allowed text-center">
                  <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <div className="font-medium text-gray-500">분석 리포트</div>
                  <div className="text-xs text-gray-400 mt-1">
                    월간 리포트 생성
                  </div>
                  <div className="text-xs text-gray-400 mt-2">준비 중</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
