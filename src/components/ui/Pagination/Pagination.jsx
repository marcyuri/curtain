import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

function Pagination({
    currentPage = 1,
    totalPages = 1,
    onPageChange
}) {

    if (totalPages <= 1) return null;

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (

        <nav
            className="pagination"
            aria-label="Pagination"
        >

            <button
                type="button"
                className="pagination__button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >

                <ChevronLeft size={18} />

            </button>

            <div className="pagination__pages">

                {pages.map((page) => (

                    <button
                        key={page}
                        type="button"
                        className={`pagination__page ${page === currentPage
                                ? "pagination__page--active"
                                : ""
                            }`}
                        onClick={() => onPageChange(page)}
                    >

                        {page}

                    </button>

                ))}

            </div>

            <button
                type="button"
                className="pagination__button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >

                <ChevronRight size={18} />

            </button>

        </nav>

    );

}

export default Pagination;