import { useState } from 'react'
import { NICHOS_CONFIG, NICHOS_LISTA } from './nichos.js'
import { saveClientToClickUp } from './clickup.js'

const SERVICOS_LISTA = [
  'Gestão de Redes Sociais', 'Tráfego Pago (Meta Ads)', 'Tráfego Pago (Google Ads)',
  'Criação de Conteúdo / Copy', 'Identidade Visual', 'Funis e Landing Pages',
  'SEO', 'E-mail Marketing',
]

// ── Seções que aparecem sempre
const SECOES_BASE = [
  { id:'s_nicho',    label:'Tipo de Cliente', titulo:'Selecionar Nicho',               icone:'🎯', grupo:'INÍCIO' },
  { id:'s_cliente',  label:'Dados',           titulo:'Dados do Cliente',                icone:'📋', grupo:'INÍCIO' },
  { id:'s_squad',    label:'Dia 1–2',         titulo:'Contrato + Squad + Canais',        icone:'✍️', grupo:'ONBOARDING' },
  { id:'s_apres',    label:'Dia 3',           titulo:'Apresentação do Squad ao Cliente', icone:'🤝', grupo:'ONBOARDING' },
  { id:'s_setup',    label:'Dias 4–7',        titulo:'Setup — Acessos e Materiais',      icone:'⚙️', grupo:'SETUP' },
  { id:'s_briefing', label:'Dia 8',           titulo:'Reunião de Briefing',              icone:'🎯', grupo:'BRIEFING' },
  { id:'s_publicos', label:'Dias 9–13',       titulo:'Públicos e Cohorts',               icone:'👥', grupo:'PLANEJAMENTO' },
  { id:'s_funil',    label:'Dias 12–15',      titulo:'Etapas do Funil',                  icone:'🔽', grupo:'PLANEJAMENTO' },
  { id:'s_negocio',  label:'Dias 16–17',      titulo:'Estrutura do Negócio',             icone:'📦', grupo:'PLANEJAMENTO' },
  { id:'s_trafego',  label:'Dias 16–19',      titulo:'Estratégia de Tráfego',            icone:'💰', grupo:'PLANEJAMENTO' },
  { id:'s_criacao',  label:'Dias 16–19',      titulo:'Criação + Identidade Visual',      icone:'🎨', grupo:'PLANEJAMENTO' },
  { id:'s_aprov',    label:'Dia 22',          titulo:'Apresentação ao Cliente',           icone:'📋', grupo:'APROVAÇÃO' },
  { id:'s_exec',     label:'Dias 23–30',      titulo:'Execução + Aprovação + Kick-off',  icone:'🚀', grupo:'EXECUÇÃO' },
  { id:'s_salvar',   label:'Salvar',          titulo:'Salvar no ClickUp',                icone:'💾', grupo:'SALVAR' },
]

const GRUPO_COR = {
  'INÍCIO':      '#6366F1',
  ONBOARDING:   '#F97316',
  SETUP:        '#0EA5E9',
  BRIEFING:     '#8B5CF6',
  PLANEJAMENTO: '#22C55E',
  APROVAÇÃO:    '#F43F5E',
  EXECUÇÃO:     '#64748B',
  SALVAR:       '#10B981',
}

const INIT = {
  nicho: '',
  nomeCliente:'', segmento:'', responsavelCS:'', dataEntrada:'', origemLead:'',
  valorContrato:'', cicloCobranca:'', prazoAssinatura:'',
  servicosSelecionados:[], contratoAssinado:false,
  gestorConta:'', socialResp:'', designerResp:'', trafegoPagoResp:'',
  grupoWpp:false, driveCompartilhado:false, emailBoasVindas:false,
  dataApresentacao:'', squad15min:false, notasD3:'',
  accessoBM:false, accessoFB:false, loginIG:false, accessoSite:false,
  accessoGA:false, accessoMetaAds:false, accessoGoogleAds:false,
  fotosRecebidas:false, logosRecebidos:false, dashboardCriado:false, outrosAcessos:'',
  respostasBriefing:{}, notasLivres:'',
  publicosPreenchiados:'', cohorts:'', personaDetalhada:'', doresConsumidor:'', sonhosConsumidor:'',
  funilEtapa1:'', funilEtapa2:'', funilEtapa3:'', funilEtapa4:'', conteudoPorEtapa:'',
  missao:'', visao:'', valores:'', tomDeVoz:'', posicionamento:'',
  estruturaAltoTicket:'', estruturaRecorrencia:'', estruturaBemEstar:'',
  protocolos:'', planoAssinatura:'', insightsMarketing:'',
  verbaMensal:'', localizacaoAds:'', objetivoAds:'',
  estrategiaTrafego:'', distribuicaoTrafego:'', ganchoAnuncio:'',
  direcaoCriativa:'', identidadeVisual:'', pilaresMidia:'', planoDeMidia:'', planoPronto:false,
  apresentacaoFeita:false, planoAprovado:false, feedbackCliente:'',
  linhaEditorialIniciada:false, conteudoAdsRascunho:false,
  aprovacaoEnviada:false, feedbackAprovacao:'', correcoesPendentes:'',
  postagemAtiva:false, campanhaAtiva:false, dashboardAtivo:false,
  reuniao30Agendada:false, notasFinais:'',
}

// ── UI components
const F = ({ label, val, onChange, ph, hint, rows=3 }) => (
  <div style={{marginBottom:14}}>
    {label && <label style={{display:'block',fontSize:11,fontWeight:700,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</label>}
    {hint && <p style={{fontSize:11,color:'#94A3B8',marginBottom:5,lineHeight:1.5}}>{hint}</p>}
    <textarea value={val} onChange={e=>onChange(e.target.value)} placeholder={ph||''} rows={rows}
      style={{width:'100%',padding:'9px 11px',border:'1.5px solid #E2E8F0',borderRadius:7,fontSize:13,fontFamily:'inherit',boxSizing:'border-box',lineHeight:1.6,outline:'none',background:'#fff',color:'#0F172A'}}/>
  </div>
)
const I = ({ label, val, onChange, ph, hint }) => (
  <div style={{marginBottom:14}}>
    {label && <label style={{display:'block',fontSize:11,fontWeight:700,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</label>}
    {hint && <p style={{fontSize:11,color:'#94A3B8',marginBottom:5}}>{hint}</p>}
    <input value={val} onChange={e=>onChange(e.target.value)} placeholder={ph||''}
      style={{width:'100%',padding:'9px 11px',border:'1.5px solid #E2E8F0',borderRadius:7,fontSize:13,fontFamily:'inherit',boxSizing:'border-box',outline:'none',background:'#fff',color:'#0F172A'}}/>
  </div>
)
const Sel = ({ label, val, onChange, opts }) => (
  <div style={{marginBottom:14}}>
    {label && <label style={{display:'block',fontSize:11,fontWeight:700,color:'#64748B',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>{label}</label>}
    <select value={val} onChange={e=>onChange(e.target.value)}
      style={{width:'100%',padding:'9px 11px',border:'1.5px solid #E2E8F0',borderRadius:7,fontSize:13,fontFamily:'inherit',background:'#fff',outline:'none',color:'#0F172A'}}>
      <option value=''>Selecionar...</option>
      {opts.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  </div>
)
const Chk = ({ label, checked, onChange, desc }) => (
  <label style={{display:'flex',alignItems:'flex-start',gap:11,cursor:'pointer',padding:'10px 0',borderBottom:'1px solid #F1F5F9'}}>
    <div onClick={onChange} style={{width:20,height:20,borderRadius:5,flexShrink:0,marginTop:1,transition:'all 0.15s',
      border:checked?'2px solid #6366F1':'2px solid #CBD5E1',background:checked?'#6366F1':'#fff',
      display:'flex',alignItems:'center',justifyContent:'center'}}>
      {checked&&<span style={{color:'#fff',fontSize:11,fontWeight:900}}>✓</span>}
    </div>
    <div>
      <div style={{fontSize:13,color:checked?'#0F172A':'#64748B',fontWeight:checked?600:400}}>{label}</div>
      {desc&&<div style={{fontSize:11,color:'#94A3B8',marginTop:2,lineHeight:1.5}}>{desc}</div>}
    </div>
  </label>
)
const Card = ({ titulo, children, accent='#6366F1' }) => (
  <div style={{background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:10,padding:18,marginBottom:16,borderLeft:`4px solid ${accent}`}}>
    {titulo&&<div style={{fontSize:11,fontWeight:800,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:14}}>{titulo}</div>}
    {children}
  </div>
)
const Aviso = ({ texto, tipo='info' }) => {
  const m={info:['#EFF6FF','#BFDBFE','#1D4ED8','ℹ️'],warn:['#FFFBEB','#FDE68A','#92400E','⚠️'],ok:['#F0FDF4','#BBF7D0','#166534','✅'],err:['#FFF1F2','#FECDD3','#9F1239','🚨']}
  const [bg,border,txt,icon]=m[tipo]||m.info
  return <div style={{background:bg,border:`1px solid ${border}`,borderRadius:8,padding:'11px 14px',marginBottom:14,fontSize:12,color:txt,lineHeight:1.6}}>{icon} {texto}</div>
}

// ── Briefing dinâmico por nicho
function BriefingNicho({ nicho, dados, setResp, setField }) {
  const [aberto, setAberto] = useState(0)
  const cfg = NICHOS_CONFIG[nicho]
  const blocos = cfg?.briefing || []
  const totalP = blocos.reduce((s,b)=>s+b.perguntas.length,0)
  const respondidas = Object.values(dados.respostasBriefing).filter(v=>v?.trim()).length

  if (!cfg) return <Aviso tipo='warn' texto='Selecione o tipo de cliente na primeira etapa para carregar o roteiro de briefing correto.' />

  return (
    <div>
      <Aviso tipo='warn' texto={`Roteiro de briefing para ${cfg.label}. Apenas o gestor de conta participa. Registre as respostas em tempo real.`} />
      <div style={{background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:10,padding:'14px 18px',marginBottom:16,display:'flex',alignItems:'center',gap:16}}>
        <div style={{flex:1}}>
          <div style={{fontSize:11,color:'#64748B',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:5}}>Perguntas respondidas</div>
          <div style={{background:'#F1F5F9',borderRadius:4,height:6}}>
            <div style={{background:cfg.cor,height:'100%',borderRadius:4,width:`${totalP>0?(respondidas/totalP)*100:0}%`,transition:'width 0.3s'}}/>
          </div>
        </div>
        <div style={{fontSize:22,fontWeight:800,color:cfg.cor}}>{respondidas}<span style={{fontSize:13,color:'#94A3B8',fontWeight:400}}>/{totalP}</span></div>
      </div>

      <Card titulo='Notas Livres — use durante toda a reunião' accent={cfg.cor}>
        <F val={dados.notasLivres} onChange={v=>setField('notasLivres')(v)} rows={3}
          ph='Impressões, falas espontâneas, contexto, informações que não cabem nas perguntas...'/>
      </Card>

      {blocos.map((bloco,bi)=>{
        const open=aberto===bi
        const resp=bloco.perguntas.filter((_,pi)=>dados.respostasBriefing[`b${bi}_${pi}`]?.trim()).length
        const total=bloco.perguntas.length
        const ok=total>0&&resp===total
        return (
          <div key={bi} style={{marginBottom:10,border:`1.5px solid ${open?cfg.cor:'#E2E8F0'}`,borderRadius:10,overflow:'hidden'}}>
            <button onClick={()=>setAberto(open?-1:bi)} style={{width:'100%',padding:'13px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',background:open?cfg.cor:'#F8FAFC',border:'none',cursor:'pointer',textAlign:'left'}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:18}}>{bloco.icone}</span>
                <span style={{fontSize:13,fontWeight:700,color:open?'#fff':'#1E293B'}}>{bloco.bloco}</span>
                <span style={{fontSize:11,padding:'2px 9px',borderRadius:10,fontWeight:700,background:open?'rgba(255,255,255,0.25)':ok?'#D1FAE5':'#EDE9FE',color:open?'#fff':ok?'#065F46':'#6D28D9'}}>{resp}/{total}</span>
              </div>
              <span style={{color:open?'rgba(255,255,255,0.7)':'#94A3B8',fontSize:12}}>{open?'▲':'▼'}</span>
            </button>
            {open&&(
              <div style={{padding:18,background:'#fff'}}>
                <div style={{background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:7,padding:'10px 14px',marginBottom:14,fontSize:12,color:'#475569',lineHeight:1.6}}>
                  💬 <strong>Instrução:</strong> {bloco.instrucao}
                </div>
                {bloco.perguntas.map((item,pi)=>{
                  const key=`b${bi}_${pi}`
                  const val=dados.respostasBriefing[key]||''
                  return (
                    <div key={pi} style={{marginBottom:18,paddingBottom:18,borderBottom:'1px solid #F1F5F9'}}>
                      <div style={{display:'flex',gap:10,marginBottom:8}}>
                        <div style={{width:24,height:24,borderRadius:6,background:val.trim()?cfg.cor:'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:1}}>
                          <span style={{fontSize:11,fontWeight:800,color:val.trim()?'#fff':'#94A3B8'}}>{pi+1}</span>
                        </div>
                        <p style={{fontSize:14,fontWeight:700,color:'#1E293B',margin:0,lineHeight:1.5}}>{item.p}</p>
                      </div>
                      {item.dica&&<div style={{marginLeft:34,marginBottom:8,fontSize:11,color:cfg.cor,background:`${cfg.cor}15`,borderRadius:6,padding:'6px 10px',lineHeight:1.5}}>💡 <strong>Dica:</strong> {item.dica}</div>}
                      <div style={{marginLeft:34}}>
                        <textarea value={val} onChange={e=>setResp(key,e.target.value)} placeholder='Resposta do cliente...' rows={3}
                          style={{width:'100%',padding:'9px 11px',border:`1.5px solid ${val.trim()?cfg.cor:'#E2E8F0'}`,borderRadius:7,fontSize:13,fontFamily:'inherit',boxSizing:'border-box',resize:'vertical',lineHeight:1.6,outline:'none',color:'#0F172A'}}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Seção salvar
function SecaoSalvar({ dados }) {
  const [status, setStatus] = useState(null)
  const [msg, setMsg] = useState('')
  const cfg = NICHOS_CONFIG[dados.nicho] || {}

  const handleSalvar = async () => {
    if (!dados.nomeCliente.trim()) { setStatus('error'); setMsg('Preencha o nome do cliente antes de salvar.'); return }
    setStatus('saving'); setMsg('Criando estrutura no ClickUp...')
    const result = await saveClientToClickUp(dados)
    if (result.success) { setStatus('ok'); setMsg(`✅ "${result.folderName}" criado com sucesso no ClickUp!`) }
    else { setStatus('error'); setMsg(`Erro: ${result.error}`) }
  }

  return (
    <div>
      <Aviso tipo='info' texto='Ao salvar, será criada automaticamente uma pasta com o nome do cliente no ClickUp, com todas as listas e tarefas preenchidas.' />
      <Card titulo='Resumo do Cliente' accent='#10B981'>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          {[['Cliente',dados.nomeCliente||'—'],['Nicho',cfg.label||'—'],['Segmento',dados.segmento||'—'],['CS',dados.gestorConta||dados.responsavelCS||'—'],['Valor Mensal',dados.valorContrato||'—'],['Serviços',(dados.servicosSelecionados||[]).length+' selecionados']]
            .map(([k,v])=>(
              <div key={k} style={{background:'#F8FAFC',borderRadius:6,padding:'8px 12px'}}>
                <div style={{fontSize:10,fontWeight:700,color:'#94A3B8',textTransform:'uppercase'}}>{k}</div>
                <div style={{fontSize:13,color:'#0F172A',fontWeight:600,marginTop:2}}>{v}</div>
              </div>
            ))}
        </div>
      </Card>

      {status==='saving'&&<Aviso tipo='info' texto='⏳ Salvando no ClickUp... aguarde.'/>}
      {status==='ok'&&<Aviso tipo='ok' texto={msg}/>}
      {status==='error'&&<Aviso tipo='err' texto={msg}/>}

      <button onClick={handleSalvar} disabled={status==='saving'}
        style={{width:'100%',padding:'16px',borderRadius:10,fontSize:15,fontWeight:800,border:'none',cursor:status==='saving'?'not-allowed':'pointer',
          background:status==='saving'?'#94A3B8':status==='ok'?'#10B981':'#6366F1',color:'#fff',letterSpacing:'0.02em',marginBottom:10}}>
        {status==='saving'?'⏳ Salvando...':status==='ok'?'✅ Salvo no ClickUp!':'💾 Salvar no ClickUp'}
      </button>
      {status==='ok'&&<button onClick={()=>{setStatus(null);setMsg('')}}
        style={{width:'100%',padding:'12px',borderRadius:10,fontSize:13,fontWeight:600,border:'1.5px solid #E2E8F0',cursor:'pointer',background:'#fff',color:'#64748B'}}>
        + Novo Cliente
      </button>}
    </div>
  )
}

// ── Conteúdo principal por seção
function Conteudo({ secaoId, dados, set, toggle, toggleServico, setResp }) {
  const nicho = dados.nicho
  const cfg = NICHOS_CONFIG[nicho]
  const accent = cfg?.cor || GRUPO_COR[SECOES_BASE.find(s=>s.id===secaoId)?.grupo] || '#6366F1'

  // ── SELEÇÃO DE NICHO ──────────────────────────────────────────────
  if (secaoId === 's_nicho') return (
    <div>
      <div style={{background:'#fff',border:'1.5px solid #E2E8F0',borderRadius:12,padding:24,marginBottom:16}}>
        <h2 style={{fontSize:20,fontWeight:800,color:'#0F172A',marginBottom:6}}>Qual é o tipo deste cliente?</h2>
        <p style={{fontSize:14,color:'#64748B',marginBottom:24,lineHeight:1.6}}>
          A seleção do nicho adapta automaticamente o briefing, os públicos, o funil e a estratégia de tráfego para esse tipo específico de negócio.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {NICHOS_LISTA.map(n=>{
            const sel = dados.nicho === n.id
            return (
              <button key={n.id} onClick={()=>set('nicho')(n.id)} style={{
                padding:'16px 18px',borderRadius:10,border:`2px solid ${sel?n.cor:'#E2E8F0'}`,
                background:sel?`${n.cor}12`:'#F8FAFC',cursor:'pointer',textAlign:'left',
                transition:'all 0.15s',
              }}>
                <div style={{fontSize:18,marginBottom:6}}>{n.label.split(' ')[0]}</div>
                <div style={{fontSize:13,fontWeight:700,color:sel?n.cor:'#1E293B'}}>{n.label.substring(n.label.indexOf(' ')+1)}</div>
                <div style={{fontSize:11,color:'#94A3B8',marginTop:3,lineHeight:1.4}}>{n.descricao}</div>
              </button>
            )
          })}
        </div>
        {dados.nicho && cfg && (
          <div style={{marginTop:20,padding:'14px 16px',background:`${cfg.cor}10`,border:`1.5px solid ${cfg.cor}30`,borderRadius:8}}>
            <div style={{fontSize:12,fontWeight:700,color:cfg.cor,marginBottom:4}}>✅ Nicho selecionado: {cfg.label}</div>
            <div style={{fontSize:12,color:'#64748B'}}>
              Serviços recomendados: {cfg.servicosRecomendados.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  // ── DADOS DO CLIENTE ──────────────────────────────────────────────
  if (secaoId === 's_cliente') return (
    <div>
      {!nicho && <Aviso tipo='warn' texto='Volte à etapa anterior e selecione o tipo de cliente primeiro.' />}
      <Card titulo='Dados do Cliente' accent={accent}>
        <I label='Nome / Razão Social' val={dados.nomeCliente} onChange={set('nomeCliente')} ph='Ex: Associação Jardim São Lourenço' />
        <I label='Segmento / Descrição do negócio' val={dados.segmento} onChange={set('segmento')} ph={cfg ? `Ex: ${cfg.descricao}` : 'Descreva o negócio'} />
        <Sel label='Origem do Lead' val={dados.origemLead} onChange={set('origemLead')} opts={['Indicação','Instagram','Google','LinkedIn','Evento','Prospecção Ativa','Outro']} />
        <I label='Responsável CS / Gestor de Conta' val={dados.responsavelCS} onChange={set('responsavelCS')} ph='Quem conduzirá o onboarding?' />
        <I label='Data de Entrada' val={dados.dataEntrada} onChange={set('dataEntrada')} ph='DD/MM/AAAA' />
      </Card>
      <Card titulo='Serviços Contratados' accent={accent}>
        {cfg && (
          <div style={{marginBottom:10,padding:'8px 12px',background:`${cfg.cor}10`,borderRadius:6,fontSize:12,color:cfg.cor}}>
            💡 Recomendados para {cfg.label}: <strong>{cfg.servicosRecomendados.join(', ')}</strong>
          </div>
        )}
        <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
          {SERVICOS_LISTA.map(s=>{
            const on=dados.servicosSelecionados.includes(s)
            const rec=cfg?.servicosRecomendados.includes(s)
            return <button key={s} onClick={()=>toggleServico(s)} style={{
              padding:'7px 14px',borderRadius:20,fontSize:12,cursor:'pointer',border:'1.5px solid',
              borderColor:on?(cfg?.cor||'#6366F1'):'#CBD5E1',
              background:on?`${cfg?.cor||'#6366F1'}15`:'#fff',
              color:on?(cfg?.cor||'#6366F1'):'#64748B',
              fontWeight:on?700:400,
              outline:rec&&!on?`1.5px dashed ${cfg?.cor||'#6366F1'}`:'none',
            }}>{s}{rec&&!on?' ⭐':''}</button>
          })}
        </div>
      </Card>
      <Card titulo='Contrato' accent={accent}>
        <I label='Valor Mensal' val={dados.valorContrato} onChange={set('valorContrato')} ph='Ex: R$ 3.500,00' />
        <Sel label='Ciclo de Cobrança' val={dados.cicloCobranca} onChange={set('cicloCobranca')} opts={['Mensal','Trimestral','Semestral','Anual']} />
        <I label='Prazo Limite de Assinatura' val={dados.prazoAssinatura} onChange={set('prazoAssinatura')} ph='DD/MM/AAAA' />
        <Chk label='Contrato assinado ✅' checked={dados.contratoAssinado} onChange={toggle('contratoAssinado')} desc='Só avance após confirmação.' />
      </Card>
    </div>
  )

  // ── SQUAD + CANAIS ────────────────────────────────────────────────
  if (secaoId === 's_squad') return (
    <div>
      <Aviso tipo='warn' texto='O time comercial passa o bastão para operações aqui. Faça a reunião interna ANTES de qualquer contato com o cliente.' />
      <Card titulo='Formação do Squad' accent={accent}>
        <I label='Gestor de Conta / CS' val={dados.gestorConta} onChange={set('gestorConta')} ph='Responsável principal pelo cliente' />
        <I label='Social Media / Conteúdo' val={dados.socialResp} onChange={set('socialResp')} ph='Quem cuida das redes?' />
        <I label='Designer / Criação' val={dados.designerResp} onChange={set('designerResp')} ph='Responsável por peças e identidade' />
        <I label='Gestor de Tráfego Pago' val={dados.trafegoPagoResp} onChange={set('trafegoPagoResp')} ph='Responsável por Meta Ads / Google Ads' />
      </Card>
      <Card titulo='Canais de Atendimento' accent={accent}>
        <Chk label='Grupo no WhatsApp criado (squad + cliente)' checked={dados.grupoWpp} onChange={toggle('grupoWpp')} />
        <Chk label='Google Drive compartilhado e organizado' checked={dados.driveCompartilhado} onChange={toggle('driveCompartilhado')} desc='Pastas: Fotos, Vídeos, Logos, Documentos, Aprovações' />
        <Chk label='E-mail de boas-vindas enviado ao cliente' checked={dados.emailBoasVindas} onChange={toggle('emailBoasVindas')} desc='Apresente o squad, explique o processo dos próximos dias.' />
      </Card>
    </div>
  )

  // ── APRESENTAÇÃO ──────────────────────────────────────────────────
  if (secaoId === 's_apres') return (
    <div>
      <Aviso tipo='info' texto='Reunião de 15 minutos — leve e descontraída. O objetivo é o cliente conhecer quem vai atendê-lo.' />
      <Card titulo='Apresentação do Squad (Dia 3)' accent={accent}>
        <I label='Data e Horário Agendados' val={dados.dataApresentacao} onChange={set('dataApresentacao')} ph='DD/MM/AAAA — HH:MM' />
        <Chk label='Reunião de 15 min realizada ✅' checked={dados.squad15min} onChange={toggle('squad15min')} />
        <F label='Observações e primeiras impressões' val={dados.notasD3} onChange={set('notasD3')} rows={3} ph='Expectativas, ansiedades ou comentários relevantes do cliente nessa call.' />
      </Card>
      <Card titulo='Roteiro da Call de 15 Minutos' accent={accent}>
        {['Apresente cada membro do squad e sua função na conta.','Explique como será a comunicação: WhatsApp, Drive, e-mail.','Explique o que acontece nos próximos dias (setup e briefing no Dia 8).','Abra para o cliente: "Tem algo que você quer que a gente saiba antes de começar?"','Encerre com energia positiva e informe a data do próximo contato.']
          .map((txt,i)=>(
            <div key={i} style={{display:'flex',gap:10,padding:'9px 0',borderBottom:'1px solid #F1F5F9'}}>
              <div style={{width:22,height:22,borderRadius:6,background:'#EEF2FF',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{fontSize:11,fontWeight:800,color:'#6366F1'}}>{i+1}</span>
              </div>
              <span style={{fontSize:13,color:'#374151',lineHeight:1.5}}>{txt}</span>
            </div>
          ))}
      </Card>
    </div>
  )

  // ── SETUP ─────────────────────────────────────────────────────────
  if (secaoId === 's_setup') return (
    <div>
      <Aviso tipo='err' texto='Todos os acessos devem estar completos antes do Dia 16.' />
      <Card titulo='Redes Sociais e Ads' accent={accent}>
        <Chk label='Acesso à Página do Facebook' checked={dados.accessoFB} onChange={toggle('accessoFB')} />
        <Chk label='Login e senha do Instagram' checked={dados.loginIG} onChange={toggle('loginIG')} />
        <Chk label='Business Manager (Meta)' checked={dados.accessoBM} onChange={toggle('accessoBM')} />
        <Chk label='Conta de anúncios Meta Ads' checked={dados.accessoMetaAds} onChange={toggle('accessoMetaAds')} />
        <Chk label='Conta de anúncios Google Ads' checked={dados.accessoGoogleAds} onChange={toggle('accessoGoogleAds')} />
      </Card>
      <Card titulo='Ferramentas e Materiais' accent={accent}>
        <Chk label='Site / WordPress / Hospedagem' checked={dados.accessoSite} onChange={toggle('accessoSite')} />
        <Chk label='Google Analytics / Search Console' checked={dados.accessoGA} onChange={toggle('accessoGA')} />
        <Chk label='Fotos e vídeos recebidos no Drive' checked={dados.fotosRecebidas} onChange={toggle('fotosRecebidas')} />
        <Chk label='Logos e arquivos de marca recebidos' checked={dados.logosRecebidos} onChange={toggle('logosRecebidos')} />
        <Chk label='Dashboard criado e configurado' checked={dados.dashboardCriado} onChange={toggle('dashboardCriado')} />
        <F label='Outros acessos específicos' val={dados.outrosAcessos} onChange={set('outrosAcessos')} rows={2} ph='CRM, plataformas específicas do nicho, sistemas próprios...' />
      </Card>
    </div>
  )

  // ── BRIEFING ──────────────────────────────────────────────────────
  if (secaoId === 's_briefing') return (
    <BriefingNicho nicho={nicho} dados={dados} setResp={setResp} setField={set} />
  )

  // ── PÚBLICOS ──────────────────────────────────────────────────────
  if (secaoId === 's_publicos') return (
    <div>
      {cfg && (
        <Card titulo={`Públicos sugeridos para ${cfg.label}`} accent={accent}>
          <div style={{background:'#F8FAFC',borderRadius:8,padding:'12px 14px',marginBottom:14,fontSize:12,color:'#475569',lineHeight:1.8,whiteSpace:'pre-wrap'}}>{cfg.publicos}</div>
          <p style={{fontSize:11,color:'#94A3B8',marginBottom:0}}>Use o texto acima como base e adapte para a realidade do cliente no campo abaixo.</p>
        </Card>
      )}
      <Card titulo='Públicos e Cohorts deste cliente' accent={accent}>
        <F label='Públicos identificados' val={dados.publicosPreenchiados} onChange={set('publicosPreenchiados')} rows={6} ph='Adapte os públicos sugeridos para a realidade deste cliente específico...' />
        <F label='Cohorts (grupos de compra)' val={dados.cohorts} onChange={set('cohorts')} rows={4} ph='Cohort A: ...\nCohort B: ...' />
        <F label='Persona primária detalhada' val={dados.personaDetalhada} onChange={set('personaDetalhada')} rows={5} ph='Nome fictício, idade, profissão, rotina, dores, sonhos, objeções...' />
        <F label='Dores principais' val={dados.doresConsumidor} onChange={set('doresConsumidor')} rows={3} ph='O que tira o sono do cliente ideal?' />
        <F label='Sonhos e transformação desejada' val={dados.sonhosConsumidor} onChange={set('sonhosConsumidor')} rows={3} ph='Como é a vida dele depois de resolver o problema?' />
      </Card>
    </div>
  )

  // ── FUNIL ─────────────────────────────────────────────────────────
  if (secaoId === 's_funil') return (
    <div>
      {cfg && (
        <Card titulo={`Funil sugerido para ${cfg.label}`} accent={accent}>
          {Object.entries(cfg.funil).map(([k,v])=>(
            <div key={k} style={{marginBottom:12,paddingBottom:12,borderBottom:'1px solid #F1F5F9'}}>
              <div style={{fontSize:12,color:'#94A3B8',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>{k.replace('etapa','Etapa ')}</div>
              <div style={{fontSize:12,color:'#475569',lineHeight:1.7,whiteSpace:'pre-wrap'}}>{v}</div>
            </div>
          ))}
        </Card>
      )}
      <Card titulo='Funil deste cliente (adapte)' accent={accent}>
        {[['funilEtapa1','Etapa 1 — Topo (Descoberta / Desconforto)'],['funilEtapa2','Etapa 2 — Consciência do Problema'],['funilEtapa3','Etapa 3 — Consideração e Comparação'],['funilEtapa4','Etapa 4 — Decisão e Compra / Ação']].map(([campo,titulo])=>(
          <div key={campo} style={{marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:700,color:'#1E293B',marginBottom:6}}>{titulo}</div>
            <F val={dados[campo]} onChange={set(campo)} rows={3} ph='Cohorts envolvidos, comportamento, o que vamos criar...'/>
          </div>
        ))}
        <F label='Conteúdo mapeado por etapa' val={dados.conteudoPorEtapa} onChange={set('conteudoPorEtapa')} rows={4} ph='Etapa 1: ...\nEtapa 2: ...\nEtapa 3: ...\nEtapa 4: ...' />
      </Card>
    </div>
  )

  // ── ESTRUTURA DO NEGÓCIO ──────────────────────────────────────────
  if (secaoId === 's_negocio') return (
    <div>
      {cfg && (
        <Card titulo={`Estrutura de negócio típica — ${cfg.label}`} accent={accent}>
          <div style={{display:'grid',gridTemplateColumns:'1fr',gap:8}}>
            {[['🏆 Alto Ticket',cfg.estruturaNegocio.altoTicket],['🔄 Recorrência',cfg.estruturaNegocio.recorrencia],['⬆️ Upsell / Bem-estar',cfg.estruturaNegocio.upsell]].map(([t,v])=>(
              <div key={t} style={{background:'#F8FAFC',borderRadius:6,padding:'8px 12px'}}>
                <div style={{fontSize:11,fontWeight:700,color:accent}}>{t}</div>
                <div style={{fontSize:12,color:'#475569',marginTop:2}}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
      <Card titulo='Identidade e Posicionamento' accent={accent}>
        <F label='Missão' val={dados.missao} onChange={set('missao')} rows={2} ph='Por que essa empresa/organização existe?' />
        <F label='Visão' val={dados.visao} onChange={set('visao')} rows={2} ph='Onde quer chegar em 3 anos?' />
        <F label='Valores' val={dados.valores} onChange={set('valores')} rows={2} ph='O que guia as decisões?' />
        <Sel label='Tom de Voz' val={dados.tomDeVoz} onChange={set('tomDeVoz')} opts={['Formal e Institucional','Profissional mas Acessível','Descontraído e Próximo','Inspirador e Motivacional','Técnico e Especialista','Divertido e Irreverente','Combativo e Mobilizador']} />
        <F label='Posicionamento' val={dados.posicionamento} onChange={set('posicionamento')} rows={2} ph='Como a marca se posiciona no mercado?' />
      </Card>
      <Card titulo='Estrutura do Negócio deste cliente' accent={accent}>
        <F label='Alto ticket / Principal receita' val={dados.estruturaAltoTicket} onChange={set('estruturaAltoTicket')} rows={2} ph='O que gera mais margem?' />
        <F label='Recorrência / Fluxo de caixa' val={dados.estruturaRecorrencia} onChange={set('estruturaRecorrencia')} rows={2} ph='O que faz o cliente voltar todo mês?' />
        <F label='Upsell / Complementar' val={dados.estruturaBemEstar} onChange={set('estruturaBemEstar')} rows={2} ph='O que pode ser oferecido junto?' />
        <F label='Protocolos ou planos comerciais' val={dados.protocolos} onChange={set('protocolos')} rows={3} ph='Ex: Plano mensal, protocolo combo, pacote trimestral...' />
        <F label='Insights estratégicos de marketing' val={dados.insightsMarketing} onChange={set('insightsMarketing')} rows={3} ph='Oportunidades identificadas no briefing, observações sobre o mercado local...' />
      </Card>
    </div>
  )

  // ── TRÁFEGO ───────────────────────────────────────────────────────
  if (secaoId === 's_trafego') return (
    <div>
      {cfg && (
        <Card titulo={`Estratégia de tráfego recomendada — ${cfg.label}`} accent={accent}>
          <div style={{background:'#F8FAFC',borderRadius:8,padding:'12px 14px',fontSize:12,color:'#475569',lineHeight:1.8,whiteSpace:'pre-wrap'}}>{cfg.trafego}</div>
        </Card>
      )}
      <Card titulo='Plano de tráfego deste cliente' accent={accent}>
        <I label='Verba mensal em ads (investimento do cliente)' val={dados.verbaMensal} onChange={set('verbaMensal')} ph='Ex: R$ 1.500,00/mês' />
        <I label='Localização / segmentação geográfica' val={dados.localizacaoAds} onChange={set('localizacaoAds')} ph='Ex: São Paulo, zona sul, raio de 10km' />
        <Sel label='Objetivo principal das campanhas' val={dados.objetivoAds} onChange={set('objetivoAds')} opts={['Geração de Leads (WhatsApp/Formulário)','Vendas Diretas','Agendamentos','Reconhecimento de Marca','Engajamento e Seguidores','Tráfego para Site','Mobilização e Cadastro']} />
        <F label='Estratégia detalhada (fases e distribuição)' val={dados.estrategiaTrafego} onChange={set('estrategiaTrafego')} rows={5} ph='Fase 1 — Lançamento: ...\nFase 2 — Descobertas: ...\nFase 3 — Validação: ...\nFase 4 — Aceleração: ...' />
        <F label='Distribuição de verba por serviço/campanha' val={dados.distribuicaoTrafego} onChange={set('distribuicaoTrafego')} rows={4} ph='Campanha A: R$ X — objetivo Y\nCampanha B: R$ X — objetivo Y' />
        <F label='Ganchos e exemplos de anúncio' val={dados.ganchoAnuncio} onChange={set('ganchoAnuncio')} rows={4} ph='Gancho 1: "..."\nGancho 2: "..."\nEstrutura: Gancho → Roteiro → Copy → CTA' />
      </Card>
    </div>
  )

  // ── CRIAÇÃO ───────────────────────────────────────────────────────
  if (secaoId === 's_criacao') return (
    <div>
      <Aviso tipo='warn' texto='Setup (Dias 4-7) deve estar 100% concluído antes de iniciar a criação.' />
      <Card titulo='Direção Criativa' accent={accent}>
        <F label='Conceito criativo e estética da marca' val={dados.direcaoCriativa} onChange={set('direcaoCriativa')} rows={4} ph='Tom visual, referências estéticas, conceito central da comunicação...' />
        <F label='Identidade Visual — direcionamentos' val={dados.identidadeVisual} onChange={set('identidadeVisual')} rows={4} ph='Paleta de cores, tipografia, estilo de imagens, elementos gráficos...' />
      </Card>
      <Card titulo='Calendário Editorial e Plano de Mídia' accent={accent}>
        <F label='Pilares de conteúdo e distribuição' val={dados.pilaresMidia} onChange={set('pilaresMidia')} rows={4} ph='Pilar 1: ...\nPilar 2: ...\nDistribuição por canal: Feed, Stories, Reels...' />
        <F label='Plano de mídia e estratégia de campanhas' val={dados.planoDeMidia} onChange={set('planoDeMidia')} rows={4} ph='Funil de aquisição, tipos de campanha, objetivos por etapa...' />
        <Chk label='Plano de Mídia de Performance finalizado ✅' checked={dados.planoPronto} onChange={toggle('planoPronto')} desc='Documento pronto para apresentar ao cliente no Dia 22.' />
      </Card>
    </div>
  )

  // ── APROVAÇÃO ─────────────────────────────────────────────────────
  if (secaoId === 's_aprov') return (
    <div>
      <Aviso tipo='info' texto='Apresente ao cliente: plano estratégico, identidade visual e calendário editorial. Obtenha aprovação formal.' />
      <Card titulo='Resultado da Apresentação' accent={accent}>
        <Chk label='Apresentação realizada' checked={dados.apresentacaoFeita} onChange={toggle('apresentacaoFeita')} />
        <Chk label='Plano aprovado pelo cliente ✅' checked={dados.planoAprovado} onChange={toggle('planoAprovado')} />
        <F label='Feedback do cliente — ajustes solicitados' val={dados.feedbackCliente} onChange={set('feedbackCliente')} rows={3} ph='Anote tudo que o cliente pediu para ajustar.' />
      </Card>
    </div>
  )

  // ── EXECUÇÃO ──────────────────────────────────────────────────────
  if (secaoId === 's_exec') return (
    <div>
      <Card titulo='Criação (Dias 23-27)' accent={accent}>
        <Chk label='Linha editorial iniciada (posts em produção)' checked={dados.linhaEditorialIniciada} onChange={toggle('linhaEditorialIniciada')} />
        <Chk label='Criativos e copies de ADS em produção' checked={dados.conteudoAdsRascunho} onChange={toggle('conteudoAdsRascunho')} />
      </Card>
      <Card titulo='Aprovação (Dia 28)' accent={accent}>
        <Aviso tipo='warn' texto='Post aprovado e programado NÃO pode ser alterado. Prazo de correção: 24h.' />
        <Chk label='Primeiras criações enviadas ao cliente' checked={dados.aprovacaoEnviada} onChange={toggle('aprovacaoEnviada')} />
        <F label='Feedback do cliente' val={dados.feedbackAprovacao} onChange={set('feedbackAprovacao')} rows={3} ph='O que aprovou? O que pediu para ajustar?' />
        <F label='Correções pendentes' val={dados.correcoesPendentes} onChange={set('correcoesPendentes')} rows={2} ph='Liste as correções com prazo.' />
      </Card>
      <Card titulo='Kick-off — Dia 30' accent={accent}>
        <Aviso tipo='ok' texto='Marco de 30 dias! O cliente entra em operação plena.' />
        <Chk label='Postagens programadas e ativas' checked={dados.postagemAtiva} onChange={toggle('postagemAtiva')} />
        <Chk label='Campanha(s) de tráfego ativada(s)' checked={dados.campanhaAtiva} onChange={toggle('campanhaAtiva')} />
        <Chk label='Dashboard compartilhado com o cliente' checked={dados.dashboardAtivo} onChange={toggle('dashboardAtivo')} />
        <Chk label='Reunião de 30 dias agendada' checked={dados.reuniao30Agendada} onChange={toggle('reuniao30Agendada')} desc='Apresente os primeiros dados e planeje o segundo mês.' />
        <F label='Notas finais do onboarding' val={dados.notasFinais} onChange={set('notasFinais')} rows={3} ph='Observações para o ciclo de gestão que se inicia.' />
      </Card>
    </div>
  )

  if (secaoId === 's_salvar') return <SecaoSalvar dados={dados} />

  return null
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [secaoId, setSecaoId] = useState('s_nicho')
  const [dados, setDados] = useState(INIT)

  const set = campo => val => setDados(d => ({ ...d, [campo]: val }))
  const toggle = campo => () => setDados(d => ({ ...d, [campo]: !d[campo] }))
  const toggleServico = s => setDados(d => ({
    ...d, servicosSelecionados: d.servicosSelecionados.includes(s)
      ? d.servicosSelecionados.filter(x => x !== s)
      : [...d.servicosSelecionados, s]
  }))
  const setResp = (key, val) => setDados(d => ({ ...d, respostasBriefing: { ...d.respostasBriefing, [key]: val } }))

  const cfg = NICHOS_CONFIG[dados.nicho]
  const idx = SECOES_BASE.findIndex(s => s.id === secaoId)
  const secaoAtual = SECOES_BASE[idx]
  const cor = cfg?.cor || GRUPO_COR[secaoAtual?.grupo] || '#6366F1'
  const grupos = [...new Set(SECOES_BASE.map(s => s.grupo))]

  return (
    <div style={{ display:'flex', minHeight:'100vh', fontFamily:"'Inter',-apple-system,sans-serif", fontSize:14 }}>

      {/* SIDEBAR */}
      <div style={{ width:224, background:'#0F172A', display:'flex', flexDirection:'column', flexShrink:0, overflowY:'auto' }}>
        <div style={{ padding:'20px 16px 16px', borderBottom:'1px solid #1E293B' }}>
          <div style={{ fontSize:9, fontWeight:800, color:'#6366F1', letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:4 }}>Playbook Interno</div>
          <div style={{ fontSize:15, fontWeight:800, color:'#F1F5F9', lineHeight:1.2 }}>Onboarding<br/>de Clientes</div>
          {cfg && (
            <div style={{ marginTop:10, background:'#1E293B', borderRadius:6, padding:'6px 10px', fontSize:11 }}>
              <span style={{ color:cfg.cor, fontWeight:700 }}>{cfg.label}</span>
              {dados.nomeCliente && <div style={{ color:'#94A3B8', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>📁 {dados.nomeCliente}</div>}
            </div>
          )}
        </div>

        <nav style={{ flex:1, padding:'8px 0', overflowY:'auto' }}>
          {grupos.map(grupo => (
            <div key={grupo}>
              <div style={{ padding:'10px 16px 4px', fontSize:9, fontWeight:800, color:GRUPO_COR[grupo]||'#475569', textTransform:'uppercase', letterSpacing:'0.1em' }}>{grupo}</div>
              {SECOES_BASE.filter(s => s.grupo === grupo).map(s => {
                const ativo = s.id === secaoId
                const gc = GRUPO_COR[s.grupo]
                return (
                  <button key={s.id} onClick={() => setSecaoId(s.id)} style={{
                    display:'flex', alignItems:'center', gap:9, width:'100%', padding:'8px 16px',
                    background: ativo ? '#1E293B' : 'transparent', border:'none', cursor:'pointer', textAlign:'left',
                    borderLeft: ativo ? `3px solid ${gc}` : '3px solid transparent',
                  }}>
                    <span style={{ fontSize:13 }}>{s.icone}</span>
                    <div>
                      <div style={{ fontSize:9, color:ativo?gc:'#334155', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
                      <div style={{ fontSize:11, color:ativo?'#CBD5E1':'#475569', lineHeight:1.3 }}>{s.titulo}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
        <div style={{ padding:'10px 16px', borderTop:'1px solid #1E293B', fontSize:9, color:'#1E293B', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>v4.0 — Uso Interno</div>
      </div>

      {/* MAIN */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflowY:'auto', minWidth:0 }}>
        {/* Header */}
        <div style={{ background:'#fff', borderBottom:'1px solid #E2E8F0', padding:'14px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:10, background:`${cor}15`, color:cor, border:`1px solid ${cor}30` }}>{secaoAtual?.grupo}</span>
              {cfg && <span style={{ fontSize:11, padding:'3px 10px', borderRadius:10, background:`${cfg.cor}15`, color:cfg.cor, border:`1px solid ${cfg.cor}30`, fontWeight:700 }}>{cfg.label}</span>}
              <span style={{ fontSize:11, color:'#CBD5E1' }}>{idx+1}/{SECOES_BASE.length}</span>
            </div>
            <div style={{ fontSize:18, fontWeight:800, color:'#0F172A' }}>{secaoAtual?.icone} {secaoAtual?.titulo}</div>
          </div>
          {dados.servicosSelecionados.length > 0 && (
            <div style={{ display:'flex', gap:5, flexWrap:'wrap', maxWidth:280, justifyContent:'flex-end' }}>
              {dados.servicosSelecionados.slice(0,3).map(s => <span key={s} style={{ background:'#EEF2FF', color:'#6366F1', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:10 }}>{s}</span>)}
              {dados.servicosSelecionados.length > 3 && <span style={{ background:'#EEF2FF', color:'#6366F1', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:10 }}>+{dados.servicosSelecionados.length-3}</span>}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:'24px 28px', maxWidth:860 }}>
          <Conteudo secaoId={secaoId} dados={dados} set={set} toggle={toggle} toggleServico={toggleServico} setResp={setResp} />
        </div>

        {/* Footer */}
        <div style={{ background:'#fff', borderTop:'1px solid #E2E8F0', padding:'13px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0 }}>
          <button onClick={() => idx > 0 && setSecaoId(SECOES_BASE[idx-1].id)} disabled={idx===0}
            style={{ padding:'9px 22px', borderRadius:8, fontSize:13, fontWeight:600, border:'1.5px solid #E2E8F0', background:'#fff', color:idx>0?'#374151':'#CBD5E1', cursor:idx>0?'pointer':'not-allowed' }}>← Voltar</button>
          <div style={{ display:'flex', gap:3 }}>
            {SECOES_BASE.map((s,i) => (
              <div key={s.id} onClick={()=>setSecaoId(s.id)} title={s.titulo} style={{ width:i===idx?18:6, height:6, borderRadius:3, cursor:'pointer', transition:'all 0.2s', background:i===idx?GRUPO_COR[s.grupo]:i<idx?'#94A3B8':'#E2E8F0' }} />
            ))}
          </div>
          <button onClick={() => idx < SECOES_BASE.length-1 && setSecaoId(SECOES_BASE[idx+1].id)} disabled={idx===SECOES_BASE.length-1}
            style={{ padding:'9px 22px', borderRadius:8, fontSize:13, fontWeight:700, border:'none', background:idx<SECOES_BASE.length-1?cor:'#E2E8F0', color:idx<SECOES_BASE.length-1?'#fff':'#94A3B8', cursor:idx<SECOES_BASE.length-1?'pointer':'not-allowed' }}>
            {idx===SECOES_BASE.length-1?'✅ Concluído':'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  )
}
