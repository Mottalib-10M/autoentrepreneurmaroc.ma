/**
 * Données des 20 activités populaires d'auto-entrepreneur au Maroc
 * Utilisé pour générer les pages /activite/[slug]
 */

export interface Activite {
  slug: string;
  nom: string;
  type: 'services' | 'commercial';
  tauxIR: number;
  plafondCA: number;
  revenuMoyen: { min: number; max: number };
  tarifMoyen: string;
  description: string;
  autorisations: string[];
  editorial: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const activites: Activite[] = [
  {
    slug: 'developpeur-web',
    nom: 'Développeur Web',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 8_000, max: 25_000 },
    tarifMoyen: '300 à 800 DH/jour',
    description: 'Création de sites web, applications et solutions numériques en tant qu\'auto-entrepreneur au Maroc.',
    autorisations: [],
    editorial: `Le développement web est l'une des activités les plus populaires parmi les auto-entrepreneurs au Maroc. Avec la transformation numérique accélérée des entreprises marocaines, la demande pour des développeurs web qualifiés ne cesse de croître. En tant qu'auto-entrepreneur développeur web, vous pouvez proposer vos services de création de sites internet, d'applications web, de maintenance et d'hébergement à des clients locaux et internationaux.

Le marché marocain offre des opportunités intéressantes. Les PME marocaines investissent de plus en plus dans leur présence en ligne et cherchent des prestataires locaux pour créer leurs sites vitrines, boutiques en ligne ou applications métier. Les tarifs pratiqués varient considérablement selon l'expérience et la complexité des projets : un site vitrine simple peut être facturé entre 5 000 et 15 000 DH, tandis qu'une application web complexe peut atteindre 50 000 DH ou plus.

L'avantage majeur du statut auto-entrepreneur pour un développeur web est la simplicité fiscale. Avec un taux d'IR de seulement 2% sur le chiffre d'affaires, vous conservez l'essentiel de vos revenus. De plus, les charges d'exploitation sont généralement faibles : un ordinateur, une connexion internet et éventuellement des licences logicielles suffisent pour démarrer.

Attention cependant au plafond de chiffre d'affaires de 200 000 DH par an. Si vous travaillez avec des clients internationaux et facturez en devises, ce plafond peut être atteint rapidement. Dans ce cas, il sera judicieux d'envisager le passage à une SARL pour pouvoir déduire vos charges professionnelles et bénéficier d'un régime fiscal plus adapté à un CA élevé.

Pour réussir en tant que développeur web auto-entrepreneur au Maroc, il est conseillé de se spécialiser dans une niche (e-commerce, WordPress, React, applications mobiles) et de construire un portfolio solide. Les plateformes freelance internationales comme Upwork ou Fiverr, ainsi que les réseaux professionnels locaux, sont d'excellents canaux pour trouver des clients.`,
    faqs: [
      { question: 'Quel chiffre d\'affaires peut espérer un développeur web auto-entrepreneur au Maroc ?', answer: 'Un développeur web auto-entrepreneur au Maroc peut espérer un chiffre d\'affaires mensuel de 8 000 à 25 000 DH selon son expérience, sa spécialisation et sa clientèle. Les développeurs travaillant avec des clients internationaux atteignent souvent le haut de cette fourchette, voire dépassent le plafond AE de 200 000 DH/an.' },
      { question: 'Quelles compétences sont les plus demandées pour un développeur web freelance au Maroc ?', answer: 'Les compétences les plus demandées incluent React, Next.js, WordPress, PHP/Laravel, Node.js et le développement d\'applications mobiles (React Native, Flutter). La maîtrise du e-commerce (Shopify, WooCommerce) est également très recherchée par les entreprises marocaines.' },
      { question: 'Un développeur web auto-entrepreneur doit-il avoir un diplôme spécifique ?', answer: 'Non, le statut auto-entrepreneur ne requiert aucun diplôme spécifique pour le développement web. C\'est votre portfolio et vos compétences techniques qui comptent. Cependant, des certifications (AWS, Google, Meta) peuvent renforcer votre crédibilité auprès des clients.' },
      { question: 'Comment facturer un client étranger en tant que développeur web AE au Maroc ?', answer: 'Vous pouvez facturer en dirhams ou en devises étrangères. La facture doit comporter toutes les mentions obligatoires (ICE, mention exonération TVA). Le paiement peut se faire par virement bancaire international. Le CA en devises est converti en DH pour la déclaration trimestrielle au taux de change du jour.' },
      { question: 'Quand un développeur web devrait-il passer de l\'AE à la SARL ?', answer: 'Le passage à la SARL est recommandé si votre CA dépasse régulièrement 15 000 DH/mois (risque de dépasser le plafond de 200 000 DH/an), si vous avez des charges importantes (matériel, licences, sous-traitance) ou si vous souhaitez embaucher un collaborateur.' },
    ],
  },
  {
    slug: 'graphiste',
    nom: 'Graphiste',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 18_000 },
    tarifMoyen: '200 à 600 DH/jour',
    description: 'Design graphique, création de logos, supports visuels et identité de marque en freelance au Maroc.',
    autorisations: [],
    editorial: `Le graphisme freelance est une activité en pleine expansion au Maroc. Les entreprises de toutes tailles ont besoin de visuels professionnels pour leur communication : logos, chartes graphiques, supports marketing, packaging et contenu pour les réseaux sociaux. En tant que graphiste auto-entrepreneur, vous pouvez répondre à cette demande croissante avec un statut fiscal avantageux.

Les tarifs d'un graphiste auto-entrepreneur au Maroc varient selon la spécialisation et l'expérience. La création d'un logo peut être facturée entre 2 000 et 10 000 DH, une charte graphique complète entre 5 000 et 20 000 DH, et un support print (flyer, brochure) entre 500 et 3 000 DH. Les graphistes spécialisés dans le UI/UX design ou l'animation motion design peuvent pratiquer des tarifs plus élevés.

Le statut auto-entrepreneur est particulièrement adapté au graphisme car les charges d'exploitation sont relativement faibles. Votre principal investissement sera votre matériel informatique (ordinateur performant, écran calibré) et vos licences logicielles (Adobe Creative Suite ou alternatives). Avec un taux d'IR de 2% et une AMO de 300 DH par trimestre, la charge fiscale reste très légère.

Le marché marocain du design graphique est compétitif mais offre de réelles opportunités. Les agences de communication sous-traitent régulièrement à des freelances, et les PME préfèrent souvent un graphiste indépendant à une agence pour des questions de budget. La création d'un portfolio en ligne solide et une présence active sur les réseaux sociaux professionnels (Behance, Dribbble, LinkedIn) sont essentielles pour attirer des clients.

Pour maximiser vos revenus, pensez à proposer des packs de services (logo + charte graphique + supports réseaux sociaux) et à fidéliser vos clients avec des contrats de maintenance visuelle mensuels. Cela vous assure un revenu récurrent et une meilleure visibilité sur votre CA trimestriel.`,
    faqs: [
      { question: 'Combien gagne un graphiste auto-entrepreneur au Maroc ?', answer: 'Un graphiste auto-entrepreneur au Maroc gagne en moyenne entre 5 000 et 18 000 DH par mois, selon la spécialisation (print, digital, UI/UX, motion design), l\'expérience et la qualité du portfolio.' },
      { question: 'Quels logiciels utiliser comme graphiste freelance ?', answer: 'Les logiciels les plus utilisés sont Adobe Photoshop, Illustrator, InDesign et After Effects. Des alternatives existent : Figma pour le UI/UX, Canva pour les visuels rapides, et GIMP/Inkscape pour les budgets serrés.' },
      { question: 'Faut-il un diplôme en design pour devenir graphiste AE ?', answer: 'Non, aucun diplôme n\'est requis pour s\'inscrire comme graphiste auto-entrepreneur. Votre portfolio et vos compétences techniques sont les critères principaux pour vos clients.' },
      { question: 'Comment protéger ses créations graphiques en tant qu\'AE ?', answer: 'Les créations graphiques sont protégées par le droit d\'auteur dès leur création. Pour une protection renforcée, vous pouvez les enregistrer auprès du BMDA. Précisez les droits cédés dans vos contrats.' },
      { question: 'Un graphiste AE peut-il travailler avec des agences ?', answer: 'Oui, c\'est même l\'une des sources de revenus les plus courantes. Les agences de communication sous-traitent régulièrement des projets à des graphistes freelances.' },
    ],
  },
  {
    slug: 'consultant',
    nom: 'Consultant',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 10_000, max: 30_000 },
    tarifMoyen: '500 à 2 000 DH/jour',
    description: 'Conseil en stratégie, management, marketing ou IT pour entreprises marocaines en tant qu\'AE.',
    autorisations: [],
    editorial: `Le consulting est une activité très valorisée au Maroc et le statut d'auto-entrepreneur permet d'y accéder facilement. Que vous soyez consultant en stratégie, marketing, ressources humaines, informatique ou finance, le marché marocain offre de nombreuses opportunités pour les experts indépendants.

Les entreprises marocaines, en particulier les PME en croissance et les filiales de groupes internationaux, font régulièrement appel à des consultants externes. Les tarifs journaliers varient de 500 DH/jour pour un consultant junior à plus de 2 000 DH/jour pour un expert senior dans un domaine spécialisé comme la transformation digitale ou la conformité réglementaire.

Le statut auto-entrepreneur présente un atout fiscal majeur pour les consultants : un IR de seulement 2% du chiffre d'affaires. Pour un consultant facturant 15 000 DH par mois, cela représente un IR annuel de seulement 3 600 DH. La simplicité administrative (déclaration trimestrielle en ligne) vous laisse plus de temps pour vos missions clients.

Cependant, le plafond de 200 000 DH par an peut être une contrainte pour les consultants expérimentés. Avec un tarif journalier de 1 500 DH, le plafond est atteint en seulement 133 jours de mission, soit environ 6 mois à plein temps. Si vous prévoyez de dépasser ce seuil, préparez votre transition vers la SARL.

Pour développer votre activité de consulting, misez sur votre réseau professionnel. Le bouche-à-oreille reste le premier canal d'acquisition de clients au Maroc. Une présence active sur LinkedIn, des publications d'expertise et la participation à des événements professionnels locaux sont des leviers efficaces.`,
    faqs: [
      { question: 'Un consultant AE peut-il travailler pour des entreprises étrangères ?', answer: 'Oui, un consultant AE au Maroc peut facturer des clients étrangers. Les factures doivent comporter les mentions obligatoires (ICE, exonération TVA). Les paiements en devises sont convertis en DH pour la déclaration.' },
      { question: 'Quel est le plafond de CA pour un consultant auto-entrepreneur ?', answer: 'Le plafond est de 200 000 DH par an pour les prestations de services. Si vous le dépassez pendant 2 années consécutives, vous devez passer au régime réel.' },
      { question: 'Le consulting nécessite-t-il une autorisation spéciale ?', answer: 'Le consulting généraliste ne nécessite aucune autorisation spéciale. Certains domaines réglementés comme l\'expertise comptable ou le conseil juridique nécessitent des qualifications spécifiques.' },
      { question: 'Comment établir un contrat de mission en tant que consultant AE ?', answer: 'Rédigez un contrat précisant l\'objet de la mission, la durée, les livrables, le tarif, les modalités de paiement et les clauses de confidentialité.' },
      { question: 'Quelles charges peut déduire un consultant AE ?', answer: 'L\'auto-entrepreneur ne peut déduire aucune charge. L\'IR forfaitaire de 2% s\'applique sur le CA brut. Si vos charges sont importantes, la SARL est plus intéressante.' },
    ],
  },
  {
    slug: 'photographe',
    nom: 'Photographe',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 20_000 },
    tarifMoyen: '1 500 à 5 000 DH/événement',
    description: 'Photographie événementielle, corporate et artistique en auto-entrepreneur au Maroc.',
    autorisations: [],
    editorial: `La photographie est une activité créative et polyvalente parfaitement adaptée au statut d'auto-entrepreneur au Maroc. Le secteur événementiel marocain est particulièrement dynamique avec les mariages, fêtes et événements d'entreprise qui génèrent une forte demande en photographie professionnelle.

Un photographe de mariage peut facturer entre 3 000 et 15 000 DH par événement. La photographie corporate offre des revenus plus réguliers avec des tarifs de 2 000 à 8 000 DH par jour de shooting. Le marché marocain offre de nombreuses opportunités pour les photographes qualifiés.

En tant que photographe auto-entrepreneur, vos charges comprennent l'amortissement du matériel (appareil photo, objectifs, éclairage) et les logiciels de retouche. Le statut AE ne permet pas de déduire ces investissements, mais le taux d'IR de 2% reste très avantageux tant que votre CA ne dépasse pas 200 000 DH.

Pour développer votre clientèle, investissez dans un site portfolio de qualité, soyez actif sur Instagram et Pinterest, et cultivez les recommandations. La collaboration avec des organisateurs d'événements et des agences immobilières peut vous assurer un flux régulier de missions.

Pensez à diversifier vos revenus avec la vente de photos de stock, les formations en photographie, ou la location de votre studio. Ces activités complémentaires vous permettent de lisser vos revenus tout au long de l'année.`,
    faqs: [
      { question: 'Combien coûte un photographe AE au Maroc ?', answer: 'Les tarifs varient : 1 500 à 5 000 DH pour un événement, 2 000 à 8 000 DH/jour pour de la photo corporate, 500 à 2 000 DH pour un shooting portrait.' },
      { question: 'Faut-il une autorisation spéciale pour être photographe AE ?', answer: 'Non, aucune autorisation n\'est requise. Pour les shootings dans certains lieux publics protégés, une autorisation ponctuelle peut être nécessaire.' },
      { question: 'Comment gérer la TVA sur le matériel photo en AE ?', answer: 'En AE, vous ne pouvez pas récupérer la TVA sur vos achats de matériel. Si vos investissements sont importants, la SARL peut être plus avantageuse.' },
      { question: 'Un photographe AE peut-il vendre ses photos en ligne ?', answer: 'Oui, la vente sur des plateformes comme Shutterstock ou Adobe Stock est compatible avec le statut AE et déclarée comme CA de prestation de services.' },
      { question: 'Quel matériel minimum pour démarrer comme photographe AE ?', answer: 'Prévoyez un appareil photo reflex ou hybride, un objectif polyvalent, un flash externe et un ordinateur. L\'investissement initial varie de 20 000 à 50 000 DH.' },
    ],
  },
  {
    slug: 'traducteur',
    nom: 'Traducteur',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 15_000 },
    tarifMoyen: '0.30 à 0.80 DH/mot',
    description: 'Traduction et interprétation français, arabe, anglais en auto-entrepreneur au Maroc.',
    autorisations: [],
    editorial: `La traduction est une activité intellectuelle parfaitement adaptée au statut d'auto-entrepreneur au Maroc. Le pays étant multilingue (arabe, français, amazigh) et ouvert sur l'international, les traducteurs qualifiés sont très demandés.

Les traducteurs se spécialisent dans les combinaisons français-arabe, anglais-français, anglais-arabe et espagnol-français. Les tarifs varient de 0.30 DH/mot pour de la traduction généraliste à plus de 0.80 DH/mot pour des domaines techniques (juridique, médical, technique).

Le statut AE offre un cadre fiscal très avantageux. Avec un IR de 2% sur le CA et des charges quasi nulles (un ordinateur et internet suffisent), le taux de rétention du revenu est excellent. Un traducteur avec un CA de 10 000 DH/mois ne paie que 2 400 DH d'IR par an.

Le marché est stimulé par le commerce international, le tourisme et la digitalisation. Les entreprises exportatrices, les cabinets d'avocats et les entreprises IT ont un besoin constant de traductions professionnelles.

Pour réussir, spécialisez-vous dans un ou deux domaines, utilisez des outils de TAO comme SDL Trados ou MemoQ, et inscrivez-vous sur les plateformes professionnelles (ProZ, TranslatorsCafe).`,
    faqs: [
      { question: 'Quelle est la différence entre traducteur et traducteur assermenté ?', answer: 'Un traducteur AE réalise des traductions commerciales et techniques. Un traducteur assermenté est habilité par les tribunaux pour des traductions ayant valeur juridique.' },
      { question: 'Combien gagne un traducteur AE au Maroc ?', answer: 'Un traducteur AE peut espérer un CA mensuel de 5 000 à 15 000 DH. Le tarif moyen est de 0.30 à 0.80 DH/mot selon la combinaison linguistique.' },
      { question: 'Quelles langues sont les plus demandées ?', answer: 'Les combinaisons français-arabe, anglais-français, anglais-arabe et espagnol-français sont les plus demandées.' },
      { question: 'Peut-on cumuler traduction et interprétation en AE ?', answer: 'Oui, les deux sont des prestations de services soumises au même taux d\'IR de 2%. Le plafond global reste 200 000 DH/an.' },
      { question: 'Quels outils utiliser pour la traduction professionnelle ?', answer: 'Les traducteurs utilisent des outils de TAO comme SDL Trados Studio, MemoQ ou OmegaT (gratuit) pour gérer les mémoires de traduction.' },
    ],
  },
  {
    slug: 'redacteur-web',
    nom: 'Rédacteur Web',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 4_000, max: 15_000 },
    tarifMoyen: '0.20 à 0.60 DH/mot',
    description: 'Rédaction de contenus web, articles SEO et copywriting en freelance au Maroc.',
    autorisations: [],
    editorial: `La rédaction web est l'une des activités freelance les plus accessibles au Maroc. Avec la croissance du marketing de contenu et du SEO, les entreprises recherchent activement des rédacteurs web francophones de qualité.

Vous pouvez proposer des articles de blog, fiches produits, pages web, newsletters et publications pour les réseaux sociaux. Les tarifs varient de 0.20 DH/mot pour de la rédaction basique à 0.60 DH/mot ou plus pour du copywriting spécialisé.

L'activité nécessite très peu d'investissement : un ordinateur, une connexion internet et de bonnes compétences rédactionnelles. Le taux d'IR de 2% est particulièrement avantageux car les charges d'exploitation sont quasi inexistantes.

Le marché est en croissance constante. Les agences digitales, les sites e-commerce et les startups ont tous besoin de contenu de qualité. La maîtrise du SEO est un différenciateur majeur permettant de facturer 30 à 50% de plus.

Pour développer votre activité, créez votre propre blog, inscrivez-vous sur les plateformes freelance (Malt, Upwork, Comeup) et prospectez les agences digitales marocaines.`,
    faqs: [
      { question: 'Combien gagne un rédacteur web AE au Maroc ?', answer: 'Un rédacteur web AE gagne entre 4 000 et 15 000 DH/mois. Un rédacteur SEO expérimenté peut facturer 0.50 à 0.60 DH/mot.' },
      { question: 'Faut-il des compétences SEO pour être rédacteur web ?', answer: 'Pas obligatoire mais fortement recommandé. Les compétences SEO augmentent significativement votre valeur et vos tarifs sur le marché.' },
      { question: 'Comment trouver des clients en tant que rédacteur web AE ?', answer: 'Plateformes freelance (Malt, Upwork), agences digitales, démarchage via LinkedIn et bouche-à-oreille sont les canaux principaux.' },
      { question: 'Peut-on rédiger en plusieurs langues sous le même statut AE ?', answer: 'Oui, toutes ces prestations sont des services soumis au taux d\'IR de 2%. Le multilinguisme est un atout.' },
      { question: 'La rédaction web IA va-t-elle remplacer les rédacteurs ?', answer: 'L\'IA transforme le métier sans le remplacer. L\'expertise métier et la connaissance du marché marocain restent essentielles.' },
    ],
  },
  {
    slug: 'community-manager',
    nom: 'Community Manager',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 15_000 },
    tarifMoyen: '2 000 à 5 000 DH/client/mois',
    description: 'Gestion de réseaux sociaux, création de contenu et stratégie digitale en AE au Maroc.',
    autorisations: [],
    editorial: `Le community management est devenu incontournable au Maroc avec l'explosion des réseaux sociaux. Vous gérez la présence en ligne de vos clients sur Facebook, Instagram, TikTok et LinkedIn. C'est une activité idéale pour le statut AE.

Les entreprises marocaines investissent de plus en plus dans leur présence sociale. Un community manager freelance gère 3 à 6 clients, facturant entre 2 000 et 5 000 DH par client et par mois pour un package incluant création de contenu, planification, modération et reporting.

Le statut AE est parfaitement adapté. Les charges sont faibles et le taux d'IR de 2% est avantageux. Avec 4 clients à 3 000 DH/mois, votre CA annuel de 144 000 DH reste sous le plafond de 200 000 DH.

Le marché est en forte croissance. Les secteurs demandeurs sont la restauration, l'hôtellerie, la mode, la beauté et l'immobilier. La maîtrise du français et du darija est un atout majeur.

Pour vous démarquer, proposez des services à valeur ajoutée : stratégie de contenu, publicité Facebook/Instagram Ads, analyse de performance et collaboration avec des influenceurs.`,
    faqs: [
      { question: 'Combien de clients peut gérer un community manager AE ?', answer: 'Un CM AE peut gérer 3 à 6 clients en parallèle selon la complexité des comptes.' },
      { question: 'Quels réseaux sociaux maîtriser en priorité au Maroc ?', answer: 'Facebook (dominant), Instagram (forte croissance), TikTok (jeunes), WhatsApp Business et LinkedIn (B2B).' },
      { question: 'Un CM AE peut-il gérer des campagnes publicitaires ?', answer: 'Oui, les dépenses pub sont facturées au client et votre prestation de gestion est facturée séparément.' },
      { question: 'Faut-il des certifications ?', answer: 'Pas obligatoire, mais Meta Blueprint, Google Digital Garage ou HubSpot renforcent votre crédibilité.' },
      { question: 'Comment fixer ses tarifs de community management ?', answer: 'Un package basique (8 publications/mois) : 2 000-3 000 DH/mois. Un package premium (20+ publications, Reels, publicité) : 5 000-8 000 DH/mois.' },
    ],
  },
  {
    slug: 'formateur',
    nom: 'Formateur',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 6_000, max: 20_000 },
    tarifMoyen: '1 000 à 3 000 DH/jour',
    description: 'Formation professionnelle, coaching et développement des compétences en AE au Maroc.',
    autorisations: [],
    editorial: `La formation professionnelle est un secteur en plein essor au Maroc, porté par les politiques de développement des compétences. En tant que formateur auto-entrepreneur, vous proposez vos services dans votre domaine d'expertise : informatique, langues, management, marketing digital ou soft skills.

Le marché est soutenu par les Contrats Spéciaux de Formation (CSF) gérés par l'OFPPT. Les tarifs journaliers varient de 1 000 DH/jour pour des formations généralistes à 3 000 DH/jour pour des formations spécialisées.

Le statut AE est très avantageux pour les formateurs dont le volume d'activité reste sous 200 000 DH/an. La flexibilité permet de combiner formation présentielle et formation en ligne.

La formation en ligne est un levier de croissance majeur. Avec des plateformes comme Udemy ou votre propre site, vous pouvez vendre des formations enregistrées qui génèrent des revenus passifs.

Pour réussir, investissez dans vos certifications, développez un catalogue attractif et construisez votre réputation à travers les évaluations de vos apprenants.`,
    faqs: [
      { question: 'Un formateur AE peut-il intervenir dans des entreprises ?', answer: 'Oui, un formateur AE peut intervenir pour des formations intra-entreprise. Il facture directement à l\'entreprise cliente.' },
      { question: 'Faut-il un agrément pour être formateur AE ?', answer: 'Pour les formations continues, aucun agrément spécifique n\'est obligatoire en tant que formateur indépendant AE.' },
      { question: 'Comment fixer le tarif journalier ?', answer: 'Formations généralistes : 1 000-1 500 DH/jour. Spécialisées : 1 500-3 000 DH/jour. Certifications : 3 000+ DH/jour.' },
      { question: 'Un formateur AE peut-il vendre des formations en ligne ?', answer: 'Oui, c\'est un excellent moyen de générer des revenus passifs complémentaires. Le CA est déclaré comme prestation de services.' },
      { question: 'Quels outils pour les formations en ligne ?', answer: 'Udemy, Teachable, Thinkific pour les plateformes. Zoom ou Google Meet pour les webinaires. OBS Studio pour l\'enregistrement.' },
    ],
  },
  {
    slug: 'coach',
    nom: 'Coach',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 20_000 },
    tarifMoyen: '500 à 2 000 DH/séance',
    description: 'Coaching personnel, professionnel et de vie en tant qu\'auto-entrepreneur au Maroc.',
    autorisations: [],
    editorial: `Le coaching est en pleine croissance au Maroc. Coaching de vie, professionnel, sportif ou de dirigeants, la demande augmente avec la prise de conscience de l'importance du développement personnel. Le statut AE offre un cadre idéal pour démarrer.

Le marché est encore jeune mais se développe rapidement. Les tarifs varient de 300 DH/séance pour du coaching de vie à 1 500 DH ou plus pour du coaching exécutif. Les programmes sur plusieurs mois sont souvent plus rentables.

Le statut AE est adapté car l'activité nécessite peu d'investissement : un espace de consultation, un téléphone et un ordinateur. Avec un taux d'IR de 2%, la charge fiscale est minimale.

Une certification reconnue (ICF, EMCC) est fortement recommandée bien que non obligatoire. Le coaching en ligne via Zoom ou Teams élargit votre marché potentiel au-delà de votre ville.

Le marketing personnel est essentiel : témoignages clients, contenu LinkedIn et Instagram, conférences et ateliers de découverte gratuits. Le bouche-à-oreille reste le principal canal d'acquisition.`,
    faqs: [
      { question: 'Faut-il une certification pour être coach AE ?', answer: 'Légalement non, mais une certification ICF, EMCC ou d\'une école accréditée est fortement recommandée pour votre crédibilité.' },
      { question: 'Combien gagne un coach AE au Maroc ?', answer: 'Entre 5 000 et 20 000 DH/mois selon la spécialisation. Le coaching exécutif peut atteindre 15 000-20 000 DH/mois.' },
      { question: 'Peut-on faire du coaching en ligne en AE ?', answer: 'Oui, les séances en ligne sont la norme et permettent d\'élargir votre clientèle au-delà de votre ville.' },
      { question: 'Différence entre coach et psychologue ?', answer: 'Le coach accompagne vers des objectifs. Le psychologue traite des troubles. Le coaching n\'est pas réglementé, la psychologie l\'est.' },
      { question: 'Comment trouver ses premiers clients ?', answer: 'Séances découverte gratuites, contenu LinkedIn/Instagram, ateliers gratuits, et prospection auprès des entreprises locales.' },
    ],
  },
  {
    slug: 'comptable',
    nom: 'Comptable',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 6_000, max: 18_000 },
    tarifMoyen: '1 000 à 4 000 DH/client/mois',
    description: 'Tenue de comptabilité, conseil fiscal et gestion comptable en AE au Maroc.',
    autorisations: ['Ne pas confondre avec expert-comptable (profession réglementée)'],
    editorial: `La comptabilité en auto-entrepreneur est à distinguer de l'expertise comptable, profession réglementée nécessitant une inscription à l'Ordre des Experts-Comptables. En tant que comptable AE, vous proposez la tenue de comptabilité, la saisie, les déclarations fiscales et le conseil en gestion aux TPE et PME.

Les petites entreprises ont un fort besoin de services comptables externalisés. Un comptable AE gère 5 à 15 clients, facturant entre 1 000 et 4 000 DH par client et par mois.

Le statut AE offre un cadre fiscal avantageux : 2% d'IR sur le CA brut. Les charges se limitent à un logiciel de comptabilité et un ordinateur.

Vous ne pouvez pas signer de bilans ou rapports d'audit (réservés aux experts-comptables). Votre rôle se concentre sur la tenue quotidienne, la préparation des déclarations fiscales et le conseil en gestion financière.

Pour développer votre clientèle, ciblez les auto-entrepreneurs et TPE qui ont besoin d'un accompagnement comptable accessible. La digitalisation vous permet de servir des clients à distance.`,
    faqs: [
      { question: 'Peut-on exercer la comptabilité en AE ?', answer: 'Oui, pour la tenue de comptabilité et le conseil fiscal. L\'expertise comptable (signature de bilans) est réservée aux membres de l\'Ordre.' },
      { question: 'Combien de clients peut gérer un comptable AE ?', answer: 'Entre 5 et 15 clients selon la complexité. Les outils cloud permettent d\'optimiser la gestion.' },
      { question: 'Quels logiciels utiliser ?', answer: 'Sage, Ciel Compta, QuickBooks ou des solutions cloud. Excel bien structuré peut suffire pour les petits dossiers.' },
      { question: 'Un comptable AE doit-il avoir un diplôme ?', answer: 'Pas légalement requis, mais des compétences solides en comptabilité et fiscalité marocaine sont indispensables.' },
      { question: 'Peut-on préparer les déclarations fiscales des clients ?', answer: 'Oui, vous préparez les déclarations (TVA, IS, IR, CNSS) mais la responsabilité légale reste celle du chef d\'entreprise.' },
    ],
  },
  {
    slug: 'artisan',
    nom: 'Artisan',
    type: 'commercial',
    tauxIR: 0.01,
    plafondCA: 500_000,
    revenuMoyen: { min: 4_000, max: 15_000 },
    tarifMoyen: 'Variable selon métier',
    description: 'Artisanat marocain, fabrication et vente de produits artisanaux en auto-entrepreneur.',
    autorisations: ['Carte d\'artisan (selon spécialité)'],
    editorial: `L'artisanat est un pilier de l'économie marocaine et le statut AE offre un cadre simplifié pour les artisans. Potier, menuisier, bijoutier, maroquinier, couturier : le statut AE vous permet d'exercer légalement avec une fiscalité très avantageuse.

En tant qu'artisan AE, vous bénéficiez du plafond le plus élevé : 500 000 DH/an avec un taux d'IR de seulement 1%. Pour un artisan réalisant 10 000 DH de CA mensuel, l'IR annuel ne sera que de 1 200 DH.

Le Maroc dispose d'un patrimoine artisanal reconnu internationalement : zellige, tapis, poterie de Safi, bijouterie berbère, maroquinerie de Fès. Le statut AE permet de commercialiser ces produits en toute légalité.

Pour certaines spécialités, une carte d'artisan délivrée par les Chambres d'Artisanat peut être requise. Renseignez-vous auprès de la Chambre de votre région.

La vente en ligne (Etsy, Amazon Handmade, Shopify) est un formidable levier de croissance. Le label "Made in Morocco" est très apprécié à l'étranger.`,
    faqs: [
      { question: 'Quel est le plafond de CA pour un artisan AE ?', answer: 'Le plafond est de 500 000 DH/an avec un taux d\'IR de 1%, le plus favorable du statut AE.' },
      { question: 'Faut-il une carte d\'artisan ?', answer: 'Elle n\'est pas toujours obligatoire mais fortement recommandée. Elle est délivrée par les Chambres d\'Artisanat.' },
      { question: 'Un artisan AE peut-il vendre en ligne ?', answer: 'Oui, via Etsy, Amazon Handmade, Instagram Shopping ou votre propre boutique en ligne.' },
      { question: 'Quelles aides existent pour les artisans ?', answer: 'Programmes via les Chambres d\'Artisanat, microcrédits (Al Amana, ARDI) et programme Moukawalati.' },
      { question: 'Comment exporter des produits artisanaux en AE ?', answer: 'L\'exportation est possible. Respectez les réglementations douanières et les normes du pays de destination.' },
    ],
  },
  {
    slug: 'coiffeur',
    nom: 'Coiffeur',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 4_000, max: 12_000 },
    tarifMoyen: '50 à 300 DH/prestation',
    description: 'Coiffure à domicile ou en salon en tant qu\'auto-entrepreneur au Maroc.',
    autorisations: ['Autorisation d\'exercice de la commune (si local commercial)'],
    editorial: `La coiffure est un métier de proximité très demandé au Maroc. Le statut AE permet de l'exercer de manière formelle, que ce soit en petit salon, à domicile ou en prestation événementielle.

Les tarifs varient de 50 DH pour une coupe homme à 300 DH ou plus pour un brushing, une coloration ou une coiffure événementielle. Les coiffeurs spécialisés mariage peuvent facturer 500 à 2 000 DH.

Le statut AE offre une fiscalité de 2% d'IR. Les charges principales sont le loyer du local, les produits capillaires et le matériel. En AE, ces charges ne sont pas déductibles.

La coiffure à domicile permet de démarrer sans frais fixes de local. L'investissement initial est limité : matériel de coiffure portable et produits de base.

Si vous optez pour un local, vérifiez auprès de votre commune les autorisations nécessaires (exercice, hygiène).`,
    faqs: [
      { question: 'Un coiffeur peut-il exercer à domicile en AE ?', answer: 'Oui, la coiffure à domicile est compatible avec le statut AE. Déclarez votre domicile comme adresse d\'activité.' },
      { question: 'Faut-il un diplôme pour être coiffeur AE ?', answer: 'Pas obligatoire légalement, mais une formation est fortement recommandée pour la qualité des prestations.' },
      { question: 'Quelles sont les charges d\'un salon AE ?', answer: 'Loyer (2 000-5 000 DH), produits (500-2 000 DH), eau/électricité (300-800 DH). Non déductibles en AE.' },
      { question: 'Comment se différencier ?', answer: 'Spécialisez-vous (mariage, soins naturels, barberie), créez un Instagram avec vos réalisations, fidélisez avec des cartes.' },
      { question: 'Quel matériel minimum ?', answer: 'Ciseaux (500-2 000 DH), tondeuses (300-1 000 DH), sèche-cheveux (300-800 DH), produits de base. Total : 2 000-5 000 DH.' },
    ],
  },
  {
    slug: 'estheticienne',
    nom: 'Esthéticienne',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 4_000, max: 15_000 },
    tarifMoyen: '100 à 500 DH/prestation',
    description: 'Soins esthétiques, beauté et bien-être en auto-entrepreneur au Maroc.',
    autorisations: ['Autorisation d\'exercice (si local)', 'Respect des normes d\'hygiène'],
    editorial: `L'esthétique est un secteur florissant au Maroc, porté par une demande croissante de soins de beauté et de bien-être. Le statut AE permet de s'y lancer facilement, en institut, à domicile ou en prestation événementielle.

Les prestations incluent soins du visage (100-500 DH), épilation (50-200 DH/zone), manucure/pédicure (100-300 DH), maquillage événementiel (300-1 500 DH) et massages (200-500 DH).

Le statut AE avec son IR à 2% est intéressant pour les esthéticiennes à domicile qui n'ont pas les frais d'un local. L'investissement initial est modeste : matériel de soins, produits cosmétiques et table de soin portable.

Pour ouvrir un institut, vous aurez besoin d'une autorisation d'exercice et devrez respecter les normes d'hygiène. Les esthéticiennes à domicile doivent aussi garantir des conditions d'hygiène irréprochables.

Le marketing digital est essentiel : Instagram avec photos avant/après, avis Google, et partenariats avec coiffeuses et organisatrices d'événements.`,
    faqs: [
      { question: 'Peut-on exercer l\'esthétique à domicile en AE ?', answer: 'Oui, c\'est une solution économique. Assurez-vous de respecter les normes d\'hygiène et d\'utiliser du matériel stérilisé.' },
      { question: 'Faut-il un diplôme ?', answer: 'Pas obligatoire pour l\'inscription AE, mais une formation en esthétique est indispensable pour la qualité des soins.' },
      { question: 'Combien investir pour démarrer ?', answer: 'À domicile : 3 000-8 000 DH. En institut : 15 000-50 000 DH selon les prestations et le positionnement.' },
      { question: 'Quelles prestations sont les plus rentables ?', answer: 'Maquillage événementiel, soins du visage premium, extensions de cils et soins semi-permanents.' },
      { question: 'Comment fidéliser sa clientèle ?', answer: 'Cartes de fidélité, forfaits mensuels, offres de parrainage et qualité constante des soins.' },
    ],
  },
  {
    slug: 'chauffeur-vtc',
    nom: 'Chauffeur VTC',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 12_000 },
    tarifMoyen: '50 à 200 DH/course',
    description: 'Transport de personnes avec véhicule de tourisme avec chauffeur en AE au Maroc.',
    autorisations: ['Carte professionnelle de transport', 'Assurance véhicule professionnel', 'Visite technique à jour'],
    editorial: `Le transport VTC est en plein essor au Maroc, porté par Careem, InDrive et Heetch. Le statut AE permet de formaliser cette activité, mais des autorisations spécifiques sont requises.

Les tarifs varient selon la distance et la ville. À Casablanca ou Rabat, une course moyenne rapporte 50 à 150 DH. En travaillant 8 à 10 heures, un chauffeur peut générer 200 à 400 DH/jour.

Le cadre réglementaire est en évolution. Une carte professionnelle de transport est requise, et votre véhicule doit être couvert par une assurance professionnelle.

Le statut AE avec un IR de 2% est avantageux fiscalement, mais les charges réelles (carburant, assurance, entretien) représentent 40 à 60% du CA brut et ne sont pas déductibles.

Pour maximiser vos revenus, ciblez les heures de forte demande, entretenez votre véhicule et diversifiez (transferts aéroport, tourisme, événements).`,
    faqs: [
      { question: 'Quelles autorisations pour être chauffeur VTC AE ?', answer: 'Carte professionnelle de transport, assurance véhicule professionnel et visite technique à jour.' },
      { question: 'Combien gagne réellement un chauffeur VTC AE ?', answer: 'CA brut de 5 000-12 000 DH/mois. Revenu net après charges : 2 000-6 000 DH/mois.' },
      { question: 'Peut-on utiliser son véhicule personnel ?', answer: 'Oui, mais il doit être couvert par une assurance professionnelle et respecter les critères des plateformes.' },
      { question: 'Faut-il s\'inscrire sur une plateforme ?', answer: 'Pas obligatoire mais recommandé. Vous pouvez combiner plateformes et contrats privés.' },
      { question: 'Le plafond AE est-il suffisant ?', answer: 'Avec un CA moyen de 10 000 DH/mois, vous restez sous le plafond. Au-delà, envisagez une autre forme juridique.' },
    ],
  },
  {
    slug: 'livreur',
    nom: 'Livreur',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 3_000, max: 8_000 },
    tarifMoyen: '10 à 40 DH/livraison',
    description: 'Livraison de colis et repas à vélo, moto ou voiture en auto-entrepreneur au Maroc.',
    autorisations: ['Permis de conduire adapté', 'Assurance véhicule'],
    editorial: `La livraison est devenue incontournable au Maroc avec l'essor du e-commerce et des plateformes comme Glovo et Jumia Food. Le statut AE permet de formaliser cette activité et de bénéficier de l'AMO.

Un livreur AE gagne entre 10 et 40 DH par livraison. En travaillant 6 à 8 heures, le CA mensuel peut atteindre 3 000 à 8 000 DH. Les heures de pointe sont les plus lucratives.

Le statut AE avec un IR de 2% est accessible. Les charges réelles incluent carburant (800-2 000 DH/mois pour un scooter), entretien et assurance. Pour les livreurs à vélo, les charges sont nettement moindres.

L'inscription sur ae.gov.ma est simple. Votre numéro ICE vous permet de vous enregistrer sur les plateformes de livraison, formalisant votre relation avec elles.

Diversifiez au-delà des repas : e-commerce, courses alimentaires, médicaments et courrier express sont des segments en croissance.`,
    faqs: [
      { question: 'Quelles plateformes acceptent les AE ?', answer: 'Glovo, Jumia Food et d\'autres services locaux. Le statut AE est souvent un atout pour l\'inscription.' },
      { question: 'Peut-on livrer à vélo en AE ?', answer: 'Oui, c\'est la solution la plus économique. Un vélo électrique est un excellent compromis.' },
      { question: 'Combien gagne un livreur AE ?', answer: 'CA brut de 3 000-8 000 DH/mois. Revenu net : 2 000-5 000 DH selon le mode de transport.' },
      { question: 'Faut-il une assurance spéciale ?', answer: 'Si véhicule motorisé, une assurance couvrant l\'usage professionnel est recommandée.' },
      { question: 'La livraison est-elle un service ou du commerce ?', answer: 'Prestation de services (IR 2%, plafond 200 000 DH). Si vous vendez aussi des produits, la vente relève du commercial.' },
    ],
  },
  {
    slug: 'agent-immobilier',
    nom: 'Agent Immobilier',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 25_000 },
    tarifMoyen: '1-2.5% du prix de vente',
    description: 'Intermédiation immobilière, vente et location de biens au Maroc en auto-entrepreneur.',
    autorisations: ['Inscription au registre des agents immobiliers (recommandée)'],
    editorial: `L'immobilier est un secteur dynamique au Maroc. En tant qu'agent immobilier AE, vous mettez en relation vendeurs et acheteurs, ou propriétaires et locataires, moyennant une commission.

Les commissions standard sont de 2 à 2.5% du prix de vente et un mois de loyer pour les locations. Pour un appartement vendu à 1 000 000 DH, votre commission sera de 20 000 à 25 000 DH.

Le statut AE avec son IR de 2% est fiscalement avantageux, mais le plafond de 200 000 DH/an peut être limitant : une seule vente d'un bien à 5 000 000 DH génère 100 000 DH de commission.

La loi 107-12 encadre progressivement la profession. L'inscription au registre des agents immobiliers est recommandée pour la crédibilité professionnelle.

Pour réussir, construisez un réseau solide (notaires, banques, promoteurs), soyez présent sur les portails immobiliers (Avito, Mubawab) et investissez dans le marketing digital.`,
    faqs: [
      { question: 'Un agent immobilier peut-il exercer en AE ?', answer: 'Oui, l\'intermédiation immobilière est compatible avec le statut AE (services, IR 2%, plafond 200 000 DH/an).' },
      { question: 'Combien gagne un agent immobilier AE ?', answer: 'De 5 000 à 25 000 DH/mois selon le volume de transactions et le type de biens.' },
      { question: 'Quelle est la commission standard ?', answer: '2 à 2.5% du prix de vente pour les achats-ventes, un mois de loyer pour les locations.' },
      { question: 'Faut-il un diplôme ?', answer: 'La loi 107-12 prévoit des conditions de qualification. Des formations en immobilier renforcent votre compétence.' },
      { question: 'Le plafond AE est-il adapté à l\'immobilier ?', answer: 'Il peut être limitant pour un agent actif. Préparez le passage à une forme sociétaire si nécessaire.' },
    ],
  },
  {
    slug: 'wedding-planner',
    nom: 'Wedding Planner',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 20_000 },
    tarifMoyen: '5 000 à 30 000 DH/événement',
    description: 'Organisation de mariages et événements en tant qu\'auto-entrepreneur au Maroc.',
    autorisations: [],
    editorial: `Le wedding planning est en pleine expansion au Maroc, porté par la tradition des grands mariages marocains. En tant que wedding planner AE, vous accompagnez les couples de la conception à la coordination le jour J.

Les mariages marocains ont un budget moyen de 50 000 à 500 000 DH. Un wedding planner facture 8 à 15% du budget total ou un forfait de 5 000 à 30 000 DH.

Le statut AE est idéal car l'activité nécessite peu d'investissement matériel. Vos atouts sont votre réseau de prestataires, vos compétences en organisation et votre créativité.

Le marché est saisonnier (été et début d'automne). Diversifiez vers d'autres événements pendant les périodes creuses : fêtes d'entreprise, anniversaires, événements corporate.

Investissez dans Instagram et Pinterest, constituez un portfolio photographique et développez un réseau solide de prestataires de confiance.`,
    faqs: [
      { question: 'Combien facturer comme wedding planner AE ?', answer: '8-15% du budget du mariage ou forfait de 5 000-30 000 DH selon le niveau d\'implication.' },
      { question: 'Faut-il une formation ?', answer: 'Pas obligatoire, mais des formations en événementiel et décoration sont de vrais atouts.' },
      { question: 'Comment trouver ses premiers clients ?', answer: 'Organisez des mariages de proches pour votre portfolio, créez un Instagram pro, inscrivez-vous sur les plateformes de mariage.' },
      { question: 'Un wedding planner AE reverse-t-il les paiements prestataires ?', answer: 'Idéalement, les clients paient directement les prestataires. Si vous centralisez, attention au dépassement du plafond.' },
      { question: 'L\'activité est-elle saisonnière ?', answer: 'Oui, pics en été. Diversifiez vers d\'autres événements pendant les mois creux.' },
    ],
  },
  {
    slug: 'dieteticien',
    nom: 'Diététicien',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 5_000, max: 15_000 },
    tarifMoyen: '200 à 500 DH/consultation',
    description: 'Conseil en nutrition et diététique en tant qu\'auto-entrepreneur au Maroc.',
    autorisations: ['Diplôme en diététique recommandé'],
    editorial: `La diététique et la nutrition sont en croissance au Maroc, portées par la prise de conscience de l'importance de l'alimentation. En tant que diététicien AE, vous proposez des consultations nutritionnelles, des plans alimentaires et un accompagnement personnalisé.

Les tarifs varient de 200 à 500 DH par consultation. Un suivi mensuel se facture 800 à 2 000 DH. Avec une vingtaine de patients réguliers, le CA peut atteindre 8 000 à 15 000 DH/mois.

Le statut AE est bien adapté car les charges sont faibles. Vous avez besoin d'un espace de consultation, d'outils de mesure et de logiciels de plans alimentaires.

Un diplôme en diététique est fortement recommandé. Ne confondez pas diététicien et médecin nutritionniste (profession médicale nécessitant un doctorat en médecine).

Le marché est stimulé par les réseaux sociaux. Une présence active sur Instagram et YouTube (recettes, conseils) attire une clientèle large. Les consultations en ligne élargissent votre zone de chalandise.`,
    faqs: [
      { question: 'Faut-il un diplôme pour être diététicien AE ?', answer: 'Pas obligatoire pour l\'inscription AE, mais fortement recommandé. Ne confondez pas avec médecin nutritionniste.' },
      { question: 'Un diététicien AE peut-il consulter en ligne ?', answer: 'Oui, les consultations en ligne via Zoom ou WhatsApp sont compatibles avec le statut AE.' },
      { question: 'Combien gagne un diététicien AE ?', answer: 'Entre 5 000 et 15 000 DH/mois selon le nombre de patients et la spécialisation.' },
      { question: 'Comment se différencier ?', answer: 'Spécialisez-vous (nutrition sportive, diabète, végétal), créez du contenu éducatif, proposez des ateliers cuisine.' },
      { question: 'Quels outils utiliser ?', answer: 'Nutrilog ou Cronometer pour les plans, un impédancemètre, Calendly pour les RDV et WhatsApp Business.' },
    ],
  },
  {
    slug: 'professeur-particulier',
    nom: 'Professeur Particulier',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 3_000, max: 12_000 },
    tarifMoyen: '100 à 300 DH/heure',
    description: 'Cours particuliers et soutien scolaire à domicile ou en ligne en AE au Maroc.',
    autorisations: [],
    editorial: `Les cours particuliers représentent un marché considérable au Maroc. La demande est forte à tous les niveaux : primaire, collège, lycée, baccalauréat et concours d'entrée. Le statut AE permet de formaliser cette activité.

Les tarifs varient de 100 DH/heure pour du soutien primaire à 300 DH/heure pour des matières spécialisées au lycée. Les cours de langue sont également très demandés.

Le statut AE est idéal car l'activité ne nécessite presque aucun investissement matériel. Un professeur donnant 20 heures/semaine à 150 DH/heure génère 12 000 DH/mois.

L'enseignement en ligne a explosé ces dernières années. Les plateformes de visioconférence permettent de toucher des élèves partout au Maroc. Les cours collectifs (3-5 élèves) multiplient votre revenu horaire.

Inscrivez-vous sur Superprof et Apprentus, créez des groupes WhatsApp locaux et misez sur le bouche-à-oreille. Les périodes de rentrée et d'examens sont vos pics d'activité.`,
    faqs: [
      { question: 'Faut-il un diplôme d\'enseignement ?', answer: 'Non, mais une expertise solide dans la matière est indispensable. Un diplôme universitaire renforce votre crédibilité.' },
      { question: 'Combien gagne un professeur particulier AE ?', answer: 'CA de 3 000 à 12 000 DH/mois selon les matières, niveaux et tarifs.' },
      { question: 'Peut-on donner des cours en ligne en AE ?', answer: 'Oui, via Zoom, Google Meet ou des outils spécialisés. Cela élargit votre zone de chalandise.' },
      { question: 'Quelles matières sont les plus demandées ?', answer: 'Mathématiques, physique-chimie, français, anglais. Les cours de préparation aux concours sont les plus lucratifs.' },
      { question: 'Comment fixer ses tarifs ?', answer: 'Primaire : 100-150 DH/h. Collège : 150-200 DH/h. Lycée/supérieur : 200-300 DH/h. Sciences : tarifs plus élevés.' },
    ],
  },
  {
    slug: 'reparateur-informatique',
    nom: 'Réparateur Informatique',
    type: 'services',
    tauxIR: 0.02,
    plafondCA: 200_000,
    revenuMoyen: { min: 4_000, max: 12_000 },
    tarifMoyen: '150 à 500 DH/intervention',
    description: 'Dépannage et réparation d\'ordinateurs, téléphones et réseaux en AE au Maroc.',
    autorisations: [],
    editorial: `La réparation informatique est une activité de proximité très demandée au Maroc. Ordinateurs, smartphones, tablettes, imprimantes et réseaux : les besoins en dépannage sont constants pour les particuliers et les professionnels.

Les tarifs varient de 150 DH pour un dépannage logiciel à 500 DH ou plus pour une réparation matérielle complexe. La maintenance pour les TPE se facture 500 à 2 000 DH/mois.

Le statut AE est bien adapté car l'activité peut s'exercer à domicile ou en déplacement. L'investissement initial (outils, pièces de rechange) est de 5 000 à 15 000 DH.

Le marché se partage entre particuliers (dépannage ponctuel) et professionnels (maintenance régulière). Les contrats de maintenance offrent des revenus stables et récurrents.

Proposez des services à domicile, offrez un diagnostic gratuit et donnez des garanties sur vos réparations. Google My Business et le bouche-à-oreille sont vos meilleurs outils marketing.`,
    faqs: [
      { question: 'Faut-il un diplôme pour être réparateur informatique AE ?', answer: 'Pas légalement requis, mais des compétences techniques solides sont indispensables.' },
      { question: 'Combien gagne un réparateur informatique AE ?', answer: 'CA de 4 000 à 12 000 DH/mois. Les contrats de maintenance stabilisent le revenu.' },
      { question: 'Peut-on aussi vendre des pièces en AE ?', answer: 'Oui, réparation (services, IR 2%) et vente (commercial, IR 1%) peuvent être combinées.' },
      { question: 'Comment trouver des clients ?', answer: 'Google My Business, annuaires, groupes Facebook locaux et partenariats avec les commerçants du quartier.' },
      { question: 'Quels services proposer en plus de la réparation ?', answer: 'Installation logiciels, configuration réseaux, caméras de surveillance, récupération de données et formation.' },
    ],
  },
];

export function getActiviteBySlug(slug: string): Activite | undefined {
  return activites.find((a) => a.slug === slug);
}

export function getAllActiviteSlugs(): string[] {
  return activites.map((a) => a.slug);
}
