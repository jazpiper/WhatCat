import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "문의하기",
    description: "냥이 매칭 서비스 이용 중 궁금한 점이나 제안이 있으시면 언제든지 문의해 주세요.",
    alternates: {
        canonical: 'https://what-cat-psi.vercel.app/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
