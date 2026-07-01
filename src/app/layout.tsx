import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-spacegrotesk",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
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
    <html
      lang="pt_br"
      className={`${spaceGrotesk.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
