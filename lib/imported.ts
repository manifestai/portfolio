import type { Product, BoardItem, Shot } from "./content";
import data from "./imported.json";

/* Products exported from their own projects (portfolio-produtos.zip), mapped to the site's shape. */

type T = { pt: string; en: string };
type Img = { arquivo: string; etapa: string; legenda: T };
type Export = {
  slug: string;
  nome: string;
  tipo: T;
  frase: T;
  situacao: T;
  link_publico: string | null;
  stack: string[];
  por_que_existe: T;
  pensar_em_publico: { texto: T; trecho: { arquivo: string; pt: string; en: string; codigo: boolean } };
  sistema_de_design: { texto: T };
  construcao: { texto: T; fatos: T[] };
  na_pratica: { texto: T };
  imagens: Img[];
  animacao_home: { arquivo_fonte: string; linha: T; paleta: string[]; layout: string; imagem: string };
};

const exports = data as Export[];

const shots = (e: Export, etapa: string): Shot[] =>
  e.imagens
    .filter((i) => i.etapa === etapa)
    .map((i) => ({ src: `/shots/${e.slug}/${i.arquivo}`, caption: i.legenda }));

/* Where the export's own "in practice" text was written for me, not for visitors. */
const runOverride: Record<string, { body: T; shots: Shot[] } | null> = {
  casulo: {
    body: {
      en: "The release notes of version 0.5, as they appear in the update window, and the installer, designed with the brand.",
      pt: "As notas da versão 0.5, como aparecem na janela de atualização, e o instalador, desenhado com a marca.",
    },
    shots: [
      { src: "/shots/casulo/notes.webp", caption: { en: "Version 0.5 release notes", pt: "Notas da versão 0.5" } },
      {
        src: "/shots/casulo/03-janela-do-dmg.webp",
        caption: { en: "Installer window: drag Casulo to Applications", pt: "Janela do instalador: arrastar o Casulo para Aplicativos" },
      },
    ],
  },
  oye: null,
};

export const importedProducts: Product[] = exports.map((e) => {
  const run =
    e.slug in runOverride
      ? runOverride[e.slug] ?? undefined
      : { body: e.na_pratica.texto, shots: shots(e, "pratica") };
  return {
    slug: e.slug,
    sheet: "",
    name: e.nome,
    kind: e.tipo,
    oneLine: e.frase,
    status: e.situacao,
    live: e.link_publico ? { href: e.link_publico, label: e.link_publico.replace(/^https?:\/\//, "") } : undefined,
    stack: e.stack,
    why: e.por_que_existe,
    think: {
      body: e.pensar_em_publico.texto,
      excerpt: {
        file: e.pensar_em_publico.trecho.arquivo,
        text: { pt: e.pensar_em_publico.trecho.pt, en: e.pensar_em_publico.trecho.en },
        code: e.pensar_em_publico.trecho.codigo,
      },
    },
    system: { body: e.sistema_de_design.texto, shots: shots(e, "sistema") },
    build: { body: e.construcao.texto, facts: e.construcao.fatos },
    run,
  };
});

/* Only products with a real screen of the app join the hero animation. */
export const importedBoard: BoardItem[] = exports
  .filter((e) => e.imagens.some((i) => i.arquivo === e.animacao_home.imagem && i.etapa === "pratica"))
  .map((e) => ({
    slug: e.slug,
    name: e.nome,
    file: e.animacao_home.arquivo_fonte.startsWith("site")
      ? "index.html"
      : (e.animacao_home.arquivo_fonte.split("/").pop() ?? "").replace("-redigido", ""),
    line: e.animacao_home.linha,
    palette: e.animacao_home.paleta.slice(0, 4) as [string, string, string, string],
    wire: e.animacao_home.layout === "landing" ? "landing" : "app",
    shot: `/shots/${e.slug}/${e.animacao_home.imagem}`,
  }));
