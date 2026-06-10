// ClickUp API Integration
const API_TOKEN = 'pk_44255818_RA5D5VCQ1VN50DMH6QDYVJBGYRQ06PKX'
const BASE_URL = 'https://api.clickup.com/api/v2'

const headers = {
  'Authorization': API_TOKEN,
  'Content-Type': 'application/json',
}

export async function getWorkspaces() {
  const r = await fetch(`${BASE_URL}/team`, { headers })
  const d = await r.json()
  return d.teams || []
}

export async function getSpaces(teamId) {
  const r = await fetch(`${BASE_URL}/team/${teamId}/space?archived=false`, { headers })
  const d = await r.json()
  return d.spaces || []
}

export async function createFolder(spaceId, name) {
  const r = await fetch(`${BASE_URL}/space/${spaceId}/folder`, {
    method: 'POST', headers,
    body: JSON.stringify({ name })
  })
  return r.json()
}

export async function createList(folderId, name) {
  const r = await fetch(`${BASE_URL}/folder/${folderId}/list`, {
    method: 'POST', headers,
    body: JSON.stringify({ name })
  })
  return r.json()
}

export async function createTask(listId, name, description, status = 'to do') {
  const r = await fetch(`${BASE_URL}/list/${listId}/task`, {
    method: 'POST', headers,
    body: JSON.stringify({ name, description, status })
  })
  return r.json()
}

export async function saveClientToClickUp(dados) {
  try {
    // 1. Get workspace
    const teams = await getWorkspaces()
    if (!teams.length) throw new Error('Nenhum workspace encontrado')
    const teamId = teams[0].id

    // 2. Get or use first space
    const spaces = await getSpaces(teamId)
    if (!spaces.length) throw new Error('Nenhum space encontrado')
    const spaceId = spaces[0].id

    // 3. Create folder with client name
    const folderName = `📁 ${dados.nomeCliente || 'Novo Cliente'} — ${dados.segmento || ''}`
    const folder = await createFolder(spaceId, folderName)
    if (!folder.id) throw new Error('Erro ao criar pasta do cliente')

    // 4. Create lists per phase
    const listas = [
      { nome: '✍️ Onboarding — Contrato e Squad', fase: 'onboarding' },
      { nome: '⚙️ Setup — Acessos e Materiais', fase: 'setup' },
      { nome: '🎯 Briefing — Reunião com Cliente', fase: 'briefing' },
      { nome: '📋 Planejamento Estratégico', fase: 'planejamento' },
      { nome: '🚀 Execução e Aprovações', fase: 'execucao' },
    ]

    for (const lista of listas) {
      const list = await createList(folder.id, lista.nome)
      if (!list.id) continue

      // 5. Create tasks per phase
      if (lista.fase === 'onboarding') {
        await createTask(list.id, '📋 Dados do Cliente', formatDadosCliente(dados))
        await createTask(list.id, '✍️ Contrato assinado', `Valor: ${dados.valorContrato}\nCiclo: ${dados.cicloCobranca}\nPrazo: ${dados.prazoAssinatura}`)
        await createTask(list.id, '👥 Squad formado', `Gestor: ${dados.gestorConta}\nSocial: ${dados.socialResp}\nDesigner: ${dados.designerResp}\nTráfego: ${dados.trafegoPagoResp}`)
        await createTask(list.id, '📱 Canais de atendimento criados', 'WhatsApp + Drive + E-mail de boas-vindas')
        await createTask(list.id, '🤝 Apresentação do squad ao cliente (15min)', `Data: ${dados.dataApresentacao}\n${dados.notasD3 || ''}`)
      }

      if (lista.fase === 'setup') {
        await createTask(list.id, '🔑 Acessos de redes sociais', formatAcessos(dados))
        await createTask(list.id, '📁 Materiais recebidos no Drive', 'Fotos, vídeos, logos')
        await createTask(list.id, '📊 Dashboard criado', '')
      }

      if (lista.fase === 'briefing') {
        await createTask(list.id, '🎯 Reunião de Briefing realizada', formatBriefing(dados))
        await createTask(list.id, '📝 Notas livres do briefing', dados.notasLivres || '')
      }

      if (lista.fase === 'planejamento') {
        await createTask(list.id, '🏢 Identidade da Empresa', formatIdentidade(dados))
        await createTask(list.id, '📦 Serviços e Posicionamento', formatServicos(dados))
        await createTask(list.id, '👥 Públicos e Cohorts', formatPublicos(dados))
        await createTask(list.id, '🔽 Etapas do Funil', formatFunil(dados))
        await createTask(list.id, '💰 Estratégia de Tráfego Pago', formatTrafego(dados))
        await createTask(list.id, '💡 Insights de Posicionamento', formatInsights(dados))
      }

      if (lista.fase === 'execucao') {
        await createTask(list.id, '🎨 Criação Conceitual + Identidade Visual', dados.direcaoCriativa || '')
        await createTask(list.id, '📅 Calendário Editorial', dados.pilaresMidia || '')
        await createTask(list.id, '✅ Aprovação de conteúdo (prazo 24h)', '')
        await createTask(list.id, '📱 Postagem + Campanha ativa', '')
        await createTask(list.id, '📈 Relatório 30 dias', dados.notasFinais || '')
      }
    }

    return { success: true, folderName }
  } catch (err) {
    console.error('ClickUp error:', err)
    return { success: false, error: err.message }
  }
}

function formatDadosCliente(d) {
  return `CLIENTE: ${d.nomeCliente}
SEGMENTO: ${d.segmento}
NICHO: ${d.nicho || ''}
RESPONSÁVEL CS: ${d.responsavelCS}
DATA DE ENTRADA: ${d.dataEntrada}
ORIGEM DO LEAD: ${d.origemLead}
VALOR MENSAL: ${d.valorContrato}
CICLO: ${d.cicloCobranca}
SERVIÇOS: ${(d.servicosSelecionados || []).join(', ')}`
}

function formatAcessos(d) {
  const checks = [
    d.accessoBM && '✅ Business Manager (Meta)',
    d.accessoFB && '✅ Página do Facebook',
    d.loginIG && '✅ Instagram',
    d.accessoSite && '✅ Site/WordPress',
    d.accessoGA && '✅ Google Analytics',
    d.accessoMetaAds && '✅ Meta Ads',
    d.accessoGoogleAds && '✅ Google Ads',
  ].filter(Boolean)
  return checks.join('\n') || 'Pendente'
}

function formatBriefing(d) {
  if (!d.respostasBriefing) return 'Briefing não preenchido'
  const blocos = [
    'Abertura', '1. A Empresa', '2. Produto ou Serviço',
    '3. Público-Alvo', '4. Comunicação e Identidade',
    '5. Presença Digital Atual', '6. Objetivos e Expectativas', 'Encerramento'
  ]
  const perguntas = [
    [], // abertura
    ['História da empresa','Por que a empresa existe','Onde querem estar em 3 anos','Valores inegociáveis','Cultura da empresa'],
    ['Principais produtos/serviços','Carro-chefe e margem','Ticket médio e sazonalidade','Diferenciais','Objeções antes de comprar','Processo de venda','Case de sucesso'],
    ['Cliente ideal','Faixa etária e localização','O que faz antes de encontrar','Dores','Sonhos após contratar','Quem NÃO quer atender'],
    ['Tom de voz','Marcas que admira','Cores e estética','O que nunca pode aparecer','Concorrentes'],
    ['Redes sociais ativas','Quem faz conteúdo','Histórico de tráfego pago','Tem site','Captura leads'],
    ['Objetivo principal 3 meses','1 resultado que valeria o investimento','Volume de leads/vendas','Orçamento em ads','Frequência de relatórios','Ponto de contato'],
    []
  ]
  let texto = ''
  blocos.forEach((bloco, bi) => {
    if (perguntas[bi].length === 0) return
    texto += `\n=== ${bloco} ===\n`
    perguntas[bi].forEach((perg, pi) => {
      const resp = d.respostasBriefing[`${bi}_${pi}`] || '—'
      texto += `• ${perg}:\n${resp}\n`
    })
  })
  return texto || 'Sem respostas registradas'
}

function formatIdentidade(d) {
  return `MISSÃO: ${d.missao || '—'}
VISÃO: ${d.visao || '—'}
VALORES: ${d.valores || '—'}
TOM DE VOZ: ${d.tomDeVoz || '—'}
POSICIONAMENTO: ${d.posicionamento || '—'}`
}

function formatServicos(d) {
  return `SERVIÇO PRINCIPAL/CARRO-CHEFE: ${d.servicoCarro || '—'}
TICKET MÉDIO: ${d.ticketMedio || '—'}
DIFERENCIAIS: ${d.diferenciais || '—'}
ESTRUTURA DO NEGÓCIO:
  Alto Ticket: ${d.estruturaAltoTicket || '—'}
  Recorrência: ${d.estruturaRecorrencia || '—'}
  Bem-estar/Upsell: ${d.estruturaBemEstar || '—'}
PROTOCOLOS: ${d.protocolos || '—'}`
}

function formatPublicos(d) {
  return `PÚBLICO PRIMÁRIO:
${d.publicoPrimario || '—'}

COHORTS IDENTIFICADOS:
${d.cohorts || '—'}

PERSONA DETALHADA:
${d.personaDetalhada || '—'}

PERFIL COMPORTAMENTAL:
${d.perfilComportamental || '—'}

DORES PRINCIPAIS:
${d.doresConsumidor || '—'}

SONHOS/TRANSFORMAÇÃO:
${d.sonhosConsumidor || '—'}`
}

function formatFunil(d) {
  return `ETAPA 1 — DESCONFORTO SILENCIOSO (Pré-consciência):
${d.funilEtapa1 || '—'}

ETAPA 2 — CONSCIÊNCIA DO PROBLEMA:
${d.funilEtapa2 || '—'}

ETAPA 3 — CONSIDERAÇÃO E COMPARAÇÃO:
${d.funilEtapa3 || '—'}

ETAPA 4 — DECISÃO E COMPRA:
${d.funilEtapa4 || '—'}

CONTEÚDO POR ETAPA:
${d.conteudoPorEtapa || '—'}`
}

function formatTrafego(d) {
  return `VERBA MENSAL: ${d.verbaMensal || '—'}
LOCALIZAÇÃO: ${d.localizacaoAds || '—'}

FASE 1 — LANÇAMENTO: ${d.fase1Lancamento || '—'}
FASE 2 — DESCOBERTAS (7-10 dias): ${d.fase2Descobertas || '—'}
FASE 3 — VALIDAÇÃO (5-7 dias): ${d.fase3Validacao || '—'}
FASE 4 — ACELERAÇÃO (7-10 dias): ${d.fase4Aceleracao || '—'}

DISTRIBUIÇÃO POR SERVIÇO:
${d.distribuicaoTrafego || '—'}

ESTRUTURA DO ANÚNCIO:
Gancho: ${d.ganchoAnuncio || '—'}
Objetivo: ${d.objetivoAds || '—'}`
}

function formatInsights(d) {
  return `POSICIONAMENTO: ${d.posicionamento || '—'}
PLANO DE ASSINATURA: ${d.planoAssinatura || '—'}
PROTOCOLOS COMERCIAIS: ${d.protocolos || '—'}
INSIGHTS ADICIONAIS: ${d.insightsMarketing || '—'}`
}
