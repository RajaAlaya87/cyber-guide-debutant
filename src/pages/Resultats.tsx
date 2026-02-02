import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, ExternalLink, ArrowRight, RotateCcw, Shield, Phone, FileText, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { cn } from "@/lib/utils";

const riskColors = {
  faible: "bg-success/10 text-success border-success/20",
  moyen: "bg-accent/10 text-accent border-accent/20",
  eleve: "bg-warning/10 text-warning border-warning/20",
  critique: "bg-destructive/10 text-destructive border-destructive/20",
};

const riskLabels = {
  faible: "Risque faible",
  moyen: "Risque moyen",
  eleve: "Risque élevé",
  critique: "Risque critique",
};

const Resultats = () => {
  const navigate = useNavigate();
  const { profile, resetQuestionnaire } = useQuestionnaire();

  useEffect(() => {
    if (!profile) {
      navigate("/questionnaire");
    }
  }, [profile, navigate]);

  if (!profile) {
    return null;
  }

  const handleRestart = () => {
    resetQuestionnaire();
    navigate("/questionnaire");
  };

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Votre trajectoire cybersécurité
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Basée sur vos réponses, voici vos recommandations personnalisées.
            </p>
          </div>

          {/* Profile Summary */}
          <div className="cyber-card mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-2">
                  Votre profil
                </h2>
                <p className="text-muted-foreground capitalize">
                  {profile.summary}
                </p>
              </div>
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium",
                riskColors[profile.riskLevel]
              )}>
                <AlertTriangle className="h-4 w-4" />
                {riskLabels[profile.riskLevel]}
              </div>
            </div>
          </div>

          {/* Urgent Alert if needed */}
          {profile.riskLevel === 'critique' && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-destructive mb-2">
                    ⚠️ Situation nécessitant une attention immédiate
                  </h3>
                  <p className="text-destructive/80 mb-4">
                    Contactez immédiatement les services d'urgence cyber pour obtenir de l'aide.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.cert.ssi.gouv.fr/" target="_blank" rel="noopener noreferrer">
                      <Button variant="destructive" size="sm" className="gap-2">
                        CERT-FR <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                    <a href="https://www.cybermalveillance.gouv.fr/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Cybermalveillance <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Priorities */}
          <div className="cyber-card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Top 5 priorités – 30 jours
                </h2>
                <p className="text-sm text-muted-foreground">Actions à mettre en place rapidement</p>
              </div>
            </div>
            <div className="space-y-3">
              {profile.priorities.slice(0, 5).map((priority, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regulations */}
          {profile.regulations.length > 0 && (
            <div className="cyber-card mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Réglementations probables
                  </h2>
                  <p className="text-sm text-muted-foreground">Basées sur votre profil d'entreprise</p>
                </div>
              </div>
              <div className="space-y-6">
                {profile.regulations.map((reg) => (
                  <div key={reg.name} className="border border-border rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {reg.name}
                      </span>
                    </div>
                    <p className="text-foreground font-medium mb-2">{reg.description}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      <strong>Qui est concerné :</strong> {reg.concerned}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Premières actions :</p>
                      <ul className="space-y-1">
                        {reg.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Emergency Contacts */}
            <div className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Contacts d'urgence
                </h3>
              </div>
              <div className="space-y-3">
                {profile.contacts.urgence.map((contact) => (
                  <a 
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{contact.name}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Compliance Contacts */}
            <div className="cyber-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Conformité
                </h3>
              </div>
              <div className="space-y-3">
                {profile.contacts.conformite.map((contact) => (
                  <a 
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{contact.name}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="cyber-card mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Catégories d'outils recommandés
                </h2>
                <p className="text-sm text-muted-foreground">Solutions à considérer selon vos besoins</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.tools.map((tool) => (
                <div key={tool.category} className="p-4 rounded-lg border border-border bg-secondary/30">
                  <h4 className="font-semibold text-foreground mb-1">{tool.category}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Ex: {tool.examples.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Refaire le questionnaire
            </Button>
            <Button asChild className="gap-2">
              <Link to="/sensibilisation">
                Continuer vers la sensibilisation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resultats;
