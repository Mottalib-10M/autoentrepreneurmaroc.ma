/**
 * Centralised navigation data for Header and Footer components.
 * All internal links use trailing slashes to match trailingSlash: 'always'.
 */

export interface NavLink {
  href: string;
  label: string;
  external?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Header nav links (flat list used for both desktop and mobile)      */
/* ------------------------------------------------------------------ */

export const headerLinks: NavLink[] = [
  { href: '/calculateur-charges-ae/', label: 'Calculateurs' },
  { href: '/guides/inscription-auto-entrepreneur/', label: 'Guide Inscription' },
  { href: '/comparateur-statuts/', label: 'Comparateur Statuts' },
  { href: '/generateur-facture/', label: 'Factures' },
  { href: '/guides/', label: 'Guides' },
  { href: '/actualites/', label: 'Actualités' },
];

/* ------------------------------------------------------------------ */
/*  Footer nav groupings                                               */
/* ------------------------------------------------------------------ */

export const footerToolLinks: NavLink[] = [
  { href: '/calculateur-charges-ae/', label: 'Calculateur de Charges AE' },
  { href: '/comparateur-statuts/', label: 'Comparateur de Statuts' },
  { href: '/generateur-facture/', label: 'Générateur de Factures' },
  { href: '/suivi-chiffre-affaires/', label: "Suivi du Chiffre d'Affaires" },
];

export const footerGuideLinks: NavLink[] = [
  { href: '/guides/inscription-auto-entrepreneur/', label: "Guide d'Inscription AE" },
  { href: '/guides/fiscalite-auto-entrepreneur/', label: "Fiscalité de l'AE" },
  { href: '/guides/passer-ae-sarl/', label: "Passer de l'AE à la SARL" },
  { href: '/guides/obligations-facturation/', label: 'Obligations de Facturation' },
  { href: '/guides/cnss-auto-entrepreneur/', label: 'CNSS Auto-Entrepreneur' },
  { href: '/actualites/', label: 'Actualités' },
  { href: '/glossaire/', label: 'Glossaire' },
];

export const footerLegalLinks: NavLink[] = [
  { href: '/a-propos/', label: 'À propos' },
  { href: '/methodologie/', label: 'Méthodologie' },
  { href: '/contact/', label: 'Contact' },
  { href: '/confidentialite/', label: 'Confidentialité' },
  { href: '/mentions-legales/', label: 'Mentions légales' },
];
