import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Users, TrendingUp, Bell, ArrowUp, ArrowDown, Activity, Shield, Info } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

// 목업 통계 데이터
const stats = {
  totalHouseholds: 120,
  criticalRisk: 22,
  highRisk: 36,
  mediumRisk: 43,
  lowRisk: 19,
  interventionsToday: 8,
  interventionsThisWeek: 34,
  crisisPrevented: 156,
  changePercent: {
    total: 5.2,
    critical: 12.5,
    interventions: 8.3,
    prevented: 32.1,
  },
};

const recentAlerts = [
  {
    id: 'hh_001',
    householdId: '2024-SJ-0001',
    region: '조치원읍 신흥리',
    riskScore: 85,
    type: '복합 위기',
    time: '5분 전',
    urgency: 'CRITICAL',
  },
  {
    id: 'hh_023',
    householdId: '2024-SJ-0023',
    region: '한솔동',
    riskScore: 82,
    type: '경제 위기',
    time: '1시간 전',
    urgency: 'HIGH',
  },
  {
    id: 'hh_045',
    householdId: '2024-SJ-0045',
    region: '나성동',
    riskScore: 78,
    type: '건강 악화',
    time: '2시간 전',
    urgency: 'HIGH',
  },
];

export default function Home() {
  const totalRisk = stats.criticalRisk + stats.highRisk;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* 개선된 헤더 with 그라디언트 */}
      <header className="bg-gradient-sejong text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="animate-fade-in">
              <div className="mb-2">
                <Badge className="bg-white/30 text-white border-white/50 backdrop-blur-sm px-3 py-1 text-xs font-medium">
                  세종시사회복지서비스원 2025년 시민복지아이디어 공모전 출품작
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">
                세종시 위기가구 선제 발굴 AI 플랫폼
              </h1>
              <p className="text-blue-100 mt-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                세종시사회서비스원 복지 담당자 대시보드
              </p>
            </div>
            <div className="flex items-center gap-4 animate-slide-in-right">
              <Link href="/about">
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm transition-all hover:scale-105">
                  <Info className="h-4 w-4 mr-2" />
                  프로젝트 소개
                </Button>
              </Link>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 animate-pulse-slow">
                <Activity className="h-3 w-3 mr-2 inline" />
                실시간 모니터링 중
              </Badge>
              <div className="text-sm text-blue-100">
                <div className="font-semibold">마지막 업데이트</div>
                <div className="text-xs">방금 전</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 향상된 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* 총 관리 가구 */}
          <Card className="hover-lift card-glow border-l-4 border-l-blue-500 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                총 관리 가구
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.totalHouseholds}</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">+{stats.changePercent.total}%</span>
                <span className="text-gray-500 ml-1">전월 대비</span>
              </div>
              <Progress value={75} className="mt-3 h-2" />
            </CardContent>
          </Card>

          {/* 긴급 개입 필요 */}
          <Card className="hover-lift border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 to-white animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-900">
                긴급 개입 필요
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900 font-tabular">
                {totalRisk}
              </div>
              <div className="flex items-center text-xs text-red-700 mt-2">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">+{stats.changePercent.critical}%</span>
                <span className="text-gray-600 ml-1">매우 높음 {stats.criticalRisk} · 높음 {stats.highRisk}</span>
              </div>
              <Progress value={85} className="mt-3 h-2 bg-red-100" />
            </CardContent>
          </Card>

          {/* 금주 개입 건수 */}
          <Card className="hover-lift card-glow border-l-4 border-l-green-500 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                금주 개입 건수
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.interventionsThisWeek}</div>
              <div className="flex items-center text-xs text-green-600 mt-2">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">+{stats.changePercent.interventions}%</span>
                <span className="text-gray-500 ml-1">오늘 {stats.interventionsToday}건</span>
              </div>
              <Progress value={60} className="mt-3 h-2" />
            </CardContent>
          </Card>

          {/* 위기 예방 성공 */}
          <Card className="hover-lift border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">
                위기 예방 성공
              </CardTitle>
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Bell className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 font-tabular">
                {stats.crisisPrevented}
              </div>
              <div className="flex items-center text-xs text-purple-700 mt-2">
                <ArrowUp className="h-3 w-3 mr-1" />
                <span className="font-semibold">+{stats.changePercent.prevented}%</span>
                <span className="text-gray-600 ml-1">전년 대비</span>
              </div>
              <Progress value={90} className="mt-3 h-2 bg-purple-100" />
            </CardContent>
          </Card>
        </div>

        {/* 개선된 실시간 알림 섹션 */}
        <Card className="mb-8 shadow-xl animate-slide-up overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                    <AlertTriangle className="h-5 w-5 text-white" />
                  </div>
                  실시간 알림
                </CardTitle>
                <CardDescription className="mt-2 text-white/90">
                  고위험 가구가 감지되었습니다. 긴급 개입을 검토해주세요.
                </CardDescription>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                {recentAlerts.length}건 대기 중
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <Link
                  key={alert.id}
                  href={`/households/${alert.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border-2 border-gray-100 hover:border-red-200 hover:shadow-lg transition-all hover:-translate-y-1 stagger-item">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-risk-critical flex items-center justify-center shadow-lg">
                          <div className="text-center">
                            <div className="text-white font-bold text-lg">{alert.riskScore}</div>
                            <div className="text-white text-[10px]">점</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                          {alert.householdId}
                          {alert.urgency === 'CRITICAL' && (
                            <Badge className="bg-red-600 text-white text-xs animate-pulse">
                              긴급
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {alert.region} · {alert.type}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500">
                        {alert.time}
                      </div>
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        자세히 보기
                        <ArrowUp className="h-4 w-4 rotate-45" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 위험도별 분포 및 빠른 액션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 개선된 위험도별 가구 분포 */}
          <Card className="animate-slide-up shadow-lg">
            <CardHeader>
              <CardTitle>위험도별 가구 분포</CardTitle>
              <CardDescription>
                AI 예측 기반 위험 등급 분류
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* RED */}
                <div className="group hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-risk-critical shadow-md"></div>
                      <span className="font-semibold">매우 높음 (RED)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-red-600 font-tabular">{stats.criticalRisk}</span>
                      <span className="text-sm text-gray-500">가구</span>
                    </div>
                  </div>
                  <Progress
                    value={(stats.criticalRisk / stats.totalHouseholds) * 100}
                    className="h-3 bg-red-100"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    전체의 {Math.round((stats.criticalRisk / stats.totalHouseholds) * 100)}%
                  </div>
                </div>

                {/* ORANGE */}
                <div className="group hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-risk-high shadow-md"></div>
                      <span className="font-semibold">높음 (ORANGE)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-orange-600 font-tabular">{stats.highRisk}</span>
                      <span className="text-sm text-gray-500">가구</span>
                    </div>
                  </div>
                  <Progress
                    value={(stats.highRisk / stats.totalHouseholds) * 100}
                    className="h-3 bg-orange-100"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    전체의 {Math.round((stats.highRisk / stats.totalHouseholds) * 100)}%
                  </div>
                </div>

                {/* YELLOW */}
                <div className="group hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-risk-medium shadow-md"></div>
                      <span className="font-semibold">보통 (YELLOW)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-yellow-600 font-tabular">{stats.mediumRisk}</span>
                      <span className="text-sm text-gray-500">가구</span>
                    </div>
                  </div>
                  <Progress
                    value={(stats.mediumRisk / stats.totalHouseholds) * 100}
                    className="h-3 bg-yellow-100"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    전체의 {Math.round((stats.mediumRisk / stats.totalHouseholds) * 100)}%
                  </div>
                </div>

                {/* GREEN */}
                <div className="group hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-risk-low shadow-md"></div>
                      <span className="font-semibold">낮음 (GREEN)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-green-600 font-tabular">{stats.lowRisk}</span>
                      <span className="text-sm text-gray-500">가구</span>
                    </div>
                  </div>
                  <Progress
                    value={(stats.lowRisk / stats.totalHouseholds) * 100}
                    className="h-3 bg-green-100"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    전체의 {Math.round((stats.lowRisk / stats.totalHouseholds) * 100)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 빠른 액션 */}
          <Card className="animate-slide-up shadow-lg" style={{animationDelay: '0.1s'}}>
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
                  className="group p-6 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center hover-lift"
                >
                  <Users className="h-10 w-10 mx-auto mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div className="font-semibold text-gray-900">전체 가구 목록</div>
                  <div className="text-xs text-gray-500 mt-1 font-tabular">
                    {stats.totalHouseholds}가구
                  </div>
                </Link>

                <Link
                  href="/households?filter=critical"
                  className="group p-6 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center hover-lift"
                >
                  <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-red-600 group-hover:scale-110 transition-transform group-hover:animate-pulse" />
                  <div className="font-semibold text-gray-900">긴급 개입 대상</div>
                  <div className="text-xs text-gray-500 mt-1 font-tabular">
                    {stats.criticalRisk}가구
                  </div>
                </Link>

                <div className="group p-6 border-2 border-dashed border-gray-200 rounded-lg opacity-60 cursor-not-allowed text-center">
                  <TrendingUp className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="font-semibold text-gray-500">개입 관리</div>
                  <div className="text-xs text-gray-400 mt-1 font-tabular">
                    {stats.interventionsThisWeek}건 (금주)
                  </div>
                  <div className="text-xs text-gray-400 mt-2">준비 중</div>
                </div>

                <div className="group p-6 border-2 border-dashed border-gray-200 rounded-lg opacity-60 cursor-not-allowed text-center">
                  <Bell className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                  <div className="font-semibold text-gray-500">분석 리포트</div>
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
