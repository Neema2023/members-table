import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULTS = {
    page: 1,
    pageSize: 10,
    sortBy: "",
    order: "",
    q: "",
    gender: "",
};

function readParams(searchParams) {
    return {
        page: Number(searchParams.get("page")) || DEFAULTS.page,
        pageSize: Number(searchParams.get("pageSize")) || DEFAULTS.pageSize,
        sortBy: searchParams.get("sortBy") || DEFAULTS.sortBy,
        order: searchParams.get("order") || DEFAULTS.order,
        q: searchParams.get("q") || DEFAULTS.q,
        gender: searchParams.get("gender") || DEFAULTS.gender,
    };
}

export function useTableParams() {
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useMemo(() => readParams(searchParams), [searchParams]);

    const update = useCallback(
        (patch) => {
            const next = {...params, ...patch };

            // Any change except page itself resets page to 1
            if (!("page" in patch)) {
                next.page = 1;
            }

            const sp = new URLSearchParams();
            if (next.page !== 1) sp.set("page", next.page);
            if (next.pageSize !== DEFAULTS.pageSize) sp.set("pageSize", next.pageSize);
            if (next.sortBy) sp.set("sortBy", next.sortBy);
            if (next.order) sp.set("order", next.order);
            if (next.q) sp.set("q", next.q);
            if (next.gender) sp.set("gender", next.gender);

            setSearchParams(sp, { replace: true });
        }, [params, setSearchParams]
    );

    const clearFilters = useCallback(() => {
        setSearchParams(new URLSearchParams(), { replace: true });
    }, [setSearchParams]);

    return { params, update, clearFilters };
}