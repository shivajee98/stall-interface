import React from "react";
import Image from "next/image";
import { Package } from "lucide-react";

interface WallProps {
  children?: React.ReactNode;
  banner?: string;
  companyData?: {
    name: string;
    logo: string;
    products: Array<{
      ID: number;
      title: string;
      description?: string;
    }>;
    revenueInfo?: {
      revenueBracket: string;
      userImpact: number;
    };
    fundingInfo?: {
      fundingType: string;
    };
  };
}

const Wall = ({ children, banner, companyData }: WallProps) => {
  return (
    <div
      className="flex-1 w-full relative overflow-hidden min-h-[calc(100vh-64px)] xs:min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-112px)] lg:min-h-[calc(100vh-140px)] bg-gradient-to-br from-white via-orange-50 to-yellow-50"
      style={{
        clipPath: "polygon(4% 0%, 96% 0%, 96% 100%, 4% 100%)",
      }}
    >
      <div className="absolute inset-0 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
        {/* Keep original children (like HangingBoard) but filter out Exhibitor cards */}
        {children && (
          <div className="relative z-20">
            {React.Children.map(children, (child) => {
              // Only render HangingBoard and other non-Exhibitor components
              if (React.isValidElement(child)) {
                const childProps = child.props as any;
                // Skip Exhibitor components by checking for exhibitorData prop
                if (
                  childProps?.exhibitorData ||
                  (child.key && child.key.toString().includes("exhibitor"))
                ) {
                  return null;
                }
              }
              return child;
            })}
          </div>
        )}

        {/* New Company Layout */}
        {companyData && (
          <div className="absolute inset-0 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-center justify-center max-w-7xl mx-auto">
              {/* Left Side - Product Icons */}
              <div className="w-full lg:col-span-2 flex lg:flex-col flex-row justify-center lg:justify-start items-center gap-2 lg:gap-4 order-2 lg:order-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 hidden lg:block">
                  Products
                </h3>
                <div className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 max-w-full">
                  {companyData.products.slice(0, 4).map((product, index) => (
                    <div
                      key={product.ID}
                      className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-110"
                      title={product.title}
                    >
                      <Package className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                  {companyData.products.length > 4 && (
                    <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs lg:text-sm font-bold">
                        +{companyData.products.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Center - Company Name and Description */}
              <div className="w-full lg:col-span-8 text-center px-2 sm:px-4 order-1 lg:order-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-700 bg-clip-text text-transparent leading-tight drop-shadow-sm">
                  {companyData.name}
                </h1>
                <div className="space-y-2 sm:space-y-4 max-w-4xl mx-auto">
                  <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium">
                    Premium Technology Solutions
                  </p>
                  {companyData.products.length > 0 &&
                    companyData.products[0].description && (
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto line-clamp-2 lg:line-clamp-none">
                        {companyData.products[0].description}
                      </p>
                    )}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-3 sm:mt-6">
                    {companyData.revenueInfo && (
                      <span className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium shadow-lg">
                        {companyData.revenueInfo.revenueBracket}
                      </span>
                    )}
                    {companyData.revenueInfo && (
                      <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium shadow-lg">
                        {companyData.revenueInfo.userImpact.toLocaleString()}{" "}
                        Users
                      </span>
                    )}
                    {companyData.fundingInfo && (
                      <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium shadow-lg">
                        {companyData.fundingInfo.fundingType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - Company Logo in Square Shape */}
              <div className="w-full lg:col-span-2 flex justify-center lg:justify-end order-3">
                <div className="relative group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 bg-white rounded-2xl shadow-2xl p-2 sm:p-3 lg:p-4 group-hover:shadow-3xl transition-all duration-300 border-2 sm:border-4 border-orange-200 group-hover:border-orange-300">
                    <Image
                      src={companyData.logo || "/placeholder.svg"}
                      alt={companyData.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wall;
