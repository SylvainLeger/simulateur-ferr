// Fenêtre « Aide » : utiliser le simulateur, où vont les données (confidentialité), limites de l'outil
Object.assign(I18N.fr, {
  help_btn: 'Aide', h_title: 'Aide', h_t_use: 'Utiliser', h_t_data: 'Vos données', h_t_lim: 'Limites',
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
  help_btn: 'Help', h_title: 'Help', h_t_use: 'How to use', h_t_data: 'Your data', h_t_lim: 'Limits',
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

let helpTab = 'use';
function openHelp(tab) { if (tab) helpTab = tab; const d = $('#helpDlg'); if (!d.open) d.showModal(); renderHelp(); }
function renderHelp() {
  const dlg = $('#helpDlg'); if (!dlg || !dlg.open) return;
  const tabs = [['use', 'h_t_use'], ['data', 'h_t_data'], ['lim', 'h_t_lim']];
  const row = ([t, d], badge) => `<div class="hrow"><div><b>${t}</b><span class="small muted">${d}</span></div>${badge}</div>`;
  let body = '';
  if (helpTab === 'use') body = `<ol class="hsteps">${trl('h_use').map(x => `<li>${x}</li>`).join('')}</ol>`;
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
  if (w) w.onclick = () => arm(w, 'wipe', 'h_wipe', 'h_wipe_ok', () => {
    try { localStorage.removeItem('ferrsim'); localStorage.removeItem('ferrsim_scen'); } catch (e) { }
    leaveSim(); S = { ...DEFAULTS, ...keepPrefs(), started: false };
    dlg.close(); save(); showView(); dir = -1; renderWizard(); toast(tr('h_wiped'));
  });
}
$('#helpBtn').onclick = () => openHelp();
$('#helpDlg').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
