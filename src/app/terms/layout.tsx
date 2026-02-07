import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "이용약관",
    description: "냥이 매칭 서비스의 이용약관입니다.",
    alternates: {
        canonical: 'https://what-cat-psi.vercel.app/terms',
    },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
