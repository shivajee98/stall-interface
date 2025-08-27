"use client";

import dynamic from "next/dynamic";

const StallRoomSlider = dynamic(() => import("./_shop/shop"), {
  ssr: false,
});

export default function ExhibitionPage() {

  return <StallRoomSlider />;
}
