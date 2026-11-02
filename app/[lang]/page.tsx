import Link from "next/link";
import { ui, products, t, type Lang } from "@/lib/content";
import { Header, Footer } from "@/components/Chrome";
import HeroBoard from "@/components/HeroBoard";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: l } = await params;
  const lang = l as Lang;
  return (
    <>
      <Header lang={lang} />
      <div className="sheet">
        <main id="main">
          <section className="hero">
            <p className="badge">
              <span className="badge-dot" aria-hidden="true" />
              {t(ui.badge, lang)}
            </p>
            <h1 className="h-hero">{t(ui.heroTitle, lang)}</h1>
            <p className="lede hero-lede">{t(ui.heroBody, lang)}</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" href={`/${lang}#work`}>
                {t(ui.ctaWork, lang)}
              </Link>
              <a className="btn btn-ghost" href="mailto:charllespinon@gmail.com">
                {t(ui.ctaContact, lang)}
              </a>
            </div>
            <HeroBoard lang={lang} />
          </section>

          <section className="method" id="method" aria-labelledby="method-title">
            <h2 id="method-title" className="h-section">{t(ui.methodTitle, lang)}</h2>
            <ol className="steps">
              {ui.method.map((m, i) => (
                <li key={i} className="card">
                  <span className="step-n" aria-hidden="true">{i + 1}</span>
                  <h3>{t(m.name, lang)}</h3>
                  <p>{t(m.body, lang)}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="sheets" id="work" aria-labelledby="sheets-title">
            <div className="section-head">
              <h2 id="sheets-title" className="h-section">{t(ui.sheetsTitle, lang)}</h2>
              <p className="count">
                {products.length} {t(ui.countLabel, lang)}
              </p>
            </div>
            <ul className="sheet-grid">
              {products.map((p) => {
                const cover = p.cover ?? p.run?.shots[0]?.src ?? p.system?.shots[0]?.src;
                return (
                  <li key={p.slug}>
                    <Link href={`/${lang}/work/${p.slug}`} className="product-card">
                      <span className="pc-media" aria-hidden="true">
                        {cover && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={cover} alt="" loading="lazy" />
                        )}
                      </span>
                      <span className="pc-body">
                        <span className="pc-top">
                          <span className="sr-num">{p.sheet}</span>
                          <span className="pc-status">{t(p.status, lang)}</span>
                        </span>
                        <span className="sr-name">{p.name}</span>
                        <span className="sr-kind">{t(p.kind, lang)}</span>
                        <span className="sr-line">{t(p.oneLine, lang)}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </main>
        <Footer lang={lang} />
      </div>
    </>
  );
}
