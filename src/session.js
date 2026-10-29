// Sauvegarde : automatique (navigateur), « Enregistrer » sous un nom, « Mes scénarios », « Partager » (lien). Rien n'est envoyé à un serveur.
Object.assign(I18N.fr, {
  autosaved: '✓ Enregistré automatiquement', save_btn: 'Enregistrer', scen_btn: 'Mes scénarios', share_btn: 'Partager',
  pdf_btn: 'Rapport PDF', pdf_busy: 'Préparation du PDF…', close: 'Fermer', cancel: 'Annuler',
  sv_title: 'Enregistrer ce scénario', sc_name: 'Nom du scénario', sv_until: (a) => `jusqu'à ${a} ans`,
  sv_hint: 'Le scénario reste dans ce navigateur. Vous le retrouverez dans « Mes scénarios ».',
  sc_save: 'Enregistrer', sc_replace: 'Remplacer', sc_saved: (n) => `Scénario « ${n} » enregistré.`,
  sc_title: 'Mes scénarios', sc_none: 'Aucun scénario enregistré pour l\'instant. Utilisez « Enregistrer » dans les résultats pour garder la situation actuelle sous un nom, puis comparez-la avec une autre.',
  sc_foot: 'Les scénarios restent dans ce navigateur, sur cet appareil.', sc_act: 'ouvert', sc_mod: 'modifié',
  sc_open: 'Ouvrir', sc_cmp: 'Comparer', sc_more: 'Plus d\'actions', sc_ren: 'Renommer', sc_del: 'Supprimer', sc_delok: 'Confirmer la suppression', sc_ok: 'OK',
  sc_loaded: (n) => `Scénario « ${n} » ouvert.`, sc_renamed: (n) => `Renommé en « ${n} ».`, sc_taken: (n) => `Un scénario s'appelle déjà « ${n} ». Choisissez un autre nom.`, sc_age: (a, d) => `${a} ans, jusqu'à ${d} ans`,
  sc_estate: (x) => `patrimoine au décès ${x}`, saved_at: (d) => `enregistré le ${d}`,
  link_title: 'Lien de partage', link_copied: 'Lien copié. Il contient vos chiffres : envoyez-le seulement à des personnes de confiance.',
  link_manual: 'Copiez ce lien (Ctrl+C), puis collez-le dans un courriel. Il contient vos chiffres : envoyez-le seulement à des personnes de confiance.',
  link_loaded: 'Scénario ouvert à partir du lien.', file_none: 'Le téléchargement n\'est pas disponible ici.',
});
Object.assign(I18N.en, {
  autosaved: '✓ Saved automatically', save_btn: 'Save', scen_btn: 'My scenarios', share_btn: 'Share',
  pdf_btn: 'PDF report', pdf_busy: 'Preparing the PDF…', close: 'Close', cancel: 'Cancel',
  sv_title: 'Save this scenario', sc_name: 'Scenario name', sv_until: (a) => `up to age ${a}`,
  sv_hint: 'The scenario stays in this browser. You will find it in “My scenarios”.',
  sc_save: 'Save', sc_replace: 'Replace', sc_saved: (n) => `Scenario “${n}” saved.`,
  sc_title: 'My scenarios', sc_none: 'No saved scenarios yet. Use “Save” on the results to keep the current situation under a name, then compare it with another one.',
  sc_foot: 'Scenarios stay in this browser, on this device.', sc_act: 'open', sc_mod: 'modified',
  sc_open: 'Open', sc_cmp: 'Compare', sc_more: 'More actions', sc_ren: 'Rename', sc_del: 'Delete', sc_delok: 'Confirm deletion', sc_ok: 'OK',
  sc_loaded: (n) => `Scenario “${n}” opened.`, sc_renamed: (n) => `Renamed to “${n}”.`, sc_taken: (n) => `A scenario is already called “${n}”. Choose another name.`, sc_age: (a, d) => `age ${a}, up to ${d}`,
  sc_estate: (x) => `estate at death ${x}`, saved_at: (d) => `saved ${d}`,
  link_title: 'Share link', link_copied: 'Link copied. It contains your numbers: only send it to people you trust.',
  link_manual: 'Copy this link (Ctrl+C), then paste it into an email. It contains your numbers: only send it to people you trust.',
  link_loaded: 'Scenario opened from the link.', file_none: 'Downloading is not available here.',
});

const PUBLIC_URL = 'https://simulateur-ferr-bnzvmrkrfa-uk.a.run.app/';
const SAVE_KEYS = Object.keys(DEFAULTS).filter(k => !['lang', 'view', 'step', 'sel', 'scen'].includes(k));
const ENUMS = { type: ['ferr', 'frv'], strat: ['min', 'lump', 'target', 'fixed', 'best'] };
// Garde seulement les champs connus, du bon type : un lien ne peut rien injecter d'autre
function sanitize(o) {
  const out = {};
  if (!o || typeof o !== 'object') return out;
  for (const k of SAVE_KEYS) {
    const v = o[k], d = DEFAULTS[k];
    if (typeof v !== typeof d) continue;
    if (typeof v === 'number' && !Number.isFinite(v)) continue;
    if (ENUMS[k] && !ENUMS[k].includes(v)) continue;
    out[k] = v;
  }
  if (out.deathAge !== undefined && out.age !== undefined && out.deathAge <= out.age) out.deathAge = out.age + 1;
  return out;
}
const snapshot = () => sanitize(S);
const sameData = (a, b) => SAVE_KEYS.every(k => (a[k] ?? DEFAULTS[k]) === (b[k] ?? DEFAULTS[k]));
const validLang = l => (l === 'fr' || l === 'en') ? l : null;

/* ---------- scénarios ---------- */
function loadScen() { try { const a = JSON.parse(localStorage.getItem('ferrsim_scen') || '[]'); return Array.isArray(a) ? a.filter(x => x && typeof x.name === 'string').map(x => ({ name: x.name.slice(0, 80), savedAt: String(x.savedAt || ''), data: sanitize(x.data) })) : []; } catch (e) { return []; } }
function storeScen(a) { try { localStorage.setItem('ferrsim_scen', JSON.stringify(a)); } catch (e) { } }
function stratFor(inp) {
  switch (inp.strat) {
    case 'lump': return { kind: 'lump', years: inp.lumpYears };
    case 'target': return { kind: 'target', amount: inp.target };
    case 'fixed': return { kind: 'fixed', amount: inp.fixed };
    default: return { kind: 'min' };
  }
}
// Résultat d'un jeu de données, sans toucher à l'état affiché
function resultFor(d) {
  const inp = { ...DEFAULTS, ...d };
  if (inp.strat !== 'best') return simulate(inp, stratFor(inp));
  const rmin = simulate(inp, { kind: 'min' }), b = bestTarget(inp);
  return b.r.estateReal > rmin.estateReal + Math.max(100, Math.abs(rmin.estateReal) * .001) ? b.r : rmin;
}
function stratLabel(d) {
  const x = { ...DEFAULTS, ...d };
  const base = tr('st_' + x.strat);
  if (x.strat === 'lump') return `${base} · ${tr('ctl_lump', x.lumpYears)}`;
  if (x.strat === 'target' || x.strat === 'fixed') return `${base} · ${money(x.strat === 'target' ? x.target : x.fixed)}`;
  return base;
}
const fmtDate = iso => { try { return new Intl.DateTimeFormat(loc(), { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso)); } catch (e) { return ''; } };

/* ---------- fichiers (rapport PDF) ---------- */
let DL = null;
try { if (window.claude && typeof window.claude.use === 'function') window.claude.use('downloads').then(d => { DL = d; }, () => { }); } catch (e) { }
// Enregistre un fichier créé dans le navigateur (capacité « downloads » dans claude.ai, sinon lien de téléchargement)
async function saveFile(filename, blob) {
  if (DL) {
    try { await DL.save({ filename, data: blob }); return true; }
    catch (e) { if (e && e.code === 'declined') return false; if (e && e.code !== 'unavailable' && e.code !== 'not_granted') { toast(tr('file_none')); return false; } }
  }
  const url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return true;
}
const today = () => new Date().toISOString().slice(0, 10);
const slug = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase().slice(0, 40);

/* ---------- lien de partage ---------- */
const b64u = s => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => { const b = atob(s.replace(/-/g, '+').replace(/_/g, '/')); try { return decodeURIComponent(escape(b)); } catch (e) { return b; } };
function shareBase() {
  let top = false; try { top = window.top === window; } catch (e) { }
  return top && /^https?:$/.test(location.protocol) ? location.origin + location.pathname : PUBLIC_URL;
}
// Seuls les champs qui diffèrent des valeurs d'exemple vont dans le lien, pour qu'il reste court
function diffFromDefaults(d) { const o = {}; for (const k of SAVE_KEYS) if (d[k] !== undefined && d[k] !== DEFAULTS[k]) o[k] = d[k]; return o; }
function shareLink() { return shareBase() + '#s=' + b64u(JSON.stringify({ v: 1, lang: S.lang, ...diffFromDefaults(snapshot()) })); }
async function copyLink(url) {
  try { await navigator.clipboard.writeText(url); toast(tr('link_copied')); }
  catch (e) { openLinkBox(url); }
}
function readHash() {
  const m = /^#([sc])=([A-Za-z0-9_-]+)$/.exec(location.hash);
  if (!m) return null;
  let o = null; try { o = JSON.parse(unb64u(m[2])); } catch (e) { }
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
  if (!o || typeof o !== 'object') return null;
  const lang = validLang(o.lang) || S.lang;
  if (m[1] === 'c') {
    if (!openCmpLink(o, lang)) return null;
    save(); return 'c';
  }
  S = { ...DEFAULTS, ...keepPrefs(), lang, ...sanitize(o), view: 'sim', sel: 0, step: 1, scen: '', started: true, cmpA: S.cmpA, cmpB: S.cmpB };
  save();
  return 's';
}

/* ---------- appliquer un jeu de données ---------- */
function applyData(d, name) {
  leaveSim();
  S = { ...DEFAULTS, ...keepPrefs(), ...d, view: 'sim', sel: 0, step: 1, scen: name || '', started: true, cmpA: S.cmpA, cmpB: S.cmpB };
  save(); applyLang(); goSim();
}
function rebuildView() {
  leaveSim();
  if (S.view === 'sim') goSim(); else if (S.view === 'cmp') goCmp(); else { showView(); dir = 1; renderWizard(); }
}

/* ---------- petits outils ---------- */
let toastT = null;
function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 4200);
}
// Bouton à deux temps : le premier clic demande confirmation, le second agit
const armed = new Map();
function arm(btn, key, labelKey, okKey, fn) {
  if (armed.get(key)) { armed.delete(key); fn(); return; }
  armed.set(key, true); btn.textContent = tr(okKey); btn.classList.add('danger');
  setTimeout(() => { if (armed.get(key)) { armed.delete(key); btn.textContent = tr(labelKey); btn.classList.remove('danger'); } }, 3500);
}

/* ---------- fenêtres : Enregistrer, Mes scénarios, lien ---------- */
let dlgMode = null, linkUrl = '';
const dlgHead = (t) => `<div class="dlg-head"><h2 id="sessT">${t}</h2><button class="btn" id="dlgClose">${tr('close')}</button></div>`;
function openDlg(mode) { dlgMode = mode; const d = $('#sessDlg'); if (!d.open) { d.innerHTML = ''; d.showModal(); } renderDlg(); }
const openSave = () => openDlg('save');
const openScen = () => openDlg('scen');
function openLinkBox(url) { linkUrl = url; openDlg('link'); }
function renderDlg() {
  const dlg = $('#sessDlg'); if (!dlg.open) return;
  if (dlgMode === 'save') renderSave(dlg); else if (dlgMode === 'link') renderLink(dlg); else renderScen(dlg);
  $('#dlgClose').onclick = () => dlg.close();
}
function suggestName() {
  // Le nom du scénario ouvert, tant qu'il n'a pas été modifié ; sinon un nom qui décrit la situation
  const sc = S.scen && loadScen().find(x => x.name === S.scen);
  if (sc && sameData(sc.data, snapshot())) return S.scen;
  return `${stratLabel(S)}, ${tr('sv_until', S.deathAge)}`;
}
function renderSave(dlg) {
  const typed = ($('#scName') && $('#scName').value) || suggestName();
  const exists = n => loadScen().some(x => x.name === n.trim());
  dlg.innerHTML = `<div class="dlg-in">${dlgHead(tr('sv_title'))}
    <form class="scform" id="scForm"><label for="scName" class="small">${tr('sc_name')}</label>
      <div class="scrow"><input id="scName" maxlength="80" autocomplete="off" value="${esc(typed)}"></div>
      <p class="small muted">${tr('sv_hint')}</p>
      <div class="scbtns"><button class="btn" type="button" id="svCancel">${tr('cancel')}</button><button class="btn primary" id="scSave" type="submit">${exists(typed) ? tr('sc_replace') : tr('sc_save')}</button></div></form></div>`;
  const nm = $('#scName'); nm.focus(); nm.select();
  nm.oninput = () => { $('#scSave').textContent = exists(nm.value) ? tr('sc_replace') : tr('sc_save'); };
  $('#svCancel').onclick = () => dlg.close();
  $('#scForm').onsubmit = e => {
    e.preventDefault(); const name = nm.value.trim(); if (!name) { nm.focus(); return; }
    const l = loadScen().filter(x => x.name !== name); l.push({ name, savedAt: new Date().toISOString(), data: snapshot() }); storeScen(l);
    S.scen = name; save(); dlg.close(); toast(tr('sc_saved', name));
  };
}
function renderLink(dlg) {
  dlg.innerHTML = `<div class="dlg-in">${dlgHead(tr('link_title'))}<p class="small muted">${tr('link_manual')}</p>
    <div class="scrow"><input id="linkBox" readonly value="${esc(linkUrl)}" aria-label="${esc(tr('link_title'))}"></div></div>`;
  const box = $('#linkBox'); box.focus(); box.select(); box.onfocus = () => box.select();
}
function renderScen(dlg) {
  const list = loadScen(), cur = snapshot();
  const vals = list.map(r => resultFor(r.data).estateReal), max = Math.max(1, ...vals);
  dlg.innerHTML = `<div class="dlg-in">${dlgHead(tr('sc_title'))}
    <div class="sclist">${list.length ? list.map((r, i) => {
      const x = { ...DEFAULTS, ...r.data }, act = r.name === S.scen, mod = act && !sameData(r.data, cur);
      return `<div class="scitem ${act ? 'act' : ''}">
        <div class="scmeta"><div class="scname" id="scn${i}"><b>${esc(r.name)}</b>${act ? ` <span class="pill">${tr('sc_act')}</span>` : ''}${mod ? ` <span class="pill care">${tr('sc_mod')}</span>` : ''}</div>
          <span class="small muted">${esc(stratLabel(r.data))} · ${tr('sc_age', x.age, x.deathAge)} · FERR ${money(x.ferr)}${r.savedAt ? ` · ${tr('saved_at', fmtDate(r.savedAt))}` : ''}</span>
          <div class="scbar" title="${esc(tr('sc_estate', money(vals[i])))}"><span style="width:${Math.max(2, vals[i] / max * 100)}%"></span><b class="num">${money(vals[i])}</b></div></div>
        <div class="scbtns">${act && !mod ? '' : `<button class="btn" data-open="${i}">${tr('sc_open')}</button>`}<button class="btn" data-cmp="${i}">${tr('sc_cmp')}</button>
          <details class="more"><summary class="btn" aria-label="${esc(tr('sc_more'))}" title="${esc(tr('sc_more'))}">⋯</summary><div class="menu"><button data-ren="${i}">${tr('sc_ren')}</button><button class="danger" data-del="${i}">${tr('sc_del')}</button></div></details></div></div>`;
    }).join('') : `<p class="small muted">${tr('sc_none')}</p>`}</div>
    ${list.length ? `<p class="small muted">${tr('sc_foot')}</p>` : ''}</div>`;
  const byIdx = b => loadScen()[+b.dataset[Object.keys(b.dataset)[0]]];
  dlg.querySelectorAll('[data-open]').forEach(b => b.onclick = () => { const sc = byIdx(b); if (!sc) return; dlg.close(); applyData(sc.data, sc.name); toast(tr('sc_loaded', sc.name)); });
  dlg.querySelectorAll('[data-cmp]').forEach(b => b.onclick = () => { const sc = byIdx(b); if (!sc) return; dlg.close(); compareWith(sc); });
  dlg.querySelectorAll('[data-del]').forEach(b => b.onclick = () => arm(b, 'del' + b.dataset.del, 'sc_del', 'sc_delok', () => {
    const l = loadScen(), gone = l.splice(+b.dataset.del, 1)[0]; storeScen(l); if (gone && gone.name === S.scen) { S.scen = ''; save(); } renderScen(dlg); onScenChange();
  }));
  dlg.querySelectorAll('[data-ren]').forEach(b => b.onclick = () => {
    const i = +b.dataset.ren, sc = loadScen()[i]; if (!sc) return;
    const box = $('#scn' + i);
    box.innerHTML = `<form class="scrow" id="renF" style="width:100%"><input id="renI" maxlength="80" value="${esc(sc.name)}" aria-label="${esc(tr('sc_name'))}"><button class="btn primary">${tr('sc_ok')}</button></form>`;
    const inp = $('#renI'); inp.focus(); inp.select();
    $('#renF').onsubmit = e => {
      e.preventDefault(); const name = inp.value.trim(); if (!name || name === sc.name) { renderScen(dlg); return; }
      const l = loadScen(), j = l.findIndex(x => x.name === sc.name); if (j < 0) return;
      // Un nom déjà pris ne doit jamais écraser l'autre scénario
      if (l.some(x => x.name === name)) { toast(tr('sc_taken', name)); inp.focus(); inp.select(); return; }
      l[j].name = name; storeScen(l); if (S.scen === sc.name) { S.scen = name; save(); } renameInCmp(sc.name, name); renderScen(dlg); onScenChange(); toast(tr('sc_renamed', name));
    };
  });
}
function onLangChange() { renderDlg(); renderHelp(); }
// Une liste de scénarios modifiée doit se refléter dans l'accueil et la comparaison
function onScenChange() { if (S.view === 'cmp') buildCmp(); else if (S.view === 'wizard' && S.step === 0) renderWizard(); }

$('#saveBtn').onclick = openSave;
$('#scenBtn').onclick = openScen;
$('#shareBtn').onclick = () => copyLink(S.view === 'cmp' ? cmpLink() : shareLink());
$('#sessDlg').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
window.addEventListener('hashchange', () => { const h = readHash(); if (h) { applyLang(); rebuildView(); toast(tr(h === 'c' ? 'cv_loaded' : 'link_loaded')); } });

const fromLink = readHash();
boot(!!fromLink);
if (fromLink) toast(tr(fromLink === 'c' ? 'cv_loaded' : 'link_loaded'));
