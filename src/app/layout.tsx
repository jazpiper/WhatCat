import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TestProvider } from "@/contexts/TestContext";

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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: "냥이 매치 - 나와 가장 잘 맞는 고양이 품종 찾기",
    description: "MBTI 스타일 테스트로 나의 인생냥이를 찾아보세요!",
  },
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
        <TestProvider>{children}</TestProvider>
      </body>
    </html>
  );
}
