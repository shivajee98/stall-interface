"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const productId = resolvedParams?.productId;

 const handlePurchase = () => {
    router.push("/checkout-product")
 }

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-3">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            Product Demo - ID: {productId}
          </h1>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="aspect-video w-full">
            <video
              src="/video-3.mp4"
              controls
              autoPlay
              loop
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Separator */}
        <div className="h-[2px] w-full my-8 bg-gradient-to-r from-gray-400 via-gray-700 to-gray-400 rounded-full" />

        {/* Product details */}
        <div className="">
          <div className="text-4xl font-bold bg-gradient-to-tr from-gray-800 to-gray-500 bg-clip-text text-transparent">
            Product Description:{" "}
          </div>
          <div className="py-4 text-lg text-gray-700 px-6 leading-[1.3]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi qui
            fugiat distinctio suscipit recusandae ducimus iusto nemo?
            Praesentium aperiam architecto aspernatur illum labore consequuntur
            perferendis consequatur placeat est, voluptates voluptas maxime
            minus qui cupiditate illo itaque sunt! Quibusdam optio debitis dicta
            fugiat temporibus explicabo aut saepe, minus laudantium possimus
            beatae, magnam sit enim expedita repellendus veritatis! Iure quidem
            perferendis quo, cum quaerat, voluptatum saepe consequatur rem non
            quibusdam, error magnam voluptatem unde eaque soluta vitae. Tempore
            maiores nemo quaerat sunt explicabo eos, quo suscipit omnis? Modi,
            quasi laborum. Non adipisci a error soluta, saepe incidunt quisquam
            illo. Exercitationem, atque vitae.
          </div>
        </div>

        {/* Purchase Button */}
        <div>
          <Button variant={"default"} className="mt-8"
          onClick={handlePurchase}
          >
            Want to Purchase Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
