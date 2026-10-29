// Rapport PDF créé dans le navigateur (pdfmake chargé à la demande), dans la langue de l'interface
Object.assign(I18N.fr, {
  rep_title: 'Rapport de simulation', rep_gen: (d) => `Produit le ${d}`, rep_scen: 'Scénario',
  rep_sit: 'La situation simulée', rep_strat: 'Stratégie de retrait retenue', rep_res: 'Résultat',
  rep_chain: (y, a) => `Le calcul, étape par étape : ${y} (${a} ans)`, rep_tbl: 'Tableau détaillé, année par année',
  rep_unit: (real) => real ? 'Montants en dollars de 2026.' : 'Montants en dollars courants.',
  rep_priv: 'Ce rapport a été créé dans le navigateur. Aucune donnée n\'a été envoyée à un serveur.',
  rep_disc: 'Outil éducatif basé sur les paramètres fiscaux 2026. Ce n\'est pas un conseil financier. Pour une décision réelle, validez avec un planificateur financier ou un fiscaliste.',
  rep_page: (c, n) => `Page ${c} de ${n}`, rep_fail: 'Le PDF n\'a pas pu être créé. Vérifiez la connexion Internet, puis réessayez.',
  r_type: 'Type de compte', r_house: 'Ménage', r_mix: (i, d, g) => `intérêts ${i} · dividendes ${d} · gains en capital ${g}`,
  r_file: 'rapport-ferr',
});
Object.assign(I18N.en, {
  rep_title: 'Simulation report', rep_gen: (d) => `Produced on ${d}`, rep_scen: 'Scenario',
  rep_sit: 'The simulated situation', rep_strat: 'Chosen withdrawal strategy', rep_res: 'Result',
  rep_chain: (y, a) => `The calculation, step by step: ${y} (age ${a})`, rep_tbl: 'Detailed table, year by year',
  rep_unit: (real) => real ? 'Amounts in 2026 dollars.' : 'Amounts in current dollars.',
  rep_priv: 'This report was created in the browser. No data was sent to a server.',
  rep_disc: 'Educational tool based on 2026 tax parameters. Not financial advice. For a real decision, check with a financial planner or tax specialist.',
  rep_page: (c, n) => `Page ${c} of ${n}`, rep_fail: 'The PDF could not be created. Check the Internet connection, then try again.',
  r_type: 'Account type', r_house: 'Household', r_mix: (i, d, g) => `interest ${i} · dividends ${d} · capital gains ${g}`,
  r_file: 'rrif-report',
});

const PDFLIB = ['https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/pdfmake.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/vfs_fonts.min.js'];
// Couleurs du thème clair : un PDF s'imprime sur du papier blanc
const PC = { ink: '#1b2420', muted: '#5a6762', line: '#d5dcd7', sunk: '#eef1ee', soft: '#dcece6', accent: '#0f6b5a', ferr: '#0f6b5a', nr: '#3d5a9e', tfsa: '#b7862a', tax: '#b24a22', claw: '#8c2f39', spend: '#7a8a83', good: '#2f7d4f', warn: '#a4471c' };
let pdfReady = null;
function loadPdfLib() {
  if (window.pdfMake && window.pdfMake.vfs) return Promise.resolve();
  if (pdfReady) return pdfReady;
  const load = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
  pdfReady = load(PDFLIB[0]).then(() => load(PDFLIB[1])).catch(e => { pdfReady = null; throw e; });
  return pdfReady;
}
// Les espaces fines insécables de fr-CA deviennent des espaces insécables ordinaires (présentes dans la police)
const pt = s => String(s ?? '').replace(/[  ]/g, ' ');
const svgEsc = s => pt(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function pdfIncomeSVG() {
  const ys = R.years, n = ys.length, W = 515, H = 200, pl = 46, pr = 6, pT = 10, pb = 20;
  const inc = ys.map(y => y.h.ta.netBefore / y.k), full = S.age >= 75 ? 161320 : 155320;
  const sorted = [...inc].sort((a, b) => b - a), typical = sorted.length > 1 ? sorted[1] : sorted[0];
  const top = Math.max(200000, Math.min(sorted[0], typical * 1.3, Math.max(typical * 1.3, 220000)) * 1.08);
  const sy = v => pT + (H - pT - pb) * (1 - Math.min(v, top) / top), bw = (W - pl - pr) / n;
  const txt = (x, y, s, a = 'end', c = PC.muted) => `<text x="${x}" y="${y}" font-family="Roboto" font-size="7.5" fill="${c}" text-anchor="${a}">${svgEsc(s)}</text>`;
  let g = '';
  const st = niceStep(top);
  for (let v = 0; v <= top; v += st) g += `<line x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="${PC.line}" stroke-width="0.6"/>` + txt(pl - 5, sy(v) + 3, Math.round(v / 1000) + ' k');
  const thr = [[P.clawThr, PC.tax], [full, PC.claw]];
  if (!S.dentalIns) thr.push([70000, PC.good], [90000, PC.muted]);
  ys.forEach((y, i) => {
    const v = inc[i], x = pl + i * bw + bw * .15, w = bw * .7;
    g += `<rect x="${x}" y="${sy(v)}" width="${w}" height="${Math.max(0, sy(0) - sy(v))}" fill="${v > full ? PC.claw : v > P.clawThr ? PC.tax : PC.ferr}"/>`;
    if (v > top) g += txt(Math.min(x + w + 3, W - pr), pT + 7, `${y.age} : ${money(v)}`, x + w + 70 > W ? 'end' : 'start', PC.ink);
  });
  thr.forEach(([v, c]) => { if (v < top) g += `<line x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="${c}" stroke-width="1.2" stroke-dasharray="4 3"/>`; });
  const lab = Math.ceil(n / 12);
  ys.forEach((y, i) => { if (i % lab === 0) g += txt(pl + i * bw + bw / 2, H - 6, y.age, 'middle'); });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}
function pdfWealthSVG() {
  const ys = R.years, n = ys.length, W = 515, H = 180, pl = 46, pr = 6, pT = 10, pb = 20;
  const tots = ys.map(y => (y.Fend + y.Bend + y.Tend) / y.k), top = Math.max(1, ...tots) * 1.08;
  const sy = v => pT + (H - pT - pb) * (1 - v / top), bw = (W - pl - pr) / n;
  const txt = (x, y, s, a = 'end') => `<text x="${x}" y="${y}" font-family="Roboto" font-size="7.5" fill="${PC.muted}" text-anchor="${a}">${svgEsc(s)}</text>`;
  let g = '';
  const st = niceStep(top);
  for (let v = 0; v <= top; v += st) g += `<line x1="${pl}" x2="${W - pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="${PC.line}" stroke-width="0.6"/>` + txt(pl - 5, sy(v) + 3, v >= 1e6 ? num(v / 1e6) + ' M' : Math.round(v / 1000) + ' k');
  ys.forEach((y, i) => {
    const x = pl + i * bw + bw * .15; let base = 0;
    for (const [val, col] of [[y.Fend / y.k, PC.ferr], [y.Bend / y.k, PC.nr], [y.Tend / y.k, PC.tfsa]]) {
      if (val > 0) g += `<rect x="${x}" y="${sy(base + val)}" width="${bw * .7}" height="${Math.max(0, sy(base) - sy(base + val))}" fill="${col}"/>`;
      base += val;
    }
  });
  const lab = Math.ceil(n / 12);
  ys.forEach((y, i) => { if (i % lab === 0) g += txt(pl + i * bw + bw / 2, H - 6, y.age, 'middle'); });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}</svg>`;
}
const swatch = (c, dashed) => ({ canvas: [dashed ? { type: 'line', x1: 0, y1: 5, x2: 12, y2: 5, lineWidth: 1.2, lineColor: c, dash: { length: 3 } } : { type: 'rect', x: 0, y: 1, w: 8, h: 8, r: 1, color: c }], width: dashed ? 15 : 11 });
function legendPDF(items) {
  return { columns: items.map(([c, l, d]) => ({ width: 'auto', columns: [swatch(c, d), { text: pt(l), width: 'auto', fontSize: 7.5, color: PC.muted }], columnGap: 3 })), columnGap: 12, margin: [0, 4, 0, 0] };
}
const h2 = (t, extra = {}) => ({ text: pt(t), style: 'h2', ...extra });

function buildReport() {
  compute();
  const min = CMP[0].r, tot = realTot(R), d = R.estateReal - min.estateReal, x = S;
  const gen = new Intl.DateTimeFormat(loc(), { dateStyle: 'long' }).format(new Date());
  const yesno = b => tr(b ? 'yes' : 'no');
  const sit = [
    [tr('f_age'), `${x.age} ${tr('years')}`], [tr('f_death'), `${x.deathAge} ${tr('years')}`],
    [tr('r_type'), tr(x.type === 'frv' ? 'o_frv' : 'o_ferr')], [tr('f_ferr'), money(x.ferr)], [tr('f_rF'), pct(x.rF / 100)],
    [tr('f_rrq'), money(x.rrq)], [tr('f_rente'), money(x.rente)], [tr('f_other'), money(x.other)], [tr('f_oas'), yesno(x.oas)],
    [tr('r_house'), tr(x.couple ? 'o_couple' : 'o_alone')],
    ...(x.couple ? [[tr('f_sAge'), `${x.sAge} ${tr('years')}`], [tr('f_sInc'), money(x.sInc)], [tr('f_sOas'), yesno(x.sOas)], [tr('f_split'), yesno(x.split)]] : []),
    [tr('f_nr'), money(x.nr)], [tr('f_rNR'), pct(x.rNR / 100)], [tr('f_mix'), tr('r_mix', pct(x.mixI / 100, 0), pct(x.mixD / 100, 0), pct(x.mixG / 100, 0))],
    [tr('f_tfsa'), yesno(x.tfsaUse)], ...(x.tfsaUse ? [[tr('f_tfsaBal'), money(x.tfsa)], [tr('f_tfsaRoom'), money(x.tfsaRoom)]] : []),
    [tr('f_spend'), money(x.spend)], [tr('f_inf'), pct(x.inf / 100)], [tr('f_dIns'), yesno(x.dentalIns)], ...(x.dentalIns ? [] : [[tr('f_dVal'), money(x.dentalVal)]]),
  ];
  const half = Math.ceil(sit.length / 2);
  const sitCol = rows => ({ table: { widths: ['*', 'auto'], body: rows.map(([l, v]) => [{ text: pt(l), color: PC.muted, fontSize: 8 }, { text: pt(v), alignment: 'right', bold: true, fontSize: 8 }]) }, layout: 'rows' });
  const sitTable = { columns: [sitCol(sit.slice(0, half)), sitCol(sit.slice(half))], columnGap: 18 };

  const tiles = [['t_tax', tot.tax], ['t_claw', tot.claw], ['t_dent', tot.dental], ['t_gis', tot.gis]];
  const hero = {
    table: { widths: ['*'], body: [[{
      stack: [
        { text: pt(tr('hl_lead', S.deathAge)), color: PC.muted },
        { text: pt(money(R.estateReal)), fontSize: 28, bold: true, color: PC.accent, margin: [0, 2, 0, 0] },
        { text: pt(tr('hl_unit')), fontSize: 8, color: PC.muted },
        { text: pt(S.strat === 'min' || Math.abs(d) < 1 ? tr('same_min') : tr('vs_min', (d > 0 ? '+' : '−') + money(Math.abs(d)))), color: S.strat === 'min' || Math.abs(d) < 1 ? PC.ink : d > 0 ? PC.good : PC.warn, bold: true, margin: [0, 6, 0, 10] },
        { columns: tiles.map(([k, v]) => ({ stack: [{ text: pt(money(v)), bold: true, fontSize: 11 }, { text: pt(tr(k)), fontSize: 7.5, color: PC.muted }] })), columnGap: 10 },
      ], fillColor: PC.soft, margin: [14, 12, 14, 12],
    }]] }, layout: 'noBorders', margin: [0, 0, 0, 14],
  };

  let stratTxt = tr('st_' + S.strat);
  if (S.strat === 'lump') stratTxt += ' · ' + tr('ctl_lump', S.lumpYears);
  if (S.strat === 'target') stratTxt += ' · ' + tr('ctl_target') + ' : ' + money(S.target);
  if (S.strat === 'fixed') stratTxt += ' · ' + tr('ctl_fixed') + ' : ' + money(S.fixed);
  if (S.strat === 'best') stratTxt += ' · ' + (BEST.useMin ? tr('best_min') : tr('best_t', money(BEST.T)));

  const maxE = Math.max(1, ...CMP.map(c => c.r.estateReal)), bestV = Math.max(...CMP.map(c => c.r.estateReal));
  const cmpBody = CMP.map(c => {
    const sel = c.r === R || (c.key === 'min' && S.strat === 'min') || (c.key === 'best' && S.strat === 'best');
    const w = Math.max(2, Math.max(0, c.r.estateReal) / maxE * 200);
    return [
      { text: [pt(tr(c.l)), ...(Math.abs(c.r.estateReal - bestV) < 1 ? [{ text: '  ' + pt(tr('best')).toUpperCase(), fontSize: 6.5, color: PC.accent, bold: true }] : [])], bold: sel },
      { canvas: [{ type: 'rect', x: 0, y: 1, w: 200, h: 10, r: 2, color: PC.sunk }, { type: 'rect', x: 0, y: 1, w, h: 10, r: 2, color: sel ? PC.accent : PC.spend }] },
      { text: pt(money(c.r.estateReal)), alignment: 'right', bold: sel },
    ];
  });

  const sel = R.years[S.sel] || R.years[0];
  const chain = chainRows(sel).map(r => [
    { stack: [{ text: pt(r.l) }, ...(r.f ? [{ text: pt(r.f), fontSize: 7.5, color: PC.muted }] : [])] },
    { text: pt(r.v), alignment: 'right', bold: true, color: r.cls === 'hl' ? PC.warn : r.cls === 'ok' ? PC.accent : PC.ink },
  ]);

  const th = L().th;
  const yrows = R.years.map(y => {
    const h = y.h, m = v => pt(money(D(v, y))), sp = h.tb;
    return [String(y.year), String(y.age), m(y.Fstart), m(y.minW), m(y.w), m(h.ta.netBefore), m(h.oas), m(h.ta.claw), m(h.ta.fed + (sp ? sp.fed : 0)), m(h.ta.qc + (sp ? sp.qc : 0)), m(h.dentalCost), m(y.spend),
      (y.surplus >= 0 ? '+' : '−') + m(Math.abs(y.surplus >= 0 ? y.surplus : y.drawB + y.drawT)), m(y.Bend), m(y.Tend), m(y.Fend)].map((t, i) => ({ text: t, alignment: i < 2 ? 'left' : 'right' }));
  });
  const full = S.age >= 75 ? 161320 : 155320;

  const content = [
    { text: pt(`${tr('brand').toUpperCase()} · 2026`), style: 'eyebrow' },
    { text: pt(tr('rep_title')), style: 'h1' },
    { text: pt([S.scen ? `${tr('rep_scen')} : ${S.scen}` : '', tr('rep_gen', gen)].filter(Boolean).join(' · ')), color: PC.muted, margin: [0, 2, 0, 16] },
    hero,
    h2(tr('rep_strat')), { text: pt(stratTxt), margin: [0, 0, 0, 14] },
    h2(tr('cmp_title')), { text: pt(tr('cmp_sub').split('.')[0] + '.'), style: 'sub' },
    { table: { widths: ['*', 200, 80], body: cmpBody }, layout: 'rows', margin: [0, 0, 0, 14] },
    h2(tr('rep_sit'), { pageBreak: 'before' }), sitTable,
    h2(tr('inc_title'), { margin: [0, 20, 0, 2] }), { text: pt(tr('inc_sub')), style: 'sub' },
    { svg: pdfIncomeSVG(), width: 515 },
    legendPDF([[PC.ferr, tr('lg_under')], [PC.tax, tr('lg_part')], [PC.claw, tr('lg_lost')]]),
    legendPDF([[PC.tax, tr('thr_claw') + ' ' + money(P.clawThr), true], [PC.claw, tr('thr_full') + ' ' + money(full), true]]),
    ...(S.dentalIns ? [] : [legendPDF([[PC.good, tr('thr_d70') + ' ' + money(70000), true], [PC.muted, tr('thr_d90') + ' ' + money(90000), true]])]),
    h2(tr('bal_title'), { pageBreak: 'before' }), { text: pt(tr('bal_sub')), style: 'sub' },
    { svg: pdfWealthSVG(), width: 515 },
    legendPDF([[PC.ferr, tr('lg_ferr')], [PC.nr, tr('lg_nr')], [PC.tfsa, tr('lg_tfsa')]]),
    h2(tr('notes_title'), { margin: [0, 22, 0, 6] }),
    { ul: L().notes.map(n => ({ text: pt(n), margin: [0, 0, 0, 4] })), color: PC.muted },
    { text: pt(tr('rep_disc')), margin: [0, 14, 0, 4], bold: true },
    { text: pt(tr('rep_priv')), color: PC.muted, fontSize: 8 },
    h2(tr('rep_chain', sel.year, sel.age), { pageBreak: 'before' }), { text: pt(tr('rep_unit', S.real)), style: 'sub' },
    { table: { widths: ['*', 'auto'], body: chain, dontBreakRows: true }, layout: 'rows' },
    h2(tr('rep_tbl'), { pageBreak: 'before', pageOrientation: 'landscape' }), { text: pt(tr('rep_unit', S.real)), style: 'sub' },
    { table: { headerRows: 1, widths: ['auto', 'auto', ...Array(14).fill('*')], body: [th.map((t, i) => ({ text: pt(t), style: 'th', alignment: i < 2 ? 'left' : 'right' })), ...yrows] }, layout: 'zebra', fontSize: 6.6 },
  ];

  return {
    pageSize: 'LETTER', pageMargins: [48, 48, 48, 52],
    info: { title: pt(tr('brand') + ' · ' + tr('rep_title')), creator: pt(tr('brand')) },
    defaultStyle: { font: 'Roboto', fontSize: 9.5, color: PC.ink, lineHeight: 1.2 },
    styles: {
      eyebrow: { fontSize: 7.5, color: PC.accent, characterSpacing: 1, bold: true },
      h1: { fontSize: 22, bold: true, margin: [0, 4, 0, 0] },
      h2: { fontSize: 13, bold: true, margin: [0, 4, 0, 6], color: PC.ink },
      sub: { fontSize: 8, color: PC.muted, margin: [0, 0, 0, 6] },
      th: { bold: true, color: PC.muted, fontSize: 6.4 },
    },
    footer: (cur, n) => ({ columns: [{ text: pt(tr('w_disc')), fontSize: 7, color: PC.muted }, { text: pt(tr('rep_page', cur, n)), alignment: 'right', fontSize: 7, color: PC.muted, width: 'auto' }], margin: [48, 18, 48, 0] }),
    content,
  };
}
const PDF_LAYOUTS = {
  rows: { hLineWidth: (i, n) => (i === 0 || i === n.table.body.length) ? 0 : .5, vLineWidth: () => 0, hLineColor: () => PC.line, paddingLeft: () => 2, paddingRight: () => 2, paddingTop: () => 4, paddingBottom: () => 4 },
  zebra: { hLineWidth: (i) => i === 1 ? .8 : 0, vLineWidth: () => 0, hLineColor: () => PC.line, fillColor: (i) => i === 0 ? PC.sunk : i % 2 === 0 ? '#f6f8f6' : null, paddingLeft: () => 3, paddingRight: () => 3, paddingTop: () => 2.5, paddingBottom: () => 2.5 },
};
async function exportPDF() {
  const b = $('#pdfBtn'); if (b.disabled) return;
  b.disabled = true; b.textContent = tr('pdf_busy');
  try {
    await loadPdfLib();
    const dd = buildReport();
    const blob = await new Promise((ok, ko) => { try { pdfMake.createPdf(dd, PDF_LAYOUTS).getBlob(ok); } catch (e) { ko(e); } });
    await saveFile(`${tr('r_file')}-${slug(S.scen) || today()}.pdf`, blob);
  } catch (e) { console.error(e); toast(tr('rep_fail')); }
  finally { b.disabled = false; b.textContent = tr('pdf_btn'); }
}
$('#pdfBtn').onclick = exportPDF;
