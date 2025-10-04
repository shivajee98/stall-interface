"use client";

import { exhibitor } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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

interface ProductQueryResult {
  product: Product | null;
  exhibitor: Exhibitor | null;
  notFound: boolean;
}

export const useGetProduct = (productId: string) => {
  const query = useQuery<ProductQueryResult>({
    queryKey: ['product-data', productId],
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

  return {
    ...query,
    product: query.data?.product,
    exhibitor: query.data?.exhibitor,
    notFound: query.data?.notFound,
  };
};
