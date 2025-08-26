import React from 'react'

const Floor = () => {
   return (
        <div
            className="w-full h-8 xs:h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 overflow-hidden sm:static sm:bottom-auto fixed bottom-0 left-0 right-0 z-30 sm:z-auto "
            style={{
                clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, -0% 100%)",
                backgroundImage: "url('/floor.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        />
    );
}

export default Floor
