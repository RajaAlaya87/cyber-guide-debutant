import { createContext, useContext, useState, ReactNode } from 'react';
import { QuestionnaireAnswers, CyberProfile, generateProfile } from '@/lib/questionnaire-data';

interface QuestionnaireContextType {
  answers: QuestionnaireAnswers;
  setAnswer: (questionId: string, value: string | string[]) => void;
  profile: CyberProfile | null;
  generateResults: () => void;
  resetQuestionnaire: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export function QuestionnaireProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const [profile, setProfile] = useState<CyberProfile | null>(null);

  const setAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const generateResults = () => {
    const generatedProfile = generateProfile(answers);
    setProfile(generatedProfile);
  };

  const resetQuestionnaire = () => {
    setAnswers({});
    setProfile(null);
  };

  return (
    <QuestionnaireContext.Provider value={{ answers, setAnswer, profile, generateResults, resetQuestionnaire }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
}
