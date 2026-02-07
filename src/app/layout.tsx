import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "../components/Navigation";
import ServiceWorkerRegister from "../components/ServiceWorkerRegister";
import { ThemeProvider } from "../components/ThemeProvider";
import { GoogleAnalyticsScript } from "../lib/google-analytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL('https://what-cat-psi.vercel.app'),
  title: {
    default: "냥이 매칭 - 나와 가장 잘 맞는 고양이 품종 찾기",
    template: "%s | 냥이 매칭"
  },
  description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요! 14개 질문으로 20종의 인기 품종 중 당신에게 딱 맞는 냥이를 추천합니다.",
  keywords: ["고양이 테스트", "냥이 매칭", "고양이 품종 추천", "인생냥이", "고양이 성격 테스트", "반려동물"],
  alternates: {
    canonical: 'https://what-cat-psi.vercel.app',
  },
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
        url: "https://what-cat-psi.vercel.app/og-images/default.jpg",
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
    images: ["https://what-cat-psi.vercel.app/og-images/default.jpg"],
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
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-lg focus:font-medium focus:shadow-lg"
        >
          메인 콘텐츠로 바로가기
        </a>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4896634202351610"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <GoogleAnalyticsScript />
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          <ServiceWorkerRegister />
          <NyongmatchProvider>{children}</NyongmatchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
