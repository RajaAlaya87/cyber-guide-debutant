import { Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-display font-semibold text-foreground">CyberGuide</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Plateforme d'orientation cybersécurité pour accompagner les entreprises 
              dans leur démarche de sécurisation. Guide pédagogique pour non-experts.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/questionnaire" className="text-muted-foreground hover:text-foreground transition-colors">
                  Questionnaire
                </Link>
              </li>
              <li>
                <Link to="/sensibilisation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sensibilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Ressources officielles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.ssi.gouv.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  ANSSI <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cybermalveillance.gouv.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Cybermalveillance <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cnil.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  CNIL <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            Cette plateforme est un guide d'orientation. Pour un accompagnement personnalisé, 
            consultez un professionnel de la cybersécurité.
          </p>
        </div>
      </div>
    </footer>
  );
};
