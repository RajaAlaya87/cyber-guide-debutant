import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Progress } from "@/components/ui/progress";
import { questions } from "@/lib/questionnaire-data";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import { cn } from "@/lib/utils";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { answers, setAnswer, generateResults } = useQuestionnaire();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastQuestion = currentStep === questions.length - 1;

  const currentAnswer = answers[currentQuestion.id as keyof typeof answers];

  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === 'multi') {
      const currentValues = (currentAnswer as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setAnswer(currentQuestion.id, newValues);
    } else {
      setAnswer(currentQuestion.id, value);
    }
  };

  const isOptionSelected = (value: string) => {
    if (currentQuestion.type === 'multi') {
      return ((currentAnswer as string[]) || []).includes(value);
    }
    return currentAnswer === value;
  };

  const canProceed = currentQuestion.type === 'multi' 
    ? ((currentAnswer as string[]) || []).length > 0
    : !!currentAnswer;

  const handleNext = () => {
    if (isLastQuestion) {
      generateResults();
      navigate("/resultats");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-12rem)] py-8 md:py-12">
        <div className="container max-w-3xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentStep + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <div className="cyber-card animate-fade-in" key={currentQuestion.id}>
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {currentQuestion.title}
              </h2>
              {currentQuestion.description && (
                <p className="text-muted-foreground">
                  {currentQuestion.description}
                </p>
              )}
              {currentQuestion.type === 'multi' && (
                <p className="text-sm text-accent mt-2">
                  Plusieurs réponses possibles
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all",
                    isOptionSelected(option.value)
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50 text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                    isOptionSelected(option.value)
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}>
                    {isOptionSelected(option.value) && (
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="gap-2"
              >
                {isLastQuestion ? "Voir mes résultats" : "Suivant"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Questionnaire;
