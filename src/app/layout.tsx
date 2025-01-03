import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TanStackProvider from "@/lib/TanStackProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "./_component/Header";
import CreateMoimButton from "./_component/CreateMoimButton";
import { Footer } from "./_component/Footer";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "모모임 - 모든 모임의 시작",
  description:
    "관심사가 비슷한 사람들과 함께하는 새로운 모임 플랫폼. 취미 모임, 스터디, 동호회까지 다양한 모임을 찾고 만들어보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <TanStackProvider>
          <Header />
          <main className="layout-container min-h-[calc(100vh-80px)] pt-[80px]">{children}</main>
          <Footer />
          <CreateMoimButton />
          <Toaster />
          <SpeedInsights />
        </TanStackProvider>
      </body>
    </html>
  );
}
