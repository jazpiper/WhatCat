import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "서비스 소개",
    description: "냥이 매칭은 당신의 라이프스타일과 성향에 가장 잘 어울리는 고양이 품종을 추천해주는 서비스입니다.",
    alternates: {
        canonical: 'https://what-cat-psi.vercel.app/about',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
