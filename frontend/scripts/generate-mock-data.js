// 100+ 가구의 리얼한 목업 데이터 생성 스크립트

const fs = require('fs');
const path = require('path');

// 세종시 실제 지역
const regions = [
  { region: '조치원읍', dongs: ['신흥리', '봉산리', '서창리', '월산리'] },
  { region: '한솔동', dongs: ['한솔동'] },
  { region: '나성동', dongs: ['나성동'] },
  { region: '아름동', dongs: ['아름동'] },
  { region: '도담동', dongs: ['도담동'] },
  { region: '어진동', dongs: ['어진동'] },
  { region: '종촌동', dongs: ['종촌동'] },
  { region: '고운동', dongs: ['고운동'] },
  { region: '보람동', dongs: ['보람동'] },
  { region: '대평동', dongs: ['대평동'] },
];

const householdTypes = ['1인 가구', '2인 가구', '3인 가구', '4인 이상'];
const genders = ['남성', '여성'];
const riskLevels = ['GREEN', 'YELLOW', 'ORANGE', 'RED'];
const urgencyLevels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

// 랜덤 유틸리티
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function randomElement(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// 위험도 점수에 따른 등급 계산
function getRiskLevel(score) {
  if (score >= 80) return 'RED';
  if (score >= 60) return 'ORANGE';
  if (score >= 30) return 'YELLOW';
  return 'GREEN';
}

function getUrgency(score) {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 30) return 'MEDIUM';
  return 'LOW';
}

// 6개월 사용량 생성 (위험도에 따라 다르게)
function generateUsageData(riskScore) {
  const months = ['2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10'];
  const baseUsage = randomInt(80, 250);

  return months.map((month, index) => {
    let decline = 0;
    if (riskScore >= 70) {
      // 고위험: 사용량 급감
      decline = index * randomInt(10, 25);
    } else if (riskScore >= 50) {
      // 중위험: 점진적 감소
      decline = index * randomInt(3, 10);
    } else {
      // 저위험: 약간의 변동
      decline = randomInt(-5, 5);
    }

    const usage = Math.max(10, baseUsage - decline);
    const bill = usage * randomInt(120, 150);
    const overdue = riskScore >= 60 && index >= 3 ? Math.random() > 0.3 : false;

    return { month, usage, bill, overdue };
  });
}

function generateWaterUsage(riskScore) {
  const months = ['2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10'];
  const baseUsage = randomFloat(3, 12);

  return months.map((month, index) => {
    let decline = 0;
    if (riskScore >= 70) {
      decline = index * randomFloat(0.5, 1.5);
    } else if (riskScore >= 50) {
      decline = index * randomFloat(0.2, 0.8);
    } else {
      decline = randomFloat(-0.3, 0.3);
    }

    const usage = Math.max(1, baseUsage - decline);
    const bill = Math.round(usage * 1700);
    const overdue = riskScore >= 60 && index >= 3 ? Math.random() > 0.3 : false;

    return { month, usage: Math.round(usage * 10) / 10, bill, overdue };
  });
}

// 상담 기록 생성
const counselingKeywords = {
  경제: ['실직', '생계곤란', '체납', '빚', '소득감소'],
  건강: ['통증', '낙상', '응급실', '만성질환', '약값'],
  심리: ['우울', '고립', '외로움', '불안', '스트레스', '무기력'],
};

function generateCounselingRecords(riskScore) {
  const count = riskScore >= 70 ? randomInt(2, 4) : riskScore >= 50 ? randomInt(1, 2) : randomInt(0, 1);
  const records = [];

  for (let i = 0; i < count; i++) {
    const daysAgo = randomInt(1, 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const categories = [];
    const keywords = [];

    if (riskScore >= 60 && Math.random() > 0.4) {
      categories.push('경제');
      keywords.push(...counselingKeywords.경제.slice(0, randomInt(1, 3)));
    }
    if (riskScore >= 50 && Math.random() > 0.5) {
      categories.push('건강');
      keywords.push(...counselingKeywords.건강.slice(0, randomInt(1, 2)));
    }
    if (riskScore >= 40 && Math.random() > 0.3) {
      categories.push('심리');
      keywords.push(...counselingKeywords.심리.slice(0, randomInt(1, 3)));
    }

    if (categories.length === 0) {
      categories.push(randomElement(['경제', '건강', '심리']));
      keywords.push(randomElement(Object.values(counselingKeywords).flat()));
    }

    records.push({
      date: date.toISOString(),
      type: Math.random() > 0.5 ? '복지상담' : '심리상담',
      category: categories,
      summary: `${categories.join(', ')} 관련 상담. ${keywords.join(', ')} 호소`,
      keywords,
      sentiment: -randomFloat(0.3, 0.9),
    });
  }

  return records.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// AI 분석 생성
function generateAIAnalysis(riskScore, riskFactors) {
  const topFactor = Object.entries(riskFactors).sort((a, b) => b[1] - a[1])[0][0];

  const summaries = {
    경제: '경제적 어려움으로 인한 위기 징후',
    건강: '건강 악화 및 의료 이용 증가',
    심리: '심리적 스트레스 및 사회적 고립',
  };

  const actions = {
    경제: ['긴급 생계비 지원', '취업 지원 프로그램 연계', '자활 지원 센터 연결'],
    건강: ['긴급돌봄서비스 투입', '정기 건강검진 지원', '주간보호센터 연계'],
    심리: ['1인 가구 심리상담 우선 연계', '소셜 다이닝 참여 유도', '취미 활동 동아리 연계'],
  };

  const factorMap = {
    economic: '경제',
    health: '건강',
    psychological: '심리',
  };

  const mainCategory = factorMap[topFactor] || '경제';

  let predictedCrisisDate = null;
  if (riskScore >= 80) {
    const daysAhead = randomInt(10, 30);
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    predictedCrisisDate = date.toISOString().split('T')[0];
  } else if (riskScore >= 60) {
    const daysAhead = randomInt(30, 90);
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    predictedCrisisDate = date.toISOString().split('T')[0];
  }

  return {
    summary: `${summaries[mainCategory]}. ${riskScore >= 70 ? '긴급 개입 필요' : '정기적 모니터링 권장'}`,
    urgency: getUrgency(riskScore),
    recommendedActions: actions[mainCategory] || actions['경제'],
    predictedCrisisDate,
  };
}

// 가구 데이터 생성
function generateHousehold(index) {
  const regionData = randomElement(regions);
  const riskScore = randomInt(15, 95);
  const age = randomInt(25, 85);

  const riskFactors = {
    economic: randomFloat(0.2, 0.95),
    health: randomFloat(0.2, 0.95),
    psychological: randomFloat(0.2, 0.95),
    social: randomFloat(0.2, 0.95),
  };

  // 위험도가 높을수록 요인 점수도 높게
  if (riskScore >= 70) {
    riskFactors.economic = randomFloat(0.6, 0.95);
    riskFactors.health = randomFloat(0.5, 0.95);
    riskFactors.psychological = randomFloat(0.5, 0.95);
  }

  const registeredAt = randomDate(new Date('2024-01-01'), new Date('2024-03-31'));
  const lastContact = randomDate(new Date('2024-09-01'), new Date('2024-10-31'));

  return {
    id: `hh_${String(index + 1).padStart(3, '0')}`,
    householdId: `2024-SJ-${String(index + 1).padStart(4, '0')}`,
    region: regionData.region,
    dong: randomElement(regionData.dongs),
    householdType: age > 60 ? randomElement(['1인 가구', '2인 가구']) : randomElement(householdTypes),
    age,
    gender: randomElement(genders),
    registeredAt: registeredAt.toISOString(),
    riskScore,
    riskLevel: getRiskLevel(riskScore),
    riskFactors,
    electricityUsage: generateUsageData(riskScore),
    waterUsage: generateWaterUsage(riskScore),
    healthInsurance: {
      premium: randomInt(30000, 150000),
      overdue: riskScore >= 60 && Math.random() > 0.3,
      arrears: riskScore >= 60 ? randomInt(50000, 500000) : 0,
      monthsOverdue: riskScore >= 60 ? randomInt(1, 6) : 0,
    },
    medicalHistory: riskScore >= 60 ? [
      {
        date: randomDate(new Date('2024-08-01'), new Date('2024-10-31')).toISOString().split('T')[0],
        type: randomElement(['응급실', '외래']),
        reason: randomElement(['낙상', '고혈압', '당뇨', '호흡곤란', '어지럼증']),
      }
    ] : [],
    counselingRecords: generateCounselingRecords(riskScore),
    callPattern: {
      totalCalls: randomInt(5, 50),
      frequencyChange: riskScore >= 60 ? -randomFloat(0.3, 0.7) : randomFloat(-0.2, 0.2),
      emergencyCalls: {
        '119': riskScore >= 70 ? randomInt(0, 3) : 0,
        '112': 0,
      },
      socialCallsRatio: riskScore >= 60 ? randomFloat(0.1, 0.3) : randomFloat(0.3, 0.6),
    },
    intervention: null,
    lastContact: lastContact.toISOString(),
    aiAnalysis: generateAIAnalysis(riskScore, riskFactors),
  };
}

// 120가구 생성
const households = [];
for (let i = 0; i < 120; i++) {
  households.push(generateHousehold(i));
}

// JSON 파일로 저장
const outputPath = path.join(__dirname, '../public/data/mock-households.json');
fs.writeFileSync(outputPath, JSON.stringify(households, null, 2), 'utf-8');

console.log(`✅ ${households.length}개 가구 데이터 생성 완료!`);
console.log(`📁 파일 위치: ${outputPath}`);

// 통계 출력
const stats = {
  total: households.length,
  red: households.filter(h => h.riskLevel === 'RED').length,
  orange: households.filter(h => h.riskLevel === 'ORANGE').length,
  yellow: households.filter(h => h.riskLevel === 'YELLOW').length,
  green: households.filter(h => h.riskLevel === 'GREEN').length,
};

console.log('\n📊 위험도별 분포:');
console.log(`  - RED (매우 높음): ${stats.red}가구`);
console.log(`  - ORANGE (높음): ${stats.orange}가구`);
console.log(`  - YELLOW (보통): ${stats.yellow}가구`);
console.log(`  - GREEN (낮음): ${stats.green}가구`);
