import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, BookOpen } from "lucide-react";

interface LessonDetailScreenProps {
  lessonId: number;
  onBack: () => void;
  onComplete: (lessonId: number) => void;
}

const lessonContent: Record<number, {
  emoji: string;
  title: string;
  sections: { heading: string; body: string }[];
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string };
}> = {
  1: {
    emoji: "📧",
    title: "Fake Email Scams",
    sections: [
      { heading: "What is Phishing?", body: "Phishing emails pretend to be from trusted companies like your bank, Amazon, or the IRS. They try to trick you into clicking a link or sharing personal information." },
      { heading: "How to Spot Them", body: "Look for misspelled sender addresses (e.g. support@amaz0n.com), urgent language like \"Act now or your account will be closed!\", and links that don't match the real website." },
      { heading: "What to Do", body: "Never click links in suspicious emails. Instead, go directly to the company's website by typing the address yourself. When in doubt, call the company using the number on their official site." },
    ],
    quiz: {
      question: "You receive an email from 'support@paypa1.com' asking you to verify your account. What should you do?",
      options: ["Click the link to verify", "Reply with your password", "Go to paypal.com directly and check your account", "Forward it to friends"],
      correctIndex: 2,
      explanation: "The sender address uses '1' instead of 'l' — a classic phishing trick. Always navigate to the official site manually.",
    },
  },
  2: {
    emoji: "📱",
    title: "Text Message Scams",
    sections: [
      { heading: "Smishing Explained", body: "Smishing is phishing via text message. Scammers send texts pretending to be delivery services, banks, or government agencies to trick you into clicking malicious links." },
      { heading: "Common Patterns", body: "Watch for messages about undelivered packages, suspicious account activity, or prize winnings. They always include a link and create a sense of urgency." },
      { heading: "Stay Safe", body: "Never tap links in unexpected texts. If it claims to be from a company you use, open their app directly. You can also forward suspicious texts to 7726 (SPAM) to report them." },
    ],
    quiz: {
      question: "A text says: 'USPS: Your package is held. Confirm delivery: bit.ly/xyz'. What's the safest action?",
      options: ["Click the link to check", "Go to usps.com and track with your number", "Reply with your address", "Call the number back"],
      correctIndex: 1,
      explanation: "USPS won't send shortened links via text. Always check the official website or app with your actual tracking number.",
    },
  },
  3: {
    emoji: "👤",
    title: "Impersonation Scams",
    sections: [
      { heading: "Who Do They Pretend to Be?", body: "Scammers impersonate the IRS, Social Security Administration, your bank, or even law enforcement. They use fear and authority to pressure you into acting quickly." },
      { heading: "Warning Signs", body: "Government agencies never call demanding immediate payment. They won't threaten arrest over the phone or ask for personal info like your Social Security number via call or text." },
      { heading: "Protect Yourself", body: "Hang up and call the organization directly using their official number. Never give personal information to someone who called you — even if their caller ID looks legitimate." },
    ],
    quiz: {
      question: "Someone calls claiming to be from the SSA saying your Social Security number has been 'suspended'. What should you do?",
      options: ["Provide your SSN to verify", "Press 1 to speak to an agent", "Hang up — SSNs can't be suspended", "Wire money to resolve the issue"],
      correctIndex: 2,
      explanation: "The SSA never calls to threaten suspension of your number. This is a common impersonation scam targeting seniors.",
    },
  },
  4: {
    emoji: "🎁",
    title: "Gift Card Scams",
    sections: [
      { heading: "How It Works", body: "A scammer contacts you pretending to be a boss, family member, or official. They ask you to buy gift cards and read the numbers to them as 'payment' for a fine, fee, or favor." },
      { heading: "Why Gift Cards?", body: "Gift cards are untraceable once the codes are shared. No legitimate company, government agency, or employer will ever ask for payment via gift cards." },
      { heading: "The Golden Rule", body: "If anyone asks you to pay with gift cards — stop. It's always a scam, no matter who they claim to be. Real payments use invoices, checks, or secure online portals." },
    ],
    quiz: {
      question: "Your 'boss' emails asking you to buy $500 in iTunes gift cards for a client. What do you do?",
      options: ["Buy them right away to help", "Ask for the client's email", "Call your boss directly on their known number to verify", "Send the codes via text"],
      correctIndex: 2,
      explanation: "Business email compromise scams impersonate executives. Always verify unusual requests through a separate, trusted communication channel.",
    },
  },
  5: {
    emoji: "👵",
    title: "Grandparent Scams",
    sections: [
      { heading: "The Setup", body: "A caller pretends to be your grandchild (or their lawyer) and says they're in trouble — arrested, in an accident, or stranded abroad. They beg for money and ask you not to tell anyone." },
      { heading: "Why It Works", body: "These scams exploit love and urgency. The caller may use information from social media to sound convincing, or AI-generated voice cloning to mimic your grandchild's voice." },
      { heading: "What to Do", body: "Hang up and call your grandchild directly on their known number. Establish a family code word that only real family members know. Never send money based on a single phone call." },
    ],
    quiz: {
      question: "Someone calls sounding like your grandson saying he's in jail and needs bail money wired immediately. What's the safest response?",
      options: ["Wire the money to help", "Ask the caller personal questions", "Hang up and call your grandson's real number", "Send a check instead"],
      correctIndex: 2,
      explanation: "Always verify directly with the person through their known phone number. Scammers can sound remarkably convincing, even using AI voice cloning.",
    },
  },
  6: {
    emoji: "💰",
    title: "Lottery & Prize Scams",
    sections: [
      { heading: "Too Good to Be True", body: "You receive a call, email, or letter saying you've won a lottery or prize — but you need to pay a fee or taxes upfront to claim it. Real lotteries never work this way." },
      { heading: "The Red Flags", body: "You can't win a lottery you didn't enter. Legitimate prizes never require upfront payment. Scammers may send fake checks that bounce after you've sent your real money." },
      { heading: "Stay Protected", body: "Delete messages about prizes you didn't enter. Never pay fees to collect winnings. If it sounds too good to be true, it always is." },
    ],
    quiz: {
      question: "An email says you've won $1 million in a foreign lottery. You just need to pay $200 in 'processing fees.' What should you do?",
      options: ["Pay the fee to claim your prize", "Give them your bank details for direct deposit", "Delete it — you can't win a lottery you didn't enter", "Ask for more details about the prize"],
      correctIndex: 2,
      explanation: "You cannot win a lottery you never entered. Upfront fees for 'prizes' are always scams designed to steal your money.",
    },
  },
};

const LessonDetailScreen = ({ lessonId, onBack, onComplete }: LessonDetailScreenProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const lesson = lessonContent[lessonId];
  if (!lesson) return null;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
  };

  const handleFinish = () => {
    onComplete(lessonId);
    onBack();
  };

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-2 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <span className="text-2xl">{lesson.emoji}</span>
        <h1 className="text-lg font-bold font-display text-foreground">{lesson.title}</h1>
      </div>

      {!showQuiz ? (
        <>
          {/* Lesson content */}
          <div className="space-y-4 mt-3 mb-6">
            {lesson.sections.map((section, i) => (
              <div key={i} className="bg-card rounded-xl p-4 shadow-card">
                <h3 className="text-sm font-bold text-foreground mb-1.5">{section.heading}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Take quiz CTA */}
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Take the Quiz
          </button>
        </>
      ) : (
        <div className="mt-3 animate-fade-in">
          {/* Quiz */}
          <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
            <p className="text-xs font-bold text-primary mb-2">📝 Lesson Quiz</p>
            <p className="text-sm font-bold text-foreground leading-relaxed">{lesson.quiz.question}</p>
          </div>

          <div className="space-y-2 mb-4">
            {lesson.quiz.options.map((option, i) => {
              let style = "bg-card shadow-card border-2 border-transparent";
              if (answered) {
                if (i === lesson.quiz.correctIndex) {
                  style = "bg-safe/10 border-2 border-safe shadow-card";
                } else if (i === selectedAnswer && i !== lesson.quiz.correctIndex) {
                  style = "bg-danger/10 border-2 border-danger shadow-card";
                } else {
                  style = "bg-card shadow-card border-2 border-transparent opacity-50";
                }
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
                  {answered && i === lesson.quiz.correctIndex && <CheckCircle className="w-5 h-5 text-safe shrink-0" />}
                  {answered && i === selectedAnswer && i !== lesson.quiz.correctIndex && <XCircle className="w-5 h-5 text-danger shrink-0" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <>
              <div className="bg-primary/5 rounded-xl p-4 mb-4 animate-fade-in">
                <p className="text-xs font-bold text-primary mb-1">💡 Why?</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{lesson.quiz.explanation}</p>
              </div>
              <button
                onClick={handleFinish}
                className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl active:scale-[0.98] transition-transform animate-fade-in"
              >
                Complete Lesson ✓
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonDetailScreen;
