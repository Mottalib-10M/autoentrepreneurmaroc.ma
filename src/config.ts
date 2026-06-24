export const siteConfig = {
  name: 'Auto-Entrepreneur Maroc',
  domain: 'autoentrepreneurmaroc.ma',
  url: 'https://autoentrepreneurmaroc.ma',
  tagline: 'Le guide complet de l\'auto-entrepreneur au Maroc',
  description: 'Guide complet, calculateurs et outils gratuits pour les auto-entrepreneurs au Maroc. Simulez vos charges, comparez les statuts et générez vos factures.',
  author: {
    name: 'Mottalib Radif',
    credentials: 'MBA INSEAD',
    url: 'https://autoentrepreneurmaroc.ma/a-propos/',
  },
  contact: {
    email: 'contact@autoentrepreneurmaroc.ma',
  },
  colors: {
    brand: '#D97706',
    brandDark: '#B45309',
    brandLight: '#F59E0B',
  },
  lang: 'fr',
  currency: 'MAD',
  currencySymbol: 'DH',
  social: {
    twitter: '',
    linkedin: '',
  },
} as const;

export const navLinks = [
  { label: 'Calculateurs', href: '/calculateur-charges-ae/' },
  { label: 'Guide Inscription', href: '/guides/inscription-auto-entrepreneur/' },
  { label: 'Comparateur Statuts', href: '/comparateur-statuts/' },
  { label: 'Factures', href: '/generateur-facture/' },
  { label: 'Guides', href: '/guides/' },
] as const;
