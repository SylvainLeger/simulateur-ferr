// Sauvegarde : automatique (navigateur), scénarios nommés, fichier .json, lien de partage. Rien n'est envoyé à un serveur.
Object.assign(I18N.fr, {
  sess_btn: 'Scénarios et partage', pdf_btn: 'Rapport PDF', pdf_busy: 'Préparation du PDF…', close: 'Fermer',
  sess_title: 'Scénarios et partage',
  auto_title: 'Sauvegarde automatique', auto_txt: 'Chaque réponse est enregistrée dans ce navigateur, sur cet appareil. En rouvrant la page, vous retrouvez votre situation.',
  reset: 'Effacer et recommencer', reset_ok: 'Confirmer l\'effacement', reset_done: 'Réponses remises aux valeurs d\'exemple.',
  sc_title: 'Scénarios nommés', sc_txt: 'Enregistrez la situation actuelle sous un nom, puis comparez vos scénarios. Ils restent dans ce navigateur.',
  sc_name: 'Nom du scénario', sc_ph: 'Ex. : Minimum prescrit', sc_save: 'Enregistrer', sc_replace: 'Remplacer', sc_saved: (n) => `Scénario « ${n} » enregistré.`,
  sc_none: 'Aucun scénario enregistré pour l\'instant.', sc_cur: 'Situation actuelle', sc_mod: 'modifiée', sc_open: 'Ouvrir', sc_del: 'Supprimer', sc_delok: 'Confirmer',
  sc_loaded: (n) => `Scénario « ${n} » ouvert.`, sc_cmp: 'Patrimoine laissé après impôt au décès, en dollars de 2026', sc_age: (a, d) => `${a} ans, jusqu'à ${d} ans`,
  file_title: 'Fichier de session', file_txt: 'Téléchargez un fichier .json qui contient la situation actuelle et vos scénarios. Rouvrez-le sur un autre ordinateur ou envoyez-le à quelqu\'un.',
  file_save: 'Télécharger le fichier (.json)', file_open: 'Ouvrir un fichier', file_bad: 'Ce fichier n\'est pas une session du simulateur FERR.',
  file_ok: (n) => `Session ouverte${n ? ` : ${n} scénario${n > 1 ? 's' : ''} ajouté${n > 1 ? 's' : ''}` : ''}.`, file_none: 'Le téléchargement n\'est pas disponible ici.',
  link_title: 'Lien de partage', link_txt: 'Les paramètres sont placés dans le lien lui-même. Quiconque ouvre ce lien voit le même scénario. Le serveur ne reçoit pas ces données, mais la personne à qui vous envoyez le lien, oui.',
  link_copy: 'Copier le lien', link_copied: 'Lien copié.', link_sel: 'Lien sélectionné : faites Ctrl+C pour le copier.', link_loaded: 'Scénario ouvert à partir du lien.',
  saved_at: (d) => `enregistré le ${d}`,
});
Object.assign(I18N.en, {
  sess_btn: 'Scenarios & sharing', pdf_btn: 'PDF report', pdf_busy: 'Preparing the PDF…', close: 'Close',
  sess_title: 'Scenarios and sharing',
  auto_title: 'Automatic saving', auto_txt: 'Every answer is saved in this browser, on this device. Reopen the page and your situation is still there.',
  reset: 'Clear and start over', reset_ok: 'Confirm clearing', reset_done: 'Answers reset to the example values.',
  sc_title: 'Named scenarios', sc_txt: 'Save the current situation under a name, then compare your scenarios. They stay in this browser.',
  sc_name: 'Scenario name', sc_ph: 'E.g. Legal minimum', sc_save: 'Save', sc_replace: 'Replace', sc_saved: (n) => `Scenario “${n}” saved.`,
  sc_none: 'No saved scenarios yet.', sc_cur: 'Current situation', sc_mod: 'modified', sc_open: 'Open', sc_del: 'Delete', sc_delok: 'Confirm',
  sc_loaded: (n) => `Scenario “${n}” opened.`, sc_cmp: 'Estate left after tax at death, in 2026 dollars', sc_age: (a, d) => `age ${a}, up to ${d}`,
  file_title: 'Session file', file_txt: 'Download a .json file holding the current situation and your scenarios. Reopen it on another computer or send it to someone.',
  file_save: 'Download the file (.json)', file_open: 'Open a file', file_bad: 'This file is not a RRIF simulator session.',
  file_ok: (n) => `Session opened${n ? `: ${n} scenario${n > 1 ? 's' : ''} added` : ''}.`, file_none: 'Downloading is not available here.',
  link_title: 'Share link', link_txt: 'The settings are stored in the link itself. Anyone who opens it sees the same scenario. The server never receives this data, but the person you send the link to does.',
  link_copy: 'Copy link', link_copied: 'Link copied.', link_sel: 'Link selected: press Ctrl+C to copy it.', link_loaded: 'Scenario opened from the link.',
  saved_at: (d) => `saved ${d}`,
});

const PUBLIC_URL = 'https://simulateur-ferr-bnzvmrkrfa-uk.a.run.app/';
const SAVE_KEYS = Object.keys(DEFAULTS).filter(k => !['lang', 'view', 'step', 'sel', 'scen'].includes(k));
const ENUMS = { type: ['ferr', 'frv'], strat: ['min', 'lump', 'target', 'fixed', 'best'] };
// Garde seulement les champs connus, du bon type : un fichier ou un lien ne peut rien injecter d'autre
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

/* ---------- scénarios nommés ---------- */
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

/* ---------- fichiers ---------- */
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
function exportJSON() {
  const doc = { app: 'simulateur-ferr', format: 1, savedAt: new Date().toISOString(), lang: S.lang, name: S.scen || '', current: snapshot(), scenarios: loadScen() };
  saveFile(`simulateur-ferr-${slug(S.scen) || today()}.json`, new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' }));
}
function importJSON(file) {
  const rd = new FileReader();
  rd.onload = () => {
    let doc; try { doc = JSON.parse(rd.result); } catch (e) { doc = null; }
    if (!doc || doc.app !== 'simulateur-ferr' || typeof doc.current !== 'object') { toast(tr('file_bad')); return; }
    const list = loadScen(); let added = 0;
    for (const sc of Array.isArray(doc.scenarios) ? doc.scenarios : []) {
      if (!sc || typeof sc.name !== 'string' || !sc.name.trim()) continue;
      const data = sanitize(sc.data); let name = sc.name.trim().slice(0, 80);
      const same = list.find(x => x.name === name);
      if (same && sameData(same.data, data)) continue;
      if (same) { let i = 2; while (list.some(x => x.name === `${name} (${i})`)) i++; name = `${name} (${i})`; }
      list.push({ name, savedAt: String(sc.savedAt || new Date().toISOString()), data }); added++;
    }
    storeScen(list);
    applyData(sanitize(doc.current), typeof doc.name === 'string' ? doc.name.slice(0, 80) : '', validLang(doc.lang));
    toast(tr('file_ok', added));
  };
  rd.readAsText(file);
}

/* ---------- lien de partage ---------- */
const b64u = s => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => atob(s.replace(/-/g, '+').replace(/_/g, '/'));
function shareBase() {
  let top = false; try { top = window.top === window; } catch (e) { }
  return top && /^https?:$/.test(location.protocol) ? location.origin + location.pathname : PUBLIC_URL;
}
function shareLink() {
  const cur = snapshot(), diff = { v: 1, lang: S.lang };
  for (const k of SAVE_KEYS) if (cur[k] !== DEFAULTS[k]) diff[k] = cur[k];
  return shareBase() + '#s=' + b64u(JSON.stringify(diff));
}
function readHash() {
  const m = /^#s=([A-Za-z0-9_-]+)$/.exec(location.hash);
  if (!m) return false;
  let o = null; try { o = JSON.parse(unb64u(m[1])); } catch (e) { }
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { }
  if (!o) return false;
  S = { ...DEFAULTS, theme: S.theme, lang: validLang(o.lang) || S.lang, ...sanitize(o), view: 'sim', sel: 0, step: 1, scen: '' };
  save();
  return true;
}

/* ---------- appliquer un jeu de données ---------- */
function applyData(d, name, lang) {
  S = { ...DEFAULTS, theme: S.theme, lang: lang || S.lang, ...d, view: 'sim', sel: 0, step: 1, scen: name || '' };
  save(); applyLang(); rebuildView(); renderSess();
}
function rebuildView() {
  stopPlay(); if (flowRAF) cancelAnimationFrame(flowRAF); flowRAF = null;
  if (S.view === 'sim') { goSim(); return; }
  $('#sim').hidden = true; $('#wizard').hidden = false; $('#editBtn').hidden = true; dir = 1; renderWizard();
}

/* ---------- fenêtre « Scénarios et partage » ---------- */
let toastT = null;
function toast(msg) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 3200);
}
const armed = new Map();
function arm(btn, key, labelKey, okKey, fn) {
  if (armed.get(key)) { armed.delete(key); fn(); return; }
  armed.set(key, true); btn.textContent = tr(okKey); btn.classList.add('danger');
  setTimeout(() => { if (armed.get(key)) { armed.delete(key); btn.textContent = tr(labelKey); btn.classList.remove('danger'); } }, 3500);
}
function renderSess() {
  const dlg = $('#sessDlg'); if (!dlg || !dlg.open) return;
  const list = loadScen(), cur = snapshot();
  const rows = [{ name: tr('sc_cur'), data: cur, current: true }, ...list];
  const vals = rows.map(r => resultFor(r.data).estateReal);
  const max = Math.max(1, ...vals);
  const typed = ($('#scName') && $('#scName').value) || S.scen || '';
  const exists = list.some(x => x.name === typed.trim());
  dlg.innerHTML = `<div class="dlg-in"><div class="dlg-head"><h2 id="sessT">${tr('sess_title')}</h2><button class="btn" id="dlgClose">${tr('close')}</button></div>
  <section class="dsec"><h3>${tr('sc_title')}</h3><p class="small muted">${tr('sc_txt')}</p>
    <form class="scform" id="scForm"><label for="scName" class="small">${tr('sc_name')}</label>
      <div class="scrow"><input id="scName" maxlength="80" autocomplete="off" placeholder="${esc(tr('sc_ph'))}" value="${esc(typed)}"><button class="btn primary" id="scSave" type="submit">${exists ? tr('sc_replace') : tr('sc_save')}</button></div></form>
    <p class="small muted">${tr('sc_cmp')}</p>
    <div class="sclist">${rows.map((r, i) => {
      const x = { ...DEFAULTS, ...r.data }, active = !r.current && r.name === S.scen, mod = active && !sameData(r.data, cur);
      return `<div class="scitem ${r.current ? 'cur' : ''} ${active ? 'act' : ''}">
        <div class="scmeta"><b>${esc(r.name)}</b>${mod ? ` <span class="pill">${tr('sc_mod')}</span>` : ''}<span class="small muted">${esc(stratLabel(r.data))} · ${tr('sc_age', x.age, x.deathAge)} · ${money(x.ferr)}${r.savedAt ? ` · ${tr('saved_at', fmtDate(r.savedAt))}` : ''}</span></div>
        <div class="scbar"><span style="width:${Math.max(2, vals[i] / max * 100)}%"></span><b class="num">${money(vals[i])}</b></div>
        ${r.current ? '<div></div>' : `<div class="scbtns"><button class="btn" data-open="${i - 1}">${tr('sc_open')}</button><button class="btn" data-del="${i - 1}">${tr('sc_del')}</button></div>`}</div>`;
    }).join('')}${list.length ? '' : `<p class="small muted">${tr('sc_none')}</p>`}</div></section>
  <section class="dsec"><h3>${tr('link_title')}</h3><p class="small muted">${tr('link_txt')}</p>
    <div class="scrow"><input id="linkBox" readonly value="${esc(shareLink())}" aria-label="${esc(tr('link_title'))}"><button class="btn" id="linkCopy">${tr('link_copy')}</button></div></section>
  <section class="dsec"><h3>${tr('file_title')}</h3><p class="small muted">${tr('file_txt')}</p>
    <div class="scbtns"><button class="btn" id="jsonSave">${tr('file_save')}</button><label class="btn" for="jsonOpen">${tr('file_open')}</label><input type="file" id="jsonOpen" accept=".json,application/json" hidden></div></section>
  <section class="dsec"><h3>${tr('auto_title')}</h3><p class="small muted">${tr('auto_txt')}</p><div><button class="btn" id="resetBtn">${tr('reset')}</button></div></section></div>`;
  $('#dlgClose').onclick = () => dlg.close();
  const nm = $('#scName');
  nm.oninput = () => { $('#scSave').textContent = loadScen().some(x => x.name === nm.value.trim()) ? tr('sc_replace') : tr('sc_save'); };
  $('#scForm').onsubmit = e => {
    e.preventDefault(); const name = nm.value.trim(); if (!name) { nm.focus(); return; }
    const l = loadScen().filter(x => x.name !== name); l.push({ name, savedAt: new Date().toISOString(), data: snapshot() }); storeScen(l);
    S.scen = name; save(); nm.value = ''; renderSess(); toast(tr('sc_saved', name));
  };
  dlg.querySelectorAll('[data-open]').forEach(b => b.onclick = () => { const sc = loadScen()[+b.dataset.open]; if (!sc) return; applyData(sc.data, sc.name); toast(tr('sc_loaded', sc.name)); });
  dlg.querySelectorAll('[data-del]').forEach(b => b.onclick = () => arm(b, 'del' + b.dataset.del, 'sc_del', 'sc_delok', () => {
    const l = loadScen(), gone = l.splice(+b.dataset.del, 1)[0]; storeScen(l); if (gone && gone.name === S.scen) { S.scen = ''; save(); } renderSess();
  }));
  $('#linkCopy').onclick = async () => {
    const box = $('#linkBox');
    try { await navigator.clipboard.writeText(box.value); toast(tr('link_copied')); }
    catch (e) { box.focus(); box.select(); toast(tr('link_sel')); }
  };
  $('#linkBox').onfocus = e => e.target.select();
  $('#jsonSave').onclick = exportJSON;
  $('#jsonOpen').onchange = e => { const f = e.target.files && e.target.files[0]; if (f) importJSON(f); e.target.value = ''; };
  $('#resetBtn').onclick = () => arm($('#resetBtn'), 'reset', 'reset', 'reset_ok', () => {
    S = { ...DEFAULTS, lang: S.lang, theme: S.theme }; save(); dlg.close(); rebuildView(); toast(tr('reset_done'));
  });
}
function openSess() { const d = $('#sessDlg'); if (!d.open) d.showModal(); renderSess(); }
function onLangChange() { renderSess(); }
$('#sessBtn').onclick = openSess;
$('#sessDlg').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
window.addEventListener('hashchange', () => { if (readHash()) { applyLang(); rebuildView(); toast(tr('link_loaded')); } });

const fromLink = readHash();
boot();
if (fromLink) toast(tr('link_loaded'));
