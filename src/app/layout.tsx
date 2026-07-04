import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
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
    <html lang="pt_br" className={`${geist.className} h-full antialiased dark`}>
      <body className="max-w-dvw min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
