import { Phone, UserPlus, Shield, Heart, MessageCircle, ChevronRight, Users } from "lucide-react";

interface ProtectedCaregiverScreenProps {
  onCaregiverOnboarding: () => void;
}

const ProtectedCaregiverScreen = ({ onCaregiverOnboarding }: ProtectedCaregiverScreenProps) => {
  // Mock: whether a caregiver is linked
  const hasCaregiver = true;
  const caregiver = {
    name: "Sarah (Daughter)",
    phone: "(555) 234-5678",
    linkedSince: "January 2025",
    avatar: "S",
  };

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="pt-4 pb-4">
        <h1 className="text-lg font-bold font-display text-foreground">My Caregiver</h1>
        <p className="text-sm text-muted-foreground mt-1">Your trusted person who helps keep you safe</p>
      </div>

      {hasCaregiver ? (
        <>
          {/* Caregiver Card */}
          <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">{caregiver.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-foreground">{caregiver.name}</p>
                <p className="text-sm text-muted-foreground">{caregiver.phone}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Shield className="w-3.5 h-3.5 text-safe" />
                  <span className="text-xs text-muted-foreground">Linked since {caregiver.linkedSince}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-1">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <Heart className="w-3.5 h-3.5 inline mr-1 text-primary" />
                {caregiver.name.split(" ")[0]} gets a notification if we detect a serious scam. They can't read your messages — only safety alerts.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 mb-5">
            <h2 className="text-base font-bold font-display text-foreground mb-3">Get in Touch</h2>
            
            <button className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft flex items-center justify-center gap-3">
              <Phone className="w-5 h-5" />
              Call {caregiver.name.split(" ")[0]}
            </button>

            <button className="w-full bg-card rounded-xl p-4 shadow-card active:scale-[0.98] transition-transform flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">Send a Message</p>
                <p className="text-xs text-muted-foreground">Let them know you're okay</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Manage */}
          <div className="space-y-2">
            <h2 className="text-base font-bold font-display text-foreground mb-3">Manage</h2>

            <button className="w-full bg-card rounded-xl p-4 shadow-card active:scale-[0.98] transition-transform flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-foreground">Add Another Caregiver</p>
                <p className="text-xs text-muted-foreground">Link a second trusted person</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>

          </div>
        </>
      ) : (
        /* No caregiver linked */
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold font-display text-foreground text-center mb-3">
            No Caregiver Linked
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed max-w-[260px]">
            Add a trusted family member so they can help keep you safe from scams.
          </p>
          <button
            onClick={onCaregiverOnboarding}
            className="w-full bg-primary text-primary-foreground rounded-xl p-4 font-bold text-base active:scale-[0.98] transition-transform shadow-soft flex items-center justify-center gap-3"
          >
            <UserPlus className="w-5 h-5" />
            Add a Caregiver
          </button>
        </div>
      )}
    </div>
  );
};

export default ProtectedCaregiverScreen;
