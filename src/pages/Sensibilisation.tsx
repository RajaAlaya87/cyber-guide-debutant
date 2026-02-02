import { useState } from "react";
import { User, Monitor, Briefcase, CheckCircle, XCircle, AlertTriangle, Mail, Lock, Shield, Eye, Database, FileWarning, DollarSign } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Phishing Quiz Data
const phishingQuiz = [
  {
    id: 1,
    email: {
      from: "support@amaz0n-secure.com",
      subject: "⚠️ Action requise : Votre compte sera suspendu",
      preview: "Cher client, nous avons détecté une activité suspecte sur votre compte. Cliquez ici pour vérifier...",
    },
    isPhishing: true,
    explanation: "L'adresse email utilise 'amaz0n' (avec un zéro) au lieu de 'amazon'. Les vrais emails Amazon viennent de @amazon.fr ou @amazon.com.",
  },
  {
    id: 2,
    email: {
      from: "noreply@impots.gouv.fr",
      subject: "Votre avis d'imposition 2024 est disponible",
      preview: "Votre avis d'imposition 2024 est désormais disponible dans votre espace particulier sur impots.gouv.fr",
    },
    isPhishing: false,
    explanation: "L'adresse email est légitime (@impots.gouv.fr) et le message invite à se connecter directement sur le site officiel, sans lien suspect.",
  },
  {
    id: 3,
    email: {
      from: "direction@entreprise-urgent.com",
      subject: "URGENT - Virement à effectuer immédiatement",
      preview: "Bonjour, je suis en réunion. Merci d'effectuer ce virement de 15 000€ en urgence. Je vous expliquerai plus tard.",
    },
    isPhishing: true,
    explanation: "C'est une arnaque au président classique. Un dirigeant ne demande jamais de virement urgent par email sans validation préalable.",
  },
];

const Sensibilisation = () => {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean | null>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleQuizAnswer = (questionId: number, answer: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: answer }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sensibilisation à la cybersécurité
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Contenus pédagogiques adaptés à votre rôle dans l'entreprise.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="employe" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="employe" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Employé</span>
              </TabsTrigger>
              <TabsTrigger value="it" className="gap-2">
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Équipe IT</span>
              </TabsTrigger>
              <TabsTrigger value="dirigeant" className="gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">Dirigeant</span>
              </TabsTrigger>
            </TabsList>

            {/* Employee Content */}
            <TabsContent value="employe" className="space-y-8">
              {/* Key Concepts */}
              <div className="cyber-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Les réflexes essentiels
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <Mail className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Phishing</h3>
                    <p className="text-sm text-muted-foreground">
                      Méfiez-vous des emails demandant des informations personnelles ou des actions urgentes. 
                      Vérifiez toujours l'adresse de l'expéditeur.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <Lock className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Mots de passe</h3>
                    <p className="text-sm text-muted-foreground">
                      Utilisez des mots de passe uniques et complexes. Un gestionnaire de mots de passe 
                      peut vous aider à les gérer.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <Shield className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">MFA (Double authentification)</h3>
                    <p className="text-sm text-muted-foreground">
                      Activez la double authentification partout où c'est possible. C'est votre meilleure 
                      protection contre le vol de compte.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                    <Eye className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Verrouillage écran</h3>
                    <p className="text-sm text-muted-foreground">
                      Verrouillez toujours votre poste quand vous vous absentez. Windows + L ou 
                      Ctrl + Cmd + Q sur Mac.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phishing Quiz */}
              <div className="cyber-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-2">
                  🎯 Mini-quiz : Repérez le phishing
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ces emails sont-ils légitimes ou des tentatives de phishing ?
                </p>
                <div className="space-y-6">
                  {phishingQuiz.map((question) => (
                    <div key={question.id} className="border border-border rounded-lg overflow-hidden">
                      <div className="p-4 bg-secondary/30">
                        <div className="text-xs text-muted-foreground mb-1">
                          De: <span className="font-mono">{question.email.from}</span>
                        </div>
                        <div className="font-semibold text-foreground mb-2">
                          {question.email.subject}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {question.email.preview}
                        </p>
                      </div>
                      <div className="p-4 border-t border-border">
                        {!showResults[question.id] ? (
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuizAnswer(question.id, false)}
                              className="gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-success" />
                              Légitime
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuizAnswer(question.id, true)}
                              className="gap-2"
                            >
                              <XCircle className="h-4 w-4 text-destructive" />
                              Phishing
                            </Button>
                          </div>
                        ) : (
                          <div className={cn(
                            "p-3 rounded-lg",
                            quizAnswers[question.id] === question.isPhishing
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          )}>
                            <div className="flex items-center gap-2 font-semibold mb-1">
                              {quizAnswers[question.id] === question.isPhishing ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  Bonne réponse !
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4" />
                                  Mauvaise réponse
                                </>
                              )}
                            </div>
                            <p className="text-sm opacity-90">
                              {question.isPhishing ? "C'est bien un phishing. " : "C'est un email légitime. "}
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suspicious Email Checklist */}
              <div className="cyber-card border-l-4 border-l-warning">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  📋 Fiche réflexe : Email suspect
                </h2>
                <ol className="space-y-3 text-foreground">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/10 text-warning text-sm font-bold flex items-center justify-center">1</span>
                    <span>Ne cliquez sur aucun lien et n'ouvrez aucune pièce jointe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/10 text-warning text-sm font-bold flex items-center justify-center">2</span>
                    <span>Vérifiez l'adresse email de l'expéditeur (pas juste le nom affiché)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/10 text-warning text-sm font-bold flex items-center justify-center">3</span>
                    <span>En cas de doute, contactez l'expéditeur par un autre canal (téléphone)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/10 text-warning text-sm font-bold flex items-center justify-center">4</span>
                    <span>Signalez l'email à votre équipe informatique</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-warning/10 text-warning text-sm font-bold flex items-center justify-center">5</span>
                    <span>Supprimez l'email après signalement</span>
                  </li>
                </ol>
              </div>
            </TabsContent>

            {/* IT Team Content */}
            <TabsContent value="it" className="space-y-8">
              {/* Key Concepts */}
              <div className="cyber-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Concepts clés pour l'équipe IT
                </h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-l-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">Surface d'attaque</h3>
                    <p className="text-sm text-muted-foreground">
                      L'ensemble des points d'entrée potentiels pour un attaquant : ports ouverts, 
                      applications exposées, accès distants, API, etc. Réduisez cette surface au minimum nécessaire.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">Vulnérabilités</h3>
                    <p className="text-sm text-muted-foreground">
                      Failles de sécurité dans les logiciels ou configurations. Mettez en place un processus 
                      de patch management et surveillez les CVE critiques.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">Sauvegarde 3-2-1</h3>
                    <p className="text-sm text-muted-foreground">
                      <strong>3</strong> copies de vos données, sur <strong>2</strong> types de supports différents, 
                      dont <strong>1</strong> hors site (ou hors ligne). Testez régulièrement vos restaurations.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-primary pl-4">
                    <h3 className="font-semibold text-foreground mb-2">Journalisation (Logging)</h3>
                    <p className="text-sm text-muted-foreground">
                      Conservez les logs de connexion, d'accès et d'événements système. 
                      Sans logs, impossible d'investiguer un incident.
                    </p>
                  </div>
                </div>
              </div>

              {/* Essential Checklist */}
              <div className="cyber-card border-l-4 border-l-primary">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  ✅ Checklist : Bases cyber essentielles
                </h2>
                <div className="space-y-3">
                  {[
                    "Inventaire à jour de tous les actifs (serveurs, postes, applications)",
                    "MFA activé sur tous les comptes admin et accès critiques",
                    "Politique de mots de passe robuste appliquée",
                    "Mises à jour automatiques ou processus de patch < 30 jours",
                    "Sauvegardes 3-2-1 avec tests de restauration trimestriels",
                    "Segmentation réseau (séparer IT/OT, prod/dev, etc.)",
                    "Antivirus/EDR déployé sur tous les postes",
                    "Logs centralisés et conservés minimum 6 mois",
                    "Procédure de gestion des départs (révocation des accès)",
                    "Plan de réponse à incident documenté et testé",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2">
                      <Database className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Executive Content */}
            <TabsContent value="dirigeant" className="space-y-8">
              {/* Key Concepts */}
              <div className="cyber-card">
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  La cybersécurité : un enjeu business
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <AlertTriangle className="h-6 w-6 text-destructive mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Risque business</h3>
                    <p className="text-sm text-muted-foreground">
                      Une cyberattaque peut paralyser votre activité pendant des jours, 
                      voire des semaines. 60% des PME victimes font faillite dans les 6 mois.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <DollarSign className="h-6 w-6 text-warning mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Impact financier</h3>
                    <p className="text-sm text-muted-foreground">
                      Coût moyen d'une cyberattaque pour une PME : 50 000€ à 500 000€. 
                      Sans compter la perte de confiance des clients.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <FileWarning className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Responsabilité juridique</h3>
                    <p className="text-sm text-muted-foreground">
                      Le RGPD prévoit des amendes jusqu'à 4% du CA. Les dirigeants peuvent 
                      être tenus personnellement responsables.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <Shield className="h-6 w-6 text-accent mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Gouvernance</h3>
                    <p className="text-sm text-muted-foreground">
                      La cybersécurité doit être pilotée au niveau de la direction, 
                      avec un budget dédié et des objectifs mesurables.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ransomware Scenario */}
              <div className="cyber-card border-l-4 border-l-destructive">
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  📖 Scénario : Lundi matin, 8h00
                </h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p>
                    <em>Vous arrivez au bureau. Vos équipes vous appellent en panique : plus aucun ordinateur 
                    ne fonctionne. Tous les fichiers sont chiffrés. Un message s'affiche : "Vos données 
                    ont été chiffrées. Payez 100 000€ en Bitcoin sous 72h ou tout sera détruit."</em>
                  </p>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                    <h4 className="font-semibold text-destructive mb-2">Questions à vous poser maintenant :</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Avez-vous des sauvegardes récentes et testées ?</li>
                      <li>• Savez-vous qui appeler en cas d'urgence cyber ?</li>
                      <li>• Combien de temps votre entreprise peut-elle survivre sans IT ?</li>
                      <li>• Avez-vous une assurance cyber ?</li>
                      <li>• Vos contrats clients prévoient-ils ce type de situation ?</li>
                    </ul>
                  </div>
                  <p className="text-foreground font-medium">
                    👉 La bonne nouvelle : 90% des rançongiciels sont évitables avec des mesures de base. 
                    C'est maintenant qu'il faut agir.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Sensibilisation;
