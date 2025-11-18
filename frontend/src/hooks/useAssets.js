import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "../api/assets";

export function useAssets({ page = 1, pageSize = 5, sort = "asset_id", order = "asc" } = {}) {
  return useQuery({
    queryKey: ["assets", page, pageSize, sort, order],
    queryFn: () => fetchAssets({ page, pageSize, sort, order }),
  });
}

