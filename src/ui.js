// Interface : questionnaire, simulation animée, bilingue
const I18N = {
  fr: {
    brand: 'Simulateur FERR Québec', edit: 'Modifier mes réponses', th_light: 'Mode clair', th_dark: 'Mode sombre',
    back: 'Retour', next: 'Suivant', launch: 'Lancer la simulation', start: 'Commencer', example: 'Voir un exemple tout de suite',
    yes: 'Oui', no: 'Non', years: 'ans',
    s_welcome: 'Bienvenue', s_age: 'Âge', s_account: 'Compte', s_income: 'Revenus', s_household: 'Ménage', s_invest: 'Placements', s_budget: 'Budget',
    w_title: 'Retirer le minimum de son FERR, ou plus ?',
    w_lede: 'Ce simulateur compare, année par année, différentes façons de retirer l\'argent d\'un FERR pour un résident du Québec. Il calcule l\'impôt fédéral et du Québec, la récupération de la pension de la Sécurité de la vieillesse (PSV), le Supplément de revenu garanti, le Régime canadien de soins dentaires et le placement de l\'argent retiré.',
    w_l1: 'Six questions courtes pour décrire la situation. Des valeurs d\'exemple sont déjà remplies.',
    w_l2: 'Chaque calcul est affiché étape par étape. Rien n\'est caché.',
    w_l3: 'Les réponses restent dans ce navigateur seulement.',
    w_disc: 'Outil éducatif basé sur les paramètres fiscaux 2026. Ce n\'est pas un conseil financier.',
    q_age: 'Quel âge a la personne en 2026 ?', h_age: 'C\'est l\'âge qui fixe le pourcentage minimum à retirer du FERR chaque année.',
    f_age: 'Âge en 2026', f_death: 'Simuler jusqu\'à quel âge ?', h_death: 'L\'année du décès, le solde restant du FERR est imposé en entier. Essayez plusieurs âges.',
    i_age: (a, p) => `À ${a} ans, le minimum à retirer est de <b>${p}</b> du solde. Ce pourcentage augmente chaque année jusqu'à 20 % à 95 ans.`,
    q_account: 'Quel compte et quel montant ?', h_account: 'Le solde au 31 décembre 2025 sert à calculer le minimum de 2026.',
    o_ferr: 'FERR ordinaire', od_ferr: 'Pas de maximum de retrait.', o_frv: 'FRV (fonds de revenu viager)', od_frv: 'Issu d\'un régime de retraite immobilisé, avec un maximum annuel.',
    f_ferr: 'Solde au 31 décembre 2025', f_rF: 'Rendement annuel prévu du FERR', h_rF: 'Rendement avant inflation. Un portefeuille équilibré vise souvent 4 à 6 %.',
    i_account: (m, p) => `Retrait minimum en 2026 : <span class="big">${m}</span> <span class="muted">(${p} du solde)</span>`,
    i_frv: (m) => `Maximum approximatif du FRV en 2026 : ${m}`,
    q_income: 'Quels sont les autres revenus ?', h_income: 'Montants annuels avant impôt, sans le FERR.',
    f_rrq: 'Rente du Régime de rentes du Québec (RRQ)', f_rente: 'Rente d\'un régime de retraite d\'employeur', f_other: 'Autres revenus imposables', f_oas: 'Reçoit la pension de la Sécurité de la vieillesse (PSV) ?',
    od_oas_y: 'Environ 9 150 $ par an de 65 à 74 ans, 10 065 $ à 75 ans et plus.', od_oas_n: 'Par exemple si elle est reportée ou non admissible.',
    i_income: (x) => `Revenu estimé en 2026 avec le minimum : <span class="big">${x}</span>`,
    g_free: 'dentaire gratuit', g_claw: 'début récupération PSV', g_full: 'PSV perdue',
    q_household: 'La personne vit-elle seule ?', h_household: 'Un conjoint change l\'impôt (fractionnement du revenu de pension) et le revenu familial utilisé pour les soins dentaires.',
    o_alone: 'Seule', od_alone: 'Crédit pour personne vivant seule au Québec.', o_couple: 'En couple', od_couple: 'On tient compte des revenus du conjoint.',
    f_sAge: 'Âge du conjoint en 2026', f_sInc: 'Revenus annuels du conjoint (RRQ, rentes, autres, sans la PSV)', f_sOas: 'Le conjoint reçoit la PSV (s\'il a 65 ans ou plus) ?', f_split: 'Fractionner le revenu de pension avec le conjoint ?',
    od_split_y: 'Jusqu\'à 50 % des retraits du FERR, à 65 ans et plus. Le simulateur choisit la meilleure part chaque année.', od_split_n: 'Chacun est imposé sur ses propres revenus.',
    q_invest: 'Où va l\'argent sorti du FERR ?', h_invest: 'Ce qui n\'est pas dépensé est placé dans un compte de placement non enregistré. Ses revenus sont imposables chaque année.',
    f_nr: 'Placements non enregistrés déjà détenus', f_rNR: 'Rendement annuel du compte non enregistré', f_mix: 'Composition du rendement du compte',
    f_mixI: 'Intérêts (imposés à 100 %)', f_mixD: 'Dividendes canadiens (majorés, crédit d\'impôt)', f_mixG: 'Gains en capital (50 %, imposés à la vente)',
    f_tfsa: 'Utiliser aussi un CELI ?', od_tfsa_y: 'Le surplus va d\'abord au CELI, à l\'abri de l\'impôt, selon les droits disponibles.', od_tfsa_n: 'Tout va dans le compte non enregistré.',
    f_tfsaBal: 'Solde actuel du CELI', f_tfsaRoom: 'Droits de cotisation CELI inutilisés',
    q_budget: 'Combien le ménage dépense-t-il ?', h_budget: 'Dépenses annuelles après impôt, en dollars d\'aujourd\'hui. Elles suivent l\'inflation.',
    f_spend: 'Dépenses annuelles du ménage', f_inf: 'Inflation annuelle', h_inf: 'Les tranches d\'impôt, la PSV et les seuils sont indexés à ce taux.',
    f_dIns: 'A une autre assurance dentaire (employeur, régime privé) ?', od_dIns_y: 'Alors le Régime canadien de soins dentaires ne s\'applique pas.', od_dIns_n: 'Le régime fédéral peut couvrir les soins selon le revenu familial.',
    f_dVal: 'Coût annuel des soins dentaires, par personne',
    // simulation
    sim_title: 'Résultat de la simulation', strategy: 'Stratégie de retrait',
    st_min: 'Minimum légal', st_lump: 'Tout sortir', st_target: 'Viser un revenu', st_fixed: 'Montant fixe', st_best: 'Meilleure stratégie trouvée',
    ctl_lump: (n) => `Vider le FERR sur ${n} an${n > 1 ? 's' : ''}`, ctl_target: 'Revenu net visé chaque année (dollars de 2026)', ctl_fixed: 'Retrait annuel (dollars de 2026, au moins le minimum)',
    best_min: 'Aucune stratégie testée ne fait mieux que le minimum légal.', best_t: (x) => `La meilleure cible trouvée : un revenu net de ${x} par année.`,
    hl_lead: (age) => `Patrimoine laissé après impôt au décès à ${age} ans`, hl_unit: 'en dollars de 2026',
    vs_min: (d) => `${d} par rapport au minimum légal`, same_min: 'C\'est la stratégie du minimum légal.',
    t_tax: 'Impôts payés (vie + décès)', t_claw: 'PSV récupérée par l\'impôt', t_dent: 'Soins dentaires non couverts', t_gis: 'SRG reçu',
    cmp_title: 'Comparaison des stratégies', cmp_sub: 'Patrimoine laissé après impôt au décès, en dollars de 2026. Cliquez sur une barre pour l\'explorer.',
    c_min: 'Minimum légal', c_lump1: 'Tout sortir en 2026', c_lump3: 'Tout sortir sur 3 ans', c_t70: 'Viser 70 000 $ (seuil dentaire)', c_t95: 'Viser 95 323 $ (seuil PSV)', c_best: 'Meilleure cible trouvée', c_custom: 'Votre choix', best: 'meilleur',
    flow_title: 'Le parcours de l\'argent', year: 'Année', play: 'Lecture', pause: 'Pause',
    n_ferr: 'Retrait du FERR', n_other: 'Autres revenus', n_draw: 'Épargne utilisée', n_mid: 'Argent de l\'année', n_tax: 'Impôts et PSV récupérée', n_spend: 'Dépenses', n_save: 'Placé au compte',
    chain_title: 'Le calcul, étape par étape', dollar_title: 'Où va chaque dollar cette année',
    d_fed: 'Impôt fédéral', d_qc: 'Impôt du Québec', d_claw: 'PSV récupérée', d_misc: 'RAMQ et dentaire', d_spend: 'Dépenses', d_save: 'Épargne',
    ch_F: (y) => `Solde du FERR au 1er janvier ${y}`, ch_min: (a, p) => `Minimum légal à ${a} ans`, ch_minf: (F, p, m) => `${F} × ${p} = ${m}`,
    ch_frv: 'Maximum du FRV (approximatif)', ch_w: 'Retrait selon la stratégie', ch_extra: 'dont un retrait supplémentaire pour couvrir les dépenses',
    ch_other: 'RRQ, rentes et autres revenus', ch_oas: 'PSV brute', ch_gis: 'Supplément de revenu garanti', ch_inv: 'Revenus du compte non enregistré', ch_invf: (i, d, g) => `intérêts ${i}, dividendes ${d} (majorés de 38 % dans le revenu), gains réalisés ${g}`,
    ch_net: 'Revenu net avant récupération de la PSV', ch_split: (x) => `après ${x} transférés au conjoint (fractionnement)`,
    ch_claw: 'Récupération de la PSV', ch_clawf: (n, s) => `15 % × (${n} − ${s})`, ch_clawn: (s) => `sous le seuil de ${s}`,
    ch_fed: 'Impôt fédéral', ch_fedf: (b, c) => `${b} selon les tranches, moins les crédits (personnel, âge, pension), puis abattement du Québec de 16,5 %`,
    ch_qc: 'Impôt du Québec', ch_qcf: 'selon les tranches, moins les crédits (personnel, âge, retraite, personne seule)',
    ch_misc: 'Prime RAMQ et crédit pour soutien des aînés', ch_spouse: 'Impôt et PSV récupérée du conjoint',
    ch_dent: 'Soins dentaires', ch_dentf: (inc, st) => `revenu familial ${inc} : ${st}`, dent_free: 'couverts à 100 %', dent_40: 'quote-part de 40 %', dent_60: 'quote-part de 60 %', dent_none: 'non admissible', dent_ins: 'assurance privée',
    ch_spend: 'Dépenses du ménage', ch_res_s: 'Surplus placé', ch_res_d: 'Puisé dans l\'épargne', ch_resf_s: (b, t) => `compte non enregistré ${b}${t}`, ch_tfsa: (t) => `, CELI ${t}`,
    ch_mr: 'Taux marginal effectif sur 1 000 $ de plus', ch_mrf: 'impôts + PSV récupérée + effet sur les soins dentaires',
    ch_end: 'Soldes en fin d\'année', ch_endf: (f, b, t) => `FERR ${f} · compte ${b}${t}`,
    short: (x) => `Attention : les dépenses ne sont pas couvertes cette année (manque de ${x}).`,
    ch_death: 'Impôt au décès sur le solde du FERR et les gains latents',
    inc_title: 'Revenu net de la personne par année', inc_sub: 'En dollars de 2026. Les lignes pointillées montrent les seuils. Une barre coupée dépasse l\'échelle : sa valeur est indiquée en haut.',
    bal_title: 'Patrimoine par année', bal_sub: 'En dollars de 2026, avant l\'impôt au décès.',
    lg_ferr: 'FERR', lg_nr: 'Compte non enregistré', lg_tfsa: 'CELI', thr_claw: 'début de la récupération de la PSV', thr_full: 'PSV entièrement perdue', thr_d70: 'soins dentaires gratuits sous', thr_d90: 'plus de soins dentaires dès', lg_under: 'sous le seuil de la PSV', lg_part: 'PSV en partie récupérée', lg_lost: 'PSV entièrement perdue',
    tbl_title: 'Tableau détaillé, année par année', tbl_real: 'Dollars de 2026', tbl_nom: 'Dollars courants',
    th: ['Année', 'Âge', 'FERR 1er janv.', 'Minimum', 'Retrait', 'Revenu net', 'PSV brute', 'PSV récupérée', 'Impôt féd.', 'Impôt QC', 'Dentaire', 'Dépenses', 'Épargne +/−', 'Compte', 'CELI', 'FERR 31 déc.'],
    adj_title: 'Ajuster rapidement',
    notes_title: 'Hypothèses et limites',
    notes: [
      'Paramètres fiscaux 2026 (Québec et fédéral), indexés chaque année au taux d\'inflation choisi. Les seuils du régime dentaire ne sont pas indexés.',
      'Le minimum utilise l\'âge de la personne au début de l\'année. Le maximum du FRV est une approximation (rente certaine jusqu\'à 90 ans à 6 %).',
      'La récupération de la PSV est calculée sur le revenu de l\'année, même si en réalité elle est retenue sur les versements de juillet à juin suivants.',
      'Le SRG, la prime RAMQ et le crédit pour soutien des aînés sont des approximations. Le SRG est calculé sur le revenu de l\'année plutôt que celui de l\'année précédente.',
      'Au décès, le solde du FERR et les gains en capital latents sont imposés dans la dernière déclaration, même en couple. On mesure ainsi l\'impôt qui sera payé tôt ou tard.',
      'Le compte non enregistré appartient à la personne. Si les dépenses dépassent les revenus, on puise dans ce compte, puis dans le CELI, puis on retire plus du FERR.',
      'Outil éducatif. Pour une décision réelle, validez avec un planificateur financier ou un fiscaliste.'
    ],
    research: 'Recherche détaillée sur les règles',
  },
  en: {
    brand: 'Quebec RRIF Simulator', edit: 'Edit my answers', th_light: 'Light mode', th_dark: 'Dark mode',
    back: 'Back', next: 'Next', launch: 'Run the simulation', start: 'Start', example: 'See an example right away',
    yes: 'Yes', no: 'No', years: 'yrs',
    s_welcome: 'Welcome', s_age: 'Age', s_account: 'Account', s_income: 'Income', s_household: 'Household', s_invest: 'Investments', s_budget: 'Budget',
    w_title: 'Withdraw the RRIF minimum, or more?',
    w_lede: 'This simulator compares, year by year, different ways to draw money from a RRIF (FERR) for a Quebec resident. It computes federal and Quebec income tax, the Old Age Security (OAS) recovery tax, the Guaranteed Income Supplement, the Canadian Dental Care Plan and how the withdrawn money is invested.',
    w_l1: 'Six short questions describe the situation. Example values are already filled in.',
    w_l2: 'Every calculation is shown step by step. Nothing is hidden.',
    w_l3: 'Your answers stay in this browser only.',
    w_disc: 'Educational tool based on 2026 tax parameters. Not financial advice.',
    q_age: 'How old is the person in 2026?', h_age: 'Age sets the minimum percentage that must be withdrawn from the RRIF each year.',
    f_age: 'Age in 2026', f_death: 'Simulate up to what age?', h_death: 'In the year of death, the remaining RRIF balance is fully taxed. Try several ages.',
    i_age: (a, p) => `At age ${a}, the minimum withdrawal is <b>${p}</b> of the balance. It rises every year up to 20% at 95.`,
    q_account: 'Which account, and how much?', h_account: 'The balance on December 31, 2025 sets the 2026 minimum.',
    o_ferr: 'Regular RRIF', od_ferr: 'No withdrawal maximum.', o_frv: 'LIF (life income fund)', od_frv: 'From a locked-in pension plan, with a yearly maximum.',
    f_ferr: 'Balance on December 31, 2025', f_rF: 'Expected annual RRIF return', h_rF: 'Return before inflation. A balanced portfolio often targets 4 to 6%.',
    i_account: (m, p) => `Minimum withdrawal in 2026: <span class="big">${m}</span> <span class="muted">(${p} of the balance)</span>`,
    i_frv: (m) => `Approximate LIF maximum in 2026: ${m}`,
    q_income: 'What other income is there?', h_income: 'Yearly amounts before tax, excluding the RRIF.',
    f_rrq: 'Quebec Pension Plan (QPP/RRQ)', f_rente: 'Employer pension plan', f_other: 'Other taxable income', f_oas: 'Receives Old Age Security (OAS)?',
    od_oas_y: 'About $9,150 a year at 65 to 74, $10,065 at 75 and over.', od_oas_n: 'For example if deferred or not eligible.',
    i_income: (x) => `Estimated 2026 income with the minimum: <span class="big">${x}</span>`,
    g_free: 'free dental', g_claw: 'OAS clawback starts', g_full: 'OAS fully lost',
    q_household: 'Does the person live alone?', h_household: 'A spouse changes the tax (pension income splitting) and the family income used for dental care.',
    o_alone: 'Alone', od_alone: 'Quebec credit for a person living alone.', o_couple: 'With a spouse', od_couple: 'The spouse\'s income is taken into account.',
    f_sAge: 'Spouse\'s age in 2026', f_sInc: 'Spouse\'s yearly income (QPP, pensions, other, excluding OAS)', f_sOas: 'Spouse receives OAS (if 65 or older)?', f_split: 'Split pension income with the spouse?',
    od_split_y: 'Up to 50% of RRIF withdrawals, at 65 and over. The simulator picks the best share each year.', od_split_n: 'Each person is taxed on their own income.',
    q_invest: 'Where does the money taken out go?', h_invest: 'What isn\'t spent goes to a regular non-registered investment account. Its income is taxable every year.',
    f_nr: 'Non-registered investments already held', f_rNR: 'Annual return of the non-registered account', f_mix: 'Make-up of the account\'s return',
    f_mixI: 'Interest (100% taxable)', f_mixD: 'Canadian dividends (grossed up, tax credit)', f_mixG: 'Capital gains (50%, taxed when sold)',
    f_tfsa: 'Also use a TFSA?', od_tfsa_y: 'Surplus goes to the TFSA first, tax-free, within available room.', od_tfsa_n: 'Everything goes to the non-registered account.',
    f_tfsaBal: 'Current TFSA balance', f_tfsaRoom: 'Unused TFSA contribution room',
    q_budget: 'How much does the household spend?', h_budget: 'Yearly after-tax spending, in today\'s dollars. It follows inflation.',
    f_spend: 'Household yearly spending', f_inf: 'Annual inflation', h_inf: 'Tax brackets, OAS and thresholds are indexed at this rate.',
    f_dIns: 'Has other dental insurance (employer, private plan)?', od_dIns_y: 'Then the Canadian Dental Care Plan does not apply.', od_dIns_n: 'The federal plan may cover care depending on family income.',
    f_dVal: 'Yearly dental care cost, per person',
    sim_title: 'Simulation result', strategy: 'Withdrawal strategy',
    st_min: 'Legal minimum', st_lump: 'Take it all out', st_target: 'Target an income', st_fixed: 'Fixed amount', st_best: 'Best strategy found',
    ctl_lump: (n) => `Empty the RRIF over ${n} year${n > 1 ? 's' : ''}`, ctl_target: 'Target net income each year (2026 dollars)', ctl_fixed: 'Yearly withdrawal (2026 dollars, at least the minimum)',
    best_min: 'No strategy tested beats the legal minimum.', best_t: (x) => `Best target found: a net income of ${x} a year.`,
    hl_lead: (age) => `Estate left after tax at death at age ${age}`, hl_unit: 'in 2026 dollars',
    vs_min: (d) => `${d} compared with the legal minimum`, same_min: 'This is the legal minimum strategy.',
    t_tax: 'Taxes paid (lifetime + death)', t_claw: 'OAS recovered through tax', t_dent: 'Dental care not covered', t_gis: 'GIS received',
    cmp_title: 'Strategy comparison', cmp_sub: 'Estate left after tax at death, in 2026 dollars. Click a bar to explore it.',
    c_min: 'Legal minimum', c_lump1: 'Take it all out in 2026', c_lump3: 'Take it all out over 3 years', c_t70: 'Target $70,000 (dental threshold)', c_t95: 'Target $95,323 (OAS threshold)', c_best: 'Best target found', c_custom: 'Your choice', best: 'best',
    flow_title: 'Where the money goes', year: 'Year', play: 'Play', pause: 'Pause',
    n_ferr: 'RRIF withdrawal', n_other: 'Other income', n_draw: 'Savings used', n_mid: 'Money for the year', n_tax: 'Taxes and OAS recovered', n_spend: 'Spending', n_save: 'Invested',
    chain_title: 'The calculation, step by step', dollar_title: 'Where each dollar goes this year',
    d_fed: 'Federal tax', d_qc: 'Quebec tax', d_claw: 'OAS recovered', d_misc: 'RAMQ and dental', d_spend: 'Spending', d_save: 'Savings',
    ch_F: (y) => `RRIF balance on January 1, ${y}`, ch_min: (a, p) => `Legal minimum at age ${a}`, ch_minf: (F, p, m) => `${F} × ${p} = ${m}`,
    ch_frv: 'LIF maximum (approximate)', ch_w: 'Withdrawal under the strategy', ch_extra: 'including an extra withdrawal to cover spending',
    ch_other: 'QPP, pensions and other income', ch_oas: 'Gross OAS', ch_gis: 'Guaranteed Income Supplement', ch_inv: 'Non-registered account income', ch_invf: (i, d, g) => `interest ${i}, dividends ${d} (grossed up 38% in income), realized gains ${g}`,
    ch_net: 'Net income before OAS recovery', ch_split: (x) => `after ${x} transferred to the spouse (splitting)`,
    ch_claw: 'OAS recovery tax', ch_clawf: (n, s) => `15% × (${n} − ${s})`, ch_clawn: (s) => `below the ${s} threshold`,
    ch_fed: 'Federal tax', ch_fedf: (b, c) => `${b} from the brackets, minus credits (basic, age, pension), then the 16.5% Quebec abatement`,
    ch_qc: 'Quebec tax', ch_qcf: 'from the brackets, minus credits (basic, age, retirement, living alone)',
    ch_misc: 'RAMQ premium and senior assistance credit', ch_spouse: 'Spouse\'s tax and OAS recovery',
    ch_dent: 'Dental care', ch_dentf: (inc, st) => `family income ${inc}: ${st}`, dent_free: '100% covered', dent_40: '40% co-payment', dent_60: '60% co-payment', dent_none: 'not eligible', dent_ins: 'private insurance',
    ch_spend: 'Household spending', ch_res_s: 'Surplus invested', ch_res_d: 'Drawn from savings', ch_resf_s: (b, t) => `non-registered ${b}${t}`, ch_tfsa: (t) => `, TFSA ${t}`,
    ch_mr: 'Effective marginal rate on $1,000 more', ch_mrf: 'taxes + OAS recovery + effect on dental care',
    ch_end: 'Year-end balances', ch_endf: (f, b, t) => `RRIF ${f} · account ${b}${t}`,
    short: (x) => `Warning: spending is not covered this year (short by ${x}).`,
    ch_death: 'Tax at death on the RRIF balance and unrealized gains',
    inc_title: 'The person\'s net income by year', inc_sub: 'In 2026 dollars. Dotted lines show the thresholds. A cut bar goes beyond the scale: its value is shown at the top.',
    bal_title: 'Wealth by year', bal_sub: 'In 2026 dollars, before tax at death.',
    lg_ferr: 'RRIF', lg_nr: 'Non-registered account', lg_tfsa: 'TFSA', thr_claw: 'OAS recovery starts at', thr_full: 'OAS fully lost at', thr_d70: 'free dental care below', thr_d90: 'no dental coverage from', lg_under: 'below the OAS threshold', lg_part: 'OAS partly recovered', lg_lost: 'OAS fully lost',
    tbl_title: 'Detailed table, year by year', tbl_real: '2026 dollars', tbl_nom: 'Current dollars',
    th: ['Year', 'Age', 'RRIF Jan 1', 'Minimum', 'Withdrawal', 'Net income', 'Gross OAS', 'OAS recovered', 'Fed. tax', 'QC tax', 'Dental', 'Spending', 'Savings +/−', 'Account', 'TFSA', 'RRIF Dec 31'],
    adj_title: 'Quick adjustments',
    notes_title: 'Assumptions and limits',
    notes: [
      '2026 tax parameters (Quebec and federal), indexed each year at the chosen inflation rate. Dental plan thresholds are not indexed.',
      'The minimum uses the person\'s age at the start of the year. The LIF maximum is an approximation (annuity certain to age 90 at 6%).',
      'The OAS recovery tax is computed on the same year\'s income, although in reality it is withheld from the following July-to-June payments.',
      'GIS, the RAMQ premium and the senior assistance credit are approximations. GIS uses the same year\'s income rather than the previous year\'s.',
      'At death, the RRIF balance and unrealized capital gains are taxed in the final return, even for a couple. This measures the tax that will be paid sooner or later.',
      'The non-registered account belongs to the person. If spending exceeds income, money comes from that account, then the TFSA, then extra RRIF withdrawals.',
      'Educational tool. For a real decision, check with a financial planner or tax specialist.'
    ],
    research: 'Detailed research on the rules',
  }
};

const DEFAULTS = { age: 80, deathAge: 92, type: 'ferr', ferr: 1100000, rF: 5, rrq: 15000, rente: 0, other: 0, oas: true, couple: false, sAge: 78, sInc: 20000, sOas: true, split: true, nr: 0, rNR: 5, mixI: 40, mixD: 30, mixG: 30, tfsaUse: false, tfsa: 0, tfsaRoom: 0, spend: 50000, inf: 2, dentalIns: false, dentalVal: 1200,
  strat: 'min', lumpYears: 1, target: 95323, fixed: 90000, real: true, lang: 'fr', view: 'wizard', step: 0, sel: 0, scen: '' };
let S = { ...DEFAULTS };
try { const s = JSON.parse(localStorage.getItem('ferrsim') || 'null'); if (s) S = { ...DEFAULTS, ...s }; } catch (e) { }
function save() { try { localStorage.setItem('ferrsim', JSON.stringify(S)); } catch (e) { } }
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const L = () => I18N[S.lang];
const tr = (k, ...a) => { const v = L()[k]; return typeof v === 'function' ? v(...a) : (v ?? k); };
const loc = () => S.lang === 'fr' ? 'fr-CA' : 'en-CA';
const money = x => new Intl.NumberFormat(loc(), { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(Math.round(x || 0));
const pct = (x, d = 2) => new Intl.NumberFormat(loc(), { style: 'percent', minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
const num = x => new Intl.NumberFormat(loc(), { maximumFractionDigits: 2 }).format(x);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function tween(el, to, fmt, dur = 700) {
  const from = el._v ?? 0; el._v = to;
  if (RM || from === to) { el.textContent = fmt(to); return; }
  const t0 = performance.now();
  const step = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1 && el._v === to) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

/* ---------- champs ---------- */
function numField(k, labelKey, o) {
  const id = 'f_' + k + (o.suffix || '');
  const unit = o.unit === '$' ? '$' : o.unit === '%' ? '%' : tr('years');
  return `<div class="field"><label for="${id}">${tr(labelKey)}</label>
    ${o.hint ? `<div class="hint">${tr(o.hint)}</div>` : ''}
    <div class="numrow"><input type="range" id="${id}_r" data-k="${k}" min="${o.min}" max="${o.max}" step="${o.step}" value="${S[k]}" aria-label="${esc(tr(labelKey))}">
    <div class="numbox"><input id="${id}" type="number" inputmode="decimal" data-k="${k}" min="${o.min}" max="${o.max * (o.unit === '$' ? 10 : 1)}" step="${o.step}" value="${S[k]}"><span>${unit}</span></div></div></div>`;
}
function choiceField(k, labelKey, opts) {
  return `<div class="field">${labelKey ? `<label>${tr(labelKey)}</label>` : ''}<div class="choices">${opts.map(o =>
    `<button class="choice" data-ck="${k}" data-cv="${o.v}" aria-pressed="${String(S[k]) === String(o.v)}"><b>${tr(o.l)}</b>${o.d ? `<span>${tr(o.d)}</span>` : ''}</button>`).join('')}</div></div>`;
}
const yesNo = (k, l, dy, dn) => choiceField(k, l, [{ v: true, l: 'yes', d: dy }, { v: false, l: 'no', d: dn }]);
function bindFields(root, onChange) {
  root.querySelectorAll('input[data-k]').forEach(inp => {
    inp.addEventListener('input', () => {
      const k = inp.dataset.k; let v = parseFloat(inp.value); if (isNaN(v)) return;
      S[k] = v;
      root.querySelectorAll(`input[data-k="${k}"]`).forEach(o => { if (o !== inp) o.value = v; });
      if (k === 'age' && S.deathAge <= S.age) { S.deathAge = S.age + 1; root.querySelectorAll('input[data-k="deathAge"]').forEach(o => o.value = S.deathAge); }
      save(); onChange && onChange(k);
    });
  });
  root.querySelectorAll('[data-ck]').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.ck, raw = b.dataset.cv; S[k] = raw === 'true' ? true : raw === 'false' ? false : raw;
    root.querySelectorAll(`[data-ck="${k}"]`).forEach(o => o.setAttribute('aria-pressed', String(o === b)));
    save(); onChange && onChange(k, true);
  }));
}

/* ---------- questionnaire ---------- */
const STEPS = [
  { id: 'welcome', t: 's_welcome' },
  { id: 'age', t: 's_age' }, { id: 'account', t: 's_account' }, { id: 'income', t: 's_income' },
  { id: 'household', t: 's_household' }, { id: 'invest', t: 's_invest' }, { id: 'budget', t: 's_budget' }
];
let dir = 1;
function renderRail() {
  $('#rail').innerHTML = STEPS.map((s, i) => `<button class="${i < S.step ? 'done' : ''} ${i === S.step ? 'cur' : ''}" data-go="${i}" aria-current="${i === S.step ? 'step' : 'false'}"><span class="dot">${i}</span><span class="t">${tr(s.t)}</span></button>`).join('');
  $('#rail').querySelectorAll('[data-go]').forEach(b => b.onclick = () => { const g = +b.dataset.go; dir = g >= S.step ? 1 : -1; S.step = g; save(); renderWizard(); });
}
function minIncomeEstimate() {
  const oas = S.oas ? oasFor(S.age, 1) : 0;
  return S.ferr * minPct(S.age) + S.rrq + S.rente + S.other + oas + S.nr * S.rNR / 100 * (S.mixI + S.mixD * 1.38) / Math.max(1, S.mixI + S.mixD + S.mixG);
}
function gaugeHTML(x) {
  const max = 180000, p = v => Math.min(100, v / max * 100);
  const full = S.age >= 75 ? 161320 : 155320;
  const marks = [[70000, 'g_free'], [P.clawThr, 'g_claw'], [full, 'g_full']];
  return `<div class="gauge" aria-hidden="true"><div class="track" style="background:linear-gradient(90deg,var(--accent-soft) 0 ${p(P.clawThr)}%,var(--warn-soft) ${p(P.clawThr)}% ${p(full)}%,var(--sunk) ${p(full)}% 100%)"></div>
    ${marks.map(([v, l]) => `<div class="mark" style="left:${p(v)}%"><span style="${v > 150000 ? 'transform:translateX(-90%)' : ''}">${tr(l)}</span></div>`).join('')}
    <div class="pin" id="pin" style="left:${p(x)}%"><i></i></div></div>`;
}
function insight(id) {
  switch (id) {
    case 'age': return `<p>${tr('i_age', S.age, pct(minPct(S.age)))}</p>`;
    case 'account': return `<p>${tr('i_account', money(S.ferr * minPct(S.age)), pct(minPct(S.age)))}</p>${S.type === 'frv' ? `<p class="small muted">${tr('i_frv', money(S.ferr * frvMaxPct(S.age)))}</p>` : ''}`;
    case 'income': case 'household': case 'invest': { const x = minIncomeEstimate(); return `<p>${tr('i_income', money(x))}</p>${gaugeHTML(x)}`; }
    case 'budget': { const x = minIncomeEstimate(); return `<p>${tr('i_income', money(x))}</p>${gaugeHTML(x)}`; }
  }
  return '';
}
function stepBody(id) {
  switch (id) {
    case 'age': return numField('age', 'f_age', { min: 55, max: 100, step: 1, unit: 'y' }) + numField('deathAge', 'f_death', { min: 56, max: 105, step: 1, unit: 'y', hint: 'h_death' });
    case 'account': return choiceField('type', '', [{ v: 'ferr', l: 'o_ferr', d: 'od_ferr' }, { v: 'frv', l: 'o_frv', d: 'od_frv' }]) +
      numField('ferr', 'f_ferr', { min: 0, max: 4000000, step: 5000, unit: '$' }) + numField('rF', 'f_rF', { min: 0, max: 10, step: .25, unit: '%', hint: 'h_rF' });
    case 'income': return numField('rrq', 'f_rrq', { min: 0, max: 25000, step: 100, unit: '$' }) + numField('rente', 'f_rente', { min: 0, max: 150000, step: 500, unit: '$' }) +
      numField('other', 'f_other', { min: 0, max: 150000, step: 500, unit: '$' }) + yesNo('oas', 'f_oas', 'od_oas_y', 'od_oas_n');
    case 'household': return choiceField('couple', '', [{ v: false, l: 'o_alone', d: 'od_alone' }, { v: true, l: 'o_couple', d: 'od_couple' }]) +
      (S.couple ? numField('sAge', 'f_sAge', { min: 50, max: 100, step: 1, unit: 'y' }) + numField('sInc', 'f_sInc', { min: 0, max: 200000, step: 500, unit: '$' }) +
        yesNo('sOas', 'f_sOas', '', '') + yesNo('split', 'f_split', 'od_split_y', 'od_split_n') : '');
    case 'invest': return numField('nr', 'f_nr', { min: 0, max: 3000000, step: 5000, unit: '$' }) + numField('rNR', 'f_rNR', { min: 0, max: 10, step: .25, unit: '%' }) +
      `<div class="field"><label>${tr('f_mix')}</label><div class="fields" style="gap:10px">${numField('mixI', 'f_mixI', { min: 0, max: 100, step: 5, unit: '%' })}${numField('mixD', 'f_mixD', { min: 0, max: 100, step: 5, unit: '%' })}${numField('mixG', 'f_mixG', { min: 0, max: 100, step: 5, unit: '%' })}</div></div>` +
      yesNo('tfsaUse', 'f_tfsa', 'od_tfsa_y', 'od_tfsa_n') +
      (S.tfsaUse ? numField('tfsa', 'f_tfsaBal', { min: 0, max: 500000, step: 1000, unit: '$' }) + numField('tfsaRoom', 'f_tfsaRoom', { min: 0, max: 200000, step: 1000, unit: '$' }) : '');
    case 'budget': return numField('spend', 'f_spend', { min: 10000, max: 300000, step: 1000, unit: '$' }) + numField('inf', 'f_inf', { min: 0, max: 6, step: .25, unit: '%', hint: 'h_inf' }) +
      yesNo('dentalIns', 'f_dIns', 'od_dIns_y', 'od_dIns_n') + (S.dentalIns ? '' : numField('dentalVal', 'f_dVal', { min: 0, max: 5000, step: 100, unit: '$' }));
  }
}
function renderWizard() {
  renderRail();
  const st = STEPS[S.step], card = $('#stepCard');
  if (st.id === 'welcome') {
    card.innerHTML = `<div class="step welcome ${dir < 0 ? 'back' : ''}"><div class="eyebrow">2026 · Québec</div><h2>${tr('w_title')}</h2><p class="lede">${tr('w_lede')}</p>
      <ul><li>${tr('w_l1')}</li><li>${tr('w_l2')}</li><li>${tr('w_l3')}</li></ul><p class="small muted">${tr('w_disc')}</p>
      <div class="wiz-nav"><button class="btn" id="exBtn">${tr('example')}</button><button class="btn primary" id="nextBtn">${tr('start')}</button></div></div>`;
    $('#exBtn').onclick = () => { goSim(); };
  } else {
    const q = { age: ['q_age', 'h_age'], account: ['q_account', 'h_account'], income: ['q_income', 'h_income'], household: ['q_household', 'h_household'], invest: ['q_invest', 'h_invest'], budget: ['q_budget', 'h_budget'] }[st.id];
    const last = S.step === STEPS.length - 1;
    card.innerHTML = `<div class="step ${dir < 0 ? 'back' : ''}"><div><div class="eyebrow">${S.step} / ${STEPS.length - 1}</div><h2>${tr(q[0])}</h2><p class="muted" style="margin-top:6px">${tr(q[1])}</p></div>
      <div class="fields">${stepBody(st.id)}</div><div class="insight" id="insight">${insight(st.id)}</div>
      <div class="wiz-nav"><button class="btn" id="prevBtn">${tr('back')}</button><button class="btn primary" id="nextBtn">${last ? tr('launch') : tr('next')}</button></div></div>`;
    $('#prevBtn').onclick = () => { dir = -1; S.step--; save(); renderWizard(); };
    bindFields(card, (k, structural) => {
      if (structural && ['couple', 'tfsaUse', 'dentalIns', 'type'].includes(k)) { dir = 0; renderWizard(); return; }
      const ins = $('#insight'); const pin = $('#pin');
      if (pin && ['income', 'household', 'invest', 'budget'].includes(st.id)) {
        const x = minIncomeEstimate(); ins.querySelector('p').innerHTML = tr('i_income', money(x)); pin.style.left = Math.min(100, x / 180000 * 100) + '%';
      } else ins.innerHTML = insight(st.id);
    });
  }
  $('#nextBtn').onclick = () => { if (S.step === STEPS.length - 1) goSim(); else { dir = 1; S.step++; save(); renderWizard(); } };
}

/* ---------- simulation ---------- */
let R = null, CMP = [], BEST = null, animNext = true, playing = null;
function inputs() { return { ...S }; }
function stratObj(key) {
  switch (key || S.strat) {
    case 'min': return { kind: 'min' };
    case 'lump': return { kind: 'lump', years: S.lumpYears };
    case 'target': return { kind: 'target', amount: S.target };
    case 'fixed': return { kind: 'fixed', amount: S.fixed };
    case 'best': return BEST && BEST.useMin ? { kind: 'min' } : { kind: 'target', amount: BEST ? BEST.T : S.target };
  }
}
function compute() {
  const inp = inputs();
  const b = bestTarget(inp);
  const rmin = simulate(inp, { kind: 'min' });
  BEST = { T: b.T, r: b.r, useMin: b.r.estateReal <= rmin.estateReal + Math.max(100, Math.abs(rmin.estateReal) * .001) };
  if (BEST.useMin) BEST.r = rmin;
  CMP = [
    { key: 'min', l: 'c_min', r: rmin, st: 'min' },
    { key: 'lump1', l: 'c_lump1', r: simulate(inp, { kind: 'lump', years: 1 }), st: 'lump', set: () => S.lumpYears = 1 },
    { key: 'lump3', l: 'c_lump3', r: simulate(inp, { kind: 'lump', years: 3 }), st: 'lump', set: () => S.lumpYears = 3 },
    { key: 't70', l: 'c_t70', r: simulate(inp, { kind: 'target', amount: 70000 }), st: 'target', set: () => S.target = 70000 },
    { key: 't95', l: 'c_t95', r: simulate(inp, { kind: 'target', amount: P.clawThr }), st: 'target', set: () => S.target = P.clawThr },
    { key: 'best', l: 'c_best', r: BEST.r, st: 'best' },
  ];
  R = S.strat === 'best' ? BEST.r : simulate(inp, stratObj());
  const isPreset = (S.strat === 'min') || (S.strat === 'best') || (S.strat === 'lump' && [1, 3].includes(S.lumpYears)) || (S.strat === 'target' && [70000, P.clawThr].includes(S.target));
  if (!isPreset) CMP.push({ key: 'custom', l: 'c_custom', r: R, st: S.strat });
  S.sel = Math.min(S.sel, R.years.length - 1);
}
function realTot(r) {
  const o = { tax: 0, claw: 0, dental: 0, gis: 0 };
  for (const y of r.years) { const h = y.h; o.tax += (h.ta.fed + h.ta.qc + h.ta.ramq - h.ta.sa + (h.tb ? h.tb.fed + h.tb.qc + h.tb.ramq - h.tb.sa : 0)) / y.k; o.claw += (h.ta.claw + (h.tb ? h.tb.claw : 0)) / y.k; o.dental += h.dentalLost / y.k; o.gis += (h.gis + h.sGis) / y.k; }
  o.tax += r.deathTax / r.kEnd; return o;
}
function goSim() { S.view = 'sim'; save(); $('#wizard').hidden = true; $('#sim').hidden = false; $('#editBtn').hidden = false; animNext = true; buildSim(); window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); }
function goWizard() { stopPlay(); S.view = 'wizard'; S.step = 1; save(); $('#sim').hidden = true; $('#wizard').hidden = false; $('#editBtn').hidden = true; dir = 1; renderWizard(); }

function buildSim() {
  const el = $('#sim');
  el.innerHTML = `
  <section class="panel headline">
    <div style="display:grid;gap:8px"><div class="eyebrow">${tr('sim_title')}</div><p id="hlLead"></p><div class="big" id="hlBig">0</div><div class="small muted">${tr('hl_unit')}</div><div class="delta" id="hlDelta"></div></div>
    <div class="tiles"><div class="tile"><span class="l">${tr('t_tax')}</span><span class="v" id="tTax"></span></div><div class="tile"><span class="l">${tr('t_claw')}</span><span class="v" id="tClaw"></span></div>
      <div class="tile"><span class="l">${tr('t_dent')}</span><span class="v" id="tDent"></span></div><div class="tile"><span class="l">${tr('t_gis')}</span><span class="v" id="tGis"></span></div></div>
  </section>
  <section class="panel">
    <h2>${tr('strategy')}</h2>
    <div class="strats" id="strats">${['min', 'lump', 'target', 'fixed', 'best'].map(k => `<button class="chip" data-st="${k}" aria-pressed="${S.strat === k}">${tr('st_' + k)}</button>`).join('')}</div>
    <div class="stratctl" id="stratCtl"></div>
  </section>
  <section class="panel"><div><h2>${tr('cmp_title')}</h2><p class="small muted">${tr('cmp_sub')}</p></div><div class="cmp" id="cmp"></div></section>
  <section class="panel">
    <h2>${tr('flow_title')}</h2>
    <div class="yearbar"><button class="btn" id="playBtn">${tr('play')}</button><input type="range" id="yearR" min="0" max="0" step="1" value="0" aria-label="${tr('year')}"><span class="yearlbl" id="yearLbl"></span></div>
    <div id="shortWarn" class="warnbox" hidden></div>
    <div class="flowwrap"><svg class="flow" id="flow" viewBox="0 0 760 320" role="img" aria-label="${esc(tr('flow_title'))}"></svg></div>
    <div class="two">
      <div style="display:grid;gap:10px;min-width:0"><h3>${tr('chain_title')}</h3><ol class="chain" id="chain"></ol></div>
      <div style="display:grid;gap:12px;align-content:start;min-width:0"><h3>${tr('dollar_title')}</h3><div class="dollar" id="dollar"></div><div class="legend" id="dollarLg"></div>
        <h3 style="margin-top:14px">${tr('inc_title')}</h3><p class="small muted">${tr('inc_sub')}</p><svg class="chart" id="incChart" viewBox="0 0 520 260"></svg><div class="legend" id="incLg"></div>
        <h3 style="margin-top:6px">${tr('bal_title')}</h3><p class="small muted">${tr('bal_sub')}</p><svg class="chart" id="balChart" viewBox="0 0 520 240"></svg>
        <div class="legend"><span><i style="background:var(--ferr)"></i>${tr('lg_ferr')}</span><span><i style="background:var(--nr)"></i>${tr('lg_nr')}</span><span><i style="background:var(--tfsa)"></i>${tr('lg_tfsa')}</span></div>
      </div>
    </div>
  </section>
  <section class="panel"><details id="adjD" open><summary>${tr('adj_title')}</summary><div class="adjust" id="adjust" style="margin-top:14px">
    ${numField('ferr', 'f_ferr', { min: 0, max: 4000000, step: 5000, unit: '$', suffix: 'q' })}${numField('age', 'f_age', { min: 55, max: 100, step: 1, unit: 'y', suffix: 'q' })}
    ${numField('deathAge', 'f_death', { min: 56, max: 105, step: 1, unit: 'y', suffix: 'q' })}${numField('spend', 'f_spend', { min: 10000, max: 300000, step: 1000, unit: '$', suffix: 'q' })}
    ${numField('rF', 'f_rF', { min: 0, max: 10, step: .25, unit: '%', suffix: 'q' })}${numField('rNR', 'f_rNR', { min: 0, max: 10, step: .25, unit: '%', suffix: 'q' })}
  </div></details></section>
  <section class="panel"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:center"><h2>${tr('tbl_title')}</h2>
    <div class="seg" role="group"><button id="realBtn" aria-pressed="${S.real}">${tr('tbl_real')}</button><button id="nomBtn" aria-pressed="${!S.real}">${tr('tbl_nom')}</button></div></div>
    <div class="tblwrap"><table id="tbl"></table></div></section>
  <section class="panel notes"><h3 style="color:var(--ink)">${tr('notes_title')}</h3><ul>${L().notes.map(n => `<li>${n}</li>`).join('')}</ul>
    <p><a href="https://claude.ai/artifact/KXpM8v45x8zd3oTMMLeYML" target="_blank" rel="noopener" style="color:var(--accent)">${tr('research')}</a></p></section>`;
  el.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { S.strat = b.dataset.st; save(); animNext = true; el.querySelectorAll('[data-st]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); refresh(); });
  bindFields($('#adjust'), () => { refreshSoon(); });
  $('#yearR').oninput = e => { S.sel = +e.target.value; save(); renderYear(); };
  $('#playBtn').onclick = () => playing ? stopPlay() : startPlay();
  $('#realBtn').onclick = () => { S.real = true; save(); $('#realBtn').setAttribute('aria-pressed', 'true'); $('#nomBtn').setAttribute('aria-pressed', 'false'); renderTable(); renderChain(); };
  $('#nomBtn').onclick = () => { S.real = false; save(); $('#realBtn').setAttribute('aria-pressed', 'false'); $('#nomBtn').setAttribute('aria-pressed', 'true'); renderTable(); renderChain(); };
  buildFlow();
  refresh();
}
let pend = false;
function refreshSoon() { if (pend) return; pend = true; requestAnimationFrame(() => { pend = false; refresh(); }); }
function renderStratCtl() {
  const c = $('#stratCtl');
  let h = '';
  if (S.strat === 'lump') h = `<div class="field"><label for="lumpR">${tr('ctl_lump', S.lumpYears)}</label><div class="numrow"><input type="range" id="lumpR" min="1" max="5" step="1" value="${S.lumpYears}"></div></div>`;
  if (S.strat === 'target') {
    const ticks = [[54345, '54 345'], [70000, '70 000'], [P.clawThr, '95 323'], [117045, '117 045'], [155320, '155 320']];
    const p = v => (v - 20000) / (250000 - 20000) * 100;
    h = `<div class="field"><label for="tgtR">${tr('ctl_target')} : <span class="num" id="tgtV">${money(S.target)}</span></label><div class="numrow"><input type="range" id="tgtR" min="20000" max="250000" step="1000" value="${S.target}"></div>
      <div class="ticks">${ticks.map(([v, l]) => `<button data-tv="${v}" style="left:${p(v)}%">${l}</button>`).join('')}</div></div>`;
  }
  if (S.strat === 'fixed') h = `<div class="field"><label for="fixR">${tr('ctl_fixed')} : <span class="num" id="fixV">${money(S.fixed)}</span></label><div class="numrow"><input type="range" id="fixR" min="0" max="500000" step="1000" value="${S.fixed}"></div></div>`;
  if (S.strat === 'best') h = `<p>${BEST.useMin ? tr('best_min') : tr('best_t', money(BEST.T))}</p>`;
  c.innerHTML = h;
  const lr = $('#lumpR'); if (lr) lr.oninput = () => { S.lumpYears = +lr.value; c.querySelector('label').textContent = tr('ctl_lump', S.lumpYears); save(); refreshSoon(); };
  const tg = $('#tgtR'); if (tg) { tg.oninput = () => { S.target = +tg.value; $('#tgtV').textContent = money(S.target); save(); refreshSoon(); }; c.querySelectorAll('[data-tv]').forEach(b => b.onclick = () => { S.target = +b.dataset.tv; tg.value = S.target; $('#tgtV').textContent = money(S.target); save(); animNext = true; refresh(); }); }
  const fx = $('#fixR'); if (fx) fx.oninput = () => { S.fixed = +fx.value; $('#fixV').textContent = money(S.fixed); save(); refreshSoon(); };
}
function refresh() {
  compute();
  if (S.strat === 'best' || !$('#stratCtl').children.length || $('#stratCtl').dataset.for !== S.strat) { renderStratCtl(); $('#stratCtl').dataset.for = S.strat; }
  const yr = $('#yearR'); yr.max = R.years.length - 1; yr.value = S.sel;
  const min = CMP[0].r, tot = realTot(R);
  $('#hlLead').textContent = tr('hl_lead', S.deathAge);
  tween($('#hlBig'), R.estateReal, money, 900);
  const d = R.estateReal - min.estateReal, dEl = $('#hlDelta');
  if (S.strat === 'min' || Math.abs(d) < 1) { dEl.textContent = tr('same_min'); dEl.className = 'delta'; }
  else { dEl.textContent = tr('vs_min', (d > 0 ? '+' : '−') + money(Math.abs(d))); dEl.className = 'delta ' + (d > 0 ? 'pos' : 'neg'); }
  tween($('#tTax'), tot.tax, money); tween($('#tClaw'), tot.claw, money); tween($('#tDent'), tot.dental, money); tween($('#tGis'), tot.gis, money);
  renderCmp(); renderYear(); renderCharts(); renderTable();
  animNext = false;
}
function renderCmp() {
  const max = Math.max(1, ...CMP.map(c => c.r.estateReal));
  const bestV = Math.max(...CMP.map(c => c.r.estateReal));
  const cur = R;
  const box = $('#cmp');
  const bestKey = (CMP.find(c => Math.abs(c.r.estateReal - bestV) < 1) || {}).key;
  const html = CMP.map(c => {
    const sel = c.r === cur || (c.key === 'min' && S.strat === 'min') || (c.key === 'best' && S.strat === 'best');
    const w = Math.max(2, c.r.estateReal / max * 100);
    const bad = c.r.estateReal < CMP[0].r.estateReal * .9;
    return `<button class="cmp-row ${sel ? 'sel' : ''} ${bad && !sel ? 'bad' : ''}" data-ck2="${c.key}"><span class="lbl">${tr(c.l)}${c.key === bestKey ? ` <span class="pill">${tr('best')}</span>` : ''}</span>
      <span class="cmp-track"><span class="cmp-fill" style="width:${animNext ? 0 : w}%" data-w="${w}"><span>${money(c.r.estateReal)}</span></span></span></button>`;
  }).join('');
  box.innerHTML = html;
  requestAnimationFrame(() => requestAnimationFrame(() => box.querySelectorAll('.cmp-fill').forEach(f => f.style.width = f.dataset.w + '%')));
  box.querySelectorAll('[data-ck2]').forEach(b => b.onclick = () => {
    const c = CMP.find(x => x.key === b.dataset.ck2); if (c.key === 'custom') return;
    c.set && c.set(); S.strat = c.st; save(); animNext = true;
    $('#strats').querySelectorAll('[data-st]').forEach(o => o.setAttribute('aria-pressed', String(o.dataset.st === S.strat)));
    $('#stratCtl').dataset.for = ''; refresh();
  });
}

/* flux animé */
const FN = { ferr: [20, 30, 160, 70], other: [20, 125, 160, 70], draw: [20, 220, 160, 70], mid: [300, 110, 160, 100], tax: [600, 20, 140, 70], spend: [600, 125, 140, 70], save: [600, 230, 140, 70] };
let flowLinks = [], particles = [], flowRAF = null;
function buildFlow() {
  const svg = $('#flow');
  const links = [['ferr', 'mid', 'var(--ferr)'], ['other', 'mid', 'var(--spend)'], ['draw', 'mid', 'var(--nr)'], ['mid', 'tax', 'var(--tax)'], ['mid', 'spend', 'var(--spend)'], ['mid', 'save', 'var(--nr)']];
  let h = '';
  flowLinks = links.map(([a, b, col], i) => {
    const A = FN[a], B = FN[b];
    const x1 = A[0] + A[2], y1 = A[1] + A[3] / 2, x2 = B[0], y2 = B[1] + B[3] / 2;
    const yIn = a === 'mid' ? A[1] + A[3] / 2 + (i - 4) * 22 : y1, yOut = b === 'mid' ? B[1] + B[3] / 2 + (i - 1) * 22 : y2;
    const d = `M${x1},${yIn} C${(x1 + x2) / 2},${yIn} ${(x1 + x2) / 2},${yOut} ${x2},${yOut}`;
    h += `<path class="lnk" id="lk${i}" d="${d}" stroke="${col}" stroke-width="2"/>`;
    return { i, a, b, col, amt: 0 };
  });
  h += `<g id="parts"></g>`;
  for (const [k, [x, y, w, hh]] of Object.entries(FN)) {
    h += `<g class="node" id="nd_${k}"><rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="10"/>
      <text x="${x + 12}" y="${y + 24}">${tr('n_' + k)}</text><text class="amt" id="na_${k}" x="${x + 12}" y="${y + 48}">0</text></g>`;
  }
  svg.innerHTML = h;
  flowLinks.forEach(l => { l.el = $('#lk' + l.i, svg); l.len = l.el.getTotalLength(); });
  if (!RM && !flowRAF) { let last = performance.now(); const loop = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; stepParticles(dt); flowRAF = requestAnimationFrame(loop); }; flowRAF = requestAnimationFrame(loop); }
}
function setFlow(v) {
  const max = Math.max(1, v.mid);
  const amts = [v.ferr, v.other, v.draw, v.tax, v.spend, v.save];
  flowLinks.forEach((l, i) => { l.amt = amts[i]; l.el.setAttribute('stroke-width', Math.max(amts[i] > 0 ? 2 : 0, amts[i] / max * 44)); });
  for (const k of Object.keys(FN)) { const t = $('#na_' + k); if (t) tween(t, v[k], money, 600); const g = $('#nd_' + k); if (g) g.style.opacity = v[k] > 0.5 ? 1 : .35; }
  const want = [];
  flowLinks.forEach((l, i) => { const n = l.amt > 0 ? Math.max(1, Math.round(l.amt / max * 16)) : 0; for (let j = 0; j < n; j++) want.push({ li: i, u: Math.random() }); });
  const g = $('#parts'); g.innerHTML = '';
  particles = want.map(p => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 3.2); c.setAttribute('fill', flowLinks[p.li].col); g.appendChild(c); return { ...p, el: c, sp: .35 + Math.random() * .2 }; });
  stepParticles(0);
}
function stepParticles(dt) {
  for (const p of particles) {
    const l = flowLinks[p.li]; p.u = (p.u + dt * p.sp) % 1;
    const pt = l.el.getPointAtLength(p.u * l.len);
    p.el.setAttribute('cx', pt.x); p.el.setAttribute('cy', pt.y);
    p.el.setAttribute('opacity', Math.sin(p.u * Math.PI).toFixed(2));
  }
}

function yearFlowValues(y) {
  const h = y.h, sp = h.tb;
  const taxes = h.ta.fed + h.ta.qc + h.ta.claw + h.ta.ramq - h.ta.sa + (sp ? sp.fed + sp.qc + sp.claw + sp.ramq - sp.sa : 0);
  const other = h.inflow - y.w;
  const draw = y.drawB + y.drawT;
  return { ferr: y.w, other, draw, mid: h.inflow + draw, tax: Math.max(0, taxes), spend: y.spend + h.dentalCost, save: Math.max(0, y.surplus) };
}
const D = (x, y) => S.real ? x / y.k : x;
function renderYear() {
  const y = R.years[S.sel];
  $('#yearLbl').textContent = `${y.year} · ${y.age} ${tr('years')}`;
  $('#yearR').value = S.sel;
  const v = yearFlowValues(y), vd = {};
  for (const k in v) vd[k] = D(v[k], y);
  setFlow(vd);
  const sw = $('#shortWarn'); sw.hidden = !y.shortfall; if (y.shortfall) sw.textContent = tr('short', money(D(y.shortfall, y)));
  renderChain(); renderDollar(y, v);
  document.querySelectorAll('#incChart rect.b, #balChart rect.b').forEach(r => r.classList.toggle('sel', +r.dataset.i === S.sel));
  document.querySelectorAll('#tbl tbody tr').forEach(r => r.classList.toggle('cur', +r.dataset.i === S.sel));
}
function renderChain() {
  const y = R.years[S.sel]; if (!y) return;
  $('#chain').innerHTML = chainRows(y).map((r, i) => `<li class="${r.cls || ''}" style="animation-delay:${i * 35}ms"><span>${r.l}</span><span class="v">${r.v}</span>${r.f ? `<span class="f">${r.f}</span>` : ''}</li>`).join('');
}
// Étapes du calcul d'une année (servent à l'écran et au rapport PDF)
function chainRows(y) {
  const h = y.h, ta = h.ta, m = x => money(D(x, y));
  const rows = [];
  const row = (l, v, f, cls) => rows.push({ l, v, f, cls });
  row(tr('ch_F', y.year), m(y.Fstart));
  row(tr('ch_min', y.age, pct(y.minPct)), m(y.minW), tr('ch_minf', m(y.Fstart), pct(y.minPct), m(y.minW)));
  if (S.type === 'frv') row(tr('ch_frv'), m(y.maxW), pct(y.maxPct));
  row(tr('ch_w'), m(y.w), y.extraW > 1 ? `${tr('ch_extra')} : ${m(y.extraW)}` : '', 'ok');
  row(tr('ch_other'), m(h.base.rente + h.base.other));
  if (h.oas) row(tr('ch_oas'), m(h.oas));
  if (h.gis > 1) row(tr('ch_gis'), m(h.gis));
  if (y.interest + y.div + y.cgReal > 1) row(tr('ch_inv'), m(y.interest + y.div + y.cgReal * .5), tr('ch_invf', m(y.interest), m(y.div), m(y.cgReal)));
  row(tr('ch_net'), m(ta.netBefore), h.amt > 1 ? tr('ch_split', m(h.amt)) : '');
  const thr = P.clawThr * y.k;
  if (ta.claw > 0) row(tr('ch_claw'), '−' + m(ta.claw), tr('ch_clawf', m(ta.netBefore), m(thr)), 'hl');
  else if (h.oas) row(tr('ch_claw'), m(0), tr('ch_clawn', m(thr)));
  row(tr('ch_fed'), '−' + m(ta.fed), tr('ch_fedf', m(ta.fedBasic)));
  row(tr('ch_qc'), '−' + m(ta.qc), `${m(ta.qcBasic)} ${tr('ch_qcf')}`);
  row(tr('ch_misc'), (ta.ramq - ta.sa >= 0 ? '−' : '+') + m(Math.abs(ta.ramq - ta.sa)));
  if (h.tb) row(tr('ch_spouse'), '−' + m(h.tb.fed + h.tb.qc + h.tb.claw + h.tb.ramq - h.tb.sa));
  const st = S.dentalIns ? tr('dent_ins') : h.copay === 0 ? tr('dent_free') : h.copay === .4 ? tr('dent_40') : h.copay === .6 ? tr('dent_60') : tr('dent_none');
  row(tr('ch_dent'), h.dentalCost > 0 ? '−' + m(h.dentalCost) : m(0), tr('ch_dentf', m(h.famNet), st), h.copay > 0 && !S.dentalIns ? 'hl' : '');
  row(tr('ch_spend'), '−' + m(y.spend));
  if (y.surplus >= 0) row(tr('ch_res_s'), m(y.surplus), tr('ch_resf_s', m(y.toB), S.tfsaUse ? tr('ch_tfsa', m(y.toT)) : ''), 'ok');
  else row(tr('ch_res_d'), m(y.drawB + y.drawT));
  const mr = marginalRate(inputs(), y);
  row(tr('ch_mr'), pct(mr, 1), tr('ch_mrf'), mr > .5 ? 'hl' : '');
  row(tr('ch_end'), '', tr('ch_endf', m(y.Fend), m(y.Bend), S.tfsaUse ? ' · ' + tr('lg_tfsa') + ' ' + m(y.Tend) : ''));
  if (y === R.years[R.years.length - 1]) row(tr('ch_death'), '−' + m(R.deathTax), '', 'hl');
  return rows;
}
function renderDollar(y, v) {
  const h = y.h, sp = h.tb;
  const segs = [
    ['d_fed', h.ta.fed + (sp ? sp.fed : 0), 'var(--tax)'], ['d_qc', h.ta.qc + (sp ? sp.qc : 0), 'color-mix(in srgb, var(--tax) 65%, var(--surface))'],
    ['d_claw', h.ta.claw + (sp ? sp.claw : 0), 'var(--claw)'], ['d_misc', Math.max(0, h.ta.ramq - h.ta.sa + (sp ? sp.ramq - sp.sa : 0)) + h.dentalCost, 'var(--tfsa)'],
    ['d_spend', y.spend, 'var(--spend)'], ['d_save', Math.max(0, y.surplus), 'var(--nr)']];
  const tot = segs.reduce((a, s) => a + s[1], 0) || 1;
  const box = $('#dollar');
  if (box.children.length !== segs.length) box.innerHTML = segs.map(s => `<div style="background:${s[2]};flex-grow:0"></div>`).join('');
  [...box.children].forEach((c, i) => { c.style.flexGrow = segs[i][1] / tot; c.title = `${tr(segs[i][0])} : ${money(D(segs[i][1], y))}`; });
  $('#dollarLg').innerHTML = segs.map(s => `<span><i style="background:${s[2]}"></i>${tr(s[0])} <b class="num">${Math.round(s[1] / tot * 100)} %</b></span>`).join('');
}
function renderCharts() {
  const ys = R.years, n = ys.length;
  // revenu net
  const W = 520, H = 260, pl = 50, pr = 10, pt = 18, pb = 26;
  const inc = ys.map(y => y.h.ta.netBefore / y.k);
  const full = S.age >= 75 ? 161320 : 155320;
  // une année exceptionnelle (ex. tout sortir) ne doit pas écraser l'échelle
  const sorted = [...inc].sort((a, b) => b - a);
  const typical = sorted.length > 1 ? sorted[1] : sorted[0];
  const top = Math.max(200000, Math.min(sorted[0], typical * 1.3, Math.max(typical * 1.3, 220000)) * 1.08);
  const sy = v => pt + (H - pt - pb) * (1 - Math.min(v, top) / top), bw = (W - pl - pr) / n;
  const kfmt = v => v >= 1e6 ? num(v / 1e6) + ' M' : Math.round(v / 1000) + ' k';
  let g = '';
  const step = niceStep(top);
  for (let v = 0; v <= top; v += step) g += `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}"/><text x="${pl - 6}" y="${sy(v) + 4}" text-anchor="end">${kfmt(v)}</text>`;
  const thr = [[P.clawThr, 'var(--tax)'], [full, 'var(--claw)']];
  if (!S.dentalIns) thr.push([70000, 'var(--good)'], [90000, 'var(--muted)']);
  thr.forEach(([v, c]) => { if (v < top) g += `<line class="thr" x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="${c}"/>`; });
  ys.forEach((y, i) => {
    const v = inc[i], x = pl + i * bw + bw * .15, w = bw * .7;
    const col = v > full ? 'var(--claw)' : v > P.clawThr ? 'var(--tax)' : 'var(--ferr)';
    g += `<rect class="b" data-i="${i}" x="${x}" y="${sy(v)}" width="${w}" height="${Math.max(0, sy(0) - sy(v))}" fill="${col}" rx="1.5" style="animation-delay:${i * 30}ms"><title>${y.year} : ${money(v)}</title></rect>`;
    if (v > top) {
      const yb = pt + 10;
      g += `<path d="M${x - 2},${yb + 4} l${w / 4 + 1},-5 l${w / 4},5 l${w / 4},-5 l${w / 4 + 1},5" stroke="var(--surface)" stroke-width="3" fill="none"/>`;
      g += `<text x="${Math.min(x + w + 4, W - pr - 2)}" y="${pt + 4}" text-anchor="${x + w + 60 > W ? 'end' : 'start'}" style="fill:var(--ink);font-weight:500">${y.age} : ${money(v)}</text>`;
    }
  });
  const lab = Math.ceil(n / 8);
  ys.forEach((y, i) => { if (i % lab === 0) g += `<text x="${pl + i * bw + bw / 2}" y="${H - 8}" text-anchor="middle">${y.age}</text>`; });
  const ic = $('#incChart'); ic.innerHTML = g; ic.classList.toggle('anim', animNext);
  const dash = c => `<i style="background:none;border-top:2px dashed ${c};height:0;width:16px;border-radius:0"></i>`;
  const sw = c => `<i style="background:${c}"></i>`;
  $('#incLg').innerHTML = [
    sw('var(--ferr)') + tr('lg_under'), sw('var(--tax)') + tr('lg_part'), sw('var(--claw)') + tr('lg_lost'),
    dash('var(--tax)') + tr('thr_claw') + ' ' + money(P.clawThr), dash('var(--claw)') + tr('thr_full') + ' ' + money(full),
    ...(S.dentalIns ? [] : [dash('var(--good)') + tr('thr_d70') + ' ' + money(70000), dash('var(--muted)') + tr('thr_d90') + ' ' + money(90000)])
  ].map(s => `<span>${s}</span>`).join('');
  // patrimoine
  const H2 = 240, pb2 = 26;
  const tots = ys.map(y => (y.Fend + y.Bend + y.Tend) / y.k);
  const top2 = Math.max(1, ...tots) * 1.08;
  const sy2 = v => pt + (H2 - pt - pb2) * (1 - v / top2);
  let g2 = '';
  const st2 = niceStep(top2);
  for (let v = 0; v <= top2; v += st2) g2 += `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${sy2(v)}" y2="${sy2(v)}"/><text x="${pl - 6}" y="${sy2(v) + 4}" text-anchor="end">${v >= 1e6 ? num(v / 1e6) + 'M' : Math.round(v / 1000) + 'k'}</text>`;
  ys.forEach((y, i) => {
    const x = pl + i * bw + bw * .15; let base = 0;
    for (const [val, col] of [[y.Fend / y.k, 'var(--ferr)'], [y.Bend / y.k, 'var(--nr)'], [y.Tend / y.k, 'var(--tfsa)']]) {
      if (val > 0) g2 += `<rect class="b" data-i="${i}" x="${x}" y="${sy2(base + val)}" width="${bw * .7}" height="${Math.max(0, sy2(base) - sy2(base + val))}" fill="${col}" style="animation-delay:${i * 30}ms"><title>${y.year} : ${money(val)}</title></rect>`;
      base += val;
    }
  });
  ys.forEach((y, i) => { if (i % lab === 0) g2 += `<text x="${pl + i * bw + bw / 2}" y="${H2 - 8}" text-anchor="middle">${y.age}</text>`; });
  const bc = $('#balChart'); bc.innerHTML = g2; bc.classList.toggle('anim', animNext);
  [ic, bc].forEach(svg => svg.querySelectorAll('rect.b').forEach(r => r.addEventListener('click', () => { S.sel = +r.dataset.i; save(); renderYear(); })));
  document.querySelectorAll('#incChart rect.b, #balChart rect.b').forEach(r => r.classList.toggle('sel', +r.dataset.i === S.sel));
}
function niceStep(top) { const raw = top / 4, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p; return (m < 1.5 ? 1 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10) * p; }
function renderTable() {
  const th = L().th;
  const rows = R.years.map((y, i) => {
    const h = y.h, m = x => money(D(x, y)), sp = h.tb;
    return `<tr data-i="${i}" class="${i === S.sel ? 'cur' : ''}"><td>${y.year}</td><td>${y.age}</td><td>${m(y.Fstart)}</td><td>${m(y.minW)}</td><td>${m(y.w)}</td><td>${m(h.ta.netBefore)}</td><td>${m(h.oas)}</td><td>${m(h.ta.claw)}</td>
      <td>${m(h.ta.fed + (sp ? sp.fed : 0))}</td><td>${m(h.ta.qc + (sp ? sp.qc : 0))}</td><td>${m(h.dentalCost)}</td><td>${m(y.spend)}</td><td>${(y.surplus >= 0 ? '+' : '−') + m(Math.abs(y.surplus >= 0 ? y.surplus : y.drawB + y.drawT))}</td>
      <td>${m(y.Bend)}</td><td>${m(y.Tend)}</td><td>${m(y.Fend)}</td></tr>`;
  }).join('');
  $('#tbl').innerHTML = `<thead><tr>${th.map(t => `<th>${t}</th>`).join('')}</tr></thead><tbody>${rows}</tbody>`;
  $('#tbl').querySelectorAll('tbody tr').forEach(r => r.onclick = () => { S.sel = +r.dataset.i; save(); renderYear(); });
}
function startPlay() {
  if (S.sel >= R.years.length - 1) S.sel = 0;
  $('#playBtn').textContent = tr('pause');
  playing = setInterval(() => { if (S.sel >= R.years.length - 1) { stopPlay(); return; } S.sel++; renderYear(); }, 1100);
  renderYear();
}
function stopPlay() { if (playing) clearInterval(playing); playing = null; const b = $('#playBtn'); if (b) b.textContent = tr('play'); }

/* ---------- langue et démarrage ---------- */
function applyLang() {
  document.documentElement.lang = S.lang;
  document.title = tr('brand');
  document.querySelectorAll('[data-t]').forEach(e => e.textContent = tr(e.dataset.t));
  applyTheme();
  $('#lang-fr').setAttribute('aria-pressed', String(S.lang === 'fr')); $('#lang-en').setAttribute('aria-pressed', String(S.lang === 'en'));
}
function isDark() { return S.theme ? S.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
function applyTheme() {
  if (S.theme) document.documentElement.setAttribute('data-theme', S.theme);
  const b = $('#themeBtn'); b.textContent = isDark() ? tr('th_light') : tr('th_dark');
}
$('#themeBtn').onclick = () => { S.theme = isDark() ? 'light' : 'dark'; save(); applyTheme(); };
function setLang(l) { S.lang = l; save(); applyLang(); onLangChange(); if (S.view === 'sim') { stopPlay(); flowRAF && cancelAnimationFrame(flowRAF); flowRAF = null; buildSim(); } else renderWizard(); }
$('#lang-fr').onclick = () => setLang('fr'); $('#lang-en').onclick = () => setLang('en');
$('#editBtn').onclick = goWizard;
// le démarrage est appelé par session.js, qui peut d'abord charger un lien de partage
function boot() { applyLang(); if (S.view === 'sim') goSim(); else renderWizard(); }
