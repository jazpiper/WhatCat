import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "자주 묻는 질문 (FAQ)",
    description: "냥이 매칭 서비스에 대해 자주 묻는 질문들을 모아보았습니다. 고양이 품종 추천과 테스트 방식에 궁금한 점을 해결해보세요.",
    alternates: {
        canonical: 'https://what-cat-psi.vercel.app/faq',
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
