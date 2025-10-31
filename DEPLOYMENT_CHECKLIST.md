# 🚨 Vercel 404 에러 해결 체크리스트

## 현재 배포: https://vercel.com/yongparks-projects/sejong-citizen-welfare

---

## ✅ 1단계: Root Directory 확인 (가장 중요!)

https://vercel.com/yongparks-projects/sejong-citizen-welfare/settings/general

**General → Root Directory**
- [ ] "Include source files outside of the Root Directory in the Build Step" 체크박스 **체크 안 함**
- [ ] Root Directory에 **정확히** `frontend` 입력 (앞뒤 공백 없이)
- [ ] **Save** 클릭

**스크린샷으로 확인:**
```
Root Directory: frontend
○ Include source files outside of the Root Directory in the Build Step
```

---

## ✅ 2단계: Build & Development Settings 확인

같은 Settings 페이지에서:

**Build Command**
- [ ] **Override** 체크 **안 함** (비활성화)
- Vercel이 자동으로 `npm run build` 사용

**Output Directory**
- [ ] **Override** 체크 **안 함** (비활성화)
- Vercel이 자동으로 `.next` 사용

**Install Command**
- [ ] **Override** 체크 **안 함** (비활성화)
- Vercel이 자동으로 `npm install` 사용

**Framework Preset**
- [ ] **Next.js** 선택 (자동 감지되어야 함)

---

## ✅ 3단계: 환경 변수 확인

https://vercel.com/yongparks-projects/sejong-citizen-welfare/settings/environment-variables

- [ ] `ANTHROPIC_API_KEY` 추가됨
- [ ] Production ✅
- [ ] Preview ✅
- [ ] Development ✅

**주의**: 환경 변수가 없어도 빌드는 성공하지만 AI 분석 기능이 작동하지 않습니다.

---

## ✅ 4단계: 프로젝트 재배포

위 설정 변경 후:

1. https://vercel.com/yongparks-projects/sejong-citizen-welfare/deployments
2. 가장 최근 배포 찾기
3. 오른쪽 **⋯** (점 3개) 클릭
4. **Redeploy** 선택
5. **Redeploy** 확인 버튼 클릭

---

## ✅ 5단계: 배포 로그 확인

https://vercel.com/yongparks-projects/sejong-citizen-welfare/deployments

배포 진행 중이면 클릭하여 실시간 로그 확인:

### 성공적인 빌드 로그 예시:
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (7/7)
✓ Finalizing page optimization

Route (app)                Size     First Load JS
┌ ○ /                     1.6 kB   107 kB
├ ○ /about               6.3 kB   128 kB
├ ○ /households          31 kB    187 kB
└ ƒ /households/[id]     112 kB   268 kB
```

### 실패 징후:
- ❌ "No package.json found" → Root Directory 미설정
- ❌ "Module not found" → 의존성 문제
- ❌ "Build failed" → 코드 오류

---

## ✅ 6단계: 배포 URL 테스트

배포 완료 후 (1-2분 소요):

### 메인 페이지
- [ ] https://sejong-citizen-welfare.vercel.app
- 예상: 대시보드 페이지 로딩

### 가구 목록
- [ ] https://sejong-citizen-welfare.vercel.app/households
- 예상: 120개 가구 목록 표시

### 가구 상세
- [ ] https://sejong-citizen-welfare.vercel.app/households/hh_001
- 예상: 가구 정보 및 차트 표시

### 프로젝트 소개
- [ ] https://sejong-citizen-welfare.vercel.app/about
- 예상: 프로젝트 소개 페이지

---

## 🔍 여전히 404가 발생하면?

### 방법 1: 캐시 클리어
1. Vercel 대시보드 → 프로젝트
2. 최근 배포의 **⋯** 메뉴
3. **Redeploy** 선택
4. ✅ **"Clear Cache"** 체크
5. Redeploy 클릭

### 방법 2: 브라우저 캐시 삭제
- Ctrl + Shift + R (하드 리프레시)
- 시크릿 모드로 접속 테스트

### 방법 3: DNS 전파 대기
- 새 프로젝트인 경우 DNS 전파에 5-10분 소요
- https://www.whatsmydns.net 에서 확인

### 방법 4: Vercel 지원 확인
배포 로그에서 구체적인 에러 메시지를 확인하고:
- 빌드 로그 캡처
- Settings 스크린샷
- GitHub Issues에 보고

---

## 📞 추가 지원

문제가 지속되면:

1. **배포 로그 전체 복사**
   - Deployments → 실패한 배포 클릭
   - 전체 로그 복사

2. **Settings 스크린샷**
   - General 탭 전체
   - Build & Development Settings 섹션

3. **연락처**
   - Email: sanoramyun8@gmail.com
   - GitHub Issues: https://github.com/yonghwan1106/sejong_citizen_welfare/issues

---

## ✨ 예상 최종 설정

```
Project: sejong-citizen-welfare
Framework: Next.js
Root Directory: frontend
Build Command: (자동)
Output Directory: (자동)
Install Command: (자동)
Node Version: 18.x (자동)
```

모든 설정이 끝나면 약 1-2분 내에 정상 배포됩니다! 🚀
