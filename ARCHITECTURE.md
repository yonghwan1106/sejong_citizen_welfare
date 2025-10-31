# 시스템 아키텍처 설계

## 1. 전체 시스템 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                          사용자 계층                              │
├─────────────────────────────────────────────────────────────────┤
│  복지 담당자     │  읍면동 상담사    │  시민 포털(옵션)          │
│  대시보드        │  모바일 앱        │  자가진단                │
└────────────┬────────────────────────────────────┬───────────────┘
             │                                    │
             ▼                                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     애플리케이션 계층                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  프론트엔드   │  │  API Gateway │  │  인증/권한    │          │
│  │  (Next.js)   │  │  (FastAPI)   │  │  (JWT/RBAC)  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      비즈니스 로직 계층                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 위험도 예측   │  │  개입 관리    │  │  서비스 연계  │          │
│  │  서비스      │  │  워크플로우   │  │  서비스       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         AI/ML 계층                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ 예측 모델     │  │ 텍스트 분석   │  │ 이상 감지     │          │
│  │ (XGBoost)    │  │ (KoBERT)     │  │ (LSTM)       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                            │
│  │ 모델 학습     │  │ 모델 평가     │                            │
│  │ 파이프라인    │  │ 모니터링      │                            │
│  └──────────────┘  └──────────────┘                            │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      데이터 처리 계층                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  ETL         │  │ 실시간 처리   │  │  데이터 품질  │          │
│  │  (Airflow)   │  │  (Kafka)     │  │  관리         │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        데이터 저장 계층                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  PostgreSQL  │  │   MongoDB    │  │  Data Lake   │          │
│  │  (정형 데이터)│  │ (비정형 데이터)│  │   (S3/MinIO) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       외부 데이터 소스                             │
├─────────────────────────────────────────────────────────────────┤
│  한전 │ 수도 │ 건보공단 │ 심리상담 │ 복지상담 │ 의료 │ 고용보험   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 상세 컴포넌트 설계

### 2.1 프론트엔드 (Next.js 15)

```
sejong_citizen_welfare/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── page.tsx                    # 메인 대시보드
│   │   ├── risk-households/
│   │   │   ├── page.tsx                # 위험 가구 목록
│   │   │   └── [id]/page.tsx           # 가구 상세 정보
│   │   ├── intervention/
│   │   │   ├── page.tsx                # 개입 관리
│   │   │   └── history/page.tsx        # 개입 이력
│   │   ├── analytics/
│   │   │   └── page.tsx                # 분석 리포트
│   │   └── settings/
│   │       └── page.tsx                # 설정
│   ├── api/
│   │   ├── auth/
│   │   ├── households/
│   │   ├── predictions/
│   │   └── interventions/
│   └── layout.tsx
├── components/
│   ├── ui/                             # shadcn/ui 컴포넌트
│   ├── dashboard/
│   │   ├── RiskHeatMap.tsx             # 위험 지역 히트맵
│   │   ├── RiskScoreChart.tsx          # 위험도 차트
│   │   ├── HouseholdList.tsx           # 가구 목록
│   │   └── AlertPanel.tsx              # 알림 패널
│   ├── household/
│   │   ├── DetailCard.tsx              # 가구 상세 정보
│   │   ├── RiskFactors.tsx             # 위험 요인 분석
│   │   └── TimelineChart.tsx           # 시계열 변화
│   └── intervention/
│       ├── InterventionForm.tsx        # 개입 등록
│       └── ServiceRecommendation.tsx   # 서비스 추천
├── lib/
│   ├── api/                            # API 클라이언트
│   ├── utils/                          # 유틸리티 함수
│   └── constants/                      # 상수 정의
├── hooks/
│   ├── useHouseholds.ts
│   ├── usePredictions.ts
│   └── useInterventions.ts
└── types/
    ├── household.ts
    ├── prediction.ts
    └── intervention.ts
```

### 2.2 백엔드 (Python/FastAPI)

```
backend/
├── app/
│   ├── main.py                         # FastAPI 앱 진입점
│   ├── config.py                       # 설정 관리
│   ├── dependencies.py                 # DI 컨테이너
│   ├── api/
│   │   ├── v1/
│   │   │   ├── router.py               # API 라우터 통합
│   │   │   ├── auth.py                 # 인증 엔드포인트
│   │   │   ├── households.py           # 가구 관리
│   │   │   ├── predictions.py          # 예측 결과
│   │   │   ├── interventions.py        # 개입 관리
│   │   │   └── analytics.py            # 분석 리포트
│   ├── core/
│   │   ├── security.py                 # 인증/권한
│   │   ├── database.py                 # DB 연결
│   │   └── exceptions.py               # 예외 처리
│   ├── models/
│   │   ├── household.py                # 가구 모델
│   │   ├── prediction.py               # 예측 모델
│   │   ├── intervention.py             # 개입 모델
│   │   └── user.py                     # 사용자 모델
│   ├── schemas/
│   │   ├── household.py                # Pydantic 스키마
│   │   ├── prediction.py
│   │   └── intervention.py
│   ├── services/
│   │   ├── prediction_service.py       # 예측 비즈니스 로직
│   │   ├── intervention_service.py     # 개입 비즈니스 로직
│   │   └── notification_service.py     # 알림 서비스
│   └── utils/
│       ├── logger.py                   # 로깅
│       └── validators.py               # 데이터 검증
├── ml/
│   ├── models/
│   │   ├── risk_predictor.py           # 위험도 예측 모델
│   │   ├── text_analyzer.py            # 텍스트 분석 모델
│   │   └── anomaly_detector.py         # 이상 감지 모델
│   ├── training/
│   │   ├── train_risk_model.py         # 모델 학습 스크립트
│   │   ├── evaluate_model.py           # 모델 평가
│   │   └── hyperparameter_tuning.py    # 하이퍼파라미터 튜닝
│   ├── preprocessing/
│   │   ├── data_cleaner.py             # 데이터 정제
│   │   ├── feature_engineer.py         # 피처 엔지니어링
│   │   └── text_preprocessor.py        # 텍스트 전처리
│   └── inference/
│       ├── batch_predictor.py          # 배치 예측
│       └── realtime_predictor.py       # 실시간 예측
├── data_pipeline/
│   ├── airflow/
│   │   ├── dags/
│   │   │   ├── daily_data_sync.py      # 일일 데이터 동기화
│   │   │   ├── weekly_model_retrain.py # 주간 모델 재학습
│   │   │   └── monthly_report.py       # 월간 리포트 생성
│   │   └── plugins/
│   ├── extractors/
│   │   ├── electricity_extractor.py    # 전력 데이터 추출
│   │   ├── water_extractor.py          # 수도 데이터 추출
│   │   ├── insurance_extractor.py      # 건보 데이터 추출
│   │   └── counseling_extractor.py     # 상담 데이터 추출
│   ├── transformers/
│   │   ├── data_normalizer.py          # 데이터 정규화
│   │   └── anonymizer.py               # 비식별화 처리
│   └── loaders/
│       ├── postgres_loader.py          # PostgreSQL 적재
│       └── mongodb_loader.py           # MongoDB 적재
└── tests/
    ├── api/
    ├── ml/
    └── data_pipeline/
```

---

## 3. 데이터베이스 스키마

### 3.1 PostgreSQL (정형 데이터)

```sql
-- 가구 정보 테이블
CREATE TABLE households (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id VARCHAR(50) UNIQUE NOT NULL,  -- 가구 고유 ID (해시 처리)
    region VARCHAR(100),                       -- 지역
    household_type VARCHAR(50),                -- 가구 유형 (1인, 다인 등)
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 위험도 예측 테이블
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID REFERENCES households(id),
    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    risk_score INTEGER CHECK (risk_score BETWEEN 0 AND 100),
    risk_level VARCHAR(20),                    -- GREEN, YELLOW, ORANGE, RED
    economic_risk FLOAT,                       -- 경제 위기 확률
    health_risk FLOAT,                         -- 건강 위기 확률
    psychological_risk FLOAT,                  -- 심리 위기 확률
    complex_risk FLOAT,                        -- 복합 위기 확률
    top_risk_factors JSONB,                    -- 주요 위험 요인
    model_version VARCHAR(20),                 -- 모델 버전
    INDEX idx_household_predicted (household_id, predicted_at)
);

-- 개입 기록 테이블
CREATE TABLE interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID REFERENCES households(id),
    prediction_id UUID REFERENCES predictions(id),
    intervention_type VARCHAR(50),             -- 개입 유형
    assigned_to UUID,                          -- 담당자 ID
    status VARCHAR(20),                        -- PENDING, IN_PROGRESS, COMPLETED
    contact_method VARCHAR(20),                -- 연락 방법 (전화, 방문 등)
    contacted_at TIMESTAMP,
    service_linked VARCHAR(100),               -- 연계 서비스
    notes TEXT,                                -- 상담 메모
    outcome VARCHAR(50),                       -- 결과
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    INDEX idx_household_status (household_id, status)
);

-- 정형 데이터 소스 테이블
CREATE TABLE structured_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID REFERENCES households(id),
    data_type VARCHAR(50),                     -- electricity, water, insurance 등
    collected_at DATE,

    -- 전력 데이터
    electricity_usage FLOAT,                   -- kWh
    electricity_bill INTEGER,                  -- 원
    electricity_overdue BOOLEAN,

    -- 수도 데이터
    water_usage FLOAT,                         -- m³
    water_bill INTEGER,
    water_overdue BOOLEAN,

    -- 건강보험 데이터
    insurance_premium INTEGER,                 -- 보험료
    insurance_overdue BOOLEAN,
    insurance_arrears INTEGER,                 -- 체납액

    -- 의료 이용
    emergency_visit_count INTEGER,             -- 응급실 방문 횟수
    hospital_visit_count INTEGER,              -- 병원 방문 횟수

    -- 고용 데이터
    employment_status VARCHAR(20),             -- employed, unemployed, etc.
    income_level INTEGER,                      -- 소득 수준

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_household_collected (household_id, collected_at)
);

-- 사용자 테이블
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20),                          -- ADMIN, MANAGER, COUNSELOR
    organization VARCHAR(100),                 -- 소속 기관
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 MongoDB (비정형 데이터)

```javascript
// 심리상담 데이터 컬렉션
db.counseling_psychological.insertOne({
    household_id: "hashed_id_123",
    session_date: ISODate("2025-10-15"),
    session_type: "individual",             // individual, group
    anonymized_transcript: "...",           // 비식별화 상담 내용
    keywords: ["우울", "고립", "스트레스"],
    sentiment_score: -0.65,                 // -1 (매우 부정) ~ 1 (매우 긍정)
    emotion_scores: {
        depression: 0.8,
        anxiety: 0.6,
        loneliness: 0.9
    },
    counselor_notes: "고립감 심화 관찰됨",
    created_at: ISODate("2025-10-15T10:30:00Z")
});

// 복지 상담 데이터 컬렉션
db.counseling_welfare.insertOne({
    household_id: "hashed_id_123",
    contact_date: ISODate("2025-10-20"),
    contact_type: "phone",                  // phone, visit, online
    inquiry_category: ["경제", "건강"],
    inquiry_summary: "생계비 지원 문의",
    action_taken: "긴급복지지원 안내",
    follow_up_required: true,
    created_at: ISODate("2025-10-20T14:00:00Z")
});

// 통화 패턴 데이터 (옵트인 시민만)
db.call_patterns.insertOne({
    household_id: "hashed_id_123",
    month: "2025-10",
    total_calls: 12,
    total_duration_minutes: 245,
    call_frequency_change: -0.45,           // 전월 대비 감소율
    emergency_calls: {
        "119": 1,
        "112": 0
    },
    social_calls_ratio: 0.3,                // 전체 통화 중 사회적 통화 비율
    created_at: ISODate("2025-10-31T23:59:59Z")
});

// IoT 센서 데이터 (향후 확장)
db.iot_sensor_data.insertOne({
    household_id: "hashed_id_123",
    sensor_type: "radar",
    timestamp: ISODate("2025-10-31T08:30:00Z"),
    vital_signs: {
        respiratory_rate: 16,               // 호흡수
        heart_rate: 72,                     // 심박수
        movement_detected: true
    },
    anomaly_detected: false,
    created_at: ISODate("2025-10-31T08:30:00Z")
});
```

---

## 4. AI/ML 파이프라인

### 4.1 모델 학습 파이프라인

```python
# ml/training/train_risk_model.py

import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score, recall_score, f1_score

class RiskModelTrainer:
    def __init__(self):
        self.model = None

    def load_data(self):
        """데이터 레이크에서 학습 데이터 로드"""
        # PostgreSQL: 정형 데이터
        structured = self.load_structured_data()

        # MongoDB: 비정형 데이터 (피처로 변환)
        psychological_features = self.extract_psychological_features()
        counseling_features = self.extract_counseling_features()

        # 데이터 병합
        df = structured.merge(psychological_features, on='household_id')
        df = df.merge(counseling_features, on='household_id')

        return df

    def create_features(self, df):
        """피처 엔지니어링"""
        # 시계열 피처
        df['electricity_usage_change'] = df.groupby('household_id')['electricity_usage'].pct_change()
        df['water_usage_change'] = df.groupby('household_id')['water_usage'].pct_change()

        # 집계 피처
        df['total_overdue'] = df['electricity_overdue'].astype(int) + df['water_overdue'].astype(int) + df['insurance_overdue'].astype(int)

        # 심리 피처
        df['psychological_risk_flag'] = (df['sentiment_score'] < -0.5).astype(int)

        # 복지 상담 빈도
        df['counseling_frequency_3m'] = df.groupby('household_id')['counseling_count'].rolling(3).sum()

        return df

    def create_labels(self, df):
        """위기 레이블 생성 (과거 데이터 기반)"""
        # 실제 위기 발생 여부 (3개월 후)
        df['crisis_occurred'] = (
            (df['emergency_visit_count_future'] > 0) |
            (df['total_overdue_future'] >= 2) |
            (df['psychological_crisis_future'] == 1)
        ).astype(int)

        return df

    def train(self, X_train, y_train):
        """XGBoost 모델 학습"""
        self.model = xgb.XGBClassifier(
            max_depth=6,
            learning_rate=0.1,
            n_estimators=100,
            objective='binary:logistic',
            eval_metric='aucpr'
        )

        self.model.fit(X_train, y_train)

    def evaluate(self, X_test, y_test):
        """모델 평가"""
        y_pred = self.model.predict(X_test)

        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)

        print(f"Precision: {precision:.3f}")
        print(f"Recall: {recall:.3f}")
        print(f"F1 Score: {f1:.3f}")

        return {"precision": precision, "recall": recall, "f1": f1}

    def save_model(self, version):
        """모델 저장"""
        self.model.save_model(f'models/risk_predictor_v{version}.json')
```

### 4.2 텍스트 분석 모델 (KoBERT)

```python
# ml/models/text_analyzer.py

from transformers import BertTokenizer, BertForSequenceClassification
import torch

class PsychologicalTextAnalyzer:
    def __init__(self):
        self.tokenizer = BertTokenizer.from_pretrained('monologg/kobert')
        self.model = BertForSequenceClassification.from_pretrained(
            'monologg/kobert',
            num_labels=3  # negative, neutral, positive
        )

    def analyze_sentiment(self, text):
        """감정 분석"""
        inputs = self.tokenizer(text, return_tensors='pt', truncation=True, max_length=512)
        outputs = self.model(**inputs)

        probabilities = torch.softmax(outputs.logits, dim=1)
        sentiment_score = probabilities[0][2] - probabilities[0][0]  # positive - negative

        return sentiment_score.item()

    def extract_keywords(self, text):
        """핵심 키워드 추출"""
        crisis_keywords = ['우울', '고립', '외로움', '죽고싶', '힘들', '스트레스', '불안']

        found_keywords = [kw for kw in crisis_keywords if kw in text]

        return found_keywords

    def calculate_psychological_risk(self, text):
        """심리 위험도 점수 (0-100)"""
        sentiment = self.analyze_sentiment(text)
        keywords = self.extract_keywords(text)

        # 감정 점수: -1(매우 부정) ~ 1(매우 긍정)을 0-50 범위로 변환
        sentiment_score = (1 - sentiment) * 25

        # 키워드 점수: 위기 키워드 개수당 10점
        keyword_score = len(keywords) * 10

        total_score = min(sentiment_score + keyword_score, 100)

        return total_score
```

### 4.3 배치 예측 스크립트

```python
# ml/inference/batch_predictor.py

import pandas as pd
from datetime import datetime

class BatchRiskPredictor:
    def __init__(self, model_version='latest'):
        self.risk_model = self.load_model(model_version)
        self.text_analyzer = PsychologicalTextAnalyzer()

    def predict_daily(self):
        """매일 자정 전체 가구 위험도 예측"""
        # 1. 최신 데이터 로드
        households = self.load_all_households()

        # 2. 피처 생성
        features = self.generate_features(households)

        # 3. 예측 실행
        predictions = []

        for idx, row in features.iterrows():
            household_id = row['household_id']

            # 경제 위기 예측
            economic_risk = self.risk_model.predict_proba(row[self.economic_features])[0][1]

            # 건강 위기 예측
            health_risk = self.risk_model.predict_proba(row[self.health_features])[0][1]

            # 심리 위기 예측 (텍스트 분석)
            psychological_risk = self.analyze_psychological_risk(household_id)

            # 종합 위험도 계산
            total_risk_score = self.calculate_total_risk(
                economic_risk, health_risk, psychological_risk
            )

            predictions.append({
                'household_id': household_id,
                'predicted_at': datetime.now(),
                'risk_score': int(total_risk_score * 100),
                'risk_level': self.get_risk_level(total_risk_score),
                'economic_risk': economic_risk,
                'health_risk': health_risk,
                'psychological_risk': psychological_risk,
                'top_risk_factors': self.identify_top_factors(row)
            })

        # 4. 예측 결과 DB 저장
        self.save_predictions(predictions)

        # 5. 고위험 가구 알림
        self.notify_high_risk_households(predictions)

        return predictions

    def calculate_total_risk(self, economic, health, psychological):
        """종합 위험도 계산 (가중 평균)"""
        weights = {
            'economic': 0.35,
            'health': 0.30,
            'psychological': 0.35
        }

        total = (economic * weights['economic'] +
                 health * weights['health'] +
                 psychological * weights['psychological'])

        return total

    def get_risk_level(self, risk_score):
        """위험 등급 결정"""
        if risk_score < 0.3:
            return 'GREEN'
        elif risk_score < 0.6:
            return 'YELLOW'
        elif risk_score < 0.8:
            return 'ORANGE'
        else:
            return 'RED'
```

---

## 5. 데이터 파이프라인 (Airflow DAG)

```python
# data_pipeline/airflow/dags/daily_data_sync.py

from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'sejong-welfare',
    'depends_on_past': False,
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG(
    'daily_welfare_data_sync',
    default_args=default_args,
    description='일일 복지 데이터 동기화 및 예측',
    schedule_interval='0 0 * * *',  # 매일 자정
    start_date=datetime(2025, 1, 1),
    catchup=False
)

# Task 1: 외부 데이터 수집
def extract_external_data():
    from data_pipeline.extractors import (
        electricity_extractor,
        water_extractor,
        insurance_extractor,
        counseling_extractor
    )

    electricity_extractor.extract()
    water_extractor.extract()
    insurance_extractor.extract()
    counseling_extractor.extract()

extract_task = PythonOperator(
    task_id='extract_external_data',
    python_callable=extract_external_data,
    dag=dag
)

# Task 2: 데이터 변환 및 정제
def transform_data():
    from data_pipeline.transformers import data_normalizer, anonymizer

    data_normalizer.normalize()
    anonymizer.anonymize()

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform_data,
    dag=dag
)

# Task 3: 데이터 적재
def load_data():
    from data_pipeline.loaders import postgres_loader, mongodb_loader

    postgres_loader.load()
    mongodb_loader.load()

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load_data,
    dag=dag
)

# Task 4: AI 예측 실행
def run_predictions():
    from ml.inference.batch_predictor import BatchRiskPredictor

    predictor = BatchRiskPredictor()
    predictor.predict_daily()

prediction_task = PythonOperator(
    task_id='run_ai_predictions',
    python_callable=run_predictions,
    dag=dag
)

# Task 5: 알림 발송
def send_notifications():
    from app.services.notification_service import NotificationService

    notification_service = NotificationService()
    notification_service.send_daily_alerts()

notification_task = PythonOperator(
    task_id='send_notifications',
    python_callable=send_notifications,
    dag=dag
)

# Task 의존성 정의
extract_task >> transform_task >> load_task >> prediction_task >> notification_task
```

---

## 6. 보안 및 프라이버시 아키텍처

### 6.1 데이터 암호화

```python
# app/core/security.py

from cryptography.fernet import Fernet
import hashlib
import os

class DataEncryption:
    def __init__(self):
        self.key = os.environ.get('ENCRYPTION_KEY').encode()
        self.cipher = Fernet(self.key)

    def encrypt_pii(self, data):
        """개인식별정보 암호화"""
        return self.cipher.encrypt(data.encode()).decode()

    def decrypt_pii(self, encrypted_data):
        """개인식별정보 복호화"""
        return self.cipher.decrypt(encrypted_data.encode()).decode()

    def hash_household_id(self, real_id):
        """가구 ID 해시 처리 (일방향)"""
        return hashlib.sha256(real_id.encode()).hexdigest()
```

### 6.2 접근 제어 (RBAC)

```python
# app/core/permissions.py

from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"              # 시스템 관리자
    MANAGER = "manager"          # 사회서비스원 관리자
    COUNSELOR = "counselor"      # 복지 상담사
    VIEWER = "viewer"            # 읽기 전용

class Permissions:
    ROLES = {
        UserRole.ADMIN: [
            'view_all_households',
            'edit_all_households',
            'view_predictions',
            'manage_users',
            'view_audit_logs',
            'export_data'
        ],
        UserRole.MANAGER: [
            'view_all_households',
            'view_predictions',
            'create_interventions',
            'view_reports'
        ],
        UserRole.COUNSELOR: [
            'view_assigned_households',
            'create_interventions',
            'update_intervention_status'
        ],
        UserRole.VIEWER: [
            'view_aggregated_statistics'
        ]
    }

    @staticmethod
    def has_permission(user_role, permission):
        return permission in Permissions.ROLES.get(user_role, [])
```

---

## 7. 배포 아키텍처

### 7.1 Docker Compose 구성

```yaml
# docker-compose.yml

version: '3.8'

services:
  # 프론트엔드
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend

  # 백엔드 API
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/welfare_db
      - MONGODB_URL=mongodb://mongo:27017/welfare_db
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - mongo
      - redis

  # PostgreSQL
  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=welfare_db

  # MongoDB
  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db

  # Redis (캐싱)
  redis:
    image: redis:7

  # Airflow (데이터 파이프라인)
  airflow:
    build: ./data_pipeline/airflow
    ports:
      - "8080:8080"
    environment:
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql://user:pass@postgres:5432/airflow_db

  # ML 서비스
  ml_service:
    build: ./backend/ml
    ports:
      - "8001:8001"
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

volumes:
  postgres_data:
  mongo_data:
```

---

## 8. 모니터링 및 알림

### 8.1 시스템 모니터링 (Prometheus + Grafana)

```yaml
# monitoring/prometheus.yml

global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'backend'
    static_configs:
      - targets: ['backend:8000']

  - job_name: 'ml_service'
    static_configs:
      - targets: ['ml_service:8001']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres:5432']
```

### 8.2 알림 서비스

```python
# app/services/notification_service.py

class NotificationService:
    def __init__(self):
        self.email_client = EmailClient()
        self.sms_client = SMSClient()

    def send_high_risk_alert(self, household, counselor):
        """고위험 가구 알림"""
        message = f"""
        [세종시 복지 AI 시스템 알림]

        고위험 가구가 감지되었습니다.

        가구 ID: {household.masked_id}
        위험도: {household.risk_score}점
        주요 위험 요인: {household.top_risk_factors}

        긴급 개입이 필요합니다.
        """

        self.email_client.send(counselor.email, "긴급: 고위험 가구 감지", message)
        self.sms_client.send(counselor.phone, f"고위험 가구 감지 ({household.risk_score}점)")

    def send_daily_report(self, recipients):
        """일일 리포트"""
        report = self.generate_daily_report()
        self.email_client.send_bulk(recipients, "일일 위험 가구 리포트", report)
```

---

## 9. 성능 최적화 전략

### 9.1 캐싱 전략

```python
# app/utils/cache.py

import redis
import json

class CacheManager:
    def __init__(self):
        self.redis_client = redis.Redis(host='redis', port=6379, db=0)

    def cache_prediction(self, household_id, prediction, ttl=3600):
        """예측 결과 캐싱 (1시간)"""
        key = f"prediction:{household_id}"
        self.redis_client.setex(key, ttl, json.dumps(prediction))

    def get_cached_prediction(self, household_id):
        """캐시된 예측 결과 조회"""
        key = f"prediction:{household_id}"
        cached = self.redis_client.get(key)
        return json.loads(cached) if cached else None
```

### 9.2 데이터베이스 인덱싱

```sql
-- 성능 최적화를 위한 추가 인덱스
CREATE INDEX idx_predictions_risk_level ON predictions(risk_level, predicted_at);
CREATE INDEX idx_interventions_assigned_status ON interventions(assigned_to, status);
CREATE INDEX idx_structured_data_type_date ON structured_data(data_type, collected_at);
```

---

## 작성 정보
- **작성일**: 2025-10-31
- **버전**: 1.0
- **문서 유형**: System Architecture Document
