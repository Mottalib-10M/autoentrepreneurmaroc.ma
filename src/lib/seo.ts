/**
 * Utilitaires SEO
 */

import { siteConfig } from '../config';

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  modifiedDate?: string;
  noindex?: boolean;
}

/**
 * Genere le titre complet de la page
 */
export function getFullTitle(pageTitle: string): string {
  if (pageTitle === siteConfig.name) return pageTitle;
  return `${pageTitle} | ${siteConfig.name}`;
}

/**
 * Genere les donnees structurees Schema.org pour le site
 */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'fr-MA',
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };
}

/**
 * Genere les donnees structurees pour une page article/guide
 */
export function getArticleSchema(props: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    url: props.url,
    inLanguage: 'fr-MA',
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: props.datePublished || '2025-01-15',
    dateModified: props.dateModified || new Date().toISOString().split('T')[0],
  };
}

/**
 * Genere les donnees structurees pour un outil/calculateur
 */
export function getSoftwareAppSchema(props: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: props.name,
    description: props.description,
    url: props.url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'MAD',
    },
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  };
}

/**
 * Genere les donnees structurees FAQ
 */
export function getFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

/**
 * Genere les donnees structurees BreadcrumbList
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
