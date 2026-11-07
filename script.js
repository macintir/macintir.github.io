/**
 * BIOKURI // MICHELI MAC INTIR
 * Portfólio Profissional no Padrão Visual Creme & Verde Pinheiro da BioKuri
 * Sistema Bilíngue (PT/EN), Borboletas da Mata Atlântica & Métricas Interativas
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSystem();
  initButterflyCanvas();
  initMetricsCounter();
  initLightbox();
  initSmoothScroll();
});

/* ==========================================================================
   1. SISTEMA BILÍNGUE COMPLETO (PT / EN)
   Alternância fluida com persistência em LocalStorage
   ========================================================================== */
const translations = {
  pt: {
    // Top Nav
    nav_about: "Sobre Mim",
    nav_road: "Supervisão BR-153/369",
    nav_biokuri: "BioKuri",
    nav_trajectory: "Trajetória",
    nav_science: "Ciência & Artigos",
    nav_competencies: "Competências",
    nav_gallery: "Bastidores",
    nav_contact: "Contato",
    nav_cv: "Baixar CV",

    // Sanctuary Zone
    sanctuary_tag: "Borboletário da Biodiversidade",
    sanctuary_inst_desktop: "<i class=\"fa-solid fa-arrow-pointer\"></i> Passe o mouse para atrair as borboletas &bull; <i class=\"fa-solid fa-hand-pointer\"></i> Clique para dispersar em suave névoa floral",
    sanctuary_inst_mobile: "<i class=\"fa-solid fa-hand-pointer\"></i> Toque para dispersar as borboletas em névoa floral",

    // Hero Section
    hero_status: "Supervisora Ambiental @ Caruso &bull; Sócia Co-fundadora @ BioKuri",
    hero_title: "Micheli <span class=\"highlight-serif\">Mac Intir</span>",
    hero_credentials: "Bióloga <span class=\"bullet\">&bull;</span> Supervisora Ambiental <span class=\"bullet\">&bull;</span> Pesquisadora <span class=\"bullet\">&bull;</span> Data Science (USP)",
    hero_desc: "Da lama e águas costeiras ao comando da supervisão ambiental em obras rodoviárias federais de grande porte (BR-153 e BR-369) e modelagem de dados na USP: unindo a paixão genuína pela vida silvestre com o rigor técnico e o pragmatismo que o setor de infraestrutura exige.",
    pill_crbio: "CRBio 135793/01-D",
    pill_road: "Supervisão BR-153 / BR-369",
    pill_biokuri: "BioKuri Soluções",
    pill_usp: "MBA USP / ESALQ",
    pill_army: "Instrutora 5º BIL",
    pill_cop: "Apresentação COP 30",
    btn_whatsapp: "Conversar no WhatsApp",
    btn_workfronts: "Ver Frentes de Obra",
    btn_full_cv: "Currículo Completo",
    hero_caption_tag: "Registros em Campo",
    hero_caption_text: "Ornitologia costeira com tripé e teleobjetiva em água rasa (Porto de São Sebastião/SP).",
    badge_road_title: "Supervisão Rodoviária",
    badge_road_sub: "BR-153 & BR-369",
    badge_biokuri_title: "BioKuri Ambiental",
    badge_biokuri_sub: "Sócia Co-fundadora",

    // Metrics Strip
    metric_1_label: "Anos dedicados à Biologia, Fauna & Ecologia",
    metric_2_label: "km de rodovias e frentes de infraestrutura monitoradas",
    metric_3_label: "Grandes empreendimentos e obras atendidos",
    metric_4_label: "Artigo internacional aceito para publicação",
    metric_5_label: "Foco em conformidade real e conservação no chão",

    // About Section
    about_tag: "Quem Sou Eu",
    about_title: "Bióloga por vocação, gestora por atitude, cientista por inquietude",
    about_badge_ilhabela: "Expedição Ilhabela",
    about_badge_bocaina: "Inspeção de Campo",
    about_quote: "\"Não acredito em biologia de gabinete. Conservação de verdade se faz entendendo o chão da obra, o comportamento dos animais e o coração das pessoas envolvidas.\"",
    about_lead: "Sou <strong>Micheli Mac Intir</strong>, bióloga licenciada pelo UNIFATEA (com bolsa CAPES), supervisora ambiental e atualmente pós-graduanda em <strong>Data Science & Analytics pela USP/ESALQ</strong>.",
    about_p1: "Minha trajetória une o rigor técnico à capacidade de liderança e diálogo direto. Ao longo dos anos, atuei desde o resgate e reabilitação de fauna silvestre junto à <strong>Polícia Militar Ambiental</strong> no Vale do Paraíba, até o comando de operações de supervisão ambiental em obras rodoviárias de grande porte (BR-153 e BR-369) e frentes industriais de celulose (Arauco), portuárias (São Sebastião) e hidrelétricas (PCH Verde).",
    about_p2: "Com a missão de criar uma consultoria dinâmica, próxima e moderna, fundei a <strong>BioKuri — Pesquisa e Soluções Ambientais</strong> ao lado do biólogo e taxonomista Lucas Aøsf. Na BioKuri, combinamos taxonomia apurada, agilidade operacional e inteligência de dados para desatar nós ambientais com velocidade e conformidade inquestionável.",
    about_card1_title: "Gestão & Liderança Prática",
    about_card1_text: "Tratamento ágil de NCs, interface firme com órgãos e engenharia civil.",
    about_card2_title: "Data Science Aplicada",
    about_card2_text: "Indicadores estruturados em Python, visualização preditiva e métricas ESG.",

    // Road Supervision
    road_tag: "Liderança Operacional",
    road_title: "Supervisão Ambiental de Obras Rodoviárias (BR-153 & BR-369)",
    road_sub: "Atuação direta na Caruso Soluções Ambientais & Tecnológicas nas frentes das rodovias federais BR-153 e BR-369 (Jacarezinho/PR).",
    road_status: "OPERAÇÃO EM ANDAMENTO (2026 — ATUAL)",
    road_company: "Caruso Soluções Ambientais &bull; PR",
    road_c1_title: "Gestão de Frentes & Engenharia",
    road_c1_text: "Coordenação técnica ambiental contínua nas frentes de obra, planejamento integrado com a engenharia de produção, vistorias operacionais diárias e mediação proativa para prevenção de paralisações e passivos socioambientais.",
    road_c2_title: "Não Conformidades (NC)",
    road_c2_text: "Realização de inspeções ambientais sistemáticas para identificar, registrar e tratar inconformidades em sistema informatizado, garantindo plano de ação corretivo imediato até a baixa pelo órgão ambiental.",
    road_c3_title: "Licenças, Outorgas & Terceiros",
    road_c3_text: "Controle estrito de condicionantes (LP, LI, LO), outorgas de captação/lançamento de recursos hídricos e auditoria de terceiros: banheiros químicos, bota-fora autorizado e controle de poeira (umectação com pipa).",
    road_c4_title: "Fauna Silvestre & Germoplasma",
    road_c4_text: "Acompanhamento de supressão vegetal autorizada, coordenação de resgate e afugentamento de animais silvestres e coleta de sementes, epífitas e propágulos de flora nativa para mitigação de impactos.",
    road_footer_note: "Elaboração de pareceres técnicos e relatórios de atendimento em resposta a ofícios e notificações oficiais dos órgãos ambientais licenciadores.",

    // BioKuri Section
    biokuri_tag: "Empresa Fundada & Liderada",
    biokuri_quote: "<em>Kuri</em> — do tupi-guarani para a nobre <strong>Araucária</strong> (pinheiro-do-paraná). Raízes profundas, visão de longo alcance e respeito inegociável à vida silvestre.",
    biokuri_headline: "Soluções Ambientais Inteligentes, Ágeis e Humanas",
    biokuri_desc1: "A <strong>BioKuri</strong> nasceu da sinergia entre o rigor taxonômico de museu e a urgência do mercado corporativo por consultorias que realmente entendam o cronograma rígido da engenharia, traduzindo as exigências de órgãos ambientais (IBAMA, IAT, CETESB, IMASUL) em conformidade técnica e documentada.",
    biokuri_desc2: "Como sócia-fundadora ao lado do biólogo e taxonomista <strong>Lucas Aøsf</strong>, lidero a gestão estratégica de contratos, coordenação de equipes de campo, diagnósticos de fauna e modelagem de indicadores ecológicos orientados a dados.",
    biokuri_s1: "Supervisão Ambiental de Obras",
    biokuri_s2: "Estudos de Fauna (EIA/RIMA, PCA, RCA)",
    biokuri_s3: "Resgate de Fauna & Germoplasma",
    biokuri_s4: "Programas de Educação Ambiental & DDS",
    biokuri_s5: "Ciência de Dados & Relatórios ESG",
    biokuri_btn_contact: "Falar com a BioKuri",
    biokuri_btn_proposal: "Solicitar Proposta Técnica",
    biokuri_partner_title: "Sociedade & Visão Complementar",
    biokuri_partner_sub: "Taxonomia de Ponta &bull; Execução Operacional",
    biokuri_partner_quote: "\"Na BioKuri, o conhecimento taxonômico e ecológico profundo encontra o pulso firme da supervisão de obras. Desatamos gargalos ambientais com embasamento inatacável.\"",
    biokuri_founder_micheli_role: "Sócia-Fundadora &bull; Supervisão & Gestão",
    biokuri_founder_lucas_role: "Sócio-Fundador &bull; Taxonomia & R/Python",

    // Science Section
    science_tag: "Rigor Científico",
    science_title: "Produção Científica & Projetos de Pesquisa",
    science_sub: "Artigos internacionais com dados de Ciência Cidadã, fomento industrial corporativo e presença climática global.",
    paper1_badge_intl: "Periódico Internacional (2026)",
    paper1_badge_status: "Aceito para Publicação",
    paper1_meta: "<strong>Revista:</strong> Reptiles & Amphibians (2026) &bull; <strong>Autores:</strong> Aøsf, L.; <strong>Mac Intir, M. D.</strong>; Azevedo, T. M.; Menezes, L. B.; Moroti, M. T.",
    paper1_abstract: "Estudo inovador demonstrando a expansão da área de ocorrência do sapinho-flamenguinho de altitude (<em>Melanophryniscus moreirae</em>, anuro bioindicador de áreas montanhosas da Mata Atlântica) no Sudeste brasileiro através da integração de dados de ciência cidadã com validação morfológica e bioacústica rigorosa em campo.",
    paper1_species_tag: "<em>Melanophryniscus moreirae</em> (Miranda-Ribeiro, 1920) &bull; Registro Científico Autêntico (Vistas Dorsal e Ventral)",
    paper2_badge_cop: "COP 30 (2025)",
    paper2_badge_status: "Conferência ONU",
    paper2_title: "O Papel do Reflorestamento na Restauração Microclimática e Atração da Avifauna no Parque das Nascentes",
    paper2_meta: "<strong>Evento:</strong> Conferência das Nações Unidas sobre Mudanças Climáticas (COP 30), 2025 &bull; <strong>Autores:</strong> Aøsf, L.; Oliveira, H. J.; Moreira, R. G.; <strong>Intir, M. M.</strong>",
    paper2_abstract: "Avaliação empírica demonstrando como o adensamento florestal com espécies nativas amenizou a temperatura superficial do solo e atuou como refúgio térmico, multiplicando a riqueza da avifauna na bacia do Paraíba do Sul.",
    paper3_badge_basf: "Fomento BASF",
    paper3_badge_status: "2023 — 2025",
    paper3_title: "Projeto Ornitofauna de Guaratinguetá",
    paper3_meta: "<strong>Financiador:</strong> BASF (Matriz São Paulo) &bull; <strong>Integrantes:</strong> <strong>Micheli Mac Intir</strong>; Lucas Aøsf; Matheus Moroti; Henry Alexandre",
    paper3_abstract: "Levantamento sazonal sistemático e anilhamento de ornitofauna, mapeando gradientes de pressão antrópica e áreas prioritárias de restauração florestal em matriz agropecuária e industrial.",
    paper4_badge_bocaina: "Em Andamento",
    paper4_badge_status: "2025 — Atual",
    paper4_title: "Herpetofauna da Serra da Bocaina",
    paper4_meta: "<strong>Responsável:</strong> <strong>Micheli Mac Intir</strong> &bull; <strong>Integrante:</strong> Lucas Aøsf",
    paper4_abstract: "Expedições sistemáticas de campo na parte alta da Serra da Bocaina (São José do Barreiro/SP) para preencher lacunas de distribuição biogeográfica de anfíbios anuros e répteis de mata nebular.",

    // Timeline Experience Section
    exp_tag: "Trajetória Consolidada",
    exp_title: "Experiência Profissional em Destaque",
    exp_sub: "Da linha de frente rodoviária aos maiores complexos industriais de celulose, portos e hidrelétricas do Brasil.",
    exp1_status: "2026 — Atual &bull; Em Andamento",
    exp1_role: "Supervisora Ambiental",
    exp1_project: "Obras Rodoviárias das Rodovias Federais BR-153 e BR-369",
    exp1_desc: "Coordenação técnica e operacional integral da supervisão ambiental nas frentes de obras das rodovias federais BR-153 e BR-369. Gestão rigorosa de condicionantes de licenças, tratamento e baixa de Não Conformidades (NC), auditoria de subcontratadas e terceiros, resgate e afugentamento de fauna e atendimento técnico aos órgãos fiscalizadores.",
    exp2_status: "2024 — Atual",
    exp2_role: "Sócia Co-Fundadora & Consultora Sênior",
    exp2_company: "BioKuri — Pesquisa e Soluções Ambientais",
    exp2_desc: "Direção executiva e operacional da consultoria. Gestão de contratos, elaboração de programas ambientais (PBA), diagnósticos de fauna (EIA/RIMA, PCA, RCA), licenciamento estratégico e aplicação de Ciência de Dados a indicadores ecológicos corporativos.",
    exp3_status: "2023 — 2026",
    exp3_role: "Bióloga Consultora Especialista em Fauna",
    exp3_desc: "Execução de estudos de impacto, diagnósticos e monitoramento contínuo de fauna para grandes players do setor de celulose (<strong>megafábrica da Arauco</strong> em Inocência/MS e <strong>Cargill</strong> em Três Lagoas/MS), setor portuário (<strong>Porto de São Sebastião/SP</strong>, com ornitologia marinha em ilhas costeiras), hidrelétrico (<strong>PCH Verde</strong> em GO) e rodoviário (<strong>anel da BR-230/361</strong> em Patos/PB).",
    exp4_status: "2016 — Atual",
    exp4_role: "Bióloga Pesquisadora & Educadora Ambiental",
    exp4_company: "Instituto de Manejo da Biodiversidade (IMBio)",
    exp4_desc: "Pesquisa e manejo de fauna silvestre na Serra da Bocaina subsidiando a soltura e reintrodução de animais pela <strong>Polícia Militar Ambiental</strong>. Instrução especializada de identificação e manejo de fauna em áreas operacionais para o Estágio Básico do Combatente Aeromóvel (EBCA) do <strong>5º Batalhão de Infantaria Leve (Exército Brasileiro)</strong>. Apresentação científica na <strong>COP 30 (ONU 2025)</strong>.",

    // Competencies Section
    comp_tag: "O Que Entrego",
    comp_title: "Competências Técnicas & Operacionais",
    comp1_title: "Supervisão & Gestão de Obras",
    comp1_i1: "Inspeções diárias em rodovias federais e canteiros industriais",
    comp1_i2: "Gestão de Não Conformidades (NC) e planos corretivos",
    comp1_i3: "Controle de licenças (LP, LI, LO), outorgas e condicionantes",
    comp1_i4: "Auditoria de terceiros: banheiros químicos, bota-fora, poeira",
    comp1_i5: "Elaboração de relatórios técnicos e respostas a ofícios oficiais",
    comp2_title: "Fauna, Flora & Biodiversidade",
    comp2_i1: "Ornitologia: levantamento e monitoramento costeiro/marinho",
    comp2_i2: "Herpetofauna: transectos, busca ativa e diagnose morfológica",
    comp2_i3: "Mastofauna terrestre e alada (quirópteros/morcegos)",
    comp2_i4: "Resgate e afugentamento de fauna em supressão vegetal",
    comp2_i5: "Resgate de germoplasma (sementes, orquídeas, bromélias)",
    comp3_title: "Data Science & Análise Ecológica",
    comp3_i1: "MBA Data Science & Analytics (USP / ESALQ em andamento)",
    comp3_i2: "Análise estatística de dados ecológicos e riqueza de espécies",
    comp3_i3: "Pipelines com Python e R aplicados a indicadores ambientais",
    comp3_i4: "Visualização analítica e dashboards para auditorias ESG",
    comp3_i5: "Mineração de bases abertas de biodiversidade (GBIF)",
    comp4_title: "Liderança, Treinamentos & DDS",
    comp4_i1: "Gestão e planejamento diário de frentes de infraestrutura",
    comp4_i2: "Condução de Diálogos Diários de Segurança e Meio Ambiente",
    comp4_i3: "Treinamentos para tropas do Exército Brasileiro (5º BIL)",
    comp4_i4: "Capacitação de trabalhadores em preservação e boas práticas",
    comp4_i5: "Mediação técnica com engenharia, terceiros e comunidade",

    // Gallery Section
    gallery_tag: "Registros Reais",
    gallery_title: "Bastidores de Campo: Rigor Científico, Afeto e Bom Humor",
    gallery_sub: "A conservação se faz com bota na lama, água no peito, respeito à terra e amor autêntico pelos animais.",
    gal_cap1_title: "Porto de São Sebastião",
    gal_cap1_sub: "Monitoramento costeiro com câmera e tripé na água.",
    gal_cap2_title: "Ilhabela & Litoral Norte",
    gal_cap2_sub: "Amostragem em ilhas com caiaque oceânico.",
    gal_cap3_title: "Serra da Bocaina",
    gal_cap3_sub: "Trilhas de fauna e amostragem em áreas remotas.",
    gal_cap4_title: "Melanophryniscus moreirae",
    gal_cap4_sub: "Artigo internacional aceito para publicação (2026).",
    gal_cap5_title: "Serra da Bocaina / Altitude",
    gal_cap5_sub: "Inspeção ambiental e amostragem de fauna em áreas remotas.",
    insta_title: "Acompanhe o dia a dia no Instagram <span class=\"insta-user\">@macintir</span>",
    insta_desc: "Resgates de fauna, expedições de caiaque, bastidores das obras da BR-153/369 e novidades da <strong>BioKuri</strong>.",
    insta_btn: "Seguir @macintir",

    // Education Section
    edu_tag: "Base Científica",
    edu_title: "Formação Acadêmica & Idiomas",
    edu1_year: "2024 — Presente",
    edu1_title: "MBA em Data Science e Analytics",
    edu1_school: "Universidade de São Paulo (USP / ESALQ)",
    edu1_desc: "Especialização focada em modelagem preditiva, algoritmos aplicados a ciências biológicas, visualização de dados e governança ESG.",
    edu2_year: "2016 — 2019",
    edu2_title: "Licenciatura em Ciências Biológicas",
    edu2_school: "Centro Universitário Teresa D'Ávila (UNIFATEA)",
    edu2_desc: "<strong>Bolsista CAPES.</strong> TCC voltado a <em>\"Levantamento Ornitológico no Parque Ecológico do Taboão, Lorena/SP\"</em> sob orientação do prof. Ricardo Mendonça.",
    edu3_year: "Idiomas",
    edu3_title: "Comunicação Técnica & Científica",
    edu3_lang1: "<strong>Português:</strong> Nativo",
    edu3_lang2: "<strong>Inglês:</strong> Fluência para leitura crítica de artigos internacionais, redação técnica de papers e diálogo profissional.",

    // Contact Section
    contact_tag: "Vamos Conversar?",
    contact_title: "Entre em Contato",
    contact_sub: "Disponível para demandas de supervisão ambiental de obras, diagnósticos de fauna, soluções pela BioKuri e parcerias acadêmicas.",
    contact_cv_title: "Precisa do currículo completo em PDF para contratação ou concorrência?",
    contact_cv_sub: "Baixe o documento detalhado com ARTs, frentes de obra e referências técnicas.",
    contact_cv_btn: "Baixar Currículo em PDF",

    // Footer
    footer_role: "Bióloga &bull; CRBio 135793/01-D &bull; Supervisora Ambiental &bull; Co-fundadora BioKuri",
    footer_copy: "&copy; 2026 Micheli Mac Intir &bull; Todos os direitos reservados.",
    footer_sig: "BioKuri — Pesquisa e Soluções Ambientais 🌿"
  },
  en: {
    // Top Nav
    nav_about: "About Me",
    nav_road: "BR-153/369 Highway",
    nav_biokuri: "BioKuri",
    nav_trajectory: "Trajectory",
    nav_science: "Research & Papers",
    nav_competencies: "Competencies",
    nav_gallery: "Field Gallery",
    nav_contact: "Contact",
    nav_cv: "Download CV",

    // Sanctuary Zone
    sanctuary_tag: "Biodiversity Butterfly Sanctuary",
    sanctuary_inst_desktop: "<i class=\"fa-solid fa-arrow-pointer\"></i> Hover mouse to attract the butterflies &bull; <i class=\"fa-solid fa-hand-pointer\"></i> Click to disperse in a gentle floral pollen mist",
    sanctuary_inst_mobile: "<i class=\"fa-solid fa-hand-pointer\"></i> Tap to disperse butterflies in a floral mist",

    // Hero Section
    hero_status: "Environmental Supervisor @ Caruso &bull; Co-founder @ BioKuri",
    hero_title: "Micheli <span class=\"highlight-serif\">Mac Intir</span>",
    hero_credentials: "Biologist <span class=\"bullet\">&bull;</span> Environmental Supervisor <span class=\"bullet\">&bull;</span> Researcher <span class=\"bullet\">&bull;</span> Data Science (USP)",
    hero_desc: "From coastal waters and mudflats to leading environmental supervision on major federal highway projects (BR-153 and BR-369) and data modeling at USP: combining genuine passion for wildlife conservation with the technical rigor and pragmatism demanded by large-scale infrastructure.",
    pill_crbio: "CRBio 135793/01-D",
    pill_road: "BR-153 / BR-369 Supervision",
    pill_biokuri: "BioKuri Solutions",
    pill_usp: "MBA USP / ESALQ",
    pill_army: "Instructor 5th BIL Army",
    pill_cop: "COP 30 Presentation",
    btn_whatsapp: "Chat on WhatsApp",
    btn_workfronts: "View Work Fronts",
    btn_full_cv: "Full Curriculum Vitae",
    hero_caption_tag: "Field Records",
    hero_caption_text: "Coastal ornithology with tripod and telephoto lens in shallow waters (Port of São Sebastião/SP).",
    badge_road_title: "Highway Supervision",
    badge_road_sub: "BR-153 & BR-369",
    badge_biokuri_title: "BioKuri Environmental",
    badge_biokuri_sub: "Co-founding Partner",

    // Metrics Strip
    metric_1_label: "Years dedicated to Biology, Wildlife & Ecology",
    metric_2_label: "km of highways and infrastructure fronts supervised",
    metric_3_label: "Major corporate ventures and projects served",
    metric_4_label: "International paper accepted for publication",
    metric_5_label: "Focus on genuine compliance and ground conservation",

    // About Section
    about_tag: "Who I Am",
    about_title: "Biologist by vocation, manager by action, scientist by curiosity",
    about_badge_ilhabela: "Ilhabela Expedition",
    about_badge_bocaina: "Field Inspection",
    about_quote: "\"I do not believe in armchair biology. Genuine conservation is achieved by understanding the construction ground, animal behavior, and the heart of the people involved.\"",
    about_lead: "I am <strong>Micheli Mac Intir</strong>, licensed biologist graduated from UNIFATEA (with CAPES fellowship), environmental supervisor, and currently pursuing an <strong>MBA in Data Science & Analytics at USP/ESALQ</strong>.",
    about_p1: "My journey blends scientific precision with decisive leadership and open dialogue. Over the years, I have worked from wildlife rescue and rehabilitation alongside the <strong>Military Environmental Police</strong> in the Paraíba Valley, to leading environmental supervision on major federal highway operations (BR-153 and BR-369), pulp mill complexes (Arauco), port terminals (São Sebastião), and hydroelectric plants (PCH Verde).",
    about_p2: "Driven by the mission to create a modern, agile, and approachable consultancy, I founded <strong>BioKuri — Research & Environmental Solutions</strong> alongside biologist and taxonomist Lucas Aøsf. At BioKuri, we unite deep taxonomy, field agility, and data intelligence to resolve environmental bottlenecks with speed and unquestionable compliance.",
    about_card1_title: "Field Leadership & Execution",
    about_card1_text: "Swift resolution of Non-Conformances, firm interface with regulatory agencies and engineering teams.",
    about_card2_title: "Applied Data Science",
    about_card2_text: "Structured indicators in Python, predictive visualization, and rigorous ESG metrics.",

    // Road Supervision
    road_tag: "Operational Leadership",
    road_title: "Environmental Supervision of Highway Works (BR-153 & BR-369)",
    road_sub: "Direct operations at Caruso Soluções Ambientais & Tecnológicas along federal highways BR-153 and BR-369 (Jacarezinho/PR).",
    road_status: "ONGOING OPERATION (2026 — PRESENT)",
    road_company: "Caruso Soluções Ambientais &bull; PR",
    road_c1_title: "Workfront Management & Engineering",
    road_c1_text: "Continuous environmental coordination across construction fronts, integrated planning with production engineering, daily operational walk-throughs, and proactive mitigation of socio-environmental liabilities.",
    road_c2_title: "Non-Conformances (NC)",
    road_c2_text: "Systematic environmental inspections to identify, log, and resolve non-conformances in digital tracking systems, ensuring immediate corrective plans until formal sign-off by environmental authorities.",
    road_c3_title: "Permits, Water Rights & Contractors",
    road_c3_text: "Strict monitoring of license requirements (LP, LI, LO), water abstraction/discharge permits, and contractor audits: chemical sanitation units, certified disposal yards, and dust control (watering trucks).",
    road_c4_title: "Wildlife & Native Germplasm",
    road_c4_text: "Oversight of licensed vegetation clearing, coordinated wildlife rescue and pre-clearing deterrence, and harvesting native seeds, epiphytes, and propagules for environmental offset programs.",
    road_footer_note: "Drafting technical appraisals and formal response reports addressing inquiries from state and federal licensing authorities.",

    // BioKuri Section
    biokuri_tag: "Founded & Led Enterprise",
    biokuri_quote: "<em>Kuri</em> — Tupi-Guarani term for the noble <strong>Araucaria</strong> (Paraná pine). Deep roots, far-reaching vision, and non-negotiable reverence for wildlife.",
    biokuri_headline: "Intelligent, Agile, and Human Environmental Solutions",
    biokuri_desc1: "<strong>BioKuri</strong> was created from the synergy between museum-grade taxonomic rigor and the corporate market's urgent need for consultancies that truly understand tight engineering timelines, translating environmental agency requirements (IBAMA, IAT, CETESB, IMASUL) into documented compliance.",
    biokuri_desc2: "As co-founder alongside biologist and taxonomist <strong>Lucas Aøsf</strong>, I oversee strategic contracts, field crew coordination, biodiversity baselines, and data-driven ecological indicator pipelines.",
    biokuri_s1: "Highway & Works Environmental Supervision",
    biokuri_s2: "Fauna Baseline Studies (EIA/RIMA, PCA, RCA)",
    biokuri_s3: "Fauna & Flora Germplasm Rescue",
    biokuri_s4: "Corporate Environmental Education & Daily Briefings",
    biokuri_s5: "Data Science & Corporate ESG Reporting",
    biokuri_btn_contact: "Contact BioKuri",
    biokuri_btn_proposal: "Request Technical Proposal",
    biokuri_partner_title: "Partnership & Complementary Vision",
    biokuri_partner_sub: "Top-Tier Taxonomy &bull; Operational Execution",
    biokuri_partner_quote: "\"At BioKuri, deep taxonomic and ecological understanding meets decisive construction supervision. We resolve environmental bottlenecks with unassailable technical backing.\"",
    biokuri_founder_micheli_role: "Co-Founder &bull; Supervision & Management",
    biokuri_founder_lucas_role: "Co-Founder &bull; Taxonomy & R/Python",

    // Science Section
    science_tag: "Scientific Rigor",
    science_title: "Scientific Research & Academic Publications",
    science_sub: "International peer-reviewed articles using Citizen Science data, corporate industrial sponsorships, and global climate engagement.",
    paper1_badge_intl: "International Journal (2026)",
    paper1_badge_status: "Accepted for Publication",
    paper1_meta: "<strong>Journal:</strong> Reptiles & Amphibians (2026) &bull; <strong>Authors:</strong> Aøsf, L.; <strong>Mac Intir, M. D.</strong>; Azevedo, T. M.; Menezes, L. B.; Moroti, M. T.",
    paper1_abstract: "Pioneering study documenting the distribution expansion of the high-altitude redbelly toad (<em>Melanophryniscus moreirae</em>, a bioindicator anuran of Atlantic Forest mountain summits) across Southeastern Brazil by merging citizen science databases with rigorous field morphological and bioacoustic validation.",
    paper1_species_tag: "<em>Melanophryniscus moreirae</em> (Miranda-Ribeiro, 1920) &bull; Authentic Scientific Record (Dorsal & Ventral Views)",
    paper2_badge_cop: "COP 30 (2025)",
    paper2_badge_status: "UN Climate Conference",
    paper2_title: "The Role of Reforestation in Microclimatic Restoration and Avifauna Attraction in Nascentes Park",
    paper2_meta: "<strong>Event:</strong> United Nations Climate Change Conference (COP 30), 2025 &bull; <strong>Authors:</strong> Aøsf, L.; Oliveira, H. J.; Moreira, R. G.; <strong>Intir, M. M.</strong>",
    paper2_abstract: "Empirical assessment proving that native reforestation reduced surface ground temperature and served as a thermal refuge, dramatically increasing avian richness across the Paraíba do Sul basin.",
    paper3_badge_basf: "BASF Sponsorship",
    paper3_badge_status: "2023 — 2025",
    paper3_title: "Guaratinguetá Avifauna Project",
    paper3_meta: "<strong>Funder:</strong> BASF (São Paulo HQ) &bull; <strong>Researchers:</strong> <strong>Micheli Mac Intir</strong>; Lucas Aøsf; Matheus Moroti; Henry Alexandre",
    paper3_abstract: "Systematic seasonal bird surveys and mist-net banding, modeling anthropogenic pressure gradients and prioritizing forest restoration corridors across agricultural and industrial landscapes.",
    paper4_badge_bocaina: "Ongoing Project",
    paper4_badge_status: "2025 — Present",
    paper4_title: "Herpetofauna of Serra da Bocaina",
    paper4_meta: "<strong>Principal Investigator:</strong> <strong>Micheli Mac Intir</strong> &bull; <strong>Co-Investigator:</strong> Lucas Aøsf",
    paper4_abstract: "Systematic field expeditions in the high-altitude cloud forest summits of Serra da Bocaina (São José do Barreiro/SP) to close biogeographical gaps in endemic anurans and montane reptiles.",

    // Timeline Experience Section
    exp_tag: "Proven Trajectory",
    exp_title: "Featured Professional Experience",
    exp_sub: "From front-line highway corridors to Brazil's largest pulp mills, shipping ports, and hydroelectric power plants.",
    exp1_status: "2026 — Present &bull; Ongoing",
    exp1_role: "Environmental Supervisor",
    exp1_project: "Highway Works along Federal Highways BR-153 and BR-369",
    exp1_desc: "Full operational and technical coordination of environmental supervision across highway construction fronts along BR-153 and BR-369. Rigorous management of permit conditions, resolution and formal closure of Non-Conformances (NC), third-party contractor audits, wildlife rescue, and technical interface with regulatory oversight bodies.",
    exp2_status: "2024 — Present",
    exp2_role: "Co-Founder & Senior Consultant",
    exp2_company: "BioKuri — Research & Environmental Solutions",
    exp2_desc: "Executive and operational direction. Contract management, preparation of Basic Environmental Programs (PBA), biodiversity diagnostics (EIA/RIMA, PCA, RCA), strategic permitting, and applying Data Science to corporate ecological indicators.",
    exp3_status: "2023 — 2026",
    exp3_role: "Senior Consulting Wildlife Biologist",
    exp3_desc: "Execution of impact assessments, biodiversity diagnostics, and fauna monitoring for major market leaders in pulp manufacturing (<strong>Arauco megamill</strong> in Inocência/MS and <strong>Cargill</strong> in Três Lagoas/MS), port logistics (<strong>Port of São Sebastião/SP</strong>, including marine ornithology on coastal islands), hydroelectric power (<strong>PCH Verde</strong> in GO), and highways (<strong>BR-230/361 beltway</strong> in Patos/PB).",
    exp4_status: "2016 — Present",
    exp4_role: "Research Biologist & Environmental Educator",
    exp4_company: "Biodiversity Management Institute (IMBio)",
    exp4_desc: "Wildlife research and handling in Serra da Bocaina supporting animal release and rehabilitation by the <strong>Military Environmental Police</strong>. Specialized instruction in venomous fauna handling and identification for the Air Assault Combatant Training Course (EBCA) of the <strong>5th Light Infantry Battalion (Brazilian Army)</strong>. Scientific presentation at <strong>COP 30 (UN 2025)</strong>.",

    // Competencies Section
    comp_tag: "What I Deliver",
    comp_title: "Technical & Operational Competencies",
    comp1_title: "Supervision & Works Management",
    comp1_i1: "Daily inspections on federal highways and industrial worksites",
    comp1_i2: "Non-Conformance (NC) management and immediate action plans",
    comp1_i3: "License compliance tracking (LP, LI, LO), water rights, and stipulations",
    comp1_i4: "Contractor audits: chemical toilets, certified spoil areas, dust control",
    comp1_i5: "Drafting technical appraisals and responses to regulatory notices",
    comp2_title: "Fauna, Flora & Biodiversity",
    comp2_i1: "Ornithology: coastal and marine bird surveys and monitoring",
    comp2_i2: "Herpetofauna: transects, active search, and morphological diagnosis",
    comp2_i3: "Terrestrial and winged mammals (bats/chiropterans)",
    comp2_i4: "Wildlife rescue and pre-clearing deterrence during suppression",
    comp2_i5: "Germplasm collection (native seeds, orchids, bromeliads)",
    comp3_title: "Data Science & Ecological Analytics",
    comp3_i1: "MBA in Data Science & Analytics (USP / ESALQ in progress)",
    comp3_i2: "Statistical analysis of biodiversity data and species richness",
    comp3_i3: "Python and R pipelines tailored for environmental indicators",
    comp3_i4: "Analytical dashboards and charts for ESG corporate audits",
    comp3_i5: "Data mining of global open biodiversity repositories (GBIF)",
    comp4_title: "Leadership, Training & Daily Safety Talks",
    comp4_i1: "Daily leadership and logistical planning on infrastructure fronts",
    comp4_i2: "Conducting Daily Safety & Environment Briefings (DDS)",
    comp4_i3: "Fauna handling training for the Brazilian Army (5th BIL)",
    comp4_i4: "Workforce education on environmental compliance and best practices",
    comp4_i5: "Technical mediation bridging engineering, subcontractors, and community",

    // Gallery Section
    gallery_tag: "Authentic Records",
    gallery_title: "Field Behind-the-Scenes: Scientific Rigor, Heart, and Humor",
    gallery_sub: "Real conservation happens with boots in the mud, water up to the chest, reverence for the land, and genuine love for wildlife.",
    gal_cap1_title: "Port of São Sebastião",
    gal_cap1_sub: "Coastal bird monitoring with camera and tripod in the water.",
    gal_cap2_title: "Ilhabela & North Coast",
    gal_cap2_sub: "Sampling coastal islands using ocean expedition kayaks.",
    gal_cap3_title: "Serra da Bocaina",
    gal_cap3_sub: "Wildlife trails and field sampling in remote cloud forests.",
    gal_cap4_title: "Melanophryniscus moreirae",
    gal_cap4_sub: "Accepted international paper publication records (2026).",
    gal_cap5_title: "Serra da Bocaina / Mountain Peaks",
    gal_cap5_sub: "Environmental inspection and biodiversity sampling in high altitude.",
    insta_title: "Follow daily field updates on Instagram <span class=\"insta-user\">@macintir</span>",
    insta_desc: "Wildlife rescues, ocean kayak surveys, behind-the-scenes at BR-153/369 highway fronts, and updates from <strong>BioKuri</strong>.",
    insta_btn: "Follow @macintir",

    // Education Section
    edu_tag: "Academic Foundation",
    edu_title: "Academic Background & Languages",
    edu1_year: "2024 — Present",
    edu1_title: "MBA in Data Science & Analytics",
    edu1_school: "University of São Paulo (USP / ESALQ)",
    edu1_desc: "Specialization focused on predictive modeling, machine learning applied to biological systems, data visualization, and ESG compliance.",
    edu2_year: "2016 — 2019",
    edu2_title: "B.Sc. in Biological Sciences (Licensure)",
    edu2_school: "Centro Universitário Teresa D'Ávila (UNIFATEA)",
    edu2_desc: "<strong>CAPES Fellow.</strong> Undergraduate thesis: <em>\"Ornithological Survey in Taboão Ecological Park, Lorena/SP\"</em> supervised by Prof. Ricardo Mendonça.",
    edu3_year: "Languages",
    edu3_title: "Technical & Scientific Communication",
    edu3_lang1: "<strong>Portuguese:</strong> Native speaker",
    edu3_lang2: "<strong>English:</strong> Full working proficiency for critical literature review, international paper drafting, and professional discourse.",

    // Contact Section
    contact_tag: "Let's Connect",
    contact_title: "Get in Touch",
    contact_sub: "Available for environmental supervision, wildlife baseline surveys, customized BioKuri solutions, and academic research collaborations.",
    contact_cv_title: "Need the full curriculum vitae in PDF for hiring or corporate bidding?",
    contact_cv_sub: "Download the complete document featuring technical registrations (ART), project fronts, and scientific references.",
    contact_cv_btn: "Download CV in PDF",

    // Footer
    footer_role: "Biologist &bull; CRBio 135793/01-D &bull; Environmental Supervisor &bull; BioKuri Co-founder",
    footer_copy: "&copy; 2026 Micheli Mac Intir &bull; All rights reserved.",
    footer_sig: "BioKuri — Research and Environmental Solutions 🌿"
  }
};

function initLanguageSystem() {
  const langToggleBtn = document.getElementById('lang-toggle');
  const ptSpan = document.getElementById('lang-pt');
  const enSpan = document.getElementById('lang-en');
  if (!langToggleBtn) return;

  let currentLang = localStorage.getItem('biokuri_lang') || 'pt';
  applyLanguage(currentLang);

  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('biokuri_lang', currentLang);
    applyLanguage(currentLang);
  });

  function applyLanguage(lang) {
    if (ptSpan && enSpan) {
      if (lang === 'pt') {
        ptSpan.classList.add('active');
        enSpan.classList.remove('active');
        document.documentElement.lang = 'pt-BR';
      } else {
        ptSpan.classList.remove('active');
        enSpan.classList.add('active');
        document.documentElement.lang = 'en';
      }
    }

    const dict = translations[lang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key] !== undefined) {
        el.setAttribute('title', dict[key].replace(/<[^>]+>/g, ''));
      }
    });
  }
}

/* ==========================================================================
   2. BORBOLETAS DA MATA ATLÂNTICA EM VOO LIVRE (CANVAS BIO-INTERATIVO)
   Voo orgânico, suave, sem aglomerações e sem interferir na leitura
   ========================================================================== */
function initButterflyCanvas() {
  const canvas = document.getElementById('bio-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: -1000, y: -1000, isOverSanctuary: false };
  const sanctuaryZone = document.getElementById('butterfly-sanctuary-zone');

  if (sanctuaryZone) {
    sanctuaryZone.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isOverSanctuary = true;
    });
    sanctuaryZone.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isOverSanctuary = false;
    });
    sanctuaryZone.addEventListener('click', e => {
      burstPollenCloud(e.clientX, e.clientY);
    });
  }

  // Paletas botânicas autênticas de borboletas da Mata Atlântica
  const SPECIES = [
    {
      name: 'Morpho helenor',
      primary: '#1E6091',
      secondary: '#184E77',
      accent: '#52B69A',
      wingSpan: 24
    },
    {
      name: 'Heliconius sara',
      primary: '#111827',
      secondary: '#0077B6',
      accent: '#F3C053',
      wingSpan: 20
    },
    {
      name: 'Parides ascanius',
      primary: '#1A1A1A',
      secondary: '#B91C1C',
      accent: '#F5EFE6',
      wingSpan: 22
    },
    {
      name: 'Phoebis sennae',
      primary: '#EAB308',
      secondary: '#CA8A04',
      accent: '#FEF08A',
      wingSpan: 20
    },
    {
      name: 'Danaus plexippus erippus',
      primary: '#C25E00',
      secondary: '#1A1A1A',
      accent: '#F5EFE6',
      wingSpan: 23
    }
  ];

  class Butterfly {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? -40 : width + 40);
      this.y = Math.random() * height;
      this.species = SPECIES[Math.floor(Math.random() * SPECIES.length)];
      this.scale = 0.55 + Math.random() * 0.45;
      this.speed = 0.75 + Math.random() * 0.4; // Voo calmo e tranquilo
      this.angle = Math.random() * Math.PI * 2;
      this.targetAngle = this.angle;
      this.turnRate = 0.02 + Math.random() * 0.02;

      // Opacidade viva para aparecerem nítidas no espaço livre e no santuário
      // O desfoque dos cards (backdrop-filter: blur(16px)) cuidará de embaçá-las ao passarem por trás!
      this.isDeep = Math.random() > 0.6;
      this.alpha = this.isDeep ? (0.45 + Math.random() * 0.15) : (0.75 + Math.random() * 0.20);

      this.wingPhase = Math.random() * Math.PI * 2;
      this.wingSpeed = 0.14 + Math.random() * 0.08;
      this.glideTimer = 0;
      this.isGliding = false;

      this.wanderTimer = Math.floor(Math.random() * 120);
    }

    update(allButterflies) {
      // Alternância orgânica entre bater de asas e planar suave
      if (this.glideTimer > 0) {
        this.glideTimer--;
        this.isGliding = true;
      } else {
        this.isGliding = false;
        this.wingPhase += this.wingSpeed;
        if (Math.random() < 0.008) {
          this.glideTimer = 30 + Math.floor(Math.random() * 45); // Plana suave
        }
      }

      // Separação orgânica para evitar empacotamento ou aglomeração
      let sepX = 0;
      let sepY = 0;
      let neighbors = 0;
      const minDistance = 55;

      for (let i = 0; i < allButterflies.length; i++) {
        const other = allButterflies[i];
        if (other === this) continue;
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < minDistance) {
          sepX += dx / dist;
          sepY += dy / dist;
          neighbors++;
        }
      }

      if (neighbors > 0) {
        this.targetAngle = Math.atan2(
          Math.sin(this.targetAngle) * 0.8 + (sepY / neighbors) * 0.3,
          Math.cos(this.targetAngle) * 0.8 + (sepX / neighbors) * 0.3
        );
      }

      // Atração suave se o cursor estiver sobre a zona do santuário
      if (mouse.isOverSanctuary) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 400 && dist > 70) {
          const attractAngle = Math.atan2(dy, dx);
          this.targetAngle += (attractAngle - this.targetAngle) * 0.04;
        }
      } else {
        // Voo livre randômico em ondas suaves
        this.wanderTimer--;
        if (this.wanderTimer <= 0) {
          this.targetAngle += (Math.random() - 0.5) * 0.9;
          this.wanderTimer = 80 + Math.floor(Math.random() * 120);
        }
      }

      // Rotação suave em direção ao ângulo alvo
      let diff = this.targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * this.turnRate;

      // Movimentação fluida
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Envoltório suave nas bordas da tela
      if (this.x < -60) this.x = width + 60;
      if (this.x > width + 60) this.x = -60;
      if (this.y < -60) this.y = height + 60;
      if (this.y > height + 60) this.y = -60;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle + Math.PI / 2);
      ctx.scale(this.scale, this.scale);
      ctx.globalAlpha = this.alpha;

      const wingFlap = this.isGliding ? 0.88 : Math.cos(this.wingPhase);
      const span = this.species.wingSpan;

      // Asa Esquerda
      ctx.save();
      ctx.scale(wingFlap, 1);

      // Asa Anterior Esquerda
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.bezierCurveTo(-span * 0.5, -span * 0.9, -span * 1.3, -span * 0.7, -span * 1.1, -span * 0.2);
      ctx.bezierCurveTo(-span * 0.8, span * 0.1, -span * 0.3, span * 0.1, 0, 2);
      ctx.fillStyle = this.species.primary;
      ctx.fill();

      // Detalhe da Asa Anterior
      ctx.beginPath();
      ctx.moveTo(-span * 0.2, -span * 0.2);
      ctx.quadraticCurveTo(-span * 0.8, -span * 0.4, -span * 0.6, -span * 0.1);
      ctx.fillStyle = this.species.accent;
      ctx.fill();

      // Asa Posterior Esquerda
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-span * 0.7, 0, -span * 0.9, span * 0.7, -span * 0.5, span * 0.9);
      ctx.bezierCurveTo(-span * 0.2, span * 0.8, -span * 0.1, span * 0.4, 0, 8);
      ctx.fillStyle = this.species.secondary;
      ctx.fill();

      ctx.restore();

      // Asa Direita (Espelhada)
      ctx.save();
      ctx.scale(-wingFlap, 1);

      // Asa Anterior Direita
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.bezierCurveTo(-span * 0.5, -span * 0.9, -span * 1.3, -span * 0.7, -span * 1.1, -span * 0.2);
      ctx.bezierCurveTo(-span * 0.8, span * 0.1, -span * 0.3, span * 0.1, 0, 2);
      ctx.fillStyle = this.species.primary;
      ctx.fill();

      // Detalhe da Asa Anterior
      ctx.beginPath();
      ctx.moveTo(-span * 0.2, -span * 0.2);
      ctx.quadraticCurveTo(-span * 0.8, -span * 0.4, -span * 0.6, -span * 0.1);
      ctx.fillStyle = this.species.accent;
      ctx.fill();

      // Asa Posterior Direita
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.bezierCurveTo(-span * 0.7, 0, -span * 0.9, span * 0.7, -span * 0.5, span * 0.9);
      ctx.bezierCurveTo(-span * 0.2, span * 0.8, -span * 0.1, span * 0.4, 0, 8);
      ctx.fillStyle = this.species.secondary;
      ctx.fill();

      ctx.restore();

      // Corpo Central e Antenas
      ctx.fillStyle = '#111827';
      ctx.beginPath();
      ctx.ellipse(0, 2, 1.8, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // Antenas
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-0.8, -5);
      ctx.quadraticCurveTo(-4, -12, -7, -13);
      ctx.moveTo(0.8, -5);
      ctx.quadraticCurveTo(4, -12, 7, -13);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Partículas de Névoa Floral e Pólen
  const pollenParticles = [];

  class Pollen {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const force = 1.2 + Math.random() * 3.5;
      this.vx = Math.cos(angle) * force;
      this.vy = Math.sin(angle) * force - 0.5;
      this.radius = 1.5 + Math.random() * 2.5;
      this.alpha = 0.85;
      this.decay = 0.015 + Math.random() * 0.02;
      const colors = ['#D4AF37', '#FEF08A', '#F5EFE6', '#86EFAC'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96;
      this.vy *= 0.96;
      this.alpha -= this.decay;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function burstPollenCloud(x, y) {
    for (let i = 0; i < 28; i++) {
      pollenParticles.push(new Pollen(x, y));
    }

    // Leve dispersão das borboletas próximas sem espanto abrupto
    butterflies.forEach(b => {
      const dx = b.x - x;
      const dy = b.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 220) {
        b.targetAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.5;
        b.speed = 1.6;
        setTimeout(() => {
          b.speed = 0.75 + Math.random() * 0.4;
        }, 1200);
      }
    });
  }

  // População serena de borboletas (quantidade equilibrada)
  const count = Math.max(18, Math.min(28, Math.floor(width / 60)));
  const butterflies = Array.from({ length: count }, () => new Butterfly());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Atualiza e desenha borboletas
    for (let i = 0; i < butterflies.length; i++) {
      butterflies[i].update(butterflies);
      butterflies[i].draw(ctx);
    }

    // Atualiza e desenha névoa de pólen
    for (let i = pollenParticles.length - 1; i >= 0; i--) {
      const p = pollenParticles[i];
      p.update();
      p.draw(ctx);
      if (p.alpha <= 0) {
        pollenParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. CONTADOR DE IMPACTO E MÉTRICAS
   ========================================================================== */
function initMetricsCounter() {
  const metricValues = document.querySelectorAll('.metric-val');
  if (!metricValues.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetStr = el.getAttribute('data-target');
          if (!targetStr) return;

          const target = parseInt(targetStr, 10);
          if (isNaN(target)) return;

          const hasPlus = el.textContent.includes('+');
          const hasPercent = el.textContent.includes('%');
          const duration = 1600;
          const startTime = performance.now();

          function updateNumber(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            let display = current.toLocaleString('pt-BR');
            if (hasPlus) display += '+';
            if (hasPercent) display += '%';
            el.textContent = display;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            }
          }

          requestAnimationFrame(updateNumber);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  metricValues.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. LIGHTBOX DE GALERIA
   ========================================================================== */
function initLightbox() {
  window.openLightbox = function(src, caption) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');
    if (!lb || !img) return;

    img.src = src;
    if (cap) cap.textContent = caption || '';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ==========================================================================
   5. ROLAGEM SUAVE (SMOOTH SCROLL)
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
