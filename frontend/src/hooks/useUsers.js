import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users";


//hook for creating new user on the backend
export function useCreateUser(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => queryClient.invalidateQueries(["users"])
    })
}