import type { Metadata } from "next";
import { Playfair_Display, Inter, Caveat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Florada Fonte de Mel — Mel puro do cerrado goiano",
  description:
    "Mel artesanal de flores nativas do cerrado, produzido com amor há mais de 40 anos em Goiás. Florada Fonte de Mel — tradição, natureza e vida.",
  keywords: [
    "mel",
    "mel puro",
    "mel do cerrado",
    "apicultura",
    "Goiás",
    "mel artesanal",
    "Florada Fonte de Mel",
    "flores do cerrado",
    "abelhas",
  ],
  openGraph: {
    title: "Florada Fonte de Mel",
    description: "Mel puro do cerrado goiano — tradição de mais de 40 anos.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
