import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/users";

export const userKeys = {
    all: ["users"],
    list: (params) => ["users", "list", params],
};

export function useUsers(params) {
    return useQuery({
        queryKey: userKeys.list(params),
        queryFn: () => fetchUsers(params),
        placeholderData: keepPreviousData, // no skeleton flash between pages
        staleTime: 30000, // 30 seconds
    });
}