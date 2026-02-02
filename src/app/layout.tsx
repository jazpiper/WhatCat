import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "../components/Navigation";
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
  title: "냥이 매치 - 나와 가장 잘 맞는 고양이 품종 찾기",
  description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요!",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "냥이 매치 - 나와 가장 잘 맞는 고양이 품종 찾기",
    description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요!",
  },
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
          strategy="afterInteractive"
        />
        <Navigation />
        <NyongmatchProvider>{children}</NyongmatchProvider>
      </body>
    </html>
  );
}
