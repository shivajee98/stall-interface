import { ExhibitorData } from "@/types";
import React from "react";

const HangingBoard = ({
  currentSlideData,
}: {
  currentSlideData: ExhibitorData;
}) => {
  return (
    <div>
      <div className="absolute z-[100] top-0 max-sm:top-[-15px] md:top-[-30px] lg:top-[-34px] left-1/2 -translate-x-1/2 w-full px-2 sm:px-4">
        {/* Hanging Threads */}
        <div
          className=" absolute flex justify-center w-full"
          style={{ top: 0 }}
        >
          {/* Left thread */}
          <div className=" w-[1px] sm:w-[2px] h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-gray-700/80 via-gray-700/60 to-gray-700/20 absolute lg:left-[23.5vw] max-sm:left-10 md:left-20 -translate-x-1/2 shadow-sm" />
          {/* Right thread */}
          <div className="w-[1px] sm:w-[2px] h-6 sm:h-8 md:h-10 lg:h-12 bg-gradient-to-b from-gray-700/80 via-gray-700/60 to-gray-700/20 absolute lg:right-[25vw] max-sm:right-16 md:right-28 -translate-x-1/2 shadow-sm" />
        </div>

        {/* Hanging Name Container */}
        <div className="relative top-6 sm:top-8 md:top-10 lg:top-12">
          <div
            className="w-full max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]
                         h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20
                         bg-black/60 backdrop-blur-xl border border-white/20 rounded-md sm:rounded-lg
                         shadow-lg sm:shadow-xl md:shadow-2xl relative overflow-hidden mx-auto
                         px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

            {/* Hanging Points */}

            <div
              className="absolute top-[20px] xs:top-[22px] sm:top-[25px] md:top-[28px] lg:top-[30px]
                           left-6 sm:left-8 md:left-9 -translate-x-1/2
                           w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3
                           bg-white/80 rounded-full shadow-md sm:shadow-lg"
            />
            <div
              className="absolute top-[20px] xs:top-[22px] sm:top-[25px] md:top-[28px] lg:top-[30px]
                           right-6 sm:right-8 md:right-5 -translate-x-1/2
                           w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3
                           bg-white/80 rounded-full shadow-md sm:shadow-lg"
            />

            {/* Floating Text */}
            <div className="flex items-center justify-center h-full">
              <div
                className="text-sm xs:text-base max-sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl
                             text-transparent font-extrabold bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500
                             bg-clip-text drop-shadow-sm sm:drop-shadow-md lg:drop-shadow-lg
                             text-center leading-tight truncate max-w-full"
              >
                {currentSlideData?.name || "Loading..."}
              </div>
            </div>
          </div>

          {/* Floating Particles */}
          <div className="absolute -inset-2 sm:-inset-4 pointer-events-none">
            <div
              className="absolute top-1 sm:top-2 left-2 sm:left-4
                           w-0.5 sm:w-1 h-0.5 sm:h-1
                           bg-pink-400 rounded-full opacity-60 animate-ping"
            ></div>
            <div
              className="absolute top-4 sm:top-6 md:top-8 right-3 sm:right-6
                           w-0.5 sm:w-1 h-0.5 sm:h-1
                           bg-purple-400 rounded-full opacity-60 animate-ping"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-2 sm:bottom-4 left-4 sm:left-8
                           w-0.5 sm:w-1 h-0.5 sm:h-1
                           bg-blue-400 rounded-full opacity-60 animate-ping"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangingBoard;
