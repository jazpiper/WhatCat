import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            이용약관
          </h1>

          {/* 최종 수정일 */}
          <p className="text-sm text-gray-500 text-center mb-8">
            최종 수정일: 2026년 2월 1일
          </p>

          {/* 약관 내용 */}
          <div className="space-y-8 text-gray-700">
            {/* 섹션 1: 총칙 */}
            <section className="border-l-4 border-pink-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제1조 (목적)
              </h2>
              <p className="leading-relaxed text-gray-600">
                본 약관은 냥이 매치 서비스(이하 "서비스")의 이용조건 및 절차,
                이용자와 회사 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            {/* 섹션 2: 회원 가입 */}
            <section className="border-l-4 border-purple-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제2조 (회원 가입)
              </h2>
              <p className="leading-relaxed text-gray-600">
                이용자는 본 약관에 동의함으로써 회원 가입을 신청할 수 있으며,
                회사는 이를 승인함으로써 회원 가입을 완료합니다.
              </p>
            </section>

            {/* 섹션 3: 서비스 이용 */}
            <section className="border-l-4 border-pink-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제3조 (서비스 이용)
              </h2>
              <p className="leading-relaxed text-gray-600">
                회원은 본 서비스를 통해 MBTI 스타일 테스트 및 고양이 품종 매칭 서비스를
                이용할 수 있습니다.
              </p>
            </section>

            {/* 섹션 4: 개인정보 보호 */}
            <section className="border-l-4 border-purple-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제4조 (개인정보 보호)
              </h2>
              <p className="leading-relaxed text-gray-600">
                회사는 개인정보보호법 등 관련 법령을 준수하여 회원의 개인정보를
                보호합니다. 자세한 내용은 개인정보처리방침을 확인해 주세요.
              </p>
            </section>

            {/* 섹션 5: 손해배상 */}
            <section className="border-l-4 border-pink-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제5조 (손해배상)
              </h2>
              <p className="leading-relaxed text-gray-600">
                회사는 회원의 귀책사유로 인한 손해에 대해서는 책임을 지지 않습니다.
              </p>
            </section>

            {/* 섹션 6: 면책 */}
            <section className="border-l-4 border-purple-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제6조 (면책)
              </h2>
              <p className="leading-relaxed text-gray-600">
                회사는 천재지변, 전쟁 등 불가항력적인 사유로 인한 서비스 제공 불가에
                대해서는 책임을 지지 않습니다.
              </p>
            </section>

            {/* 섹션 7: 기타 */}
            <section className="border-l-4 border-pink-400 pl-6 py-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제7조 (기타)
              </h2>
              <p className="leading-relaxed text-gray-600">
                본 약관에 규정되지 않은 사항은 관련 법령 및 일반적인 상관례에 따릅니다.
              </p>
            </section>
          </div>

          {/* 처음으로 버튼 */}
          <div className="mt-12 text-center">
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
