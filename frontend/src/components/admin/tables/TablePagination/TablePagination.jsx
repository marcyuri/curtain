import {

    ChevronLeft,

    ChevronRight,

    ChevronsLeft,

    ChevronsRight,

} from "lucide-react";

import "./TablePagination.css";

const PAGE_SIZE_OPTIONS = [

    10,

    25,

    50,

    100,

];

function TablePagination({

    page = 1,

    pageSize = 10,

    totalItems = 0,

    pageSizeOptions = PAGE_SIZE_OPTIONS,

    onPageChange,

    onPageSizeChange,

}) {

    const totalPages =

        Math.max(

            1,

            Math.ceil(

                totalItems / pageSize

            )

        );

    const start =

        totalItems === 0

            ? 0

            : (page - 1) * pageSize + 1;

    const end =

        Math.min(

            page * pageSize,

            totalItems

        );

    return (

        <footer className="table-pagination">

            <div className="table-pagination__info">

                Affichage

                <strong>

                    {start}

                </strong>

                -

                <strong>

                    {end}

                </strong>

                sur

                <strong>

                    {totalItems}

                </strong>

            </div>

            <div className="table-pagination__controls">

                <label>

                    Lignes

                    <select

                        value={pageSize}

                        onChange={(event) =>

                            onPageSizeChange?.(

                                Number(

                                    event.target.value

                                )

                            )

                        }

                    >

                        {

                            pageSizeOptions.map((size) => (

                                <option

                                    key={size}

                                    value={size}

                                >

                                    {size}

                                </option>

                            ))

                        }

                    </select>

                </label>

                <button

                    type="button"

                    disabled={page === 1}

                    onClick={() =>

                        onPageChange?.(1)

                    }

                >

                    <ChevronsLeft size={18} />

                </button>

                <button

                    type="button"

                    disabled={page === 1}

                    onClick={() =>

                        onPageChange?.(

                            page - 1

                        )

                    }

                >

                    <ChevronLeft size={18} />

                </button>

                <span>

                    {page}

                    /

                    {totalPages}

                </span>

                <button

                    type="button"

                    disabled={page === totalPages}

                    onClick={() =>

                        onPageChange?.(

                            page + 1

                        )

                    }

                >

                    <ChevronRight size={18} />

                </button>

                <button

                    type="button"

                    disabled={page === totalPages}

                    onClick={() =>

                        onPageChange?.(

                            totalPages

                        )

                    }

                >

                    <ChevronsRight size={18} />

                </button>

            </div>

        </footer>

    );

}

export default TablePagination;