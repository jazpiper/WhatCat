'use client';

import { useState } from 'react';

export default function AdoptionGuidePage() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const checklistItems = [
    '가족 모두가 입양에 동의했나요?',
    '알레르기 확인을 했나요?',
    '주거 환경이 고양이에게 적합한가요?',
    '충분한 공간을 확보했나요?',
    '위험한 물건을 치웠나요?',
    '고양이 반려 동물 허용 여부를 확인했나요?',
    '월 평균 비용을 계산했나요?',
    '비상비를 마련했나요?',
    '충분한 시간을 낼 수 있나요?',
    '휴가/여행 계획을 고려했나요?',
    '동물 병원을 찾아놨나요?',
    '예방접종 일정을 알아봤나요?',
    '기본 용품을 구매했나요?',
    '음식을 선택했나요?',
    '화장실과 모래를 준비했나요?',
    '켄넬/캐리어를 준비했나요?',
    '장난감을 준비했나요?',
    '스크래처를 준비했나요?',
    '고양이의 행동을 이해했나요?',
    '책임감 있게 돌볼 준비가 되었나요?'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🐱 입양 가이드</h1>
          <p className="text-lg md:text-xl text-pink-100">
            고양이 가족을 맞이하기 위한 완벽한 준비
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Section 1: 입양 전 고려사항 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            🤔 입양 전 고려사항
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 환경 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">환경</h3>
              <ul className="space-y-2 text-pink-900">
                <li>• 주거 공간 크기</li>
                <li>• 안전한 환경 조성</li>
                <li>• 온돌/바닥 난방</li>
                <li>• 환기 상태</li>
                <li>• 베란다/창문 안전</li>
              </ul>
            </div>

            {/* 시간 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">시간</h3>
              <ul className="space-y-2 text-purple-900">
                <li>• 매일 먹이 주기</li>
                <li>• 놀아주는 시간</li>
                <li>• 화장실 청소</li>
                <li>• 정기 검진 예약</li>
                <li>• 15년 이상 책임</li>
              </ul>
            </div>

            {/* 비용 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">비용</h3>
              <ul className="space-y-2 text-indigo-900">
                <li>• 월 5~10만원 식비</li>
                <li>• 예방접종 비용</li>
                <li>• 중성화 수술비</li>
                <li>• 장난감/용품</li>
                <li>• 의료비 비상금</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 입양 장소별 장단점 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            📍 입양 장소별 장단점
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 보호소 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">보호소</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-green-600">✓ 장점</span>
                  <ul className="text-sm text-pink-900 mt-1 space-y-1">
                    <li>• 무료 또는 저렴</li>
                    <li>• 이미 구조된 고양이</li>
                    <li>• 건강 검사 완료</li>
                    <li>• 사랑이 필요한 아이</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-red-600">✗ 단점</span>
                  <ul className="text-sm text-pink-900 mt-1 space-y-1">
                    <li>• 과거 이력 불확실</li>
                    <li>• 트라우마 가능</li>
                    <li>• 선별 과정 복잡</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 브리더 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">브리더</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-green-600">✓ 장점</span>
                  <ul className="text-sm text-purple-900 mt-1 space-y-1">
                    <li>• 종자 가명 확인</li>
                    <li>• 건강 관리 철저</li>
                    <li>• 성격 예측 가능</li>
                    <li>• 컨설팅 가능</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-red-600">✗ 단점</span>
                  <ul className="text-sm text-purple-900 mt-1 space-y-1">
                    <li>• 비용이 비쌈</li>
                    <li>• 불량 브리더 위험</li>
                    <li>• 대기 시간 길음</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 인터넷 */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">인터넷</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-green-600">✓ 장점</span>
                  <ul className="text-sm text-indigo-900 mt-1 space-y-1">
                    <li>• 다양한 선택지</li>
                    <li>• 편리한 연락</li>
                    <li>• 사진/영상 확인</li>
                    <li>• 분양자 직접 선택</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-red-600">✗ 단점</span>
                  <ul className="text-sm text-indigo-900 mt-1 space-y-1">
                    <li>• 직접 확인 필수</li>
                    <li>• 사기 주의 필요</li>
                    <li>• 건강 상태 불확실</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 입양 준비 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            ✅ 입양 준비 체크리스트
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleCheck(index)}
                className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  checkedItems.has(index)
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300'
                    : 'bg-[var(--bg-page)] border-2 border-[var(--border-default)] hover:border-pink-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    checkedItems.has(index)
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-[var(--bg-page)]'
                  }`}
                >
                  {checkedItems.has(index) && <span className="text-sm">✓</span>}
                </div>
                <span className={`text-sm md:text-base ${checkedItems.has(index) ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
            <p className="text-center text-pink-700 font-semibold">
              완료: {checkedItems.size} / {checklistItems.length} ({Math.round((checkedItems.size / checklistItems.length) * 100)}%)
            </p>
          </div>
        </section>

        {/* Section 4: 첫주 적응 가이드 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            📅 첫주 적응 가이드
          </h2>

          <div className="space-y-4">
            {/* Day 1-2 */}
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <h3 className="text-xl font-semibold text-pink-700 mb-3">Day 1-2: 안정 기간</h3>
              <ul className="space-y-2 text-pink-900">
                <li>• 조용한 공간에 안전하게 두기</li>
                <li>• 강제로 만지거나 꺼내지 않기</li>
                <li>• 물과 식사를 가까이 두기</li>
                <li>• 가능한 적게 방문하기</li>
              </ul>
            </div>

            {/* Day 3-5 */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-3">Day 3-5: 접촉 시작</h3>
              <ul className="space-y-2 text-purple-900">
                <li>• 천천히 다가가기</li>
                <li>• 먹이를 줄 때 말 걸기</li>
                <li>• 장난감으로 놀아주기</li>
                <li>• 고양이의 신호에 맞추기</li>
              </ul>
            </div>

            {/* Day 6-7 */}
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">Day 6-7: 적응 완료</h3>
              <ul className="space-y-2 text-indigo-900">
                <li>• 집 전체를 허용하기</li>
                <li>• 정기적인 식사 시간 확립</li>
                <li>• 안아주는 시간 늘리기</li>
                <li>• 동물 병원 방문 계획</li>
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-orange-700 mb-3">💡 꿀팁</h3>
            <ul className="space-y-2 text-orange-900">
              <li>• 첫 3일은 너무 방문하지 않는 것이 중요</li>
              <li>• 페로몬 스프레이 사용하면 안정감 증가</li>
              <li>• 고양이가 올 때까지 기다릴 것</li>
              <li>• 밤에는 조용한 환경 유지</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-8 px-4 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-pink-100">
            준비된 가족을 기다리는 고양이가 있어요 🐱
          </p>
        </div>
      </div>
    </main>
  );
}
