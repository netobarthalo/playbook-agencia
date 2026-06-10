// ═══════════════════════════════════════════════════════════════════
// NICHOS — Briefing, Públicos, Funil e Tráfego por tipo de cliente
// ═══════════════════════════════════════════════════════════════════

export const NICHOS_CONFIG = {

  // ─────────────────────────────────────────────────────────────────
  associacao: {
    label: '🤝 Associação de Bairro',
    cor: '#8B5CF6',
    descricao: 'Associação de moradores, ONG, entidade comunitária',
    servicosRecomendados: ['Gestão de Redes Sociais', 'Criação de Conteúdo / Copy'],
    estruturaNegocio: {
      altoTicket: 'Captação de associados (mensalidade)',
      recorrencia: 'Renovação anual de associados',
      upsell: 'Eventos, rifas, parcerias com comércio local',
    },
    briefing: [
      {
        bloco: 'A Associação', icone: '🏘️',
        instrucao: 'Entenda a história, a causa e o que move essa associação. Perguntas sobre impacto real no bairro.',
        perguntas: [
          { p: 'Quando a associação foi fundada e por quê?', dica: 'A origem revela a causa central — use isso na comunicação.' },
          { p: 'Quais são as principais demandas do bairro que a associação luta por resolver?', dica: 'Lista concreta: iluminação, asfalto, segurança, áreas verdes... Isso é o conteúdo principal.' },
          { p: 'Quais conquistas concretas a associação já teve junto à prefeitura ou poder público?', dica: 'Esse é o "antes e depois" deles. Prova de que funciona.' },
          { p: 'Quem são os líderes? O presidente é uma figura conhecida no bairro?', dica: 'Humanizar a liderança é fundamental para engajamento local.' },
          { p: 'Como funciona a associação? Tem mensalidade? Como alguém vira associado?', dica: 'Entender o modelo de adesão para comunicar o chamado à ação correto.' },
          { p: 'Existem eventos presenciais? Assembleias, mutirões, festas de bairro?', dica: 'Eventos geram conteúdo poderoso — fotos, vídeos, engajamento real.' },
        ],
      },
      {
        bloco: 'Público e Comunidade', icone: '👥',
        instrucao: 'O público aqui é o próprio morador. Entenda quem mora no bairro e o que os move.',
        perguntas: [
          { p: 'Qual é o perfil predominante dos moradores do bairro? (idade, renda, tempo de moradia)', dica: 'Moradores antigos têm vínculo emocional forte. Novos precisam ser apresentados à associação.' },
          { p: 'Qual é a maior frustração dos moradores que a associação ainda não conseguiu resolver?', dica: 'Honestidade aqui gera credibilidade na comunicação.' },
          { p: 'O que faz um morador se tornar associado? Qual é o gatilho?', dica: 'Geralmente é uma situação de urgência ou indignação. Mapeie isso.' },
          { p: 'Qual é a principal resistência de quem ainda não é associado?', dica: '"Não vai adiantar", "não tenho tempo", "não sei como ajuda" — cada objeção vira um conteúdo.' },
          { p: 'Tem algum morador influente no bairro que poderia ser porta-voz?', dica: 'Microinfluenciadores locais valem muito mais que posts patrocinados.' },
        ],
      },
      {
        bloco: 'Objetivos e Meta de Associados', icone: '🎯',
        instrucao: 'Alinhe metas numéricas reais. Associação precisa de escala para ter poder de negociação com o poder público.',
        perguntas: [
          { p: 'Quantos associados ativos a associação tem hoje?', dica: 'Ponto de partida real.' },
          { p: 'Qual é a meta de associados para os próximos 6 meses?', dica: 'Meta mensurável define a estratégia de conteúdo e ads.' },
          { p: 'Como a associação se comunica com os moradores hoje? Tem grupo de WhatsApp?', dica: 'Grupos de WhatsApp de bairro são ouro — conteúdo que vai direto ao público.' },
          { p: 'Existe verba para investimento em anúncios? Mesmo que pequena?', dica: 'Para associação, R$200-500/mês já faz diferença com segmentação local.' },
          { p: 'Quais redes sociais os moradores mais usam?', dica: 'Instagram para fotos de obra/conquista. Facebook para público 40+. WhatsApp para mobilização.' },
        ],
      },
    ],
    publicos: `PÚBLICO 1 — Morador Engajado (35-60 anos)
Perfil: Mora no bairro há mais de 5 anos, tem filhos, se preocupa com segurança e infraestrutura.
Dores: Buracos na rua, falta de iluminação, descaso da prefeitura.
Motivadores: Ver melhorias concretas, sentir que sua voz tem peso.
Como alcançar: Grupos de WhatsApp do bairro, Facebook, Instagram local.

PÚBLICO 2 — Novo Morador (25-40 anos)
Perfil: Chegou recentemente, ainda construindo vínculos com a comunidade.
Dores: Não conhece os problemas históricos do bairro, não sabe como participar.
Motivadores: Sentir-se parte de uma comunidade, ter segurança para a família.
Como alcançar: Instagram, anúncios com segmentação geográfica.

PÚBLICO 3 — Comerciante Local
Perfil: Tem negócio no bairro, interesse direto na valorização da área.
Dores: Insegurança, pouco fluxo, infraestrutura precária que afasta clientes.
Motivadores: Parceria com a associação, visibilidade, bairro mais seguro e valorizado.`,
    funil: {
      etapa1: `DESCONHECIMENTO: O morador não sabe que a associação existe ou acha que "não adianta".
Conteúdo: Posts mostrando conquistas concretas ("conseguimos o recape da Rua X"), fotos antes/depois de melhorias, bastidores de reuniões com a prefeitura.`,
      etapa2: `CONSCIÊNCIA: O morador conhece a associação mas ainda não é associado.
Conteúdo: "O que a associação faz por você?", depoimentos de moradores, pauta de reuniões abertas, explicação de como se associar.`,
      etapa3: `CONSIDERAÇÃO: O morador pensa em se associar mas tem dúvidas.
Conteúdo: "Quanto custa ser associado?", "O que ganho com isso?", transparência sobre uso das mensalidades, eventos para conhecer pessoalmente.`,
      etapa4: `AÇÃO: O morador decide se associar.
Conteúdo: CTA direto — link de cadastro no WhatsApp, QR code em posts, evento presencial de filiação.`,
    },
    trafego: `ESTRATÉGIA PARA ASSOCIAÇÃO DE BAIRRO:
Segmentação: Raio de 3-5km do bairro, todas as idades.
Objetivo: Reconhecimento + engajamento (não é venda direta).

Fase 1 — Lançamento digital: Vídeo apresentando a associação e suas conquistas. Objetivo: alcance local máximo.
Fase 2 — Captação de associados: Carrossel com benefícios de ser associado + CTA para WhatsApp.
Fase 3 — Mobilização: Posts de urgência sobre demandas específicas. Convocação para assembleias.

Verba sugerida: R$ 200-500/mês (segmentação muito específica = baixo custo por resultado).`,
  },

  // ─────────────────────────────────────────────────────────────────
  estetica: {
    label: '💆 Clínica de Estética',
    cor: '#F43F5E',
    descricao: 'Clínica de estética, harmonização, procedimentos estéticos',
    servicosRecomendados: ['Gestão de Redes Sociais', 'Tráfego Pago (Meta Ads)', 'Criação de Conteúdo / Copy', 'Identidade Visual'],
    estruturaNegocio: {
      altoTicket: 'Procedimentos injetáveis (Botox, preenchimento, bioestimulador)',
      recorrencia: 'Depilação, design de sobrancelha, limpeza de pele',
      upsell: 'Drenagem linfática, massagem, protocolos combinados',
    },
    briefing: [
      {
        bloco: 'A Clínica e os Procedimentos', icone: '💉',
        instrucao: 'Entenda profundamente o que a clínica oferece, o posicionamento e o carro-chefe do negócio.',
        perguntas: [
          { p: 'Quais procedimentos a clínica oferece? Qual é o carro-chefe?', dica: 'Separe em: alto ticket (injetáveis), recorrência (depilação/sobrancelha) e bem-estar (drenagem).' },
          { p: 'A profissional tem alguma especialização, certificação ou formação de destaque?', dica: 'Autoridade técnica é o maior diferencial em estética. Use em todo conteúdo de topo.' },
          { p: 'Quais são os produtos e marcas utilizados nos procedimentos?', dica: 'Marcas premium (Allergan, Galderma) são diferenciais poderosos e reduzem objeções de preço.' },
          { p: 'Qual é o ticket médio de cada procedimento principal?', dica: 'Fundamental para definir a estratégia de ads — ROI mínimo por lead.' },
          { p: 'A clínica tem antes e depois de pacientes (com autorização)?', dica: 'Prova visual é o conteúdo de maior conversão em estética. Se não tem, criar isso é prioridade.' },
          { p: 'Qual é o diferencial da clínica em relação às outras da cidade/região?', dica: 'Atendimento, ambiente, técnica, resultado natural, sigilo — o que é inegociável aqui.' },
        ],
      },
      {
        bloco: 'Pacientes e Objeções', icone: '👩',
        instrucao: 'Estética tem objeções muito específicas. Mapeie cada uma para criar conteúdo que as derrube.',
        perguntas: [
          { p: 'Qual é o perfil predominante das pacientes hoje?', dica: 'Faixa etária, classe social, procedimento mais procurado, como chegaram até a clínica.' },
          { p: 'Quais são as 3 principais objeções que impedem alguém de agendar?', dica: 'Medo de ficar artificial, dor, preço, marido não deixa, vai aparecer no trabalho — mapeie todas.' },
          { p: 'A clínica trabalha com pacote, parcelamento ou plano de manutenção?', dica: 'Modelo de recorrência é ouro. Se não tem, criar isso é uma recomendação estratégica.' },
          { p: 'Qual procedimento tem a maior taxa de retorno (paciente volta sempre)?', dica: 'Esse é o serviço de fidelização — merece campanha específica.' },
          { p: 'Alguma paciente deu depoimento em vídeo ou está disposta a dar?', dica: 'Depoimento real em vídeo é o criativo de maior conversão em estética. Prioridade máxima.' },
        ],
      },
      {
        bloco: 'Objetivos e Metas', icone: '🎯',
        instrucao: 'Alinhe metas numéricas reais de agendamentos e faturamento.',
        perguntas: [
          { p: 'Quantos agendamentos a clínica faz por mês hoje?', dica: 'Baseline para medir crescimento.' },
          { p: 'Qual é a meta de novos pacientes por mês?', dica: 'Separe: novos pacientes x retorno de pacientes antigos.' },
          { p: 'Qual é o faturamento mensal atual? Qual é a meta em 3 meses?', dica: 'Confidencial — use para calibrar o investimento em ads necessário.' },
          { p: 'A clínica usa algum sistema de agendamento online?', dica: 'Se tem, o link de agendamento é o CTA principal de todos os anúncios.' },
          { p: 'Qual é o horário de maior demanda e o de maior ociosidade?', dica: 'Campanhas de urgência nos horários ociosos têm custo por lead muito menor.' },
        ],
      },
    ],
    publicos: `PÚBLICO 1 — A Multitarefa (35-50 anos, Classe B/C+)
Servidora, comerciante ou profissional liberal. Correria entre trabalho e família.
Dores: Rugas de expressão, olhar pesado, semblante de cansaço.
Motivadores: Parecer descansada e rejuvenescida de forma natural.
Objeções: "Testa congelada", "dói muito", "é caro manter".

PÚBLICO 2 — A Jovem Conectada (25-35 anos, Classe B/C+)
Ativa nas redes sociais, valoriza estética preventiva.
Dores: Primeiras linhas dinâmicas, pele real diferente dos filtros.
Motivadores: Prevenção, "pele de filtro" na vida real.
Objeções: "Sou nova demais?", "vou ficar diferente?".

PÚBLICO 3 — A Madura Elegante (45-65 anos, Classe A/B+)
Frequenta eventos sociais, preza pela discrição e naturalidade.
Dores: Flacidez, rosto "derretendo", perda de contorno.
Motivadores: Recuperar estrutura facial, elegância sem "cara de plástica".
Objeções: "Cara de boneca de cera", "meu marido vai achar futilidade".`,
    funil: {
      etapa1: `DESCONFORTO SILENCIOSO: Sabe que algo mudou, mas não sabe o que fazer.
Conteúdo de identificação: "Você sente que seu rosto parece cansado mesmo após dormir bem?" Reels educativos sobre sinais de envelhecimento. Posts de empatia.`,
      etapa2: `CONSCIÊNCIA DO PROBLEMA: Pesquisa procedimentos, compara opções.
Conteúdo de autoridade: Como funciona cada procedimento, diferença entre Botox e preenchimento, vídeos educativos da profissional.`,
      etapa3: `CONSIDERAÇÃO: Avalia clínicas, lê depoimentos, manda mensagem perguntando preço.
Conteúdo de prova social: Antes e depois reais, depoimentos em vídeo, transparência sobre o protocolo.`,
      etapa4: `DECISÃO: Pronta para agendar, precisa de um empurrão.
Conteúdo de conversão: CTA direto para WhatsApp, oferta limitada, agendamento fácil.`,
    },
    trafego: `ESTRATÉGIA PARA CLÍNICA DE ESTÉTICA:
Funil curto — cidade/região específica. Trabalhar com Meta Ads prioritariamente.

Fase 1 — Lançamento (R$300): Vídeo estilo influencer visitando a clínica. Objetivo: videoview + seguidores.
Fase 2 — Por serviço (R$1.200):
  - Depilação/sobrancelha (volume): R$200 — atrair e gerar lead
  - Drenagem/massagem (conversão): R$400 — resultado rápido, CTA direto
  - Botox/preenchimento (autoridade): R$600 — educação + prova social + agendamento

Ganchos: "Você já percebeu essas linhas na testa?", "Erro que causa foliculite", "Corpo inchado mesmo treinando?"
Estrutura: Gancho → Roteiro → Copy → CTA (WhatsApp/Agendamento)`,
  },

  // ─────────────────────────────────────────────────────────────────
  medico: {
    label: '🏥 Médico / Saúde',
    cor: '#0EA5E9',
    descricao: 'Médico, dentista, psicólogo, fisioterapeuta, clínica de saúde',
    servicosRecomendados: ['Gestão de Redes Sociais', 'Tráfego Pago (Meta Ads)', 'Tráfego Pago (Google Ads)', 'Criação de Conteúdo / Copy'],
    estruturaNegocio: {
      altoTicket: 'Consultas particulares e procedimentos especializados',
      recorrencia: 'Retornos, acompanhamento contínuo, planos de tratamento',
      upsell: 'Exames, procedimentos complementares, segunda opinião',
    },
    briefing: [
      {
        bloco: 'O Médico e a Especialidade', icone: '👨‍⚕️',
        instrucao: 'Entenda a especialidade, o diferencial técnico e o que o posiciona acima dos concorrentes.',
        perguntas: [
          { p: 'Qual é a especialidade? Tem subespecialização ou foco específico?', dica: 'Nicho dentro da especialidade é o maior diferencial. "Cardiologista especialista em mulheres acima de 40" é mais poderoso que só "cardiologista".' },
          { p: 'Onde se formou? Tem residência, fellowship ou certificação de renome?', dica: 'Autoridade acadêmica é o pilar mais forte no marketing médico.' },
          { p: 'Atende pelo plano, particular ou ambos?', dica: 'Define o público e a abordagem de preço nos anúncios.' },
          { p: 'Quais são os procedimentos ou tratamentos mais realizados?', dica: 'O procedimento mais procurado guia o conteúdo de topo de funil.' },
          { p: 'Já publicou artigos, participou de congressos ou apareceu na mídia?', dica: 'Qualquer aparição em mídia é prova social poderosa — use em destaque no Instagram.' },
          { p: 'Qual é o principal diferencial no atendimento (tempo de consulta, escuta, tecnologia)?', dica: 'Pacientes escolhem médico por indicação e por confiança — o atendimento humanizado é o maior diferencial.' },
        ],
      },
      {
        bloco: 'Pacientes e Dores', icone: '🩺',
        instrucao: 'Mapeie quem busca esse médico e por qual motivo. Cada dor vira um conteúdo.',
        perguntas: [
          { p: 'Qual é o perfil dos pacientes que mais chegam ao consultório?', dica: 'Faixa etária, gênero, como chegaram (indicação, Google, plano).' },
          { p: 'Qual é o sintoma ou problema mais comum que leva o paciente a buscar atendimento?', dica: 'Esse é o gancho de todos os anúncios e conteúdos de topo de funil.' },
          { p: 'Qual é a principal dúvida ou medo do paciente antes da primeira consulta?', dica: '"Será que é grave?", "vou precisar operar?", "quanto vai custar?" — cada dúvida vira um post.' },
          { p: 'Qual é o resultado de transformação mais comum que um paciente relata após o tratamento?', dica: 'A transformação relatada pelos pacientes é o copy mais poderoso que existe.' },
          { p: 'O médico tem depoimentos ou está aberto a coletar?', dica: 'CFM permite depoimentos de pacientes com consentimento. Fundamental para conversão.' },
        ],
      },
      {
        bloco: 'Objetivos e Captação', icone: '🎯',
        instrucao: 'Alinhe metas de novos pacientes e entenda o funil de captação atual.',
        perguntas: [
          { p: 'Como os pacientes chegam hoje? (indicação, Google, plano, Instagram)', dica: 'O canal que já funciona deve ser amplificado primeiro.' },
          { p: 'Quantas consultas novas realiza por mês hoje? Qual é a meta?', dica: 'Baseline para medir o ROI das ações de marketing.' },
          { p: 'Tem agenda online ou secretária? Como funciona o agendamento?', dica: 'O CTA de todos os anúncios precisa ser o caminho mais curto até o agendamento.' },
          { p: 'Existe alguma restrição do CFM que devemos conhecer para a comunicação?', dica: 'CFM proíbe: antes/depois, garantias de resultado, preços em anúncios, alguns procedimentos. Precisamos saber para não errar.' },
          { p: 'Qual é a principal concorrência? Outro médico da mesma especialidade ou clínica?', dica: 'Entender o concorrente local ajuda a definir o diferencial a comunicar.' },
        ],
      },
    ],
    publicos: `PÚBLICO 1 — Paciente por Indicação (todas as idades)
Chegou por recomendação de amigo ou familiar. Já tem confiança inicial.
Dores: Sintoma específico que precisa de diagnóstico ou tratamento.
Motivadores: Confirmar que escolheu bem, ver autoridade e cuidado.
Comportamento: Pesquisa o médico no Instagram antes de confirmar a consulta.

PÚBLICO 2 — Paciente que Pesquisa (30-55 anos)
Tem um sintoma, pesquisa no Google e compara médicos.
Dores: Medo do diagnóstico, dúvida sobre qual especialidade procurar.
Motivadores: Encontrar um médico confiável, acessível e bem avaliado.
Comportamento: Google Maps, Google Search, lê avaliações.

PÚBLICO 3 — Paciente Preventivo (25-45 anos)
Saudável mas quer se cuidar. Busca check-up, prevenção.
Dores: Medo de descobrir algo grave, não saber a frequência ideal de consultas.
Motivadores: Segurança, saúde em dia, qualidade de vida.`,
    funil: {
      etapa1: `CONSCIÊNCIA DO SINTOMA: Sente algo mas não sabe se é grave.
Conteúdo educativo: "5 sinais que você não deve ignorar", "Quando procurar um [especialidade]", posts sobre sintomas comuns da especialidade.`,
      etapa2: `BUSCA POR MÉDICO: Decidiu consultar, está escolhendo quem.
Conteúdo de autoridade: Apresentação do médico, formação, casos tratados (sem identificação), tecnologia usada.`,
      etapa3: `AVALIAÇÃO E COMPARAÇÃO: Lê avaliações, visita Instagram, pesquisa preço.
Conteúdo de prova social: Depoimentos, avaliações Google, como funciona a consulta, o que esperar.`,
      etapa4: `AGENDAMENTO: Pronto para marcar.
CTA direto: Link de agendamento online, WhatsApp da secretaria, resposta rápida.`,
    },
    trafego: `ESTRATÉGIA PARA MÉDICO:
Combinar Meta Ads (alcance e reconhecimento) + Google Ads (intenção de busca).

Google Ads: Palavras-chave de intenção — "[especialidade] [cidade]", "médico [especialidade] particular".
Meta Ads: Conteúdo educativo + prova social + CTA para agendamento.

Segmentação: Cidade + raio de atuação. Faixa etária compatível com a especialidade.
Objetivo principal: Geração de leads para agendamento (WhatsApp ou formulário).

Atenção CFM: Sem promessas de resultado, sem preço nos anúncios, sem termos que caracterizem concorrência desleal.`,
  },

  // ─────────────────────────────────────────────────────────────────
  restaurante: {
    label: '🍽️ Restaurante / Gastronomia',
    cor: '#F97316',
    descricao: 'Restaurante, lanchonete, delivery, bar, cafeteria',
    servicosRecomendados: ['Gestão de Redes Sociais', 'Tráfego Pago (Meta Ads)', 'Criação de Conteúdo / Copy'],
    estruturaNegocio: {
      altoTicket: 'Experiência completa no salão, eventos e confraternizações',
      recorrencia: 'Almoço executivo, cardápio do dia, frequentadores habituais',
      upsell: 'Delivery, combos especiais, sobremesas, bebidas premium',
    },
    briefing: [
      {
        bloco: 'O Restaurante e o Cardápio', icone: '🍕',
        instrucao: 'Entenda a identidade do restaurante — o que ele serve, para quem e qual é a experiência que entrega.',
        perguntas: [
          { p: 'Qual é o tipo de culinária e o prato mais pedido?', dica: 'O prato carro-chefe é o conteúdo mais clicado. Foto profissional dele é prioridade.' },
          { p: 'O restaurante tem delivery, funciona só no salão ou os dois?', dica: 'Define os CTAs — "peça agora" vs "reserve sua mesa".' },
          { p: 'Qual é o ticket médio por pessoa? Tem diferentes faixas (almoço, jantar, delivery)?', dica: 'Crucial para posicionamento e público dos anúncios.' },
          { p: 'Tem alguma especialidade ou prato que nenhuma outra casa da cidade tem?', dica: 'Exclusividade é o maior gatilho de conteúdo para gastronomia.' },
          { p: 'O ambiente tem algum diferencial? Decoração, vista, espaço kids, área gourmet?', dica: 'Foto do ambiente vende mais do que muitos imaginam — especialmente para eventos.' },
          { p: 'Tem promoções fixas? (ex: happy hour, combo executivo, dia da pizza)?', dica: 'Promoções recorrentes criam hábito de consumo e dão pauta constante para conteúdo.' },
        ],
      },
      {
        bloco: 'Clientes e Comportamento', icone: '👨‍👩‍👧',
        instrucao: 'Entenda quem são os clientes e em que momento da vida eles escolhem esse restaurante.',
        perguntas: [
          { p: 'Quem é o cliente mais frequente? (família, casal, empresário, turista, trabalhador do almoço)', dica: 'Cada perfil tem um conteúdo diferente e um horário diferente para ser impactado.' },
          { p: 'Como os clientes chegam hoje? (indicação, Google Maps, Instagram, delivery app)', dica: 'O canal que já funciona deve ser o primeiro a ser amplificado.' },
          { p: 'Qual é o principal motivo que leva alguém a escolher esse restaurante?', dica: '"A comida é boa", "o atendimento é diferente", "o ambiente é aconchegante" — o que os clientes dizem?' },
          { p: 'O restaurante tem espaço para eventos, aniversários ou confraternizações?', dica: 'Eventos são alto ticket e geram conteúdo poderoso — vale campanha específica.' },
          { p: 'Tem programa de fidelidade ou cliente recorrente reconhecido?', dica: 'Clientes que voltam sempr são os melhores divulgadores — como estão sendo tratados?' },
        ],
      },
      {
        bloco: 'Objetivos', icone: '🎯',
        instrucao: 'Alinhe o que o restaurante quer crescer — movimento no salão, delivery ou eventos.',
        perguntas: [
          { p: 'Qual é o maior desafio hoje: encher o salão, aumentar o delivery ou atrair eventos?', dica: 'Define o foco da estratégia de conteúdo e ads.' },
          { p: 'Quais dias/horários têm maior ociosidade? Quais são os mais cheios?', dica: 'Campanhas de urgência nos horários ociosos têm custo muito menor.' },
          { p: 'Tem cardápio no iFood, Rappi ou delivery próprio?', dica: 'Se tem app de delivery, anúncio com CTA direto para o app converte muito bem.' },
          { p: 'Tem fotos profissionais dos pratos? Tem um fotógrafo de confiança?', dica: 'Fotografia gastronômica é o ativo mais importante do marketing de restaurante. Se não tem, é prioridade.' },
          { p: 'Qual é a meta de faturamento para os próximos 3 meses?', dica: 'Define o orçamento de ads necessário.' },
        ],
      },
    ],
    publicos: `PÚBLICO 1 — A Família do Fim de Semana (30-50 anos)
Busca programa com filhos, ambiente agradável e comida boa.
Dores: Não saber onde ir, medo de espera longa, preço surpresa.
Motivadores: Ambiente familiar, espaço kids, pratos para todos.
Quando e onde alcançar: Sexta-feira à tarde, Instagram e Facebook.

PÚBLICO 2 — O Trabalhador do Almoço (25-45 anos)
Trabalha próximo, busca almoço rápido e saboroso no dia a dia.
Dores: Fila, demora, opções repetitivas.
Motivadores: Cardápio variado, rapidez, preço justo.
Quando e onde alcançar: Manhã (10-11h), Google Maps, Instagram local.

PÚBLICO 3 — O Casal ou Grupo Social (20-40 anos)
Busca experiência, ambiente para fotos, jantar especial ou happy hour.
Dores: Não saber onde o encontro vai ser, medo de decepção.
Motivadores: Ambiente instagramável, carta de drinks, diferencial culinário.
Quando e onde alcançar: Quinta-feira/sexta, Instagram Stories, influencer local.`,
    funil: {
      etapa1: `DESCOBERTA: Nunca foi, não conhece.
Conteúdo visual: Fotos apetitosas dos pratos, vídeo do ambiente, "o prato mais pedido da semana".`,
      etapa2: `INTERESSE: Viu no Instagram, salvou o post, ficou curioso.
Conteúdo de detalhe: Cardápio, horários, localização, "como chegar", depoimentos de clientes.`,
      etapa3: `CONSIDERAÇÃO: Está planejando ir ou pedir.
Conteúdo de urgência: "Reservas para o fim de semana", promoção do dia, destaque especial do cardápio.`,
      etapa4: `AÇÃO: Pedido ou reserva.
CTA: Link do iFood, WhatsApp para reserva, "chame para o jantar de hoje".`,
    },
    trafego: `ESTRATÉGIA PARA RESTAURANTE:
Foco em Meta Ads com segmentação geográfica próxima ao estabelecimento (raio 5-15km).

Campanhas principais:
1. Reconhecimento: Vídeo do ambiente + pratos (objetivo: alcance local)
2. Delivery: Carrossel de pratos com CTA para iFood/WhatsApp (objetivo: conversão)
3. Eventos: "Reserve para seu aniversário/confraternização" (objetivo: mensagens)
4. Promoção semanal: Post boost com oferta do dia/semana (objetivo: tráfego)

Melhor horário para impulsionar: Quinta e sexta 11h-13h e 17h-19h.
Conteúdo que mais converte: Vídeo do prato sendo preparado ou servido.`,
  },

  // ─────────────────────────────────────────────────────────────────
  varejo: {
    label: '🛍️ Varejo / Loja',
    cor: '#22C55E',
    descricao: 'Loja física, e-commerce, moda, calçados, eletrônicos, utilidades',
    servicosRecomendados: ['Gestão de Redes Sociais', 'Tráfego Pago (Meta Ads)', 'Tráfego Pago (Google Ads)', 'Criação de Conteúdo / Copy', 'Funis e Landing Pages'],
    estruturaNegocio: {
      altoTicket: 'Produtos premium, kits, lançamentos exclusivos',
      recorrencia: 'Clientes fiéis, programa de pontos, reposição periódica',
      upsell: 'Produtos complementares, garantia estendida, frete expresso',
    },
    briefing: [
      {
        bloco: 'A Loja e os Produtos', icone: '🏪',
        instrucao: 'Entenda o mix de produtos, o posicionamento de preço e o que diferencia essa loja da concorrência.',
        perguntas: [
          { p: 'Quais são os produtos mais vendidos e com maior margem?', dica: 'O produto carro-chefe guia toda a estratégia de conteúdo e ads.' },
          { p: 'A loja atende presencialmente, online ou os dois?', dica: 'Define os CTAs e a jornada de compra nos anúncios.' },
          { p: 'Qual é o ticket médio de uma compra?', dica: 'Fundamental para calcular o ROI mínimo por lead ou clique.' },
          { p: 'Tem exclusividade de alguma marca ou produto na região?', dica: 'Exclusividade é o maior diferencial competitivo no varejo local.' },
          { p: 'Como é o processo de compra? (loja física, site, WhatsApp, Instagram)', dica: 'O caminho mais curto até a compra é o CTA dos anúncios.' },
          { p: 'Tem estoque próprio ou trabalha com dropshipping/pronta-entrega?', dica: 'Disponibilidade imediata é um gatilho poderoso — "disponível agora" converte muito.' },
        ],
      },
      {
        bloco: 'Clientes e Comportamento de Compra', icone: '🛒',
        instrucao: 'Entenda quem compra, como compra e o que impede de comprar mais.',
        perguntas: [
          { p: 'Qual é o perfil do cliente que mais compra? Existe um cliente recorrente?', dica: 'Cliente recorrente é ouro — entender o que o fideliza ajuda a replicar isso.' },
          { p: 'O que normalmente faz um cliente sair da loja sem comprar?', dica: 'Objeção de preço, falta de opção, atendimento, frete — cada uma vira uma solução de conteúdo.' },
          { p: 'Em que época do ano as vendas aumentam mais? Tem sazonalidade?', dica: 'Calendário sazonal define o planejamento de conteúdo e campanhas pagas.' },
          { p: 'Tem algum concorrente direto que incomoda? O que eles fazem melhor?', dica: 'Honestidade aqui ajuda a definir o diferencial a comunicar.' },
          { p: 'Os clientes costumam indicar a loja? Existe alguma ação de indicação hoje?', dica: 'Programa de indicação pode ser criado do zero — alto potencial para varejo local.' },
        ],
      },
      {
        bloco: 'Objetivos e Canais', icone: '🎯',
        instrucao: 'Alinhe onde quer crescer — mais clientes na loja, mais vendas online ou os dois.',
        perguntas: [
          { p: 'Qual é o objetivo principal: aumentar fluxo na loja, vender online ou os dois?', dica: 'Define toda a estratégia de ads e o tipo de CTA.' },
          { p: 'Tem site ou loja virtual? Integrado com algum marketplace (Mercado Livre, Shopee)?', dica: 'Loja virtual com pixel do Meta instalado multiplica o resultado dos anúncios.' },
          { p: 'Qual é a meta de faturamento para os próximos 3 meses?', dica: 'Define o orçamento de investimento em ads necessário.' },
          { p: 'Tem WhatsApp Business com catálogo de produtos configurado?', dica: 'WhatsApp com catálogo é um mini e-commerce gratuito — se não tem, criar é prioridade.' },
          { p: 'Tem fotos profissionais dos produtos? Tem identidade visual consistente?', dica: 'Qualidade visual dos produtos é o maior fator de conversão no varejo online.' },
        ],
      },
    ],
    publicos: `PÚBLICO 1 — O Comprador Local Fiel (30-55 anos)
Prefere comprar na cidade, valoriza atendimento pessoal e conhece a loja.
Dores: Não saber das novidades, perder promoções, ter que ir até o centro.
Motivadores: Atendimento de confiança, produto disponível na hora, preço justo.
Como alcançar: Instagram local, Facebook, WhatsApp com novidades.

PÚBLICO 2 — O Caçador de Oferta (20-40 anos)
Pesquisa muito antes de comprar, compara preços online e offline.
Dores: Preço alto, frete caro, demora na entrega, produto fora de estoque.
Motivadores: Melhor custo-benefício, promoção exclusiva, frete grátis.
Como alcançar: Google Shopping, Meta Ads com oferta em destaque.

PÚBLICO 3 — O Comprador por Impulso (18-35 anos)
Compra pelo Instagram, salva posts, age no impulso quando vê algo que quer.
Dores: Produto esgotado quando decide comprar, processo de compra complicado.
Motivadores: Facilidade (1 clique), exclusividade, escassez ("últimas unidades").
Como alcançar: Instagram/TikTok Ads, Stories com CTA direto.`,
    funil: {
      etapa1: `DESCOBERTA: Não conhece a loja ou não sabe o que ela tem.
Conteúdo: Apresentação dos produtos mais visuais, bastidores da loja, "novidades da semana".`,
      etapa2: `INTERESSE: Viu o produto, curtiu, quer saber mais.
Conteúdo: Detalhes do produto, como usar, depoimentos de quem comprou, comparativo.`,
      etapa3: `CONSIDERAÇÃO: Está decidindo entre comprar aqui ou em outro lugar.
Conteúdo: Prova social, prazo de entrega, facilidade de pagamento, política de troca.`,
      etapa4: `COMPRA: Pronto para comprar, precisa do caminho mais curto.
CTA: "Compre agora", link direto para o produto, WhatsApp para tirar dúvidas, "últimas unidades".`,
    },
    trafego: `ESTRATÉGIA PARA VAREJO:
Combinar Meta Ads (descoberta + impulso) + Google Ads (intenção de compra).

Meta Ads:
- Carrossel de produtos: mostrar variedade e preço
- Vídeo de produto em uso: demonstração gera desejo
- Oferta com urgência: "só hoje", "últimas unidades", "frete grátis até X"
- Remarketing: quem visitou o site mas não comprou

Google Ads:
- Campanhas de pesquisa: "[produto] [cidade]", "[marca] preço"
- Google Shopping: catálogo de produtos com foto e preço

Sazonalidade: programar campanhas para datas comemorativas com 2 semanas de antecedência.`,
  },
}

export const NICHOS_LISTA = Object.entries(NICHOS_CONFIG).map(([id, cfg]) => ({
  id,
  label: cfg.label,
  cor: cfg.cor,
  descricao: cfg.descricao,
}))
