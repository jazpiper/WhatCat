'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Send } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: '냥이 매치란 무엇인가요?',
    answer: '냥이 매치는 MBTI 스타일 테스트를 통해 나와 가장 잘 맞는 고양이 품종을 찾아드리는 서비스입니다. AI 분석 기술을 활용하여 개인의 성향과 고양이 품종 특성을 매칭합니다.'
  },
  {
    question: '어떻게 고양이를 매칭받을 수 있나요?',
    answer: '홈페이지에서 테스트를 시작하면 성향 테스트 문항을 진행하게 됩니다. 모든 문항에 답변하시면 AI 분석을 통해 가장 잘 맞는 고양이 품종 3개를 추천해 드립니다.'
  },
  {
    question: '매칭은 유료인가요?',
    answer: '아니요, 기본 테스트는 완전 무료입니다. 무료로 제공되는 기본 매칭 서비스를 통해 여러분의 인생냥이를 찾을 수 있습니다. 추후 프리미엄 서비스가 추가될 수 있습니다.'
  },
  {
    question: '개인정보는 어떻게 보호되나요?',
    answer: '개인정보보호법 등 관련 법령을 준수하여 회원의 개인정보를 안전하게 보호합니다. 수집된 정보는 서비스 제공 및 개선 목적으로만 사용되며, 제3자에게 제공되지 않습니다.'
  },
  {
    question: '고객센터 연락처는?',
    answer: '이메일 문의(아래 버튼) 또는 소셜 미디어를 통해 문의하실 수 있습니다. 평일 09:00~18:00에 빠르게 답변 드립니다.'
  },
  {
    question: '테스트 결과가 마음에 안 들어요.',
    answer: '테스트 결과는 AI 분석 기반의 추천이며, 개인의 취향과 상황에 따라 다를 수 있습니다. 여러 번 테스트하거나 다른 품종 정보를 참고해보세요!'
  },
  {
    question: '친구에게 결과를 공유할 수 있나요?',
    answer: '네, 테스트 결과는 이미지 형태로 저장할 수 있으며, 소셜 미디어를 통해 친구들과 쉽게 공유할 수 있습니다.'
  }
];

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            고객센터
          </h1>

          {/* 소개 문구 */}
          <p className="text-gray-600 text-center mb-12">
            궁금한 점이 있으시면 언제든지 문의해주세요!
          </p>

          {/* FAQ 섹션 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                Q
              </span>
              자주 묻는 질문
            </h2>

            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className="border border-pink-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-pink-50 transition-colors"
                  >
                    <span className="font-medium text-gray-700 pr-4">{item.question}</span>
                    <span
                      className={`text-pink-500 transition-transform duration-200 flex-shrink-0 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-4 pt-0">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 이메일 문의 버튼 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              이메일 문의
            </h2>

            <div className="text-center">
              <a
                href="mailto:support@whatcat.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <Mail size={20} />
                이메일 보내기
              </a>
              <p className="text-sm text-gray-500 mt-3">
                평일 09:00 ~ 18:00 / 빠른 답변 약속!
              </p>
            </div>
          </section>

          {/* 소셜 미디어 섹션 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              소셜 미디어
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* GitHub */}
              <a
                href="https://github.com/whatcat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <Github size={24} />
                <span className="font-medium">GitHub</span>
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com/whatcat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <Twitter size={24} />
                <span className="font-medium">Twitter</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/whatcat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-6 py-4 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                <Send size={24} />
                <span className="font-medium">Discord</span>
              </a>
            </div>
          </section>

          {/* 처음으로 버튼 */}
          <div className="mt-12 text-center border-t border-gray-100 pt-8">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              처음으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
