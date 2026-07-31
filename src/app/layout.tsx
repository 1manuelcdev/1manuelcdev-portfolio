import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "1manuelc.dev",
  description: "Portfólio de Desenvolvedor - Manuel Carlos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_br" className={`${inter.className} h-full antialiased dark`}>
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="max-w-dvw min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
