// Moteur de calcul FERR / PSV / impôt Québec 2026 (aucune dépendance au DOM)
const P = {
  fedBr: [[58523, .14], [117045, .205], [181440, .26], [258482, .29], [Infinity, .33]],
  qcBr: [[54345, .14], [108680, .19], [132245, .24], [Infinity, .2575]],
  fedBPA: 16452, fedBPAmin: 14829, fedBPAlo: 181440, fedBPAhi: 258482,
  fedAge: 9208, fedAgeThr: 46432, fedPension: 2000, abat: .165, fedLow: .14,
  qcBase: 18952, qcAge: 3986, qcAlone: 2172, qcRet: 3541, qcRedThr: 42955, qcRedRate: .1875, qcLow: .14,
  oas65: 762.50 * 12, oas75: 838.75 * 12, clawThr: 95323, clawRate: .15,
  gisSingle: 1138.90 * 12, gisCutSingle: 23112, gisCouple: 685.56 * 12, gisCutCouple: 30528, gisCutNoOas: 55392,
  saMax: 2000, saThrS: 28405, saThrC: 46200, saRate: .0547,
  ramqMax: 778, // prime maximale : 766 $ jusqu'au 30 juin 2026, 789 $ ensuite ; moyenne pour l'année 2026
  ramqExS: 19790, ramqExC: 32140, ramqRate: .10,
  divGross: .38, fedDTC: .150198, qcDTC: .117,
  tfsaLimit: 7000,
  dental: [[70000, 0], [80000, .4], [90000, .6]],
};
const MINP = { 71: .0528, 72: .054, 73: .0553, 74: .0567, 75: .0582, 76: .0598, 77: .0617, 78: .0636, 79: .0658, 80: .0682, 81: .0708, 82: .0738, 83: .0771, 84: .0808, 85: .0851, 86: .0899, 87: .0955, 88: .1021, 89: .1099, 90: .1192, 91: .1306, 92: .1449, 93: .1634, 94: .1879 };
function minPct(age) { if (age < 71) return 1 / (90 - age); return MINP[age] ?? .20; }
// Maximum approximatif d'un FRV au Québec : rente certaine jusqu'à 90 ans au taux de 6 %
function frvMaxPct(age) { const n = 90 - age; if (n <= 1) return 1; const r = .06; return Math.max(minPct(age), r / (1 - Math.pow(1 + r, -n))); }

function prog(x, br, k) {
  let t = 0, prev = 0;
  for (const [lim, r] of br) { const L = lim * k; if (x > prev) t += (Math.min(x, L) - prev) * r; prev = L; if (x <= L) break; }
  return t;
}
function oasFor(age, k) { return age < 65 ? 0 : (age >= 75 ? P.oas75 : P.oas65) * k; }
function dentalCopay(famNet) { for (const [lim, f] of P.dental) if (famNet < lim) return f; return 1; }

// Impôt d'une personne. ferr = retraits FERR ; rente = rente de retraite ; other = RRQ + autres ; splitIn/Out = fractionnement
function personTax(o, k) {
  const grossDiv = o.div * (1 + P.divGross);
  const eligPension = o.rente + (o.age >= 65 ? o.ferr : 0);
  const netBefore = o.ferr + o.rente + o.other + o.interest + grossDiv + o.cg + o.oas + o.gis + (o.splitIn || 0) - (o.splitOut || 0);
  const claw = Math.min(o.oas, Math.max(0, P.clawRate * (netBefore - P.clawThr * k)));
  const net = netBefore - claw;
  const taxable = Math.max(0, net - o.gis);
  // fédéral
  let bpa = P.fedBPA * k;
  if (net > P.fedBPAlo * k) bpa -= (P.fedBPA - P.fedBPAmin) * k * Math.min(1, (net - P.fedBPAlo * k) / ((P.fedBPAhi - P.fedBPAlo) * k));
  const ageAmt = o.age >= 65 ? Math.max(0, P.fedAge * k - .15 * Math.max(0, net - P.fedAgeThr * k)) : 0;
  const pensElig = Math.max(0, eligPension - (o.splitOut || 0)) + (o.age >= 65 ? (o.splitIn || 0) : 0);
  const pensAmt = Math.min(P.fedPension, pensElig);
  const fedBasic = prog(taxable, P.fedBr, k);
  const fedCred = P.fedLow * (bpa + ageAmt + pensAmt) + P.fedDTC * grossDiv;
  const fed = Math.max(0, fedBasic - fedCred) * (1 - P.abat);
  // Québec
  const famNet = o.famNet ?? net;
  let red = (o.age >= 65 ? P.qcAge * k : 0) + (o.alone ? P.qcAlone * k : 0) + (o.age >= 65 ? Math.min(P.qcRet * k, pensElig) : Math.min(P.qcRet * k, o.rente));
  const redCut = P.qcRedRate * Math.max(0, famNet - P.qcRedThr * k) / (o.alone ? 1 : 2);
  red = Math.max(0, red - redCut);
  const qcBasic = prog(taxable, P.qcBr, k);
  const qcCred = P.qcLow * (P.qcBase * k + red) + P.qcDTC * grossDiv;
  const qc = Math.max(0, qcBasic - qcCred);
  const sa = o.age >= 70 ? Math.max(0, P.saMax - P.saRate * Math.max(0, famNet - (o.alone ? P.saThrS : P.saThrC) * k) / (o.alone ? 1 : 2)) : 0;
  const ramq = Math.min(P.ramqMax * k, Math.max(0, (famNet - (o.alone ? P.ramqExS : P.ramqExC) * k) * P.ramqRate) / (o.alone ? 1 : 2));
  return { netBefore, claw, net, taxable, grossDiv, fed, qc, sa, ramq, bpa, ageAmt, pensAmt, red, fedBasic, qcBasic, total: fed + qc + claw + ramq - sa };
}

// Ménage pour une année : retrait w, gain en capital imposable cg (50 %), fractionnement optimisé
// splitAmt : montant fractionné imposé (sinon la meilleure part est cherchée)
function household(inp, y, w, cgTaxable, splitAmt) {
  const k = y.k, age = y.age;
  const oas = inp.oas ? oasFor(age, k) : 0;
  const sAge = y.sAge;
  const sOas = inp.couple && inp.sOas ? oasFor(sAge, k) : 0;
  const base = { age, ferr: w, rente: inp.rente * k, other: (inp.rrq + inp.other) * k, interest: y.interest, div: y.div, cg: cgTaxable, oas, alone: !inp.couple };
  // SRG (approximation linéaire jusqu'au seuil officiel)
  const incExOas = w + base.rente + base.other + y.interest + y.div * (1 + P.divGross) + cgTaxable;
  let gis = 0, sGis = 0;
  if (oas > 0) {
    if (!inp.couple) gis = P.gisSingle * k * Math.max(0, 1 - incExOas / (P.gisCutSingle * k));
    else {
      const comb = incExOas + inp.sInc * k;
      if (sOas > 0) { gis = P.gisCouple * k * Math.max(0, 1 - comb / (P.gisCutCouple * k)); sGis = gis; }
      else gis = P.gisSingle * k * Math.max(0, 1 - comb / (P.gisCutNoOas * k));
    }
  }
  base.gis = gis;
  const spouse = inp.couple ? { age: sAge, ferr: 0, rente: 0, other: inp.sInc * k, interest: 0, div: 0, cg: 0, oas: sOas, gis: sGis, alone: false } : null;
  const eligible = inp.couple && inp.split && age >= 65 ? base.rente + w : 0;
  const amts = splitAmt != null ? [Math.min(splitAmt, eligible * .5)] : (eligible > 0 ? [0, .1, .2, .3, .4, .5].map(f => eligible * f) : [0]);
  let best = null;
  for (const amt of amts) {
    const f = eligible > 0 ? amt / eligible : 0;
    const a = { ...base, splitOut: amt }, b = spouse ? { ...spouse, splitIn: amt } : null;
    const ta0 = personTax(a, k), tb0 = b ? personTax(b, k) : null;
    const famNet = ta0.net + (tb0 ? tb0.net : 0);
    const ta = personTax({ ...a, famNet }, k), tb = b ? personTax({ ...b, famNet }, k) : null;
    const total = ta.total + (tb ? tb.total : 0);
    if (!best || total < best.total - 1) best = { f, amt, ta, tb, famNet, total };
  }
  const nPeople = inp.couple ? 2 : 1;
  const copay = inp.dentalIns ? 1 : dentalCopay(best.famNet);
  const dentalCost = inp.dentalVal * k * nPeople * copay;
  const dentalLost = inp.dentalIns ? 0 : inp.dentalVal * k * nPeople * copay;
  const inflow = w + base.rente + base.other + oas + gis + y.interest + y.div + (spouse ? spouse.other + sOas + sGis : 0);
  return { ...best, oas, sOas, gis, sGis, copay, dentalCost, dentalLost, inflow, base };
}

// Stratégies : renvoient le retrait souhaité (avant bornes min/max)
function strategyWithdraw(s, ctx) {
  const { t, F, minW, k, inp, y } = ctx;
  switch (s.kind) {
    case 'min': return minW;
    case 'lump': return t < s.years ? F / (s.years - t) : minW;
    case 'target': {
      const oas = inp.oas ? oasFor(y.age, k) : 0;
      const other = (inp.rente + inp.rrq + inp.other) * k + oas + y.interest + y.div * (1 + P.divGross);
      // nominal : montant non indexé (pour rester sous un seuil qui ne suit pas l'inflation)
      return (s.nominal ? s.amount : s.amount * k) - other;
    }
    case 'fixed': return s.amount * k;
  }
  return minW;
}

function simulate(inp, s) {
  const n = Math.max(1, inp.deathAge - inp.age + 1);
  const inf = inp.inf / 100, rF = inp.rF / 100, rN = inp.rNR / 100;
  const mixT = (inp.mixI + inp.mixD + inp.mixG) || 1;
  const sI = inp.mixI / mixT, sD = inp.mixD / mixT, sG = inp.mixG / mixT;
  let F = inp.ferr, B = inp.nr, acb = inp.nr, T = inp.tfsaUse ? inp.tfsa : 0, room = inp.tfsaUse ? inp.tfsaRoom : 0;
  const years = [];
  const tot = { tax: 0, fed: 0, qc: 0, claw: 0, oas: 0, gis: 0, dental: 0, ramq: 0, sa: 0, spend: 0, short: 0 };
  for (let t = 0; t < n; t++) {
    const k = Math.pow(1 + inf, t);
    const y = { t, year: 2026 + t, age: inp.age + t, sAge: inp.sAge + t, k };
    y.Fstart = F; y.Bstart = B; y.Tstart = T;
    y.minPct = minPct(y.age);
    y.minW = F * y.minPct;
    y.maxPct = inp.type === 'frv' ? frvMaxPct(y.age) : 1;
    y.maxW = F * y.maxPct;
    y.interest = B * rN * sI; y.div = B * rN * sD; y.cgGrowth = B * rN * sG;
    const Bav = B + y.cgGrowth;
    const gainFrac = Bav > 0 ? Math.max(0, 1 - acb / Bav) : 0;
    let wanted = strategyWithdraw(s, { t, F, minW: y.minW, k, inp, y });
    let w = Math.min(y.maxW, Math.max(y.minW, wanted));
    y.wStrategy = w;
    const spend = inp.spend * k;
    let drawB = 0, drawT = 0, extraW = 0, h, cash;
    for (let it = 0; it < 10; it++) {
      const cgTax = drawB * gainFrac * .5;
      h = household(inp, y, w + extraW, cgTax);
      cash = h.inflow - h.total - h.dentalCost - spend;
      // cash exclut les retraits d'épargne : gap = montant à puiser dans l'épargne
      const gap = -cash;
      let nb, nt, ne = extraW;
      if (gap <= 0) { nb = 0; nt = 0; ne = Math.max(0, extraW + gap); }
      else {
        nb = Math.min(Bav, gap); nt = Math.min(T, gap - nb);
        const rem = gap - nb - nt;
        if (rem > 1) ne = Math.min(y.maxW - w, extraW + rem / .55);
      }
      if (Math.abs(nb - drawB) < 1 && Math.abs(nt - drawT) < 1 && Math.abs(ne - extraW) < 1) break;
      drawB = nb; drawT = nt; extraW = ne;
    }
    w += extraW;
    const surplus = cash + drawB + drawT;
    y.shortfall = surplus < -50 ? -surplus : 0;
    y.w = w; y.extraW = extraW; y.drawB = drawB; y.drawT = drawT; y.h = h; y.spend = spend;
    y.cgReal = drawB * gainFrac;
    // comptes
    let Bend = Bav - drawB, acbEnd = Bav > 0 ? acb * (1 - drawB / Bav) : 0;
    let Tend = T - drawT;
    let toT = 0, toB = 0;
    if (surplus > 0) { toT = inp.tfsaUse ? Math.min(surplus, room) : 0; room -= toT; toB = surplus - toT; }
    Bend += toB; acbEnd += toB; Tend += toT;
    Tend *= 1 + rN;
    if (inp.tfsaUse) room += Math.round(P.tfsaLimit * k / 500) * 500;
    F = (F - w) * (1 + rF);
    B = Bend; acb = acbEnd; T = Tend;
    y.toB = toB; y.toT = toT; y.surplus = surplus;
    y.Fend = F; y.Bend = B; y.Tend = T; y.acb = acb;
    tot.fed += h.ta.fed + (h.tb ? h.tb.fed : 0); tot.qc += h.ta.qc + (h.tb ? h.tb.qc : 0);
    tot.claw += h.ta.claw + (h.tb ? h.tb.claw : 0); tot.oas += h.oas + h.sOas; tot.gis += h.gis + h.sGis;
    tot.ramq += h.ta.ramq + (h.tb ? h.tb.ramq : 0); tot.sa += h.ta.sa + (h.tb ? h.tb.sa : 0);
    tot.dental += h.dentalLost; tot.spend += spend; tot.short += y.shortfall;
    years.push(y);
  }
  // Décès à la fin de la dernière année : FERR et gains latents imposés
  const last = years[years.length - 1];
  const unreal = Math.max(0, B - acb);
  const baseCg = last.cgReal * .5;
  // Le solde du FERR au décès n'est pas fractionnable : on garde le montant fractionné de l'année
  const h0 = household(inp, last, last.w, baseCg, last.h.amt);
  const h1 = household(inp, last, last.w + F, baseCg + unreal * .5, last.h.amt);
  const deathTax = F > 0 || unreal > 0 ? Math.max(0, h1.total - h0.total) : 0;
  const kEnd = last.k;
  const estate = B + T + F - deathTax;
  tot.tax = tot.fed + tot.qc + tot.ramq - tot.sa;
  return { years, tot, deathTax, estate, estateReal: estate / kEnd, kEnd, Ffinal: F, unreal, strategy: s };
}

// Taux marginal effectif : coût de 1 000 $ de retrait supplémentaire
function marginalRate(inp, y) {
  const a = household(inp, y, y.w, y.cgReal * .5);
  const b = household(inp, y, y.w + 1000, y.cgReal * .5);
  // Le SRG perdu compte aussi : c'est un revenu qui disparaît
  const cost = h => h.total + h.dentalCost - h.gis - h.sGis;
  return (cost(b) - cost(a)) / 1000;
}

function bestTarget(inp) {
  let best = null;
  for (let T = 20000; T <= 320000; T += 5000) {
    const r = simulate(inp, { kind: 'target', amount: T });
    if (!best || r.estateReal > best.r.estateReal + 1) best = { T, r };
  }
  return best;
}

if (typeof module !== 'undefined') module.exports = { P, minPct, frvMaxPct, personTax, household, simulate, marginalRate, bestTarget };
