export type Lang = "en" | "pt";
export const langs: Lang[] = ["en", "pt"];

type T = { en: string; pt: string };
export type Shot = { src: string; caption: T; tall?: boolean; phone?: boolean };
export type Excerpt = { file: string; text: T; code?: boolean };

export type Product = {
  slug: string;
  sheet: string;
  name: string;
  kind: T;
  oneLine: T;
  status: T;
  live?: { href: string; label: string };
  stack: string[];
  why?: T;
  think?: { body: T; excerpt?: Excerpt };
  system?: { body: T; shots: Shot[] };
  build?: { body: T; facts: T[] };
  run?: { body: T; shots: Shot[] };
  pending?: boolean;
};

export const ui = {
  role: { en: "AI crafter and product manager", pt: "AI crafter e product manager" },
  heroTitle: {
    en: "I design and build software products with AI, from the first question to production.",
    pt: "Desenho e construo produtos de software com IA, da primeira pergunta à produção.",
  },
  heroBody: {
    en: "I'm Charlles Pinon, a product manager for 9+ years. Today Claude Code is my workbench: I write the product down, design its system, build it and put it in front of real users. Each sheet below shows that whole path for one product.",
    pt: "Sou Charlles Pinon, product manager há 9+ anos. Hoje o Claude Code é minha bancada: escrevo o produto, desenho o sistema, construo e coloco na mão de usuários reais. Cada folha abaixo mostra esse caminho inteiro para um produto.",
  },
  methodTitle: { en: "How every sheet is drawn", pt: "Como cada folha é desenhada" },
  method: [
    {
      name: { en: "Think in public", pt: "Pensar em público" },
      body: {
        en: "Every product starts as text. PRODUCT.md says who it serves and how it should sound; CLAUDE.md holds the rules the code must follow. The thinking lives in the repository, next to the code it explains.",
        pt: "Todo produto começa como texto. O PRODUCT.md diz para quem ele existe e como deve soar; o CLAUDE.md guarda as regras que o código precisa seguir. O raciocínio mora no repositório, ao lado do código que ele explica.",
      },
    },
    {
      name: { en: "Design system", pt: "Sistema de design" },
      body: {
        en: "Before screens, a sheet of tokens: color, type, spacing, motion and components. Prototypes set structure and hierarchy; the tokens decide everything else.",
        pt: "Antes das telas, uma folha de tokens: cor, tipografia, espaçamento, movimento e componentes. Os protótipos definem estrutura e hierarquia; os tokens decidem o resto.",
      },
    },
    {
      name: { en: "Build", pt: "Construção" },
      body: {
        en: "Claude Code writes the code from those documents. Each change arrives as a pull request with a preview link and numbered steps to check it. Nothing merges without my approval.",
        pt: "O Claude Code escreve o código a partir desses documentos. Cada mudança chega como pull request, com link de pré-visualização e passos numerados para conferir. Nada entra sem a minha aprovação.",
      },
    },
    {
      name: { en: "Run", pt: "Na prática" },
      body: {
        en: "Real users bring real constraints: authentication, permissions, privacy law, audit logs, tests. A product is finished when it holds up under them.",
        pt: "Usuários reais trazem restrições reais: autenticação, permissões, lei de proteção de dados, trilha de auditoria, testes. O produto está pronto quando aguenta tudo isso.",
      },
    },
  ],
  sheetsTitle: { en: "Sheets", pt: "Folhas" },
  colSheet: { en: "Sheet", pt: "Folha" },
  colProduct: { en: "Product", pt: "Produto" },
  colStatus: { en: "Status", pt: "Situação" },
  open: { en: "Open sheet", pt: "Abrir folha" },
  stages: {
    why: { en: "Why it exists", pt: "Por que existe" },
    think: { en: "Think in public", pt: "Pensar em público" },
    system: { en: "Design system", pt: "Sistema de design" },
    build: { en: "Build", pt: "Construção" },
    run: { en: "Run", pt: "Na prática" },
  },
  stack: { en: "Stack", pt: "Stack" },
  visit: { en: "Visit", pt: "Visitar" },
  translated: { en: "Translated from the Portuguese original.", pt: "" },
  back: { en: "All sheets", pt: "Todas as folhas" },
  next: { en: "Next sheet", pt: "Próxima folha" },
  contactTitle: { en: "Talk to me", pt: "Fale comigo" },
  contactBody: {
    en: "I'm open to senior product roles where building is part of the job.",
    pt: "Estou aberto a posições sênior de produto em que construir faz parte do trabalho.",
  },
  tb: {
    drawn: { en: "Drawn by", pt: "Desenho" },
    role: { en: "Role", pt: "Função" },
    sheet: { en: "Sheet", pt: "Folha" },
    rev: { en: "Revision", pt: "Revisão" },
    revValue: { en: "November 2026", pt: "Novembro 2026" },
    place: { en: "Location", pt: "Local" },
    of: { en: "of", pt: "de" },
  },
  pendingBody: {
    en: "This sheet is being drawn. The write-up will follow the same four stages as the others.",
    pt: "Esta folha está sendo desenhada. O relato vai seguir as mesmas quatro etapas das outras.",
  },
  skip: { en: "Skip to content", pt: "Pular para o conteúdo" },
};

export const products: Product[] = [
  {
    slug: "salto",
    sheet: "01",
    name: "Portal Salto",
    kind: { en: "Client portal and MCP server", pt: "Portal de clientes e servidor MCP" },
    oneLine: {
      en: "Where the companies in my consulting program follow deliverables, decisions, OKRs and numbers, and where AI agents work alongside them.",
      pt: "Onde as empresas do meu programa de consultoria acompanham entregáveis, decisões, OKRs e números, e onde agentes de IA trabalham junto.",
    },
    status: { en: "In use with consulting clients", pt: "Em uso com clientes da consultoria" },
    stack: ["HTML, CSS, JS", "Firebase Auth", "Firestore", "Vercel Functions", "MCP SDK", "OAuth 2.1"],
    why: {
      en: "Clients followed an 8-month program through loose documents and \"how are we doing?\" emails. I wanted one place that answers, in seconds, where we are, what was decided and what depends on them.",
      pt: "Os clientes acompanhavam um programa de 8 meses por documentos soltos e e-mails de \"como estamos?\". Eu queria um lugar que respondesse em segundos onde estamos, o que foi decidido e o que depende deles.",
    },
    think: {
      body: {
        en: "I wrote the product before any screen. PRODUCT.md defines the reader: a partner or director, 40 to 60 years old, who reads little and with attention. It also sets the personality: serene, sober and authored, like a well-printed consulting report. CLAUDE.md holds the working rules, including the one that shapes every session: one decision at a time, always with a recommendation.",
        pt: "Escrevi o produto antes de qualquer tela. O PRODUCT.md define o leitor: sócio ou diretor, de 40 a 60 anos, que lê pouco e com atenção. Também define a personalidade: sereno, sóbrio e autoral, como um relatório de consultoria bem impresso. O CLAUDE.md guarda as regras de trabalho, inclusive a que molda cada sessão: uma decisão por vez, sempre com uma recomendação.",
      },
      excerpt: {
        file: "PRODUCT.md",
        text: {
          en: "Main reader: a partner or director at the client company. (...) Wants to understand in a few seconds: where we are, what was decided, what depends on me.",
          pt: "Leitor principal: sócio ou diretor da empresa cliente. (...) Quer entender em poucos segundos: onde estamos, o que foi decidido, o que depende de mim.",
        },
      },
    },
    system: {
      body: {
        en: "The design system is called Folha de Prova, a proof sheet. The taupe palette was measured from the sales decks, Spectral carries the reading, Archivo carries the interface, and motion has three speeds: 120, 200 and 320 ms. Sixteen Stitch prototypes set structure and hierarchy; the tokens decide color, type and spacing.",
        pt: "O sistema de design se chama Folha de Prova. A paleta taupe foi medida a partir dos decks comerciais, a Spectral conduz a leitura, a Archivo conduz a interface e o movimento tem três velocidades: 120, 200 e 320 ms. Dezesseis protótipos no Stitch definem estrutura e hierarquia; os tokens decidem cor, tipografia e espaçamento.",
      },
      shots: [
        { src: "/shots/salto/ds-cover.webp", caption: { en: "Cover of the proof sheet", pt: "Capa da folha de prova" } },
        { src: "/shots/salto/ds-palette.webp", caption: { en: "Palette with contrast notes for each use", pt: "Paleta com notas de contraste para cada uso" } },
        { src: "/shots/salto/ds-type.webp", caption: { en: "Type scale: Spectral for reading, Archivo for interface", pt: "Escala tipográfica: Spectral para leitura, Archivo para interface" } },
        { src: "/shots/salto/ds-components.webp", caption: { en: "Components and program stages", pt: "Componentes e etapas do programa" } },
      ],
    },
    build: {
      body: {
        en: "I build it only through Claude Code on the web, with no terminal. Every change is a pull request with a Vercel preview and numbered steps to check it in the browser. Merge waits for my \"approved\".",
        pt: "Construo só pelo Claude Code na web, sem terminal. Cada mudança é um pull request com pré-visualização na Vercel e passos numerados para conferir no navegador. O merge espera o meu \"aprovado\".",
      },
      facts: [
        {
          en: "Plain HTML, CSS and JavaScript with no build step, so AI assistants can read public pages without running scripts.",
          pt: "HTML, CSS e JavaScript puros, sem etapa de build, para que assistentes de IA leiam as páginas públicas sem rodar scripts.",
        },
        {
          en: "The database is closed to the browser: every read and write goes through Vercel Functions that check roles from Firebase custom claims.",
          pt: "O banco é fechado para o navegador: toda leitura e escrita passa por Vercel Functions que conferem os papéis guardados no Firebase.",
        },
        {
          en: "An MCP server with 60+ tools and OAuth 2.1: Claude, ChatGPT, Gemini CLI, Cursor and VS Code connect with only the portal address.",
          pt: "Servidor MCP com mais de 60 ferramentas e OAuth 2.1: Claude, ChatGPT, Gemini CLI, Cursor e VS Code conectam só com o endereço do portal.",
        },
        {
          en: "AI writes to drafts only. Clients see a deliverable once I publish it, and every AI write is logged with the person behind the connection.",
          pt: "A IA escreve só em rascunho. O cliente vê o entregável depois que eu publico, e toda escrita da IA fica registrada com a pessoa da conexão.",
        },
        {
          en: "26 test files run on Node's native test runner.",
          pt: "26 arquivos de teste rodando no test runner nativo do Node.",
        },
      ],
    },
    run: {
      body: {
        en: "Shown with a fictional company. The overview answers the three questions from PRODUCT.md on one screen; the numbers view tracks weekly revenue against the quarter's goal.",
        pt: "Mostrado com uma empresa fictícia. A visão geral responde às três perguntas do PRODUCT.md numa tela só; a tela de números acompanha a receita semanal contra a meta do trimestre.",
      },
      shots: [
        { src: "/shots/salto/overview.webp", caption: { en: "Overview: stage, next meeting, open commitments", pt: "Visão geral: etapa, próximo encontro, compromissos em aberto" } },
        { src: "/shots/salto/numbers.webp", caption: { en: "Numbers: weekly revenue against the goal", pt: "Números: receita semanal contra a meta" } },
      ],
    },
  },
  {
    slug: "yoji",
    sheet: "02",
    name: "Yoji",
    kind: { en: "Booking with upfront Pix payment", pt: "Agendamento com Pix antecipado" },
    oneLine: {
      en: "Each beauty professional gets a public page. The client picks a time, pays by Pix and is confirmed, with no message exchange and no no-shows.",
      pt: "Cada profissional de beleza ganha uma página pública. O cliente escolhe o horário, paga o Pix e está confirmado, sem troca de mensagens e sem falta.",
    },
    status: { en: "MVP", pt: "MVP" },
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "shadcn/ui", "Resend", "Pix"],
    why: {
      en: "Salon and barbershop professionals lose hours to WhatsApp back-and-forth and lose revenue when clients don't show up. Charging at booking solves both.",
      pt: "Profissionais de salão e barbearia perdem horas no vai e vem do WhatsApp e perdem receita quando o cliente não aparece. Cobrar no agendamento resolve as duas coisas.",
    },
    think: {
      body: {
        en: "The name comes from the Japanese 用事: an appointment, something to do. Before any code, CLAUDE.md fixed the tagline, the voice (direct and Brazilian, speaking to \"you\"), the plans and a list of what the MVP would not include.",
        pt: "O nome vem do japonês 用事: compromisso marcado, coisa a fazer. Antes do código, o CLAUDE.md fixou a tagline, o tom (direto, brasileiro, falando com \"você\"), os planos e a lista do que o MVP não teria.",
      },
      excerpt: {
        file: "CLAUDE.md",
        text: {
          en: "What NOT to build in the MVP:\nAutomatic WhatsApp API integration\nNative mobile app\nMulti-location and franchise chains\nGoogle or Outlook calendar sync\nAutomatic commissions\nMarketing automation\nPublic marketplace",
          pt: "O que NÃO construir no MVP:\nIntegração WhatsApp API automática\nApp mobile nativo\nMulti-location / redes de franquias\nCalendar sync com Google/Outlook\nSistema de comissões automático\nMarketing automático\nMarketplace público",
        },
      },
    },
    system: {
      body: {
        en: "Verde Yoji: Epilogue for headlines, Inter for text, and inputs styled like WhatsApp, because that is where this audience already types. Layout rules are written down (text width, alignment, line breaks), and the landing copy lives in CLAUDE.md, used word for word.",
        pt: "Verde Yoji: Epilogue nos títulos, Inter no texto e campos no estilo do WhatsApp, porque é onde esse público já digita. As regras de layout estão escritas (largura do texto, alinhamento, quebras de linha), e a copy da landing mora no CLAUDE.md, usada palavra por palavra.",
      },
      shots: [
        { src: "/shots/yoji/mobile.webp", caption: { en: "Phone first: most professionals open it on mobile", pt: "Celular primeiro: a maioria dos profissionais abre pelo celular" }, phone: true },
      ],
    },
    build: {
      body: {
        en: "The business rules were numbered before the schema existed, so every route had a rule to obey.",
        pt: "As regras de negócio foram numeradas antes de o schema existir, para que cada rota tivesse uma regra a cumprir.",
      },
      facts: [
        {
          en: "A booking starts as pending payment and becomes confirmed only when the Pix webhook arrives.",
          pt: "O agendamento nasce como pagamento pendente e só vira confirmado quando chega o webhook do Pix.",
        },
        {
          en: "Each booking gets four single-use tokens (confirm, reschedule, cancel, review), emailed after payment.",
          pt: "Cada agendamento gera quatro tokens de uso único (confirmar, reagendar, cancelar, avaliar), enviados por e-mail depois do pagamento.",
        },
        {
          en: "A reminder goes out 24 hours before; cancellation is allowed up to 2 hours before.",
          pt: "O lembrete sai 24 horas antes; o cancelamento vale até 2 horas antes.",
        },
        {
          en: "Plan limits are enforced in the API: the free plan stops at 10 bookings a month.",
          pt: "Os limites de plano são aplicados na API: o plano grátis para em 10 agendamentos por mês.",
        },
      ],
    },
    run: {
      body: {
        en: "The landing page on desktop, followed by the full page.",
        pt: "A landing no desktop, seguida da página inteira.",
      },
      shots: [
        { src: "/shots/yoji/hero.webp", caption: { en: "Hero: the promise and the booking cards", pt: "Hero: a promessa e os cards de agendamento" } },
        { src: "/shots/yoji/landing-full.webp", caption: { en: "Full landing: numbers, how it works, plans, FAQ, beta list", pt: "Landing inteira: números, como funciona, planos, perguntas, lista do beta" }, tall: true },
      ],
    },
  },
  {
    slug: "minharfp",
    sheet: "03",
    name: "minhaRFP",
    kind: { en: "B2B SaaS for RFPs", pt: "SaaS B2B de RFPs" },
    oneLine: {
      en: "Suppliers answer RFPs faster with the knowledge their company already has; buyers publish RFPs, receive proposals and decide in one place.",
      pt: "Fornecedores respondem RFPs mais rápido com o conhecimento que a empresa já tem; compradores publicam a RFP, recebem propostas e decidem num lugar só.",
    },
    status: { en: "Live on Vercel", pt: "No ar na Vercel" },
    live: { href: "https://minharfp.vercel.app", label: "minharfp.vercel.app" },
    stack: ["Next.js", "TypeScript", "Supabase (São Paulo)", "Tailwind", "Anthropic API"],
    why: {
      en: "Answering an RFP means digging the same answers out of old proposals. Publishing one means chasing suppliers by email and comparing spreadsheets.",
      pt: "Responder uma RFP é garimpar as mesmas respostas em propostas antigas. Publicar uma é correr atrás de fornecedor por e-mail e comparar planilhas.",
    },
    think: {
      body: {
        en: "Two modules sold separately, with names fixed in the code and in the interface. The key product call: AI is a paid add-on, and the product works without it. The buyer module doubles as an acquisition channel, since suppliers invited by link answer without creating an account.",
        pt: "Dois módulos vendidos separadamente, com nomes fixos no código e na interface. A decisão de produto central: a IA é um add-on pago, e o produto funciona sem ela. O módulo de compras também é canal de aquisição, porque o fornecedor convidado por link responde sem criar conta.",
      },
      excerpt: {
        file: "CLAUDE.md",
        text: {
          en: "Product decision: AI is a paid add-on. The core is organizing and reusing commercial knowledge. AI amplifies it, and the product works without it.",
          pt: "Decisão de produto: A IA é um add-on pago, não o core. O core é organização e reutilização de conhecimento comercial. A IA potencializa, mas o produto funciona sem ela.",
        },
      },
    },
    system: {
      body: {
        en: "Onyx & Ink: black and white with a single purple accent, a module switcher at the top of the sidebar, a 48 px collapsed sidebar, and a consistency audit that Claude Code runs against the rules.",
        pt: "Onyx & Ink: preto e branco com um único acento roxo, seletor de módulo no topo da sidebar, sidebar recolhida de 48 px e uma auditoria de consistência que o Claude Code roda contra as regras.",
      },
      shots: [
        { src: "/shots/minharfp/conhecimento.webp", caption: { en: "Knowledge base: the asset suppliers reuse", pt: "Base de conhecimento: o ativo que o fornecedor reaproveita" } },
      ],
    },
    build: {
      body: {
        en: "AGENTS.md is the protocol Claude Code follows on every change: a quality checklist, a security checklist and penetration tests before each deploy.",
        pt: "O AGENTS.md é o protocolo que o Claude Code segue em toda mudança: checklist de qualidade, checklist de segurança e testes de invasão antes de cada deploy.",
      },
      facts: [
        {
          en: "Data hosted in São Paulo, with row-level security isolating each company.",
          pt: "Dados hospedados em São Paulo, com segurança por linha isolando cada empresa.",
        },
        {
          en: "Brazil's data protection law covered: privacy policy, terms, recorded consent and account deletion on request.",
          pt: "LGPD coberta: política de privacidade, termos, registro de consentimento e exclusão de conta sob demanda.",
        },
        {
          en: "Eight penetration tests before each deploy, including cross-user access, plan manipulation, brute force, malicious upload and XSS.",
          pt: "Oito testes de invasão antes de cada deploy, incluindo acesso entre usuários, manipulação de plano, força bruta, upload malicioso e XSS.",
        },
        {
          en: "Validation metrics defined before launch: RFPs created, suppliers invited, submission rate, conversion and response time.",
          pt: "Métricas de validação definidas antes do lançamento: RFPs criadas, fornecedores convidados, taxa de submissão, conversão e tempo de resposta.",
        },
      ],
    },
    run: {
      body: {
        en: "A demo account with five companies and a 20-item knowledge base, set up for these screenshots.",
        pt: "Uma conta demo com cinco empresas e uma base de 20 itens, montada para estas capturas.",
      },
      shots: [
        { src: "/shots/minharfp/dashboard.webp", caption: { en: "Dashboard: plan, hours saved, active RFPs", pt: "Painel: plano, horas economizadas, RFPs ativas" } },
        { src: "/shots/minharfp/chat.webp", caption: { en: "Chat over the company's own knowledge", pt: "Chat sobre o conhecimento da própria empresa" } },
        { src: "/shots/minharfp/projetos.webp", caption: { en: "Projects with deadlines and status", pt: "Projetos com prazo e situação" } },
      ],
    },
  },
  {
    slug: "graupleno",
    sheet: "04",
    name: "GrauPleno",
    kind: { en: "Safety and compliance score for industrial SMEs", pt: "Índice de segurança e compliance para PMEs industriais" },
    oneLine: {
      en: "A 20-minute diagnostic that gives Brazilian industrial companies a 0 to 100 Safety & Compliance Index and a PDF report for the board.",
      pt: "Um diagnóstico de 20 minutos que dá às indústrias brasileiras um Safety & Compliance Index de 0 a 100 e um relatório em PDF para a diretoria.",
    },
    status: { en: "Free score (tier 0) built", pt: "Score grátis (tier 0) construído" },
    stack: ["Next.js", "TypeScript", "Supabase", "Zod", "Resend", "React PDF"],
    why: {
      en: "Small industrial companies know safety matters but have no quick way to see where they stand without commissioning a long audit.",
      pt: "Pequenas indústrias sabem que segurança importa, mas não têm um jeito rápido de ver onde estão sem contratar uma auditoria longa.",
    },
    think: {
      body: {
        en: "Product-led from day one: four tiers, with a free score as the way in. The free result is also how leads reach sales, so the score feeds a commercial priority formula calculated on the server.",
        pt: "Product-led desde o primeiro dia: quatro tiers, com o score grátis como porta de entrada. O resultado grátis também é como o lead chega a vendas, então o score alimenta uma fórmula de prioridade comercial calculada no servidor.",
      },
      excerpt: {
        file: "CLAUDE.md",
        code: true,
        text: {
          en: "Priority = (100 - SCI) × 0.4\n         + employee_weight × 0.3\n         + red_flags × 0.2\n         + shift_weight × 0.1",
          pt: "Prioridade = (100 - SCI) × 0.4\n           + peso_funcionários × 0.3\n           + red_flags × 0.2\n           + peso_turnos × 0.1",
        },
      },
    },
    system: {
      body: {
        en: "Navy and safety orange, a gauge for the score, and a step-by-step form with a progress bar, so the experience reads like a technical report.",
        pt: "Azul-marinho e laranja de segurança, um medidor para o score e um formulário em etapas com barra de progresso, para a experiência soar como um laudo técnico.",
      },
      shots: [
        { src: "/shots/graupleno/diagnostic.webp", caption: { en: "Diagnostic, step 1 of 3: plant exposure profile", pt: "Diagnóstico, etapa 1 de 3: perfil de exposição da planta" } },
      ],
    },
    build: {
      body: {
        en: "The admin side is a small company inside the product: sales, product analytics and user management, each behind its own role.",
        pt: "O lado administrativo é uma pequena empresa dentro do produto: comercial, analytics de produto e gestão de usuários, cada um com seu papel.",
      },
      facts: [
        {
          en: "A gate before the diagnostic collects sector, state, size and shifts; abandonment is tracked with sendBeacon when the page closes.",
          pt: "Um cadastro antes do diagnóstico coleta setor, estado, porte e turnos; o abandono é rastreado com sendBeacon quando a página fecha.",
        },
        {
          en: "Leads are scored on the server and land in a 5-stage CRM kanban with drag and drop and notes.",
          pt: "Os leads ganham score no servidor e caem num kanban de CRM com 5 estágios, arrastar e soltar e anotações.",
        },
        {
          en: "A product panel tracks scores started, completion rate, abandonment before the gate and free-to-paid conversion, with an 8-week trend.",
          pt: "Um painel de produto acompanha scores iniciados, taxa de conclusão, abandono antes do cadastro e conversão de grátis para pago, com tendência de 8 semanas.",
        },
        {
          en: "PDF report generated on the server; admin access with roles signed as JWT.",
          pt: "Relatório em PDF gerado no servidor; acesso administrativo com papéis assinados em JWT.",
        },
      ],
    },
    run: {
      body: {
        en: "The public side: landing page and the diagnostic flow.",
        pt: "O lado público: landing e o fluxo do diagnóstico.",
      },
      shots: [
        { src: "/shots/graupleno/hero.webp", caption: { en: "Hero with a sample score", pt: "Hero com um score de exemplo" } },
        { src: "/shots/graupleno/landing-full.webp", caption: { en: "Full landing: process, tiers, FAQ", pt: "Landing inteira: processo, tiers, perguntas" }, tall: true },
      ],
    },
  },
  {
    slug: "sheenshot",
    sheet: "05",
    name: "Sheenshot",
    kind: { en: "Screenshot app for Mac", pt: "App de capturas para Mac" },
    oneLine: {
      en: "Beautiful screenshots in seconds: capture, style, annotate, search by text and turn captures into guides in your brand.",
      pt: "Capturas bonitas em segundos: capturar, estilizar, anotar, buscar pelo texto e transformar prints em guias com a sua marca.",
    },
    status: { en: "Free download, Pro plan", pt: "Download grátis e plano Pro" },
    stack: ["macOS app", "HTML and CSS site", "Vanilla JS tools"],
    why: {
      en: "Screenshots are how product people explain things, and making them look good still takes too many steps.",
      pt: "Prints são a forma como gente de produto explica as coisas, e deixá-los bonitos ainda exige passos demais.",
    },
    think: {
      body: {
        en: "Free and Pro are split by need. The free library keeps the 20 most recent screenshots; automatic background colors, the full library and the extra Clean Stage options are Pro.",
        pt: "Grátis e Pro se dividem pela necessidade. A biblioteca grátis guarda os 20 prints mais recentes; as cores de fundo automáticas, a biblioteca completa e as opções extras do Palco limpo ficam no Pro.",
      },
      excerpt: {
        file: "README.md",
        text: {
          en: "Plain JavaScript, no libraries. Nothing is uploaded: images are read and drawn in the browser itself.",
          pt: "JavaScript puro, sem bibliotecas. Nada é enviado: as imagens são lidas e desenhadas no próprio navegador.",
        },
      },
    },
    system: {
      body: {
        en: "A dark, keyboard-first interface (⌘K for commands, presets on keys 1 to 9) and a Brand area where a company sets its logo and colors for every guide.",
        pt: "Interface escura e orientada a teclado (⌘K para comandos, presets nas teclas 1 a 9) e uma área de Marca onde a empresa define logo e cores para todos os guias.",
      },
      shots: [
        { src: "/shots/sheenshot/marca.webp", caption: { en: "Brand: logo and colors applied to guides", pt: "Marca: logo e cores aplicados aos guias" } },
      ],
    },
    build: {
      body: {
        en: "The app and a bilingual site, both built with Claude Code.",
        pt: "O app e um site bilíngue, ambos construídos com o Claude Code.",
      },
      facts: [
        {
          en: "Text in every screenshot is read on the Mac itself, so the library can be searched by word, color or app.",
          pt: "O texto de cada print é lido no próprio Mac, então a biblioteca pode ser buscada por palavra, cor ou app.",
        },
        {
          en: "Clean Stage hides desktop icons with one shortcut before a recording or a meeting.",
          pt: "O Palco limpo esconde os ícones da mesa com um atalho antes de uma gravação ou reunião.",
        },
        {
          en: "The site detects the visitor's language and runs its tools in the browser: the background generator pulls vivid colors from a screenshot without uploading it.",
          pt: "O site detecta o idioma do visitante e roda as ferramentas no navegador: o gerador de fundo extrai as cores vivas do print sem enviá-lo.",
        },
        {
          en: "Press kit and release notes in Portuguese and English.",
          pt: "Kit de imprensa e notas de versão em português e inglês.",
        },
      ],
    },
    run: {
      body: {
        en: "The app in use.",
        pt: "O app em uso.",
      },
      shots: [
        { src: "/shots/sheenshot/editor.webp", caption: { en: "Editor: background, margin, shadow, presets", pt: "Editor: fundo, margem, sombra, presets" } },
        { src: "/shots/sheenshot/historico.webp", caption: { en: "Library searchable by text, color and app", pt: "Biblioteca com busca por texto, cor e app" } },
        { src: "/shots/sheenshot/guias.webp", caption: { en: "Tutorials built from captures", pt: "Tutoriais montados a partir das capturas" } },
      ],
    },
  },
  {
    slug: "casulo",
    sheet: "06",
    name: "Casulo",
    kind: { en: "Mac app", pt: "App para Mac" },
    oneLine: {
      en: "My newest Mac app. The full sheet is being drawn.",
      pt: "Meu app para Mac mais recente. A folha completa está sendo desenhada.",
    },
    status: { en: "Sheet in progress", pt: "Folha em preparação" },
    stack: ["macOS app"],
    pending: true,
  },
];

export const t = (v: T, lang: Lang) => v[lang];
