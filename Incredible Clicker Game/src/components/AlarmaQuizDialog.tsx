import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Brain, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  powerUpReward: number;
}

interface AlarmaQuizDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (powerUpGained: number) => void;
}

const QUESTIONS: Question[] = [
  {
    question: "Quelle est la complexité temporelle d'une recherche binaire ?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    powerUpReward: 50
  },
  {
    question: "Quel protocole utilise le port 443 par défaut ?",
    options: ["HTTP", "FTP", "HTTPS", "SSH"],
    correctAnswer: 2,
    powerUpReward: 50
  },
  {
    question: "Que signifie SQL ?",
    options: ["Structured Query Language", "Simple Query Language", "System Quality Language", "Standard Queue List"],
    correctAnswer: 0,
    powerUpReward: 50
  },
  {
    question: "Quelle méthode HTTP est idempotente ?",
    options: ["POST", "PUT", "PATCH", "Toutes"],
    correctAnswer: 1,
    powerUpReward: 50
  },
  {
    question: "En Python, que retourne type([]) ?",
    options: ["<class 'array'>", "<class 'list'>", "<class 'tuple'>", "<class 'dict'>"],
    correctAnswer: 1,
    powerUpReward: 50
  },
  {
    question: "Qu'est-ce qu'un deadlock ?",
    options: ["Une porte verrouillée", "Un blocage mutuel entre processus", "Une erreur de syntaxe", "Un virus informatique"],
    correctAnswer: 1,
    powerUpReward: 50
  },
  {
    question: "Quel est le principe SOLID qui signifie 'Open/Closed' ?",
    options: ["Ouvert à l'extension, fermé à la modification", "Ouvert au public, fermé aux privés", "Ouvert le matin, fermé le soir", "Ouvert aux classes, fermé aux fonctions"],
    correctAnswer: 0,
    powerUpReward: 50
  }
];

export function AlarmaQuizDialog({ open, onOpenChange, onComplete }: AlarmaQuizDialogProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [totalPowerUp, setTotalPowerUp] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState<Question[]>([]);

  useEffect(() => {
    if (open) {
      const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 3);
      setQuestionsAsked(shuffled);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTotalPowerUp(0);
    }
  }, [open]);

  const currentQuestion = questionsAsked[currentQuestionIndex];

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setTotalPowerUp(prev => prev + currentQuestion.powerUpReward);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsAsked.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(totalPowerUp);
      onOpenChange(false);
    }
  };

  if (!currentQuestion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-purple-950 to-indigo-950 border-2 border-purple-500 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-8 h-8 text-purple-400" />
            Alarma Quiz - Question {currentQuestionIndex + 1}/{questionsAsked.length}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Score Display */}
          <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 text-center">
            <p className="text-sm text-purple-300">Power-Up accumulé</p>
            <p className="text-2xl font-bold text-yellow-400">+{totalPowerUp}</p>
          </div>

          {/* Question */}
          <div className="bg-black/40 rounded-lg p-4">
            <p className="text-lg font-semibold mb-4">{currentQuestion.question}</p>
            
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isCorrect = index === currentQuestion.correctAnswer;
                const isSelected = index === selectedAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-lg border-2 transition-all ";
                
                if (!isAnswered) {
                  buttonClass += "bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-purple-500";
                } else if (isCorrect) {
                  buttonClass += "bg-green-900/50 border-green-500 text-green-300";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-900/50 border-red-500 text-red-300";
                } else {
                  buttonClass += "bg-gray-800 border-gray-600 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {isAnswered && (
            <div className={`rounded-lg p-3 text-center ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-900/30 border border-green-500'
                : 'bg-red-900/30 border border-red-500'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <p className="text-green-300">✓ Correct ! +{currentQuestion.powerUpReward} power-up</p>
              ) : (
                <p className="text-red-300">✗ Mauvaise réponse !</p>
              )}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <Button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              {currentQuestionIndex < questionsAsked.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
