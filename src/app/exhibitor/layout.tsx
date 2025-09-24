import Image from "next/image";
import React from "react";
import Ceiling from "../(root)/_shop/Ceiling";
import Floor from "../(root)/_shop/Floor";
import ExhibitorWall from "./_components/exhibitor-wall";

const ExhibitionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div
        className="flex-1 relative flex flex-col"
        style={{
          background:
            "radial-gradient(circle, rgba(255,223,70,0.98) 70%, rgba(255,140,0,1) 100%)",
        }}
      >
        {/* Ceiling of the shop - Fixed at top */}
        <div className="flex-shrink-0">
          <Ceiling />
        </div>

        {/* Wall with scrollable content - Takes remaining space */}
        <div className="flex-1 overflow-hidden">
          <ExhibitorWall>
            {/* Main content area - This is where scrolling happens */}
            <main className="h-full w-full">
              {children}
            </main>
          </ExhibitorWall>
        </div>

        {/* Floor of the shop - Fixed at bottom */}
        <div className="flex-shrink-0">
          <Floor />
        </div>

        {/* Avatar and Table Overlay */}
        <div className="absolute h-full lg:w-[25vw] md:w-[40vw] right-0 bottom-0 lg:right-[-105px] z-[100] flex flex-1 max-sm:left-1/2 max-sm:-translate-x-1/2">
          <div className="h-full w-full flex flex-col relative">
            {/* Image of the avatar */}
            <div className="absolute z-1 bottom-0 lg:left-[22%] md:left-[15%] max-sm:left-[5vw]">
              <Image
                src="https://ik.imagekit.io/librarysanju/Opexn%20Stall%20Components/avatar.png?updatedAt=1758706895766"
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
                src="https://ik.imagekit.io/librarysanju/Opexn%20Stall%20Components/table_1.png?updatedAt=1758706828511"
                alt="Table"
                width={350}
                height={100}
                className="object-fit lg:h-[70vh] h-[90vh] md:h-[38vh] sm:landscape:h-[36vh] sm:landscape:w-[40vh] max-sm:h-[52vh]"
                priority
              />
            </div>

            {/* Logo on the table */}
            <div className="absolute z-10 bottom-0 md:bottom-[12vh] max-sm:bottom-[8vh] sm:landscape:bottom-[7vh] lg:left-[20%] md:left-[20%] max-sm:left-[25%]">
              <Image
                src="https://ik.imagekit.io/librarysanju/Opexn%20Stall%20Components/opexn_logo.png?updatedAt=1758706878424"
                alt="Logo"
                width={120}
                height={50}
                className="object-fit lg:h-5 md:h-10 w-full max-sm:h-6 sm:landscape:h-[5vh] md:landscape:h-[4vh] md:landscape:w-[10vw]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionLayout;
