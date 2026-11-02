import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ui, products, langs, t, type Lang, type Shot } from "@/lib/content";
import { Header, TitleBlock, Footer } from "@/components/Chrome";

export function generateStaticParams() {
  return langs.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: t(p.oneLine, lang as Lang) };
}

function Figures({ shots, lang }: { shots: Shot[]; lang: Lang }) {
  return (
    <div className="figs">
      {shots.map((s) => (
        <figure key={s.src} className={s.phone ? "fig phone" : s.tall ? "fig tall" : "fig"}>
          <div className="fig-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={t(s.caption, lang)} loading="lazy" />
          </div>
          <figcaption>{t(s.caption, lang)}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default async function Work({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: l, slug } = await params;
  const lang = l as Lang;
  const idx = products.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = products[idx];
  const next = products[(idx + 1) % products.length];
  const S = ui.stages;
  let n = 0;

  return (
    <div className="sheet">
      <Header lang={lang} />
      <main id="main">
        <section className="case-head">
          <p className="crumb">
            <Link href={`/${lang}#sheets-title`}>{t(ui.back, lang)}</Link>
          </p>
          <h1 className="h-hero">{p.name}</h1>
          <p className="case-kind">{t(p.kind, lang)}</p>
          <div className="hero-foot">
            <div>
              <p className="lede">{t(p.oneLine, lang)}</p>
              <dl className="meta">
                <div>
                  <dt>{t(ui.colStatus, lang)}</dt>
                  <dd>{t(p.status, lang)}</dd>
                </div>
                <div>
                  <dt>{t(ui.stack, lang)}</dt>
                  <dd>{p.stack.join(", ")}</dd>
                </div>
                {p.live && (
                  <div>
                    <dt>{t(ui.visit, lang)}</dt>
                    <dd>
                      <a href={p.live.href} rel="noopener">{p.live.label}</a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
            <TitleBlock lang={lang} sheet={p.sheet} title={p.name} />
          </div>
        </section>

        {p.pending ? (
          <section className="stage">
            <p className="lede">{t(ui.pendingBody, lang)}</p>
          </section>
        ) : (
          <>
            {p.why && (
              <section className="stage why">
                <h2 className="h-stage">{t(S.why, lang)}</h2>
                <p className="lede big">{t(p.why, lang)}</p>
              </section>
            )}

            {p.think && (
              <section className="stage">
                <h2 className="h-stage">
                  <span className="stage-n">{++n}</span>
                  {t(S.think, lang)}
                </h2>
                <div className="stage-body">
                  <p>{t(p.think.body, lang)}</p>
                  {p.think.excerpt && (
                    <figure className="excerpt">
                      <figcaption className="file">{p.think.excerpt.file}</figcaption>
                      <pre className={p.think.excerpt.code ? "code" : undefined}>{t(p.think.excerpt.text, lang)}</pre>
                      {lang === "en" && !p.think.excerpt.code && <p className="note">{ui.translated.en}</p>}
                    </figure>
                  )}
                </div>
              </section>
            )}

            {p.system && (
              <section className="stage">
                <h2 className="h-stage">
                  <span className="stage-n">{++n}</span>
                  {t(S.system, lang)}
                </h2>
                <div className="stage-body">
                  <p>{t(p.system.body, lang)}</p>
                </div>
                <Figures shots={p.system.shots} lang={lang} />
              </section>
            )}

            {p.build && (
              <section className="stage">
                <h2 className="h-stage">
                  <span className="stage-n">{++n}</span>
                  {t(S.build, lang)}
                </h2>
                <div className="stage-body">
                  <p>{t(p.build.body, lang)}</p>
                  <ul className="facts">
                    {p.build.facts.map((f, i) => (
                      <li key={i}>{t(f, lang)}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {p.run && (
              <section className="stage">
                <h2 className="h-stage">
                  <span className="stage-n">{++n}</span>
                  {t(S.run, lang)}
                </h2>
                <div className="stage-body">
                  <p>{t(p.run.body, lang)}</p>
                </div>
                <Figures shots={p.run.shots} lang={lang} />
              </section>
            )}
          </>
        )}

        <nav className="next" aria-label={t(ui.next, lang)}>
          <Link href={`/${lang}/work/${next.slug}`}>
            <span className="next-label">{t(ui.next, lang)}</span>
            <span className="next-name">
              {next.sheet} {next.name}
            </span>
          </Link>
        </nav>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
