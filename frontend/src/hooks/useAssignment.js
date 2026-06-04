import {
  useMutation,
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { assingnedAsset } from "../api/assignment"; // note the correct spelling
import { fetchUnassignedAsset } from "../api/assignment";

export function useAssignmentAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => assingnedAsset(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["assets"]); // <- refresh asset table
      queryClient.invalidateQueries(["assignment"]);
    },
  });
}

export function useUnassignedAssets({
  page = 1,
  pageSize = 5,
  sort = "asset_id",
  order = "asc",
  keyword = "",
} = {}) {
  return useQuery({
    queryKey: ["unassigned-assets", page, pageSize, sort, order, keyword],
    queryFn: () =>
      fetchUnassignedAsset({
        page,
        pageSize,
        sort,
        order,
        keyword,
      }),
    keepPreviousData: true,
  });
}
