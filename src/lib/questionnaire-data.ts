export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multi';
  options: {
    value: string;
    label: string;
  }[];
}

export const questions: Question[] = [
  {
    id: 'secteur',
    title: 'Quel est votre secteur d\'activité ?',
    type: 'single',
    options: [
      { value: 'ecommerce', label: 'E-commerce / vente en ligne' },
      { value: 'industrie', label: 'Industrie / production (OT)' },
      { value: 'sante', label: 'Santé / médico-social' },
      { value: 'saas', label: 'SaaS / éditeur logiciel' },
      { value: 'services', label: 'Services / conseil' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'taille',
    title: 'Quelle est la taille de votre entreprise ?',
    type: 'single',
    options: [
      { value: 'micro', label: 'Moins de 10 employés' },
      { value: 'petite', label: '10 à 49 employés' },
      { value: 'moyenne', label: '50 à 249 employés' },
      { value: 'grande', label: '250 employés et plus' },
    ],
  },
  {
    id: 'actifs',
    title: 'Quels sont vos actifs critiques ?',
    description: 'Sélectionnez tous les éléments qui s\'appliquent',
    type: 'multi',
    options: [
      { value: 'web_paiement', label: 'Site web / paiement en ligne' },
      { value: 'donnees_clients', label: 'Données clients' },
      { value: 'production', label: 'Production industrielle' },
      { value: 'donnees_sante', label: 'Données de santé' },
      { value: 'cloud_code', label: 'Cloud / code source' },
      { value: 'emails_finances', label: 'Emails / finances' },
    ],
  },
  {
    id: 'donnees_perso',
    title: 'Traitez-vous des données personnelles ?',
    description: 'Noms, emails, adresses, données bancaires, etc.',
    type: 'single',
    options: [
      { value: 'oui', label: 'Oui' },
      { value: 'non', label: 'Non' },
    ],
  },
  {
    id: 'dependance_cloud',
    title: 'Quelle est votre dépendance au cloud ?',
    type: 'single',
    options: [
      { value: 'faible', label: 'Faible - Principalement on-premise' },
      { value: 'moyenne', label: 'Moyenne - Mix cloud et on-premise' },
      { value: 'forte', label: 'Forte - Tout ou presque dans le cloud' },
    ],
  },
  {
    id: 'environnement',
    title: 'Quel type d\'environnement gérez-vous ?',
    type: 'single',
    options: [
      { value: 'it', label: 'IT uniquement (bureautique, serveurs)' },
      { value: 'it_ot', label: 'IT + OT (systèmes industriels)' },
    ],
  },
  {
    id: 'impact',
    title: 'Quel serait l\'impact d\'un incident cyber ?',
    description: 'En termes de continuité d\'activité et de réputation',
    type: 'single',
    options: [
      { value: 'faible', label: 'Faible - Quelques heures d\'arrêt tolérables' },
      { value: 'moyen', label: 'Moyen - Perturbation significative' },
      { value: 'fort', label: 'Fort - Arrêt critique de l\'activité' },
      { value: 'critique', label: 'Critique - Mise en danger vital' },
    ],
  },
  {
    id: 'maturite',
    title: 'Quel est votre niveau de maturité cyber actuel ?',
    type: 'single',
    options: [
      { value: 'debutant', label: 'Débutant - Peu ou pas de mesures en place' },
      { value: 'intermediaire', label: 'Intermédiaire - Quelques mesures basiques' },
      { value: 'structure', label: 'Structuré - Politique de sécurité définie' },
    ],
  },
  {
    id: 'situation',
    title: 'Quelle est votre situation actuelle ?',
    type: 'single',
    options: [
      { value: 'normal', label: 'Pas d\'incident - Démarche proactive' },
      { value: 'suspicion', label: 'Suspicion - Comportement anormal détecté' },
      { value: 'incident', label: 'Incident en cours - Besoin d\'aide urgente' },
    ],
  },
];

export interface QuestionnaireAnswers {
  secteur?: string;
  taille?: string;
  actifs?: string[];
  donnees_perso?: string;
  dependance_cloud?: string;
  environnement?: string;
  impact?: string;
  maturite?: string;
  situation?: string;
}

export interface CyberProfile {
  summary: string;
  riskLevel: 'faible' | 'moyen' | 'eleve' | 'critique';
  priorities: string[];
  regulations: {
    name: string;
    description: string;
    concerned: string;
    actions: string[];
  }[];
  contacts: {
    urgence: { name: string; description: string; url: string }[];
    conformite: { name: string; description: string; url: string }[];
  };
  tools: {
    category: string;
    description: string;
    examples: string[];
  }[];
}

export function generateProfile(answers: QuestionnaireAnswers): CyberProfile {
  const secteurLabels: Record<string, string> = {
    ecommerce: 'e-commerce',
    industrie: 'industrielle',
    sante: 'santé',
    saas: 'SaaS/tech',
    services: 'services',
    autre: 'autre secteur',
  };

  const tailleLabels: Record<string, string> = {
    micro: 'TPE',
    petite: 'petite entreprise',
    moyenne: 'PME',
    grande: 'ETI/grande entreprise',
  };

  // Generate summary
  const secteur = secteurLabels[answers.secteur || 'autre'] || 'autre secteur';
  const taille = tailleLabels[answers.taille || 'micro'] || 'entreprise';
  const hasPersonalData = answers.donnees_perso === 'oui';
  const cloudLevel = answers.dependance_cloud === 'forte' ? 'forte dépendance cloud' : 
                     answers.dependance_cloud === 'moyenne' ? 'dépendance cloud modérée' : 'infrastructure locale';
  
  const summary = `${taille} du secteur ${secteur} ${hasPersonalData ? 'traitant des données personnelles' : ''} avec ${cloudLevel}`;

  // Calculate risk level
  let riskScore = 0;
  if (answers.impact === 'critique') riskScore += 3;
  else if (answers.impact === 'fort') riskScore += 2;
  else if (answers.impact === 'moyen') riskScore += 1;
  
  if (answers.maturite === 'debutant') riskScore += 2;
  else if (answers.maturite === 'intermediaire') riskScore += 1;
  
  if (answers.situation === 'incident') riskScore += 3;
  else if (answers.situation === 'suspicion') riskScore += 1;

  if (answers.actifs?.includes('donnees_sante')) riskScore += 2;
  if (answers.actifs?.includes('production')) riskScore += 1;

  const riskLevel: CyberProfile['riskLevel'] = 
    riskScore >= 6 ? 'critique' : 
    riskScore >= 4 ? 'eleve' : 
    riskScore >= 2 ? 'moyen' : 'faible';

  // Generate priorities based on maturity
  const priorities = [
    'Activer l\'authentification multi-facteur (MFA) sur tous les comptes critiques',
    'Mettre à jour tous les systèmes et logiciels (patches de sécurité)',
    'Mettre en place des sauvegardes automatiques et les tester régulièrement',
    'Former les employés à reconnaître le phishing',
    'Limiter les droits administrateurs au strict nécessaire',
  ];

  if (answers.maturite === 'debutant') {
    priorities.unshift('Réaliser un inventaire de vos actifs informatiques');
  }
  if (answers.situation === 'incident') {
    priorities.unshift('⚠️ URGENT: Contacter immédiatement le CERT-FR ou Cybermalveillance.gouv.fr');
  }

  // Generate applicable regulations
  const regulations: CyberProfile['regulations'] = [];
  
  if (hasPersonalData) {
    regulations.push({
      name: 'RGPD',
      description: 'Règlement européen sur la protection des données personnelles',
      concerned: 'Toute organisation traitant des données personnelles de résidents européens',
      actions: [
        'Tenir un registre des traitements de données',
        'Désigner un DPO si nécessaire',
        'Mettre en place des procédures de notification de violation',
      ],
    });
  }

  if (['moyenne', 'grande'].includes(answers.taille || '') || 
      ['sante', 'industrie', 'saas'].includes(answers.secteur || '')) {
    regulations.push({
      name: 'NIS2',
      description: 'Directive européenne sur la sécurité des réseaux et systèmes d\'information',
      concerned: 'Entités essentielles et importantes dans les secteurs critiques (santé, énergie, numérique, etc.)',
      actions: [
        'Mettre en place une gestion des risques cyber',
        'Signaler les incidents significatifs sous 24h',
        'Assurer la sécurité de la chaîne d\'approvisionnement',
      ],
    });
  }

  if (answers.secteur === 'sante' || answers.actifs?.includes('donnees_sante')) {
    regulations.push({
      name: 'HDS',
      description: 'Certification Hébergeur de Données de Santé',
      concerned: 'Tout hébergeur de données de santé à caractère personnel',
      actions: [
        'Vérifier que vos hébergeurs sont certifiés HDS',
        'Chiffrer les données de santé au repos et en transit',
        'Mettre en place une traçabilité des accès',
      ],
    });
  }

  if (answers.secteur === 'saas' && answers.actifs?.includes('web_paiement')) {
    regulations.push({
      name: 'DORA',
      description: 'Digital Operational Resilience Act - Résilience opérationnelle du secteur financier',
      concerned: 'Entités financières et leurs prestataires TIC critiques',
      actions: [
        'Établir un cadre de gestion des risques TIC',
        'Tester régulièrement la résilience opérationnelle',
        'Gérer les risques liés aux tiers',
      ],
    });
  }

  // Contacts
  const contacts: CyberProfile['contacts'] = {
    urgence: [
      {
        name: 'CERT-FR',
        description: 'Centre gouvernemental de réponse aux incidents cyber',
        url: 'https://www.cert.ssi.gouv.fr/',
      },
      {
        name: 'Cybermalveillance.gouv.fr',
        description: 'Assistance aux victimes de cybermalveillance',
        url: 'https://www.cybermalveillance.gouv.fr/',
      },
      {
        name: 'Prestataire réponse à incident',
        description: 'Consultez la liste des prestataires qualifiés PRIS',
        url: 'https://www.ssi.gouv.fr/qualifications/',
      },
    ],
    conformite: [
      {
        name: 'CNIL',
        description: 'Commission Nationale de l\'Informatique et des Libertés',
        url: 'https://www.cnil.fr/',
      },
      {
        name: 'Cabinet conseil cyber',
        description: 'Pour un accompagnement personnalisé',
        url: '#prestataires',
      },
    ],
  };

  // Tool categories
  const tools: CyberProfile['tools'] = [
    {
      category: 'EDR/XDR',
      description: 'Protection et détection sur les postes de travail',
      examples: ['Microsoft Defender for Endpoint', 'CrowdStrike Falcon', 'SentinelOne'],
    },
    {
      category: 'IAM/MFA',
      description: 'Gestion des identités et authentification forte',
      examples: ['Microsoft Entra ID', 'Okta', 'Ping Identity'],
    },
    {
      category: 'Sauvegarde',
      description: 'Solutions de backup et restauration',
      examples: ['Veeam', 'Acronis', 'Rubrik'],
    },
    {
      category: 'Scan vulnérabilités',
      description: 'Détection des failles de sécurité',
      examples: ['Tenable Nessus', 'Qualys', 'Rapid7 InsightVM'],
    },
  ];

  if (answers.dependance_cloud === 'forte' || answers.dependance_cloud === 'moyenne') {
    tools.push({
      category: 'CASB/CSPM',
      description: 'Sécurité des environnements cloud',
      examples: ['Microsoft Defender for Cloud', 'Prisma Cloud', 'Wiz'],
    });
  }

  if (answers.environnement === 'it_ot') {
    tools.push({
      category: 'Sécurité OT',
      description: 'Protection des systèmes industriels',
      examples: ['Claroty', 'Nozomi Networks', 'Fortinet OT'],
    });
  }

  return {
    summary,
    riskLevel,
    priorities: priorities.slice(0, 6),
    regulations,
    contacts,
    tools,
  };
}
