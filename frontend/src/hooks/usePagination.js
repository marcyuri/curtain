import { useState } from "react";

import { APP_CONFIG } from "@config/app";

// Encapsule l'état de pagination serveur (Document 07, Ch.8).
// Ne fait aucun appel réseau : les pages/hooks appelants transmettent
// page/limit au service correspondant.

function usePagination(initialPage = 1, initialLimit = APP_CONFIG.DEFAULT_PAGE_SIZE) {

    const [page, setPage] = useState(initialPage);

    const [limit, setLimit] = useState(initialLimit);

    const [total, setTotal] = useState(0);

    const totalPages = Math.max(1, Math.ceil(total / limit));

    const goToPage = (nextPage) => {
        setPage(Math.min(Math.max(1, nextPage), totalPages));
    };

    const nextPage = () => goToPage(page + 1);

    const previousPage = () => goToPage(page - 1);

    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrevious: page > 1,
        setLimit,
        setTotal,
        goToPage,
        nextPage,
        previousPage,
    };

}

export default usePagination;
