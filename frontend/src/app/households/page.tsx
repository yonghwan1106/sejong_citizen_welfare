'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Search,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Activity,
  ChevronRight,
  FileText
} from 'lucide-react';
import type { Household, RiskLevel } from '@/types/household';
import { formatRelativeTime, getRiskLevelColor, getRiskLevelText } from '@/lib/utils';

// 목업 데이터 로드 (실제로는 API에서 가져올 것)
import householdsData from '../../../public/data/mock-households.json';

const households = householdsData as Household[];

export default function HouseholdsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'riskScore' | 'lastContact'>('riskScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // 필터링 및 정렬
  const filteredHouseholds = useMemo(() => {
    let result = [...households];

    // 검색
    if (searchTerm) {
      result = result.filter(h =>
        h.householdId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.region.includes(searchTerm) ||
        h.dong.includes(searchTerm)
      );
    }

    // 위험도 필터
    if (filterRisk !== 'ALL') {
      result = result.filter(h => h.riskLevel === filterRisk);
    }

    // 정렬
    result.sort((a, b) => {
      if (sortBy === 'riskScore') {
        return sortOrder === 'desc' ? b.riskScore - a.riskScore : a.riskScore - b.riskScore;
      } else {
        const dateA = new Date(a.lastContact).getTime();
        const dateB = new Date(b.lastContact).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      }
    });

    return result;
  }, [searchTerm, filterRisk, sortBy, sortOrder]);

  const stats = useMemo(() => {
    return {
      total: filteredHouseholds.length,
      critical: filteredHouseholds.filter(h => h.riskLevel === 'RED').length,
      high: filteredHouseholds.filter(h => h.riskLevel === 'ORANGE').length,
      medium: filteredHouseholds.filter(h => h.riskLevel === 'YELLOW').length,
      low: filteredHouseholds.filter(h => h.riskLevel === 'GREEN').length,
    };
  }, [filteredHouseholds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* 헤더 - 그라데이션 배경 */}
      <header className="bg-gradient-sejong text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="animate-fade-in">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-white/90 hover:text-white mb-3 transition-colors group"
              >
                <ChevronRight className="h-4 w-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
                대시보드로 돌아가기
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    위험 가구 목록
                  </h1>
                  <p className="text-white/90 text-sm mt-1 flex items-center gap-2">
                    <Activity className="h-3 w-3 inline" />
                    실시간 모니터링 · 총 {stats.total}가구 분석 완료
                  </p>
                </div>
              </div>
            </div>

            {/* 통계 요약 카드 */}
            <div className="hidden lg:flex gap-3 animate-slide-in-right">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 border border-white/20">
                <div className="text-white/80 text-xs mb-1">긴급 개입 필요</div>
                <div className="text-2xl font-bold text-white font-tabular">
                  {stats.critical + stats.high}
                </div>
                <div className="text-white/60 text-xs mt-1">가구</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 border border-white/20">
                <div className="text-white/80 text-xs mb-1">평균 위험도</div>
                <div className="text-2xl font-bold text-white font-tabular">
                  {Math.round(filteredHouseholds.reduce((acc, h) => acc + h.riskScore, 0) / filteredHouseholds.length || 0)}
                </div>
                <div className="text-white/60 text-xs mt-1">점</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 및 검색 - 개선된 디자인 */}
        <Card className="mb-6 shadow-lg border-0 animate-slide-up">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">필터 및 검색</CardTitle>
            </div>
            <CardDescription className="mt-1">
              {stats.total}개 가구 중 {filteredHouseholds.length}개 표시 중
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 검색 - 새 Input 컴포넌트 사용 */}
              <div className="md:col-span-2">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder="가구 ID, 지역, 동 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 border-2 focus:border-primary"
                  />
                </div>
              </div>

              {/* 위험도 필터 - Select 컴포넌트 사용 */}
              <div>
                <Select value={filterRisk} onValueChange={(value) => setFilterRisk(value as RiskLevel | 'ALL')}>
                  <SelectTrigger className="h-10 border-2">
                    <SelectValue placeholder="위험도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">전체 위험도</SelectItem>
                    <SelectItem value="RED">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        매우 높음
                      </span>
                    </SelectItem>
                    <SelectItem value="ORANGE">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        높음
                      </span>
                    </SelectItem>
                    <SelectItem value="YELLOW">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        보통
                      </span>
                    </SelectItem>
                    <SelectItem value="GREEN">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        낮음
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 정렬 - Select 컴포넌트 사용 */}
              <div>
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [newSortBy, newSortOrder] = value.split('-') as [typeof sortBy, typeof sortOrder];
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                >
                  <SelectTrigger className="h-10 border-2">
                    <SelectValue placeholder="정렬 방식" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="riskScore-desc">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3" />
                        위험도 높은 순
                      </span>
                    </SelectItem>
                    <SelectItem value="riskScore-asc">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 rotate-180" />
                        위험도 낮은 순
                      </span>
                    </SelectItem>
                    <SelectItem value="lastContact-desc">
                      <span className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        최근 연락 순
                      </span>
                    </SelectItem>
                    <SelectItem value="lastContact-asc">
                      <span className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        오래된 연락 순
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 빠른 필터 버튼 - 개선된 디자인 */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
              <Button
                variant={filterRisk === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('ALL')}
                className="transition-all hover:scale-105"
              >
                <Users className="h-3 w-3 mr-2" />
                전체 <span className="ml-1 font-tabular">({households.length})</span>
              </Button>
              <Button
                variant={filterRisk === 'RED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('RED')}
                className={`transition-all hover:scale-105 ${
                  filterRisk === 'RED'
                    ? 'bg-gradient-risk-critical hover:bg-gradient-risk-critical'
                    : 'hover:border-red-500 hover:text-red-600'
                }`}
              >
                <AlertTriangle className="h-3 w-3 mr-2" />
                매우 높음 <span className="ml-1 font-tabular">({households.filter(h => h.riskLevel === 'RED').length})</span>
              </Button>
              <Button
                variant={filterRisk === 'ORANGE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('ORANGE')}
                className={`transition-all hover:scale-105 ${
                  filterRisk === 'ORANGE'
                    ? 'bg-gradient-risk-high hover:bg-gradient-risk-high'
                    : 'hover:border-orange-500 hover:text-orange-600'
                }`}
              >
                높음 <span className="ml-1 font-tabular">({households.filter(h => h.riskLevel === 'ORANGE').length})</span>
              </Button>
              <Button
                variant={filterRisk === 'YELLOW' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('YELLOW')}
                className={`transition-all hover:scale-105 ${
                  filterRisk === 'YELLOW'
                    ? 'bg-gradient-risk-medium hover:bg-gradient-risk-medium'
                    : 'hover:border-yellow-500 hover:text-yellow-600'
                }`}
              >
                보통 <span className="ml-1 font-tabular">({households.filter(h => h.riskLevel === 'YELLOW').length})</span>
              </Button>
              <Button
                variant={filterRisk === 'GREEN' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('GREEN')}
                className={`transition-all hover:scale-105 ${
                  filterRisk === 'GREEN'
                    ? 'bg-gradient-risk-low hover:bg-gradient-risk-low'
                    : 'hover:border-green-500 hover:text-green-600'
                }`}
              >
                낮음 <span className="ml-1 font-tabular">({households.filter(h => h.riskLevel === 'GREEN').length})</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 가구 목록 - 완전히 새로운 디자인 */}
        <div className="space-y-4">
          {filteredHouseholds.map((household, index) => {
            const getBorderColor = () => {
              if (household.riskScore >= 80) return 'border-l-red-500 bg-gradient-to-r from-red-50/50 to-white';
              if (household.riskScore >= 60) return 'border-l-orange-500 bg-gradient-to-r from-orange-50/50 to-white';
              if (household.riskScore >= 30) return 'border-l-yellow-500 bg-gradient-to-r from-yellow-50/50 to-white';
              return 'border-l-green-500 bg-gradient-to-r from-green-50/50 to-white';
            };

            const getProgressColor = () => {
              if (household.riskScore >= 80) return 'bg-gradient-risk-critical';
              if (household.riskScore >= 60) return 'bg-gradient-risk-high';
              if (household.riskScore >= 30) return 'bg-gradient-risk-medium';
              return 'bg-gradient-risk-low';
            };

            return (
              <Link
                key={household.id}
                href={`/households/${household.id}`}
                className="block stagger-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className={`hover-lift card-glow border-l-4 ${getBorderColor()} cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-6">
                      {/* 왼쪽: 위험도 스코어 - 원형 프로그레스 */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24">
                          {/* 배경 원 */}
                          <svg className="transform -rotate-90 w-24 h-24">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              className="text-gray-200"
                            />
                            {/* 진행 원 */}
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={`${(household.riskScore / 100) * 251.2} 251.2`}
                              className={
                                household.riskScore >= 80 ? 'text-red-500' :
                                household.riskScore >= 60 ? 'text-orange-500' :
                                household.riskScore >= 30 ? 'text-yellow-500' :
                                'text-green-500'
                              }
                              strokeLinecap="round"
                            />
                          </svg>
                          {/* 중앙 점수 */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <div className={`text-2xl font-bold font-tabular ${
                              household.riskScore >= 80 ? 'text-red-600' :
                              household.riskScore >= 60 ? 'text-orange-600' :
                              household.riskScore >= 30 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {household.riskScore}
                            </div>
                            <div className="text-xs text-muted-foreground">위험도</div>
                          </div>
                        </div>
                      </div>

                      {/* 중앙: 가구 정보 */}
                      <div className="flex-1 min-w-0">
                        {/* 제목 및 배지 */}
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900 font-tabular">
                            {household.householdId}
                          </h3>
                          <Badge
                            className={`${
                              household.riskLevel === 'RED' ? 'badge-critical' :
                              household.riskLevel === 'ORANGE' ? 'badge-high' :
                              household.riskLevel === 'YELLOW' ? 'badge-medium' :
                              'badge-low'
                            } px-3 py-1`}
                          >
                            {getRiskLevelText(household.riskLevel)}
                          </Badge>
                          {household.aiAnalysis.urgency === 'CRITICAL' && (
                            <Badge className="bg-gradient-risk-critical text-white border-0 px-3 py-1 animate-pulse-slow shadow-lg">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              긴급 개입 필요
                            </Badge>
                          )}
                        </div>

                        {/* 기본 정보 아이콘 포함 */}
                        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{household.region}</span>
                            <span className="text-muted-foreground">{household.dong}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span>{household.householdType}</span>
                            <span className="text-muted-foreground">·</span>
                            <span>{household.age}세 {household.gender}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4 text-green-500" />
                            <span className="text-muted-foreground">마지막 연락:</span>
                            <span className="font-medium">{formatRelativeTime(household.lastContact)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="h-4 w-4 text-orange-500" />
                            <span className="text-muted-foreground">총 통화:</span>
                            <span className="font-medium font-tabular">{household.callPattern.totalCalls}회</span>
                          </div>
                        </div>

                        {/* 위험 요인 프로그레스 바 */}
                        <div className="space-y-2 mt-4">
                          <div className="text-xs font-semibold text-gray-700 mb-2">주요 위험 요인</div>
                          {Object.entries(household.riskFactors)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 3)
                            .map(([key, value]) => {
                              const labels = {
                                economic: { name: '경제적 위험', icon: '💰', color: 'bg-blue-500' },
                                health: { name: '건강 위험', icon: '🏥', color: 'bg-red-500' },
                                psychological: { name: '심리적 위험', icon: '🧠', color: 'bg-purple-500' },
                                social: { name: '사회적 위험', icon: '👥', color: 'bg-green-500' },
                              };
                              const label = labels[key as keyof typeof labels];
                              return (
                                <div key={key} className="flex items-center gap-3">
                                  <span className="text-sm w-28 text-gray-600">
                                    {label.icon} {label.name}
                                  </span>
                                  <div className="flex-1">
                                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full ${label.color} transition-all duration-500 rounded-full`}
                                        style={{ width: `${value * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold font-tabular w-12 text-right text-gray-700">
                                    {Math.round(value * 100)}%
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>

                      {/* 오른쪽: 액션 버튼 */}
                      <div className="flex-shrink-0 flex flex-col items-end gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="group hover:bg-primary hover:text-white transition-all hover:shadow-md"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          상세보기
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        {household.aiAnalysis.recommendedActions.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Activity className="h-3 w-3 mr-1" />
                            {household.aiAnalysis.recommendedActions.length}개 권장 조치
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* AI 예측 경고 (고위험 가구만) */}
                    {household.riskScore >= 70 && household.aiAnalysis.predictedCrisisDate && (
                      <div className="mt-5 pt-5 border-t border-gray-200">
                        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500 rounded-r-lg">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-risk-critical flex items-center justify-center shadow-md">
                            <AlertTriangle className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-red-900 text-sm mb-1 flex items-center gap-2">
                              <Activity className="h-4 w-4" />
                              AI 위기 예측
                            </div>
                            <div className="text-sm text-red-800 font-medium mb-2">
                              {household.aiAnalysis.predictedCrisisDate}까지 위기 발생 가능성 높음
                            </div>
                            <div className="text-sm text-gray-700 leading-relaxed">
                              {household.aiAnalysis.summary}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* 검색 결과 없음 - 개선된 Empty State */}
        {filteredHouseholds.length === 0 && (
          <Card className="shadow-lg border-0 animate-fade-in">
            <CardContent className="py-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Search className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  검색 결과가 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  입력한 조건에 맞는 가구를 찾을 수 없습니다.
                  <br />
                  다른 검색어나 필터를 시도해보세요.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterRisk('ALL');
                  }}
                  className="hover:bg-primary hover:text-white transition-all"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  필터 초기화
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
