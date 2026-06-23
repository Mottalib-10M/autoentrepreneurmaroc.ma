/**
 * Configuration des taux et seuils du statut auto-entrepreneur au Maroc (2025)
 * Sources: Loi 114-13, DGI, ae.gov.ma
 */

export const AE_CONFIG = {
  /** Taux IR forfaitaire selon le type d'activite */
  tauxIR: {
    commercial: 0.01, // 1% du CA pour activites commerciales/industrielles/artisanales
    services: 0.02,   // 2% du CA pour prestations de services
  },

  /** Seuils annuels de chiffre d'affaires */
  seuils: {
    commercial: 500_000, // 500 000 DH/an
    services: 200_000,   // 200 000 DH/an
  },

  /** Labels pour les types d'activites */
  labelsActivite: {
    commercial: 'Activites commerciales, industrielles et artisanales',
    services: 'Prestations de services',
  } as Record<string, string>,

  /** Cotisation CNSS / AMO */
  cnss: {
    amoTrimestriel: 300, // 300 DH par trimestre
    amoAnnuel: 1_200,    // 1 200 DH par an
  },

  /** Bareme IR progressif (regime reel) - pour comparaison */
  baremeIR: [
    { min: 0, max: 30_000, taux: 0, deduction: 0 },
    { min: 30_001, max: 50_000, taux: 0.10, deduction: 3_000 },
    { min: 50_001, max: 60_000, taux: 0.20, deduction: 8_000 },
    { min: 60_001, max: 80_000, taux: 0.30, deduction: 14_000 },
    { min: 80_001, max: 180_000, taux: 0.34, deduction: 17_200 },
    { min: 180_001, max: Infinity, taux: 0.38, deduction: 24_400 },
  ],

  /** Taux IS pour SARL/SAS (2025) */
  tauxIS: [
    { min: 0, max: 300_000, taux: 0.10 },
    { min: 300_001, max: 1_000_000, taux: 0.20 },
    { min: 1_000_001, max: Infinity, taux: 0.31 },
  ],

  /** Cotisations CNSS pour salaries (SARL/SAS) - gerant majoritaire */
  cnssGerant: {
    tauxPatronal: 0.2648, // 26.48% charges patronales
    tauxSalarial: 0.0648, // 6.48% charges salariales
    plafondMensuel: 6_000, // Plafond mensuel pour certaines cotisations
  },

  /** Inscription */
  inscription: {
    plateforme: 'ae.gov.ma',
    delai: '48 heures',
    documents: [
      'Copie de la CIN (Carte d\'Identite Nationale)',
      'Certificat de residence de moins de 3 mois',
      'Photo d\'identite recente',
    ],
  },

  /** Mentions obligatoires sur facture AE */
  mentionsFacture: [
    'Nom et prenom de l\'auto-entrepreneur',
    'Numero ICE (Identifiant Commun de l\'Entreprise)',
    'Adresse de l\'auto-entrepreneur',
    'Numero et date de la facture',
    'Designation et quantite des biens ou services',
    'Prix unitaire HT',
    'Montant total',
    'Mention "Exonere de TVA"',
  ],
} as const;

export type TypeActivite = 'commercial' | 'services';
