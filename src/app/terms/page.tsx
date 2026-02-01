'use client';

import { ArrowLeft, Github, Mail } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200 flex items-center gap-2 mb-6 inline-block"
        >
          <ArrowLeft size={20} />
          처음으로
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            이용약관
          </h1>

          {/* Last Updated */}
          <p className="text-sm text-gray-500 text-center mb-8">
            최종 수정일: 2026년 1월 30일
          </p>

          {/* Terms Content */}
          <div className="space-y-6 text-gray-700">
            {/* Section 1 */}
            <section className="border-l-4 border-pink-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제1조 (목적)
              </h2>
              <p className="leading-relaxed">
                본 약관은 냥이 매치 서비스(이하 "서비스")의 이용조건 및 절차,
                이용자와 회사 간의 권리·의무 및 책임사항을 규정합니다.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제2조 (용어 정의)
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>이용자:</strong> 서비스에 접속하여 본 약관에 따라 서비스를 받는 회원 및 비회원
                </li>
                <li>
                  <strong>회원:</strong> 서비스에 회원등록을 한 자
                </li>
                <li>
                  <strong>비회원:</strong> 회원에 가입하지 않고 서비스를 이용하는 자
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제3조 (서비스의 제공)
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>고양이 품종 매칭 테스트 서비스</li>
                <li>테스트 결과 공유 기능</li>
                <li>품종 정보 제공</li>
                <li>가이드 콘텐츠 제공</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제4조 (이용자의 권리와 의무)
              </h2>

              <div className="bg-pink-50 rounded-xl p-4 mb-4">
                <h3 className="font-bold text-gray-800 mb-2">이용자의 권리</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>서비스에 대한 정보 제공 요청</li>
                  <li>개인정보에 대한 열람, 수정, 삭제 요청</li>
                  <li>서비스 이용 중 발생한 문제에 대한 신고 및 의견 제시</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-2">이용자의 의무</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>회원 정보를 최신으로 유지</li>
                  <li>서비스 이용 시 다른 이용자의 권리 침해 금지</li>
                  <li>서비스의 안정적 운영에 방해되는 행위 금지</li>
                  <li>법령과 본 약관을 준수</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제5조 (서비스 이용 제한)
              </h2>
              <p className="mb-3">
                회사는 다음 각 호에 해당하는 경우 이용자의 서비스 이용을 제한할 수 있습니다.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>다른 이용자의 권리를 침해하는 경우</li>
                <li>서비스의 안정적 운영을 방해하는 경우</li>
                <li>법령을 위반하는 경우</li>
                <li>기타 서비스 이용 적절하지 않다고 판단되는 경우</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제6조 (책임의 제한)
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>회사는 무료로 제공되는 서비스의 결함, 장애로 인한 손해에 대해 책임지지 않습니다.</li>
                <li>이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임지지 않습니다.</li>
                <li>회사는 천재지변, 전쟁 등 불가항력으로 인한 손해에 대해 책임지지 않습니다.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제7조 (저작권)
              </h2>
              <p className="mb-3">
                서비스에 게시된 모든 콘텐츠의 저작권은 냥이 매치에 있습니다.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>이용자는 서비스 내 콘텐츠를 개인 목적으로만 이용할 수 있습니다.</li>
                <li>상업적 이용, 무단 복제, 배포, 수정 등은 금지됩니다.</li>
                <li>콘텐츠의 저작권을 침해하는 경우 법적 책임을 질 수 있습니다.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제8조 (약관의 변경)
              </h2>
              <p className="mb-3">
                회사는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은
                서비스 내 공지사항을 통해 7일 전에 공지합니다.
              </p>
              <p className="mb-3">
                이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고
                회원 탈퇴를 할 수 있습니다.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제9조 (분쟁 해결)
              </h2>
              <p className="mb-3">
                서비스 이용과 관련하여 회사와 이용자 간에 분쟁이 발생한 경우,
                양 당사자는 협의를 통해 해결합니다.
              </p>
              <p className="mb-3">
                협의가 불가능한 경우, 대한민국 법에 따라 해결합니다.
              </p>
            </section>

            {/* Section 10 */}
            <section className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제10조 (연락처)
              </h2>
              <p className="mb-4">
                이용약관과 관련한 문의사항은 다음 연락처로 문의해주세요.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="https://github.com/jazpiper/WhatCat/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <Github size={32} />
                  <div>
                    <h3 className="font-bold text-lg">GitHub Issues</h3>
                    <p className="text-sm text-gray-300">버그 제보, 기능 요청</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@what-cat-psi.vercel.app"
                  className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <Mail size={32} />
                  <div>
                    <h3 className="font-bold text-lg">이메일</h3>
                    <p className="text-sm text-pink-100">문의 및 제휴 문의</p>
                  </div>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
