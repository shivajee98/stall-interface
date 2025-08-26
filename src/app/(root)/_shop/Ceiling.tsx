import React from "react";

const Ceiling = () => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Main gradient container */}
      <div
        className="w-full h-2 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18 relative overflow-hidden"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 96% 100%, 4% 100%)",
          backgroundImage: `linear-gradient(135deg,
            #ff6b35 0%,
            #ff8e53 15%,
            #ffad66 30%,
            #ffc947 45%,
            #ffe135 60%,
            #fff200 75%,
            #f4d03f 90%,
            #f7dc6f 100%
          )`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default Ceiling;
