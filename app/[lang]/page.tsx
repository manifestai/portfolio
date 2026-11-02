import Link from "next/link";
import { ui, products, t, type Lang } from "@/lib/content";
import { Header, TitleBlock, Footer } from "@/components/Chrome";
import HeroBoard from "@/components/HeroBoard";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Lang;
  return (
    <div className="sheet">
      <Header lang={lang} />
      <main id="main">
        <section className="hero">
          <h1 className="h-hero">{t(ui.heroTitle, lang)}</h1>
          <HeroBoard lang={lang} />
          <div className="hero-foot">
            <p className="lede">{t(ui.heroBody, lang)}</p>
            <TitleBlock lang={lang} sheet="00" title={lang === "pt" ? "índice" : "index"} />
          </div>
        </section>

        <section className="method" aria-labelledby="method-title">
          <h2 id="method-title" className="h-section">{t(ui.methodTitle, lang)}</h2>
          <ol className="steps">
            {ui.method.map((m, i) => (
              <li key={i}>
                <span className="step-n" aria-hidden="true">{i + 1}</span>
                <h3>{t(m.name, lang)}</h3>
                <p>{t(m.body, lang)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="sheets" aria-labelledby="sheets-title">
          <h2 id="sheets-title" className="h-section">{t(ui.sheetsTitle, lang)}</h2>
          <ul className="sheet-list">
            {products.map((p) => (
              <li key={p.slug} className={p.pending ? "pending" : undefined}>
                <Link href={`/${lang}/work/${p.slug}`} className="sheet-row">
                  <span className="sr-num">{p.sheet}</span>
                  <span className="sr-main">
                    <span className="sr-name">{p.name}</span>
                    <span className="sr-kind">{t(p.kind, lang)}</span>
                    <span className="sr-line">{t(p.oneLine, lang)}</span>
                    <span className="sr-status">{t(p.status, lang)}</span>
                  </span>
                  <span className="sr-thumb" aria-hidden="true">
                    {p.run?.shots[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.run.shots[0].src} alt="" loading="lazy" />
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
