import React from "react";

interface WallProps {
  children?: React.ReactNode;
}

const ExhibitorWall = ({ children }: WallProps) => {
  return (
    <div
      className="flex-1 w-full relative overflow-hidden min-h-[calc(100vh-64px)] xs:min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-140px)] bg-gradient-to-br from-white via-orange-50 to-yellow-50"
      style={{
        clipPath: "polygon(4% 0%, 96% 0%, 96% 100%, 4% 100%)",
      }}
    >
      <div className="absolute inset-0 px-2 pt-0 xs:p-3 sm:p-4 md:p-6 md:pt-0 lg:p-8 lg:pt-0 landscape:sm:pt-0 flex flex-col">
        {/* Scrollable Children Container */}
        {children && (
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-20">
            <div className="min-h-full">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitorWall;
