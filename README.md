# 세종시 위기가구 선제 발굴 AI 플랫폼

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yonghwan1106/sejong_citizen_welfare)

빅데이터와 AI 기반 '잠재적 위기가구' 선제 발굴 시스템 - 2025 세종시 시민복지아이디어 공모전 출품작

## 🎯 프로젝트 개요

기존의 '사후 발굴' 복지 시스템을 '사전 예측' AI 시스템으로 전환하여, 위기 발생 이전의 **골든타임**에 선제적으로 개입하는 혁신적인 복지 행정 프로토타입입니다.

### 주요 차별점

- ⚡ **사전 예측**: 위기 발생 3-6개월 전 징후 포착
- 🤖 **AI 분석**: Anthropic Claude 4.0 기반 실시간 위험도 분석
- 📊 **빅데이터 통합**: 120개 가구의 리얼한 목업 데이터
- 🎨 **직관적 UI**: 복지 담당자를 위한 사용자 친화적 대시보드

## 🚀 라이브 데모

**배포 주소**: [https://sejong-citizen-welfare.vercel.app](https://sejong-citizen-welfare.vercel.app)

> 💡 프로토타입이므로 실제 개인정보는 포함되지 않으며, 모든 데이터는 목업입니다.

## 📸 스크린샷

### 대시보드
- 실시간 위험 가구 모니터링
- 위험도별 통계 및 분포 차트
- 긴급 알림 시스템

### 가구 목록
- 120개 가구 데이터
- 고급 필터링 (위험도, 지역, 검색)
- 실시간 정렬 기능

### 가구 상세 & AI 분석
- Claude 4.0 기반 심층 분석
- 전력/수도 사용량 추이 차트
- 상담 기록 및 의료 이력
- 맞춤형 개입 방안 추천

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 15, React 19, TypeScript
- **스타일링**: Tailwind CSS, shadcn/ui
- **AI**: Anthropic Claude 4.0 API
- **차트**: Recharts
- **배포**: Vercel
- **데이터**: JSON 목업 (120개 가구)

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18+
- npm 또는 yarn
- Anthropic API Key ([여기서 발급](https://console.anthropic.com/))

### 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/yonghwan1106/sejong_citizen_welfare.git
cd sejong_citizen_welfare/frontend

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 ANTHROPIC_API_KEY를 입력하세요

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
npm run start
```

## 📊 목업 데이터

120개의 리얼한 가구 데이터가 포함되어 있습니다:

- **세종시 실제 지역**: 조치원읍, 한솔동, 나성동, 아름동 등 10개 지역
- **위험도 분포**: RED 22가구 / ORANGE 36가구 / YELLOW 43가구 / GREEN 19가구
- **시계열 데이터**: 6개월 전력/수도 사용량 추이
- **상담 기록**: 복지상담 및 심리상담 기록
- **AI 분석**: 각 가구별 맞춤형 권장 조치

새로운 목업 데이터 생성:
```bash
node frontend/scripts/generate-mock-data.js
```

## 🔑 주요 기능

### 1. 대시보드 (`/`)
- 총 관리 가구 통계
- 위험도별 분포 시각화
- 실시간 긴급 알림
- 빠른 액션 버튼

### 2. 위험 가구 목록 (`/households`)
- 120개 전체 가구 목록
- 실시간 검색 (가구 ID, 지역)
- 위험도별 필터링
- 다중 정렬 옵션

### 3. 가구 상세 페이지 (`/households/[id]`)
- **AI 실시간 분석**: Claude 4.0으로 심층 분석 생성
- 전력/수도 사용량 추이 차트
- 위험 요인별 막대 차트
- 상담 이력 타임라인
- 의료 이용 기록
- 통화 패턴 분석
- 맞춤형 개입 방안 추천

## 🤖 AI 분석 기능

Anthropic Claude 4.0 API를 사용하여 다음을 분석합니다:

1. **종합 평가**: 현재 상황 요약
2. **주요 위험 징후**: 구체적인 위험 요인
3. **권장 개입 방안**: 우선순위별 조치사항
4. **예상 시나리오**: 개입 시 vs 미개입 시
5. **긴급도 평가**: CRITICAL/HIGH/MEDIUM/LOW

```typescript
// API 엔드포인트: /api/ai-analysis
POST /api/ai-analysis
{
  "household": { /* 가구 데이터 */ }
}
```

## 🌐 Vercel 배포

### 자동 배포

이 저장소는 Vercel과 자동 연동되어 있습니다:

1. GitHub에 푸시하면 자동으로 배포됩니다
2. Pull Request 생성 시 프리뷰 배포가 생성됩니다
3. `main` 브랜치 머지 시 프로덕션 배포됩니다

### 수동 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
cd frontend
vercel --prod
```

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `ANTHROPIC_API_KEY`: Anthropic API 키

## 📁 프로젝트 구조

```
sejong_citizen_welfare/
├── frontend/
│   ├── src/
│   │   ├── app/                    # Next.js 15 App Router
│   │   │   ├── page.tsx           # 대시보드
│   │   │   ├── households/        # 가구 목록 & 상세
│   │   │   └── api/               # API Routes
│   │   ├── components/
│   │   │   ├── ui/                # shadcn/ui 컴포넌트
│   │   │   └── dashboard/         # 대시보드 컴포넌트
│   │   ├── lib/
│   │   │   └── utils.ts           # 유틸리티 함수
│   │   └── types/
│   │       └── household.ts       # TypeScript 타입
│   ├── public/
│   │   └── data/
│   │       └── mock-households.json  # 120개 목업 데이터
│   └── scripts/
│       └── generate-mock-data.js  # 데이터 생성 스크립트
├── PRD.md                          # 제품 요구사항 문서
├── ARCHITECTURE.md                 # 시스템 아키텍처
└── README.md                       # 본 문서
```

## 👤 제안자 정보

- **이름**: 박용환
- **이메일**: sanoramyun8@gmail.com
- **연락처**: 010-7939-3123
- **공모전**: 2025 세종시 시민복지아이디어 공모전

## 📄 관련 문서

- [PRD (제품 요구사항 문서)](./PRD.md)
- [시스템 아키텍처](./ARCHITECTURE.md)
- [공모전 제안서](./docs/proposal.md)

## 🎓 개발 배경

이 프로토타입은 다음 문제를 해결하기 위해 개발되었습니다:

1. **사후 발굴의 한계**: 기존 시스템은 단전, 단수 등 위기가 이미 발생한 후에야 개입
2. **신청주의의 맹점**: 스스로 도움을 요청하지 못하는 취약계층 미발굴
3. **비정형 데이터 미활용**: 심리상담, 통화 패턴 등 조기 징후 데이터 활용 부족

→ **해결책**: AI 기반 선제적 예측으로 위기 발생 3-6개월 전 개입

## 🔮 향후 계획

### Phase 2 (실제 구현 시)
- [ ] PostgreSQL / MongoDB 데이터베이스 연동
- [ ] Python/FastAPI 백엔드 구축
- [ ] 실제 공공 데이터 API 연동
- [ ] 담당자 인증 시스템
- [ ] 개입 기록 관리 시스템

### Phase 3 (고도화)
- [ ] IoT 센서 데이터 통합
- [ ] 음성 AI 말벗 서비스 연동
- [ ] 모바일 앱 개발
- [ ] 타 지자체 확산

## 📜 라이선스

이 프로젝트는 세종시 시민복지아이디어 공모전 출품작입니다.

---

**Built with ❤️ for Sejong Citizens**

🌐 [라이브 데모](https://sejong-citizen-welfare.vercel.app) | 📧 [문의하기](mailto:sanoramyun8@gmail.com)
