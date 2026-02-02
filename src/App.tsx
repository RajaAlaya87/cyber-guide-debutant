import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestionnaireProvider } from "@/context/QuestionnaireContext";
import Index from "./pages/Index";
import Questionnaire from "./pages/Questionnaire";
import Resultats from "./pages/Resultats";
import Sensibilisation from "./pages/Sensibilisation";
import Acteurs from "./pages/Acteurs";
import Prestataires from "./pages/Prestataires";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuestionnaireProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/resultats" element={<Resultats />} />
            <Route path="/sensibilisation" element={<Sensibilisation />} />
            <Route path="/acteurs" element={<Acteurs />} />
            <Route path="/prestataires" element={<Prestataires />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuestionnaireProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
