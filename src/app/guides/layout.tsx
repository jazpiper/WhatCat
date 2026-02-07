import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "고양이 가이드",
    description: "고양이 입양, 양육, 품종별 특성 등 초보 집사들을 위한 유용한 정보와 가이드를 제공합니다.",
    alternates: {
        canonical: 'https://what-cat-psi.vercel.app/guides',
    },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
