import {

    ChevronLeft,

    ChevronRight,

} from "lucide-react";

import "./Pagination.css";

function Pagination({

    page = 1,

    totalPages = 1,

    onChange,

}) {

    const pages = Array.from(

        {

            length: totalPages,

        },

        (_, index) => index + 1

    );

    return (

        <nav className="pagination">

            <button

                type="button"

                disabled={page === 1}

                onClick={() => onChange?.(page - 1)}

            >

                <ChevronLeft size={18} />

            </button>

            <div className="pagination__pages">

                {

                    pages.map((number) => (

                        <button

                            key={number}

                            type="button"

                            className={

                                number === page

                                    ? "pagination__page pagination__page--active"

                                    : "pagination__page"

                            }

                            onClick={() =>

                                onChange?.(number)

                            }

                        >

                            {number}

                        </button>

                    ))

                }

            </div>

            <button

                type="button"

                disabled={page === totalPages}

                onClick={() => onChange?.(page + 1)}

            >

                <ChevronRight size={18} />

            </button>

        </nav>

    );

}

export default Pagination;