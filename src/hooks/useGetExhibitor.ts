// hooks/useGetExhibitor.ts (Fixed version)
"use client";

import { exhibitor } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetExhibitor = () => {
  return useQuery({
    queryKey: ['exhibitors-data'],
    queryFn: exhibitor,
    staleTime: 1000 * 60 * 5,   // 5 minutes
    gcTime: 1000 * 60 * 10,     // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: 3,
  });
};
