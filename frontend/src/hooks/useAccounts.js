import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAccounts } from "../api/accounts";

export function useAccounts({ page = 1, pageSize = 5 } = {}) {
  return useQuery({
    queryKey: ["accounts", page, pageSize],
    queryFn: () => fetchAccounts({ page, pageSize }),
    keepPreviousData: true,
  });
}
