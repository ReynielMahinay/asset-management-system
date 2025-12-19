import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createUser, deleteUser, fetchUser, updateUser } from "../api/users";

//<------------------Using fecth all user custom hook --------------------->
export function useAllUser() {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => fetchUser({ page: 1, pageSize: 1000 }),
  });
}

//<------------------Using fecth user with filter custom hook --------------------->
export function useUsers({
  page = 1,
  pageSize = 5,
  sort = "user_id",
  order = "asc",
  keyword = "",
} = {}) {
  return useQuery({
    queryKey: ["users", page, pageSize, sort, order, keyword],
    queryFn: () => fetchUser({ page, pageSize, sort, order, keyword }),
    keepPreviousData: true,
  });
}

//<------------------Using creating asset custom hook --------------------->
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries(["allUsers"]),
  });
}

//<------------------Using updating asset custom hook --------------------->
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}

//<------------------Using deleting asset custom hook --------------------->
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
}
