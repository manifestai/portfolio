"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/content";

export default function LangSwitch({ lang }: { lang: Lang }) {
  const path = usePathname() || `/${lang}`;
  const rest = path.replace(/^\/(en|pt)/, "");
  return (
    <ul className="langs">
      <li>
        <Link href={`/en${rest}`} aria-current={lang === "en" ? "true" : undefined} hrefLang="en" lang="en">
          English
        </Link>
      </li>
      <li>
        <Link href={`/pt${rest}`} aria-current={lang === "pt" ? "true" : undefined} hrefLang="pt-BR" lang="pt-BR">
          Português
        </Link>
      </li>
    </ul>
  );
}
