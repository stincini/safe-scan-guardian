import React from "react";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame = ({ children }: IPhoneFrameProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="relative w-[390px] h-[844px] bg-phone-frame rounded-[55px] shadow-elevated p-[14px] overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[34px] bg-phone-frame rounded-b-[20px] z-30" />
        
        {/* Screen */}
        <div className="relative w-full h-full bg-phone-screen rounded-[42px] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="h-[54px] flex items-end justify-between px-8 pb-1 text-foreground text-xs font-semibold shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/><rect x="13.5" y="0" width="2.5" height="12" rx="1"/></svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor"><path d="M7.5 3.5C9.2 3.5 10.7 4.2 11.8 5.3L13.2 3.9C11.7 2.4 9.7 1.5 7.5 1.5C5.3 1.5 3.3 2.4 1.8 3.9L3.2 5.3C4.3 4.2 5.8 3.5 7.5 3.5ZM7.5 7C8.3 7 9 7.3 9.5 7.8L7.5 10L5.5 7.8C6 7.3 6.7 7 7.5 7Z"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor"><rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="22" y="4" width="2" height="4" rx="1"/><rect x="2" y="3" width="15" height="6" rx="1"/></svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
