import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "React vs Modern Next.js",
  description:
    "React를 아는 학생들을 위한 Next.js App Router 비교 가이드.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
