/**
 * G\u00e9n\u00e9rateur de contenu UNIQUE par page/montant pour am\u00e9liorer l'unicit\u00e9 SEO.
 * Chaque fonction produit du texte math\u00e9matiquement diff\u00e9rent pour chaque montant
 * en utilisant variationIndex = Math.floor(amount / 1000) % N pour s\u00e9lectionner
 * des structures de phrases diff\u00e9rentes, et en int\u00e9grant des valeurs calcul\u00e9es uniques.
 */

import type { Activite } from '../data/activites';
import type { ActivityCalc } from './activity-content';

// ─── Helpers ────────────────────────────────────────────────────────

const fmt = (n: number): string =>
  new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n);

const fmtDec = (n: number, decimals: number = 1): string =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

/** Salaire m\u00e9dian marocain (source HCP 2024, estim\u00e9 2026) */
const MEDIAN_SALARY_MAD = 4_500;

/** SMIG mensuel 2026 */
const SMIG_MENSUEL = 3_111;

/** Nombre de jours ouvr\u00e9s par mois */
const JOURS_OUVRES_MOIS = 22;

/** Nombre de semaines ouvr\u00e9es par an */
const SEMAINES_AN = 47;

// ─── Types export\u00e9s ──────────────────────────────────────────────────

export interface UniqueFAQ {
  question: string;
  answer: string;
}

export interface TaxTip {
  title: string;
  content: string;
}

export interface BudgetBreakdown {
  label: string;
  montant: number;
  pourcentage: string;
}

export interface ComparisonInsight {
  metric: string;
  aeValue: string;
  sarlValue: string;
  verdict: string;
}

// ─── Calculs uniques par montant ────────────────────────────────────

function getDailyRate(monthlyCA: number): number {
  return Math.round(monthlyCA / JOURS_OUVRES_MOIS);
}

function getHourlyRate(monthlyCA: number): number {
  return Math.round(monthlyCA / (JOURS_OUVRES_MOIS * 8));
}

function getWeeklyRate(monthlyCA: number): number {
  return Math.round((monthlyCA * 12) / SEMAINES_AN);
}

function getMedianComparison(netMensuel: number): number {
  return Math.round(((netMensuel - MEDIAN_SALARY_MAD) / MEDIAN_SALARY_MAD) * 100);
}

function getSmigMultiple(netMensuel: number): string {
  return (netMensuel / SMIG_MENSUEL).toFixed(1);
}

function getSavingsVsSalariat(monthlyCA: number): number {
  // Un salari\u00e9 au m\u00eame brut perdrait ~35% en charges+IR progressif
  const netSalarie = Math.round(monthlyCA * 0.65);
  const netAE = Math.round(monthlyCA * 0.97); // approximation 3% charges AE services
  return netAE - netSalarie;
}

function getAnnualSavings(monthlyCA: number, tauxIR: number): number {
  const chargesAE = Math.round(monthlyCA * 12 * tauxIR) + 1200;
  const chargesSalariat = Math.round(monthlyCA * 12 * 0.35);
  return chargesSalariat - chargesAE;
}

function getBreakevenMonths(monthlyCA: number, tauxIR: number): number {
  // Mois pour rembourser les frais de d\u00e9marrage estim\u00e9s (2000 DH)
  const netMensuel = monthlyCA - Math.round(monthlyCA * tauxIR) - 100;
  return Math.max(1, Math.ceil(2000 / netMensuel));
}

function getDaysToPayTaxes(monthlyCA: number, tauxIR: number): number {
  // Nombre de jours de travail pour payer les charges annuelles
  const chargesAnnuelles = Math.round(monthlyCA * 12 * tauxIR) + 1200;
  const dailyRate = getDailyRate(monthlyCA);
  return Math.ceil(chargesAnnuelles / dailyRate);
}

// ─── FAQ UNIQUES par montant ────────────────────────────────────────

export function generateUniqueFAQs(activite: Activite, calc: ActivityCalc): UniqueFAQ[] {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 6;
  const dailyRate = getDailyRate(amount);
  const hourlyRate = getHourlyRate(amount);
  const weeklyRate = getWeeklyRate(amount);
  const medianComp = getMedianComparison(calc.netMensuelMin);
  const smigMult = getSmigMultiple(calc.netMensuelMin);
  const savings = getSavingsVsSalariat(amount);
  const taxDays = getDaysToPayTaxes(amount, activite.tauxIR);
  const annualSavings = getAnnualSavings(amount, activite.tauxIR);

  const faqSets: UniqueFAQ[][] = [
    // Variation 0
    [
      {
        question: `Combien gagne un ${activite.nom.toLowerCase()} AE par jour ouvr\u00e9 au Maroc ?`,
        answer: `Avec un CA mensuel de ${fmt(amount)} DH r\u00e9parti sur ${JOURS_OUVRES_MOIS} jours ouvr\u00e9s, un ${activite.nom.toLowerCase()} AE g\u00e9n\u00e8re en moyenne ${fmt(dailyRate)} DH par jour travaill\u00e9. Apr\u00e8s d\u00e9duction des charges (IR ${activite.tauxIR * 100}% + AMO), le revenu net quotidien est de ${fmt(Math.round(calc.netMensuelMin / JOURS_OUVRES_MOIS))} DH. Sur une base horaire (8h/jour), cela repr\u00e9sente ${fmt(hourlyRate)} DH/heure brut et ${fmt(Math.round(calc.netMensuelMin / (JOURS_OUVRES_MOIS * 8)))} DH/heure net.`,
      },
      {
        question: `Le revenu d'un ${activite.nom.toLowerCase()} AE est-il sup\u00e9rieur au salaire m\u00e9dian marocain ?`,
        answer: `Oui. Avec un net mensuel de ${fmt(calc.netMensuelMin)} DH, un ${activite.nom.toLowerCase()} AE gagne ${medianComp > 0 ? medianComp + '% de plus' : Math.abs(medianComp) + '% de moins'} que le salaire m\u00e9dian marocain (${fmt(MEDIAN_SALARY_MAD)} DH). Cela repr\u00e9sente ${smigMult}x le SMIG (${fmt(SMIG_MENSUEL)} DH). L'\u00e9conomie annuelle par rapport au salariat pour un brut \u00e9quivalent est de ${fmt(annualSavings)} DH.`,
      },
    ],
    // Variation 1
    [
      {
        question: `Combien de jours faut-il travailler pour payer ses charges de ${activite.nom.toLowerCase()} AE ?`,
        answer: `Un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois (soit ${fmt(dailyRate)} DH/jour) doit travailler seulement ${taxDays} jours par an pour couvrir l'ensemble de ses charges obligatoires (${fmt(calc.totalChargesAnnuelMin)} DH/an). Les ${264 - taxDays} jours restants g\u00e9n\u00e8rent du revenu net pur. C'est l'un des ratios les plus favorables de tout le r\u00e9gime fiscal marocain.`,
      },
      {
        question: `Quelle est l'\u00e9conomie r\u00e9elle d'un ${activite.nom.toLowerCase()} AE vs un salari\u00e9 au m\u00eame brut ?`,
        answer: `Pour un m\u00eame revenu brut de ${fmt(amount)} DH/mois, un ${activite.nom.toLowerCase()} AE \u00e9conomise ${fmt(savings)} DH/mois par rapport \u00e0 un salari\u00e9. En effet, le salari\u00e9 paie environ 35% de charges (CNSS + IR progressif = ${fmt(Math.round(amount * 0.35))} DH/mois) contre seulement ${calc.tauxEffectifMin}% pour l'AE (${fmt(calc.totalChargesMensuelMin)} DH/mois). Sur une ann\u00e9e, l'\u00e9conomie cumul\u00e9e atteint ${fmt(annualSavings)} DH.`,
      },
    ],
    // Variation 2
    [
      {
        question: `Quel est le revenu hebdomadaire moyen d'un ${activite.nom.toLowerCase()} auto-entrepreneur ?`,
        answer: `Sur ${SEMAINES_AN} semaines travaill\u00e9es par an, un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois g\u00e9n\u00e8re ${fmt(weeklyRate)} DH brut par semaine. Le net hebdomadaire (apr\u00e8s IR de ${activite.tauxIR * 100}% et AMO) est de ${fmt(Math.round(calc.netMensuelMin * 12 / SEMAINES_AN))} DH. Ce rythme correspond \u00e0 ${fmtDec(amount / (JOURS_OUVRES_MOIS * dailyRate) * 100)}% d'occupation si vous facturez ${fmt(dailyRate)} DH/jour.`,
      },
      {
        question: `Quel est le ratio charges/revenus exact pour un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois ?`,
        answer: `Le ratio charges/revenus est de ${calc.tauxEffectifMin}%, d\u00e9compos\u00e9 ainsi : IR forfaitaire ${fmt(calc.irMensuelMin)} DH/mois (${activite.tauxIR * 100}% du CA) + AMO ${fmt(Math.round(1200 / 12))} DH/mois = ${fmt(calc.totalChargesMensuelMin)} DH. Pour chaque 100 DH factur\u00e9s, vous conservez ${fmtDec(100 - parseFloat(calc.tauxEffectifMin))} DH. Ce taux de r\u00e9tention de ${fmtDec(100 - parseFloat(calc.tauxEffectifMin))}% est ${parseFloat(calc.tauxEffectifMin) < 5 ? 'exceptionnel' : 'tr\u00e8s favorable'} compar\u00e9 aux 55-70% de r\u00e9tention en salariat.`,
      },
    ],
    // Variation 3
    [
      {
        question: `Combien un ${activite.nom.toLowerCase()} AE peut-il \u00e9pargner par mois au Maroc ?`,
        answer: `Avec un net de ${fmt(calc.netMensuelMin)} DH/mois et un co\u00fbt de vie moyen estim\u00e9 \u00e0 ${fmt(Math.round(calc.netMensuelMin * 0.6))} DH (logement, transport, alimentation), un ${activite.nom.toLowerCase()} AE peut \u00e9pargner environ ${fmt(Math.round(calc.netMensuelMin * 0.4))} DH/mois, soit ${fmt(Math.round(calc.netMensuelMin * 0.4 * 12))} DH par an. Ce taux d'\u00e9pargne de 40% est sup\u00e9rieur \u00e0 la moyenne nationale (15-20%).`,
      },
      {
        question: `En combien de temps un ${activite.nom.toLowerCase()} AE atteint-il le plafond de CA ?`,
        answer: `Au rythme de ${fmt(amount)} DH/mois, le plafond de ${fmt(calc.plafondCA)} DH est atteint en ${fmtDec(calc.plafondCA / amount)} mois, soit ${calc.pourcentagePlafondMin}% d'utilisation annuelle. Il reste une marge de ${fmt(calc.margeRestanteMin)} DH par an. Pour un ${activite.nom.toLowerCase()} \u00e0 ${fmt(activite.revenuMoyen.max)} DH/mois (fourchette haute), le plafond serait atteint en ${fmtDec(calc.plafondCA / activite.revenuMoyen.max)} mois, utilisant ${calc.pourcentagePlafondMax}% du plafond annuellement.`,
      },
    ],
    // Variation 4
    [
      {
        question: `Quel capital de d\u00e9marrage pr\u00e9voir pour un ${activite.nom.toLowerCase()} auto-entrepreneur ?`,
        answer: `Le capital initial recommand\u00e9 est de ${fmt(Math.round(calc.totalChargesMensuelMin * 3 + amount * 0.1))} DH, incluant : 3 mois de charges obligatoires (${fmt(calc.totalChargesMensuelMin * 3)} DH), plus un fonds de roulement de ${fmt(Math.round(amount * 0.1))} DH. Avec un TJM de ${fmt(dailyRate)} DH, le retour sur investissement intervient d\u00e8s le ${getBreakevenMonths(amount, activite.tauxIR)}e mois d'activit\u00e9. Le seuil de rentabilit\u00e9 mensuel est de ${fmt(Math.round(1200 / 12 / (1 - activite.tauxIR)))} DH de CA (point o\u00f9 les charges sont couvertes).`,
      },
      {
        question: `Quel est le co\u00fbt fiscal par client pour un ${activite.nom.toLowerCase()} AE ?`,
        answer: `Si un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois a en moyenne ${Math.max(2, Math.floor(amount / 3000))} clients, le co\u00fbt fiscal par client est de ${fmt(Math.round(calc.totalChargesMensuelMin / Math.max(2, Math.floor(amount / 3000))))} DH/mois (${fmt(calc.totalChargesAnnuelMin)} DH/an divis\u00e9 par ${Math.max(2, Math.floor(amount / 3000))} clients / 12 mois). Chaque client g\u00e9n\u00e8re un net de ${fmt(Math.round(calc.netMensuelMin / Math.max(2, Math.floor(amount / 3000))))} DH/mois apr\u00e8s charges.`,
      },
    ],
    // Variation 5
    [
      {
        question: `Comment se compare le revenu net d'un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois avec d'autres m\u00e9tiers ?`,
        answer: `Avec un net de ${fmt(calc.netMensuelMin)} DH/mois, un ${activite.nom.toLowerCase()} AE gagne ${smigMult}x le SMIG (${fmt(SMIG_MENSUEL)} DH) et ${medianComp > 0 ? medianComp + '% au-dessus' : Math.abs(medianComp) + '% en-dessous'} du salaire m\u00e9dian (${fmt(MEDIAN_SALARY_MAD)} DH). En pouvoir d'achat, cela \u00e9quivaut \u00e0 un salaire brut de ${fmt(Math.round(calc.netMensuelMin / 0.65))} DH en salariat classique, gr\u00e2ce au taux de charges ultra-r\u00e9duit de ${calc.tauxEffectifMin}%.`,
      },
      {
        question: `Quelle est la charge fiscale journali\u00e8re exacte d'un ${activite.nom.toLowerCase()} AE ?`,
        answer: `Pour un CA quotidien de ${fmt(dailyRate)} DH (${fmt(amount)} DH / ${JOURS_OUVRES_MOIS} jours), la charge fiscale journali\u00e8re est de ${fmt(Math.round(calc.totalChargesAnnuelMin / 264))} DH (IR : ${fmt(Math.round(calc.irAnnuelMin / 264))} DH + AMO : ${fmt(Math.round(1200 / 264))} DH). Autrement dit, sur chaque journ\u00e9e factur\u00e9e \u00e0 ${fmt(dailyRate)} DH, vous conservez ${fmt(dailyRate - Math.round(calc.totalChargesAnnuelMin / 264))} DH net, soit un taux de r\u00e9tention journalier de ${fmtDec((1 - calc.totalChargesAnnuelMin / (amount * 12)) * 100)}%.`,
      },
    ],
  ];

  return faqSets[variationIndex] || faqSets[0];
}

// ─── CONSEILS FISCAUX UNIQUES ───────────────────────────────────────

export function generateUniqueTaxTips(activite: Activite, calc: ActivityCalc): TaxTip[] {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 5;
  const dailyRate = getDailyRate(amount);
  const annualSavings = getAnnualSavings(amount, activite.tauxIR);
  const taxDays = getDaysToPayTaxes(amount, activite.tauxIR);

  const tipSets: TaxTip[][] = [
    // Variation 0
    [
      {
        title: `Optimisation du calendrier de d\u00e9claration`,
        content: `En tant que ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois, votre d\u00e9claration trimestrielle s'\u00e9l\u00e8ve \u00e0 ${fmt(calc.irTrimestrielMin + calc.amoTrimestriel)} DH (IR ${fmt(calc.irTrimestrielMin)} DH + AMO ${fmt(calc.amoTrimestriel)} DH). Provisionnez ${fmt(Math.round((calc.irTrimestrielMin + calc.amoTrimestriel) / 3))} DH chaque mois sur un compte d\u00e9di\u00e9 pour \u00e9viter toute tension de tr\u00e9sorerie lors de l'\u00e9ch\u00e9ance. Avec un TJM de ${fmt(dailyRate)} DH, ${fmtDec((calc.irTrimestrielMin + calc.amoTrimestriel) / dailyRate)} jours de facturation couvrent un trimestre entier de charges.`,
      },
      {
        title: `Seuil de transition AE vers SARL`,
        content: `Pour un ${activite.nom.toLowerCase()} \u00e0 ${fmt(amount)} DH/mois, le seuil de bascule vers la SARL se situe \u00e0 environ ${fmt(Math.round(calc.plafondCA * 0.75 / 12))} DH/mois de CA. \u00c0 ce niveau, l'\u00e9conomie AE est de ${fmt(annualSavings)} DH/an vs le salariat. Le point de basculement exact d\u00e9pend de vos charges d\u00e9ductibles : si elles d\u00e9passent ${fmt(Math.round(amount * 12 * 0.25))} DH/an (25% du CA), la SARL devient plus avantageuse gr\u00e2ce \u00e0 la d\u00e9duction au r\u00e9el.`,
      },
    ],
    // Variation 1
    [
      {
        title: `Strat\u00e9gie de lissage du CA`,
        content: `Avec ${fmt(amount)} DH/mois et un plafond de ${fmt(calc.plafondCA)} DH/an (utilisation : ${calc.pourcentagePlafondMin}%), vous disposez d'une marge de ${fmt(calc.margeRestanteMin)} DH. Pour \u00e9viter le d\u00e9passement, ne facturez pas plus de ${fmt(Math.round(calc.plafondCA / 12))} DH/mois en moyenne. Si un mois exceptionnel g\u00e9n\u00e8re ${fmt(Math.round(amount * 2.5))} DH, v\u00e9rifiez que le cumul annuel reste sous ${fmt(calc.plafondCA)} DH. D\u00e9passement 2 ann\u00e9es cons\u00e9cutives = radiation obligatoire du r\u00e9gime AE.`,
      },
      {
        title: `Tr\u00e9sorerie optimale pour ${activite.nom.toLowerCase()} AE`,
        content: `Le montant id\u00e9al de tr\u00e9sorerie pour un ${activite.nom.toLowerCase()} \u00e0 ${fmt(amount)} DH/mois est de ${fmt(Math.round(amount * 3 + calc.totalChargesAnnuelMin / 4))} DH, correspondant \u00e0 3 mois de CA + 1 trimestre de charges (${fmt(Math.round(calc.totalChargesAnnuelMin / 4))} DH). Cette r\u00e9serve couvre les p\u00e9riodes creuses et garantit le paiement des d\u00e9clarations trimestrielles m\u00eame sans revenu.`,
      },
    ],
    // Variation 2
    [
      {
        title: `Rendement fiscal par heure travaill\u00e9e`,
        content: `Un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois travaillant 8h/jour pendant ${JOURS_OUVRES_MOIS} jours g\u00e9n\u00e8re ${fmt(getHourlyRate(amount))} DH/heure brut. Apr\u00e8s charges de ${calc.tauxEffectifMin}%, le net horaire est de ${fmt(Math.round(calc.netMensuelMin / (JOURS_OUVRES_MOIS * 8)))} DH. Il faut seulement ${taxDays} jours de travail par an (sur 264 jours ouvr\u00e9s) pour couvrir l'int\u00e9gralit\u00e9 des ${fmt(calc.totalChargesAnnuelMin)} DH de charges annuelles.`,
      },
      {
        title: `Impact r\u00e9el de l'exon\u00e9ration TVA`,
        content: `L'exon\u00e9ration TVA pour votre activit\u00e9 de ${activite.nom.toLowerCase()} signifie que vos ${fmt(amount)} DH/mois factur\u00e9s repr\u00e9sentent le prix final client. Si vous \u00e9tiez assujetti \u00e0 la TVA (20%), vous devriez facturer ${fmt(Math.round(amount * 1.2))} DH pour le m\u00eame revenu, ou absorber ${fmt(Math.round(amount * 0.2))} DH de TVA en restant au m\u00eame prix. Pour les clients non assujettis (particuliers, AE), c'est un avantage comp\u00e9titif de ${fmtDec(20)}% sur vos tarifs.`,
      },
    ],
    // Variation 3
    [
      {
        title: `Comparatif co\u00fbt employeur vs AE`,
        content: `Embaucher un ${activite.nom.toLowerCase()} salari\u00e9 au net de ${fmt(calc.netMensuelMin)} DH co\u00fbterait \u00e0 l'employeur environ ${fmt(Math.round(calc.netMensuelMin / 0.65 * 1.265))} DH/mois (brut + charges patronales 26,48%). En AE, votre client ne paie que ${fmt(amount)} DH sans charges suppl\u00e9mentaires, soit une \u00e9conomie de ${fmt(Math.round(calc.netMensuelMin / 0.65 * 1.265 - amount))} DH/mois pour un r\u00e9sultat \u00e9quivalent. Argument commercial puissant pour justifier vos tarifs.`,
      },
      {
        title: `Projection de charges sur 5 ans`,
        content: `Sur 5 ans \u00e0 ${fmt(amount)} DH/mois constant, un ${activite.nom.toLowerCase()} AE aura pay\u00e9 ${fmt(calc.totalChargesAnnuelMin * 5)} DH de charges totales (IR ${fmt(calc.irAnnuelMin * 5)} DH + AMO ${fmt(1200 * 5)} DH) pour un CA cumul\u00e9 de ${fmt(amount * 12 * 5)} DH. Le net cumul\u00e9 sur 5 ans atteint ${fmt(calc.netAnnuelMin * 5)} DH. En comparaison, un salari\u00e9 au m\u00eame brut aurait per\u00e7u ${fmt(Math.round(amount * 0.65 * 12 * 5))} DH net, soit ${fmt(calc.netAnnuelMin * 5 - Math.round(amount * 0.65 * 12 * 5))} DH de moins.`,
      },
    ],
    // Variation 4
    [
      {
        title: `Effet d'une augmentation de 20% du CA`,
        content: `Si votre CA passe de ${fmt(amount)} \u00e0 ${fmt(Math.round(amount * 1.2))} DH/mois (+20%), vos charges augmentent de ${fmt(calc.totalChargesMensuelMin)} \u00e0 ${fmt(Math.round(amount * 1.2 * activite.tauxIR + 100))} DH/mois (l'AMO reste fixe). Le net passe de ${fmt(calc.netMensuelMin)} \u00e0 ${fmt(Math.round(amount * 1.2 * (1 - activite.tauxIR) - 100))} DH, soit un gain net de ${fmt(Math.round(amount * 1.2 * (1 - activite.tauxIR) - 100 - calc.netMensuelMin))} DH/mois. Le plafond serait utilis\u00e9 \u00e0 ${Math.round(amount * 1.2 * 12 / calc.plafondCA * 100)}%.`,
      },
      {
        title: `Co\u00fbt r\u00e9el d'un jour ch\u00f4m\u00e9`,
        content: `Pour un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois, chaque jour non travaill\u00e9 co\u00fbte ${fmt(dailyRate)} DH de manque \u00e0 gagner brut et ${fmt(Math.round(calc.netMensuelMin / JOURS_OUVRES_MOIS))} DH net. Les charges fixes (AMO ${fmt(Math.round(1200 / 264))} DH/jour) courent m\u00eame sans activit\u00e9. Sur un mois de vacances (${JOURS_OUVRES_MOIS} jours), le co\u00fbt total est de ${fmt(amount)} DH de CA perdu + ${fmt(100)} DH d'AMO = ${fmt(amount + 100)} DH. Pr\u00e9voyez cette somme dans votre budget annuel.`,
      },
    ],
  ];

  return tipSets[variationIndex] || tipSets[0];
}

// ─── VENTILATION BUDG\u00c9TAIRE UNIQUE ─────────────────────────────────────

export function generateUniqueBudgetBreakdown(activite: Activite, calc: ActivityCalc): BudgetBreakdown[] {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 4;
  const netMensuel = calc.netMensuelMin;

  const breakdowns: BudgetBreakdown[][] = [
    // Variation 0 - Ventilation par poste fiscal
    [
      { label: `IR forfaitaire (${activite.tauxIR * 100}%)`, montant: Math.round(amount * activite.tauxIR), pourcentage: fmtDec(activite.tauxIR * 100) },
      { label: `AMO mensuelle`, montant: 100, pourcentage: fmtDec(100 / amount * 100) },
      { label: `Revenu disponible`, montant: netMensuel, pourcentage: fmtDec(netMensuel / amount * 100) },
      { label: `\u00c9pargne recommand\u00e9e (20%)`, montant: Math.round(netMensuel * 0.2), pourcentage: fmtDec(netMensuel * 0.2 / amount * 100) },
      { label: `Budget vie courante`, montant: Math.round(netMensuel * 0.6), pourcentage: fmtDec(netMensuel * 0.6 / amount * 100) },
      { label: `R\u00e9investissement activit\u00e9`, montant: Math.round(netMensuel * 0.2), pourcentage: fmtDec(netMensuel * 0.2 / amount * 100) },
    ],
    // Variation 1 - Ventilation temporelle
    [
      { label: `Revenu semaine 1`, montant: Math.round(amount / 4), pourcentage: `25,0` },
      { label: `Revenu semaine 2`, montant: Math.round(amount / 4), pourcentage: `25,0` },
      { label: `Revenu semaine 3`, montant: Math.round(amount / 4), pourcentage: `25,0` },
      { label: `Revenu semaine 4`, montant: Math.round(amount / 4), pourcentage: `25,0` },
      { label: `Charges du mois (IR+AMO)`, montant: calc.totalChargesMensuelMin, pourcentage: fmtDec(calc.totalChargesMensuelMin / amount * 100) },
      { label: `Net r\u00e9el disponible`, montant: netMensuel, pourcentage: fmtDec(netMensuel / amount * 100) },
    ],
    // Variation 2 - Comparatif charges
    [
      { label: `Charges AE (r\u00e9el)`, montant: calc.totalChargesMensuelMin, pourcentage: calc.tauxEffectifMin },
      { label: `Charges salari\u00e9 (\u00e9quivalent)`, montant: Math.round(amount * 0.35), pourcentage: `35,0` },
      { label: `\u00c9conomie AE mensuelle`, montant: Math.round(amount * 0.35) - calc.totalChargesMensuelMin, pourcentage: fmtDec((0.35 - calc.totalChargesMensuelMin / amount) * 100) },
      { label: `\u00c9conomie AE annuelle`, montant: (Math.round(amount * 0.35) - calc.totalChargesMensuelMin) * 12, pourcentage: `-` },
      { label: `Net AE`, montant: netMensuel, pourcentage: fmtDec(netMensuel / amount * 100) },
      { label: `Net salari\u00e9 (\u00e9quivalent)`, montant: Math.round(amount * 0.65), pourcentage: `65,0` },
    ],
    // Variation 3 - Projection annuelle
    [
      { label: `CA annuel`, montant: amount * 12, pourcentage: `100,0` },
      { label: `IR annuel`, montant: calc.irAnnuelMin, pourcentage: fmtDec(calc.irAnnuelMin / (amount * 12) * 100) },
      { label: `AMO annuelle`, montant: 1200, pourcentage: fmtDec(1200 / (amount * 12) * 100) },
      { label: `Net annuel`, montant: calc.netAnnuelMin, pourcentage: fmtDec(calc.netAnnuelMin / (amount * 12) * 100) },
      { label: `Marge avant plafond`, montant: calc.margeRestanteMin, pourcentage: fmtDec(calc.margeRestanteMin / calc.plafondCA * 100) },
      { label: `\u00c9quivalent net mensuel`, montant: netMensuel, pourcentage: fmtDec(netMensuel / amount * 100) },
    ],
  ];

  return breakdowns[variationIndex] || breakdowns[0];
}

// ─── COMPARAISONS UNIQUES AE vs SARL ───────────────────────────────

export function generateUniqueComparisons(activite: Activite, calc: ActivityCalc): ComparisonInsight[] {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 4;
  const annualCA = amount * 12;

  // Calculs SARL
  const beneficeSARL = Math.round(annualCA * 0.6); // 40% de charges d\u00e9ductibles estim\u00e9es
  const isSARL = Math.round(beneficeSARL * 0.10); // IS 10% pour < 300K
  const cnssSARL = Math.round(annualCA * 0.6 * 0.3296); // CNSS sur r\u00e9mun\u00e9ration g\u00e9rant
  const comptaSARL = 4000; // Frais comptable annuels
  const totalSARL = isSARL + cnssSARL + comptaSARL;
  const netSARL = annualCA - totalSARL - Math.round(annualCA * 0.4);

  const comparisons: ComparisonInsight[][] = [
    // Variation 0 - Focus charges
    [
      { metric: `Charges annuelles totales`, aeValue: `${fmt(calc.totalChargesAnnuelMin)} DH`, sarlValue: `${fmt(totalSARL)} DH`, verdict: calc.totalChargesAnnuelMin < totalSARL ? `AE moins cher de ${fmt(totalSARL - calc.totalChargesAnnuelMin)} DH` : `SARL moins cher` },
      { metric: `Taux effectif de pr\u00e9l\u00e8vement`, aeValue: `${calc.tauxEffectifMin}%`, sarlValue: `${fmtDec(totalSARL / annualCA * 100)}%`, verdict: `\u00c9cart de ${fmtDec(totalSARL / annualCA * 100 - parseFloat(calc.tauxEffectifMin))} points` },
      { metric: `Net mensuel moyen`, aeValue: `${fmt(calc.netMensuelMin)} DH`, sarlValue: `${fmt(Math.round(netSARL / 12))} DH`, verdict: calc.netMensuelMin > Math.round(netSARL / 12) ? `Avantage AE : +${fmt(calc.netMensuelMin - Math.round(netSARL / 12))} DH/mois` : `Avantage SARL` },
      { metric: `Simplicit\u00e9 administrative`, aeValue: `1 d\u00e9claration/trimestre`, sarlValue: `Comptabilit\u00e9 compl\u00e8te + bilan`, verdict: `AE : 4 d\u00e9clarations/an vs 12+ obligations SARL` },
    ],
    // Variation 1 - Focus rentabilit\u00e9
    [
      { metric: `Jours pour payer les charges/an`, aeValue: `${getDaysToPayTaxes(amount, activite.tauxIR)} jours`, sarlValue: `${Math.ceil(totalSARL / getDailyRate(amount))} jours`, verdict: `${Math.ceil(totalSARL / getDailyRate(amount)) - getDaysToPayTaxes(amount, activite.tauxIR)} jours de travail \u00e9conomis\u00e9s en AE` },
      { metric: `Co\u00fbt fiscal par jour ouvr\u00e9`, aeValue: `${fmt(Math.round(calc.totalChargesAnnuelMin / 264))} DH`, sarlValue: `${fmt(Math.round(totalSARL / 264))} DH`, verdict: `\u00c9conomie quotidienne AE : ${fmt(Math.round((totalSARL - calc.totalChargesAnnuelMin) / 264))} DH` },
      { metric: `Seuil de d\u00e9ductibilit\u00e9 rentable`, aeValue: `Aucune d\u00e9duction`, sarlValue: `D\u00e8s ${fmt(Math.round(annualCA * 0.25))} DH/an de charges`, verdict: `SARL rentable si charges > 25% du CA` },
      { metric: `D\u00e9lai de mise en place`, aeValue: `48h (ae.gov.ma)`, sarlValue: `2-4 semaines + 5 000-15 000 DH`, verdict: `AE : d\u00e9marrage imm\u00e9diat et gratuit` },
    ],
    // Variation 2 - Focus projection
    [
      { metric: `Net cumul\u00e9 sur 3 ans`, aeValue: `${fmt(calc.netAnnuelMin * 3)} DH`, sarlValue: `${fmt(netSARL * 3)} DH`, verdict: calc.netAnnuelMin * 3 > netSARL * 3 ? `AE gagne ${fmt(calc.netAnnuelMin * 3 - netSARL * 3)} DH de plus` : `SARL gagne plus` },
      { metric: `Cotisation retraite`, aeValue: `0 DH (aucune)`, sarlValue: `${fmt(Math.round(annualCA * 0.6 * 0.0648 * 12 / 12))} DH/mois`, verdict: `AE : pas de retraite mais net plus \u00e9lev\u00e9` },
      { metric: `Plafond CA annuel`, aeValue: `${fmt(calc.plafondCA)} DH`, sarlValue: `Illimit\u00e9`, verdict: `AE limit\u00e9 \u00e0 ${fmt(Math.round(calc.plafondCA / 12))} DH/mois max` },
      { metric: `Protection patrimoine`, aeValue: `Responsabilit\u00e9 illimit\u00e9e`, sarlValue: `Limit\u00e9e aux apports`, verdict: `SARL prot\u00e8ge le patrimoine personnel` },
    ],
    // Variation 3 - Focus pratique
    [
      { metric: `Co\u00fbt de gestion annuel`, aeValue: `0 DH (autog\u00e9r\u00e9)`, sarlValue: `${fmt(comptaSARL)} DH (expert-comptable)`, verdict: `\u00c9conomie AE : ${fmt(comptaSARL)} DH/an de comptabilit\u00e9` },
      { metric: `IR sur ${fmt(annualCA)} DH de CA`, aeValue: `${fmt(calc.irAnnuelMin)} DH (${activite.tauxIR * 100}% forfaitaire)`, sarlValue: `${fmt(isSARL)} DH IS + IR dividendes`, verdict: `R\u00e9gime forfaitaire simple et pr\u00e9visible` },
      { metric: `Couverture maladie (AMO)`, aeValue: `${fmt(1200)} DH/an (basique)`, sarlValue: `${fmt(Math.round(cnssSARL * 0.3))} DH/an (compl\u00e8te)`, verdict: `SARL : couverture sup\u00e9rieure mais co\u00fbt ` + fmtDec(Math.round(cnssSARL * 0.3) / 1200) + `x` },
      { metric: `Revenus disponibles ce mois`, aeValue: `${fmt(calc.netMensuelMin)} DH imm\u00e9diat`, sarlValue: `Via salaire g\u00e9rant ou dividendes`, verdict: `AE : libert\u00e9 totale de disposition du net` },
    ],
  ];

  return comparisons[variationIndex] || comparisons[0];
}

// ─── PARAGRAPHE UNIQUE DE CONTEXTE \u00c9CONOMIQUE ─────────────────────────

export function generateUniqueEconomicContext(activite: Activite, calc: ActivityCalc): string {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 8;
  const dailyRate = getDailyRate(amount);
  const hourlyRate = getHourlyRate(amount);
  const medianComp = getMedianComparison(calc.netMensuelMin);
  const smigMult = getSmigMultiple(calc.netMensuelMin);
  const annualSavings = getAnnualSavings(amount, activite.tauxIR);
  const taxDays = getDaysToPayTaxes(amount, activite.tauxIR);
  const weeklyRate = getWeeklyRate(amount);

  const contexts: string[] = [
    // 0
    `En termes de pouvoir d'achat, un ${activite.nom.toLowerCase()} auto-entrepreneur \u00e0 ${fmt(amount)} DH/mois conserve ${fmt(calc.netMensuelMin)} DH net apr\u00e8s charges, soit ${smigMult} fois le SMIG marocain de ${fmt(SMIG_MENSUEL)} DH. Rapport\u00e9 \u00e0 un taux journalier de ${fmt(dailyRate)} DH sur ${JOURS_OUVRES_MOIS} jours ouvr\u00e9s, seulement ${taxDays} jours de travail par an suffisent pour couvrir l'int\u00e9gralit\u00e9 des ${fmt(calc.totalChargesAnnuelMin)} DH de charges obligatoires. L'\u00e9conomie par rapport au salariat classique est de ${fmt(annualSavings)} DH par an, rendant le r\u00e9gime AE particuli\u00e8rement attractif pour cette activit\u00e9.`,

    // 1
    `L'analyse financi\u00e8re d\u00e9taill\u00e9e r\u00e9v\u00e8le qu'un ${activite.nom.toLowerCase()} AE g\u00e9n\u00e8re ${fmt(weeklyRate)} DH par semaine effective, soit ${fmt(hourlyRate)} DH/heure sur une base de 8 heures. Le diff\u00e9rentiel net avec le salaire m\u00e9dian marocain est de ${medianComp > 0 ? '+' : ''}${medianComp}% (${fmt(calc.netMensuelMin)} DH net vs ${fmt(MEDIAN_SALARY_MAD)} DH m\u00e9dian). Sur 5 ans d'exercice \u00e0 ce rythme, le cumul net atteint ${fmt(calc.netAnnuelMin * 5)} DH, avec des charges totales de seulement ${fmt(calc.totalChargesAnnuelMin * 5)} DH sur la m\u00eame p\u00e9riode.`,

    // 2
    `Le mod\u00e8le \u00e9conomique du ${activite.nom.toLowerCase()} AE au Maroc repose sur un taux de r\u00e9tention exceptionnel de ${fmtDec(100 - parseFloat(calc.tauxEffectifMin))}%. Pour chaque ${fmt(dailyRate)} DH factur\u00e9s par jour, le co\u00fbt fiscal n'est que de ${fmt(Math.round(calc.totalChargesAnnuelMin / 264))} DH/jour. La marge mensuelle de ${fmt(calc.plafondCA / 12 - amount)} DH avant plafond permet une croissance s\u00e9curis\u00e9e. Un ${activite.nom.toLowerCase()} avec ${Math.max(2, Math.floor(amount / 3000))} clients r\u00e9guliers g\u00e9n\u00e8re ${fmt(Math.round(amount / Math.max(2, Math.floor(amount / 3000))))} DH net par client apr\u00e8s r\u00e9partition des charges.`,

    // 3
    `D'un point de vue macro\u00e9conomique, le ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois se positionne dans le ${medianComp > 50 ? 'quartile sup\u00e9rieur' : medianComp > 0 ? 'segment m\u00e9dian-sup\u00e9rieur' : 'segment m\u00e9dian'} des revenus ind\u00e9pendants au Maroc. Le ratio charges/CA de ${calc.tauxEffectifMin}% place cette activit\u00e9 parmi les plus fiscalement avantageuses du r\u00e9gime. La productivit\u00e9 nette par heure travaill\u00e9e (${fmt(Math.round(calc.netMensuelMin / (JOURS_OUVRES_MOIS * 8)))} DH/h) et le seuil de rentabilit\u00e9 bas (${fmt(Math.round(1200 / 12 / (1 - activite.tauxIR)))} DH/mois de CA minimum) confirment la viabilit\u00e9 du mod\u00e8le.`,

    // 4
    `La structure financi\u00e8re d'un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois se d\u00e9compose en 3 flux : le pr\u00e9l\u00e8vement IR de ${fmt(calc.irMensuelMin)} DH/mois (${activite.tauxIR * 100}% du CA), la cotisation AMO de ${fmt(Math.round(1200 / 12))} DH/mois (fixe), et le net disponible de ${fmt(calc.netMensuelMin)} DH/mois. Avec un TJM de ${fmt(dailyRate)} DH, il suffit de ${fmtDec(calc.totalChargesMensuelMin / dailyRate)} jour(s) de facturation pour couvrir les charges mensuelles, lib\u00e9rant ${fmtDec(JOURS_OUVRES_MOIS - calc.totalChargesMensuelMin / dailyRate)} jours de revenus nets purs.`,

    // 5
    `Concr\u00e8tement, chaque heure travaill\u00e9e par un ${activite.nom.toLowerCase()} AE g\u00e9n\u00e8re ${fmt(hourlyRate)} DH brut dont ${fmt(Math.round(hourlyRate * parseFloat(calc.tauxEffectifMin) / 100))} DH partent en charges et ${fmt(Math.round(hourlyRate * (100 - parseFloat(calc.tauxEffectifMin)) / 100))} DH restent en poche. Sur ${SEMAINES_AN} semaines travaill\u00e9es par an, le revenu net hebdomadaire de ${fmt(Math.round(calc.netAnnuelMin / SEMAINES_AN))} DH surpasse de ${fmt(Math.round(calc.netAnnuelMin / SEMAINES_AN - MEDIAN_SALARY_MAD * 12 / 52))} DH le revenu hebdomadaire m\u00e9dian. Le cumul d'\u00e9conomies fiscales sur 3 ans atteint ${fmt(annualSavings * 3)} DH vs le salariat.`,

    // 6
    `Le profil de risque fiscal du ${activite.nom.toLowerCase()} AE est extr\u00eamement faible : charges fixes mensuelles de seulement ${fmt(calc.totalChargesMensuelMin)} DH (dont ${fmt(100)} DH d'AMO m\u00eame \u00e0 CA nul). Le point mort est atteint d\u00e8s ${fmt(Math.round(calc.totalChargesMensuelMin / (1 - activite.tauxIR)))} DH de CA mensuel. Au-del\u00e0 de ce seuil, chaque dirham suppl\u00e9mentaire g\u00e9n\u00e8re ${fmtDec((1 - activite.tauxIR) * 100)} centimes de net. Avec ${fmt(amount)} DH/mois, vous \u00eates ${fmtDec(amount / (calc.totalChargesMensuelMin / (1 - activite.tauxIR)))} fois au-dessus du seuil de rentabilit\u00e9.`,

    // 7
    `Le multiple de s\u00e9curit\u00e9 financi\u00e8re d'un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois est de ${fmtDec(calc.netMensuelMin / calc.totalChargesMensuelMin)}x (net / charges). Ce ratio signifie que m\u00eame une baisse de CA de ${Math.round((1 - calc.totalChargesMensuelMin / calc.netMensuelMin) * 100)}% ne mettrait pas en p\u00e9ril la couverture des charges obligatoires. La r\u00e9silience financi\u00e8re est renforc\u00e9e par un plafond utilis\u00e9 \u00e0 seulement ${calc.pourcentagePlafondMin}%, laissant ${fmt(calc.margeRestanteMin)} DH de capacit\u00e9 de croissance annuelle sans changement de statut.`,
  ];

  return contexts[variationIndex] || contexts[0];
}

// ─── PARAGRAPHE UNIQUE DE PROJECTION FINANCI\u00c8RE ──────────────────────

export function generateUniqueProjection(activite: Activite, calc: ActivityCalc): string {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 6;
  const maxAmount = activite.revenuMoyen.max;
  const growthRate = Math.round(((maxAmount - amount) / amount) * 100);

  const projections: string[] = [
    // 0
    `Si votre activit\u00e9 de ${activite.nom.toLowerCase()} cro\u00eet de ${fmt(amount)} \u00e0 ${fmt(maxAmount)} DH/mois (+${growthRate}%), votre net mensuel passera de ${fmt(calc.netMensuelMin)} \u00e0 ${fmt(calc.netMensuelMax)} DH, un gain net de ${fmt(calc.netMensuelMax - calc.netMensuelMin)} DH/mois. Les charges annuelles passeront de ${fmt(calc.totalChargesAnnuelMin)} \u00e0 ${fmt(calc.totalChargesAnnuelMax)} DH (+${fmt(calc.totalChargesAnnuelMax - calc.totalChargesAnnuelMin)} DH). Le plafond sera alors utilis\u00e9 \u00e0 ${calc.pourcentagePlafondMax}%, laissant ${fmt(calc.margeRestanteMax)} DH de marge.`,

    // 1
    `Projection trimestrielle pour un ${activite.nom.toLowerCase()} en croissance : T1 (${fmt(amount)} DH/mois, d\u00e9claration ${fmt(Math.round(amount * 3 * activite.tauxIR + 300))} DH), T2 (${fmt(Math.round(amount * 1.1))} DH/mois, d\u00e9claration ${fmt(Math.round(amount * 1.1 * 3 * activite.tauxIR + 300))} DH), T3 (${fmt(Math.round(amount * 1.2))} DH/mois, d\u00e9claration ${fmt(Math.round(amount * 1.2 * 3 * activite.tauxIR + 300))} DH), T4 (${fmt(Math.round(amount * 1.3))} DH/mois, d\u00e9claration ${fmt(Math.round(amount * 1.3 * 3 * activite.tauxIR + 300))} DH). CA annuel projet\u00e9 : ${fmt(Math.round(amount * 12 * 1.15))} DH, soit ${Math.round(amount * 12 * 1.15 / calc.plafondCA * 100)}% du plafond.`,

    // 2
    `La trajectoire financi\u00e8re optimale pour un ${activite.nom.toLowerCase()} AE est d'atteindre ${fmt(Math.round(calc.plafondCA / 12 * 0.8))} DH/mois (80% du plafond mensuel moyen). \u00c0 ce niveau, le net mensuel serait de ${fmt(Math.round(calc.plafondCA / 12 * 0.8 * (1 - activite.tauxIR) - 100))} DH avec des charges annuelles de ${fmt(Math.round(calc.plafondCA * 0.8 * activite.tauxIR + 1200))} DH. La zone optimale se situe entre ${fmt(Math.round(calc.plafondCA / 12 * 0.6))} et ${fmt(Math.round(calc.plafondCA / 12 * 0.85))} DH/mois : assez \u00e9lev\u00e9 pour un bon revenu, assez bas pour \u00e9viter le risque de d\u00e9passement.`,

    // 3
    `Mod\u00e9lisation de l'\u00e9volution du patrimoine : un ${activite.nom.toLowerCase()} AE \u00e9pargnant 30% de son net (${fmt(Math.round(calc.netMensuelMin * 0.3))} DH/mois) accumule ${fmt(Math.round(calc.netMensuelMin * 0.3 * 12))} DH la premi\u00e8re ann\u00e9e, ${fmt(Math.round(calc.netMensuelMin * 0.3 * 24 * 1.03))} DH en 2 ans (avec 3% de rendement), et ${fmt(Math.round(calc.netMensuelMin * 0.3 * 60 * 1.08))} DH sur 5 ans. Ce capital constitue une excellente base pour un \u00e9ventuel passage en SARL n\u00e9cessitant un apport minimum de 1 DH symbolique mais un fonds de roulement recommand\u00e9 de ${fmt(Math.round(amount * 3))} DH.`,

    // 4
    `Sc\u00e9nario de transition pour un ${activite.nom.toLowerCase()} : \u00e0 ${fmt(amount)} DH/mois (situation actuelle), le statut AE est optimal avec un gain net de ${fmt(calc.netMensuelMin)} DH. Si votre CA atteint ${fmt(Math.round(calc.plafondCA / 12 * 0.9))} DH/mois pendant 3 mois cons\u00e9cutifs, lancez la cr\u00e9ation d'une SARL en parall\u00e8le (d\u00e9lai 2-4 semaines). Le co\u00fbt de transition est d'environ ${fmt(Math.round(amount * 0.5))} DH (frais juridiques + comptable), amortissable en ${Math.ceil(amount * 0.5 / (Math.round(calc.plafondCA / 12 * 0.9 * 0.05)))} mois gr\u00e2ce aux d\u00e9ductions fiscales.`,

    // 5
    `Plan financier ann\u00e9e 1 pour un ${activite.nom.toLowerCase()} AE : objectif CA de ${fmt(amount * 12)} DH (${fmt(amount)} DH/mois), charges totales pr\u00e9visionnelles de ${fmt(calc.totalChargesAnnuelMin)} DH, net annuel de ${fmt(calc.netAnnuelMin)} DH. Marge de s\u00e9curit\u00e9 avant plafond : ${fmt(calc.margeRestanteMin)} DH. Points de vigilance : provisionner ${fmt(Math.round(calc.totalChargesAnnuelMin / 4))} DH chaque trimestre pour les d\u00e9clarations, maintenir ${fmt(Math.round(amount * 2))} DH de tr\u00e9sorerie minimum, et surveiller le ratio CA cumul\u00e9/plafond mensuellement.`,
  ];

  return projections[variationIndex] || projections[0];
}

// ─── SECTION UNIQUE "LE SAVIEZ-VOUS" ────────────────────────────────

export function generateUniqueDidYouKnow(activite: Activite, calc: ActivityCalc): string[] {
  const amount = activite.revenuMoyen.min;
  const variationIndex = Math.floor(amount / 1000) % 5;
  const dailyRate = getDailyRate(amount);
  const hourlyRate = getHourlyRate(amount);
  const taxDays = getDaysToPayTaxes(amount, activite.tauxIR);
  const smigMult = getSmigMultiple(calc.netMensuelMin);

  const facts: string[][] = [
    // 0
    [
      `Un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois ne travaille que ${taxDays} jours par an pour l'\u00c9tat (charges obligatoires), contre 80-100 jours pour un salari\u00e9 au m\u00eame revenu brut.`,
      `Votre taux horaire net de ${fmt(Math.round(calc.netMensuelMin / (JOURS_OUVRES_MOIS * 8)))} DH/h \u00e9quivaut \u00e0 un salaire brut mensuel de ${fmt(Math.round(calc.netMensuelMin / 0.65))} DH en entreprise classique.`,
      `Sur 10 ans d'exercice, l'\u00e9conomie cumul\u00e9e vs le salariat repr\u00e9sente ${fmt(getAnnualSavings(amount, activite.tauxIR) * 10)} DH, soit le prix d'un appartement dans une ville secondaire marocaine.`,
    ],
    // 1
    [
      `\u00c0 ${fmt(dailyRate)} DH/jour, il suffit de ${fmtDec(calc.totalChargesMensuelMin / dailyRate, 1)} jour(s) de travail par mois pour couvrir l'int\u00e9gralit\u00e9 de vos charges fiscales de ${activite.nom.toLowerCase()} AE.`,
      `Le ${activite.nom.toLowerCase()} AE gagne ${smigMult}x le SMIG marocain net, tout en travaillant avec une flexibilit\u00e9 horaire totale et sans hi\u00e9rarchie.`,
      `Votre marge avant plafond de ${fmt(calc.margeRestanteMin)} DH/an vous permet d'augmenter votre CA de ${Math.round(calc.margeRestanteMin / (amount * 12) * 100)}% avant de devoir changer de statut.`,
    ],
    // 2
    [
      `Chaque trimestre, votre d\u00e9claration de ${activite.nom.toLowerCase()} AE ne prend que 5 minutes sur ae.gov.ma pour un paiement de ${fmt(calc.irTrimestrielMin + calc.amoTrimestriel)} DH, soit le co\u00fbt de ${fmtDec((calc.irTrimestrielMin + calc.amoTrimestriel) / dailyRate, 1)} jour(s) de travail.`,
      `Un ${activite.nom.toLowerCase()} AE \u00e0 ${fmt(amount)} DH/mois paie ${fmt(Math.round(calc.totalChargesAnnuelMin / 365))} DH par jour calendaire de charges, m\u00eame le week-end et les jours f\u00e9ri\u00e9s.`,
      `Avec ${fmt(hourlyRate)} DH/heure brut, 15 minutes de votre travail de ${activite.nom.toLowerCase()} suffisent pour payer votre charge AMO journali\u00e8re (${fmt(Math.round(1200 / 365))} DH/jour).`,
    ],
    // 3
    [
      `Le statut AE vous fait \u00e9conomiser environ ${fmt(Math.round(getAnnualSavings(amount, activite.tauxIR) / 12))} DH/mois vs le salariat, soit l'\u00e9quivalent d'un loyer dans beaucoup de villes marocaines.`,
      `Votre CA annuel de ${fmt(amount * 12)} DH ne repr\u00e9sente que ${calc.pourcentagePlafondMin}% du plafond autoris\u00e9, vous donnant une capacit\u00e9 de croissance de ${fmt(calc.margeRestanteMin)} DH sans changement de statut.`,
      `En tant que ${activite.nom.toLowerCase()} AE, vous \u00eates exon\u00e9r\u00e9 de la patente pendant les 5 premi\u00e8res ann\u00e9es et de la TVA tant que votre CA reste sous ${fmt(calc.plafondCA)} DH/an.`,
    ],
    // 4
    [
      `Le co\u00fbt total d'une ann\u00e9e de couverture maladie (AMO) pour un ${activite.nom.toLowerCase()} AE est de ${fmt(1200)} DH, soit ${fmt(Math.round(1200 / 12))} DH/mois ou ${fmtDec(1200 / (amount * 12) * 100)}% de votre CA annuel.`,
      `\u00c0 ${fmt(amount)} DH/mois, chaque augmentation de 1 000 DH de CA ne g\u00e9n\u00e8re que ${fmt(Math.round(1000 * activite.tauxIR))} DH de charges suppl\u00e9mentaires (IR ${activite.tauxIR * 100}%), tout le reste (${fmt(1000 - Math.round(1000 * activite.tauxIR))} DH) va directement dans votre poche.`,
      `Sur une carri\u00e8re de ${activite.nom.toLowerCase()} AE de 20 ans au m\u00eame rythme, vous aurez g\u00e9n\u00e9r\u00e9 ${fmt(calc.netAnnuelMin * 20)} DH de revenus nets cumul\u00e9s pour seulement ${fmt(calc.totalChargesAnnuelMin * 20)} DH de charges totales vers\u00e9es \u00e0 l'\u00c9tat.`,
    ],
  ];

  return facts[variationIndex] || facts[0];
}
