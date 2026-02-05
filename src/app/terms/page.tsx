import Link from 'next/link';
import AdSense from '@/components/AdSense';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          홈으로 돌아가기
        </Link>

        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            이용약관
          </h1>

          <p className="text-gray-600 mb-8">
            최종 업데이트: 2026년 2월 2일
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제1조 (목적)</h2>
              <p>
                본 이용약관은 &quot;냥이 매칭&quot;(이하 &quot;서비스&quot;)에서 제공하는 인터넷 서비스의 이용조건 및 절차를 규정합니다.
                사용자는 본 약관에 동의함으로써 서비스를 이용할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제2조 (정의)</h2>
              <p>
                <strong>&quot;서비스&quot;</strong>란 &quot;냥이 매칭&quot;가 제공하는 고양이 품종 매칭 테스트 웹 서비스를 말합니다.<br />
                <strong>&quot;사용자&quot;</strong>란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.<br />
                <strong>&quot;콘텐츠&quot;</strong>란 서비스에서 제공하는 모든 정보, 텍스트, 이미지, 비디오 등을 말합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제3조 (서비스 이용 계약)</h2>
              <p>
                사용자는 서비스에서 제공하는 약관에 동의함으로써 서비스 이용 계약을 체결합니다.
                회원가입 또는 서비스 이용 시 약관에 동의한 것으로 간주됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제4조 (서비스 이용의 제한)</h2>
              <p>사용자는 다음 각 호에 해당하는 행위를 해서는 안 됩니다:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>타인의 개인정보를 도용하거나 부정하게 사용하는 행위</li>
                <li>서비스의 콘텐츠를 무단으로 복제, 배포, 수정하는 행위</li>
                <li>컴퓨터 바이러스 등 악성 프로그램을 전파하는 행위</li>
                <li>기타 관련 법령에 위배되는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제5조 (콘텐츠의 권리)</h2>
              <p>
                서비스에서 제공하는 모든 콘텐츠(고양이 품종 정보, 테스트 결과, 텍스트, 이미지 등)의
                지적재산권은 &quot;냥이 매칭&quot; 또는 원저작자에게 있습니다.
                사용자는 개인적인 용도로만 콘텐츠를 이용할 수 있으며, 상업적인 용도로 무단으로 사용할 수 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제6조 (서비스의 변경 및 중단)</h2>
              <p>
                &quot;냥이 매칭&quot;는 서비스의 내용, 운영 정책, 기술적 사양 등을 변경할 권리를 가집니다.
                또한 시스템 점검, 업그레이드, 기술적 문제 등의 사유로 서비스를 일시적으로 중단할 수 있습니다.
                이 경우 사용자에게 사전에 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제7조 (책임의 제한)</h2>
              <p>
                &quot;냥이 매칭&quot;는 무료로 제공되는 서비스로, 사용자가 서비스를 통해 얻은 정보나
                매칭 결과에 대하여 보증하지 않습니다.
                사용자는 테스트 결과를 참고용으로만 활용해야 하며, 고양이 입양 결정에 전적으로 책임을 져야 합니다.
              </p>
              <p className="mt-2">
                &quot;냥이 매칭&quot;는 천재지변, 불가항력, 기술적 문제 등으로 인한 서비스 장애에 대하여
                손해배상 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제8조 (광고)</h2>
              <p>
                본 서비스는 Google AdSense와 같은 써드파티 광고 서비스를 제공합니다.
                광고는 서비스 운영 비용을 충당하기 위해 표시됩니다.
              </p>
              <p className="mt-2">
                사용자는 광고 클릭이 의무 사항이 아니며, 광고와 관련하여 발생하는 모든 문제에 대하여
                &quot;냥이 매칭&quot;는 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제9조 (개인정보 보호)</h2>
              <p>
                사용자의 개인정보는 [개인정보처리방침](/privacy)에 따라 보호됩니다.
                &quot;냥이 매칭&quot;는 개인정보보호법을 준수하며, 사용자의 개인정보를 안전하게 보호하기 위해
                최선을 다합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제10조 (약관의 변경)</h2>
              <p>
                &quot;냥이 매칭&quot;는 관련 법령의 변경 또는 서비스 정책의 변경 등 필요한 경우
                본 약관을 변경할 수 있습니다. 변경된 약관은 웹사이트에 게시되며,
                게시 후 7일 이내에 이의를 제기하지 않으면 변경된 약관에 동의한 것으로 간주됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제11조 (분쟁 해결)</h2>
              <p>
                서비스 이용과 관련하여 분쟁이 발생한 경우, 당사자 간의 협의로 해결합니다.
                협의로 해결되지 않는 경우, 대한민국 법에 따라 해결합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">제12조 (약관의 효력)</h2>
              <p>
                본 약관은 2026년 2월 2일부터 효력을 가집니다.
              </p>
            </section>

            <section className="bg-orange-50 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold text-orange-900 mb-4">문의처</h2>
              <p className="text-orange-800">
                본 약관에 대한 문의사항이 있으시면 웹사이트를 통해 문의해 주시기 바랍니다.
              </p>
            </section>
          </div>
        </article>

        <AdSense adSlot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "5187796077"} />
      </div>
    </main>
  );
}
