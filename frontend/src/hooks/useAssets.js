import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAssets,
  deleteAsset,
  updateAsset,
  createAsset,
  fetchUnassigedAssets,
} from "../api/assets";

//<------------------Using fecth asset custom hook --------------------->
export function useAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
  keyword = "",
  assign_status = null,
} = {}) {
  return useQuery({
    queryKey: ["assets", page, pageSize, sort, order, keyword, assign_status],
    queryFn: () =>
      fetchAssets({ page, pageSize, sort, order, keyword, assign_status }),
    keepPreviousData: true,
  });
}

export function useUnassignedAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "ASC",
  keyword = "",
} = {}) {
  page = page ?? 1;
  pageSize = pageSize ?? 5;
  sort = sort ?? "asset_id";
  order = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
  keyword = keyword ?? "";
  return useQuery({
    queryKey: ["unassignedAssets", page, pageSize, sort, order, keyword],
    queryFn: () =>
      fetchUnassigedAssets({ page, pageSize, sort, order, keyword }),
    keepPreviousData: true,
  });
}

//<------------------Using creating asset custom hook --------------------->
export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => queryClient.invalidateQueries(["assets"]),
  });
}

//<------------------Using updating asset custom hook --------------------->
export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAsset(id, data),
    onSuccess: () => queryClient.invalidateQueries(["assets"]),
  });
}

//<------------------Using deleting asset custom hook --------------------->
export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      //refresh asset list when deleted
      queryClient.invalidateQueries(["assets"]);
    },
  });
}
