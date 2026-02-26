import { useState } from "react";
import { ArrowLeft, Trophy, CheckCircle, XCircle, Sparkles } from "lucide-react";

interface QuizOfTheDayScreenProps {
  onBack: () => void;
}

const dailyQuestions = [
  {
    id: 1,
    question: 'You get a text: "Your package couldn\'t be delivered. Click here to reschedule." What should you do?',
    options: [
      "Click the link to reschedule",
      "Ignore it — you weren't expecting a package",
      "Check the tracking number on the official carrier website",
      "Reply STOP to unsubscribe",
    ],
    correctIndex: 2,
    explanation:
      "Always go directly to the carrier's official website or app. Scam texts use fake delivery alerts to steal your information.",
  },
  {
    id: 2,
    question: "Which of these is a red flag in an email from your bank?",
    options: [
      "It addresses you by your full name",
      "It asks you to verify your account by clicking a link",
      "It has the bank's official logo",
      "It mentions your last transaction",
    ],
    correctIndex: 1,
    explanation:
      "Legitimate banks never ask you to verify account details through email links. Always log in through the official app or website.",
  },
  {
    id: 3,
    question: 'Someone calls claiming to be the IRS and says you owe back taxes. They demand payment in gift cards. What\'s the best response?',
    options: [
      "Buy the gift cards to avoid arrest",
      "Ask for their badge number and call back",
      "Hang up — the IRS never demands gift card payments",
      "Transfer money from your savings account instead",
    ],
    correctIndex: 2,
    explanation:
      "The IRS will never call demanding immediate payment, especially via gift cards. This is one of the most common phone scams targeting seniors.",
  },
];

const QuizOfTheDayScreen = ({ onBack }: QuizOfTheDayScreenProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = dailyQuestions[currentQ];

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === question.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= dailyQuestions.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  if (finished) {
    const percent = Math.round((score / dailyQuestions.length) * 100);
    return (
      <div className="px-6 pb-6 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="pt-4 pb-2 flex items-center gap-3 w-full">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold font-display text-foreground">Quiz Complete!</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <p className="text-3xl font-bold font-display text-foreground">{percent}%</p>
          <p className="text-sm text-muted-foreground text-center">
            You got {score} out of {dailyQuestions.length} correct
          </p>
          <p className="text-sm text-muted-foreground text-center max-w-[240px]">
            {percent === 100
              ? "Perfect score! You're a scam-spotting expert. 🎉"
              : percent >= 66
              ? "Great job! Keep learning to stay even sharper."
              : "Keep practicing — every lesson makes you safer."}
          </p>
          <button
            onClick={onBack}
            className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl active:scale-[0.98] transition-transform"
          >
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold font-display text-foreground">Quiz of the Day</h1>
          <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {dailyQuestions.length}</p>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">{score} pts</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 mb-5">
        {dailyQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              i < currentQ ? "bg-primary" : i === currentQ ? "bg-primary/60" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
        <p className="text-sm font-bold text-foreground leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {question.options.map((option, i) => {
          let style = "bg-card shadow-card border-2 border-transparent";
          if (answered) {
            if (i === question.correctIndex) {
              style = "bg-safe/10 border-2 border-safe shadow-card";
            } else if (i === selectedAnswer && i !== question.correctIndex) {
              style = "bg-danger/10 border-2 border-danger shadow-card";
            } else {
              style = "bg-card shadow-card border-2 border-transparent opacity-50";
            }
          } else if (i === selectedAnswer) {
            style = "bg-primary/10 border-2 border-primary shadow-card";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full rounded-xl p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-all ${style}`}
            >
              <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm text-foreground flex-1">{option}</span>
              {answered && i === question.correctIndex && (
                <CheckCircle className="w-5 h-5 text-safe shrink-0" />
              )}
              {answered && i === selectedAnswer && i !== question.correctIndex && (
                <XCircle className="w-5 h-5 text-danger shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="bg-primary/5 rounded-xl p-4 mb-4 animate-fade-in">
          <p className="text-xs font-bold text-primary mb-1">💡 Why?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl active:scale-[0.98] transition-transform animate-fade-in"
        >
          {currentQ + 1 >= dailyQuestions.length ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
};

export default QuizOfTheDayScreen;
