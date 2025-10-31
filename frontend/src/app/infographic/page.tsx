export default function InfoGraphicPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="page max-w-[1200px] mx-auto bg-white">
        {/* 타이틀 섹션 */}
        <div className="title-section px-20 py-20 bg-white relative">
          <div className="badge-top inline-block bg-black text-white px-6 py-2.5 text-xs font-bold tracking-wider mb-8 uppercase">
            2025 세종시사회서비스원 시민복지아이디어 공모전
          </div>
          <h1 className="main-headline text-[92px] font-black leading-[0.9] text-black mb-6 tracking-tighter">
            <span className="highlight bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#4c00ff] bg-clip-text text-transparent">
              AI
            </span>
            로<br />
            위기를
            <br />
            예측하다
          </h1>
          <p className="subtitle-line text-2xl text-gray-600 font-medium tracking-tight">
            빅데이터 기반 잠재적 위기가구 선제 발굴 시스템
          </p>
        </div>

        {/* 분할 화면 */}
        <div className="split-screen grid grid-cols-[45%_55%] h-[650px]">
          <div className="left-side bg-[#1a1a1a] px-16 py-16 relative flex flex-col justify-center">
            <div className="deco-circle absolute w-[400px] h-[400px] rounded-full border-2 border-white/10 -top-[200px] -right-[200px]"></div>
            <div className="problem-label text-[#ff0080] text-sm font-bold tracking-[3px] mb-5 uppercase">
              PROBLEM
            </div>
            <h2 className="problem-title text-[72px] font-extrabold leading-[0.95] text-white mb-8 tracking-tight">
              사후
              <br />
              발굴의
              <br />
              한계
            </h2>

            <div className="problem-stats flex gap-8 mt-10">
              <div className="stat-box flex-1">
                <div className="stat-number text-5xl font-extrabold text-[#ff0080] leading-none mb-2">
                  15만
                </div>
                <div className="stat-label text-[13px] text-gray-500 leading-snug">
                  중앙발굴
                  <br />
                  위기 가구
                </div>
              </div>
              <div className="stat-box flex-1">
                <div className="stat-number text-5xl font-extrabold text-[#ff0080] leading-none mb-2">
                  1,100만
                </div>
                <div className="stat-label text-[13px] text-gray-500 leading-snug">
                  데이터 건수
                  <br />
                  (사후 징후)
                </div>
              </div>
            </div>
          </div>

          <div className="right-side bg-gradient-to-br from-[#ff0080] via-[#7928ca] to-[#4c00ff] px-16 py-16 relative flex flex-col justify-center">
            <div className="deco-lines absolute top-1/2 right-16 -translate-y-1/2">
              <div className="deco-line w-16 h-[3px] bg-white/30 my-2"></div>
              <div className="deco-line w-16 h-[3px] bg-white/30 my-2"></div>
              <div className="deco-line w-16 h-[3px] bg-white/30 my-2"></div>
            </div>
            <div className="solution-label text-white text-sm font-bold tracking-[3px] mb-5 uppercase opacity-90">
              SOLUTION
            </div>
            <h2 className="solution-title text-[68px] font-extrabold leading-[0.95] text-white mb-6 tracking-tight">
              선제적
              <br />
              예측
              <br />
              시스템
            </h2>
            <p className="solution-desc text-lg leading-relaxed text-white/90 mb-9">
              위기 발생 6개월 전, 70~80% 확률로 잠재 위기가구를 예측하여 골든타임에 개입
            </p>

            <div className="solution-features flex gap-4 flex-wrap">
              <span className="feature-pill bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-[13px] font-semibold text-white border border-white/30">
                심리 데이터 융합
              </span>
              <span className="feature-pill bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-[13px] font-semibold text-white border border-white/30">
                건강 패턴 분석
              </span>
              <span className="feature-pill bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-[13px] font-semibold text-white border border-white/30">
                AI 머신러닝
              </span>
              <span className="feature-pill bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-[13px] font-semibold text-white border border-white/30">
                실시간 예측
              </span>
              <span className="feature-pill bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full text-[13px] font-semibold text-white border border-white/30">
                맞춤형 개입
              </span>
            </div>
          </div>

          <div className="diagonal-divider absolute top-0 left-[45%] w-1 h-full bg-white -skew-x-[8deg] shadow-[0_0_40px_rgba(255,255,255,0.5)]"></div>
        </div>

        {/* 프로세스 타임라인 */}
        <div className="process-section px-20 py-16 bg-gray-100">
          <div className="section-header text-lg font-bold text-[#ff0080] tracking-[2px] mb-10 uppercase">
            03 STEP STRATEGY
          </div>

          <div className="process-timeline relative">
            <div className="timeline-item grid grid-cols-[100px_1fr] gap-10 mb-12 relative">
              <div className="timeline-number text-[96px] font-black text-black leading-[0.8] tracking-[-4px]">
                01
              </div>
              <div className="timeline-content">
                <h3 className="text-[32px] font-extrabold text-black mb-3 tracking-tight">
                  데이터 레이크 구축
                </h3>
                <p className="text-[15px] text-gray-700 leading-relaxed mb-4">
                  정형 데이터(단전·단수·건보료)와 비정형 데이터(심리상담·AI상담로그·병원이력)를 융합한 세종형
                  복지 데이터 플랫폼
                </p>
                <div className="timeline-tags flex flex-wrap gap-2.5 mt-4">
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    단전·단수
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    건보료
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    심리상담
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    병원이력
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    AI상담로그
                  </span>
                </div>
              </div>
            </div>

            <div className="timeline-item grid grid-cols-[100px_1fr] gap-10 mb-12 relative">
              <div className="timeline-number text-[96px] font-black text-black leading-[0.8] tracking-[-4px]">
                02
              </div>
              <div className="timeline-content">
                <h3 className="text-[32px] font-extrabold text-black mb-3 tracking-tight">
                  AI 예측 모델 개발
                </h3>
                <p className="text-[15px] text-gray-700 leading-relaxed mb-4">
                  머신러닝 기반 복합 패턴 분석으로 6개월 내 위기 확률 예측. &quot;고립 키워드 증가 + 병원
                  방문 급감 + 소액 연체&quot; 등 다차원 분석
                </p>
                <div className="timeline-tags flex flex-wrap gap-2.5 mt-4">
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    70~80% 정확도
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    위험도 순위화
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    실시간 예측
                  </span>
                </div>
              </div>
            </div>

            <div className="timeline-item grid grid-cols-[100px_1fr] gap-10 mb-12 relative">
              <div className="timeline-number text-[96px] font-black text-black leading-[0.8] tracking-[-4px]">
                03
              </div>
              <div className="timeline-content">
                <h3 className="text-[32px] font-extrabold text-black mb-3 tracking-tight">
                  선제 개입 플랫폼
                </h3>
                <p className="text-[15px] text-gray-700 leading-relaxed mb-4">
                  AI 예측 결과를 담당자가 즉시 확인하고 맞춤형 서비스(심리상담·소셜다이닝·긴급돌봄·일자리)
                  연계
                </p>
                <div className="timeline-tags flex flex-wrap gap-2.5 mt-4">
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    실시간 알림
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    맞춤 서비스
                  </span>
                  <span className="timeline-tag bg-white text-black px-4 py-1.5 text-xs font-semibold border-2 border-black">
                    자동 연계
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 데이터 비주얼 */}
        <div className="data-visual px-20 py-20 bg-black text-white relative">
          <div className="visual-grid grid grid-cols-2 gap-16 items-center">
            <div className="data-left">
              <h2 className="text-[56px] font-black leading-tight mb-8 tracking-tight">
                세종시가
                <br />
                얻는 것
              </h2>
              <ul className="impact-list list-none">
                <li className="py-5 border-b border-gray-700 text-lg font-semibold text-gray-300 before:content-['→_'] before:text-[#ff0080] before:mr-2.5 before:font-extrabold">
                  시민 존엄성 보호 & 사회적 실패 예방
                </li>
                <li className="py-5 border-b border-gray-700 text-lg font-semibold text-gray-300 before:content-['→_'] before:text-[#ff0080] before:mr-2.5 before:font-extrabold">
                  사회적·행정적 비용 획기적 절감
                </li>
                <li className="py-5 border-b border-gray-700 text-lg font-semibold text-gray-300 before:content-['→_'] before:text-[#ff0080] before:mr-2.5 before:font-extrabold">
                  전국 확산 가능한 선도 모델
                </li>
                <li className="py-5 border-b border-gray-700 text-lg font-semibold text-gray-300 before:content-['→_'] before:text-[#ff0080] before:mr-2.5 before:font-extrabold">
                  복지 행정 효율성 극대화
                </li>
              </ul>
            </div>

            <div className="budget-showcase bg-gradient-to-br from-[#ff0080] via-[#7928ca] to-[#4c00ff] px-12 py-12 relative overflow-hidden before:content-['₩'] before:absolute before:text-[300px] before:font-black before:text-white/5 before:-top-20 before:-right-10">
              <div className="budget-label-top text-sm font-bold tracking-[2px] mb-5 opacity-80 uppercase relative z-10">
                Initial Budget
              </div>
              <div className="budget-mega text-[88px] font-black leading-[0.9] mb-5 tracking-tighter relative z-10">
                2 억원
              </div>
              <div className="budget-breakdown text-sm leading-relaxed opacity-90 relative z-10">
                AI 모델 7천만 + 데이터 연동 5천만
                <br />
                운영·유지보수 5천만 + 예비비 3천만
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="footer px-20 py-10 bg-white flex justify-between items-center border-t-[3px] border-black">
          <div className="footer-left text-sm text-gray-600">
            제안자 <strong className="text-black font-extrabold text-lg">박용환</strong>
          </div>
          <div className="footer-right text-right text-xs text-gray-400">
            세종시의 미래 복지를 위한 AI 혁신
            <br />
            사후 대응에서 사전 예방으로의 패러다임 전환
          </div>
        </div>
      </div>
    </div>
  );
}
