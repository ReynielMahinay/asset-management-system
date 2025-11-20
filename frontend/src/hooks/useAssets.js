import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { fetchAssets, deleteAsset } from "../api/assets";

export function useAssets({ page = 1, pageSize = 5, sort = "asset_id", order = "asc" } = {}) {
  return useQuery({
    queryKey: ["assets", page, pageSize, sort, order],
    queryFn: () => fetchAssets({ page, pageSize, sort, order }),
  });
}

export function useDeleteAsset(){
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      //refresh asset list when deleted
      queryClient.invalidateQueries(["assets"])
    }
  })
}