// Fenêtre « Aide » : utiliser le simulateur, où vont les données (confidentialité), limites de l'outil
Object.assign(I18N.fr, {
  help_btn: 'Aide', h_title: 'Aide', h_t_rules: 'Les règles', r_inc: 'Revenu imposable', r_rate: 'Taux', r_src: 'Sources :', r_intro: 'Voici les règles et les montants de 2026 que le simulateur utilise. Chaque section indique d\'où viennent les chiffres.', r_check: 'Chiffres vérifiés le 30 octobre 2026 auprès des sources ci-dessus. Les montants changent chaque année : vérifiez les sources avant une décision.', h_t_use: 'Utiliser', h_t_data: 'Vos données', h_t_lim: 'Limites',
  h_use: [
    'Répondez aux six questions, ou voyez tout de suite un exemple déjà rempli.',
    'Dans les résultats, choisissez une stratégie de retrait. Le patrimoine laissé, les impôts et la PSV récupérée se mettent à jour, et chaque calcul est détaillé année par année.',
    'Vos réponses s\'enregistrent toutes seules dans ce navigateur. En revenant, l\'accueil propose de reprendre votre simulation.',
    '« Enregistrer » garde la situation actuelle sous un nom. Vous la retrouvez dans « Mes scénarios ».',
    '« Comparer » met deux scénarios côte à côte, avec l\'écart entre les deux et la liste de ce qui diffère.',
    '« Partager » copie un lien vers la situation affichée. Il permet aussi de la rouvrir sur un autre ordinateur.',
    '« Rapport PDF » crée un rapport à imprimer ou à envoyer, dans la langue de l\'écran.',
  ],
  h_data_t: 'Où vont vos données ?', h_local: 'sur l\'appareil', h_care: 'prudence',
  h_data: [
    ['Les calculs se font dans votre navigateur', 'Les chiffres que vous entrez ne sont jamais envoyés au serveur. Le serveur sert seulement la page.'],
    ['La sauvegarde reste sur cet appareil', 'Vos réponses et vos scénarios sont gardés dans ce navigateur. Ils ne quittent jamais cet appareil.'],
    ['Le rapport PDF est créé sur votre appareil', 'Il n\'est envoyé nulle part. C\'est vous qui décidez à qui le donner.'],
  ],
  h_link: ['Un lien de partage contient vos chiffres', 'Ils sont écrits dans l\'adresse du lien, avec le nom des scénarios comparés. Envoyez-le seulement à des personnes de confiance.'],
  h_wipe_t: ['Sur un ordinateur partagé', 'Quiconque utilise ce navigateur peut voir vos réponses. Effacez-les quand vous avez fini.'],
  h_wipe: 'Effacer mes données', h_wipe_ok: 'Confirmer l\'effacement', h_wiped: 'Réponses et scénarios effacés de ce navigateur.',
  h_code: 'Le code du simulateur est public. Il ne contient que des exemples génériques, aucune donnée personnelle.',
});
Object.assign(I18N.en, {
  help_btn: 'Help', h_title: 'Help', h_t_rules: 'The rules', r_inc: 'Taxable income', r_rate: 'Rate', r_src: 'Sources:', r_intro: 'Here are the 2026 rules and amounts the simulator uses. Each section shows where the numbers come from.', r_check: 'Figures checked on October 30, 2026 against the sources above. Amounts change every year: check the sources before making a decision.', h_t_use: 'How to use', h_t_data: 'Your data', h_t_lim: 'Limits',
  h_use: [
    'Answer the six questions, or see a filled-in example right away.',
    'On the results, pick a withdrawal strategy. The estate left, taxes and OAS recovery update, and every calculation is detailed year by year.',
    'Your answers are saved automatically in this browser. When you come back, the home page offers to resume your simulation.',
    '“Save” keeps the current situation under a name. You will find it in “My scenarios”.',
    '“Compare” puts two scenarios side by side, with the gap between them and a list of what differs.',
    '“Share” copies a link to the situation on screen. It also lets you reopen it on another computer.',
    '“PDF report” creates a report to print or send, in the language of the screen.',
  ],
  h_data_t: 'Where does your data go?', h_local: 'on this device', h_care: 'be careful',
  h_data: [
    ['Calculations run in your browser', 'The numbers you enter are never sent to the server. The server only delivers the page.'],
    ['Saving stays on this device', 'Your answers and scenarios are kept in this browser. They never leave this device.'],
    ['The PDF report is created on your device', 'It is not sent anywhere. You decide who gets it.'],
  ],
  h_link: ['A share link contains your numbers', 'They are written into the link address, along with the names of compared scenarios. Only send it to people you trust.'],
  h_wipe_t: ['On a shared computer', 'Anyone using this browser can see your answers. Clear them when you are done.'],
  h_wipe: 'Clear my data', h_wipe_ok: 'Confirm clearing', h_wiped: 'Answers and scenarios cleared from this browser.',
  h_code: 'The simulator code is public. It only contains generic examples, no personal data.',
});

// Onglet « Les règles » : les paramètres 2026 utilisés par le calcul, chacun avec sa source officielle
const SRC = {
  rrif: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/completing-slips-summaries/t4rsp-t4rif-information-returns/payments/chart-prescribed-factors.html',
  oas: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/payments.html',
  claw: 'https://www.canada.ca/en/services/benefits/publicpensions/old-age-security/recovery-tax.html',
  fed: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/tax-rates-brackets/current-year.html',
  fedAmt: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/adjustment-personal-income-tax-benefit-amounts.html',
  qc: 'https://cdn-contenu.quebec.ca/cdn-contenu/adm/min/finances/publications-adm/parametres/AUTFR_RegimeImpot2026.pdf',
  rcgt: 'https://www.rcgt.com/contentassets/5142f7cf936d42d7aa7666314c21ccd1/impot-des-particuliers---quebec---2026.pdf',
  dental: 'https://www.canada.ca/fr/services/prestations/dentaire/regime-soins-dentaires/couverture/exemples-quotesparts-frais-supplementaires.html',
  sa: 'https://www.revenuquebec.ca/fr/citoyens/credits-dimpot/credit-dimpot-pour-soutien-aux-aines/montant-du-credit-dimpot-pour-soutien-aux-aines/',
  ramq: 'https://www.quebec.ca/nouvelles/actualites/details/ajustement-des-tarifs-pour-les-personnes-couvertes-par-le-regime-public-dassurance-medicaments-71515',
};
const rpct = (x, d = 2) => new Intl.NumberFormat(loc(), { style: 'percent', minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
function rulesData() {
  const m = money, fr = S.lang === 'fr';
  const band = br => br.map(([lim, r], i) => [!i ? `${fr ? 'jusqu\'à' : 'up to'} ${m(lim)}` : lim === Infinity ? `${fr ? 'plus de' : 'over'} ${m(br[i - 1][0])}` : `${m(br[i - 1][0])} ${fr ? 'à' : 'to'} ${m(lim)}`, r]);
  const fedRows = band(P.fedBr).map(([a, r]) => [a, rpct(r, 1)]), qcRows = band(P.qcBr).map(([a, r]) => [a, rpct(r)]);
  return fr ? [
    { t: 'Le retrait minimum du FERR', p: [
      'Chaque année : solde au 31 décembre précédent × pourcentage selon l\'âge au début de l\'année. Avant 71 ans, le pourcentage est 1 ÷ (90 − âge). Il n\'y a pas de maximum pour un FERR ordinaire.',
      'Au décès, le solde restant est imposé en entier dans la dernière déclaration, sauf s\'il passe à un conjoint.'],
      table: 'rrif', src: [['Agence du revenu du Canada : facteurs prescrits du FERR', SRC.rrif]] },
    { t: 'Pension de la Sécurité de la vieillesse (PSV)', p: [
      'Maximum d\'octobre à décembre 2026 : 762,50 $ par mois de 65 à 74 ans, 838,75 $ à 75 ans et plus.',
      `Récupération : 15 % du revenu net au-delà de ${m(P.clawThr)} (revenu 2026). La PSV est entièrement récupérée vers 155 320 $ (65 à 74 ans) ou 161 320 $ (75 ans et plus).`,
      `Supplément de revenu garanti (SRG), personne seule : jusqu'à 1 138,90 $ par mois, si le revenu (sans la PSV) est sous ${m(P.gisCutSingle)}.`],
      src: [['Canada.ca : montants de la PSV et du SRG', SRC.oas], ['Canada.ca : impôt de récupération de la PSV', SRC.claw]] },
    { t: 'Impôt fédéral 2026', p: [
      `Montant personnel de base : ${m(P.fedBPA)}. Montant en raison de l'âge : ${m(P.fedAge)}, réduit de 15 % du revenu net au-delà de ${m(P.fedAgeThr)}. Montant pour revenu de pension : ${m(P.fedPension)}. Crédits à 14 %.`,
      'Au Québec, l\'impôt fédéral est réduit de 16,5 % (abattement du Québec).'],
      rows: fedRows, src: [['Agence du revenu du Canada : taux et tranches 2026', SRC.fed], ['Agence du revenu du Canada : montants indexés 2026', SRC.fedAmt]] },
    { t: 'Impôt du Québec 2026', p: [
      `Montant personnel de base : ${m(P.qcBase)}. Âge (65 ans et plus) : ${m(P.qcAge)}, personne vivant seule : ${m(P.qcAlone)}, revenus de retraite : jusqu'à ${m(P.qcRet)}. Ces trois montants sont réduits de 18,75 % du revenu familial au-delà de ${m(P.qcRedThr)}. Crédits à 14 %.`,
      'Taux marginal combiné le plus élevé (fédéral et Québec) : 53,31 %, au-delà de 258 482 $.'],
      rows: qcRows, src: [['Finances Québec : paramètres du régime d\'imposition 2026', SRC.qc], ['Raymond Chabot Grant Thornton : impôt des particuliers Québec 2026', SRC.rcgt]] },
    { t: 'Avantages qui dépendent du revenu', p: [
      'Régime canadien de soins dentaires (sans autre assurance dentaire) : gratuit sous 70 000 $ de revenu familial net ajusté, quote-part de 40 % de 70 000 $ à 79 999 $, de 60 % de 80 000 $ à 89 999 $, non admissible à 90 000 $ et plus.',
      `Crédit d'impôt pour soutien aux aînés (Québec, 70 ans et plus) : jusqu'à ${m(P.saMax)}, réduit de 5,47 % du revenu familial au-delà de ${m(P.saThrS)} (personne seule) ou ${m(P.saThrC)} (couple).`,
      'Prime du régime public d\'assurance médicaments, payée dans la déclaration du Québec : elle monte avec le revenu jusqu\'à 789 $ par année (du 1er juillet 2026 au 30 juin 2027). Le simulateur l\'estime de façon simplifiée.'],
      src: [['Canada.ca : quotes-parts des soins dentaires', SRC.dental], ['Revenu Québec : crédit pour soutien aux aînés', SRC.sa], ['Québec.ca : tarifs de l\'assurance médicaments 2026', SRC.ramq]] },
    { t: 'Placements hors FERR', p: [
      'Intérêts : imposés à 100 % chaque année. Dividendes canadiens déterminés : majorés de 38 %, puis crédits pour dividendes de 15,02 % (fédéral) et 11,70 % (Québec). Gains en capital : imposés à 50 %, seulement à la vente.',
      `Le CELI ne compte pas dans le revenu. Nouveaux droits en 2026 : ${m(P.tfsaLimit)}.`],
      src: [['Agence du revenu du Canada : montants indexés 2026 (CELI)', SRC.fedAmt], ['Raymond Chabot Grant Thornton : impôt des particuliers Québec 2026', SRC.rcgt]] },
  ] : [
    { t: 'The RRIF minimum withdrawal', p: [
      'Each year: balance on December 31 of the previous year × a percentage based on age at the start of the year. Before 71, the percentage is 1 ÷ (90 − age). A regular RRIF has no maximum.',
      'At death, the remaining balance is fully taxed on the final return, unless it passes to a spouse.'],
      table: 'rrif', src: [['Canada Revenue Agency: RRIF prescribed factors', SRC.rrif]] },
    { t: 'Old Age Security (OAS) pension', p: [
      'Maximum for October to December 2026: $762.50 a month at 65 to 74, $838.75 at 75 and over.',
      `Recovery tax: 15% of net income above ${m(P.clawThr)} (2026 income). OAS is fully recovered at about $155,320 (65 to 74) or $161,320 (75 and over).`,
      `Guaranteed Income Supplement (GIS), single person: up to $1,138.90 a month, if income (without OAS) is under ${m(P.gisCutSingle)}.`],
      src: [['Canada.ca: OAS and GIS amounts', SRC.oas], ['Canada.ca: OAS recovery tax', SRC.claw]] },
    { t: 'Federal income tax 2026', p: [
      `Basic personal amount: ${m(P.fedBPA)}. Age amount: ${m(P.fedAge)}, reduced by 15% of net income above ${m(P.fedAgeThr)}. Pension income amount: ${m(P.fedPension)}. Credits at 14%.`,
      'In Quebec, federal tax is reduced by 16.5% (Quebec abatement).'],
      rows: fedRows, src: [['Canada Revenue Agency: 2026 rates and brackets', SRC.fed], ['Canada Revenue Agency: 2026 indexed amounts', SRC.fedAmt]] },
    { t: 'Quebec income tax 2026', p: [
      `Basic personal amount: ${m(P.qcBase)}. Age (65 and over): ${m(P.qcAge)}, living alone: ${m(P.qcAlone)}, retirement income: up to ${m(P.qcRet)}. These three amounts are reduced by 18.75% of family income above ${m(P.qcRedThr)}. Credits at 14%.`,
      'Highest combined marginal rate (federal and Quebec): 53.31%, above $258,482.'],
      rows: qcRows, src: [['Finances Québec: 2026 tax parameters (in French)', SRC.qc], ['Raymond Chabot Grant Thornton: Quebec personal tax 2026 (in French)', SRC.rcgt]] },
    { t: 'Income-tested benefits', p: [
      'Canadian Dental Care Plan (with no other dental insurance): free under $70,000 of adjusted family net income, 40% co-payment from $70,000 to $79,999, 60% from $80,000 to $89,999, not eligible at $90,000 and over.',
      `Quebec tax credit for seniors' support (70 and over): up to ${m(P.saMax)}, reduced by 5.47% of family income above ${m(P.saThrS)} (single) or ${m(P.saThrC)} (couple).`,
      'Public prescription drug insurance premium, paid on the Quebec return: it rises with income up to $789 a year (July 1, 2026 to June 30, 2027). The simulator estimates it in a simplified way.'],
      src: [['Canada.ca: dental care co-payments (in French)', SRC.dental], ['Revenu Québec: seniors\' support credit (in French)', SRC.sa], ['Québec.ca: 2026 drug insurance rates (in French)', SRC.ramq]] },
    { t: 'Investments outside the RRIF', p: [
      'Interest: 100% taxable every year. Eligible Canadian dividends: grossed up by 38%, then dividend credits of 15.02% (federal) and 11.70% (Quebec). Capital gains: 50% taxable, only when sold.',
      `A TFSA does not count as income. New room in 2026: ${m(P.tfsaLimit)}.`],
      src: [['Canada Revenue Agency: 2026 indexed amounts (TFSA)', SRC.fedAmt], ['Raymond Chabot Grant Thornton: Quebec personal tax 2026 (in French)', SRC.rcgt]] },
  ];
}
function rulesHTML() {
  const ages = [65, 66, 67, 68, 69, 70, ...Object.keys(MINP).map(Number), 95];
  const rrif = `<div class="rgrid">${ages.map(a => `<span><b>${a}${a === 95 ? '+' : ''}</b>${rpct(minPct(a))}</span>`).join('')}</div>`;
  const rows = r => `<table class="rtbl"><thead><tr><th>${tr('r_inc')}</th><th>${tr('r_rate')}</th></tr></thead><tbody>${r.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table>`;
  return `<p>${tr('r_intro')}</p>` + rulesData().map(sec => `<section class="rsec"><h3>${sec.t}</h3>${sec.p.map(x => `<p>${typo(x)}</p>`).join('')}
    ${sec.table ? rrif : ''}${sec.rows ? rows(sec.rows) : ''}
    <p class="rsrc"><b>${tr('r_src')}</b> ${sec.src.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${l}</a>`).join(' · ')}</p></section>`).join('')
    + `<p class="small muted">${tr('r_check')}</p>`;
}

let helpTab = 'use';
function openHelp(tab) { if (tab) helpTab = tab; const d = $('#helpDlg'); if (!d.open) d.showModal(); renderHelp(); }
function renderHelp() {
  const dlg = $('#helpDlg'); if (!dlg || !dlg.open) return;
  const tabs = [['use', 'h_t_use'], ['rules', 'h_t_rules'], ['data', 'h_t_data'], ['lim', 'h_t_lim']];
  const row = ([t, d], badge) => `<div class="hrow"><div><b>${t}</b><span class="small muted">${d}</span></div>${badge}</div>`;
  let body = '';
  if (helpTab === 'use') body = `<ol class="hsteps">${trl('h_use').map(x => `<li>${x}</li>`).join('')}</ol>`;
  else if (helpTab === 'rules') body = rulesHTML();
  else if (helpTab === 'data') body = `<h3>${tr('h_data_t')}</h3><div class="hlist">
      ${L().h_data.map(r => row(r.map(typo), `<span class="pill">${tr('h_local')}</span>`)).join('')}
      ${row(trl('h_link'), `<span class="pill care">${tr('h_care')}</span>`)}
      ${row(trl('h_wipe_t'), `<button class="btn" id="wipeBtn">${tr('h_wipe')}</button>`)}</div>
    <p class="small muted">${tr('h_code')}</p>`;
  else body = `<p>${tr('w_disc')}</p><ul class="hsteps">${trl('notes').map(n => `<li class="small">${n}</li>`).join('')}</ul>`;
  dlg.innerHTML = `<div class="dlg-in"><div class="dlg-head"><h2 id="helpT">${tr('h_title')}</h2><button class="btn" id="helpClose">${tr('close')}</button></div>
    <div class="tabs" role="tablist" aria-label="${esc(tr('h_title'))}">${tabs.map(([k, l]) => `<button role="tab" id="ht_${k}" aria-controls="hp" data-ht="${k}" aria-selected="${helpTab === k}" tabindex="${helpTab === k ? 0 : -1}">${tr(l)}</button>`).join('')}</div>
    <div role="tabpanel" id="hp" aria-labelledby="ht_${helpTab}" style="display:grid;gap:12px">${body}</div></div>`;
  $('#helpClose').onclick = () => dlg.close();
  const go = k => { helpTab = k; renderHelp(); $('#ht_' + k).focus(); };
  dlg.querySelectorAll('[data-ht]').forEach(b => {
    b.onclick = () => go(b.dataset.ht);
    // Flèches gauche et droite pour passer d'un onglet à l'autre
    b.onkeydown = e => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault(); const i = tabs.findIndex(t => t[0] === helpTab); go(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length][0]); };
  });
  const w = $('#wipeBtn');
  if (w) w.onclick = () => arm(w, 'wipe', 'h_wipe', 'h_wipe_ok', () => { dlg.close(); wipeAll(); });
}
// Efface les réponses et les scénarios de ce navigateur, puis revient à l'accueil (langue et mode d'affichage gardés)
function wipeAll() {
  try { localStorage.removeItem('ferrsim'); localStorage.removeItem('ferrsim_scen'); } catch (e) { }
  leaveSim(); S = { ...DEFAULTS, ...keepPrefs(), started: false };
  S.view = 'wizard'; S.step = 0; save(); showView(); dir = -1; renderWizard(); toast(tr('h_wiped'));
}
$('#helpBtn').onclick = () => openHelp();
$('#helpDlg').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
