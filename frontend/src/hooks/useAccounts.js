import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAccounts, createAccount } from "../api/accounts";

export function useAccounts({ page = 1, pageSize = 5 } = {}) {
  return useQuery({
    queryKey: ["accounts", page, pageSize],
    queryFn: () => fetchAccounts({ page, pageSize }),
    keepPreviousData: true,
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: () => queryClient.invalidateQueries(["account"]),
    onError: (error) => {
      console.error("Create account failed", error);
    },
  });
}
