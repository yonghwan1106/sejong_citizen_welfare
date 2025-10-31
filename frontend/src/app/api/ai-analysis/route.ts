import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import type { Household } from '@/types/household';

// Anthropic API 클라이언트 초기화
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const household: Household = await request.json();

    // Claude에게 전달할 프롬프트 구성
    const prompt = `당신은 세종시 사회복지 AI 분석가입니다. 다음 가구의 데이터를 분석하여 위기 가능성을 평가하고 구체적인 개입 방안을 제시해주세요.

<가구 정보>
- ID: ${household.householdId}
- 지역: ${household.region} ${household.dong}
- 가구 형태: ${household.householdType}
- 나이/성별: ${household.age}세 ${household.gender}
- 위험도 점수: ${household.riskScore}점

<위험 요인>
- 경제적 위험: ${Math.round(household.riskFactors.economic * 100)}%
- 건강 위험: ${Math.round(household.riskFactors.health * 100)}%
- 심리적 위험: ${Math.round(household.riskFactors.psychological * 100)}%
- 사회적 위험: ${Math.round(household.riskFactors.social * 100)}%

<전력/수도 사용 추이>
최근 6개월 전력 사용량:
${household.electricityUsage.map(e => `- ${e.month}: ${e.usage}kWh (${e.overdue ? '체납' : '정상'})`).join('\n')}

<건강보험>
- 월 보험료: ${household.healthInsurance.premium.toLocaleString()}원
- 체납 여부: ${household.healthInsurance.overdue ? '예' : '아니오'}
- 체납액: ${household.healthInsurance.arrears.toLocaleString()}원

<상담 기록>
${household.counselingRecords.map(c =>
  `- ${c.date}: ${c.type} (${c.category.join(', ')})\n  ${c.summary}\n  키워드: ${c.keywords.join(', ')}`
).join('\n')}

<통화 패턴>
- 총 통화 수: ${household.callPattern.totalCalls}회
- 빈도 변화: ${Math.round(household.callPattern.frequencyChange * 100)}%
- 응급 통화: 119 ${household.callPattern.emergencyCalls['119']}회
- 사회적 통화 비율: ${Math.round(household.callPattern.socialCallsRatio * 100)}%

위 데이터를 종합 분석하여 다음 형식으로 답변해주세요:

1. **종합 평가** (2-3문장으로 현재 상황 요약)
2. **주요 위험 징후** (구체적인 3-5가지 항목)
3. **권장 개입 방안** (우선순위별로 3-5가지)
4. **예상 시나리오** (개입 시 vs 미개입 시)
5. **긴급도 평가** (CRITICAL/HIGH/MEDIUM/LOW 중 하나와 그 이유)

전문적이면서도 따뜻한 톤으로 작성해주세요.`;

    // Claude API 호출
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // 응답 추출
    const analysis = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({
      analysis,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json(
      { error: 'AI 분석 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
