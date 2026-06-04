import {
  useQuery,
  useMutation,
  useQueryClient,
  usePrefetchQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchAssets,
  deleteAsset,
  updateAsset,
  createAsset,
  dashboardStats,
} from "../api/assets";

//<------------------Using fecth asset custom hook --------------------->

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardStats,
    keepPreviousData: true,
  });
}

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
