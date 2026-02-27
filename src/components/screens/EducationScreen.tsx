import { useState } from "react";
import { ArrowLeft, ChevronRight, CheckCircle, Sparkles, Trophy } from "lucide-react";
import PappyAssistant from "@/components/PappyAssistant";

interface EducationScreenProps {
  onBack: () => void;
  onQuiz: () => void;
  onLesson: (lessonId: number) => void;
}

const lessons = [
  { id: 1, emoji: "📧", title: "Fake Email Scams", subtitle: "How to spot phishing emails", duration: "2 min read" },
  { id: 2, emoji: "📱", title: "Text Message Scams", subtitle: 'Why "Click this link" is a red flag', duration: "3 min read" },
  { id: 3, emoji: "👤", title: "Impersonation Scams", subtitle: "When someone pretends to be the IRS or your bank", duration: "2 min read" },
  { id: 4, emoji: "🎁", title: "Gift Card Scams", subtitle: "No real company asks for gift cards as payment", duration: "2 min read" },
  { id: 5, emoji: "👵", title: "Grandparent Scams", subtitle: '"Grandma, I\'m in trouble and need money"', duration: "3 min read" },
  { id: 6, emoji: "💰", title: "Lottery & Prize Scams", subtitle: "If you didn't enter, you didn't win", duration: "2 min read" },
];

const EducationScreen = ({ onBack, onQuiz, onLesson }: EducationScreenProps) => {
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([1, 2]));
  const completedCount = completedLessons.size;

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display text-foreground">Learn About Scams</h1>
      </div>

      {/* Pappy Assistant */}
      <div className="mb-4">
        <PappyAssistant
          state={completedCount >= lessons.length ? "celebrating" : "teaching"}
          message={completedCount >= lessons.length ? "You've finished all the lessons! 🎉" : "Let's learn how to spot scams!"}
          size="md"
        />
      </div>

      {/* Quiz of the Day Card */}
      <button
        onClick={onQuiz}
        className="w-full bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 mb-5 text-left active:scale-[0.98] transition-transform shadow-card"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-primary-foreground">🧠 Quiz of the Day</p>
            <p className="text-xs text-primary-foreground/80 mt-0.5">3 quick questions to sharpen your scam detection skills</p>
          </div>
          <ChevronRight className="w-5 h-5 text-primary-foreground/60 shrink-0" />
        </div>
      </button>

      {/* Progress */}
      <div className="bg-primary/10 rounded-xl p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">{completedCount} of {lessons.length} lessons</p>
          </div>
          <span className="text-sm font-bold text-primary">{Math.round((completedCount / lessons.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completedCount / lessons.length) * 100}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div className="space-y-2">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onLesson(lesson.id)}
              className="w-full bg-card rounded-xl p-4 shadow-card flex items-center gap-3 active:scale-[0.98] transition-transform text-left"
            >
              <span className="text-3xl">{lesson.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground">{lesson.title}</p>
                <p className="text-xs text-muted-foreground truncate">{lesson.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{lesson.duration}</p>
              </div>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-safe shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EducationScreen;
