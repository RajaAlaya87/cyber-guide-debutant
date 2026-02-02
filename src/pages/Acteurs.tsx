import { ExternalLink, Shield, AlertTriangle, Scale, Building, Server } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const acteurs = [
  {
    name: "ANSSI",
    fullName: "Agence nationale de la sécurité des systèmes d'information",
    description: "Autorité nationale en matière de cybersécurité. Définit la doctrine, accompagne les acteurs stratégiques et intervient en cas de crise majeure.",
    url: "https://www.ssi.gouv.fr/",
    icon: Shield,
  },
  {
    name: "CERT-FR",
    fullName: "Centre gouvernemental de veille, d'alerte et de réponse aux attaques informatiques",
    description: "Service de l'ANSSI dédié à la réponse aux incidents. Publie des alertes et des bulletins de sécurité. Point de contact en cas d'attaque.",
    url: "https://www.cert.ssi.gouv.fr/",
    icon: AlertTriangle,
  },
  {
    name: "Cybermalveillance.gouv.fr",
    fullName: "Dispositif national d'assistance aux victimes de cybermalveillance",
    description: "Plateforme d'assistance pour les particuliers, entreprises et collectivités victimes de cyberattaques. Propose diagnostic, conseils et mise en relation avec des prestataires.",
    url: "https://www.cybermalveillance.gouv.fr/",
    icon: Building,
  },
  {
    name: "CNIL",
    fullName: "Commission Nationale de l'Informatique et des Libertés",
    description: "Autorité de protection des données personnelles. Veille au respect du RGPD, reçoit les notifications de violation de données et peut sanctionner.",
    url: "https://www.cnil.fr/",
    icon: Scale,
  },
];

const Acteurs = () => {
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Acteurs officiels de la cybersécurité
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Les institutions françaises qui peuvent vous accompagner dans votre démarche de sécurisation.
            </p>
          </div>

          {/* Actors List */}
          <div className="space-y-6">
            {acteurs.map((acteur) => (
              <a
                key={acteur.name}
                href={acteur.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-card-hover block group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <acteur.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-display text-xl font-bold text-foreground">
                        {acteur.name}
                      </h2>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {acteur.fullName}
                    </p>
                    <p className="text-foreground">
                      {acteur.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 cyber-card bg-secondary/50">
            <h3 className="font-display text-lg font-bold text-foreground mb-3">
              Quand contacter qui ?
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-destructive">🚨 En cas d'incident :</span>
                <span className="text-muted-foreground">CERT-FR ou Cybermalveillance.gouv.fr</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-warning">📋 Pour la conformité RGPD :</span>
                <span className="text-muted-foreground">CNIL</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-semibold text-primary">📚 Pour se former et s'informer :</span>
                <span className="text-muted-foreground">ANSSI (guides, recommandations)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Acteurs;
