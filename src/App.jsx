import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — Branco Científico
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  bg:      "#f7f8fa",
  surf:    "#ffffff",
  surfAlt: "#f0f2f6",
  bdr:     "#e2e6ed",
  bdrB:    "#c8cfd9",
  txt:     "#0f1623",
  mut:     "#5a6478",
  dim:     "#a0aab8",
  sm:      "#0066cc",
  smBg:    "#e8f0fb",
  bio:     "#00875a",
  bioBg:   "#e3f5ee",
  ok:      "#2d7a3a",
  okBg:    "#eaf5ec",
  fail:    "#c0392b",
  failBg:  "#fdf0ee",
  acc:     "#0052a3",
  accBg:   "#deeafb",
  orp:     "#7b2fa0",
  orpBg:   "#f3eafa",
  bt:      "#b35c00",
  btBg:    "#fff3e0",
  fic:     "#c0392b",
  ficBg:   "#fff0ee",
  shadow:  "0 2px 12px #0f162312",
  shadowH: "0 6px 24px #0f162320",
};

const YEARS = [2026,2025,2024,2023,2022];

// ─────────────────────────────────────────────────────────────────────────────
// PHYSICOCHEMICAL DATA
// ─────────────────────────────────────────────────────────────────────────────
const PC = {
  "orforglipron": {cid:137319706,f:"C48H48F2N10O5",mw:883.0,logp:6.8,hbd:1,hba:10,smiles:null},
  "relacorilant": {cid:137500072,f:"C4H8BrIO",mw:278.91,logp:2,hbd:1,hba:1,smiles:null},
  "linerixibat": {cid:53492727,f:"C28H38N2O7S",mw:546.7,logp:-1.6,hbd:4,hba:9,smiles:null},
  "difamilast": {cid:135565825,f:"C56H124N4O28",mw:1301.6,logp:2.3,hbd:24,hba:32,smiles:null},
  "milsaperidone": {cid:145068796,f:"C14H29NO4",mw:275.38,logp:3.5,hbd:0,hba:5,smiles:null},
  "tradipitant": {cid:11279236,f:"C16H15F3N2O3",mw:340.3,logp:4,hbd:2,hba:7,smiles:null},
  "aficamten": {cid:139331495,f:"C18H19N5O2",mw:337.4,logp:2.1,hbd:1,hba:5,smiles:null},
  "zoliflodacin": {cid:59261,f:"C15H26OS",mw:254.4,logp:4.7,hbd:1,hba:2,smiles:null},
  "sevabertinib": {cid:145490640,f:"C39H57N9O5",mw:731.9,logp:3.2,hbd:8,hba:8,smiles:null},
  "ziftomenib": {cid:164705437,f:"C52H46N2O2",mw:730.9,logp:13.7,hbd:1,hba:4,smiles:null},
  "elinzanetant": {cid:135724787,f:"C6H8N6O",mw:180.17,logp:-0.9,hbd:3,hba:5,smiles:null},
  "nerandomilast": {cid:145051049,f:"C40H58N4",mw:594.9,logp:2.4,hbd:2,hba:4,smiles:null},
  "remibrutinib": {cid:134693720,f:"C8H8N4",mw:160.18,logp:0.7,hbd:2,hba:2,smiles:null},
  "paltusotine": {cid:135695904,f:"C29H36N4O4S",mw:536.7,logp:6.7,hbd:1,hba:8,smiles:null},
  "imlunestrant": {cid:137538760,f:"C18H18N4O2S",mw:354.4,logp:2.4,hbd:2,hba:6,smiles:null},
  "rilzabrutinib": {cid:145051406,f:"C22H10S4",mw:402.6,logp:8.5,hbd:3,hba:4,smiles:null},
  "donidalorsen": {cid:135726233,f:"C16H18N4O8",mw:394.34,logp:-1,hbd:1,hba:10,smiles:null},
  "brensocatib": {cid:145051405,f:"C25H30S2",mw:394.6,logp:10.1,hbd:2,hba:2,smiles:null},
  "zongertinib": {cid:145054382,f:"C25H24N5O6P",mw:521.5,logp:0.6,hbd:3,hba:9,smiles:null},
  "dordaviprone": {cid:71726555,f:"C61H90IN15O12",mw:1352.4,logp:-0.7,hbd:15,hba:16,smiles:null},
  "aceclidine": {cid:2006,f:"C9H7N5O3",mw:233.18,logp:0.3,hbd:3,hba:6,smiles:null},
  "sepiapterin": {cid:135430,f:"C13H11ClNO4P",mw:311.66,logp:3.3,hbd:4,hba:4,smiles:null},
  "delgocitinib": {cid:129840478,f:"C17H13N5OS",mw:335.4,logp:2.7,hbd:1,hba:6,smiles:null},
  "sebetralstat": {cid:135695905,f:"C29H36N4O4S",mw:536.7,logp:6.7,hbd:1,hba:8,smiles:null},
  "sunvozertinib": {cid:145054383,f:"C24H20F2N4O6P-",mw:529.4,logp:2.2,hbd:1,hba:11,smiles:null},
  "taletrectinib": {cid:145054384,f:"C27H38F2N4O2",mw:488.6,logp:2.8,hbd:3,hba:7,smiles:null},
  "acoltremon": {cid:135398532,f:"C12H15N3O6Tc",mw:396.17,logp:3.1,hbd:4,hba:9,smiles:null},
  "avutometinib": {cid:117982328,f:"C20H24N4O3S",mw:400.5,logp:3,hbd:3,hba:6,smiles:null},
  "atrasentan": {cid:5311272,f:"C23H26F2N2O4",mw:432.5,logp:3.7,hbd:2,hba:6,smiles:null},
  "gepotidacin": {cid:71262730,f:"C21H20F2N4O3S",mw:446.5,logp:3.7,hbd:2,hba:9,smiles:null},
  "vimseltinib": {cid:145490641,f:"C40H55N5O3",mw:653.9,logp:3.5,hbd:2,hba:5,smiles:null},
  "mirdametinib": {cid:134729277,f:"C57H96O12S",mw:1005.4,logp:14.6,hbd:4,hba:12,smiles:null},
  "suzetrigine": {cid:156445116,f:"C21H20F5N3O4",mw:473.4,logp:3,hbd:2,hba:10,smiles:null},
  "treosulfan": {cid:449459,f:"C26H29NO2",mw:387.5,logp:6.8,hbd:1,hba:3,smiles:null},
  "ensartinib": {cid:44137675,f:"C22H24N4O4",mw:408.4,logp:2,hbd:2,hba:7,smiles:null},
  "crinecerfont": {cid:132654780,f:"C21H22N2O4",mw:366.4,logp:4.1,hbd:1,hba:4,smiles:null},
  "iomeprol": {cid:3741,f:"C18H24I3N3O9",mw:807.1,logp:-3,hbd:8,hba:9,smiles:null},
  "landiolol": {cid:123698,f:"C17H26ClNO",mw:295.8,logp:1.2,hbd:1,hba:2,smiles:null},
  "acoramidis": {cid:135478710,f:"C20H14N4O3",mw:358.3,logp:4.6,hbd:2,hba:6,smiles:null},
  "revumenib": {cid:134692940,f:"C19H18N4OS2",mw:382.5,logp:4.2,hbd:2,hba:6,smiles:null},
  "inavolisib": {cid:134696816,f:"C21H26N6O2",mw:394.5,logp:2.8,hbd:1,hba:8,smiles:null},
  "xanomeline": {cid:60809,f:"C14H23N3OS",mw:281.42,logp:3.3,hbd:0,hba:5,smiles:null},
  "levacetylleucine": {cid:107973,f:"C14H14NO5P",mw:307.24,logp:2.7,hbd:2,hba:5,smiles:null},
  "arimoclomol": {cid:9908088,f:"C17H25FN4O3S",mw:384.5,logp:1.7,hbd:2,hba:6,smiles:null},
  "daprodustat": {cid:25167983,f:"C24H26F3N7O3",mw:517.5,logp:6,hbd:3,hba:12,smiles:null},
  "mavorixafor": {cid:56843918,f:"C21H40I2N4O2",mw:634.4,logp:4.8,hbd:2,hba:4,smiles:null},
  "givinostat": {cid:9908089,f:"C16H20N2O5S2",mw:384.5,logp:1.1,hbd:2,hba:7,smiles:null},
  "resmetirom": {cid:15981237,f:"C17H12Cl2N6O4",mw:435.2,logp:2.7,hbd:2,hba:7,smiles:null},
  "pirtobrutinib": {cid:137401900,f:"C60H40N2",mw:789.0,logp:16.2,hbd:2,hba:6,smiles:null},
  "elacestrant": {cid:137393176,f:"C10H18O2",mw:170.25,logp:1.7,hbd:1,hba:2,smiles:null},
  "bexagliflozin": {cid:66827586,f:"C11H13Br",mw:225.12,logp:4.4,hbd:3,hba:7,smiles:null},
  "futibatinib": {cid:134717884,f:"C36H59NO7",mw:617.9,logp:9,hbd:2,hba:7,smiles:null},
  "repotrectinib": {cid:134679885,f:"C10H8F5NO4",mw:301.17,logp:2.8,hbd:2,hba:10,smiles:null},
  "zuranolone": {cid:9908090,f:"C25H20O2S",mw:384.5,logp:6,hbd:1,hba:3,smiles:null},
  "leniolisib": {cid:57448015,f:"C13H16ClF3N2O3S",mw:372.79,logp:3.6,hbd:2,hba:8,smiles:null},
  "vamorolone": {cid:9908087,f:"C22H28N2O4",mw:384.5,logp:4.3,hbd:1,hba:4,smiles:null},
  "ivosidenib": {cid:135398513,f:"C8H11N5O3",mw:225.2,logp:-1.9,hbd:3,hba:5,smiles:null},
  "olutasidenib": {cid:134710939,f:"C23H31NO5",mw:401.5,logp:3,hbd:1,hba:6,smiles:null},
  "mavacamten": {cid:135565924,f:"C25H36N6O4S",mw:516.7,logp:2.8,hbd:2,hba:8,smiles:null},
  "maribavir": {cid:132519,f:"C20H28N4O4",mw:388.5,logp:0.9,hbd:5,hba:4,smiles:null},
  "omaveloxolone": {cid:135565925,f:"C15H16N4O4S",mw:348.4,logp:0.7,hbd:4,hba:7,smiles:null},
  "daridorexant": {cid:135565926,f:"C18H24Br2N2",mw:428.2,logp:3.5,hbd:2,hba:2,smiles:null},
  "deucravacitinib": {cid:135592453,f:"C21H23N3OS",mw:365.5,logp:4.8,hbd:1,hba:4,smiles:null},
  "lenacapavir": {cid:163325079,f:"C22H17F29O4",mw:896.3,logp:9.3,hbd:1,hba:33,smiles:null},
  "trofinetide": {cid:57339595,f:"C20H20N6",mw:344.4,logp:4.1,hbd:3,hba:5,smiles:null},
  "sonrotoclax": {cid:149553242,f:"C49H59N7O7S",mw:890.1,logp:9.1,hbd:4,hba:11,smiles:null},
  "vepdegestrant": {cid:134562533,f:"C45H49N5O4",mw:723.9,logp:6.4,hbd:2,hba:7,smiles:null},
  "baxdrostat": {cid:71535962,f:"C22H25N3O2",mw:363.5,logp:2.2,hbd:1,hba:3,smiles:null},
  "ensitrelvir": {cid:162533924,f:"C22H17ClF3N9O2",mw:531.9,logp:2.5,hbd:1,hba:8,smiles:null},
  "cipepofol": {cid:86301664,f:"C14H20O",mw:204.31,logp:4.4,hbd:1,hba:1,smiles:null},
};

// ─────────────────────────────────────────────────────────────────────────────
// DRUG DATABASE
// ─────────────────────────────────────────────────────────────────────────────
const RAW = {
  2026:[
    // ── Junho 2026 ──
    {name:"Ambelvist",  ing:"gadoquatrane",             date:"2026-06-12",sponsor:"Bayer",route:"IV",moa:"Macrocyclic gadolinium-based MRI contrast agent (GBCA); shortens T1 relaxation time",atc:"V08CA",desig:["PR"],indication:"Detection and visualization of lesions with abnormal vascularity (CNS and non-CNS) in conjunction with MRI"},
    // ── Maio 2026 ──
    {name:"Cypsedo",    ing:"cipepofol",                date:"2026-05-29",sponsor:"Haisco Pharmaceutical",route:"IV",moa:"GABA-A positive allosteric modulator; ~4-5× more potent than propofol with faster onset and shorter recovery",atc:"N01AX",desig:["PR"],indication:"Induction of general anesthesia in adults undergoing surgery"},
    {name:"Xocova",     ing:"ensitrelvir",              date:"2026-05-29",sponsor:"Shionogi",route:"PO",moa:"Non-covalent SARS-CoV-2 3CL protease (Mpro) inhibitor; blocks viral polyprotein processing without requiring ritonavir boosting",atc:"J05AE",desig:["BT","PR","FIC"],indication:"Post-exposure prophylaxis (PEP) of COVID-19 in adults and adolescents ≥12 years"},
    {name:"Zaynich",    ing:"cefepime and zidebactam",  date:"2026-05-29",sponsor:"Wockhardt",route:"IV",moa:"Cefepime (4th-gen cephalosporin, PBP inhibitor) + zidebactam (non-β-lactam BLI that also enhances PBP2 binding); active against ESBL and carbapenem-resistant Gram-negatives",atc:"J01DI",desig:["PR"],indication:"Complicated urinary tract infections (cUTI) including pyelonephritis in adults"},
    {name:"Decnupaz",   ing:"pivekimab sunirine-pvzy",  date:"2026-05-27",sponsor:"AbbVie",route:"IV",moa:"CD123-directed antibody-drug conjugate (ADC); delivers DNA-alkylating payload selectively to CD123-overexpressing BPDCN cells",atc:"L01FD",desig:["OD","BT","PR"],indication:"Blastic plasmacytoid dendritic cell neoplasm (BPDCN) in adults"},
    {name:"Hepcludex",  ing:"bulevirtide-gmod",         date:"2026-05-22",sponsor:"Gilead Sciences",route:"SC",moa:"Lipopeptide entry inhibitor; mimics HBsAg preS1 domain and blocks NTCP receptor to prevent HDV and HBV hepatocyte entry",atc:"J05AX",desig:["AA","BT","OD","PR","FIC"],indication:"Chronic hepatitis delta virus (HDV) infection in adults without or with compensated cirrhosis"},
    {name:"Baxfendy",   ing:"baxdrostat",               date:"2026-05-15",sponsor:"AstraZeneca",route:"PO",moa:"First-in-class highly selective aldosterone synthase (CYP11B2) inhibitor; reduces aldosterone production and blood pressure without materially affecting cortisol",atc:"C02KX",desig:["FIC","PR"],indication:"Hypertension in combination with other antihypertensive drugs in adults not adequately controlled"},
    {name:"Beqalzi",    ing:"sonrotoclax",              date:"2026-05-13",sponsor:"BeOne Medicines",route:"PO",moa:"Next-generation BCL-2 inhibitor designed for greater potency and selectivity; restores apoptosis in BCL-2-overexpressing lymphoma cells with improved TLS risk profile vs. earlier BCL-2 inhibitors",atc:"L01XK",desig:["AA","BT","PR"],indication:"Relapsed or refractory mantle cell lymphoma after ≥2 lines of therapy including a BTK inhibitor"},
    // ── Maio 2026 (antes do dia 13) ──
    {name:"Veppanu",    ing:"vepdegestrant",            date:"2026-05-01",sponsor:"Arvinas / Pfizer",route:"PO",moa:"First-in-class PROTAC (PROteolysis TArgeting Chimera); recruits E3 ligase CRBN to ERα, triggering its proteasomal degradation — eliminates receptor rather than merely blocking it",atc:"L02BA",desig:["BT","PR","FIC"],indication:"ESR1-mutated, ER+/HER2- advanced or metastatic breast cancer after ≥1 line of endocrine therapy"},
    // ── Abril 2026 ──
    {name:"Idvynso",    ing:"doravirine and islatravir",date:"2026-04-20",sponsor:"Merck",route:"PO",moa:"NNRTI (doravirine) + nucleoside reverse transcriptase translocation inhibitor (islatravir); dual mechanism complete HIV-1 regimen",atc:"J05AR",desig:["BT","PR"],indication:"HIV-1 infection in virologically-suppressed adults on a stable ARV regimen with no history of virologic failure"},
    {name:"Foundayo",   ing:"orforglipron",             date:"2026-04-01",sponsor:"Eli Lilly",route:"PO",moa:"Non-peptide oral GLP-1 receptor agonist; first oral small-molecule GLP-1RA",atc:"A10BJ",desig:["FIC"],indication:"Obesity or overweight with ≥1 weight-related comorbidity in adults — long-term weight management"},
    // ── Março 2026 ──
    {name:"Awiqli",     ing:"insulin icodec-abae",      date:"2026-03-26",sponsor:"Novo Nordisk",route:"SC",moa:"Once-weekly basal insulin analogue with reversible albumin binding for prolonged half-life (~196 h)",atc:"A10AE",desig:[],indication:"Glycemic control in adults with type 2 diabetes mellitus"},
    {name:"Lifyorli",   ing:"relacorilant",             date:"2026-03-25",sponsor:"Corcept Therapeutics",route:"PO",moa:"Selective glucocorticoid receptor modulator (SGRM); sensitizes ovarian cancer cells to nab-paclitaxel by blocking GR-mediated chemoresistance",atc:"L01XK",desig:["OD","PR"],indication:"Platinum-resistant epithelial ovarian, fallopian tube, or primary peritoneal cancer (1–3 prior regimens including bevacizumab)"},
    {name:"Avlayah",    ing:"tividenofusp alfa-eknm",   date:"2026-03-24",sponsor:"Takeda",route:"IV",moa:"Recombinant iduronate-2-sulfatase (IDS) with CNS delivery technology; enzyme replacement therapy restoring GAG catabolism",atc:"A16AB",desig:["OD","BT","PR"],indication:"Hunter syndrome (Mucopolysaccharidosis type II, MPS II)"},
    {name:"Icotyde",    ing:"icotrokinra",              date:"2026-03-17",sponsor:"Johnson & Johnson",route:"SC",moa:"IL-23 receptor peptide antagonist; blocks IL-23 signaling to reduce Th17-driven inflammation",atc:"L04AC",desig:["BT"],indication:"Moderate-to-severe plaque psoriasis in patients ≥12 years weighing ≥40 kg"},
    {name:"Lynavoy",    ing:"linerixibat",              date:"2026-03-17",sponsor:"GSK",route:"PO",moa:"Ileal bile acid transporter (IBAT) inhibitor; reduces bile acid reabsorption and pruritus-mediating bile acid levels",atc:"A05AX",desig:["BT","PR"],indication:"Cholestatic pruritus associated with primary biliary cholangitis (PBC)"},
    // ── Fevereiro 2026 ──
    {name:"Yuviwel",    ing:"navepegritide",            date:"2026-02-27",sponsor:"Takeda",route:"SC",moa:"PEGylated C-type natriuretic peptide (CNP) analogue; stimulates endochondral bone growth via NPR-B receptor",atc:"H05AA",desig:["OD","BT","AA"],indication:"Achondroplasia — increase linear growth in pediatric patients ≥2 years with open epiphyses"},
    {name:"Loargys",    ing:"pegzilarginase-nbln",      date:"2026-02-23",sponsor:"Aeglea BioTherapeutics",route:"IV",moa:"PEGylated recombinant human arginase 1; hydrolyzes plasma arginine, correcting hyperarginemia in ARG1 deficiency",atc:"A16AB",desig:["OD","BT","PR"],indication:"Hyperarginemia in Arginase 1 Deficiency in adults and pediatric patients ≥2 years"},
    {name:"Bysanti",    ing:"milsaperidone",            date:"2026-02-20",sponsor:"Vanda Pharmaceuticals",route:"PO",moa:"D2/5-HT2A antagonist (iloperidone prodrug with improved tolerability profile)",atc:"N05AX",desig:[],indication:"Schizophrenia; manic or mixed episodes associated with bipolar I disorder"},
    {name:"Adquey",     ing:"difamilast",               date:"2026-02-12",sponsor:"Otsuka",route:"TOP",moa:"Topical PDE4 inhibitor; reduces cAMP hydrolysis and downstream inflammatory cytokine production in skin",atc:"D11AH",desig:[],indication:"Mild to moderate atopic dermatitis"},
    // ── Janeiro 2026 ──
    {name:"Zycubo",     ing:"copper histidinate",       date:"2026-01-12",sponsor:"Eton Pharmaceuticals",route:"SC",moa:"Bioavailable copper complex; restores copper-dependent enzyme activity (dopamine β-hydroxylase, etc.) in Menkes disease",atc:"A12CB",desig:["OD","BT","PR"],indication:"Menkes disease"},
  ],
  2025:[
    {name:"Nereus",     ing:"tradipitant",         date:"2025-12-30",sponsor:"Vanda Pharmaceuticals",route:"PO",moa:"NK1 receptor antagonist",atc:"A04AD",desig:[],indication:"Vomiting associated with motion sickness"},
    {name:"Yartemlea",  ing:"narsoplimab-wuug",    date:"2025-12-23",sponsor:"Omeros",route:"IV",moa:"MASP-2 inhibitor (lectin pathway complement)",atc:"L04AA",desig:["OD","BT","PR"],indication:"HSCT-associated thrombotic microangiopathy"},
    {name:"Myqorzo",    ing:"aficamten",           date:"2025-12-19",sponsor:"Cytokinetics",route:"PO",moa:"Cardiac myosin inhibitor",atc:"C01BX",desig:["BT","PR"],indication:"Symptomatic obstructive hypertrophic cardiomyopathy"},
    {name:"Exdensur",   ing:"depemokimab-ulaa",    date:"2025-12-16",sponsor:"GSK",route:"SC",moa:"Anti-IL-5 monoclonal antibody",atc:"R03DX",desig:[],indication:"Severe eosinophilic asthma (add-on maintenance)"},
    {name:"Cardamyst",  ing:"etripamil",           date:"2025-12-12",sponsor:"Milestone Scientific",route:"IN",moa:"L-type calcium channel blocker (intranasal)",atc:"C08DA",desig:["FIC","BT"],indication:"Paroxysmal supraventricular tachycardia"},
    {name:"Nuzolvence", ing:"zoliflodacin",        date:"2025-12-12",sponsor:"Entasis Therapeutics",route:"PO",moa:"Topoisomerase II inhibitor (novel spiropyrimidinetrione)",atc:"J01XX",desig:["FIC","BT","PR"],indication:"Uncomplicated urogenital gonorrhea"},
    {name:"Lerochol",   ing:"lerodalcibep-liga",   date:"2025-12-12",sponsor:"LIB Therapeutics",route:"SC",moa:"PCSK9 inhibitor (adnectin fusion protein)",atc:"C10AX",desig:[],indication:"Hypercholesterolemia including HeFH"},
    {name:"Voyxact",    ing:"sibeprenlimab-szsi",  date:"2025-11-25",sponsor:"Visterra/Otsuka",route:"SC",moa:"Anti-APRIL monoclonal antibody",atc:"L04AA",desig:["BT","PR"],indication:"Primary IgA nephropathy (proteinuria reduction)"},
    {name:"Hyrnuo",     ing:"sevabertinib",        date:"2025-11-19",sponsor:"Zymeworks",route:"PO",moa:"HER2 tyrosine kinase inhibitor (exon 20)",atc:"L01EH",desig:["BT","PR"],indication:"Locally advanced/metastatic non-squamous NSCLC with HER2 mutations"},
    {name:"Redemplo",   ing:"plozasiran",          date:"2025-11-18",sponsor:"Arrowhead Pharmaceuticals",route:"SC",moa:"APOC3 siRNA (RNA interference)",atc:"C10AX",desig:["OD","BT","PR"],indication:"Familial chylomicronemia syndrome (triglyceride reduction)"},
    {name:"Komzifti",   ing:"ziftomenib",          date:"2025-11-13",sponsor:"Kura Oncology",route:"PO",moa:"Menin–MLL interaction inhibitor",atc:"L01XK",desig:["OD","BT","PR"],indication:"Relapsed/refractory AML with NPM1 mutation"},
    {name:"Lynkuet",    ing:"elinzanetant",        date:"2025-10-24",sponsor:"Bayer",route:"PO",moa:"NK3 receptor antagonist",atc:"G02CX",desig:["FIC","BT"],indication:"Moderate-to-severe vasomotor symptoms due to menopause"},
    {name:"Jascayd",    ing:"nerandomilast",       date:"2025-10-07",sponsor:"Boehringer Ingelheim",route:"PO",moa:"PDE4B selective inhibitor",atc:"R03DX",desig:["BT","PR"],indication:"Idiopathic pulmonary fibrosis"},
    {name:"Rhapsido",   ing:"remibrutinib",        date:"2025-09-30",sponsor:"Novartis",route:"PO",moa:"BTK inhibitor (non-covalent)",atc:"L01EL",desig:[],indication:"Chronic spontaneous urticaria"},
    {name:"Palsonify",  ing:"paltusotine",         date:"2025-09-25",sponsor:"Crinetics Pharmaceuticals",route:"PO",moa:"Somatostatin receptor 2/5 agonist (oral small molecule)",atc:"H01CB",desig:["FIC","BT"],indication:"Acromegaly"},
    {name:"Inluriyo",   ing:"imlunestrant",        date:"2025-09-25",sponsor:"Eli Lilly",route:"PO",moa:"Selective estrogen receptor degrader (SERD)",atc:"L02BA",desig:["BT","PR"],indication:"ER+/HER2−/ESR1-mutated advanced/metastatic breast cancer"},
    {name:"Wayrilz",    ing:"rilzabrutinib",       date:"2025-08-29",sponsor:"Sanofi",route:"PO",moa:"BTK inhibitor (non-covalent, reversible)",atc:"L01EL",desig:["BT","PR"],indication:"Persistent/chronic immune thrombocytopenia"},
    {name:"Dawnzera",   ing:"donidalorsen",        date:"2025-08-21",sponsor:"KalVista",route:"PO",moa:"Plasma kallikrein inhibitor",atc:"B06AC",desig:["OD","BT","PR"],indication:"Hereditary angioedema prevention"},
    {name:"Brinsupri",  ing:"brensocatib",         date:"2025-08-12",sponsor:"Insmed",route:"PO",moa:"DPP1 (dipeptidyl peptidase 1) inhibitor",atc:"R05CB",desig:["FIC","BT","PR"],indication:"Non-cystic fibrosis bronchiectasis"},
    {name:"Hernexeos",  ing:"zongertinib",         date:"2025-08-08",sponsor:"Boehringer Ingelheim",route:"PO",moa:"HER2 tyrosine kinase inhibitor (wild-type sparing)",atc:"L01EH",desig:["BT","PR"],indication:"Unresectable/metastatic non-squamous NSCLC with HER2 mutations"},
    {name:"Modeyso",    ing:"dordaviprone",        date:"2025-08-06",sponsor:"Day One Biopharmaceuticals",route:"PO",moa:"IDH1/IDH2-independent glioma agent (PDGFRA modulator)",atc:"L01XK",desig:["OD","BT","AA","PR"],indication:"Diffuse midline glioma H3 K27M mutation"},
    {name:"Vizz",       ing:"aceclidine",          date:"2025-07-31",sponsor:"Orasis Pharmaceuticals",route:"OCUL",moa:"Muscarinic M3 agonist (miosis induction)",atc:"S01EB",desig:[],indication:"Presbyopia"},
    {name:"Sephience",  ing:"sepiapterin",         date:"2025-07-28",sponsor:"PTC Therapeutics",route:"PO",moa:"BH4 precursor / PAH cofactor supplementation",atc:"A16AX",desig:["OD","BT","PR"],indication:"Sepiapterin-responsive phenylketonuria"},
    {name:"Anzupgo",    ing:"delgocitinib",        date:"2025-07-23",sponsor:"LEO Pharma",route:"TOP",moa:"Pan-JAK inhibitor (topical)",atc:"D11AH",desig:["BT"],indication:"Moderate-to-severe chronic hand eczema"},
    {name:"Ekterly",    ing:"sebetralstat",        date:"2025-07-03",sponsor:"KalVista",route:"PO",moa:"Plasma kallikrein inhibitor",atc:"B06AC",desig:["OD","BT","PR"],indication:"Acute hereditary angioedema attacks"},
    {name:"Zegfrovy",   ing:"sunvozertinib",       date:"2025-07-02",sponsor:"Dizal Pharma",route:"PO",moa:"EGFR exon 20 insertion-selective TKI",atc:"L01EB",desig:["OD","BT","PR"],indication:"Locally advanced/metastatic NSCLC with EGFR exon 20 insertion mutations"},
    {name:"Ibtrozi",    ing:"taletrectinib",       date:"2025-06-11",sponsor:"Roche",route:"PO",moa:"ROS1/NTRK tyrosine kinase inhibitor (CNS-active)",atc:"L01EX",desig:["BT","PR"],indication:"Locally advanced/metastatic ROS1-positive NSCLC"},
    {name:"Tryptyr",    ing:"acoltremon",          date:"2025-05-28",sponsor:"Ocuphire Pharma",route:"OCUL",moa:"TRPM8 ion channel agonist",atc:"S01XA",desig:["FIC"],indication:"Dry eye disease"},
    {name:"Avmapki Fakzynja",ing:"avutometinib and defactinib",date:"2025-05-08",sponsor:"Verastem Oncology",route:"PO",moa:"MEK + FAK dual inhibitor",atc:"L01EE",desig:["OD","BT","PR"],indication:"KRAS-mutated recurrent low-grade serous ovarian cancer"},
    {name:"Vanrafia",   ing:"atrasentan",          date:"2025-04-02",sponsor:"Chinook Therapeutics/Novartis",route:"PO",moa:"Endothelin A receptor antagonist",atc:"C02KX",desig:["BT","PR"],indication:"Primary IgA nephropathy — proteinuria reduction"},
    {name:"Blujepa",    ing:"gepotidacin",         date:"2025-03-25",sponsor:"GSK",route:"PO",moa:"Bacterial topoisomerase II inhibitor (novel triazaacenaphthylene)",atc:"J01XX",desig:["FIC","BT","PR"],indication:"Uncomplicated urinary tract infections"},
    {name:"Romvimza",   ing:"vimseltinib",         date:"2025-02-14",sponsor:"Deciphera Pharmaceuticals",route:"PO",moa:"CSF1R kinase inhibitor",atc:"L01EX",desig:["OD","BT","PR"],indication:"Symptomatic tenosynovial giant cell tumor"},
    {name:"Gomekli",    ing:"mirdametinib",        date:"2025-02-11",sponsor:"SpringWorks Therapeutics",route:"PO",moa:"MEK1/2 inhibitor",atc:"L01EE",desig:["OD","BT","PR"],indication:"NF1 with symptomatic plexiform neurofibromas"},
    {name:"Journavx",   ing:"suzetrigine",         date:"2025-01-30",sponsor:"Vertex Pharmaceuticals",route:"PO",moa:"Nav1.8 voltage-gated sodium channel blocker",atc:"N02BG",desig:["FIC","BT","PR"],indication:"Moderate to severe acute pain"},
    {name:"Grafapex",   ing:"treosulfan",          date:"2025-01-21",sponsor:"Medac",route:"IV",moa:"Bifunctional alkylating agent (prodrug)",atc:"L01BB",desig:["OD"],indication:"Preparative regimen for allogeneic HSCT in AML and MDS"},
  ],
  2024:[
    {name:"Alhemo",     ing:"concizumab-mtci",     date:"2024-12-20",sponsor:"Novo Nordisk",route:"SC",moa:"Anti-TFPI monoclonal antibody",atc:"B02BD",desig:["OD","BT","PR"],indication:"Hemophilia A and B bleeding prophylaxis"},
    {name:"Alyftrek",   ing:"vanzacaftor/tezacaftor/deutivacaftor",date:"2024-12-20",sponsor:"Vertex Pharmaceuticals",route:"PO",moa:"CFTR modulator triple combination",atc:"R07AX",desig:["BT","PR"],indication:"Cystic fibrosis ≥6 years"},
    {name:"Tryngolza",  ing:"olezarsen",           date:"2024-12-19",sponsor:"Ionis/AstraZeneca",route:"SC",moa:"APOC3 antisense oligonucleotide",atc:"C10AX",desig:["OD","BT","PR"],indication:"Familial chylomicronemia syndrome"},
    {name:"Ensacove",   ing:"ensartinib",          date:"2024-12-18",sponsor:"Xcovery",route:"PO",moa:"ALK/ROS1/MET tyrosine kinase inhibitor",atc:"L01ED",desig:["BT","PR"],indication:"ALK-positive non-small cell lung cancer"},
    {name:"Crenessity", ing:"crinecerfont",        date:"2024-12-13",sponsor:"Neurocrine Biosciences",route:"PO",moa:"CRF1 receptor antagonist",atc:"H02AB",desig:["OD","BT","PR","FIC"],indication:"Classic congenital adrenal hyperplasia"},
    {name:"Unloxcyt",   ing:"cosibelimab-ipdl",    date:"2024-12-13",sponsor:"Checkpoint Therapeutics",route:"IV",moa:"Anti-PD-L1 monoclonal antibody",atc:"L01FF",desig:["BT","PR"],indication:"Cutaneous squamous cell carcinoma"},
    {name:"Bizengri",   ing:"zenocutuzumab-zbco",  date:"2024-12-04",sponsor:"Merus",route:"IV",moa:"HER2xHER3 bispecific antibody (NRG1 fusion inhibitor)",atc:"L01FX",desig:["OD","BT","PR","FIC"],indication:"NSCLC and pancreatic adenocarcinoma with NRG1 fusions"},
    {name:"Wainua",     ing:"eplontersen",         date:"2024-12-21",sponsor:"AstraZeneca/Ionis",route:"SC",moa:"ASO targeting TTR mRNA",atc:"M09AX",desig:["OD","BT","PR"],indication:"Polyneuropathy of hereditary transthyretin-mediated amyloidosis"},
    {name:"Jaypirca (CLL)",ing:"pirtobrutinib",   date:"2024-12-27",sponsor:"Eli Lilly",route:"PO",moa:"Non-covalent reversible BTK inhibitor",atc:"L01EL",desig:["BT","PR"],indication:"Relapsed/refractory CLL/SLL >=2 prior lines"},
    {name:"Columvi (FL)",ing:"glofitamab-gxbm",   date:"2024-12-05",sponsor:"Roche/Genentech",route:"IV",moa:"CD20xCD3 bispecific T-cell engager",atc:"L01FX",desig:["BT","PR"],indication:"Relapsed/refractory follicular lymphoma >=2 prior lines"},
    {name:"Iomervu",    ing:"iomeprol",            date:"2024-11-27",sponsor:"Bracco",route:"IV",moa:"Non-ionic iodinated contrast agent",atc:"V08AB",desig:[],indication:"Radiographic contrast agent"},
    {name:"Rapiblyk",   ing:"landiolol",           date:"2024-11-22",sponsor:"AOP Orphan Pharmaceuticals",route:"IV",moa:"Ultra-short-acting beta1-selective blocker",atc:"C07AB",desig:["OD"],indication:"Supraventricular tachycardia (IV)"},
    {name:"Attruby",    ing:"acoramidis",          date:"2024-11-22",sponsor:"BridgeBio Pharma",route:"PO",moa:"Transthyretin (TTR) stabilizer",atc:"C01EX",desig:["BT","PR"],indication:"Transthyretin-mediated amyloid cardiomyopathy"},
    {name:"Ziihera",    ing:"zanidatamab-hrii",    date:"2024-11-20",sponsor:"Jazz/Zymeworks",route:"IV",moa:"HER2-targeting bispecific antibody",atc:"L01FX",desig:["OD","BT","PR"],indication:"Unresectable/metastatic HER2-positive biliary tract cancer"},
    {name:"Revuforj",   ing:"revumenib",           date:"2024-11-15",sponsor:"Syndax Pharmaceuticals",route:"PO",moa:"Menin-MLL interaction inhibitor",atc:"L01XK",desig:["OD","BT","PR","FIC"],indication:"Relapsed/refractory acute leukemia with KMT2A translocation or NPM1 mutation"},
    {name:"Aucatzyl",   ing:"obecabtagene autoleucel",date:"2024-11-08",sponsor:"Autolus Therapeutics",route:"IV",moa:"CAR-T cell therapy (anti-CD19)",atc:"L01XL",desig:["BT","PR"],indication:"Relapsed/refractory B-cell ALL >=18 years"},
    {name:"Orlynvah",   ing:"sulopenem etzadroxil and probenecid",date:"2024-10-25",sponsor:"Iterion Therapeutics",route:"PO",moa:"Oral penem beta-lactam + probenecid",atc:"J01DH",desig:["BT","PR"],indication:"Uncomplicated urinary tract infections"},
    {name:"Vyloy",      ing:"zolbetuximab-clzb",   date:"2024-10-18",sponsor:"Astellas",route:"IV",moa:"Anti-claudin 18.2 (CLDN18.2) monoclonal antibody",atc:"L01FX",desig:["BT","PR","FIC"],indication:"Gastric/GEJ adenocarcinoma (CLDN18.2+/HER2-)"},
    {name:"Hympavzi",   ing:"marstacimab-hncq",    date:"2024-10-11",sponsor:"Pfizer",route:"SC",moa:"Anti-TFPI monoclonal antibody",atc:"B02BD",desig:["OD","BT","PR"],indication:"Hemophilia A or B bleeding prevention"},
    {name:"Itovebi",    ing:"inavolisib",          date:"2024-10-10",sponsor:"Genentech/Roche",route:"PO",moa:"PI3Ka inhibitor",atc:"L01EM",desig:["BT","PR"],indication:"PIK3CA-mutated HR+/HER2- locally advanced/metastatic breast cancer"},
    {name:"Flyrcado",   ing:"flurpiridaz F 18",    date:"2024-09-27",sponsor:"GE Healthcare",route:"IV",moa:"PET myocardial perfusion imaging agent (mitochondrial complex I)",atc:"V09GX",desig:["FIC","BT","PR"],indication:"Myocardial ischemia/infarction PET imaging"},
    {name:"Cobenfy",    ing:"xanomeline",          date:"2024-09-26",sponsor:"Bristol-Myers Squibb",route:"PO",moa:"M1/M4 muscarinic agonist + peripheral anticholinergic (trospium)",atc:"N05AX",desig:["FIC","BT","PR"],indication:"Schizophrenia (novel non-dopaminergic mechanism)"},
    {name:"Aqneursa",   ing:"levacetylleucine",    date:"2024-09-24",sponsor:"IntraBio",route:"PO",moa:"Neuronal membrane stabilizer (acetyl amino acid)",atc:"N07XX",desig:["OD","PR"],indication:"Niemann-Pick disease type C"},
    {name:"Miplyffa",   ing:"arimoclomol",         date:"2024-09-20",sponsor:"Zevra Therapeutics",route:"PO",moa:"HSP amplifier / heat shock protein co-inducer",atc:"N07XX",desig:["OD","BT","PR"],indication:"Niemann-Pick disease type C"},
    {name:"Ebglyss",    ing:"lebrikizumab-lbkz",   date:"2024-09-13",sponsor:"Eli Lilly",route:"SC",moa:"Anti-IL-13 monoclonal antibody",atc:"D11AH",desig:["BT"],indication:"Moderate-to-severe atopic dermatitis >=12 years"},
    {name:"Tepezza",    ing:"teprotumumab-trbw",   date:"2024-08-14",sponsor:"Horizon/Amgen",route:"IV",moa:"Anti-IGF-1R monoclonal antibody",atc:"H05AA",desig:["OD","BT","PR","FIC"],indication:"Thyroid eye disease (non-active/chronic)"},
    {name:"Vafseo",     ing:"daprodustat",         date:"2024-08-28",sponsor:"GSK",route:"PO",moa:"HIF prolyl hydroxylase (HIF-PH) inhibitor",atc:"B03XA",desig:["FIC"],indication:"Anemia in dialysis-dependent chronic kidney disease"},
    {name:"Pharvaris",  ing:"deucrictibant",       date:"2024-08-09",sponsor:"Pharvaris",route:"PO",moa:"Bradykinin B2 receptor antagonist",atc:"B06AC",desig:["OD","BT","PR"],indication:"Hereditary angioedema (on-demand treatment)"},
    {name:"Hepzato Kit",ing:"melphalan",           date:"2024-08-14",sponsor:"Delcath Systems",route:"IV",moa:"Bifunctional alkylating agent (hepatic arterial infusion)",atc:"L01AA",desig:["OD","BT","PR"],indication:"Unresectable hepatic metastases from uveal melanoma"},
    {name:"Omvoh (Crohn's)",ing:"mirikizumab-mrkz",date:"2024-08-01",sponsor:"Eli Lilly",route:"IV",moa:"Anti-IL-23p19 monoclonal antibody",atc:"L04AC",desig:["BT","PR"],indication:"Moderately to severely active Crohn's disease"},
    {name:"Leqselvi",   ing:"deuruxolitinib",      date:"2024-06-21",sponsor:"Sun Pharma/Concert",route:"PO",moa:"JAK1/2 inhibitor (deuterated ruxolitinib)",atc:"L04AF",desig:["BT","PR"],indication:"Severe alopecia areata >=18 years"},
    {name:"Iqirvo",     ing:"elafibranor",         date:"2024-06-10",sponsor:"Ipsen",route:"PO",moa:"PPARa/d agonist",atc:"A05AA",desig:["OD","BT","PR"],indication:"Primary biliary cholangitis"},
    {name:"Ojemda",     ing:"tovorafenib",         date:"2024-04-23",sponsor:"Day One Biopharmaceuticals",route:"PO",moa:"RAF kinase inhibitor (type II, brain-penetrant)",atc:"L01EX",desig:["OD","BT","PR"],indication:"Pediatric low-grade glioma with BRAF alteration >=6 months"},
    {name:"Xolremdi",   ing:"mavorixafor",         date:"2024-04-26",sponsor:"X4 Pharmaceuticals",route:"PO",moa:"CXCR4 receptor antagonist",atc:"L04AX",desig:["OD","BT","PR","FIC"],indication:"WHIM syndrome"},
    {name:"Winlevi",    ing:"clascoterone",        date:"2024-05-10",sponsor:"Cassiopea",route:"TOP",moa:"Androgen receptor antagonist (topical)",atc:"D10AX",desig:["FIC","BT","PR"],indication:"Acne vulgaris"},
    {name:"Iclusig",    ing:"ponatinib",           date:"2024-05-21",sponsor:"Takeda",route:"PO",moa:"Pan-BCR-ABL/FGFR/VEGFR TKI (3rd gen)",atc:"L01EG",desig:["BT","PR"],indication:"CML and Ph+ ALL (pediatric indication)"},
    {name:"Aliqopa",    ing:"copanlisib",          date:"2024-07-01",sponsor:"Bayer",route:"IV",moa:"Pan-PI3K inhibitor",atc:"L01EM",desig:["BT","PR"],indication:"Relapsed/refractory follicular lymphoma >=2 prior therapies"},
    {name:"Zunveyl",    ing:"benzgalantamine",     date:"2024-07-26",sponsor:"Alpha Cognition",route:"PO",moa:"AChE inhibitor (galantamine prodrug)",atc:"N06DA",desig:["BT"],indication:"Alzheimer's disease"},
    {name:"Olinvyk",    ing:"oliceridine",         date:"2024-07-19",sponsor:"Trevena",route:"IV",moa:"mu-opioid receptor agonist (G-protein biased)",atc:"N02AA",desig:["FIC","BT"],indication:"Moderate-to-severe acute pain (IV)"},
    {name:"Duvyzat",    ing:"givinostat",          date:"2024-03-22",sponsor:"Italfarmaco",route:"PO",moa:"Pan-HDAC inhibitor",atc:"L01XH",desig:["OD","BT","PR"],indication:"Duchenne muscular dystrophy >=6 years"},
    {name:"Rezdiffra",  ing:"resmetirom",          date:"2024-03-14",sponsor:"Madrigal Pharmaceuticals",route:"PO",moa:"Thyroid hormone receptor beta (THRbeta) agonist",atc:"A05BA",desig:["FIC","BT","PR"],indication:"Non-cirrhotic MASH with liver fibrosis"},
    {name:"Eylea HD",   ing:"aflibercept",         date:"2024-08-23",sponsor:"Regeneron",route:"OCUL",moa:"VEGF/PlGF trap (high-dose 8mg extended dosing)",atc:"S01LA",desig:["BT","PR"],indication:"Neovascular AMD and DME (extended 8mg dosing)"},
  ],
  2023:[
    {name:"Leqembi",    ing:"lecanemab-irmb",      date:"2023-01-06",sponsor:"Eisai/Biogen",route:"IV",moa:"Anti-amyloid beta (Aβ) monoclonal antibody",atc:"N06DX",desig:["BT","PR","AA"],indication:"Alzheimer's disease (early stage)"},
    {name:"Brenzavvy",  ing:"bexagliflozin",       date:"2023-01-20",sponsor:"TheracosBio",route:"PO",moa:"SGLT2 inhibitor",atc:"A10BK",desig:[],indication:"Type 2 diabetes mellitus"},
    {name:"Jaypirca",   ing:"pirtobrutinib",       date:"2023-01-27",sponsor:"Eli Lilly",route:"PO",moa:"Non-covalent reversible BTK inhibitor",atc:"L01EL",desig:["BT","PR","FIC"],indication:"Relapsed/refractory mantle cell lymphoma"},
    {name:"Orserdu",    ing:"elacestrant",         date:"2023-01-27",sponsor:"Stemline Therapeutics",route:"PO",moa:"Selective estrogen receptor degrader (SERD)",atc:"L02BA",desig:["PR"],indication:"ER+/HER2−/ESR1-mutated advanced/metastatic breast cancer"},
    {name:"Jesduvroq",  ing:"daprodustat",         date:"2023-02-01",sponsor:"GSK",route:"PO",moa:"HIF prolyl hydroxylase inhibitor",atc:"B03XA",desig:["FIC"],indication:"Anemia due to chronic kidney disease (dialysis)"},
    {name:"Lamzede",    ing:"velmanase alfa-tycv", date:"2023-02-16",sponsor:"Chiesi",route:"IV",moa:"Recombinant human alpha-mannosidase (ERT)",atc:"A16AB",desig:["OD","BT","PR"],indication:"Non-CNS manifestations of alpha-mannosidosis"},
    {name:"Filspari",   ing:"sparsentan",          date:"2023-02-17",sponsor:"Travere Therapeutics",route:"PO",moa:"Dual endothelin/angiotensin receptor antagonist",atc:"C09XA",desig:["OD","BT","PR","FIC"],indication:"Primary IgA nephropathy — proteinuria reduction"},
    {name:"Skyclarys",  ing:"omaveloxolone",       date:"2023-02-28",sponsor:"Reata Pharmaceuticals",route:"PO",moa:"Nrf2 activator",atc:"N07XX",desig:["OD","BT","PR","FIC"],indication:"Friedreich's ataxia ≥16 years"},
    {name:"Zavzpret",   ing:"zavegepant",          date:"2023-03-09",sponsor:"Pfizer",route:"IN",moa:"CGRP receptor antagonist (intranasal)",atc:"N02CD",desig:["FIC","BT","PR"],indication:"Acute migraine treatment"},
    {name:"Daybue",     ing:"trofinetide",         date:"2023-03-10",sponsor:"Acadia Pharmaceuticals",route:"PO",moa:"IGF-1 tripeptide analog (GPE analog)",atc:"N07XX",desig:["OD","BT","PR","FIC"],indication:"Rett syndrome ≥2 years"},
    {name:"Zynyz",      ing:"retifanlimab-dlwr",   date:"2023-03-22",sponsor:"Incyte",route:"IV",moa:"Anti-PD-1 monoclonal antibody",atc:"L01FF",desig:["BT","PR","AA"],indication:"Metastatic or recurrent locally advanced Merkel cell carcinoma"},
    {name:"Rezzayo",    ing:"rezafungin",          date:"2023-03-22",sponsor:"Cidara Therapeutics",route:"IV",moa:"Echinocandin antifungal (glucan synthase inhibitor)",atc:"J02AX",desig:["BT","PR"],indication:"Candidemia and invasive candidiasis"},
    {name:"Joenja",     ing:"leniolisib",          date:"2023-03-24",sponsor:"Pharming Technologies",route:"PO",moa:"PI3Kδ selective inhibitor",atc:"L04AX",desig:["OD","BT","PR"],indication:"Activated PI3K delta syndrome (APDS)"},
    {name:"Qalsody",    ing:"tofersen",            date:"2023-04-25",sponsor:"Biogen",route:"IT",moa:"Antisense oligonucleotide (SOD1 mRNA knockdown)",atc:"M09AX",desig:["OD","BT","AA"],indication:"ALS with SOD1 gene mutation"},
    {name:"Elfabrio",   ing:"pegunigalsidase alfa-iwxj",date:"2023-05-09",sponsor:"Protalix/Chiesi",route:"IV",moa:"Pegylated recombinant alpha-galactosidase A (ERT)",atc:"A16AB",desig:["OD","BT","PR"],indication:"Fabry disease"},
    {name:"Veozah",     ing:"fezolinetant",        date:"2023-05-12",sponsor:"Astellas",route:"PO",moa:"NK3 receptor antagonist",atc:"G02CX",desig:["FIC","BT","PR"],indication:"Moderate-to-severe vasomotor symptoms due to menopause"},
    {name:"Miebo",      ing:"perfluorhexyloctane", date:"2023-05-18",sponsor:"Bausch & Lomb",route:"OCUL",moa:"Semifluorinated alkane (evaporation barrier)",atc:"S01XA",desig:["FIC","BT","PR"],indication:"Dry eye disease (evaporative)"},
    {name:"Epkinly",    ing:"epcoritamab-bysp",    date:"2023-05-19",sponsor:"AbbVie/Genmab",route:"SC",moa:"CD3×CD20 bispecific antibody",atc:"L01FX",desig:["BT","PR","AA"],indication:"Relapsed/refractory diffuse large B-cell lymphoma"},
    {name:"Xacduro",    ing:"sulbactam, durlobactam",date:"2023-05-23",sponsor:"Entasis/Pfizer",route:"IV",moa:"β-lactam + β-lactamase inhibitor (OXA-51 inhibitor)",atc:"J01CG",desig:["FIC","BT","PR"],indication:"Hospital-acquired/ventilator-associated pneumonia due to A. baumannii"},
    {name:"Paxlovid",   ing:"nirmatrelvir, ritonavir",date:"2023-05-25",sponsor:"Pfizer",route:"PO",moa:"3CL protease inhibitor + CYP3A4 booster",atc:"J05AE",desig:["BT","PR"],indication:"Mild-to-moderate COVID-19 in high-risk adults"},
    {name:"Posluma",    ing:"flotufolastat F 18",  date:"2023-05-25",sponsor:"Blue Earth Diagnostics",route:"IV",moa:"PSMA-targeted PET imaging agent",atc:"V09GX",desig:["BT","PR"],indication:"Prostate cancer PET imaging"},
    {name:"Inpefa",     ing:"sotagliflozin",       date:"2023-05-26",sponsor:"Lexicon Pharmaceuticals",route:"PO",moa:"Dual SGLT1/SGLT2 inhibitor",atc:"C10BX",desig:["BT","PR"],indication:"Heart failure"},
    {name:"Columvi",    ing:"glofitamab-gxbm",     date:"2023-06-15",sponsor:"Roche/Genentech",route:"IV",moa:"CD20×CD3 bispecific T-cell engager",atc:"L01FX",desig:["BT","PR","AA"],indication:"Relapsed/refractory diffuse large B-cell lymphoma ≥2 prior lines"},
    {name:"Litfulo",    ing:"ritlecitinib",        date:"2023-06-23",sponsor:"Pfizer",route:"PO",moa:"JAK3/TEC family kinase inhibitor",atc:"L04AF",desig:["BT","PR"],indication:"Alopecia areata (severe patchy hair loss) ≥12 years"},
    {name:"Rystiggo",   ing:"rozanolixizumab-noli",date:"2023-06-26",sponsor:"UCB",route:"SC",moa:"Anti-FcRn monoclonal antibody",atc:"L04AA",desig:["BT","PR"],indication:"Generalized myasthenia gravis (AChR- or MuSK-antibody positive)"},
    {name:"Ngenla",     ing:"somatrogon-ghla",     date:"2023-06-27",sponsor:"Pfizer",route:"SC",moa:"Weekly recombinant human growth hormone",atc:"H01AC",desig:["BT","PR"],indication:"Growth failure due to growth hormone deficiency (pediatric)"},
    {name:"Beyfortus",  ing:"nirsevimab-alip",     date:"2023-07-17",sponsor:"AstraZeneca/Sanofi",route:"IM",moa:"Anti-RSV F-protein monoclonal antibody",atc:"J06BD",desig:["BT","PR"],indication:"RSV lower respiratory tract disease prevention (neonates/infants)"},
    {name:"Vanflyta",   ing:"quizartinib",         date:"2023-07-20",sponsor:"Daiichi Sankyo",route:"PO",moa:"FLT3 kinase inhibitor",atc:"L01EX",desig:["BT","PR"],indication:"Newly diagnosed FLT3-ITD+ acute myeloid leukemia"},
    {name:"Xdemvy",     ing:"lotilaner",           date:"2023-07-25",sponsor:"Tarsus Pharmaceuticals",route:"OCUL",moa:"GABA-gated chloride channel antagonist (antiparasitic)",atc:"S01AX",desig:["FIC","BT","PR"],indication:"Demodex blepharitis"},
    {name:"Zurzuvae",   ing:"zuranolone",          date:"2023-08-04",sponsor:"Sage/Biogen",route:"PO",moa:"GABAA receptor positive allosteric modulator (neuroactive steroid)",atc:"N06AX",desig:["FIC","BT","PR"],indication:"Postpartum depression; major depressive disorder"},
    {name:"Izervay",    ing:"avacincaptad pegol",  date:"2023-08-04",sponsor:"Astellas/IVERIC bio",route:"OCUL",moa:"Anti-C5 complement inhibitor (pegylated aptamer)",atc:"S01XA",desig:["BT","PR"],indication:"Geographic atrophy secondary to AMD"},
    {name:"Talvey",     ing:"talquetamab-tgvs",    date:"2023-08-09",sponsor:"Janssen",route:"SC",moa:"GPRC5D×CD3 bispecific T-cell engager",atc:"L01FX",desig:["OD","BT","PR","AA"],indication:"Relapsed/refractory multiple myeloma ≥4 prior lines"},
    {name:"Elrexfio",   ing:"elranatamab-bcmm",    date:"2023-08-14",sponsor:"Pfizer",route:"SC",moa:"BCMA×CD3 bispecific T-cell engager",atc:"L01FX",desig:["OD","BT","PR","AA"],indication:"Relapsed/refractory multiple myeloma ≥4 prior lines"},
    {name:"Ivosidenib", ing:"ivosidenib",          date:"2023-08-24",sponsor:"Servier",route:"PO",moa:"IDH1 mutant inhibitor",atc:"L01XK",desig:["OD","BT","PR"],indication:"IDH1-mutated cholangiocarcinoma (new indication)"},
    {name:"Lytgobi",    ing:"futibatinib",         date:"2023-09-30",sponsor:"Taiho Oncology",route:"PO",moa:"FGFR1-4 covalent inhibitor",atc:"L01EN",desig:["OD","BT","PR"],indication:"Locally advanced/metastatic intrahepatic cholangiocarcinoma with FGFR2 fusions"},
    {name:"Agamree",    ing:"vamorolone",          date:"2023-10-26",sponsor:"Santhera Pharmaceuticals",route:"PO",moa:"Dissociative glucocorticoid (NF-κB modulator, no GR transactivation)",atc:"M09AX",desig:["OD","BT","PR","FIC"],indication:"Duchenne muscular dystrophy ≥2 years"},
    {name:"Omvoh",      ing:"mirikizumab-mrkz",    date:"2023-10-26",sponsor:"Eli Lilly",route:"IV/SC",moa:"Anti-IL-23p19 monoclonal antibody",atc:"L04AC",desig:["BT"],indication:"Moderately to severely active ulcerative colitis"},
    {name:"Loqtorzi",   ing:"toripalimab-tpzi",    date:"2023-10-27",sponsor:"Coherus/Junshi",route:"IV",moa:"Anti-PD-1 monoclonal antibody",atc:"L01FF",desig:["BT","PR"],indication:"Recurrent/metastatic nasopharyngeal carcinoma"},
    {name:"Rivfloza",   ing:"nedosiran",           date:"2023-10-02",sponsor:"Dicerna/Novo Nordisk",route:"SC",moa:"LDHA siRNA (RNA interference)",atc:"A16AX",desig:["OD","BT","PR"],indication:"Primary hyperoxaluria type 1 ≥9 years"},
    {name:"Augtyro",    ing:"repotrectinib",       date:"2023-11-15",sponsor:"Bristol-Myers Squibb",route:"PO",moa:"ROS1/NTRK inhibitor (CNS-penetrant, compact macrocycle)",atc:"L01EX",desig:["OD","BT","PR"],indication:"ROS1-positive NSCLC"},
    {name:"Rezlidhia",  ing:"olutasidenib",        date:"2023-12-01",sponsor:"Rigel Pharmaceuticals",route:"PO",moa:"IDH1 mutant inhibitor",atc:"L01XK",desig:["OD","PR"],indication:"Relapsed/refractory AML with IDH1 mutation"},
    {name:"Niktimvo",   ing:"axatilimab-csfr",     date:"2023-08-29",sponsor:"Syndax",route:"IV",moa:"Anti-CSF-1R monoclonal antibody",atc:"L04AA",desig:["OD","BT","PR"],indication:"Chronic graft-versus-host disease (≥2 prior lines)"},
    {name:"Velsipity",  ing:"etrasimod",           date:"2023-10-12",sponsor:"Pfizer/Arena",route:"PO",moa:"Selective S1P1/4/5 receptor modulator",atc:"L04AJ",desig:["BT","PR"],indication:"Moderately to severely active ulcerative colitis ≥16 years"},
    {name:"Ogsiveo",    ing:"nirogacestat",        date:"2023-11-09",sponsor:"SpringWorks",route:"PO",moa:"γ-secretase inhibitor",atc:"L01XK",desig:["OD","BT","PR","FIC"],indication:"Progressing desmoid tumors"},
    {name:"Wainua",     ing:"eplontersen",         date:"2023-12-21",sponsor:"AstraZeneca/Ionis",route:"SC",moa:"Antisense oligonucleotide targeting TTR mRNA",atc:"M09AX",desig:["OD","BT","PR"],indication:"Polyneuropathy of hereditary transthyretin-mediated amyloidosis"},
    {name:"Filsuvez",   ing:"birch triterpenes",   date:"2023-12-18",sponsor:"Amryt Pharma",route:"TOP",moa:"Triterpene wound healing agent (mechanism unclear)",atc:"D03AX",desig:["OD","BT","PR"],indication:"Epidermolysis bullosa wound treatment ≥6 months"},
    {name:"Camzyos",    ing:"mavacamten",          date:"2023-04-28",sponsor:"Bristol-Myers Squibb",route:"PO",moa:"Cardiac myosin inhibitor",atc:"C01BX",desig:["FIC","BT","PR"],indication:"Obstructive hypertrophic cardiomyopathy"},
  ],
  2022:[
    {name:"Quviviq",    ing:"daridorexant",        date:"2022-01-07",sponsor:"Idorsia",route:"PO",moa:"Dual orexin receptor antagonist (DORA)",atc:"N05CF",desig:["FIC"],indication:"Insomnia"},
    {name:"Kimmtrak",   ing:"tebentafusp-tebn",    date:"2022-01-25",sponsor:"Immunocore",route:"IV",moa:"gp100×CD3 ImmTAC bispecific (TCR-based)",atc:"L01FX",desig:["OD","BT","PR","FIC"],indication:"Unresectable or metastatic uveal melanoma"},
    {name:"Vabysmo",    ing:"faricimab-svoa",      date:"2022-01-28",sponsor:"Genentech/Roche",route:"OCUL",moa:"Dual anti-VEGF-A/anti-Ang-2 bispecific antibody",atc:"S01LA",desig:["BT","PR","FIC"],indication:"Neovascular AMD and diabetic macular edema"},
    {name:"Enjaymo",    ing:"sutimlimab-jome",     date:"2022-02-04",sponsor:"Sanofi",route:"IV",moa:"Anti-C1s complement inhibitor",atc:"L04AA",desig:["OD","BT","PR","FIC"],indication:"Hemolytic anemia in cold agglutinin disease"},
    {name:"Pyrukynd",   ing:"mitapivat",           date:"2022-02-17",sponsor:"Agios",route:"PO",moa:"Pyruvate kinase R (PKR) activator",atc:"B03AX",desig:["OD","BT","PR","FIC"],indication:"Hemolytic anemia in pyruvate kinase deficiency"},
    {name:"Vonjo",      ing:"pacritinib",          date:"2022-02-28",sponsor:"CTI BioPharma",route:"PO",moa:"JAK2/FLT3/IRAK1/CSF1R inhibitor",atc:"L01EJ",desig:["OD","BT","PR"],indication:"Intermediate/high-risk myelofibrosis with severe thrombocytopenia"},
    {name:"Ztalmy",     ing:"ganaxolone",          date:"2022-03-18",sponsor:"Marinus Pharmaceuticals",route:"PO",moa:"GABAA receptor positive allosteric modulator (neuroactive steroid)",atc:"N03AX",desig:["OD","BT","PR"],indication:"Seizures in CDKL5 deficiency disorder ≥2 years"},
    {name:"Opdualag",   ing:"nivolumab and relatlimab-rmbw",date:"2022-03-18",sponsor:"BMS",route:"IV",moa:"Anti-PD-1 + anti-LAG-3 fixed-dose combination",atc:"L01FF",desig:["BT","PR","FIC"],indication:"Unresectable/metastatic melanoma ≥12 years"},
    {name:"Pluvicto",   ing:"lutetium Lu 177 vipivotide tetraxetan",date:"2022-03-23",sponsor:"Novartis",route:"IV",moa:"PSMA-targeted radioligand therapy",atc:"V10XX",desig:["BT","PR"],indication:"PSMA-positive mCRPC (post-ARPI and taxane)"},
    {name:"Camzyos",    ing:"mavacamten",          date:"2022-04-28",sponsor:"MyoKardia/BMS",route:"PO",moa:"Cardiac myosin inhibitor",atc:"C01BX",desig:["FIC","BT","PR"],indication:"Symptomatic obstructive hypertrophic cardiomyopathy"},
    {name:"Vivjoa",     ing:"oteseconazole",       date:"2022-04-26",sponsor:"Mycovia",route:"PO",moa:"CYP51 inhibitor (highly selective fungal)",atc:"J02AC",desig:["FIC","BT","PR"],indication:"Recurrent vulvovaginal candidiasis"},
    {name:"Livtencity", ing:"maribavir",           date:"2022-05-17",sponsor:"Takeda",route:"PO",moa:"UL97 kinase inhibitor (anti-CMV)",atc:"J05AB",desig:["OD","BT","PR","FIC"],indication:"Refractory CMV infection/disease post-transplant"},
    {name:"Mounjaro",   ing:"tirzepatide",         date:"2022-05-13",sponsor:"Eli Lilly",route:"SC",moa:"Dual GIP/GLP-1 receptor agonist",atc:"A10BJ",desig:["BT","PR","FIC"],indication:"Type 2 diabetes mellitus"},
    {name:"Vtama",      ing:"tapinarof",           date:"2022-05-23",sponsor:"Dermavant",route:"TOP",moa:"AhR agonist (topical)",atc:"D05AX",desig:["FIC","BT","PR"],indication:"Plaque psoriasis ≥18 years"},
    {name:"Voquezna",   ing:"vonoprazan, amoxicillin",date:"2022-05-03",sponsor:"Phathom Pharmaceuticals",route:"PO",moa:"Potassium-competitive acid blocker (P-CAB) + antibiotic",atc:"J01FA",desig:["FIC","BT","PR"],indication:"H. pylori infection eradication"},
    {name:"Amvuttra",   ing:"vutrisiran",          date:"2022-06-13",sponsor:"Alnylam",route:"SC",moa:"TTR-targeting siRNA (RNA interference)",atc:"M09AX",desig:["OD","BT","PR"],indication:"Polyneuropathy of hereditary transthyretin-mediated amyloidosis"},
    {name:"Xenpozyme",  ing:"olipudase alfa-rpcp", date:"2022-08-31",sponsor:"Sanofi",route:"IV",moa:"Recombinant acid sphingomyelinase (ERT)",atc:"A16AB",desig:["OD","BT","PR","FIC"],indication:"Non-CNS acid sphingomyelinase deficiency"},
    {name:"Ngenla",     ing:"somatrogon-ghla",     date:"2022-08-25",sponsor:"Pfizer/OPKO",route:"SC",moa:"Weekly recombinant human growth hormone",atc:"H01AC",desig:["BT","PR"],indication:"Pediatric growth hormone deficiency"},
    {name:"Daxxify",    ing:"daxibotulinumtoxinA-lanm",date:"2022-09-07",sponsor:"Revance Therapeutics",route:"IM",moa:"Clostridium botulinum toxin type A (RHOCC peptide formulation)",atc:"M03AX",desig:["BT","PR"],indication:"Moderate-to-severe glabellar lines"},
    {name:"Sotyktu",    ing:"deucravacitinib",     date:"2022-09-09",sponsor:"Bristol-Myers Squibb",route:"PO",moa:"TYK2 allosteric inhibitor (pseudokinase domain)",atc:"L04AC",desig:["FIC","BT","PR"],indication:"Moderate-to-severe plaque psoriasis"},
    {name:"Rolvedon",   ing:"eflapegrastim",       date:"2022-09-09",sponsor:"Spectrum Pharmaceuticals",route:"SC",moa:"Pegylated G-CSF receptor agonist",atc:"L03AA",desig:["BT"],indication:"Febrile neutropenia prophylaxis in myelosuppressive chemotherapy"},
    {name:"Terlivaz",   ing:"terlipressin",        date:"2022-09-14",sponsor:"Mallinckrodt",route:"IV",moa:"Vasopressin V1 receptor agonist",atc:"H01BA",desig:["OD","PR"],indication:"Hepatorenal syndrome type 1"},
    {name:"Elucirem",   ing:"gadopiclenol",        date:"2022-09-21",sponsor:"Guerbet",route:"IV",moa:"Macrocyclic gadolinium MRI contrast agent",atc:"V08CA",desig:["BT","PR"],indication:"MRI contrast for CNS and body lesions"},
    {name:"Omlonti",    ing:"omidenepag isopropyl",date:"2022-09-22",sponsor:"Santen",route:"OCUL",moa:"Selective EP2 prostanoid receptor agonist",atc:"S01EE",desig:["FIC","BT","PR"],indication:"Open-angle glaucoma or ocular hypertension"},
    {name:"Relyvrio",   ing:"sodium phenylbutyrate and taurursodiol",date:"2022-09-29",sponsor:"Amylyx Pharmaceuticals",route:"PO",moa:"Mitochondria protectant + ER stress reducer",atc:"N07XX",desig:["BT","PR"],indication:"Amyotrophic lateral sclerosis"},
    {name:"Lytgobi",    ing:"futibatinib",         date:"2022-09-30",sponsor:"Taiho Oncology",route:"PO",moa:"FGFR1-4 covalent inhibitor",atc:"L01EN",desig:["OD","BT","PR"],indication:"Intrahepatic cholangiocarcinoma with FGFR2 fusions"},
    {name:"Imjudo",     ing:"tremelimumab",        date:"2022-10-21",sponsor:"AstraZeneca",route:"IV",moa:"Anti-CTLA-4 monoclonal antibody",atc:"L01FF",desig:["BT","PR"],indication:"Unresectable hepatocellular carcinoma (with durvalumab)"},
    {name:"Tecvayli",   ing:"teclistamab-cqyv",    date:"2022-10-25",sponsor:"Janssen",route:"SC",moa:"BCMA×CD3 bispecific T-cell engager",atc:"L01FX",desig:["OD","BT","PR","AA"],indication:"Relapsed/refractory multiple myeloma ≥4 prior lines"},
    {name:"Elahere",    ing:"mirvetuximab soravtansine-gynx",date:"2022-11-14",sponsor:"ImmunoGen",route:"IV",moa:"Anti-FRα ADC (maytansinoid payload)",atc:"L01FD",desig:["OD","BT","PR","AA"],indication:"Platinum-resistant ovarian cancer (FRα-positive)"},
    {name:"Tzield",     ing:"teplizumab-mzwv",     date:"2022-11-18",sponsor:"Provention Bio/Sanofi",route:"IV",moa:"Anti-CD3 monoclonal antibody (T-cell modulator)",atc:"L04AA",desig:["OD","BT","PR","FIC"],indication:"Delay onset of stage 3 type 1 diabetes"},
    {name:"Rezlidhia",  ing:"olutasidenib",        date:"2022-12-01",sponsor:"Forma Therapeutics/Novo Nordisk",route:"PO",moa:"IDH1 mutant inhibitor",atc:"L01XK",desig:["OD","PR"],indication:"Relapsed/refractory AML with IDH1 mutation"},
    {name:"Krazati",    ing:"adagrasib",           date:"2022-12-12",sponsor:"Mirati Therapeutics",route:"PO",moa:"KRAS G12C covalent inhibitor",atc:"L01XK",desig:["BT","PR","FIC"],indication:"KRAS G12C-mutated locally advanced/metastatic NSCLC"},
    {name:"Lunsumio",   ing:"mosunetuzumab-axgb",  date:"2022-12-22",sponsor:"Genentech/Roche",route:"IV",moa:"CD20×CD3 bispecific T-cell engager",atc:"L01FX",desig:["OD","BT","PR","AA"],indication:"Relapsed/refractory follicular lymphoma ≥2 prior lines"},
    {name:"Sunlenca",   ing:"lenacapavir",         date:"2022-12-22",sponsor:"Gilead Sciences",route:"SC",moa:"HIV-1 capsid inhibitor (multimodal)",atc:"J05AX",desig:["OD","BT","PR","FIC"],indication:"HIV-1 infection (heavily treatment-experienced)"},
    {name:"Skyclarys",  ing:"omaveloxolone",       date:"2022-12-23",sponsor:"Reata Pharmaceuticals",route:"PO",moa:"Nrf2 activator (NF-κB inhibitor)",atc:"N07XX",desig:["OD","BT","PR","FIC"],indication:"Friedreich's ataxia ≥16 years"},
    {name:"Xenoview",   ing:"hyperpolarized xenon Xe-129",date:"2022-12-23",sponsor:"Polarean Imaging",route:"IH",moa:"Hyperpolarized noble gas MRI contrast agent",atc:"V08DA",desig:["FIC","BT","PR"],indication:"Pulmonary function evaluation and imaging"},
    {name:"NexoBrid",   ing:"anacaulase-bcdb",     date:"2022-12-28",sponsor:"MediWound/Ferring",route:"TOP",moa:"Bromelain-derived enzymatic debridement agent",atc:"D03BA",desig:["OD","BT","PR","FIC"],indication:"Eschar removal in deep partial/full thickness thermal burns"},
    {name:"Briumvi",    ing:"ublituximab-xiiy",    date:"2022-12-28",sponsor:"TG Therapeutics",route:"IV",moa:"Anti-CD20 monoclonal antibody (glycoengineered)",atc:"L04AA",desig:["BT","PR"],indication:"Relapsing forms of multiple sclerosis"},
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Biologic detection
// ─────────────────────────────────────────────────────────────────────────────
function isBiologic(ing) {
  return /-(mab|cept|alfa|beta|gamma|deruxtecan|vedotin|wuug|szsi|hrii|hncq|tllv|kcqx|cfor|aahu|bcmm|tgvs|mrkz|irmb|lbkz|trbw|dlnk|nbln|ipdl|zbco|clzb|mtci|ulaa|eknm|gcpt|liga|dpyl|jome|actl|gmod|pvzy)\b/i.test(ing) ||
    /\b(narsoplimab|sibeprenlimab|depemokimab|icotrokinra|navepegritide|pegzilarginase|tividenofusp|concizumab|linvoseltamab|garadacimab|clesrovimab|telisotuzumab|nipocalimab|penpulimab|datopotamab|pembrolizumab|plozasiran|fitusiran|vutrisiran|nedosiran|olezarsen|tofersen|insulin icodec|bulevirtide|pivekimab)\b/i.test(ing);
}

function processData(raw) {
  const result = {};
  for (const [year, list] of Object.entries(raw)) {
    const seen = new Set();
    result[parseInt(year)] = list
      .filter(d => { if (seen.has(d.name)) return false; seen.add(d.name); return true; })
      .map((d, i) => {
        const bio = isBiologic(d.ing);
        const key = d.ing.split(/[\/,]/)[0].trim().toLowerCase();
        const pc  = bio ? null : (PC[key] || null);
        return { id:`${year}-${i}`, year:parseInt(year), ...d, type: bio?"biologic":"small_molecule", pc };
      })
      .sort((a,b) => b.date.localeCompare(a.date));
  }
  return result;
}

const DB = processData(RAW);

// ─────────────────────────────────────────────────────────────────────────────
// Ro5
// ─────────────────────────────────────────────────────────────────────────────
function ro5(pc) {
  if (!pc || pc.mw==null || pc.logp==null || pc.hbd==null || pc.hba==null) return null;
  const v=[pc.mw>500,pc.hbd>5,pc.hba>10,pc.logp>5].filter(Boolean).length;
  return {v, ok:v===0, mw:pc.mw, logp:pc.logp, hbd:pc.hbd, hba:pc.hba};
}

function fmtDate(s) {
  if (!s) return "—";
  return new Date(s+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});
}

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURE CANVAS — RDKit.js (renderização local via SMILES)
// ─────────────────────────────────────────────────────────────────────────────

let _rdkit = null;
let _rdkitLoading = false;
let _rdkitCallbacks = [];

function loadRDKit(cb) {
  if (_rdkit) { cb(_rdkit); return; }
  _rdkitCallbacks.push(cb);
  if (_rdkitLoading) return;
  _rdkitLoading = true;

  // Carrega o script do RDKit via CDN
  const s = document.createElement("script");
  s.src = "https://unpkg.com/@rdkit/rdkit/Code/MinimalLib/dist/RDKit_minimal.js";
  s.onload = () => {
    window.initRDKitModule().then(rdk => {
      _rdkit = rdk;
      _rdkitCallbacks.forEach(fn => fn(rdk));
      _rdkitCallbacks = [];
    });
  };
  document.head.appendChild(s);
}

function StructureCanvas({ smiles, cid }) {
  const ref = useRef();
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"

  useEffect(() => {
    if (!smiles || !ref.current) { setStatus("error"); return; }
    setStatus("loading");

    loadRDKit(rdk => {
      try {
        const mol = rdk.get_mol(smiles);
        if (!mol) { setStatus("error"); return; }

        // Gera SVG limpo com fundo branco
        const svg = mol.get_svg_with_highlight(
          JSON.stringify({
            width: 220, height: 220,
            bondLineWidth: 1.5,
            addStereoAnnotation: true,
            backgroundColour: [1, 1, 1, 1], // branco
          })
        );
        mol.delete(); // libera memória

        if (ref.current) {
          ref.current.innerHTML = svg;
          // Garante que o SVG ocupe 100% do container
          const svgEl = ref.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "220px";
            svgEl.style.height = "220px";
          }
          setStatus("ok");
        }
      } catch (e) {
        setStatus("error");
      }
    });
  }, [smiles]);

  return (
    <div style={{ width: 220, height: 220, position: "relative" }}>
      {/* Container do SVG */}
      <div
        ref={ref}
        style={{
          width: 220, height: 220,
          borderRadius: 8,
          border: `1px solid ${C.bdr}`,
          background: "#fff",
          display: status === "error" ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      />

      {/* Loading */}
      {status === "loading" && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 8,
          border: `1px solid ${C.bdr}`, background: C.surfAlt,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.dim, fontSize: 11,
        }}>
          Loading structure...
        </div>
      )}

      {/* Erro */}
      {status === "error" && (
        <div style={{
          width: 220, height: 220, borderRadius: 8,
          border: `1px dashed ${C.bdr}`, background: C.surfAlt,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C.dim, fontSize: 11, textAlign: "center", padding: 12,
        }}>
          Structure not available
        </div>
      )}
    </div>
  );
}

// ─────���───────────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const DESIG_META = {
  FIC:{ label:"First-in-Class", color:C.fic,  bg:C.ficBg  },
  BT: { label:"Breakthrough",   color:C.bt,   bg:C.btBg   },
  OD: { label:"Orphan Drug",    color:C.orp,  bg:C.orpBg  },
  PR: { label:"Priority Review",color:C.acc,  bg:C.accBg  },
  FT: { label:"Fast Track",     color:C.mut,  bg:C.surfAlt},
  AA: { label:"Accel. Approval",color:"#5b6",  bg:"#eefbf0"},
};

function DesBadge({ code }) {
  const m = DESIG_META[code];
  if (!m) return null;
  return <span style={{padding:"2px 6px",borderRadius:4,fontSize:9,fontWeight:700,
    letterSpacing:"0.06em",textTransform:"uppercase",
    background:m.bg,color:m.color,border:`1px solid ${m.color}33`}}>{m.label}</span>;
}

function TypeBadge({ bio }) {
  return <span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:700,
    letterSpacing:"0.06em",textTransform:"uppercase",
    background:bio?C.bioBg:C.smBg,color:bio?C.bio:C.sm,
    border:`1px solid ${bio?C.bio:C.sm}44`}}>{bio?"Biologic":"Small Mol."}</span>;
}

const ROUTE_LABEL = {PO:"Oral",IV:"Intravenous",SC:"Subcutaneous",IM:"Intramuscular",
  IN:"Intranasal",TOP:"Topical",OCUL:"Ocular",IH:"Inhaled"};

function DrugCard({ drug, onClick }) {
  const bio = drug.type==="biologic";
  const accent = bio?C.bio:C.sm;
  const r5 = !bio && ro5(drug.pc);
  return (
    <div onClick={onClick} style={{background:C.surf,border:`1px solid ${C.bdr}`,
      borderRadius:10,padding:"15px 16px",cursor:"pointer",
      boxShadow:C.shadow,transition:"all 0.16s",position:"relative",overflow:"hidden"}}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow=C.shadowH;e.currentTarget.style.borderColor=C.bdrB;e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow=C.shadow;e.currentTarget.style.borderColor=C.bdr;e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,
        background:`linear-gradient(90deg,${accent},${accent}22)`}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8,marginTop:2}}>
        <TypeBadge bio={bio}/>
        <span style={{fontSize:10,color:C.mut,fontWeight:500}}>{fmtDate(drug.date)}</span>
      </div>
      <div style={{fontSize:14,fontWeight:700,color:C.txt,lineHeight:1.3,marginBottom:2}}>{drug.name}</div>
      <div style={{fontSize:11,color:C.mut,fontStyle:"italic",marginBottom:4}}>{drug.ing}</div>
      <div style={{fontSize:11,color:C.acc,fontWeight:600,marginBottom:6}}>{drug.sponsor}</div>
      <div style={{fontSize:11,color:C.mut,lineHeight:1.45,
        display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",marginBottom:8}}>
        {drug.moa}
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
        {(drug.desig||[]).map(d=><DesBadge key={d} code={d}/>)}
      </div>
      {!bio && r5 && (
        <div style={{fontSize:10,fontWeight:600,
          color:r5.ok?C.ok:C.fail}}>
          {r5.ok?"✓ Lipinski Ro5":"⚠ Ro5 violation"} · MW {r5.mw} · LogP {r5.logp}
        </div>
      )}
      <div style={{fontSize:10,color:C.dim,textAlign:"right",marginTop:6}}>View details →</div>
    </div>
  );
}

function PropTooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{position:"relative",display:"inline-flex",alignItems:"center",gap:3}}>
      {children}
      <span
        onMouseEnter={()=>setShow(true)}
        onMouseLeave={()=>setShow(false)}
        onClick={()=>setShow(s=>!s)}
        style={{
          display:"inline-flex",alignItems:"center",justifyContent:"center",
          width:14,height:14,borderRadius:"50%",
          background:C.accBg,color:C.acc,
          fontSize:9,fontWeight:800,cursor:"pointer",
          border:`1px solid ${C.acc}44`,flexShrink:0,
          userSelect:"none",
        }}>?</span>
      {show && (
        <span style={{
          position:"absolute",bottom:"calc(100% + 6px)",left:0,
          background:C.txt,color:"#fff",
          fontSize:11,lineHeight:1.5,
          padding:"7px 10px",borderRadius:7,
          width:220,zIndex:100,
          boxShadow:"0 4px 16px #0003",
          pointerEvents:"none",
        }}>
          {text}
          <span style={{position:"absolute",bottom:-5,left:10,
            width:10,height:10,background:C.txt,
            transform:"rotate(45deg)",borderRadius:2}}/>
        </span>
      )}
    </span>
  );
}

const PROP_TIPS = {
  "HBD": "Hydrogen Bond Donors — groups that donate H in H-bonds (–OH, –NH). Lipinski rule: ≤ 5. Higher values reduce oral absorption.",
  "HBA": "Hydrogen Bond Acceptors — groups that accept H-bonds (O, N atoms). Lipinski rule: ≤ 10. Higher values reduce membrane permeability.",
  "LogP": "Lipophilicity (octanol/water partition coefficient). Lipinski rule: ≤ 5. Higher values indicate poor aqueous solubility.",
  "MW":   "Molecular Weight. Lipinski rule: ≤ 500 Da. Larger molecules tend to have poor oral bioavailability.",
};

function Prop({ label, value }) {
  if (value==null||value==="") return null;
  const tip = PROP_TIPS[label];
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",
      padding:"5px 0",borderBottom:`1px solid ${C.bdr}`,fontSize:12}}>
      <span style={{color:C.mut,fontWeight:500}}>
        {tip ? <PropTooltip text={tip}>{label}</PropTooltip> : label}
      </span>
      <span style={{color:C.txt,fontFamily:"monospace",fontWeight:600}}>{value}</span>
    </div>
  );
}

function Modal({ drug, onClose }) {
  const bio = drug.type==="biologic";
  const pc  = drug.pc;
  const r5  = ro5(pc);

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:999,
      background:"#0f162355",backdropFilter:"blur(4px)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:16,
      animation:"fadeIn .18s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.surf,
        border:`1px solid ${C.bdr}`,borderRadius:16,
        boxShadow:"0 20px 60px #0f162330",
        width:"100%",maxWidth:720,maxHeight:"92vh",overflowY:"auto",
        padding:"28px 28px 24px",position:"relative",
        animation:"slideUp .2s ease"}}>

        <button onClick={onClose} style={{position:"absolute",top:16,right:16,
          background:C.surfAlt,border:`1px solid ${C.bdr}`,borderRadius:8,
          color:C.mut,width:32,height:32,cursor:"pointer",fontSize:16,lineHeight:1,
          display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>

        <div style={{marginBottom:20}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:10}}>
            <TypeBadge bio={bio}/>
            {(drug.desig||[]).map(d=><DesBadge key={d} code={d}/>)}
          </div>
          <h2 style={{margin:"0 0 3px",fontSize:24,fontWeight:800,color:C.txt,
            fontFamily:"Georgia, serif"}}>{drug.name}</h2>
          <div style={{fontSize:13,color:C.mut,fontStyle:"italic",marginBottom:4}}>{drug.ing}</div>
          <div style={{display:"flex",gap:16,flexWrap:"wrap",fontSize:12,color:C.mut}}>
            <span>📅 Approved {fmtDate(drug.date)}</span>
            <span>🏭 {drug.sponsor}</span>
            <span>💊 {ROUTE_LABEL[drug.route]||drug.route}</span>
            {drug.atc && <span>ATC: <strong style={{color:C.acc}}>{drug.atc}</strong></span>}
          </div>
        </div>

        <div style={{background:C.smBg,borderRadius:8,padding:"10px 14px",marginBottom:16,
          borderLeft:`3px solid ${C.sm}`}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",
            color:C.sm,textTransform:"uppercase",marginBottom:4}}>Mechanism of Action</div>
          <div style={{fontSize:13,color:C.txt,fontWeight:600}}>{drug.moa}</div>
        </div>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",
            color:C.mut,textTransform:"uppercase",marginBottom:6}}>Clinical Indication</div>
          <div style={{fontSize:13,color:C.txt,lineHeight:1.65}}>{drug.indication}</div>
        </div>

        {!bio && pc && (
          <div style={{display:"flex",gap:20,marginBottom:18,flexWrap:"wrap"}}>
            <div>
              {(pc.smiles || pc.cid)
                ? <StructureCanvas smiles={pc.smiles} cid={pc.cid}/>
                : <div style={{width:220,height:220,borderRadius:8,border:`1px dashed ${C.bdr}`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    color:C.dim,fontSize:11,textAlign:"center",background:C.surfAlt}}>
                    Structure not available
                  </div>}
              {pc.cid && (
                <a href={`https://pubchem.ncbi.nlm.nih.gov/compound/${pc.cid}`}
                  target="_blank" rel="noreferrer"
                  style={{display:"block",textAlign:"center",fontSize:10,
                    color:C.acc,textDecoration:"none",marginTop:5}}>
                  PubChem CID {pc.cid} ↗
                </a>
              )}
            </div>
            <div style={{flex:1,minWidth:180}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",
                color:C.mut,textTransform:"uppercase",marginBottom:8}}>Physicochemical</div>
              <Prop label="Formula" value={pc.f}/>
              <Prop label="MW"      value={pc.mw?`${pc.mw} g/mol`:null}/>
              <Prop label="LogP"    value={pc.logp}/>
              <Prop label="HBD"     value={pc.hbd}/>
              <Prop label="HBA"     value={pc.hba}/>
              {r5 && (
                <div style={{marginTop:10,padding:"8px 12px",borderRadius:8,
                  background:r5.ok?C.okBg:C.failBg,
                  border:`1px solid ${r5.ok?C.ok:C.fail}44`,
                  fontSize:11,color:r5.ok?C.ok:C.fail,fontWeight:600}}>
                  {r5.ok?"✓ All Lipinski rules satisfied":`✗ ${r5.v} Lipinski rule${r5.v>1?"s":""} violated`}
                  <div style={{marginTop:4,fontSize:10,fontWeight:400,color:C.mut}}>
                    MW≤500 {r5.mw<=500?"✓":"✗"} · HBD≤5 {r5.hbd<=5?"✓":"✗"} · HBA≤10 {r5.hba<=10?"✓":"✗"} · LogP≤5 {r5.logp<=5?"✓":"✗"}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!bio && pc?.smiles && (
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",
              color:C.mut,textTransform:"uppercase",marginBottom:6}}>SMILES</div>
            <div style={{background:C.surfAlt,border:`1px solid ${C.bdr}`,borderRadius:8,
              padding:"8px 12px",fontSize:10,fontFamily:"monospace",color:C.acc,
              overflowX:"auto",whiteSpace:"nowrap"}}>{pc.smiles}</div>
          </div>
        )}

        {!bio && !pc && (
          <div style={{fontSize:12,color:C.dim,textAlign:"center",
            padding:"12px 0",fontStyle:"italic",background:C.surfAlt,
            borderRadius:8,marginBottom:12}}>
            Physicochemical data not available for this compound.
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD ANALYTICS
// ─────────────────────────────────────────────────────────────────────────────
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
         ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const ALL_DRUGS = YEARS.flatMap(y => DB[y] || []);

const CHART_COLORS = {
  sm:   C.sm,
  bio:  C.bio,
  fic:  C.fic,
  bt:   C.bt,
  od:   C.orp,
  pr:   C.acc,
  comp: C.ok,
  viol: "#e5b8b8",
};
const PIE_COLORS = ["#0066cc","#00875a","#7b2fa0","#b35c00","#c0392b",
                    "#2980b9","#16a085","#8e44ad","#e67e22","#e74c3c",
                    "#1abc9c","#3498db","#9b59b6"];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:8,
      padding:"10px 14px",boxShadow:C.shadow,fontSize:12}}>
      <div style={{fontWeight:700,color:C.txt,marginBottom:6}}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{color:p.color,marginBottom:2}}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function SectionTitle({ children }) {
  return (
    <div style={{fontSize:15,fontWeight:700,color:C.txt,marginBottom:16,
      paddingBottom:8,borderBottom:`1px solid ${C.bdr}`}}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,
      padding:"18px 20px",boxShadow:C.shadow,flex:1,minWidth:140}}>
      <div style={{fontSize:32,fontWeight:800,color:color||C.acc,
        fontFamily:"Georgia,serif",lineHeight:1}}>{value}</div>
      <div style={{fontSize:13,fontWeight:600,color:C.txt,marginTop:6}}>{label}</div>
      {sub && <div style={{fontSize:11,color:C.mut,marginTop:2}}>{sub}</div>}
    </div>
  );
}

function computeYearData(drugs) {
  const smWithMW = drugs.filter(d => d.pc?.mw);

  const byYear = YEARS.map(y => {
    const yd = DB[y]||[];
    return { year:String(y),
      "Small Molecule": yd.filter(d=>d.type==="small_molecule").length,
      "Biologic":       yd.filter(d=>d.type==="biologic").length,
      total: yd.length };
  }).reverse();

  const desByYear = YEARS.map(y => {
    const yd = DB[y]||[];
    return { year:String(y),
      "First-in-Class": yd.filter(d=>d.desig?.includes("FIC")).length,
      "Breakthrough":   yd.filter(d=>d.desig?.includes("BT")).length,
      "Orphan Drug":    yd.filter(d=>d.desig?.includes("OD")).length,
      "Priority Review":yd.filter(d=>d.desig?.includes("PR")).length };
  }).reverse();

  const sponsorCount = {};
  drugs.forEach(d=>{ if(d.sponsor) sponsorCount[d.sponsor]=(sponsorCount[d.sponsor]||0)+1; });
  const topSponsors = Object.entries(sponsorCount).sort((a,b)=>b[1]-a[1]).slice(0,12)
    .map(([name,count])=>({name,count}));

  const atcGroups = {A:"Alimentary",B:"Blood",C:"Cardiovascular",D:"Dermatology",
    G:"Genito-urinary",H:"Hormones",J:"Anti-infectives",L:"Antineoplastic",
    M:"Musculoskeletal",N:"Nervous System",R:"Respiratory",S:"Sensory Organs",V:"Various"};
  const atcCount = {};
  drugs.forEach(d=>{ if(!d.atc) return; const l=atcGroups[d.atc[0].toUpperCase()]||"Other"; atcCount[l]=(atcCount[l]||0)+1; });
  const atcData = Object.entries(atcCount).sort((a,b)=>b[1]-a[1]).map(([name,value])=>({name,value}));

  const mwBuckets=[{range:"<200",min:0,max:200},{range:"200-300",min:200,max:300},
    {range:"300-400",min:300,max:400},{range:"400-500",min:400,max:500},
    {range:"500-600",min:500,max:600},{range:"600-800",min:600,max:800},{range:">800",min:800,max:99999}];
  const mwDist = mwBuckets.map(b=>({range:b.range,
    count:smWithMW.filter(d=>d.pc.mw>=b.min&&d.pc.mw<b.max).length}));

  const routeCount={};
  drugs.forEach(d=>{ const r=d.route||"Unknown"; routeCount[r]=(routeCount[r]||0)+1; });
  const routeData = Object.entries(routeCount).sort((a,b)=>b[1]-a[1])
    .map(([name,value])=>({name:ROUTE_LABEL[name]||name,value}));

  const ro5ByYear = YEARS.map(y=>{
    const sms=(DB[y]||[]).filter(d=>d.type==="small_molecule"&&d.pc?.mw);
    const compliant=sms.filter(d=>d.pc.mw<=500&&d.pc.logp<=5&&d.pc.hbd<=5&&d.pc.hba<=10).length;
    return {year:String(y),"Compliant":compliant,"Violation":sms.length-compliant,
      pct:sms.length?Math.round(compliant/sms.length*100):0};
  }).reverse();

  const desPie=[
    {name:"First-in-Class",value:drugs.filter(d=>d.desig?.includes("FIC")).length,color:C.fic},
    {name:"Breakthrough",  value:drugs.filter(d=>d.desig?.includes("BT")).length, color:C.bt},
    {name:"Orphan Drug",   value:drugs.filter(d=>d.desig?.includes("OD")).length, color:C.orp},
    {name:"Priority Review",value:drugs.filter(d=>d.desig?.includes("PR")).length,color:C.acc},
  ].filter(d=>d.value>0);

  return {byYear,desByYear,topSponsors,atcData,mwDist,routeData,ro5ByYear,desPie};
}

function Dashboard() {
  const [selYear, setSelYear] = useState("all");
  const isAll = selYear==="all";
  const drugs = isAll ? ALL_DRUGS : (DB[parseInt(selYear)]||[]);
  const D     = computeYearData(drugs);

  const total    = drugs.length;
  const totalSM  = drugs.filter(d=>d.type==="small_molecule").length;
  const totalBio = drugs.filter(d=>d.type==="biologic").length;
  const totalFIC = drugs.filter(d=>d.desig?.includes("FIC")).length;
  const totalBT  = drugs.filter(d=>d.desig?.includes("BT")).length;
  const totalOD  = drugs.filter(d=>d.desig?.includes("OD")).length;

  return (
    <div style={{padding:"24px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"flex",gap:6,marginBottom:24,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontSize:12,color:C.mut,fontWeight:600,marginRight:4}}>View:</span>
        {["all",...YEARS.map(String)].map(y=>{
          const act=selYear===y;
          return (
            <button key={y} onClick={()=>setSelYear(y)} style={{
              background:act?C.acc:C.surf,border:`1px solid ${act?C.acc:C.bdr}`,
              color:act?"#fff":C.mut,borderRadius:6,padding:"5px 14px",
              fontSize:12,fontWeight:act?700:400,cursor:"pointer",
              fontFamily:"inherit",transition:"all 0.12s",
              boxShadow:act?`0 2px 8px ${C.acc}44`:C.shadow}}>
              {y==="all"?"All Years":y}
            </button>
          );
        })}
      </div>

      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
        <StatCard label="Total Approvals"  value={total}    sub={isAll?"2022-2026":selYear}           color={C.acc}/>
        <StatCard label="Small Molecules"  value={totalSM}  sub={`${total?Math.round(totalSM/total*100):0}% of total`}  color={C.sm}/>
        <StatCard label="Biologics"        value={totalBio} sub={`${total?Math.round(totalBio/total*100):0}% of total`} color={C.bio}/>
        <StatCard label="First-in-Class"   value={totalFIC} sub={`${total?Math.round(totalFIC/total*100):0}% of total`} color={C.fic}/>
        <StatCard label="Breakthrough"     value={totalBT}  sub={`${total?Math.round(totalBT/total*100):0}% of total`}  color={C.bt}/>
        <StatCard label="Orphan Drug"      value={totalOD}  sub={`${total?Math.round(totalOD/total*100):0}% of total`}  color={C.orp}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          {isAll ? (
            <>
              <SectionTitle>Approvals by Year</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={D.byYear} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.bdr}/>
                  <XAxis dataKey="year" tick={{fontSize:12,fill:C.mut}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<ChartTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                  <Bar dataKey="Small Molecule" fill={C.sm}  radius={[4,4,0,0]}/>
                  <Bar dataKey="Biologic"       fill={C.bio} radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <SectionTitle>Drug Type Split — {selYear}</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={[
                    {name:"Small Molecule",value:totalSM,color:C.sm},
                    {name:"Biologic",value:totalBio,color:C.bio},
                  ]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                    label={({name,value})=>`${name}: ${value}`}>
                    {[C.sm,C.bio].map((col,i)=><Cell key={i} fill={col}/>)}
                  </Pie>
                  <Tooltip contentStyle={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:8,fontSize:12}}/>
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          {isAll ? (
            <>
              <SectionTitle>Regulatory Designations by Year</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={D.desByYear} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={C.bdr}/>
                  <XAxis dataKey="year" tick={{fontSize:12,fill:C.mut}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<ChartTooltip/>}/>
                  <Legend wrapperStyle={{fontSize:11}}/>
                  <Bar dataKey="Breakthrough"    fill={C.bt}  radius={[3,3,0,0]}/>
                  <Bar dataKey="Orphan Drug"     fill={C.orp} radius={[3,3,0,0]}/>
                  <Bar dataKey="Priority Review" fill={C.acc} radius={[3,3,0,0]}/>
                  <Bar dataKey="First-in-Class"  fill={C.fic} radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <SectionTitle>Regulatory Designations — {selYear}</SectionTitle>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={D.desPie} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" outerRadius={90}
                    label={({name,value})=>`${name}: ${value}`}>
                    {D.desPie.map((d,i)=><Cell key={i} fill={d.color}/>)}
                  </Pie>
                  <Tooltip contentStyle={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:8,fontSize:12}}/>
                </PieChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          <SectionTitle>Top Sponsors{isAll?" (2022-2026)":" — "+selYear}</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={D.topSponsors} layout="vertical" barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
              <YAxis type="category" dataKey="name" width={130} tick={{fontSize:10,fill:C.mut}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Bar dataKey="count" fill={C.acc} radius={[0,4,4,0]} name="Approvals"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          <SectionTitle>Therapeutic Areas (ATC){isAll?" (2022-2026)":" — "+selYear}</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={D.atcData} dataKey="value" nameKey="name"
                cx="50%" cy="50%" outerRadius={100}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false} style={{fontSize:9}}>
                {D.atcData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i%PIE_COLORS.length]}/>)}
              </Pie>
              <Tooltip contentStyle={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:8,fontSize:12}}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>
        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          <SectionTitle>Molecular Weight Distribution{isAll?"":" — "+selYear}</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={D.mwDist} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.bdr}/>
              <XAxis dataKey="range" tick={{fontSize:10,fill:C.mut}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
              <Tooltip content={<ChartTooltip/>}/>
              <Bar dataKey="count" fill={C.sm} radius={[4,4,0,0]} name="Molecules"/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{fontSize:11,color:C.mut,marginTop:8,textAlign:"center"}}>Lipinski MW threshold: 500 Da</div>
        </div>

        <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"20px",boxShadow:C.shadow}}>
          <SectionTitle>Lipinski Ro5 Compliance{isAll?" by Year":" — "+selYear}</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            {isAll ? (
              <BarChart data={D.ro5ByYear} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke={C.bdr}/>
                <XAxis dataKey="year" tick={{fontSize:12,fill:C.mut}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Legend wrapperStyle={{fontSize:11}}/>
                <Bar dataKey="Compliant" stackId="a" fill={C.ok}             radius={[0,0,0,0]}/>
                <Bar dataKey="Violation" stackId="a" fill={CHART_COLORS.viol} radius={[4,4,0,0]}/>
              </BarChart>
            ) : (
              <PieChart>
                <Pie data={[
                  {name:"Compliant",value:D.ro5ByYear.find(r=>r.year===selYear)?.Compliant||0,color:C.ok},
                  {name:"Violation",value:D.ro5ByYear.find(r=>r.year===selYear)?.Violation||0,color:CHART_COLORS.viol},
                ].filter(d=>d.value>0)} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" outerRadius={80}
                  label={({name,value,percent})=>`${name}: ${value} (${(percent*100).toFixed(0)}%)`}>
                  {[C.ok,CHART_COLORS.viol].map((col,i)=><Cell key={i} fill={col}/>)}
                </Pie>
                <Tooltip contentStyle={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:8,fontSize:12}}/>
              </PieChart>
            )}
          </ResponsiveContainer>
          <div style={{fontSize:11,color:C.mut,marginTop:8,textAlign:"center"}}>Small molecules with available data only</div>
        </div>
      </div>

      <div style={{background:C.surf,border:`1px solid ${C.bdr}`,borderRadius:10,
        padding:"20px",boxShadow:C.shadow,marginBottom:24}}>
        <SectionTitle>Route of Administration{isAll?" (2022-2026)":" — "+selYear}</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={D.routeData} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr}/>
            <XAxis dataKey="name" tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:C.mut}} axisLine={false} tickLine={false}/>
            <Tooltip content={<ChartTooltip/>}/>
            <Bar dataKey="value" fill={C.orp} radius={[4,4,0,0]} name="Approvals"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function FDAExplorer() {
  const [page,   setPage]   = useState("approvals");
  const [year,   setYear]   = useState(2026);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sel,    setSel]    = useState(null);

  const drugs  = DB[year]||[];
  const smN    = drugs.filter(d=>d.type==="small_molecule").length;
  const bioN   = drugs.filter(d=>d.type==="biologic").length;

  const visible = drugs.filter(d=>{
    if (filter==="small_molecule" && d.type!=="small_molecule") return false;
    if (filter==="biologic" && d.type!=="biologic") return false;
    if (filter==="fic" && !d.desig?.includes("FIC")) return false;
    if (filter==="bt"  && !d.desig?.includes("BT"))  return false;
    if (filter==="od"  && !d.desig?.includes("OD"))  return false;
    if (search) {
      const q=search.toLowerCase();
      return d.name.toLowerCase().includes(q) ||
             d.ing.toLowerCase().includes(q)  ||
             d.indication.toLowerCase().includes(q) ||
             d.moa.toLowerCase().includes(q) ||
             d.sponsor.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.txt,
      fontFamily:"'DM Sans','Helvetica Neue',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px;height:6px}
        ::-webkit-scrollbar-track{background:${C.bg}}
        ::-webkit-scrollbar-thumb{background:${C.bdrB};border-radius:3px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        input::placeholder{color:${C.dim}}
        button:focus{outline:none}
      `}</style>

      <header style={{background:C.surf,borderBottom:`1px solid ${C.bdr}`,
        padding:"16px 24px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",
        boxShadow:"0 1px 4px #0f162308"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:20,fontWeight:800,fontFamily:"Georgia,serif",
            letterSpacing:"-0.02em",color:C.txt}}>FDA Drug Approvals</div>
          <div style={{fontSize:11,color:C.mut,marginTop:1}}>
            Novel NMEs &amp; Biologics · CDER · 2022–2026
          </div>
        </div>
        {page==="approvals" && (
          <input placeholder="Search name, MOA, sponsor, indication…"
            value={search} onChange={e=>setSearch(e.target.value)}
            style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:8,
              padding:"7px 12px",color:C.txt,fontSize:12,fontFamily:"inherit",
              width:230,outline:"none",boxShadow:"inset 0 1px 3px #0f162308"}}/>
        )}
      </header>

      <div style={{background:C.surf,borderBottom:`1px solid ${C.bdr}`,
        padding:"0 24px",display:"flex",gap:0}}>
        {[["approvals","Approvals"],["dashboard","Dashboard"]].map(([key,label])=>{
          const act = page===key;
          return (
            <button key={key} onClick={()=>setPage(key)} style={{
              background:"none",border:"none",
              borderBottom:act?`2px solid ${C.acc}`:"2px solid transparent",
              padding:"13px 20px",cursor:"pointer",
              color:act?C.acc:C.mut,fontSize:13,fontWeight:act?700:500,
              fontFamily:"inherit",letterSpacing:"0.01em",transition:"color 0.12s"}}>
              {label}
            </button>
          );
        })}
      </div>

      {page==="approvals" && <>
        <div style={{background:C.surf,display:"flex",borderBottom:`1px solid ${C.bdr}`,
          padding:"0 24px",overflowX:"auto",gap:0}}>
          {YEARS.map(y=>{
            const act=y===year;
            const cnt=(DB[y]||[]).length;
            return (
              <button key={y} onClick={()=>{setYear(y);setFilter("all");setSearch("");}} style={{
                background:"none",border:"none",
                borderBottom:act?`2px solid ${C.acc}`:"2px solid transparent",
                padding:"12px 18px",cursor:"pointer",
                color:act?C.acc:C.mut,fontSize:13,fontWeight:act?700:400,
                fontFamily:"inherit",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap"}}>
                {y}
                <span style={{background:act?C.accBg:C.surfAlt,
                  color:act?C.acc:C.dim,
                  borderRadius:10,padding:"1px 7px",fontSize:10,fontWeight:600}}>{cnt}</span>
              </button>
            );
          })}
        </div>

        <div style={{background:C.surf,padding:"10px 24px",display:"flex",gap:6,
          flexWrap:"wrap",borderBottom:`1px solid ${C.bdr}`,alignItems:"center"}}>
          {[
            ["all",          `All (${drugs.length})`],
            ["small_molecule",`Small Mol. (${smN})`],
            ["biologic",     `Biologic (${bioN})`],
            ["fic",          "First-in-Class"],
            ["bt",           "Breakthrough"],
            ["od",           "Orphan Drug"],
          ].map(([k,l])=>(
            <button key={k} onClick={()=>setFilter(k)} style={{
              background:filter===k?C.acc:C.bg,
              border:`1px solid ${filter===k?C.acc:C.bdr}`,
              color:filter===k?"#fff":C.mut,
              borderRadius:6,padding:"4px 12px",fontSize:11,
              fontWeight:filter===k?600:400,
              cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s"}}>
              {l}
            </button>
          ))}
          {search && (
            <span style={{fontSize:11,color:C.mut,marginLeft:4}}>
              {visible.length} result{visible.length!==1?"s":""}
            </span>
          )}
        </div>

        <main style={{padding:"20px 24px"}}>
          {visible.length===0 ? (
            <div style={{textAlign:"center",padding:"60px 0",color:C.dim}}>
              No results found.
            </div>
          ) : (
            <div style={{display:"grid",
              gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:14}}>
              {visible.map(d=><DrugCard key={d.id} drug={d} onClick={()=>setSel(d)}/>)}
            </div>
          )}
        </main>

        {sel && <Modal drug={sel} onClose={()=>setSel(null)}/>}
      </>}

      {sel && <Modal drug={sel} onClose={()=>setSel(null)}/>}
      <Analytics />
      {page==="dashboard" && <Dashboard/>}
    </div>
  );
}
