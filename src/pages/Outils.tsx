import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Lock, 
  Database, 
  Search, 
  Smartphone, 
  Mail, 
  Cloud, 
  Eye, 
  Key, 
  HardDrive,
  Network,
  FileCheck,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const toolCategories = [
  {
    category: "Protection des endpoints (EDR/XDR)",
    icon: Shield,
    description: "Solutions de détection et réponse sur les postes de travail et serveurs. Surveillance comportementale et blocage des menaces.",
    importance: "Essentiel pour détecter les malwares et comportements suspects sur vos machines.",
    tools: [
      { name: "Microsoft Defender for Endpoint", url: "https://www.microsoft.com/fr-fr/security/business/endpoint-security/microsoft-defender-endpoint", type: "Commercial" },
      { name: "CrowdStrike Falcon", url: "https://www.crowdstrike.com/", type: "Commercial" },
      { name: "SentinelOne", url: "https://www.sentinelone.com/", type: "Commercial" },
      { name: "Sophos Intercept X", url: "https://www.sophos.com/fr-fr/products/endpoint-antivirus", type: "Commercial" },
    ],
  },
  {
    category: "Gestion des identités (IAM/MFA)",
    icon: Key,
    description: "Authentification multi-facteurs et gestion centralisée des accès utilisateurs.",
    importance: "La première ligne de défense : protéger les comptes contre le vol d'identifiants.",
    tools: [
      { name: "Microsoft Entra ID", url: "https://www.microsoft.com/fr-fr/security/business/identity-access/microsoft-entra-id", type: "Commercial" },
      { name: "Okta", url: "https://www.okta.com/", type: "Commercial" },
      { name: "Duo Security", url: "https://duo.com/", type: "Commercial" },
      { name: "Google Authenticator", url: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2", type: "Gratuit" },
    ],
  },
  {
    category: "Sauvegarde et récupération",
    icon: Database,
    description: "Solutions de sauvegarde automatisée et restauration rapide en cas d'incident.",
    importance: "Indispensable pour survivre à un ransomware : la règle 3-2-1.",
    tools: [
      { name: "Veeam", url: "https://www.veeam.com/fr", type: "Commercial" },
      { name: "Acronis Cyber Protect", url: "https://www.acronis.com/fr-fr/", type: "Commercial" },
      { name: "Rubrik", url: "https://www.rubrik.com/", type: "Commercial" },
      { name: "Synology Active Backup", url: "https://www.synology.com/fr-fr/dsm/feature/active-backup-suite", type: "Commercial" },
    ],
  },
  {
    category: "Scan de vulnérabilités",
    icon: Search,
    description: "Outils d'analyse automatique pour identifier les failles de sécurité dans vos systèmes.",
    importance: "Connaître ses faiblesses avant les attaquants.",
    tools: [
      { name: "Tenable Nessus", url: "https://www.tenable.com/products/nessus", type: "Commercial" },
      { name: "Qualys", url: "https://www.qualys.com/", type: "Commercial" },
      { name: "Rapid7 InsightVM", url: "https://www.rapid7.com/products/insightvm/", type: "Commercial" },
      { name: "OpenVAS", url: "https://www.openvas.org/", type: "Open Source" },
    ],
  },
  {
    category: "Gestion des appareils mobiles (MDM)",
    icon: Smartphone,
    description: "Contrôle et sécurisation des smartphones et tablettes professionnels.",
    importance: "Sécuriser le BYOD et les flottes mobiles de l'entreprise.",
    tools: [
      { name: "Microsoft Intune", url: "https://www.microsoft.com/fr-fr/security/business/endpoint-management/microsoft-intune", type: "Commercial" },
      { name: "Jamf", url: "https://www.jamf.com/", type: "Commercial" },
      { name: "VMware Workspace ONE", url: "https://www.vmware.com/products/workspace-one.html", type: "Commercial" },
      { name: "Hexnode", url: "https://www.hexnode.com/", type: "Commercial" },
    ],
  },
  {
    category: "Sécurité email",
    icon: Mail,
    description: "Protection contre le phishing, spam et malwares véhiculés par email.",
    importance: "90% des attaques commencent par un email malveillant.",
    tools: [
      { name: "Microsoft Defender for Office 365", url: "https://www.microsoft.com/fr-fr/security/business/siem-and-xdr/microsoft-defender-office-365", type: "Commercial" },
      { name: "Proofpoint", url: "https://www.proofpoint.com/fr", type: "Commercial" },
      { name: "Mimecast", url: "https://www.mimecast.com/", type: "Commercial" },
      { name: "Barracuda Email Security", url: "https://www.barracuda.com/products/email-protection", type: "Commercial" },
    ],
  },
  {
    category: "Sécurité cloud (CASB/CSPM)",
    icon: Cloud,
    description: "Visibilité et contrôle sur les applications cloud et configurations.",
    importance: "Garder le contrôle de vos données dans le cloud.",
    tools: [
      { name: "Microsoft Defender for Cloud", url: "https://azure.microsoft.com/fr-fr/products/defender-for-cloud", type: "Commercial" },
      { name: "Netskope", url: "https://www.netskope.com/", type: "Commercial" },
      { name: "Zscaler", url: "https://www.zscaler.fr/", type: "Commercial" },
      { name: "Palo Alto Prisma Cloud", url: "https://www.paloaltonetworks.com/prisma/cloud", type: "Commercial" },
    ],
  },
  {
    category: "Gestionnaire de mots de passe",
    icon: Lock,
    description: "Stockage sécurisé et partage contrôlé des mots de passe en équipe.",
    importance: "Fini les mots de passe sur post-it ou fichiers Excel.",
    tools: [
      { name: "Bitwarden", url: "https://bitwarden.com/", type: "Freemium" },
      { name: "1Password", url: "https://1password.com/fr", type: "Commercial" },
      { name: "Dashlane", url: "https://www.dashlane.com/fr", type: "Commercial" },
      { name: "KeePass", url: "https://keepass.info/", type: "Open Source" },
    ],
  },
  {
    category: "Pare-feu et protection réseau",
    icon: Network,
    description: "Filtrage du trafic réseau et protection périmétrique.",
    importance: "Contrôler ce qui entre et sort de votre réseau.",
    tools: [
      { name: "Fortinet FortiGate", url: "https://www.fortinet.com/fr/products/next-generation-firewall", type: "Commercial" },
      { name: "Palo Alto Networks", url: "https://www.paloaltonetworks.fr/", type: "Commercial" },
      { name: "Cisco Firepower", url: "https://www.cisco.com/c/fr_fr/products/security/firewalls/index.html", type: "Commercial" },
      { name: "pfSense", url: "https://www.pfsense.org/", type: "Open Source" },
    ],
  },
  {
    category: "SIEM et surveillance",
    icon: Eye,
    description: "Centralisation des logs et détection des incidents de sécurité.",
    importance: "Voir ce qui se passe réellement sur votre SI.",
    tools: [
      { name: "Microsoft Sentinel", url: "https://azure.microsoft.com/fr-fr/products/microsoft-sentinel", type: "Commercial" },
      { name: "Splunk", url: "https://www.splunk.com/fr_fr", type: "Commercial" },
      { name: "Elastic Security", url: "https://www.elastic.co/fr/security", type: "Freemium" },
      { name: "Wazuh", url: "https://wazuh.com/", type: "Open Source" },
    ],
  },
  {
    category: "Chiffrement des données",
    icon: HardDrive,
    description: "Protection des données au repos et en transit par chiffrement.",
    importance: "Rendre les données illisibles même en cas de vol.",
    tools: [
      { name: "BitLocker (Windows)", url: "https://learn.microsoft.com/fr-fr/windows/security/operating-system-security/data-protection/bitlocker/", type: "Inclus Windows" },
      { name: "VeraCrypt", url: "https://www.veracrypt.fr/", type: "Open Source" },
      { name: "FileVault (macOS)", url: "https://support.apple.com/fr-fr/guide/mac-help/mh11785/mac", type: "Inclus macOS" },
      { name: "Boxcryptor", url: "https://www.boxcryptor.com/fr/", type: "Commercial" },
    ],
  },
  {
    category: "Sensibilisation et formation",
    icon: FileCheck,
    description: "Plateformes de formation et simulation de phishing pour les employés.",
    importance: "L'humain reste le maillon le plus important à renforcer.",
    tools: [
      { name: "KnowBe4", url: "https://www.knowbe4.com/", type: "Commercial" },
      { name: "Cofense", url: "https://cofense.com/", type: "Commercial" },
      { name: "Riot (Cyber)", url: "https://tryriot.com/", type: "Commercial" },
      { name: "Gophish", url: "https://getgophish.com/", type: "Open Source" },
    ],
  },
];

const Outils = () => {
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Premiers pas en cybersécurité
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Outils de cybersécurité
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Découvrez les principales catégories d'outils pour sécuriser votre entreprise. 
              Cette liste n'est pas exhaustive mais couvre les besoins essentiels d'une PME.
            </p>
          </div>

          {/* Info Banner */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Search className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  Comment choisir ?
                </h3>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  <li>• <strong>Débutant :</strong> Commencez par MFA, gestionnaire de mots de passe et sauvegarde</li>
                  <li>• <strong>Intermédiaire :</strong> Ajoutez EDR, sécurité email et scan de vulnérabilités</li>
                  <li>• <strong>Avancé :</strong> SIEM, protection cloud et formation continue</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-6">
            {toolCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.category} className="overflow-hidden">
                  <CardHeader className="bg-secondary/30">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{category.category}</CardTitle>
                        <CardDescription className="text-base">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-sm text-foreground">
                        <strong className="text-primary">Pourquoi c'est important :</strong> {category.importance}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.tools.map((tool) => (
                        <a
                          key={tool.name}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              tool.type === "Open Source" 
                                ? "bg-success/10 text-success" 
                                : tool.type === "Gratuit" || tool.type === "Freemium"
                                ? "bg-accent/10 text-accent"
                                : tool.type.includes("Inclus")
                                ? "bg-secondary text-muted-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              {tool.type}
                            </span>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center">
            <div className="cyber-card inline-block">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Besoin d'aide pour choisir ?
              </h3>
              <p className="text-muted-foreground mb-4">
                Faites notre questionnaire pour obtenir des recommandations personnalisées.
              </p>
              <Button asChild>
                <a href="/questionnaire">Démarrer le questionnaire</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Outils;
