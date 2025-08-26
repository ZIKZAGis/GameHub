import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SWRProvider from "@/components/providers/SWRProvider";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameHub",
  description: "Главная страница GameHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-linear-to-r from-[#0C000D] via-[#230340] to-[#1E0133] text-white`}
      >
        <Providers>
          <Header/>
          <main className="flex-grow justify-items-center w-full max-w-7xl font-[family-name:var(--font-geist-sans)] px-4 py-10 m-auto">
            <SWRProvider>
              {children}
            </SWRProvider>
          </main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
