'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertTriangle,
  TrendingDown,
  Phone,
  FileText,
  Activity,
  Brain,
  ChevronRight,
  MapPin,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Heart,
  MessageSquare,
  TrendingUp,
  Zap,
  Droplet,
  Shield,
  UserCheck
} from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex items-center justify-center">
        <Card className="shadow-xl border-0 max-w-md">
          <CardContent className="py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">가구를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-6">요청하신 가구 정보가 존재하지 않습니다.</p>
            <Link href="/households">
              <Button variant="outline" className="hover:bg-primary hover:text-white transition-all">
                <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                목록으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* 헤더 - 그라데이션 디자인 */}
      <header className="bg-gradient-sejong text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-fade-in">
            <Link
              href="/households"
              className="inline-flex items-center text-sm text-white/90 hover:text-white mb-4 transition-colors group"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
              목록으로 돌아가기
            </Link>

            <div className="flex items-center justify-between gap-6">
              {/* 왼쪽: 가구 정보 */}
              <div className="flex items-center gap-6">
                {/* 위험도 원형 프로그레스 */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg className="transform -rotate-90 w-28 h-28">
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="white"
                      strokeOpacity="0.2"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="white"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(household.riskScore / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold font-tabular">{household.riskScore}</div>
                    <div className="text-xs text-white/80">위험도</div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold font-tabular">
                      {household.householdId}
                    </h1>
                    <Badge
                      className={`${
                        household.riskLevel === 'RED'
                          ? 'bg-white/20 text-white border-white/30'
                          : household.riskLevel === 'ORANGE'
                          ? 'bg-white/20 text-white border-white/30'
                          : household.riskLevel === 'YELLOW'
                          ? 'bg-white/20 text-white border-white/30'
                          : 'bg-white/20 text-white border-white/30'
                      } px-4 py-2 text-base backdrop-blur-sm`}
                    >
                      {getRiskLevelText(household.riskLevel)}
                    </Badge>
                    {household.aiAnalysis.urgency === 'CRITICAL' && (
                      <Badge className="bg-red-500 text-white border-0 px-4 py-2 text-base animate-pulse-slow shadow-lg">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        긴급
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-white/90">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-white/70" />
                      <span className="text-sm">{household.region} {household.dong}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-white/70" />
                      <span className="text-sm">{household.householdType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-white/70" />
                      <span className="text-sm">{household.age}세 {household.gender}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-white/70" />
                      <span className="text-sm">마지막 연락: {formatDate(household.lastContact, 'PP')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 빠른 액션 */}
              <div className="hidden lg:flex flex-col gap-3">
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-md shadow-lg transition-all hover:scale-105">
                  <Phone className="h-4 w-4 mr-2" />
                  긴급 연락
                </Button>
                <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md transition-all hover:scale-105">
                  <FileText className="h-4 w-4 mr-2" />
                  개입 기록 작성
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 긴급 알림 - 개선된 디자인 */}
        {household.riskScore >= 70 && (
          <Card className="mb-6 border-0 bg-gradient-to-r from-red-50 via-orange-50 to-red-50 shadow-xl animate-slide-down">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-risk-critical flex items-center justify-center shadow-lg animate-pulse-slow">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-red-900 text-xl">긴급 개입 필요</h3>
                    <Badge className="bg-red-600 text-white border-0">최우선 처리</Badge>
                  </div>
                  <p className="text-red-800 mb-4 leading-relaxed text-base">
                    {household.aiAnalysis.summary}
                  </p>
                  {household.aiAnalysis.predictedCrisisDate && (
                    <div className="mb-4 p-3 bg-white/50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 text-sm text-red-900">
                        <Calendar className="h-4 w-4" />
                        <span className="font-semibold">예상 위기 시점:</span>
                        <span>{household.aiAnalysis.predictedCrisisDate}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button className="bg-gradient-risk-critical hover:opacity-90 text-white shadow-lg transition-all hover:scale-105">
                      <Phone className="h-4 w-4 mr-2" />
                      즉시 연락
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 transition-all">
                      <FileText className="h-4 w-4 mr-2" />
                      개입 기록 작성
                    </Button>
                    <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 transition-all">
                      <Shield className="h-4 w-4 mr-2" />
                      보호 조치 신청
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
            {/* AI 분석 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-white animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Brain className="h-5 w-5" />
                      </div>
                      AI 종합 분석
                    </CardTitle>
                    <CardDescription className="text-white/90 mt-2">
                      Anthropic Claude 4.0 Sonnet 기반 실시간 위험도 분석
                    </CardDescription>
                  </div>
                  {aiAnalysis && (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <Activity className="h-3 w-3 mr-1" />
                      분석 완료
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {!aiAnalysis ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <Brain className="h-10 w-10 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      AI 심층 분석을 시작하세요
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                      최신 Claude 4.0 모델이 가구의 위험 요인, 패턴, 예측을 종합적으로 분석합니다
                    </p>
                    <Button
                      onClick={generateAIAnalysis}
                      disabled={isLoadingAI}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white shadow-lg transition-all hover:scale-105"
                      size="lg"
                    >
                      {isLoadingAI ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          AI 분석 생성 중...
                        </>
                      ) : (
                        <>
                          <Brain className="h-5 w-5 mr-2" />
                          Claude AI로 심층 분석하기
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="prose prose-sm max-w-none bg-white rounded-lg p-6 border border-purple-100">
                      <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {aiAnalysis}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        onClick={generateAIAnalysis}
                        variant="outline"
                        size="sm"
                        disabled={isLoadingAI}
                        className="hover:bg-purple-50 transition-all"
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        재분석
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 사용량 추이 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Droplet className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <CardTitle>전력/수도 사용량 추이</CardTitle>
                    <CardDescription>최근 6개월 사용 패턴 분석</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" label={{ value: '전력(kWh)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: '수도(m³)', angle: 90, position: 'insideRight', style: { fontSize: 12 } }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line yAxisId="left" type="monotone" dataKey="전력" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} activeDot={{ r: 6 }} />
                    <Line yAxisId="right" type="monotone" dataKey="수도" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>

                {household.electricityUsage.filter(e => e.overdue).length > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-l-yellow-500 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                        <TrendingDown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-900 mb-1">
                          사용량 이상 패턴 감지
                        </div>
                        <div className="text-sm text-yellow-800">
                          사용량 급감 및 체납 발생: <span className="font-bold">{household.electricityUsage.filter(e => e.overdue).length}개월</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 위험 요인 분석 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>위험 요인별 분포</CardTitle>
                    <CardDescription>4가지 핵심 위험 요인 평가</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskFactorsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  {riskFactorsData.map((factor, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                        <span className="text-sm font-bold font-tabular">{factor.value}%</span>
                      </div>
                      <Progress value={factor.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 상담 기록 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <CardTitle>상담 이력</CardTitle>
                      <CardDescription>
                        총 <span className="font-semibold font-tabular">{household.counselingRecords.length}건</span>의 상담 기록
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-indigo-300 text-indigo-700">
                    <Calendar className="h-3 w-3 mr-1" />
                    최근 순
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {household.counselingRecords.map((record, i) => (
                    <div key={i} className="group relative p-4 border-l-4 border-indigo-500 bg-gradient-to-r from-indigo-50/50 to-white rounded-r-lg hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-indigo-600">{i + 1}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{record.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDate(record.date, 'PPP')}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {record.category.map((cat, j) => (
                          <Badge key={j} variant="outline" className="border-indigo-200 text-indigo-700">
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{record.summary}</p>

                      <div className="flex flex-wrap gap-2">
                        {record.keywords.map((keyword, j) => (
                          <span key={j} className="text-xs px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                            #{keyword}
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
            {/* 권장 조치 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">AI 권장 조치</CardTitle>
                    <CardDescription className="text-white/80 text-xs">우선순위 순</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {household.aiAnalysis.recommendedActions.map((action, i) => (
                    <div key={i} className="group flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:shadow-md transition-all hover:-translate-y-1">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center text-sm font-bold shadow-md group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-900 leading-relaxed pt-1">{action}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 기본 정보 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <CardTitle>기본 정보</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <dt className="text-sm font-medium text-gray-600">등록일</dt>
                    </div>
                    <dd className="text-sm font-semibold text-gray-900">{formatDate(household.registeredAt, 'PP')}</dd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <dt className="text-sm font-medium text-gray-600">마지막 연락</dt>
                    </div>
                    <dd className="text-sm font-semibold text-gray-900">{formatDate(household.lastContact, 'PP')}</dd>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <dt className="text-sm font-medium text-gray-600">건강보험료</dt>
                    </div>
                    <dd className="text-base font-bold text-gray-900 font-tabular ml-6">
                      {formatCurrency(household.healthInsurance.premium)}
                      {household.healthInsurance.overdue && (
                        <Badge className="ml-2 bg-red-500 text-white">체납</Badge>
                      )}
                    </dd>
                  </div>
                  {household.healthInsurance.overdue && (
                    <div className="p-3 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <dt className="text-sm font-medium text-red-700">체납액</dt>
                      </div>
                      <dd className="text-lg font-bold text-red-600 font-tabular ml-6">
                        {formatCurrency(household.healthInsurance.arrears)}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* 통화 패턴 - 개선된 디자인 */}
            <Card className="shadow-lg border-0 hover-lift">
              <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <CardTitle>통화 패턴</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <dt className="text-sm font-medium text-gray-600">월 평균 통화</dt>
                      <dd className="text-lg font-bold text-gray-900 font-tabular">{household.callPattern.totalCalls}회</dd>
                    </div>
                    <Progress value={(household.callPattern.totalCalls / 100) * 100} className="h-2" />
                  </div>

                  <div className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className={`h-4 w-4 ${household.callPattern.frequencyChange < -0.3 ? 'text-red-500 rotate-180' : 'text-green-500'}`} />
                        <dt className="text-sm font-medium text-gray-600">빈도 변화</dt>
                      </div>
                      <dd className={`text-lg font-bold font-tabular ${household.callPattern.frequencyChange < -0.3 ? 'text-red-600' : 'text-green-600'}`}>
                        {household.callPattern.frequencyChange > 0 ? '+' : ''}{Math.round(household.callPattern.frequencyChange * 100)}%
                      </dd>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <dt className="text-sm font-medium text-red-700">응급 통화 (119)</dt>
                      </div>
                      <dd className="text-lg font-bold text-red-600 font-tabular">
                        {household.callPattern.emergencyCalls['119']}회
                        {household.callPattern.emergencyCalls['119'] > 0 && (
                          <Badge className="ml-2 bg-red-500 text-white text-xs">주의</Badge>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <dt className="text-sm font-medium text-purple-700">사회적 통화</dt>
                      </div>
                      <dd className="text-lg font-bold text-purple-600 font-tabular">
                        {Math.round(household.callPattern.socialCallsRatio * 100)}%
                      </dd>
                    </div>
                    <Progress value={household.callPattern.socialCallsRatio * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 의료 이용 - 개선된 디자인 */}
            {household.medicalHistory.length > 0 && (
              <Card className="shadow-lg border-0 hover-lift">
                <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <CardTitle>최근 의료 이용</CardTitle>
                  </div>
                  <CardDescription className="mt-1">
                    총 <span className="font-semibold font-tabular">{household.medicalHistory.length}건</span> 기록
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {household.medicalHistory.map((record, i) => (
                      <div key={i} className="p-3 border-l-4 border-red-400 bg-gradient-to-r from-red-50/50 to-white rounded-r-lg hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600">{i + 1}</span>
                          </div>
                          <div className="font-semibold text-gray-900 text-sm">{record.type}</div>
                        </div>
                        <div className="text-sm text-gray-700 ml-8 mb-1">{record.reason}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 ml-8">
                          <Clock className="h-3 w-3" />
                          {formatDate(record.date, 'PPP')}
                        </div>
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
