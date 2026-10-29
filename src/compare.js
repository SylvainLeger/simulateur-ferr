// Mode « Comparer » : deux scénarios complets côte à côte (situation actuelle, scénario enregistré ou reçu par lien)
Object.assign(I18N.fr, {
  cmp_btn: 'Comparer', cmp_back: 'Retour aux résultats', share_cmp: 'Partager la comparaison', cv_loaded: 'Comparaison ouverte à partir du lien.',
  cv_title: 'Comparer deux scénarios', cv_sub: 'Chaque colonne prend une situation et une stratégie. Montants en dollars de 2026.',
  cv_a: 'Scénario A', cv_b: 'Scénario B',  cv_src: 'Situation', cv_cur: 'Situation actuelle', cv_link: (n) => `${n} (reçu par lien)`, cv_strat: 'Stratégie',
  cv_diff: 'Ce qui diffère', cv_same: 'Les deux colonnes utilisent les mêmes réponses et la même stratégie. Changez la stratégie ou la situation d\'une colonne.',
  cv_m_estate: 'Patrimoine laissé après impôt au décès', cv_gap: 'Écart B − A', cv_legend: 'Vert : avantage pour B. Orangé : désavantage pour B.',
  cv_chart: 'Avoir total (FERR + placements), année par année', cv_chart_sub: 'En dollars de 2026, avant l\'impôt au décès.',
  cv_tbl: 'Tableau année par année', cv_th: ['Âge', 'Retrait A', 'Retrait B', 'Revenu net A', 'Revenu net B', 'Avoir A', 'Avoir B', 'Écart d\'avoir'],
});
Object.assign(I18N.en, {
  cmp_btn: 'Compare', cmp_back: 'Back to results', share_cmp: 'Share the comparison', cv_loaded: 'Comparison opened from the link.',
  cv_title: 'Compare two scenarios', cv_sub: 'Each column takes a situation and a strategy. Amounts in 2026 dollars.',
  cv_a: 'Scenario A', cv_b: 'Scenario B',  cv_src: 'Situation', cv_cur: 'Current situation', cv_link: (n) => `${n} (from a link)`, cv_strat: 'Strategy',
  cv_diff: 'What differs', cv_same: 'Both columns use the same answers and the same strategy. Change the strategy or the situation of one column.',
  cv_m_estate: 'Estate left after tax at death', cv_gap: 'Gap B − A', cv_legend: 'Green: better for B. Orange: worse for B.',
  cv_chart: 'Total assets (RRIF + investments), year by year', cv_chart_sub: 'In 2026 dollars, before tax at death.',
  cv_tbl: 'Year-by-year table', cv_th: ['Age', 'Withdrawal A', 'Withdrawal B', 'Net income A', 'Net income B', 'Assets A', 'Assets B', 'Asset gap'],
});

const STRATS = ['min', 'lump', 'target', 'fixed', 'best'];
// Champs comparés dans « Ce qui diffère » : clé de libellé et format
const CV_FIELDS = [
  ['age', 'f_age', 'y'], ['deathAge', 'f_death', 'y'], ['type', 'r_type', 'type'], ['ferr', 'f_ferr', '$'], ['rF', 'f_rF', '%'],
  ['rrq', 'f_rrq', '$'], ['rente', 'f_rente', '$'], ['other', 'f_other', '$'], ['oas', 'f_oas', 'b'],
  ['couple', 'r_house', 'house'], ['sAge', 'f_sAge', 'y', 'couple'], ['sInc', 'f_sInc', '$', 'couple'], ['sOas', 'f_sOas', 'b', 'couple'], ['split', 'f_split', 'b', 'couple'],
  ['nr', 'f_nr', '$'], ['rNR', 'f_rNR', '%'], ['mixI', 'f_mixI', '%'], ['mixD', 'f_mixD', '%'], ['mixG', 'f_mixG', '%'],
  ['tfsaUse', 'f_tfsa', 'b'], ['tfsa', 'f_tfsaBal', '$', 'tfsaUse'], ['tfsaRoom', 'f_tfsaRoom', '$', 'tfsaUse'],
  ['spend', 'f_spend', '$'], ['inf', 'f_inf', '%'], ['dentalIns', 'f_dIns', 'b'], ['dentalVal', 'f_dVal', '$', '!dentalIns'],
];
function fmtField(f, v) {
  switch (f) {
    case 'y': return `${v} ${tr('years')}`;
    case '$': return money(v);
    case '%': return pct(v / 100, Number.isInteger(v) ? 0 : 2);
    case 'b': return tr(v ? 'yes' : 'no');
    case 'type': return tr(v === 'frv' ? 'o_frv' : 'o_ferr');
    case 'house': return tr(v ? 'o_couple' : 'o_alone');
  }
  return String(v);
}
const relevant = (cond, d) => !cond || (cond[0] === '!' ? !d[cond.slice(1)] : !!d[cond]);

/* ---------- colonnes ---------- */
// Une colonne = { src: 'cur' | 'sc' | 'data', name, data (pour 'data'), strat }
function validCol(c) {
  if (!c || typeof c !== 'object' || !STRATS.includes(c.strat)) return null;
  if (c.src === 'cur') return { src: 'cur', strat: c.strat };
  if (c.src === 'sc' && typeof c.name === 'string') return { src: 'sc', name: c.name.slice(0, 80), strat: c.strat };
  if (c.src === 'data' && c.data && typeof c.data === 'object') return { src: 'data', name: String(c.name || '').slice(0, 80), data: sanitize(c.data), strat: c.strat };
  return null;
}
// Stratégie par défaut de la colonne B : la première qui donne un résultat différent de A
function otherStrat(st) {
  const base = snapshot(), ref = resultFor({ ...base, strat: st }).estateReal;
  return ['min', 'fixed', 'lump', 'target', 'best'].find(k => k !== st && Math.abs(resultFor({ ...base, strat: k }).estateReal - ref) > 1) || (st === 'min' ? 'fixed' : 'min');
}
function colBase(c) {
  if (c.src === 'sc') { const sc = loadScen().find(x => x.name === c.name); if (sc) return sc.data; }
  if (c.src === 'data') return c.data;
  return snapshot();
}
const colData = c => ({ ...DEFAULTS, ...colBase(c), strat: c.strat });
function colTitle(c, key) {
  if (c.src === 'sc' && loadScen().some(x => x.name === c.name)) return c.name;
  if (c.src === 'data') return tr('cv_link', c.name || tr(key === 'b' ? 'cv_b' : 'cv_a'));
  return tr('cv_cur');
}
function ensureCols() {
  S.cmpA = validCol(S.cmpA) || { src: 'cur', strat: S.strat };
  S.cmpB = validCol(S.cmpB) || { src: 'cur', strat: otherStrat(S.cmpA.strat) };
}

/* ---------- entrer dans la comparaison ---------- */
function goCmp() { leaveSim(); S.view = 'cmp'; S.started = true; ensureCols(); save(); showView(); buildCmp(); navPush(); window.scrollTo({ top: 0 }); }
// Depuis les résultats : A = la situation affichée ; B garde son choix précédent s'il diffère encore de A
function startCmp() {
  const A = { src: 'cur', strat: S.strat }, B = validCol(S.cmpB);
  S.cmpA = A;
  S.cmpB = B && !(B.src === 'cur' && B.strat === A.strat) ? B : { src: 'cur', strat: otherStrat(A.strat) };
  goCmp();
}
// Depuis « Mes scénarios » : la situation actuelle face au scénario choisi
function compareWith(sc) {
  S.cmpA = { src: 'cur', strat: S.strat };
  S.cmpB = { src: 'sc', name: sc.name, strat: { ...DEFAULTS, ...sc.data }.strat };
  goCmp();
}
function renameInCmp(from, to) { for (const k of ['cmpA', 'cmpB']) if (S[k] && S[k].src === 'sc' && S[k].name === from) S[k].name = to; save(); }
$('#cmpBtn').onclick = () => { if (S.view === 'cmp') goSim(); else startCmp(); };

/* ---------- lien de comparaison ---------- */
function cmpLink() {
  ensureCols();
  const pack = c => ({ n: c.src === 'sc' ? c.name : c.src === 'data' ? c.name : '', d: diffFromDefaults(sanitize(colData(c))) });
  return shareBase() + '#c=' + b64u(JSON.stringify({ v: 1, lang: S.lang, a: pack(S.cmpA), b: pack(S.cmpB) }));
}
function openCmpLink(o, lang) {
  if (!o.a || !o.b || typeof o.a !== 'object' || typeof o.b !== 'object') return false;
  // Sans nom, la colonne s'appelle « Scénario A » ou « B » dans la langue affichée
  const col = p => { const d = { ...DEFAULTS, ...sanitize(p.d) }; return { src: 'data', name: typeof p.n === 'string' ? p.n.trim().slice(0, 80) : '', data: d, strat: d.strat }; };
  S = { ...S, lang, view: 'cmp', started: true, cmpA: col(o.a), cmpB: col(o.b) };
  return true;
}

/* ---------- affichage ---------- */
function colHTML(key, c) {
  const list = loadScen();
  const opts = [`<option value="cur" ${c.src === 'cur' ? 'selected' : ''}>${esc(tr('cv_cur'))}</option>`,
    ...list.map((x, i) => `<option value="sc${i}" ${c.src === 'sc' && c.name === x.name ? 'selected' : ''}>${esc(x.name)}</option>`),
    ...(c.src === 'data' ? [`<option value="data" selected>${esc(colTitle(c, key))}</option>`] : [])];
  return `<div class="cv-col ${key}"><span class="eyebrow" style="color:var(--ca)">${tr(key === 'a' ? 'cv_a' : 'cv_b')}</span>
    <label class="small muted" for="cvSrc_${key}">${tr('cv_src')}</label><select id="cvSrc_${key}" data-col="${key}">${opts.join('')}</select>
    <span class="small muted">${tr('cv_strat')}</span>
    <div class="strats" role="group" aria-label="${esc(tr('cv_strat'))}">${STRATS.map(k => `<button class="chip" data-col="${key}" data-cst="${k}" aria-pressed="${c.strat === k}">${tr('st_' + k)}</button>`).join('')}</div>
    <span class="small muted">${esc(stratLabel(colData(c)))}</span></div>`;
}
function diffList(a, b) {
  const out = [];
  const sa = stratLabel(a), sb = stratLabel(b);
  if (sa !== sb) out.push([tr('cv_strat'), sa, sb]);
  for (const [k, l, f, cond] of CV_FIELDS) {
    if (!relevant(cond, a) && !relevant(cond, b)) continue;
    if (a[k] !== b[k]) out.push([tr(l).replace(/\s*\?$/, ''), fmtField(f, a[k]), fmtField(f, b[k])]);
  }
  return out;
}
function cmpChart(ra, rb) {
  const W = 640, H = 280, pl = 56, pr = 16, pt = 14, pb = 28;
  const pts = r => r.years.map(y => [y.age, (y.Fend + y.Bend + y.Tend) / y.k]);
  const A = pts(ra), B = pts(rb), all = [...A, ...B];
  const a0 = Math.min(...all.map(p => p[0])), a1 = Math.max(...all.map(p => p[0]), a0 + 1);
  const top = Math.max(1, ...all.map(p => p[1])) * 1.08;
  const sx = a => pl + (a - a0) / (a1 - a0) * (W - pl - pr), sy = v => pt + (H - pt - pb) * (1 - v / top);
  const kfmt = v => v >= 1e6 ? (S.lang === 'fr' ? `${num(v / 1e6)}\u00a0M$` : `$${num(v / 1e6)}M`) : kmoney(v);
  let g = '';
  const st = niceStep(top);
  for (let v = 0; v <= top; v += st) g += `<line class="grid" x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}"/><text x="${pl - 6}" y="${sy(v) + 4}" text-anchor="end">${kfmt(v)}</text>`;
  const every = Math.max(1, Math.ceil((a1 - a0) / 8));
  for (let a = a0; a <= a1; a += every) g += `<text x="${sx(a)}" y="${H - 8}" text-anchor="middle">${a}</text>`;
  const line = (p, col, dash) => `<polyline fill="none" stroke="${col}" stroke-width="2.5" stroke-linejoin="round" ${dash ? 'stroke-dasharray="7 5"' : ''} points="${p.map(([a, v]) => `${sx(a).toFixed(1)},${sy(v).toFixed(1)}`).join(' ')}"/>`
    + (p.length ? `<circle cx="${sx(p[p.length - 1][0])}" cy="${sy(p[p.length - 1][1])}" r="4" fill="${col}"/>` : '');
  return g + line(A, 'var(--ferr)', false) + line(B, 'var(--nr)', true);
}
let cmpFocus = null;
function buildCmp() {
  ensureCols();
  const A = S.cmpA, B = S.cmpB, da = colData(A), db = colData(B);
  const ra = resultFor(da), rb = resultFor(db), ta = realTot(ra), tb = realTot(rb);
  // Signe de l'écart : un montant plus élevé est-il un avantage pour B ?
  const rows = [
    ['cv_m_estate', ra.estateReal, rb.estateReal, true, 'big'],
    ['t_tax', ta.tax, tb.tax, false], ['t_claw', ta.claw, tb.claw, false], ['t_dent', ta.dental, tb.dental, false], ['t_gis', ta.gis, tb.gis, true],
  ];
  const gap = (a, b, upGood) => {
    const d = b - a; if (Math.abs(d) < 1) return `<span class="v">${money(0)}</span>`;
    const good = (d > 0) === upGood;
    return `<span class="v ${good ? 'gpos' : 'gneg'}">${d > 0 ? '+' : '−'}${money(Math.abs(d))}</span>`;
  };
  const diffs = diffList(da, db);
  const ages = [...new Set([...ra.years, ...rb.years].map(y => y.age))].sort((x, y) => x - y);
  const byAge = r => Object.fromEntries(r.years.map(y => [y.age, y]));
  const ya = byAge(ra), yb = byAge(rb), m = (y, f) => y ? money(f(y) / y.k) : '—';
  const tot = y => y.Fend + y.Bend + y.Tend;
  $('#cmpv').innerHTML = `
  <section class="panel"><div><h2>${tr('cv_title')}</h2><p class="small muted">${tr('cv_sub')}</p></div>
    <div class="cv-cols">${colHTML('a', A)}${colHTML('b', B)}</div>
    <div class="cv-diff"><h3>${tr('cv_diff')}</h3>${diffs.length ? `<ul>${diffs.map(([l, x, y]) => `<li><span class="muted">${esc(l)}${tr('sep')}</span> ${esc(x)} <span class="muted">→</span> ${esc(y)}</li>`).join('')}</ul>` : `<p class="small muted">${tr('cv_same')}</p>`}</div>
  </section>
  <section class="panel"><div class="cv-m">
    <div class="cv-r hd"><span class="l"></span><span class="v">A</span><span class="v">B</span><span class="v">${tr('cv_gap')}</span></div>
    ${rows.map(([l, a, b, up, cls]) => `<div class="cv-r ${cls || ''}"><span class="l">${tr(l)}</span><span class="v">${money(a)}</span><span class="v">${money(b)}</span>${gap(a, b, up)}</div>`).join('')}
  </div><p class="small muted">${tr('cv_legend')}</p></section>
  <section class="panel"><div><h3>${tr('cv_chart')}</h3><p class="small muted">${tr('cv_chart_sub')}</p></div>
    <svg class="chart" style="max-width:760px" viewBox="0 0 640 280" role="img" aria-label="${esc(tr('cv_chart'))}">${cmpChart(ra, rb)}</svg>
    <div class="legend cv-lg"><span><i style="background:var(--ferr)"></i>A · ${esc(colTitle(A, 'a'))} · ${esc(stratLabel(da))}</span><span><i class="dash"></i>B · ${esc(colTitle(B, 'b'))} · ${esc(stratLabel(db))}</span></div></section>
  <section class="panel"><details><summary>${tr('cv_tbl')}</summary>
    <div class="tblwrap" style="margin-top:12px"><table><thead><tr>${L().cv_th.map(t => `<th>${t}</th>`).join('')}</tr></thead><tbody>
    ${ages.map(a => { const x = ya[a], y = yb[a]; const g = x && y ? tot(y) / y.k - tot(x) / x.k : null;
      return `<tr><td>${a}</td><td>${m(x, v => v.w)}</td><td>${m(y, v => v.w)}</td><td>${m(x, v => v.h.ta.netBefore)}</td><td>${m(y, v => v.h.ta.netBefore)}</td><td>${m(x, tot)}</td><td>${m(y, tot)}</td>
        <td class="${g === null ? '' : g >= 0 ? 'gpos' : 'gneg'}">${g === null ? '—' : (g >= 0 ? '+' : '−') + money(Math.abs(g))}</td></tr>`; }).join('')}
    </tbody></table></div></details></section>`;
  const el = $('#cmpv');
  el.querySelectorAll('select[data-col]').forEach(sel => sel.onchange = () => {
    const key = sel.dataset.col === 'a' ? 'cmpA' : 'cmpB', v = sel.value;
    if (v === 'cur') S[key] = { src: 'cur', strat: S.strat };
    else if (v.startsWith('sc')) { const sc = loadScen()[+v.slice(2)]; if (sc) S[key] = { src: 'sc', name: sc.name, strat: { ...DEFAULTS, ...sc.data }.strat }; }
    save(); cmpFocus = '#' + sel.id; buildCmp();
  });
  el.querySelectorAll('[data-cst]').forEach(b => b.onclick = () => {
    const key = b.dataset.col === 'a' ? 'cmpA' : 'cmpB'; S[key] = { ...S[key], strat: b.dataset.cst }; save();
    cmpFocus = `[data-col="${b.dataset.col}"][data-cst="${b.dataset.cst}"]`; buildCmp();
  });
  if (cmpFocus) { const f = el.querySelector(cmpFocus); cmpFocus = null; if (f) f.focus({ preventScroll: true }); }
}
