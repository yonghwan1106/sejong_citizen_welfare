'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Phone, FileText, Activity, Brain } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Household } from '@/types/household';
import { formatDate, formatCurrency, getRiskLevelText } from '@/lib/utils';

// 목업 데이터 로드
import householdsData from '../../../../public/data/mock-households.json';

const households = householdsData as Household[];

export default function HouseholdDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [household, setHousehold] = useState<Household | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  useEffect(() => {
    const found = households.find(h => h.id === resolvedParams.id);
    setHousehold(found || null);
  }, [resolvedParams.id]);

  // AI 분석 요청
  const generateAIAnalysis = async () => {
    if (!household) return;

    setIsLoadingAI(true);
    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(household),
      });

      const data = await response.json();
      setAiAnalysis(data.analysis);
    } catch (error) {
      console.error('AI Analysis Error:', error);
      setAiAnalysis('AI 분석을 생성하는 중 오류가 발생했습니다.');
    } finally {
      setIsLoadingAI(false);
    }
  };

  if (!household) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">가구를 찾을 수 없습니다</h2>
          <Link href="/households" className="text-blue-600 hover:text-blue-800">
            ← 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 차트 데이터 준비
  const usageChartData = household.electricityUsage.map((e, i) => ({
    month: e.month.slice(5),
    전력: e.usage,
    수도: household.waterUsage[i].usage,
  }));

  const riskFactorsData = [
    { name: '경제', value: Math.round(household.riskFactors.economic * 100) },
    { name: '건강', value: Math.round(household.riskFactors.health * 100) },
    { name: '심리', value: Math.round(household.riskFactors.psychological * 100) },
    { name: '사회', value: Math.round(household.riskFactors.social * 100) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link href="/households" className="text-sm text-blue-600 hover:text-blue-800 mb-2 block">
              ← 목록으로 돌아가기
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {household.householdId}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {household.region} {household.dong} · {household.householdType} · {household.age}세 {household.gender}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`
                  w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold
                  ${household.riskScore >= 80 ? 'bg-red-100 text-red-700' :
                    household.riskScore >= 60 ? 'bg-orange-100 text-orange-700' :
                    household.riskScore >= 30 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'}
                `}>
                  <div className="text-3xl">{household.riskScore}</div>
                  <div className="text-xs">위험도</div>
                </div>
                <Badge variant={
                  household.riskLevel === 'RED' ? 'critical' :
                  household.riskLevel === 'ORANGE' ? 'high' :
                  household.riskLevel === 'YELLOW' ? 'medium' : 'low'
                } className="text-lg px-4 py-2">
                  {getRiskLevelText(household.riskLevel)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 긴급 알림 */}
        {household.riskScore >= 70 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 text-lg mb-2">긴급 개입 필요</h3>
                  <p className="text-red-800 mb-3">{household.aiAnalysis.summary}</p>
                  <div className="flex gap-2">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      긴급 연락
                    </Button>
                    <Button variant="outline">
                      개입 기록 작성
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽 컬럼 */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI 종합 분석
                </CardTitle>
                <CardDescription>
                  Claude 4.0 기반 실시간 위험도 분석
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!aiAnalysis ? (
                  <div className="text-center py-8">
                    <Button
                      onClick={generateAIAnalysis}
                      disabled={isLoadingAI}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {isLoadingAI ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          AI 분석 생성 중...
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4 mr-2" />
                          Claude AI로 심층 분석하기
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 mt-3">
                      Anthropic Claude 4.0이 실시간으로 가구 데이터를 분석합니다
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700">
                      {aiAnalysis}
                    </div>
                    <Button
                      onClick={generateAIAnalysis}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      disabled={isLoadingAI}
                    >
                      재분석
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 사용량 추이 */}
            <Card>
              <CardHeader>
                <CardTitle>전력/수도 사용량 추이</CardTitle>
                <CardDescription>최근 6개월 사용 패턴</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" label={{ value: '전력(kWh)', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: '수도(m³)', angle: 90, position: 'insideRight' }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="전력" stroke="#3b82f6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="수도" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>

                {household.electricityUsage.filter(e => e.overdue).length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-900">
                        사용량 급감 및 체납 발생: {household.electricityUsage.filter(e => e.overdue).length}개월
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 위험 요인 분석 */}
            <Card>
              <CardHeader>
                <CardTitle>위험 요인별 분포</CardTitle>
                <CardDescription>4가지 핵심 위험 요인 평가</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskFactorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 상담 기록 */}
            <Card>
              <CardHeader>
                <CardTitle>상담 이력</CardTitle>
                <CardDescription>총 {household.counselingRecords.length}건의 상담 기록</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {household.counselingRecords.map((record, i) => (
                    <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900">{record.type}</span>
                        <span className="text-sm text-gray-500">{formatDate(record.date, 'PPP')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {record.category.map((cat, j) => (
                          <Badge key={j} variant="outline">{cat}</Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{record.summary}</p>
                      <div className="flex flex-wrap gap-1">
                        {record.keywords.map((keyword, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-gray-100 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="space-y-6">
            {/* 권장 조치 */}
            <Card>
              <CardHeader>
                <CardTitle>AI 권장 조치</CardTitle>
                <CardDescription>우선순위 순</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {household.aiAnalysis.recommendedActions.map((action, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-900">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">등록일</dt>
                    <dd className="mt-1 text-gray-900">{formatDate(household.registeredAt)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">마지막 연락</dt>
                    <dd className="mt-1 text-gray-900">{formatDate(household.lastContact)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">건강보험료</dt>
                    <dd className="mt-1 text-gray-900">
                      {formatCurrency(household.healthInsurance.premium)}
                      {household.healthInsurance.overdue && (
                        <Badge variant="destructive" className="ml-2">체납</Badge>
                      )}
                    </dd>
                  </div>
                  {household.healthInsurance.overdue && (
                    <div>
                      <dt className="font-medium text-gray-500">체납액</dt>
                      <dd className="mt-1 text-red-600 font-semibold">
                        {formatCurrency(household.healthInsurance.arrears)}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* 통화 패턴 */}
            <Card>
              <CardHeader>
                <CardTitle>통화 패턴</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="font-medium text-gray-500">월 평균 통화</dt>
                    <dd className="mt-1 text-gray-900">{household.callPattern.totalCalls}회</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">빈도 변화</dt>
                    <dd className={`mt-1 font-semibold ${household.callPattern.frequencyChange < -0.3 ? 'text-red-600' : 'text-green-600'}`}>
                      {household.callPattern.frequencyChange > 0 ? '+' : ''}{Math.round(household.callPattern.frequencyChange * 100)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">응급 통화 (119)</dt>
                    <dd className="mt-1 text-gray-900">
                      {household.callPattern.emergencyCalls['119']}회
                      {household.callPattern.emergencyCalls['119'] > 0 && (
                        <Badge variant="destructive" className="ml-2">주의</Badge>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-500">사회적 통화 비율</dt>
                    <dd className="mt-1 text-gray-900">
                      {Math.round(household.callPattern.socialCallsRatio * 100)}%
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* 의료 이용 */}
            {household.medicalHistory.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>최근 의료 이용</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {household.medicalHistory.map((record, i) => (
                      <div key={i} className="text-sm border-l-2 border-gray-300 pl-3 py-1">
                        <div className="font-medium text-gray-900">{record.type}</div>
                        <div className="text-gray-600">{record.reason}</div>
                        <div className="text-gray-500 text-xs">{formatDate(record.date)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
