import Link from "next/link";
import { ui, products, t, type Lang } from "@/lib/content";
import LangSwitch from "./LangSwitch";

const total = String(products.length).padStart(2, "0");

export function Header({ lang }: { lang: Lang }) {
  return (
    <header className="topbar">
      <a className="skip" href="#main">{t(ui.skip, lang)}</a>
      <Link href={`/${lang}`} className="mark" aria-label="Charlles Pinon">
        C<span className="dot">.</span>
      </Link>
      <nav aria-label={lang === "pt" ? "Idioma" : "Language"}>
        <LangSwitch lang={lang} />
      </nav>
    </header>
  );
}

export function TitleBlock({ lang, sheet, title }: { lang: Lang; sheet: string; title: string }) {
  return (
    <table className="titleblock" aria-label={lang === "pt" ? "Bloco de título" : "Title block"}>
      <tbody>
        <tr>
          <th scope="row">{t(ui.tb.drawn, lang)}</th>
          <td className="tb-sign">C. P. Pinon</td>
        </tr>
        <tr>
          <th scope="row">{t(ui.tb.role, lang)}</th>
          <td>{t(ui.role, lang)}</td>
        </tr>
        <tr>
          <th scope="row">{t(ui.tb.sheet, lang)}</th>
          <td>
            {sheet} {t(ui.tb.of, lang)} {total}, {title}
          </td>
        </tr>
        <tr>
          <th scope="row">{t(ui.tb.rev, lang)}</th>
          <td>{t(ui.tb.revValue, lang)}</td>
        </tr>
        <tr>
          <th scope="row">{t(ui.tb.place, lang)}</th>
          <td>{lang === "pt" ? "Recife, Brasil" : "Recife, Brazil"}</td>
        </tr>
      </tbody>
    </table>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="footer">
      <div>
        <h2 className="h-section">{t(ui.contactTitle, lang)}</h2>
        <p className="lede">{t(ui.contactBody, lang)}</p>
      </div>
      <ul className="contact">
        <li>
          <a href="mailto:charllespinon@gmail.com">charllespinon@gmail.com</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/charllespinon" rel="noopener">
            linkedin.com/in/charllespinon
          </a>
        </li>
      </ul>
    </footer>
  );
}
