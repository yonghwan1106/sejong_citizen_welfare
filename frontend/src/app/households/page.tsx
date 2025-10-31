'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUpDown, Filter, Search } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
                ← 대시보드로 돌아가기
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                위험 가구 목록
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                총 {stats.total}가구 · 긴급 개입 필요 {stats.critical + stats.high}가구
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 및 검색 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">필터 및 검색</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 검색 */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="가구 ID, 지역 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* 위험도 필터 */}
              <div>
                <select
                  value={filterRisk}
                  onChange={(e) => setFilterRisk(e.target.value as RiskLevel | 'ALL')}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ALL">전체 위험도</option>
                  <option value="RED">매우 높음</option>
                  <option value="ORANGE">높음</option>
                  <option value="YELLOW">보통</option>
                  <option value="GREEN">낮음</option>
                </select>
              </div>

              {/* 정렬 */}
              <div>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                  }}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="riskScore-desc">위험도 높은 순</option>
                  <option value="riskScore-asc">위험도 낮은 순</option>
                  <option value="lastContact-desc">최근 연락 순</option>
                  <option value="lastContact-asc">오래된 연락 순</option>
                </select>
              </div>
            </div>

            {/* 빠른 필터 버튼 */}
            <div className="flex gap-2 mt-4">
              <Button
                variant={filterRisk === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('ALL')}
              >
                전체 ({households.length})
              </Button>
              <Button
                variant={filterRisk === 'RED' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('RED')}
                className={filterRisk === 'RED' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                매우 높음 ({households.filter(h => h.riskLevel === 'RED').length})
              </Button>
              <Button
                variant={filterRisk === 'ORANGE' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('ORANGE')}
                className={filterRisk === 'ORANGE' ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                높음 ({households.filter(h => h.riskLevel === 'ORANGE').length})
              </Button>
              <Button
                variant={filterRisk === 'YELLOW' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('YELLOW')}
                className={filterRisk === 'YELLOW' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              >
                보통 ({households.filter(h => h.riskLevel === 'YELLOW').length})
              </Button>
              <Button
                variant={filterRisk === 'GREEN' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRisk('GREEN')}
                className={filterRisk === 'GREEN' ? 'bg-green-600 hover:bg-green-700' : ''}
              >
                낮음 ({households.filter(h => h.riskLevel === 'GREEN').length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 가구 목록 */}
        <div className="space-y-3">
          {filteredHouseholds.map((household) => (
            <Link
              key={household.id}
              href={`/households/${household.id}`}
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* 왼쪽: 가구 정보 */}
                    <div className="flex items-center gap-6">
                      {/* 위험도 점수 */}
                      <div className="flex-shrink-0">
                        <div className={`
                          w-20 h-20 rounded-full flex flex-col items-center justify-center font-bold
                          ${household.riskScore >= 80 ? 'bg-red-100 text-red-700' :
                            household.riskScore >= 60 ? 'bg-orange-100 text-orange-700' :
                            household.riskScore >= 30 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'}
                        `}>
                          <div className="text-2xl">{household.riskScore}</div>
                          <div className="text-xs">점</div>
                        </div>
                      </div>

                      {/* 가구 상세 */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {household.householdId}
                          </span>
                          <Badge variant={
                            household.riskLevel === 'RED' ? 'critical' :
                            household.riskLevel === 'ORANGE' ? 'high' :
                            household.riskLevel === 'YELLOW' ? 'medium' : 'low'
                          }>
                            {getRiskLevelText(household.riskLevel)}
                          </Badge>
                          {household.aiAnalysis.urgency === 'CRITICAL' && (
                            <Badge className="bg-red-600 text-white animate-pulse">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              긴급
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{household.region} {household.dong}</span>
                          <span>·</span>
                          <span>{household.householdType}</span>
                          <span>·</span>
                          <span>{household.age}세 {household.gender}</span>
                          <span>·</span>
                          <span>마지막 연락: {formatRelativeTime(household.lastContact)}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="font-medium">주요 위험 요인:</span>
                          {' '}
                          {Object.entries(household.riskFactors)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 2)
                            .map(([key, value]) => {
                              const labels = {
                                economic: '경제',
                                health: '건강',
                                psychological: '심리',
                                social: '사회',
                              };
                              return `${labels[key as keyof typeof labels]} (${Math.round(value * 100)}%)`;
                            })
                            .join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽: 액션 버튼 */}
                    <div className="flex-shrink-0">
                      <Button variant="outline" size="sm">
                        자세히 보기 →
                      </Button>
                    </div>
                  </div>

                  {/* 경고 메시지 (고위험 가구) */}
                  {household.riskScore >= 70 && household.aiAnalysis.predictedCrisisDate && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-red-900 text-sm">
                            AI 예측: {household.aiAnalysis.predictedCrisisDate}까지 위기 발생 가능성 높음
                          </div>
                          <div className="text-sm text-red-700 mt-1">
                            {household.aiAnalysis.summary}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredHouseholds.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
