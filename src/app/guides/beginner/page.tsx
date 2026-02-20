'use client';

import { useState } from 'react';

export default function BeginnerGuidePage() {
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

  const basicSupplies = [
    { name: '식기', desc: '물과 밥을 담을 그릇 (세라믹/스테인리스 추천)' },
    { name: '화장실', desc: '적절한 크기의 모래상자' },
    { name: '고양이 모래', desc: '숯 모래 또는 소결 모래' },
    { name: '켄넬/캐리어', desc: '이동과 안식처 겸용' },
    { name: '캣타워', desc: '클라이밍과 스크래칭용' },
    { name: '스크래처', desc: '가구 보호용' },
    { name: '장난감', desc: '놀아주기용 (낚싯대, 공 등)' },
    { name: '빗', desc: '털 관리용' },
    { name: '네일클리퍼', desc: '발톱 깎기용' },
  ];

  const dangerousItems = [
    '양파, 마늘, 파 (적혈구 파괴)',
    '포도, 건포도 (신부전)',
    '초콜릿 (중독)',
    '카페인 (심박수 증가)',
    '알코올 (간 손상)',
    '날생선 (비타민 B1 결핍)',
    '우유 (소화 불량)',
    '라일락, 백합 (신부전)',
    '파라세타몰 독립 복용 (간 손상)',
    '락스, 세제 (화상)',
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">🐱 초보자 가이드</h1>
          <p className="text-lg md:text-xl text-pink-100">
            처음 고양이를 키우는 분을 위한 필수 가이드
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Section 1: 고양이 기본 행동 이해 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            🧐 고양이 기본 행동 이해
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <div className="text-3xl mb-4">😺</div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">쾌락 표현</h3>
              <ul className="space-y-2 text-pink-900">
                <li>• 꼬리 높이 쭉 뻗기</li>
                <li>• 부드럽게 골골 소리</li>
                <li>• 머리로 부딪히기</li>
                <li>• 배 드러내기</li>
                <li>• 천천히 깜빡이기</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="text-3xl mb-4">😾</div>
              <h3 className="text-xl font-semibold text-purple-700 mb-3">불쾌/공격 표현</h3>
              <ul className="space-y-2 text-purple-900">
                <li>• 꼬리 빠르게 흔들기</li>
                <li>• 귀 뒤로 펴기</li>
                <li>• 하악질하기</li>
                <li>• 털 세우기</li>
                <li>• 발톱 내기</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="text-3xl mb-4">🏃</div>
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">활동적 행동</h3>
              <ul className="space-y-2 text-indigo-900">
                <li>• 밤에 뛰어다니기</li>
                <li>• 사냥놀이 하기</li>
                <li>• 캣타워 오르기</li>
                <li>• 스크래칭하기</li>
                <li>• 물 구경하기</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl p-6 border border-pink-200">
              <div className="text-3xl mb-4">😴</div>
              <h3 className="text-xl font-semibold text-pink-700 mb-3">휴식 행동</h3>
              <ul className="space-y-2 text-pink-900">
                <li>• 하루 12-16시간 수면</li>
                <li>• 따뜻한 곳 선호</li>
                <li>• 자주 장소 바꾸기</li>
                <li>• 그루밍하기</li>
                <li>• 코로 세상 확인하기</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: 식사/화장실 관리 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            🍽️ 식사/화장실 관리
          </h2>

          <div className="space-y-6">
            {/* 식사 관리 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">🥣 식사 관리</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-green-600">✓ 급여 원칙</span>
                  <ul className="text-sm text-pink-900 mt-2 space-y-1">
                    <li>• 정해진 시간에 급여</li>
                    <li>• 신선한 물 항상 공급</li>
                    <li>• 연령에 맞는 사료 선택</li>
                    <li>• 과다 급여 금지</li>
                    <li>• 간식은 10% 이하</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-indigo-600">📅 급여 횟수</span>
                  <ul className="text-sm text-pink-900 mt-2 space-y-1">
                    <li>• 아기: 하루 4회</li>
                    <li>• 6개월: 하루 3회</li>
                    <li>• 1년 이상: 하루 2회</li>
                    <li>• 정량 급여가 중요</li>
                    <li>• 급식기 사용 추천</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 화장실 관리 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">🚽 화장실 관리</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-green-600">✓ 청소 원칙</span>
                  <ul className="text-sm text-purple-900 mt-2 space-y-1">
                    <li>• 매일 1회 이상 청소</li>
                    <li>• 1주에 1회 완전 교체</li>
                    <li>• 2마리: 화장실 2개 이상</li>
                    <li>• 조용하고 안전한 곳에</li>
                    <li>• 고양이 크기에 맞게</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-red-600">⚠️ 문제 신호</span>
                  <ul className="text-sm text-purple-900 mt-2 space-y-1">
                    <li>• 화장실 밖 배변</li>
                    <li>• 너무 자주/적게</li>
                    <li>• 변색/혈변</li>
                    <li>• 배변 시 소리 지르기</li>
                    <li>• 3일 이상 배변 안 함</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 기본 용품 소개 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            🛍️ 기본 용품 소개
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {basicSupplies.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-200 hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-2">{index + 1}</div>
                <h4 className="font-semibold text-pink-700 mb-1">{item.name}</h4>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: 건강 관리 기본 사항 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            🏥 건강 관리 기본 사항
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
              <h3 className="text-xl font-semibold text-pink-700 mb-4">📋 정기 검진</h3>
              <ul className="space-y-2 text-pink-900">
                <li>• <span className="font-semibold">입양 후 1-2주:</span> 첫 건강 검진</li>
                <li>• <span className="font-semibold">매년 1회:</span> 정기 건강 검진</li>
                <li>• <span className="font-semibold">7세 이상:</span> 6개월마다 검진</li>
                <li>• <span className="font-semibold">10세 이상:</span> 3개월마다 검진</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">💉 예방 접종</h3>
              <ul className="space-y-2 text-purple-900">
                <li>• <span className="font-semibold">3종 혼합:</span> 헤르페스, 칼라시바이러스, 범백혈구</li>
                <li>• <span className="font-semibold">광견병:</span> 법정 접종 필수</li>
                <li>• <span className="font-semibold">백혈병:</span> 실외 고양이 필수</li>
                <li>• <span className="font-semibold">접종 시기:</span> 8주부터 2-4주 간격</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-700 mb-4">🔍 건강 체크리스트</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-green-600">✓ 정상</span>
                  <ul className="text-sm text-indigo-900 mt-2 space-y-1">
                    <li>• 활기찬 움직임</li>
                    <li>• 꾸준한 식욕</li>
                    <li>• 맑은 눈</li>
                    <li>• 깨끗한 귀</li>
                    <li>• 윤기 있는 털</li>
                  </ul>
                </div>
                <div>
                  <span className="font-semibold text-red-600">⚠️ 병원 필요</span>
                  <ul className="text-sm text-indigo-900 mt-2 space-y-1">
                    <li>• 식욕 저하 3일 이상</li>
                    <li>• 구토 3회 이상</li>
                    <li>• 설사 3일 이상</li>
                    <li>• 호흡 곤란</li>
                    <li>• 행동 변화 큼</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 위험한 행동/식품 알림 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            ⚠️ 위험한 행동/식품 알림
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 위험한 식품 */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-700 mb-4">🚫 절대 금지 식품</h3>
              <ul className="space-y-2 text-red-900">
                {dangerousItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 위험한 행동 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-700 mb-4">⚠️ 위험한 행동 막기</h3>
              <ul className="space-y-2 text-orange-900">
                <li>• 창문/발코니 낙사 방지</li>
                <li>• 전선 씹기 방지</li>
                <li>• 작은 물건 삼키기 방지</li>
                <li>• 높은 곳에서 뛰어내리기</li>
                <li>• 물가에서 혼자 방치 금지</li>
                <li>• 옷/목걸이 너무 조이기 금지</li>
                <li>• 강제로 안기기 금지</li>
                <li>• 꼬리/귀 잡아당기기 금지</li>
                <li>• 놀랄 수 있는 행동 금지</li>
                <li>• 화장실 근처에서 방해 금지</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-orange-700 mb-3">💡 응급 상황 대처</h3>
            <ul className="space-y-2 text-orange-900">
              <li>• <span className="font-semibold">즉시 병원:</span> 호흡 곤란, 출혈, 의식 저하, 골절</li>
              <li>• <span className="font-semibold">24시간 내 병원:</span> 구토, 설사, 식욕 저하 3일 이상</li>
              <li>• <span className="font-semibold">전화 상담:</span> 확실하지 않을 때 먼저 상담</li>
              <li>• <span className="font-semibold">응급 전화:</span> 1588-4080 (국립 동물 병원)</li>
            </ul>
          </div>
        </section>

        {/* Section 6: 체크리스트 */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
            ✅ 준비 완료 체크리스트
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              '고양이 행동을 이해했나요?',
              '식사/화장실 관리를 익혔나요?',
              '기본 용품을 준비했나요?',
              '건강 관리 기본을 알았나요?',
              '위험한 식품을 피할 수 있나요?',
              '응급 대처법을 알았나요?',
              '동물 병원을 찾았나요?',
              '책임감을 가졌나요?',
            ].map((item, index) => (
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
              완료: {checkedItems.size} / 8 ({Math.round((checkedItems.size / 8) * 100)}%)
            </p>
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
