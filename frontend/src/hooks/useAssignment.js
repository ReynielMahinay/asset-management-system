import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assingnedAsset } from "../api/assignment"; // note the correct spelling

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
