/**
 * Utilitaires de formatage pour le site
 */

/**
 * Formate un montant en DH marocain
 */
export function formatMontant(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(montant) + ' DH';
}

/**
 * Formate un montant sans décimales
 */
export function formatMontantEntier(montant: number): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(montant) + ' DH';
}

/**
 * Formate un pourcentage
 */
export function formatPourcentage(valeur: number, decimales: number = 2): string {
  return (valeur * 100).toFixed(decimales) + '%';
}

/**
 * Formate un nombre
 */
export function formatNombre(valeur: number): string {
  return new Intl.NumberFormat('fr-FR').format(valeur);
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Formate une date courte
 */
export function formatDateCourte(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Parse un montant saisi par l'utilisateur (accepte espaces, virgules)
 */
export function parseMontant(valeur: string): number {
  const cleaned = valeur.replace(/\s/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.max(0, parsed);
}
