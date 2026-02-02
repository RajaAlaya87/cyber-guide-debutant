import { Link } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle, AlertTriangle, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const features = [
  {
    icon: CheckCircle,
    title: "Comprenez les bases",
    description: "Découvrez les fondamentaux de la cybersécurité adaptés à votre contexte d'entreprise.",
  },
  {
    icon: AlertTriangle,
    title: "Identifiez vos priorités",
    description: "Un questionnaire simple pour déterminer vos risques et vos premières actions.",
  },
  {
    icon: BookOpen,
    title: "Connaissez vos obligations",
    description: "RGPD, NIS2, HDS... Comprenez quelles réglementations vous concernent.",
  },
  {
    icon: Users,
    title: "Trouvez les bons contacts",
    description: "Acteurs officiels, prestataires qualifiés : sachez vers qui vous tourner.",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
              <Shield className="h-4 w-4" />
              <span>Plateforme d'orientation</span>
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Cybersécurité pour entreprises
            </h1>
            
            <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
              La cybersécurité peut sembler complexe quand on débute. 
              Cette plateforme vous guide pas à pas pour comprendre vos risques, 
              identifier vos priorités et savoir par où commencer.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="gap-2 font-semibold">
                <Link to="/questionnaire">
                  Démarrer mon orientation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/sensibilisation">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Comment cette plateforme peut vous aider ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Un guide simple et pédagogique pour accompagner les entreprises 
              dans leur démarche de sécurisation.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="cyber-card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="cyber-card mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Prêt à évaluer votre situation ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Répondez à quelques questions simples pour obtenir des recommandations 
              personnalisées adaptées à votre contexte.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link to="/questionnaire">
                Commencer le questionnaire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Cette plateforme s'appuie sur les recommandations des acteurs officiels
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
              <span className="font-medium">ANSSI</span>
              <span className="font-medium">CERT-FR</span>
              <span className="font-medium">CNIL</span>
              <span className="font-medium">Cybermalveillance.gouv.fr</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
