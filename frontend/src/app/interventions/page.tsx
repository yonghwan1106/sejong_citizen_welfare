import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  User,
  Phone,
  MessageSquare,
  FileText,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

// 목업 개입 데이터
const interventions = [
  {
    id: 'INT-001',
    householdId: '2024-SJ-0001',
    name: '김철수',
    region: '조치원읍 신흥리',
    type: '심리상담',
    status: 'completed',
    priority: 'high',
    startDate: '2025-10-25',
    completedDate: '2025-10-30',
    assignedTo: '박복지',
    notes: '3회 상담 완료. 우울감 개선 확인. 추가 모니터링 필요',
    outcome: '긍정적',
    riskBefore: 85,
    riskAfter: 62,
  },
  {
    id: 'INT-002',
    householdId: '2024-SJ-0023',
    name: '이영희',
    region: '한솔동',
    type: '긴급돌봄',
    status: 'in_progress',
    priority: 'critical',
    startDate: '2025-10-28',
    completedDate: null,
    assignedTo: '최사회',
    notes: '독거노인 낙상사고 후 긴급돌봄 개입. 주 3회 방문 진행 중',
    outcome: null,
    riskBefore: 82,
    riskAfter: null,
  },
  {
    id: 'INT-003',
    householdId: '2024-SJ-0045',
    name: '박민수',
    region: '나성동',
    type: '일자리 연계',
    status: 'pending',
    priority: 'medium',
    startDate: '2025-10-31',
    completedDate: null,
    assignedTo: '정복지',
    notes: '실직 후 경제적 어려움. 직업훈련 프로그램 대기 중',
    outcome: null,
    riskBefore: 78,
    riskAfter: null,
  },
  {
    id: 'INT-004',
    householdId: '2024-SJ-0067',
    name: '최순자',
    region: '새롬동',
    type: '소셜다이닝',
    status: 'completed',
    priority: 'low',
    startDate: '2025-10-20',
    completedDate: '2025-10-27',
    assignedTo: '김사회',
    notes: '사회적 고립 개선을 위한 소셜다이닝 프로그램 참여. 6회 참석',
    outcome: '긍정적',
    riskBefore: 65,
    riskAfter: 48,
  },
  {
    id: 'INT-005',
    householdId: '2024-SJ-0089',
    name: '정대호',
    region: '도담동',
    type: '건강관리',
    status: 'in_progress',
    priority: 'high',
    startDate: '2025-10-29',
    completedDate: null,
    assignedTo: '이복지',
    notes: '만성질환 관리 소홀. 보건소 연계 및 복약 관리 지원',
    outcome: null,
    riskBefore: 73,
    riskAfter: null,
  },
];

const stats = {
  total: 156,
  completed: 98,
  inProgress: 34,
  pending: 24,
  thisWeek: 34,
  thisMonth: 142,
  successRate: 87,
};

export default function InterventionsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            완료
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            진행중
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            대기중
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Badge className="bg-red-600 text-white">긴급</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white">높음</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 text-white">보통</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">낮음</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* 헤더 */}
      <header className="bg-gradient-sejong text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">개입 관리</h1>
              <p className="text-blue-100 mt-2">위기가구 개입 현황 및 관리</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Activity className="h-3 w-3 mr-2 inline" />
                총 {stats.total}건
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover-lift border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">완료</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.completed}</div>
              <p className="text-xs text-gray-500 mt-1">성공률 {stats.successRate}%</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">진행중</CardTitle>
              <Clock className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.inProgress}</div>
              <p className="text-xs text-gray-500 mt-1">활발히 진행중</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-gray-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">대기중</CardTitle>
              <AlertCircle className="h-5 w-5 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.pending}</div>
              <p className="text-xs text-gray-500 mt-1">배정 대기중</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">금주</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{stats.thisWeek}</div>
              <p className="text-xs text-gray-500 mt-1">이번 주 개입 건수</p>
            </CardContent>
          </Card>
        </div>

        {/* 탭으로 구분된 개입 목록 */}
        <Card>
          <CardHeader>
            <CardTitle>개입 목록</CardTitle>
            <CardDescription>상태별로 개입 건을 확인하고 관리할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="in_progress">진행중</TabsTrigger>
                <TabsTrigger value="pending">대기중</TabsTrigger>
                <TabsTrigger value="completed">완료</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {interventions.map((intervention) => (
                    <div
                      key={intervention.id}
                      className="border-2 border-gray-100 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-lg">{intervention.id}</span>
                              {getStatusBadge(intervention.status)}
                              {getPriorityBadge(intervention.priority)}
                            </div>
                            <Link
                              href={`/households/${intervention.householdId}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {intervention.householdId} - {intervention.name}
                            </Link>
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                          {intervention.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">담당자:</span>
                          <span className="font-medium">{intervention.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">시작일:</span>
                          <span className="font-medium">{intervention.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">위험도:</span>
                          <span className="font-medium">
                            {intervention.riskBefore}
                            {intervention.riskAfter && ` → ${intervention.riskAfter}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">지역:</span>
                          <span className="font-medium">{intervention.region}</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700">{intervention.notes}</p>
                        </div>
                      </div>

                      {intervention.outcome && (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            결과: {intervention.outcome}
                          </Badge>
                          {intervention.completedDate && (
                            <span className="text-xs text-gray-500">
                              완료일: {intervention.completedDate}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          연락
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          상세보기
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="in_progress" className="mt-6">
                <div className="space-y-4">
                  {interventions
                    .filter((i) => i.status === 'in_progress')
                    .map((intervention) => (
                      <div
                        key={intervention.id}
                        className="border-2 border-blue-100 rounded-lg p-6 bg-blue-50/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg">{intervention.id}</span>
                          {getStatusBadge(intervention.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {intervention.name} - {intervention.type}
                        </p>
                        <p className="text-sm text-gray-700">{intervention.notes}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-4">
                  {interventions
                    .filter((i) => i.status === 'pending')
                    .map((intervention) => (
                      <div
                        key={intervention.id}
                        className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg">{intervention.id}</span>
                          {getStatusBadge(intervention.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {intervention.name} - {intervention.type}
                        </p>
                        <p className="text-sm text-gray-700">{intervention.notes}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <div className="space-y-4">
                  {interventions
                    .filter((i) => i.status === 'completed')
                    .map((intervention) => (
                      <div
                        key={intervention.id}
                        className="border-2 border-green-100 rounded-lg p-6 bg-green-50/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-lg">{intervention.id}</span>
                          {getStatusBadge(intervention.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {intervention.name} - {intervention.type}
                        </p>
                        <p className="text-sm text-gray-700 mb-2">{intervention.notes}</p>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          결과: {intervention.outcome}
                        </Badge>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
