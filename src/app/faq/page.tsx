'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: '🧪 테스트 관련',
    items: [
      {
        question: '테스트 결과는 얼마나 정확한가요?',
        answer: 'WhatCat의 테스트는 머신러닝과 AI 기반 분석을 활용하여 약 85-90%의 정확도를 보입니다. 하지만 고양이의 표정과 사진 조건에 따라 결과가 달라질 수 있으니 참고용으로 활용해주세요.'
      },
      {
        question: '같은 사진으로 다시 테스트하면 결과가 같나요?',
        answer: '같은 사진이라도 AI의 분석 과정에서 미세한 차이가 발생할 수 있어 결과가 약간 다를 수 있습니다. 하지만 대체로 유사한 결과가 나옵니다.'
      },
      {
        question: '친구의 고양이와 테스트 결과를 비교할 수 있나요?',
        answer: '네! WhatCat에서 친구와 결과를 공유하고 서로 비교해볼 수 있습니다. 인스타그램이나 카카오톡을 통해 결과를 쉽게 공유하세요.'
      },
      {
        question: '얼굴이 안 보이는 사진도 테스트 가능한가요?',
        answer: '얼굴이 잘 보이는 사진일수록 정확도가 높습니다. 얼굴이 가려지거나 너무 멀리 있는 사진은 정확한 분석이 어려울 수 있습니다.'
      },
      {
        question: '테스트 결과에 신뢰도 점수가 있나요?',
        answer: '네, 각 테스트 결과에는 AI 분석 신뢰도가 표시됩니다. 신뢰도가 높을수록 더 정확한 결과입니다.'
      },
      {
        question: '여러 장의 사진을 동시에 테스트할 수 있나요?',
        answer: '현재는 한 번에 한 장의 사진씩 테스트할 수 있습니다. 여러 사진을 테스트하고 싶으시다면 각각 테스트해주세요.'
      },
      {
        question: '테스트 결과가 이상하게 나왔어요.',
        answer: '사진의 조명, 각도, 고양이의 표정 등 여러 요인이 영향을 줄 수 있습니다. 얼굴이 선명하게 보이는 사진으로 다시 시도해보세요.'
      },
      {
        question: '테스트를 얼마나 자주 할 수 있나요?',
        answer: '테스트 횟수에 제한은 없습니다. 언제든지 원하실 때마다 자유롭게 테스트해보세요!'
      },
      {
        question: '테스트 결과가 저장되나요?',
        answer: '네, 사용자의 계정에 테스트 이력이 자동으로 저장됩니다. 언제든지 과거 결과를 다시 확인할 수 있습니다.'
      },
      {
        question: '어떤 종류의 테스트가 제공되나요?',
        answer: '현재 품종 분석, 성격 예측, 나이 추정, 컨디션 체크 등 다양한 테스트를 제공하고 있습니다. 지속적으로 새로운 테스트가 추가됩니다.'
      },
      {
        question: '테스트 결과를 PDF로 저장할 수 있나요?',
        answer: '현재는 결과를 이미지 형태로 저장할 수 있습니다. PDF 다운로드 기능은 준비 중입니다.'
      }
    ]
  },
  {
    title: '🐱 품종 관련',
    items: [
      {
        question: '러시안 블루는 어떤 특징이 있나요?',
        answer: '러시안 블루는 은회색 털, 초록색 눈, 우아한 체형이 특징입니다. 조용하고 차분한 성격으로 아파트에서 키우기에 적합하며, 가족과 잘 지냅니다.'
      },
      {
        question: '아파트에서 키우기 좋은 품종은?',
        answer: '러시안 블루, 스코티시 폴드, 아메리칸 숏헤어, 버마 등은 조용하고 공간에 잘 적응하는 품종입니다. WhatCat 테스트를 통해 내 고양이의 품종 특성을 확인해보세요.'
      },
      {
        question: '털 빗질이 필요한 품종은?',
        answer: '페르시안, 래그돌, 메인쿤 같은 장모종은 매일 빗질이 필요합니다. 숏헤어도 주 2-3회 정도 빗질하면 건강한 털을 유지할 수 있습니다.'
      },
      {
        question: '어린이와 잘 지내는 품종은?',
        answer: '래그돌, 래그머핀, 아메리칸 숏헤어, 버마, 터키쉬 앙고라 등은 아이들과 잘 어울리고 온순한 성격을 가진 품종입니다.'
      },
      {
        question: '혼자 잘 지내는 품종은?',
        answer: '러시안 블루, 영국 쇼트헤어, 아메리칸 쇼트헤어 등은 독립적인 성격으로 혼자 있는 시간에도 잘 적응합니다.'
      },
      {
        question: '알레르기가 있는 사람에게 적합한 품종은?',
        answer: '발리니즈, 쏘데스, 샤페이, 러시안 블루 등은 저알레르기성으로 알려져 있지만, 완전히 알레르기가 없는 품종은 없습니다.'
      },
      {
        question: '짖는 소리가 적은 품종은?',
        answer: '러시안 블루, 영국 쇼트헤어, 스코티시 폴드 등은 비교적 조용한 품종입니다. 시암, 벵갈은 소리가 더 많은 편입니다.'
      },
      {
        question: '활동적인 고양이를 원한다면?',
        answer: '벵갈, 아비시니안, 터키쉬 앙고라, 에그iptian mau 등은 에너지가 넘치고 장난치는 것을 좋아하는 품종입니다.'
      },
      {
        question: '대형 품종은 어떤 것들이 있나요?',
        answer: '메인쿤, 래그돌, 노르웨이 숲고양이, 사바나 등은 큰 체구와 긴 털이 특징입니다. 신체적으로도 튼튼하고 활동적입니다.'
      },
      {
        question: '숏헤어 품종의 장점은?',
        answer: '털 관리가 쉽고 털빗질 횟수가 적어 바쁜 분들에게 적합합니다. 아메리칸 숏헤어, 영국 쇼트헤어, 러시안 블루 등이 있습니다.'
      },
      {
        question: '접힌 귀를 가진 품종은?',
        answer: '스코티시 폴드와 아메리칸 컬이 대표적입니다. 스코티시 폴드는 접힌 귀, 아메리칸 컬은 뒤로 말린 귀가 특징입니다.'
      },
      {
        question: '꼬리가 없는 품종이 있나요?',
        answer: '맨스 캣(맨스섬 고양이)은 꼬리가 없거나 아주 짧은 것이 특징입니다. 돌돌 말린 꼬리를 가진 경우도 있습니다.'
      },
      {
        question: '물을 좋아하는 품종은?',
        answer: '메인쿤, 터키쉬 반, 벵갈, 노르웨이 숲고양이 등은 물을 즐겨 찾는 경향이 있습니다.'
      },
      {
        question: '긴 수명을 가진 품종은?',
        answer: '시암, 러시안 블루, 영국 쇼트헤어 등은 15-20년 이상의 긴 수명을 가지는 경향이 있습니다. 적절한 관리가 중요합니다.'
      },
      {
        question: '혼종 고양이도 테스트 가능한가요?',
        answer: '물론입니다! 혼종 고양이도 여러 품종의 특성을 파악하여 가장 비슷한 품종과 특성을 분석해드립니다.'
      },
      {
        question: '내 고양이 품종을 어떻게 알 수 있나요?',
        answer: 'WhatCat 품종 분석 테스트를 통해 고양이의 외형적 특징을 분석하여 가능한 품종을 예측해드립니다.'
      }
    ]
  },
  {
    title: '🏠 입양/관리',
    items: [
      {
        question: '고양이 입양 비용은 얼마나 드나요?',
        answer: '보호소 입양의 경우 5-20만 원, 브리더 입양은 30-100만 원 이상입니다. 초기 비용 외에도 사료, 장난감, 캣타워 등 준비물이 필요합니다.'
      },
      {
        question: '초기에 꼭 필요한 물품은?',
        answer: '식기, 화장실과 모래, 캣타워, 스크래처, 사료, 장난감, 캐리어, 빗, 네일클리퍼, 목줄(필요시) 등입니다.'
      },
      {
        question: '건강 검진은 언제 받아야 하나요?',
        answer: '입양 후 1-2주 내에 첫 건강 검진을 받으시는 것을 권장합니다. 이후 연 1회 정기 검진이 좋습니다.'
      },
      {
        question: '어떤 사료를 선택해야 하나요?',
        answer: '연령에 맞는 사료를 선택하세요. 아기 고양이는 성장기 사료, 성묘는 유지용 사료가 적합합니다. 고품질 단백질이 포함된 사료를 추천합니다.'
      },
      {
        question: '중성화 수술은 언제 하나요?',
        answer: '보통 6-8개월 정도에 진행합니다. 수술 전에 수의사와 상담하여 적절한 시기를 결정하세요.'
      },
      {
        question: '접종은 어떤 것을 해야 하나요?',
        answer: '3종 혼합백신(헤르페스, 칼라시바이러스, 범백혈구감염증)과 광견병, 백혈병 접종이 기본입니다.'
      },
      {
        question: '화장실 훈련은 어떻게 시키나요?',
        answer: '대부분의 고양이는 본능적으로 화장실을 사용합니다. 깨끗한 화장실을 안정적인 곳에 두고, 다른 곳에 배변한다면 바로 치워주세요.'
      },
      {
        question: '스크래칭은 어떻게 예방하나요?',
        answer: '스크래처를 충분히 제공하고, 소파 등을 긁을 때는 조용히 스크래처로 유도하세요. 캣닢을 사용하면 효과적입니다.'
      },
      {
        question: '목욕은 얼마나 자주 시켜야 하나요?',
        answer: '실내 고양이는 월 1회 정도면 충분합니다. 너무 자주 씻으면 피부 건강에 좋지 않습니다. 숏헤어는 더 드물게 해도 됩니다.'
      },
      {
        question: '이갈이는 언제 하나요?',
        answer: '생후 3-6개월에 유치가 빠지고 영구치가 나옵니다. 이 시기에는 적절한 씹는 장난감을 제공해주세요.'
      },
      {
        question: '체중 관리는 어떻게 하나요?',
        answer: '정량 급여와 운동이 중요합니다. 고양이 장난감으로 놀아주고, 캣타워에서 활동할 수 있게 해주세요. 비만은 여러 건강 문제의 원인이 됩니다.'
      },
      {
        question: '여름철 냉방은 필수인가요?',
        answer: '고양이는 추위보다 더위에 취약합니다. 여름철에는 실내 온도를 24-26도로 유지하고 통풍을 좋게 해주세요.'
      },
      {
        question: '외출이 필요한가요?',
        answer: '실내 고양이는 외출이 필수는 아닙니다. 하지만 캣타워와 창가에서 외부를 구경할 수 있게 해주면 스트레스 해소에 도움이 됩니다.'
      },
      {
        question: '다른 반려동물과 함께 키울 때는?',
        answer: '천천히 소개하고, 각각의 공간을 확보해주세요. 첫 만남은 짧게 시작하고 점차 시간을 늘리는 것이 좋습니다.'
      },
      {
        question: '고양이 스트레스 징후는?',
        answer: '과도한 그루밍, 식욕 감소, 공격성 변화, 소변 문제 등이 스트레스 징후일 수 있습니다. 원인을 파악하고 해결해주세요.'
      },
      {
        question: '털뭉치는 어떻게 예방하나요?',
        answer: '정기적인 빗질과 물 섭취가 중요합니다. 고양이 전용 털뭉치 방지 사료나 보조제도 도움이 됩니다.'
      },
      {
        question: '알레르기 예방 방법은?',
        answer: '주 2-3회 진공 청소, 공기 청정기 사용, 정기적인 빗질, 고양이가 잠자는 곳에 씻을 수 있는 커버 사용 등이 도움이 됩니다.'
      },
      {
        question: '노령 고양이 관리 포인트는?',
        answer: '정기적인 건강 검진, 연령에 맞는 사료, 관절 건강 케어, 쉬운 화장실 접근, 따뜻한 잠자리 등 신경 써주세요.'
      },
      {
        question: '여행 중에는 어떻게 하나요?',
        answer: '애견 호텔, 펫시터, 가족/친구에게 부탁하는 방법이 있습니다. 오랫동안 남겨둘 때는 신뢰할 수 있는 곳을 선택하세요.'
      }
    ]
  },
  {
    title: '💬 서비스 이용',
    items: [
      {
        question: '인스타그램에 결과를 공유할 수 있나요?',
        answer: '네, 테스트 결과를 이미지 형태로 저장한 후 인스타그램에 쉽게 공유할 수 있습니다. 스토리나 피드에 자랑해보세요!'
      },
      {
        question: '결과 이미지를 어떻게 저장하나요?',
        answer: '테스트 완료 후 "이미지 저장" 버튼을 클릭하면 갤러리에 자동으로 저장됩니다.'
      },
      {
        question: '카카오톡으로 공유할 수 있나요?',
        answer: '네, 카카오톡 공유 기능을 통해 친구와 가족들에게 테스트 결과를 간편하게 보낼 수 있습니다.'
      },
      {
        question: '개인정보는 어떻게 보호되나요?',
        answer: '사용자의 사진과 정보는 암호화되어 안전하게 저장됩니다. 제3자에게 공유되지 않으며, 필요한 경우에만 서비스 제공을 위해 사용됩니다.'
      },
      {
        question: '서비스 이용 요금은 있나요?',
        answer: '기본 테스트는 무료로 제공됩니다. 추가 프리미엄 기능과 상세 분석은 유료 플랜으로 제공됩니다.'
      }
    ]
  }
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenItem(null);
  };

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              자주 묻는 질문
            </span>
          </h1>
          <p className="text-gray-600 text-lg">
            WhatCat 이용에 관한 궁금증을 해결해 드립니다
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 transition-all duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
                <div className={`transform transition-transform duration-300 ${openCategory === categoryIndex ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Category Items */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openCategory === categoryIndex ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="text-gray-700 font-medium flex-1">{item.question}</span>
                        <div className={`flex-shrink-0 mt-1 transform transition-transform duration-300 ${openItem === itemIndex ? 'rotate-180' : ''}`}>
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          openItem === itemIndex ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-5 pb-4 pt-0">
                          <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-purple-300">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            다른 궁금한 점이 있으시면 고객센터에 문의해주세요
          </p>
        </div>
      </div>
    </div>
  );
}
