import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "../components/Navigation";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import "./globals.css";
import { NyongmatchProvider } from "../contexts/NyongmatchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "냥이 매칭 - 나와 가장 잘 맞는 고양이 품종 찾기",
    template: "%s | 냥이 매칭"
  },
  description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요! 14개 질문으로 20종의 인기 품종 중 당신에게 딱 맞는 냥이를 추천합니다.",
  keywords: ["고양이 테스트", "냥이 매칭", "고양이 품종 추천", "인생냥이", "고양이 성격 테스트", "반려동물"],
  authors: [{ name: "Molt Company" }],
  creator: "Molt Company",
  publisher: "Molt Company",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/cat-favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "냥이 매칭 - 나와 가장 잘 맞는 고양이 품종 찾기",
    description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요! 14개 질문으로 20종의 인기 품종 중 당신에게 딱 맞는 냥이를 추천합니다.",
    url: "https://what-cat-psi.vercel.app",
    siteName: "냥이 매칭",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/og-images/default.jpg",
        width: 1200,
        height: 630,
        alt: "냥이 매칭 - 나와 가장 잘 맞는 고양이 품종 찾기"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "냥이 매칭 - 나와 가장 잘 맞는 고양이 품종 찾기",
    description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요! 14개 질문으로 20종의 인기 품종 중 당신에게 딱 맞는 냥이를 추천합니다.",
    images: ["/og-images/default.jpg"],
    creator: "@molt_company"
  },
  verification: {
    google: "your-google-verification-code"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4896634202351610"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Navigation />
        <ServiceWorkerRegister />
        <NyongmatchProvider>{children}</NyongmatchProvider>
      </body>
    </html>
  );
}
