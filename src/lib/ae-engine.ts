/**
 * Moteur de calcul auto-entrepreneur Maroc
 * Tous les calculs sont conformes à la législation marocaine 2026
 */

import { AE_CONFIG, type TypeActivite } from '../data/ae-config';

// ─── Types ───────────────────────────────────────────────────────────

export interface IRResult {
  ca: number;
  taux: number;
  montantIR: number;
  netApresIR: number;
}

export interface IRAnnuelResult {
  caAnnuel: number;
  taux: number;
  irAnnuel: number;
  irTrimestriel: number;
  netAnnuel: number;
}

export interface ChargesResult {
  ca: number;
  ir: number;
  tauxIR: number;
  amo: number;
  totalCharges: number;
  net: number;
  tauxEffectif: number;
}

export interface SimulationResult {
  caMensuel: number;
  caTrimestriel: number;
  caAnnuel: number;
  irAnnuel: number;
  amoAnnuel: number;
  totalChargesAnnuel: number;
  netAnnuel: number;
  netMensuelMoyen: number;
  tauxEffectifAnnuel: number;
}

export interface StatutComparaison {
  statut: string;
  caAnnuel: number;
  charges: number;
  impots: number;
  totalPrelevements: number;
  netApresCharges: number;
  tauxEffectif: number;
  avantages: string[];
  inconvenients: string[];
  complexite: 'Faible' | 'Moyenne' | 'Élevée';
}

export interface ComparaisonResult {
  statuts: StatutComparaison[];
  recommandation: string;
  raisonRecommandation: string;
}

export interface SeuilResult {
  seuil: number;
  caActuel: number;
  depassement: boolean;
  margeRestante: number;
  pourcentageUtilise: number;
  typeActivite: TypeActivite;
}

export interface LigneFacture {
  designation: string;
  quantite: number;
  prixUnitaire: number;
}

export interface FactureResult {
  lignes: Array<LigneFacture & { montant: number }>;
  totalHT: number;
  tva: 0;
  totalTTC: number;
  mentionTVA: string;
}

// ─── Fonctions de calcul ─────────────────────────────────────────────

/**
 * Calcule l'IR forfaitaire pour un trimestre
 */
export function calculerIRForfaitaire(caTrimestriel: number, typeActivite: TypeActivite): IRResult {
  const taux = AE_CONFIG.tauxIR[typeActivite];
  const montantIR = Math.round(caTrimestriel * taux * 100) / 100;

  return {
    ca: caTrimestriel,
    taux,
    montantIR,
    netApresIR: caTrimestriel - montantIR,
  };
}

/**
 * Calcule l'IR forfaitaire annuel
 */
export function calculerIRAnnuel(caAnnuel: number, typeActivite: TypeActivite): IRAnnuelResult {
  const taux = AE_CONFIG.tauxIR[typeActivite];
  const irAnnuel = Math.round(caAnnuel * taux * 100) / 100;
  const irTrimestriel = Math.round(irAnnuel / 4 * 100) / 100;

  return {
    caAnnuel,
    taux,
    irAnnuel,
    irTrimestriel,
    netAnnuel: caAnnuel - irAnnuel,
  };
}

/**
 * Calcule toutes les charges AE pour un trimestre (IR + AMO)
 */
export function calculerChargesAE(caTrimestriel: number, typeActivite: TypeActivite): ChargesResult {
  const irResult = calculerIRForfaitaire(caTrimestriel, typeActivite);
  const amo = AE_CONFIG.cnss.amoTrimestriel;
  const totalCharges = irResult.montantIR + amo;
  const net = caTrimestriel - totalCharges;
  const tauxEffectif = caTrimestriel > 0 ? totalCharges / caTrimestriel : 0;

  return {
    ca: caTrimestriel,
    ir: irResult.montantIR,
    tauxIR: irResult.taux,
    amo,
    totalCharges,
    net,
    tauxEffectif: Math.round(tauxEffectif * 10000) / 10000,
  };
}

/**
 * Simule le revenu annuel à partir d'un CA mensuel
 */
export function simulerRevenuAnnuel(caMensuel: number, typeActivite: TypeActivite): SimulationResult {
  const caTrimestriel = caMensuel * 3;
  const caAnnuel = caMensuel * 12;
  const taux = AE_CONFIG.tauxIR[typeActivite];
  const irAnnuel = Math.round(caAnnuel * taux * 100) / 100;
  const amoAnnuel = AE_CONFIG.cnss.amoAnnuel;
  const totalChargesAnnuel = irAnnuel + amoAnnuel;
  const netAnnuel = caAnnuel - totalChargesAnnuel;
  const netMensuelMoyen = Math.round(netAnnuel / 12 * 100) / 100;
  const tauxEffectifAnnuel = caAnnuel > 0 ? totalChargesAnnuel / caAnnuel : 0;

  return {
    caMensuel,
    caTrimestriel,
    caAnnuel,
    irAnnuel,
    amoAnnuel,
    totalChargesAnnuel,
    netAnnuel,
    netMensuelMoyen,
    tauxEffectifAnnuel: Math.round(tauxEffectifAnnuel * 10000) / 10000,
  };
}

/**
 * Calcule l'IR selon le barème progressif (régime réel)
 */
function calculerIRBareme(revenuImposable: number): number {
  for (const tranche of AE_CONFIG.baremeIR) {
    if (revenuImposable >= tranche.min && revenuImposable <= tranche.max) {
      return Math.round((revenuImposable * tranche.taux - tranche.deduction) * 100) / 100;
    }
  }
  const derniereTranche = AE_CONFIG.baremeIR[AE_CONFIG.baremeIR.length - 1];
  return Math.round((revenuImposable * derniereTranche.taux - derniereTranche.deduction) * 100) / 100;
}

/**
 * Calcule l'IS pour SARL/SAS selon le barème progressif
 */
function calculerIS(benefice: number): number {
  let is = 0;
  let restant = benefice;

  for (const tranche of AE_CONFIG.tauxIS) {
    const base = Math.min(restant, tranche.max - tranche.min + 1);
    if (base <= 0) break;
    is += base * tranche.taux;
    restant -= base;
  }

  return Math.round(is * 100) / 100;
}

/**
 * Compare les 3 statuts juridiques pour un même CA
 */
export function comparerStatuts(caAnnuel: number, chargesEstimees: number): ComparaisonResult {
  // --- Auto-Entrepreneur ---
  const typeActivite: TypeActivite = caAnnuel <= 200_000 ? 'services' : 'commercial';
  const tauxAE = AE_CONFIG.tauxIR[typeActivite];
  const irAE = Math.round(caAnnuel * tauxAE * 100) / 100;
  const amoAE = AE_CONFIG.cnss.amoAnnuel;
  const totalAE = irAE + amoAE;

  const seuilAE = AE_CONFIG.seuils[typeActivite];
  const depasseSeuilAE = caAnnuel > seuilAE;

  const ae: StatutComparaison = {
    statut: 'Auto-Entrepreneur',
    caAnnuel,
    charges: amoAE,
    impots: irAE,
    totalPrelevements: totalAE,
    netApresCharges: caAnnuel - totalAE,
    tauxEffectif: caAnnuel > 0 ? Math.round(totalAE / caAnnuel * 10000) / 10000 : 0,
    avantages: [
      'Fiscalité très avantageuse (1-2% du CA)',
      'Création en 48h en ligne',
      'Comptabilité simplifiée',
      'Exonéré de TVA',
      'Aucun capital minimum',
    ],
    inconvenients: [
      `Plafond de CA : ${seuilAE.toLocaleString('fr-FR')} DH/an`,
      'Responsabilité illimitée',
      'Protection sociale limitée (AMO uniquement)',
      'Pas de déduction des charges',
      ...(depasseSeuilAE ? ['CA dépasse le seuil AE !'] : []),
    ],
    complexite: 'Faible',
  };

  // --- SARL ---
  const beneficeSARL = caAnnuel - chargesEstimees;
  const isSARL = calculerIS(Math.max(0, beneficeSARL));
  // Gérant majoritaire: rémunération environ 60% du bénéfice
  const remunerationGerant = beneficeSARL * 0.6;
  const chargesCNSS_SARL = Math.round(remunerationGerant * (AE_CONFIG.cnssGerant.tauxPatronal + AE_CONFIG.cnssGerant.tauxSalarial) * 100) / 100;
  const totalSARL = isSARL + chargesCNSS_SARL;

  const sarl: StatutComparaison = {
    statut: 'SARL',
    caAnnuel,
    charges: chargesCNSS_SARL,
    impots: isSARL,
    totalPrelevements: totalSARL,
    netApresCharges: caAnnuel - chargesEstimees - totalSARL,
    tauxEffectif: caAnnuel > 0 ? Math.round(totalSARL / caAnnuel * 10000) / 10000 : 0,
    avantages: [
      'CA illimité',
      'Responsabilité limitée aux apports',
      'Protection sociale complète (CNSS)',
      'Déduction des charges professionnelles',
      'Crédibilité auprès des banques et clients',
    ],
    inconvenients: [
      'IS de 10 à 31% sur le bénéfice',
      'Comptabilité complète obligatoire',
      'Création plus longue (2-4 semaines)',
      'Frais de gestion plus élevés',
      'Assujetti à la TVA',
    ],
    complexite: 'Élevée',
  };

  // --- SAS (similaire SARL pour le Maroc, structure plus flexible) ---
  const isSAS = isSARL; // Même barème IS
  const chargesCNSS_SAS = chargesCNSS_SARL;
  const totalSAS = isSAS + chargesCNSS_SAS;

  const sas: StatutComparaison = {
    statut: 'SAS',
    caAnnuel,
    charges: chargesCNSS_SAS,
    impots: isSAS,
    totalPrelevements: totalSAS,
    netApresCharges: caAnnuel - chargesEstimees - totalSAS,
    tauxEffectif: caAnnuel > 0 ? Math.round(totalSAS / caAnnuel * 10000) / 10000 : 0,
    avantages: [
      'CA illimité',
      'Responsabilité limitée',
      'Flexibilité statutaire',
      'Protection sociale complète',
      'Adapté pour plusieurs associés',
    ],
    inconvenients: [
      'IS de 10 à 31% sur le bénéfice',
      'Comptabilité complète obligatoire',
      'Création plus longue (2-4 semaines)',
      'Frais de gestion élevés',
      'Assujetti à la TVA',
    ],
    complexite: 'Élevée',
  };

  // --- Recommandation ---
  let recommandation: string;
  let raisonRecommandation: string;

  if (depasseSeuilAE) {
    recommandation = 'SARL';
    raisonRecommandation = `Votre CA de ${caAnnuel.toLocaleString('fr-FR')} DH dépasse le seuil auto-entrepreneur de ${seuilAE.toLocaleString('fr-FR')} DH. La SARL est le choix logique pour votre niveau d'activité.`;
  } else if (caAnnuel < 100_000) {
    recommandation = 'Auto-Entrepreneur';
    raisonRecommandation = `Avec un CA de ${caAnnuel.toLocaleString('fr-FR')} DH, le statut auto-entrepreneur est idéal : fiscalité minimale et zéro complexité administrative.`;
  } else if (ae.netApresCharges > sarl.netApresCharges) {
    recommandation = 'Auto-Entrepreneur';
    raisonRecommandation = `Le statut AE vous laisse un net supérieur (${ae.netApresCharges.toLocaleString('fr-FR')} DH vs ${sarl.netApresCharges.toLocaleString('fr-FR')} DH pour la SARL). Restez en AE tant que votre CA le permet.`;
  } else {
    recommandation = 'SARL';
    raisonRecommandation = `À ce niveau de CA et de charges, la SARL devient plus avantageuse grâce à la déduction des charges professionnelles.`;
  }

  return {
    statuts: [ae, sarl, sas],
    recommandation,
    raisonRecommandation,
  };
}

/**
 * Vérifie si le CA est dans les limites AE
 */
export function verifierSeuil(caAnnuel: number, typeActivite: TypeActivite): SeuilResult {
  const seuil = AE_CONFIG.seuils[typeActivite];
  const depassement = caAnnuel > seuil;
  const margeRestante = Math.max(0, seuil - caAnnuel);
  const pourcentageUtilise = seuil > 0 ? Math.min(Math.round(caAnnuel / seuil * 10000) / 10000, 1.5) : 0;

  return {
    seuil,
    caActuel: caAnnuel,
    depassement,
    margeRestante,
    pourcentageUtilise,
    typeActivite,
  };
}

/**
 * Calcule le total d'une facture à partir des lignes
 */
export function calculerFacture(lignes: LigneFacture[]): FactureResult {
  const lignesCalculees = lignes.map(l => ({
    ...l,
    montant: Math.round(l.quantite * l.prixUnitaire * 100) / 100,
  }));

  const totalHT = lignesCalculees.reduce((sum, l) => sum + l.montant, 0);

  return {
    lignes: lignesCalculees,
    totalHT: Math.round(totalHT * 100) / 100,
    tva: 0,
    totalTTC: Math.round(totalHT * 100) / 100,
    mentionTVA: 'Exonéré de TVA - Statut Auto-Entrepreneur, Loi 114-13',
  };
}
