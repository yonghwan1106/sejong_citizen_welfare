# Vercel 배포 가이드

## 🚀 Vercel에서 프로젝트 설정하기

### 1. GitHub 저장소 연결

1. [Vercel Dashboard](https://vercel.com/dashboard)에 접속
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 `yonghwan1106/sejong_citizen_welfare` 선택
4. Import 클릭

### 2. 프로젝트 설정 (중요!)

**반드시 다음 설정을 적용하세요:**

#### ✅ Root Directory
```
frontend
```
- **"Edit"** 버튼을 클릭하여 Root Directory를 `frontend`로 설정
- 이것이 가장 중요합니다!

#### ✅ Framework Preset
```
Next.js
```
- 자동 감지됨 (Root Directory 설정 후)

#### ✅ Build Settings (자동 설정됨)
Root Directory를 `frontend`로 설정하면:

- **Build Command**: `next build` 또는 `npm run build`
- **Output Directory**: `.next` (비워두기)
- **Install Command**: `npm install`

**주의**:
- `vercel.json`은 사용하지 않습니다 (삭제됨)
- Vercel이 Next.js를 자동으로 감지하도록 합니다
- Root Directory 설정만으로 충분합니다

### 3. 환경 변수 설정

Settings → Environment Variables로 이동하여 추가:

| Key | Value | Environment |
|-----|-------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Production, Preview, Development |

**주의**: Anthropic API 키는 [console.anthropic.com](https://console.anthropic.com/)에서 발급받으세요.

### 4. 배포

- "Deploy" 버튼 클릭
- 배포가 완료되면 자동으로 URL이 생성됩니다
- 이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다

## 🔧 배포 문제 해결

### 에러: "No package.json found"

**원인**: Root Directory가 설정되지 않음

**해결방법**:
1. Vercel 프로젝트 Settings로 이동
2. General → Root Directory 섹션
3. "Edit" 클릭 후 `frontend` 입력
4. Save 후 재배포

### 에러: "Build failed"

**확인사항**:
1. 로컬에서 빌드가 성공하는지 확인:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. `.env.local.example`을 참고하여 환경 변수가 올바른지 확인

3. Vercel 배포 로그에서 구체적인 에러 메시지 확인

### 에러: "ANTHROPIC_API_KEY is not defined"

**원인**: 환경 변수 미설정

**해결방법**:
1. Vercel Dashboard → 프로젝트 선택
2. Settings → Environment Variables
3. `ANTHROPIC_API_KEY` 추가
4. Redeploy

## 📝 수동 배포 (Vercel CLI)

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리로 이동
cd sejong_citizen_welfare/frontend

# 배포
vercel --prod

# 환경 변수 설정
vercel env add ANTHROPIC_API_KEY
```

## 🔄 자동 배포 워크플로우

설정 완료 후:

1. **코드 푸시** → GitHub `main` 브랜치
2. **Vercel 감지** → 자동으로 빌드 시작
3. **빌드 성공** → 프로덕션 배포
4. **배포 완료** → 라이브 URL 업데이트

Pull Request 생성 시에는 프리뷰 배포가 자동으로 생성됩니다.

## ✅ 배포 확인

배포가 완료되면 다음을 확인하세요:

1. **홈페이지** (`/`): 대시보드 로딩 확인
2. **가구 목록** (`/households`): 120개 가구 데이터 표시
3. **가구 상세** (`/households/hh_001`): 차트 및 정보 표시
4. **AI 분석**: "Claude AI로 심층 분석하기" 버튼 작동 확인
5. **프로젝트 소개** (`/about`): 소개 페이지 로딩 확인

## 🆘 도움이 필요하신가요?

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- 이메일: sanoramyun8@gmail.com
