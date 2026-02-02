import { CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

interface Prestataire {
  name: string;
  description: string;
  services: string[];
}

const prestataires: Prestataire[] = [
  {
    name: "Orange Cyberdefense",
    description: "Filiale cybersécurité d'Orange, leader européen des services de sécurité managés.",
    services: ["SOC/MSSP", "Audit", "Réponse à incident", "Sensibilisation"],
  },
  {
    name: "Capgemini",
    description: "ESN mondiale proposant une large gamme de services de conseil et d'intégration en cybersécurité.",
    services: ["Audit", "Conseil", "SOC/MSSP", "Pentest"],
  },
  {
    name: "Sopra Steria",
    description: "Groupe européen de services numériques avec une forte expertise en cybersécurité sectorielle.",
    services: ["SOC/MSSP", "Audit", "Conseil", "Réponse à incident"],
  },
  {
    name: "Wavestone",
    description: "Cabinet de conseil spécialisé, reconnu pour son expertise en transformation et cybersécurité.",
    services: ["Conseil", "Audit", "Sensibilisation"],
  },
  {
    name: "Thales",
    description: "Groupe de défense et technologie, expertise en solutions de sécurité et systèmes critiques.",
    services: ["SOC/MSSP", "Audit", "Conseil", "Réponse à incident"],
  },
  {
    name: "Eviden (Atos)",
    description: "Division cybersécurité d'Atos, spécialisée dans les solutions de sécurité avancées.",
    services: ["SOC/MSSP", "Pentest", "Audit", "Conseil"],
  },
  {
    name: "Accenture",
    description: "Cabinet de conseil mondial avec une practice cybersécurité couvrant tous les secteurs.",
    services: ["Conseil", "SOC/MSSP", "Audit", "Sensibilisation"],
  },
];

const serviceCategories = [
  { key: "SOC/MSSP", label: "SOC/MSSP", description: "Centre opérationnel de sécurité et services managés" },
  { key: "Audit", label: "Audit", description: "Évaluation de la posture de sécurité" },
  { key: "Pentest", label: "Pentest", description: "Tests d'intrusion" },
  { key: "Réponse à incident", label: "Réponse à incident", description: "Intervention en cas d'attaque" },
  { key: "Sensibilisation", label: "Sensibilisation", description: "Formation des collaborateurs" },
  { key: "Conseil", label: "Conseil", description: "Accompagnement stratégique" },
];

const Prestataires = () => {
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Prestataires cybersécurité
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Principaux acteurs du marché français pouvant vous accompagner dans votre démarche de sécurisation.
            </p>
          </div>

          {/* Legend */}
          <div className="cyber-card mb-8">
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Types de services
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {serviceCategories.map((cat) => (
                <div key={cat.key} className="flex items-start gap-2">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium whitespace-nowrap">
                    {cat.label}
                  </span>
                  <span className="text-sm text-muted-foreground">{cat.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Providers Table */}
          <div className="cyber-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-display font-semibold text-foreground">
                      Prestataire
                    </th>
                    {serviceCategories.map((cat) => (
                      <th 
                        key={cat.key} 
                        className="text-center p-4 font-display font-semibold text-foreground whitespace-nowrap"
                      >
                        <span className="hidden md:inline">{cat.label}</span>
                        <span className="md:hidden text-xs">{cat.label.slice(0, 3)}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prestataires.map((presta, idx) => (
                    <tr 
                      key={presta.name}
                      className={cn(
                        "border-b border-border last:border-0",
                        idx % 2 === 0 ? "bg-secondary/20" : ""
                      )}
                    >
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{presta.name}</div>
                        <div className="text-sm text-muted-foreground hidden sm:block">
                          {presta.description}
                        </div>
                      </td>
                      {serviceCategories.map((cat) => (
                        <td key={cat.key} className="text-center p-4">
                          {presta.services.includes(cat.key) ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground/30">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Cette liste n'est pas exhaustive. Consultez également les prestataires qualifiés par l'ANSSI 
              sur <a href="https://www.ssi.gouv.fr/qualifications/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ssi.gouv.fr/qualifications</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Prestataires;
