import Link from "next/link";
import { ui, products, t, type Lang } from "@/lib/content";
import { Header, Footer } from "@/components/Chrome";
import HeroBoard from "@/components/HeroBoard";
import ProcessExplorer from "@/components/ProcessExplorer";

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

          <section className="process" id="process" aria-labelledby="process-title">
            <p className="kicker">{t(ui.processKicker, lang)}</p>
            <h2 id="process-title" className="h-section">{t(ui.processTitle, lang)}</h2>
            <p className="lede process-lede">{t(ui.processLede, lang)}</p>
            <ProcessExplorer
              phases={ui.process.map((ph, i) => {
                const m = i >= 2 ? ui.method[i - 2] : undefined;
                const stage = ["think", "system", "build", "run"][i - 2] as "think" | "system" | "build" | "run" | undefined;
                return {
                  space: ph.space,
                  spaceLabel: t(ui.spaces[ph.space], lang),
                  name: t(ph.name, lang),
                  body: ph.body && t(ph.body, lang),
                  lanes: ph.lanes?.map((ln) => ({ label: t(ln.label, lang), body: t(ln.body, lang) })),
                  equation: ph.lanes && {
                    business: t(ui.equation.business, lang),
                    use: t(ui.equation.use, lang),
                    product: t(ui.equation.product, lang),
                  },
                  job: ph.job ? { label: t(ui.jtbd.label, lang), parts: ui.jtbd.parts.map((x) => t(x, lang)) } : undefined,
                  output: t(ph.output, lang),
                  sheet:
                    m && stage
                      ? {
                          stage,
                          name: t(m.name, lang),
                          body: t(m.body, lang),
                          links: products
                            .filter((p) => !p.pending && p[stage])
                            .map((p) => ({ href: `/${lang}/work/${p.slug}#${stage}`, name: p.name })),
                        }
                      : undefined,
                };
              })}
              labels={{
                output: t(ui.outputLabel, lang),
                open: t(ui.sheetOpen, lang),
                kicker: t(ui.sheetKicker, lang),
                see: t(ui.sheetSee, lang),
                close: t(ui.sheetClose, lang),
                hint: t(ui.sheetHint, lang),
                loop: t(ui.processLoop, lang),
              }}
            />
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
