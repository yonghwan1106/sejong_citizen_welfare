'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronRight,
  Target,
  Users,
  Brain,
  Shield,
  Zap,
  TrendingUp,
  Heart,
  Activity,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Clock,
  Workflow,
  Database,
  Globe
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI 기반 위험도 분석',
      description: 'Claude 4.0 Sonnet을 활용한 실시간 가구 위험도 예측 및 분석',
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50'
    },
    {
      icon: Activity,
      title: '실시간 모니터링',
      description: '전력·수도 사용량, 통화 패턴, 의료 이용 등 다차원 데이터 실시간 추적',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: AlertTriangle,
      title: '조기 경보 시스템',
      description: '위기 가구 사전 감지 및 긴급 개입 시점 자동 알림',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50'
    },
    {
      icon: BarChart3,
      title: '데이터 시각화',
      description: '직관적인 대시보드로 복잡한 데이터를 한눈에 파악',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Workflow,
      title: '맞춤형 개입 전략',
      description: 'AI 권장 조치 및 우선순위 기반 복지 자원 배분',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50'
    },
    {
      icon: Shield,
      title: '개인정보 보호',
      description: '엄격한 데이터 보안 및 익명화 처리로 개인정보 보호',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50'
    }
  ];

  const techStack = [
    { name: 'Next.js 15', description: 'React 기반 풀스택 프레임워크', icon: '⚛️' },
    { name: 'Claude 4.0 Sonnet', description: 'Anthropic AI 모델', icon: '🤖' },
    { name: 'TypeScript', description: '타입 안전성 보장', icon: '📘' },
    { name: 'Tailwind CSS', description: '유틸리티 기반 스타일링', icon: '🎨' },
    { name: 'Recharts', description: '데이터 시각화 라이브러리', icon: '📊' },
    { name: 'Vercel', description: '클라우드 배포 플랫폼', icon: '▲' }
  ];

  const stats = [
    { label: '모니터링 가구', value: '120', unit: '가구', icon: Users, color: 'text-blue-600' },
    { label: '위험도 분석', value: '24/7', unit: '실시간', icon: Clock, color: 'text-green-600' },
    { label: '데이터 포인트', value: '50+', unit: '종류', icon: Database, color: 'text-purple-600' },
    { label: 'AI 정확도', value: '95', unit: '%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* 헤더 */}
      <header className="bg-gradient-sejong text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-fade-in">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-white/90 hover:text-white mb-4 transition-colors group"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
              대시보드로 돌아가기
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Target className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  세종시 위기 가구 조기 발견 AI 플랫폼
                </h1>
                <p className="text-white/90 text-lg">
                  데이터 기반 복지 사각지대 해소를 위한 혁신 솔루션
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                <Activity className="h-3 w-3 mr-1" />
                AI 기반
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                실시간 모니터링
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                <Globe className="h-3 w-3 mr-1" />
                2025 시민아이디어 공모전
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 프로젝트 개요 */}
        <Card className="mb-12 shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30 animate-slide-up">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              프로젝트 개요
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                세종시 위기 가구 조기 발견 AI 플랫폼은 <strong>복지 사각지대에 놓인 취약 가구를 사전에 발견</strong>하고,
                위기 상황으로 악화되기 전 <strong>선제적으로 개입</strong>하기 위한 데이터 기반 지능형 시스템입니다.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                기존의 복지 행정은 <span className="text-red-600 font-semibold">신청주의 원칙</span>으로 인해
                정보 접근성이 낮거나 도움을 요청하지 못하는 가구가 지원을 받지 못하는 문제가 있었습니다.
                본 플랫폼은 <span className="text-blue-600 font-semibold">공공 데이터와 AI 분석</span>을 활용하여
                이러한 사각지대를 능동적으로 발견하고, 적시에 복지 서비스를 제공할 수 있도록 지원합니다.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="font-bold text-gray-900 mb-2">목표</h3>
                  <p className="text-sm text-gray-700">복지 사각지대 제로화 및 위기 가구 사전 발견</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">🤖</div>
                  <h3 className="font-bold text-gray-900 mb-2">기술</h3>
                  <p className="text-sm text-gray-700">Claude 4.0 기반 AI 위험도 예측 및 분석</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-xl border-2 border-green-200 hover:shadow-lg transition-all">
                  <div className="text-3xl mb-3">📊</div>
                  <h3 className="font-bold text-gray-900 mb-2">데이터</h3>
                  <p className="text-sm text-gray-700">다차원 공공 데이터 통합 분석</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 주요 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-lg border-0 hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 to-white flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} font-tabular mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{stat.unit}</div>
                  <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 주요 기능 */}
        <Card className="mb-12 shadow-xl border-0 animate-slide-up">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              주요 기능
            </CardTitle>
            <CardDescription className="text-base mt-2">
              AI와 데이터를 활용한 6가지 핵심 기능
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`group p-6 rounded-xl border-2 bg-gradient-to-br ${feature.bgColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2 stagger-item`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-14 h-14 mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 기술 스택 */}
        <Card className="mb-12 shadow-xl border-0 animate-slide-up">
          <CardHeader className="border-b bg-gradient-to-r from-orange-50 to-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Database className="h-6 w-6 text-orange-600" />
              </div>
              기술 스택
            </CardTitle>
            <CardDescription className="text-base mt-2">
              최신 기술로 구현된 안정적이고 확장 가능한 플랫폼
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="text-3xl flex-shrink-0">{tech.icon}</div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1">{tech.name}</div>
                    <div className="text-sm text-gray-600">{tech.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기대 효과 */}
        <Card className="mb-12 shadow-xl border-0 bg-gradient-to-br from-green-50 to-white animate-slide-up">
          <CardHeader className="border-b bg-gradient-to-r from-green-50 to-white">
            <CardTitle className="text-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              기대 효과
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-4">
              {[
                { title: '복지 사각지대 해소', description: '신청주의 한계를 극복하고 도움이 필요한 가구를 능동적으로 발견' },
                { title: '위기 사전 예방', description: 'AI 예측을 통한 선제적 개입으로 고립사, 자살 등 위기 상황 방지' },
                { title: '복지 자원 효율화', description: '데이터 기반 우선순위 설정으로 한정된 복지 예산의 효과적 배분' },
                { title: '행정 업무 경감', description: '자동화된 모니터링으로 복지 담당자의 수작업 부담 감소' },
                { title: '시민 삶의 질 향상', description: '적시 지원을 통한 세종시민의 안전망 강화 및 복지 체감도 증대' }
              ].map((effect, index) => (
                <div key={index} className="flex items-start gap-4 p-5 bg-white rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-all">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{effect.title}</h3>
                    <p className="text-sm text-gray-700">{effect.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card className="shadow-2xl border-0 bg-gradient-sejong text-white animate-scale-in">
            <CardContent className="py-12">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  지금 바로 시작하세요
                </h2>
                <p className="text-white/90 mb-8 text-lg">
                  AI 기반 위기 가구 조기 발견 플랫폼으로<br />
                  세종시 복지 사각지대를 해소하세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 shadow-lg transition-all hover:scale-105">
                      <Activity className="h-5 w-5 mr-2" />
                      대시보드 보기
                    </Button>
                  </Link>
                  <Link href="/households">
                    <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-105">
                      <Users className="h-5 w-5 mr-2" />
                      가구 목록 보기
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
