/* "Play the process": a fictional case where the visitor acts as the PM through the six phases. */

type T = { en: string; pt: string };

export type Pick = { id: string; who: T; says: T; biz: number; use: number };
export type Slot = { label: T; options: T[]; correct: number };

export const game = {
  ui: {
    play: { en: "Play", pt: "Jogar" },
    read: { en: "Read", pt: "Ler" },
    modeLabel: { en: "How to explore the process", pt: "Como explorar o processo" },
    file: { en: "studio-lume, a fictional case", pt: "studio-lume, caso fictício" },
    biz: { en: "Business", pt: "Negócio" },
    use: { en: "Use", pt: "Uso" },
    rework: { en: "Rework", pt: "Retrabalho" },
    days: { en: "days", pt: "dias" },
    notebook: { en: "Notebook", pt: "Caderno" },
    notebookEmpty: { en: "What you hear in discovery lands here.", pt: "O que você ouvir na descoberta fica aqui." },
    costLabel: { en: "Changing course now costs", pt: "Mudar de rumo agora custa" },
    next: { en: "Next phase", pt: "Próxima etapa" },
    confirm: { en: "Confirm", pt: "Confirmar" },
    pmNote: { en: "PM note", pt: "Nota de PM" },
    phase: { en: "Phase", pt: "Etapa" },
    of: { en: "of", pt: "de" },
    start: { en: "Take the case", pt: "Assumir o caso" },
    again: { en: "Play again", pt: "Jogar de novo" },
    seeWork: { en: "See the real products", pt: "Ver os produtos reais" },
    readMode: { en: "Read the process", pt: "Ler o processo" },
  },

  intro: {
    title: { en: "Studio Lume needs more clients. Or does it?", pt: "O Studio Lume precisa de mais clientes. Será?" },
    body: {
      en: "A beauty studio with three professionals. The owner opens with one sentence: \"I need more clients.\" You are the PM. Six phases, one decision each, and every decision moves two meters: business and use.",
      pt: "Um studio de beleza com três profissionais. A dona abre a conversa com uma frase: \"Preciso de mais clientes.\" Você é o PM. Seis etapas, uma decisão em cada, e toda decisão mexe em dois medidores: negócio e uso.",
    },
    rule: {
      en: "Fictional case. The scoring rewards what I look for in real work: both sides heard, the problem framed before the solution, mistakes caught while they are cheap.",
      pt: "Caso fictício. A pontuação premia o que eu busco no trabalho real: os dois lados ouvidos, o problema enquadrado antes da solução, erros pegos enquanto saem baratos.",
    },
  },

  /* Cost of changing course, per phase */
  cost: [1, 1, 2, 4, 8, 16],

  discover: {
    title: { en: "You have time for three conversations this week. Who do you talk to?", pt: "Você tem tempo para três conversas nesta semana. Com quem fala?" },
    picks: [
      { id: "owner", who: { en: "The owner", pt: "A dona do studio" }, says: { en: "\"Revenue drops because slots sit empty.\"", pt: "\"O faturamento cai porque horário fica vazio.\"" }, biz: 25, use: 0 },
      { id: "desk", who: { en: "The receptionist", pt: "A recepcionista" }, says: { en: "\"I spend every morning confirming appointments on WhatsApp.\"", pt: "\"Passo a manhã inteira confirmando horário no WhatsApp.\"" }, biz: 10, use: 10 },
      { id: "noshow", who: { en: "A client who didn't show up", pt: "Uma cliente que faltou" }, says: { en: "\"I booked by message a week ahead and forgot. Nobody reminded me.\"", pt: "\"Marquei por mensagem uma semana antes e esqueci. Ninguém me lembrou.\"" }, biz: 0, use: 25 },
      { id: "loyal", who: { en: "A loyal client", pt: "Uma cliente fiel" }, says: { en: "\"I'd book at night, when the studio is closed.\"", pt: "\"Eu marcaria à noite, quando o studio está fechado.\"" }, biz: 0, use: 15 },
      { id: "acct", who: { en: "The accountant", pt: "O contador" }, says: { en: "\"Each empty slot costs the full price of the service.\"", pt: "\"Cada horário vazio custa o valor inteiro do serviço.\"" }, biz: 15, use: 0 },
    ] as Pick[],
    choose: { en: "Pick three", pt: "Escolha três" },
    noteBalanced: {
      en: "Both sides at the table. The owner asked for more clients; the conversations point to clients who already booked and didn't come.",
      pt: "Os dois lados na mesa. A dona pediu mais clientes; as conversas apontam para clientes que já marcaram e não vieram.",
    },
    noteBiz: {
      en: "You heard the business only. You know what it costs, and you still can't say why it happens.",
      pt: "Você ouviu só o negócio. Sabe quanto custa, mas ainda não sabe por que acontece.",
    },
    noteUse: {
      en: "You heard the users only. You know the pain, and you still can't say which number has to move.",
      pt: "Você ouviu só quem usa. Conhece a dor, mas ainda não sabe qual número precisa mexer.",
    },
  },

  frame: {
    title: { en: "Turn what you heard into a job to be done, then pick the number that proves it.", pt: "Transforme o que ouviu num job to be done e escolha o número que prova o resultado." },
    slots: [
      {
        label: { en: "When", pt: "Quando" },
        options: [
          { en: "I book a slot days in advance", pt: "marco um horário com dias de antecedência" },
          { en: "I scroll the studio's Instagram", pt: "olho o Instagram do studio" },
          { en: "I want to try a new service", pt: "quero experimentar um serviço novo" },
        ],
        correct: 0,
      },
      {
        label: { en: "I want to", pt: "quero" },
        options: [
          { en: "see photos of past work", pt: "ver fotos de trabalhos" },
          { en: "lock the slot without trading messages", pt: "garantir o horário sem trocar mensagens" },
          { en: "get a discount", pt: "ganhar um desconto" },
        ],
        correct: 1,
      },
      {
        label: { en: "so I can", pt: "para" },
        options: [
          { en: "show it to my friends", pt: "mostrar para as amigas" },
          { en: "pay less", pt: "pagar menos" },
          { en: "show up on the day without losing my place", pt: "chegar no dia sem perder a vaga" },
        ],
        correct: 2,
      },
      {
        label: { en: "Business number", pt: "Número do negócio" },
        options: [
          { en: "Instagram followers", pt: "Seguidores no Instagram" },
          { en: "No-show rate", pt: "Taxa de faltas" },
          { en: "Messages answered per day", pt: "Mensagens respondidas por dia" },
        ],
        correct: 1,
      },
    ] as Slot[],
    note: {
      en: "The request was \"more clients\". The job is keeping the clients she already has. Framing changed the product before any screen existed.",
      pt: "O pedido era \"mais clientes\". O job é segurar as clientes que ela já tem. O enquadramento mudou o produto antes de existir qualquer tela.",
    },
  },

  write: {
    title: { en: "The spec fits three ideas. Which ones go in now?", pt: "A especificação comporta três ideias. Quais entram agora?" },
    ideas: [
      { en: "Upfront payment by Pix", pt: "Pagamento antecipado por Pix", core: true },
      { en: "Native app for iOS and Android", pt: "App nativo para iOS e Android", core: false },
      { en: "Automatic reminder the day before", pt: "Lembrete automático na véspera", core: true },
      { en: "Loyalty program", pt: "Programa de fidelidade", core: false },
      { en: "Public page with open slots", pt: "Página pública com horários livres", core: true },
      { en: "Chat with the professional", pt: "Chat com a profissional", core: false },
    ],
    choose: { en: "Pick three. The rest goes to the out-of-scope list.", pt: "Escolha três. O resto vai para a lista do que fica de fora." },
    note: {
      en: "Each idea that made it answers the job: book alone, pay to hold the slot, get reminded. Writing down what stays out is half the spec.",
      pt: "Cada ideia que entrou responde ao job: marcar sozinha, pagar para segurar o horário, ser lembrada. Escrever o que fica de fora é metade da especificação.",
    },
  },

  prototype: {
    title: { en: "Three clients try the clickable prototype. One of them stops at the payment screen.", pt: "Três clientes testam o protótipo navegável. Uma delas trava na tela de pagamento." },
    quotes: [
      { en: "\"Booking at night is great.\"", pt: "\"Marcar à noite é ótimo.\"" },
      { en: "\"The reminder would have saved me last month.\"", pt: "\"O lembrete teria me salvado no mês passado.\"" },
      { en: "\"And if I need to cancel? Do I lose the money?\"", pt: "\"E se eu precisar desmarcar? Perco o dinheiro?\"" },
    ],
    options: [
      { en: "Fix it in the prototype: show the cancellation policy before the Pix screen", pt: "Ajustar no protótipo: mostrar a política de cancelamento antes da tela do Pix", biz: 10, use: 15, rework: 0 },
      { en: "Move on to the build and handle it later", pt: "Seguir para a construção e resolver depois", biz: 5, use: 0, rework: 8 },
      { en: "Drop upfront payment to avoid the friction", pt: "Tirar o pagamento antecipado para evitar o atrito", biz: -15, use: 5, rework: 0 },
    ],
    notes: [
      { en: "One day of prototype work. In code, the same change would cost eight.", pt: "Um dia de ajuste no protótipo. No código, a mesma mudança custaria oito." },
      { en: "It will come back after launch, at the price of phase 6.", pt: "Isso vai voltar depois do lançamento, pelo preço da etapa 6." },
      { en: "The friction is gone and so is the slot guarantee. No-shows go back to where they were.", pt: "O atrito sumiu e a garantia do horário também. As faltas voltam para onde estavam." },
    ],
  },

  build: {
    title: { en: "Pull request #14 arrives with a preview link. One line breaks an acceptance criterion. Find it.", pt: "Chega o pull request #14 com link de pré-visualização. Uma linha quebra um critério de aceite. Encontre." },
    criteria: [
      { en: "The slot is confirmed only after the Pix payment clears.", pt: "O horário só fica confirmado depois que o Pix cai." },
      { en: "The cancellation policy appears before payment.", pt: "A política de cancelamento aparece antes do pagamento." },
      { en: "The client gets a reminder the day before.", pt: "A cliente recebe lembrete na véspera." },
    ],
    diff: [
      { code: "+ showPolicy(booking.service)", bad: false },
      { code: "+ booking.status = \"confirmed\"", bad: true },
      { code: "+ onPixWebhook(markPaid)", bad: false },
      { code: "+ scheduleReminder(booking, \"-24h\")", bad: false },
    ],
    file: "app/booking/confirm.ts",
    criteriaLabel: { en: "Acceptance criteria", pt: "Critérios de aceite" },
    wrong: { en: "This line respects the criteria. Look again.", pt: "Essa linha respeita os critérios. Olhe de novo." },
    note: {
      en: "The booking was confirmed on creation, before the money arrived. Changes requested, merge waits. Criteria written in phase 3 made this a two-minute review.",
      pt: "A reserva era confirmada na criação, antes do dinheiro chegar. Mudança pedida, o merge espera. Os critérios escritos na etapa 3 fizeram desta uma revisão de dois minutos.",
    },
  },

  ship: {
    title: { en: "Thirty days live. The number moved. Now look at the behavior.", pt: "Trinta dias no ar. O número mexeu. Agora olhe o comportamento." },
    metricLabel: { en: "No-show rate", pt: "Taxa de faltas" },
    before: { en: "before", pt: "antes" },
    after: { en: "after", pt: "depois" },
    funnelLabel: { en: "Funnel this month", pt: "Funil do mês" },
    funnel: [
      { en: "Opened the page", pt: "Abriram a página" },
      { en: "Picked a slot", pt: "Escolheram horário" },
      { en: "Paid by Pix", pt: "Pagaram o Pix" },
    ],
    reworkHit: {
      en: "The cancellation question came back in support messages. Fixing it in production took 8 days.",
      pt: "A dúvida do cancelamento voltou nas mensagens de suporte. Corrigir em produção levou 8 dias.",
    },
    question: { en: "Which question opens the next round of discovery?", pt: "Qual pergunta abre a próxima rodada de descoberta?" },
    options: [
      { en: "How do we double Instagram followers?", pt: "Como dobrar os seguidores no Instagram?" },
      { en: "Why do so many people quit at the Pix screen?", pt: "Por que tanta gente desiste na tela do Pix?" },
      { en: "Which button color converts better?", pt: "Qual cor de botão converte mais?" },
    ],
    correct: 1,
    note: {
      en: "The gap between the number and the behavior is where the next round starts. Back to phase 1, with a better question.",
      pt: "A distância entre o número e o comportamento é onde começa a próxima rodada. De volta à etapa 1, com uma pergunta melhor.",
    },
  },

  end: {
    title: { en: "Case closed, loop open.", pt: "Caso fechado, ciclo aberto." },
    balanced: { en: "Business + use = product. Both sides grew together.", pt: "Negócio + uso = produto. Os dois lados cresceram juntos." },
    bizHeavy: { en: "The number moved, and the people using it still stumble.", pt: "O número mexeu, e quem usa ainda tropeça." },
    useHeavy: { en: "Clients like it, and the studio still doesn't feel it in the till.", pt: "As clientes gostam, e o studio ainda não sente no caixa." },
    low: { en: "The product shipped without a clear job behind it. Worth a second round.", pt: "O produto saiu sem um job claro por trás. Vale uma segunda rodada." },
    reworkLine: { en: "Rework caused by late decisions", pt: "Retrabalho causado por decisão tardia" },
  },
};
