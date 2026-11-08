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
    sanctuary_tag: "Jardim das Borboletas",
    sanctuary_inst_desktop: "<i class=\"fa-solid fa-arrow-pointer\"></i> Passe o mouse para atrair em revoada &bull; <i class=\"fa-solid fa-hand-pointer\"></i> Clique para dispersar",
    sanctuary_inst_mobile: "<i class=\"fa-solid fa-hand-pointer\"></i> Toque para dispersar as borboletas",

    // Hero Section
    hero_status: "Supervisora Ambiental &bull; Gestão &bull; Data Science (Python) &bull; BioKuri",
    hero_title: "Micheli <span class=\"highlight-serif\">Mac Intir</span>",
    hero_credentials: "Supervisora Ambiental &bull; Gestão de Obras &bull; Data Science (Python) &bull; Especialista em Fauna (Ornitologia)",
    hero_desc: "Supervisora ambiental com liderança em obras de infraestrutura e rodovias federais (BR-153 e BR-369 na Caruso), atuando com inteligência de dados aplicada em Python (MBA USP/ESALQ) e sólida especialização em fauna silvestre, com destacada ênfase em ornitologia costeira, marinha e continental (anilhamento CEMAVE e bioacústica). Sócia co-fundadora da BioKuri Soluções Ambientais.",
    pill_crbio: "CRBio 135793/01-D",
    pill_road: "Supervisão & Gestão de Obras",
    pill_python: "Data Science em Python",
    pill_bird: "Especialista em Ornitologia",
    pill_fauna: "Fauna Silvestre & Resgate",
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
    about_tag: "Trajetória & Vocação",
    about_title: "Supervisora Ambiental, Cientista de Dados em Python e Especialista em Fauna",
    about_badge_masto: "Mastofauna &bull; Tamanduá-bandeira",
    about_badge_bocaina: "Inspeção de Campo",
    about_quote: "\"Não acredito em biologia de gabinete. O rigor técnico em fauna e a modelagem de dados só têm valor real quando resolvem gargalos no chão da obra e garantem conformidade ambiental inatacável.\"",
    about_lead: "Sou <strong>Micheli Mac Intir</strong>, bióloga (UNIFATEA, bolsista CAPES), supervisora ambiental de obras de grande porte, especialista em fauna com foco prioritário em <strong>ornitologia</strong> e pós-graduanda em <strong>Data Science & Analytics pela USP/ESALQ</strong>.",
    about_p1: "Minha trajetória combina o comando técnico na <strong>supervisão e gestão ambiental</strong> em rodovias federais (BR-153 e BR-369 na Caruso), grandes complexos industriais de celulose (megafábrica da Arauco em Inocência/MS) e terminais portuários (Porto de São Sebastião) com a inteligência computacional em <strong>Python</strong> para automação de rotinas, cálculo de índices ecológicos e estruturação de métricas ESG.",
    about_p2: "Na frente de fauna silvestre, dedico especial dedicação à <strong>ornitologia</strong> — atuando desde o monitoramento de aves marinhas e costeiras em caiaque oceânico e áreas portuárias até o anilhamento científico (CEMAVE/ICMBio) e projetos de conservação como o Ornitofauna de Guaratinguetá (fomento BASF). Ao lado do taxonomista Lucas Aøsf, fundei a <strong>BioKuri — Pesquisa e Soluções Ambientais</strong>.",
    about_card1_title: "Supervisão & Gestão de Obras",
    about_card1_text: "Tratamento ágil de NCs, planos de ação imediatos e interface direta com engenharia civil.",
    about_card2_title: "Data Science em Python (USP)",
    about_card2_text: "Modelagem estatística na USP/ESALQ, pipelines ecológicos e dashboards automatizados ESG.",
    about_card3_title: "Fauna & Ornitologia",
    about_card3_text: "Aves marinhas, costeiras e continentais, anilhamento CEMAVE e bioacústica.",
    about_card4_title: "BioKuri Soluções",
    about_card4_text: "Co-fundadora unindo rigor taxonômico de ponta à conformidade corporativa rápida.",

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
    comp1_title: "Supervisão Ambiental & Gestão de Obras",
    comp1_i1: "Gestão ambiental contínua em frentes rodoviárias (BR-153/369) e industriais",
    comp1_i2: "Tratamento ágil e baixa de Não Conformidades (NC) junto à engenharia",
    comp1_i3: "Monitoramento de condicionantes de licenças (LP, LI, LO) e outorgas hídricas",
    comp1_i4: "Auditoria de terceiros: bota-fora autorizado, umectação de poeira e resíduos",
    comp1_i5: "Elaboração de pareceres técnicos e respostas a notificações oficiais de órgãos",
    comp2_title: "Especialista em Fauna (Ênfase em Ornitologia)",
    comp2_i1: "Ornitologia de campo: levantamentos quali-quantitativos continentais e costeiros",
    comp2_i2: "Aves marinhas e monitoramento com caiaque oceânico e teleobjetivas",
    comp2_i3: "Anilhamento científico de aves (CEMAVE/ICMBio) e bioacústica de vocalizações",
    comp2_i4: "Manejo, resgate e afugentamento de fauna silvestre em supressão vegetal",
    comp2_i5: "Diagnósticos integrados de herpetofauna (anfíbios e répteis) e mastofauna",
    comp3_title: "Data Science em Python & Inteligência Ecológica",
    comp3_i1: "MBA em Data Science & Analytics (USP / ESALQ em andamento)",
    comp3_i2: "Modelagem e análise estatística de biodiversidade em Python (Pandas/Scipy)",
    comp3_i3: "Pipelines automatizados para relatórios ambientais e índices ecológicos",
    comp3_i4: "Visualização preditiva, gráficos executivos e indicadores ESG para auditorias",
    comp3_i5: "Mineração e curadoria de dados em repositórios abertos (GBIF, SpeciesLink)",
    comp4_title: "Liderança, Governança & Treinamentos",
    comp4_i1: "Gestão operacional de equipes multidisciplinares e planejamento de rotinas",
    comp4_i2: "Condução de Diálogos Diários de Segurança e Meio Ambiente (DDS)",
    comp4_i3: "Instrução técnica de fauna para o Exército Brasileiro (5º BIL / EBCA)",
    comp4_i4: "Capacitação de trabalhadores e operadores em preservação da biodiversidade",
    comp4_i5: "Interface institucional com órgãos ambientais (IBAMA, IAT, CETESB, IMASUL)",

    // Gallery Section
    gallery_tag: "Registros Reais",
    gallery_title: "Bastidores de Campo: Rigor Científico, Afeto e Bom Humor",
    gallery_sub: "A conservação se faz com bota na lama, água no peito, respeito à terra e amor autêntico pelos animais.",
    gal_cap1_title: "Porto de São Sebastião",
    gal_cap1_sub: "Monitoramento costeiro com câmera e tripé na água.",
    gal_cap2_title: "Mastofauna &bull; Tamanduá-bandeira",
    gal_cap2_sub: "Registro de Myrmecophaga tridactyla durante campanha de mastofauna.",
    gal_cap2_badge: "Tamanduá-bandeira",
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
    footer_role: "Supervisora Ambiental &bull; Gestão de Obras &bull; Data Science (Python) &bull; Especialista em Fauna (Ornitologia) &bull; CRBio 135793/01-D",
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
    sanctuary_tag: "Butterfly Sanctuary",
    sanctuary_inst_desktop: "<i class=\"fa-solid fa-arrow-pointer\"></i> Move mouse to attract in swarm &bull; <i class=\"fa-solid fa-hand-pointer\"></i> Click to scatter",
    sanctuary_inst_mobile: "<i class=\"fa-solid fa-hand-pointer\"></i> Tap to scatter butterflies",

    // Hero Section
    hero_status: "Environmental Supervisor &bull; Management &bull; Data Science (Python) &bull; BioKuri",
    hero_title: "Micheli <span class=\"highlight-serif\">Mac Intir</span>",
    hero_credentials: "Environmental Supervisor &bull; Works Management &bull; Data Science (Python) &bull; Wildlife Specialist (Ornithology)",
    hero_desc: "Environmental supervisor leading compliance and workfront management on major federal highways (BR-153 & BR-369 at Caruso), leveraging data intelligence and Python modeling (MBA USP/ESALQ), and specializing in wildlife biology with a strong focus on coastal, marine, and continental ornithology (CEMAVE bird banding & bioacoustics). Co-founding partner at BioKuri Soluções Ambientais.",
    pill_crbio: "CRBio 135793/01-D",
    pill_road: "Works Supervision & Management",
    pill_python: "Data Science in Python",
    pill_bird: "Wildlife & Ornithology Specialist",
    pill_fauna: "Wildlife & Rescue",
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
    about_tag: "Career & Calling",
    about_title: "Environmental Supervisor, Python Data Scientist & Wildlife Specialist",
    about_badge_masto: "Mammal Survey &bull; Giant Anteater",
    about_badge_bocaina: "Field Inspection",
    about_quote: "\"I do not believe in armchair biology. Rigorous wildlife science and data modeling only carry true value when they solve real ground bottlenecks and ensure unassailable environmental compliance.\"",
    about_lead: "I am <strong>Micheli Mac Intir</strong>, licensed biologist graduated from UNIFATEA (with CAPES fellowship), major infrastructure environmental supervisor, wildlife specialist with primary focus on <strong>ornithology</strong>, and pursuing an <strong>MBA in Data Science & Analytics at USP/ESALQ</strong>.",
    about_p1: "My career unites decisive technical command in <strong>environmental supervision and management</strong> across federal highways (BR-153 & BR-369 at Caruso), massive pulp industrial complexes (Arauco megamill in Inocência/MS), and deep-water ports (São Sebastião) with computational intelligence in <strong>Python</strong> for automated ecological pipelines and ESG metrics.",
    about_p2: "In wildlife biology, I place core dedication on <strong>ornithology</strong> — ranging from marine and coastal bird surveys via ocean expedition kayaks and port basins to scientific bird banding (CEMAVE/ICMBio) and corporate-sponsored conservation programs such as the Guaratinguetá Avifauna Project (BASF). Alongside taxonomist Lucas Aøsf, I co-founded <strong>BioKuri — Research & Environmental Solutions</strong>.",
    about_card1_title: "Works Supervision & Management",
    about_card1_text: "Swift resolution of Non-Conformances, immediate corrective action plans, and active civil engineering interface.",
    about_card2_title: "Data Science in Python (USP)",
    about_card2_text: "Statistical biodiversity modeling at USP/ESALQ, automated ecological pipelines, and ESG dashboards.",
    about_card3_title: "Wildlife & Ornithology",
    about_card3_text: "Marine, coastal, and continental birds, CEMAVE bird banding, and bioacoustics.",
    about_card4_title: "BioKuri Solutions",
    about_card4_text: "Co-founder merging museum-grade taxonomy with swift corporate environmental compliance.",

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
    comp1_title: "Environmental Supervision & Works Management",
    comp1_i1: "Continuous environmental management along highway (BR-153/369) and industrial fronts",
    comp1_i2: "Fast Non-Conformance (NC) resolution and corrective closure alongside engineering",
    comp1_i3: "License conditions tracking (LP, LI, LO), water rights, and environmental permits",
    comp1_i4: "Subcontractor audits: authorized spoil yards, dust suppression watering, and waste",
    comp1_i5: "Drafting technical appraisals and official regulatory responses to environmental notices",
    comp2_title: "Wildlife Specialist (Focus on Ornithology)",
    comp2_i1: "Field ornithology: comprehensive qualitative and quantitative avian surveys",
    comp2_i2: "Marine and coastal birds: monitoring via ocean expedition kayaks and telephotos",
    comp2_i3: "Scientific bird banding (CEMAVE/ICMBio) and acoustic vocalization monitoring",
    comp2_i4: "Wildlife deterrence, handling, and rescue during licensed vegetation clearing",
    comp2_i5: "Integrated baseline assessments of herpetofauna (amphibians and reptiles) and mammals",
    comp3_title: "Data Science in Python & Ecological Analytics",
    comp3_i1: "MBA in Data Science & Analytics (USP / ESALQ in progress)",
    comp3_i2: "Biodiversity statistical analysis and species modeling using Python (Pandas/Scipy)",
    comp3_i3: "Automated data pipelines for environmental reporting and ecological diversity indices",
    comp3_i4: "Predictive visualization, executive reporting, and ESG audit dashboard metrics",
    comp3_i5: "Data mining and curation of global open biodiversity repositories (GBIF, SpeciesLink)",
    comp4_title: "Leadership, Governance & Training",
    comp4_i1: "Operational management of multidisciplinary field teams and work routine planning",
    comp4_i2: "Conducting Daily Safety & Environment Briefings (DDS) on active job fronts",
    comp4_i3: "Technical wildlife instruction for the Brazilian Army (5th Light Infantry Battalion / EBCA)",
    comp4_i4: "Workforce and heavy equipment operator education on biodiversity preservation",
    comp4_i5: "Institutional interface with federal and state environmental agencies (IBAMA, IAT, CETESB)",

    // Gallery Section
    gallery_tag: "Authentic Records",
    gallery_title: "Field Behind-the-Scenes: Scientific Rigor, Heart, and Humor",
    gallery_sub: "Real conservation happens with boots in the mud, water up to the chest, reverence for the land, and genuine love for wildlife.",
    gal_cap1_title: "Port of São Sebastião",
    gal_cap1_sub: "Coastal bird monitoring with camera and tripod in the water.",
    gal_cap2_title: "Mammal Ecology &bull; Giant Anteater",
    gal_cap2_sub: "Record of Myrmecophaga tridactyla during wild mammal field survey.",
    gal_cap2_badge: "Giant Anteater",
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
    footer_role: "Environmental Supervisor &bull; Works Management &bull; Data Science (Python) &bull; Wildlife Specialist (Ornithology) &bull; CRBio 135793/01-D",
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

  const sanctuaryZone = document.getElementById('butterfly-sanctuary-zone');
  let mouseInSanctuary = false;
  let mouseX = -1000;
  let mouseY = -1000;
  let isTouchInteraction = false;
  let touchResetTimer = null;
  const shockwaves = [];
  const pollenParticles = [];

  function isInsideSanctuary(cx, cy) {
    if (!sanctuaryZone) return false;
    const rect = sanctuaryZone.getBoundingClientRect();
    return cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
  }

  // Ondulação floral e dispersão graciosa idêntica ao santuário de Lucas
  function triggerShockwave(x, y) {
    shockwaves.push({
      x: x,
      y: y,
      radius: 4,
      maxRadius: 75,
      speed: 3.5,
      alpha: 0.85
    });
    setTimeout(() => {
      shockwaves.push({
        x: x,
        y: y,
        radius: 3,
        maxRadius: 52,
        speed: 2.4,
        alpha: 0.52
      });
    }, 75);

    // Efeito de pólen botânico em suspensão
    for (let i = 0; i < 28; i++) {
      pollenParticles.push(new Pollen(x, y));
    }

    // Dispersão com aceleração das borboletas no raio de choque
    butterflies.forEach(b => {
      const dx = b.x - x;
      const dy = b.y - y;
      const dist = Math.hypot(dx, dy);
      if (dist < 260) {
        b.targetAngle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.4;
        b.angle = b.targetAngle;
        b.speed = 1.95;
        setTimeout(() => {
          b.speed = 0.75 + Math.random() * 0.4;
        }, 950);
      }
    });
  }

  if (sanctuaryZone) {
    sanctuaryZone.addEventListener('mousemove', e => {
      if (isTouchInteraction) return;
      mouseInSanctuary = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    sanctuaryZone.addEventListener('mouseenter', e => {
      if (isTouchInteraction) return;
      mouseInSanctuary = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    sanctuaryZone.addEventListener('mouseleave', () => {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    });

    sanctuaryZone.addEventListener('click', e => {
      if (isTouchInteraction) return;
      triggerShockwave(e.clientX, e.clientY);
    });

    sanctuaryZone.addEventListener('touchstart', e => {
      isTouchInteraction = true;
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;

      clearTimeout(touchResetTimer);
      touchResetTimer = setTimeout(() => {
        isTouchInteraction = false;
      }, 800);

      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        triggerShockwave(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    sanctuaryZone.addEventListener('touchend', () => {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    }, { passive: true });

    sanctuaryZone.addEventListener('touchcancel', () => {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    }, { passive: true });
  }

  window.addEventListener('scroll', () => {
    if (mouseInSanctuary && !isInsideSanctuary(mouseX, mouseY)) {
      mouseInSanctuary = false;
      mouseX = -1000;
      mouseY = -1000;
    }
  }, { passive: true });

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
      this.baseSpeed = 0.75 + Math.random() * 0.4; // Voo biológico sereno
      this.speed = this.baseSpeed;
      this.angle = Math.random() * Math.PI * 2;
      this.targetAngle = this.angle;
      this.turnRate = 0.03 + Math.random() * 0.02;

      this.isDeep = Math.random() > 0.6;
      this.alpha = this.isDeep ? (0.45 + Math.random() * 0.15) : (0.78 + Math.random() * 0.18);

      this.wingPhase = Math.random() * Math.PI * 2;
      this.wingSpeed = 0.14 + Math.random() * 0.08;
      this.glideTimer = 0;
      this.isGliding = false;

      this.wanderTimer = Math.floor(Math.random() * 120);
    }

    update(allButterflies) {
      // 1. Ciclo orgânico de bater de asas e planar suave
      if (this.glideTimer > 0) {
        this.glideTimer--;
        this.isGliding = true;
      } else {
        this.isGliding = false;
        this.wingPhase += this.wingSpeed;
        if (Math.random() < 0.008) {
          this.glideTimer = 30 + Math.floor(Math.random() * 45);
        }
      }

      // 2. Separação espacial entre indivíduos para voo natural sem sobreposição
      let sepX = 0;
      let sepY = 0;
      let neighbors = 0;
      const minDistance = 50;
      const minDistSq = minDistance * minDistance;

      for (let i = 0; i < allButterflies.length; i++) {
        const other = allButterflies[i];
        if (other === this) continue;
        const dx = this.x - other.x;
        if (Math.abs(dx) > minDistance) continue;
        const dy = this.y - other.y;
        if (Math.abs(dy) > minDistance) continue;
        const distSq = dx * dx + dy * dy;
        if (distSq > 0 && distSq < minDistSq) {
          const dist = Math.sqrt(distSq);
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

      // 3. Atração e revoada dinâmica ao cursor do mouse no santuário (idêntico à Lagoa de Lucas)
      if (mouseInSanctuary && !isTouchInteraction) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 420 && dist > 45) {
          const toMouse = Math.atan2(dy, dx);
          let diff = toMouse - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;

          const steer = Math.max(0.04, 0.16 * (1 - dist / 420));
          this.angle += diff * Math.min(1.0, steer);
          this.speed = Math.min(this.speed + 0.05, 1.85);
        } else if (dist <= 45) {
          // Órbita fluida graciosa em torno do cursor
          this.angle += 0.06;
          this.speed = Math.max(this.baseSpeed, this.speed * 0.96);
        } else {
          this.naturalWander();
        }
      } else {
        this.naturalWander();
      }

      // Movimentação com física suave
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Envoltório contínuo nas bordas da tela
      if (this.x < -60) this.x = width + 60;
      if (this.x > width + 60) this.x = -60;
      if (this.y < -60) this.y = height + 60;
      if (this.y > height + 60) this.y = -60;
    }

    naturalWander() {
      // Retorno gradual à cadência biológica tranquila
      if (this.speed > this.baseSpeed) {
        this.speed = Math.max(this.baseSpeed, this.speed * 0.985);
      }
      this.wanderTimer--;
      if (this.wanderTimer <= 0) {
        this.targetAngle += (Math.random() - 0.5) * 0.85;
        this.wanderTimer = 75 + Math.floor(Math.random() * 110);
      }
      let diff = this.targetAngle - this.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      this.angle += diff * this.turnRate;
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
      const colors = ['#8E6A3A', '#D4AF37', '#FEF08A', '#F5EFE6', '#58755C'];
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

  // População abundante de 100 borboletas em voo suave
  const count = 100;
  const butterflies = Array.from({ length: count }, () => new Butterfly());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // 1. Atualiza e desenha ondas de choque circulares (efeito ondulação)
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.018;
      if (sw.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(142, 106, 58, ${Math.max(0, sw.alpha * 0.65)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // 2. Atualiza e desenha as 100 borboletas
    for (let i = 0; i < butterflies.length; i++) {
      butterflies[i].update(butterflies);
      butterflies[i].draw(ctx);
    }

    // 3. Atualiza e desenha partículas de névoa de pólen
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
