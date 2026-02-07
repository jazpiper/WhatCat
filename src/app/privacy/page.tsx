import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import type { Metadata } from 'next';

// ✅ 메타데이터
export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "냥이 매칭 서비스의 개인정보처리방침입니다. 사용자의 개인정보를 보호하기 위한 노력을 확인해보세요.",
  alternates: {
    canonical: 'https://what-cat-psi.vercel.app/privacy',
  },
};

// ✅ SSG 설정
export const dynamic = 'force-static';
export const revalidate = 86400; // 24시간마다 재생성

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-pink-500 hover:underline flex items-center gap-2">
            <ArrowLeft size={20} />
            처음으로
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            개인정보처리방침
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                1. 수집하는 개인정보의 항목
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>수집하지 않음 - 냥이 매칭 서비스는 사용자의 개인정보를 별도로 수집하지 않습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                2. 개인정보의 수집 목적
              </h2>
              <p>
                본 서비스는 사용자의 개인정보를 수집하거나 저장하지 않습니다.
                모든 테스트 결과는 사용자의 브라우저에만 저장되며,
                서버로 전송되지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                3. 개인정보의 보유 및 이용 기간
              </h2>
              <p>
                본 서비스는 사용자의 개인정보를 보유하지 않습니다.
                테스트 답변은 사용자의 브라우저 임시 저장소에만 저장됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                4. 제3자 제공
              </h2>
              <p>
                본 서비스는 제3자에게 사용자의 개인정보를 제공하지 않습니다.
                다만, 사용자가 카카오톡, 스레드 등을 통해 공유 기능을 이용할 경우,
                각 서비스의 약관에 따라 공유 콘텐츠가 처리됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                5. 쿠키(Cookie) 및 로그 정보
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>본 서비스는 기본적인 분석 및 기술적 쿠키를 사용할 수 있습니다.</li>
                <li>쿠키는 브라우저 종료 시 자동 삭제됩니다.</li>
                <li>사용자는 브라우저 설정을 통해 쿠키를 거부할 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                6. 쿠키 및 광고
              </h2>
              <p className="mb-3">
                본 서비스는 Google AdSense와 같은 써드파티 광고 서비스를 제공할 수 있습니다.
                이 서비스들은 사용자의 웹사이트 방문 기록을 쿠키를 통해 수집하여,
                사용자에게 관심 있는 광고를 제공할 수 있습니다.
              </p>
              <p className="mb-3">
                사용자는 언제든지 브라우저 설정에서 쿠키 사용을 거부할 수 있지만,
                이 경우 일부 서비스 기능이 제한될 수 있습니다.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <h3 className="font-bold text-blue-900 mb-2">Google AdSense 쿠키 정책</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-blue-800">
                  <li>Google은 쿠키를 사용하여 광고를 게시하고, 사용자가 광고를 클릭했을 때를 추적합니다.</li>
                  <li>Google은 DART 쿠키를 사용하여 Google 광고를 통해 웹사이트를 방문한 사용자에게 광고를 게시합니다.</li>
                  <li>사용자는 Google 광고 콘텐츠 쿠키 사용을 거부할 수 있습니다.</li>
                  <li>자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Google 개인정보처리방침</a>을 참조하세요.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                7. 개인정보의 파기
              </h2>
              <p>
                사용자가 테스트를 완료하고 브라우저를 닫거나,
                쿠키를 삭제할 경우 저장된 정보는 자동으로 파기됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                8. 이용자의 권리와 의무
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>이용자는 언제든지 본인의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.</li>
                <li>이용자는 브라우저 캐시 및 쿠키 삭제를 통해 언제든지 정보를 삭제할 수 있습니다.</li>
                <li>이용자가 개인정보의 수집 및 이용에 동의하지 않는 경우, 서비스 이용이 제한될 수 있습니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                9. 개인정보처리책임자의 연락처
              </h2>
              <div className="bg-pink-50 rounded-xl p-4">
                <p className="text-gray-800">
                  개인정보와 관련한 문의사항은 아래 문의하기 페이지를 통해 보내주세요.
                </p>
                <Link
                  href="/contact"
                  className="text-pink-600 font-semibold hover:underline inline-block mt-2"
                >
                  문의하기 바로가기
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
