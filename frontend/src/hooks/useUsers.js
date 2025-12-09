import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUser, updateUser } from "../api/users";
import { updateAsset } from "../api/assets";


export function useUsers({page = 1, pageSize = 5, sort = "user_id", order = "asc"} = {}){
    return useQuery({
        queryKey: ["users", page, pageSize, sort, order ],
        queryFn: () => fetchUser({page, pageSize, sort, order}),
        keepPreviousData: true,
    })
}

//hook for creating new user on the backend
export function useCreateUser(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries(["users"])
    })
}

//hook for updating user on the backend
export function useUpdateUser(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({id, data}) => updateUser(id, data),
        onSuccess: () => queryClient.invalidateQueries(["users"])
    })
}


//hook for displa