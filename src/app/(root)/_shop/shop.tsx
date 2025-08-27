"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Ceiling from "./Ceiling";
import Floor from "./Floor";
import Wall from "./Wall";
import HangingBoard from "./HangingBoard";
import { useRouter } from "next/navigation";
import { useGetExhibitor } from "@/hooks/useGetExhibitor";

export default function StallRoomSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const { data, isPending, error } = useGetExhibitor();
  const router = useRouter();

  const slides = useMemo(() => data ?? [], [data]);

  console.log("slides: ", slides);



  // Use data as the slides array, fallback to empty array if not loaded
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    const newSlide = (currentSlide + 1) % totalSlides;
    setCurrentSlide(newSlide);
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    console.log(`🔄 Slide Navigation: ${currentSlide + 1} → ${newSlide + 1}`);
    setCurrentSlide(newSlide);
  }, [currentSlide, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      else if (e.key === "ArrowRight") nextSlide();
      else if (e.key === " ") {
        e.preventDefault();
        setAutoPlay(!autoPlay);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [autoPlay, nextSlide, prevSlide]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay || totalSlides === 0) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, autoPlay, nextSlide, totalSlides]);

  const currentSlideData = slides[currentSlide];

  // Early return if loading or no data
  if (isPending) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <div className="text-gray-600">Loading real exhibitor data...</div>
          <div className="text-sm text-gray-500 mt-2">Fetching from API...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-red-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🚫</div>
          <div className="text-red-800 font-semibold mb-2">Failed to Load Real Data</div>
          <div className="text-red-600 mb-4 text-sm">{error?.toString()}</div>
          <div className="text-gray-600 text-sm mb-6">
            Unable to fetch exhibitor data from the API server.
            Please check your internet connection and try again.
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 Retry API Request
          </button>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📭</div>
          <div className="text-yellow-800 font-semibold mb-2">No Exhibitors Found</div>
          <div className="text-yellow-600 mb-4">The API returned an empty dataset.</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      key={currentSlide}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Slide counter */}
        <div className="absolute top-2 xs:top-3 sm:top-4 left-2 xs:left-3 sm:left-4 right-2 xs:right-3 sm:right-4 z-50 flex justify-between items-center">
          <div className="bg-black/70 backdrop-blur-sm text-white px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-xs xs:text-sm font-medium">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>

        {/* Slide content */}
        <div
          className="flex-1 relative"
          style={{
            background:
              "radial-gradient(circle, rgba(255,223,70,0.98) 70%, rgba(255,140,0,1) 100%)",
          }}
        >
          {/* Ceiling of the shop */}
          <Ceiling />

          {/* Wall or banner of the shop */}
          <Wall
            banner={currentSlideData?.banner}
            companyData={currentSlideData ? {
              name: currentSlideData.name || "",
              logo: currentSlideData.logo || "",
              products: currentSlideData.products || [],
              revenueInfo: currentSlideData.revenueInfo,
              fundingInfo: currentSlideData.fundingInfo
            } : undefined}
          >
            <div className="flex flex-col">
              {/* Title on top of the wall - Hanging Name */}
              <HangingBoard currentSlideData={currentSlideData} />
            </div>
          </Wall>

          {/* Floor of the shop */}
          <Floor />
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl flex items-center justify-between bg-black/60 rounded-full px-6 py-3 shadow-lg z-50">
          <button
            onClick={prevSlide}
            disabled={totalSlides <= 1}
            className="bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow transition"
            onClick={() => {
              if (currentSlideData?.ID) {
                router.push(`/exhibitor/${currentSlideData.ID}`);
              }
            }}
          >
            Visit Booth
          </button>

          <button
            onClick={nextSlide}
            disabled={totalSlides <= 1}
            className="bg-white/80 hover:bg-white text-gray-800 p-2 xs:p-3 sm:p-4 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Avatar and Table Overlay */}
        <div className="absolute h-full lg:w-[25vw] md:w-[40vw] right-0 bottom-0 lg:right-[-105px] z-[100] flex flex-1 max-sm:left-1/2 max-sm:-translate-x-1/2">
          <div className="h-full w-full flex flex-col relative">
            {/* Image of the avatar */}
            <div className="absolute z-1 bottom-0 lg:left-[22%] md:left-[15%] max-sm:left-[5vw]">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={230}
                height={220}
                className="lg:h-[52vh] md:h-[50vh] h-[60vh] max-sm:h-[42vh] sm:landscape:h-[45vh] sm:landscape:w-[10vw]"
                priority
              />
            </div>

            {/* Table Image as background */}
            <div className="absolute z-5 lg:bottom-[-65px] md:bottom-[-14vh] bottom-[-55px] sm:landscape:bottom-[-14vh] max-sm:left-[9%]">
              <Image
                src="/table.png"
                alt="Table"
                width={350}
                height={100}
                className="object-fit lg:h-[70vh] h-[90vh] md:h-[78vh] max-sm:h-[52vh] sm:landscape:h-[70vh] sm:landscape:w-[40vh]"
                priority
              />
            </div>

            {/* Logo on the table */}
            <div className="absolute z-10 bottom-0 md:bottom-[12vh] max-sm:bottom-[8vh] sm:landscape:bottom-[7vh] lg:left-[20%] md:left-[20%] max-sm:left-[25%]">
              <Image
                src="/opexn_logo.png"
                alt="Logo"
                width={120}
                height={50}
                className="object-fit lg:h-12 md:h-10 w-full max-sm:h-6 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
