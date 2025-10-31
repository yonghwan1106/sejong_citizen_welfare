import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  AlertTriangle,
  Users,
  CheckCircle2,
  Clock,
  FileText,
  PieChart,
  Activity,
} from 'lucide-react';

// 월간 리포트 데이터
const monthlyData = {
  month: '2025년 10월',
  summary: {
    totalHouseholds: 120,
    newCases: 15,
    interventions: 34,
    crisisPrevented: 12,
    riskReduction: 18.5,
  },
  riskDistribution: {
    critical: { count: 22, percentage: 18.3, change: 2.5 },
    high: { count: 36, percentage: 30.0, change: -3.2 },
    medium: { count: 43, percentage: 35.8, change: 1.5 },
    low: { count: 19, percentage: 15.8, change: -0.8 },
  },
  interventionTypes: [
    { type: '심리상담', count: 12, success: 10, successRate: 83 },
    { type: '긴급돌봄', count: 8, success: 7, successRate: 88 },
    { type: '일자리 연계', count: 6, success: 4, successRate: 67 },
    { type: '소셜다이닝', count: 5, success: 5, successRate: 100 },
    { type: '건강관리', count: 3, success: 2, successRate: 67 },
  ],
  regionData: [
    { region: '조치원읍', households: 25, riskAvg: 72 },
    { region: '한솔동', households: 18, riskAvg: 68 },
    { region: '나성동', households: 15, riskAvg: 65 },
    { region: '새롬동', households: 22, riskAvg: 70 },
    { region: '도담동', households: 20, riskAvg: 66 },
    { region: '기타', households: 20, riskAvg: 64 },
  ],
  aiPredictions: {
    accuracy: 78.5,
    totalPredictions: 45,
    confirmed: 35,
    falsePositive: 7,
    falseNegative: 3,
  },
  trends: {
    riskIncrease: 8,
    riskDecrease: 23,
    stable: 89,
  },
};

export default function ReportsPage() {
  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    } else if (change < 0) {
      return <TrendingDown className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* 헤더 */}
      <header className="bg-gradient-sejong text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">분석 리포트</h1>
              <p className="text-blue-100 mt-2">월간 위기가구 현황 및 개입 성과 분석</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Calendar className="h-3 w-3 mr-2 inline" />
                {monthlyData.month}
              </Badge>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Download className="h-4 w-4 mr-2" />
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 주요 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="hover-lift border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 관리 가구</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{monthlyData.summary.totalHouseholds}</div>
              <p className="text-xs text-gray-500 mt-1">
                신규 +{monthlyData.summary.newCases}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">개입 건수</CardTitle>
              <Activity className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{monthlyData.summary.interventions}</div>
              <p className="text-xs text-gray-500 mt-1">이번 달</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">위기 예방</CardTitle>
              <CheckCircle2 className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{monthlyData.summary.crisisPrevented}</div>
              <p className="text-xs text-gray-500 mt-1">성공 사례</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">위험도 감소</CardTitle>
              <TrendingDown className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{monthlyData.summary.riskReduction}%</div>
              <p className="text-xs text-gray-500 mt-1">평균 감소율</p>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-indigo-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI 정확도</CardTitle>
              <BarChart3 className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-tabular">{monthlyData.aiPredictions.accuracy}%</div>
              <p className="text-xs text-gray-500 mt-1">예측 정확도</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 위험도별 분포 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                위험도별 분포
              </CardTitle>
              <CardDescription>전월 대비 변화 추이</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="font-semibold">매우 높음 (RED)</span>
                      {getTrendIcon(monthlyData.riskDistribution.critical.change)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-tabular">
                        {monthlyData.riskDistribution.critical.count}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({monthlyData.riskDistribution.critical.percentage}%)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={monthlyData.riskDistribution.critical.percentage}
                    className="h-2 bg-red-100"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="font-semibold">높음 (ORANGE)</span>
                      {getTrendIcon(monthlyData.riskDistribution.high.change)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-tabular">
                        {monthlyData.riskDistribution.high.count}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({monthlyData.riskDistribution.high.percentage}%)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={monthlyData.riskDistribution.high.percentage}
                    className="h-2 bg-orange-100"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="font-semibold">보통 (YELLOW)</span>
                      {getTrendIcon(monthlyData.riskDistribution.medium.change)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-tabular">
                        {monthlyData.riskDistribution.medium.count}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({monthlyData.riskDistribution.medium.percentage}%)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={monthlyData.riskDistribution.medium.percentage}
                    className="h-2 bg-yellow-100"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="font-semibold">낮음 (GREEN)</span>
                      {getTrendIcon(monthlyData.riskDistribution.low.change)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold font-tabular">
                        {monthlyData.riskDistribution.low.count}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({monthlyData.riskDistribution.low.percentage}%)
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={monthlyData.riskDistribution.low.percentage}
                    className="h-2 bg-green-100"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 개입 유형별 성과 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                개입 유형별 성과
              </CardTitle>
              <CardDescription>개입 방식별 성공률</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.interventionTypes.map((item) => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{item.type}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {item.success}/{item.count}건
                        </span>
                        <Badge
                          className={
                            item.successRate >= 80
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {item.successRate}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={item.successRate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 지역별 현황 */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              지역별 현황
            </CardTitle>
            <CardDescription>세종시 권역별 위기가구 분포 및 평균 위험도</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyData.regionData.map((region) => (
                <div
                  key={region.region}
                  className="border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{region.region}</span>
                    <Badge className="bg-blue-100 text-blue-800">{region.households}가구</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">평균 위험도:</span>
                    <span className="text-xl font-bold font-tabular">{region.riskAvg}</span>
                  </div>
                  <Progress value={region.riskAvg} className="mt-2 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI 예측 성능 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              AI 예측 성능 분석
            </CardTitle>
            <CardDescription>머신러닝 모델의 정확도 및 성능 지표</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">전체 예측</div>
                <div className="text-3xl font-bold font-tabular text-blue-600">
                  {monthlyData.aiPredictions.totalPredictions}
                </div>
                <div className="text-xs text-gray-500 mt-1">건</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">정확한 예측</div>
                <div className="text-3xl font-bold font-tabular text-green-600">
                  {monthlyData.aiPredictions.confirmed}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  ({Math.round((monthlyData.aiPredictions.confirmed / monthlyData.aiPredictions.totalPredictions) * 100)}%)
                </div>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">과대 예측</div>
                <div className="text-3xl font-bold font-tabular text-orange-600">
                  {monthlyData.aiPredictions.falsePositive}
                </div>
                <div className="text-xs text-gray-500 mt-1">False Positive</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">과소 예측</div>
                <div className="text-3xl font-bold font-tabular text-red-600">
                  {monthlyData.aiPredictions.falseNegative}
                </div>
                <div className="text-xs text-gray-500 mt-1">False Negative</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-100">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">AI 모델 개선 권장사항</div>
                  <p className="text-sm text-gray-600 mt-1">
                    과소 예측(False Negative) 사례를 줄이기 위해 심리상담 데이터 가중치 조정이 필요합니다.
                    다음 업데이트에서 정확도 82% 이상 목표로 개선 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 종합 평가 */}
        <Card className="mt-6 shadow-lg border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {monthlyData.month} 종합 평가
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">긍정적 성과</div>
                  <p className="text-sm text-gray-600 mt-1">
                    이번 달 총 {monthlyData.summary.interventions}건의 개입을 통해{' '}
                    {monthlyData.summary.crisisPrevented}건의 위기를 사전에 예방했습니다. 평균 위험도가{' '}
                    {monthlyData.summary.riskReduction}% 감소하여 선제적 개입의 효과가 입증되었습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">개선 필요 영역</div>
                  <p className="text-sm text-gray-600 mt-1">
                    매우 높음(RED) 등급 가구가 전월 대비 {monthlyData.riskDistribution.critical.change}% 증가했습니다.
                    조치원읍 지역의 집중적인 모니터링과 추가 자원 배분이 필요합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900">다음 달 계획</div>
                  <p className="text-sm text-gray-600 mt-1">
                    AI 모델 업데이트를 통한 정확도 개선, 소셜다이닝 프로그램 확대(성공률 100%),
                    일자리 연계 프로그램 개선(현재 67% → 목표 80%)을 추진할 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
