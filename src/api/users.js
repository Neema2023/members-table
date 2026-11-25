import { api } from "./client";

const FIELDS = "firstName,lastName,email,phone,age,gender,company,address";

export async function fetchUsers({ page, pageSize, sortBy, order, q, gender }) {
    const skip = (page - 1) * pageSize;

    // 1. Search takes priority (API can't combine search + filter)
    if (q) {
        const params = new URLSearchParams({
            q,
            limit: pageSize,
            skip,
            select: FIELDS,
            ...(sortBy ? { sortBy, order } : {}),
        });
        return api(`/users/search?${params}`);
    }

    // 2. Filter by field
    if (gender) {
        const params = new URLSearchParams({
            key: "gender",
            value: gender,
            limit: pageSize,
            skip,
            select: FIELDS,
            ...(sortBy ? { sortBy, order } : {}),
        });
        return api(`/users/filter?${params}`);
    }

    // 3. Plain list
    const params = new URLSearchParams({
        limit: pageSize,
        skip,
        select: FIELDS,
        ...(sortBy ? { sortBy, order } : {}),
    });
    return api(`/users?${params}`);
}