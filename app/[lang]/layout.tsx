import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/martian-mono/wdth.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/600.css";
import "../globals.css";
import { langs, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const pt = lang === "pt";
  return {
    title: { default: "Charlles Pinon, AI crafter", template: "%s | Charlles Pinon" },
    description: pt
      ? "Produtos que desenhei e construí com IA, do texto à produção."
      : "Products I designed and built with AI, from the first document to production.",
    alternates: { languages: { en: "/en", pt: "/pt" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!langs.includes(lang as Lang)) notFound();
  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"}>
      <body>{children}</body>
    </html>
  );
}
