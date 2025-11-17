import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../api/assets";

export function useAssets() {
  return useQuery({
    queryKey: ["assets"],//Unique key to identify this query in the cache
    queryFn: fetchAssets,//the Actual fecth function from the database
    staleTime: 5 * 60 * 1000,//the refetch refresh
    refetchOnWindowFocus: false,
  });
}
