"use client";

import { exhibitor } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Product {
  id: number;
  startupId: number;
  title: string;
  stage: string;
  users: string[];
  price: number;
  quantity: number;
  category: string;
  description: string;
  tags: string;
  productType: string;
  images: Array<{ url: string }>;
}

interface Exhibitor {
  id: number;
  name: string;
  products: Product[];
}

interface OrderQueryResult {
  product: Product | null;
  exhibitor: Exhibitor | null;
  notFound: boolean;
}

export const useGetOrder = (productId: string) => {
  const [quantity, setQuantity] = useState(1);

  const query = useQuery<OrderQueryResult>({
    queryKey: ['order-data', productId],
    queryFn: async () => {
      const exhibitors = await exhibitor();
      
      // Find the product across all exhibitors
      for (const exhibitor of exhibitors) {
        const product = exhibitor.products.find((p: Product) => p.id.toString() === productId);
        if (product) {
          return {
            product,
            exhibitor,
            notFound: false
          };
        }
      }
      
      return {
        product: null,
        exhibitor: null,
        notFound: true
      };
    },
    staleTime: 1000 * 60 * 5,   // 5 minutes
    gcTime: 1000 * 60 * 10,     // 10 minutes
    refetchOnWindowFocus: false,
    retry: 3,
    enabled: !!productId,
  });

  // Mock customer data - in real app this would come from user context/auth
  const customerData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: {
      street: "123 Tech Park Avenue, Sector 5",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      landmark: "Near Metro Station"
    }
  };

  // Calculate pricing
  const product = query.data?.product;
  const subtotal = product?.price ? product.price * quantity : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return {
    ...query,
    product: query.data?.product,
    exhibitor: query.data?.exhibitor,
    notFound: query.data?.notFound,
    customerData,
    quantity,
    setQuantity,
    subtotal,
    shipping,
    tax,
    total
  };
};
