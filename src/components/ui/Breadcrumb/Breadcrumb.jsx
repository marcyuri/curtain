import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb({
    items = [],
    separator,
    className = ""
}) {

    const Separator = separator || ChevronRight;

    return (

        <nav
            className={`breadcrumb ${className}`}
            aria-label="Fil d'Ariane"
        >

            <ol className="breadcrumb__list">

                {items.map((item, index) => {

                    const isLast = index === items.length - 1;

                    return (

                        <li
                            key={item.path || item.label}
                            className="breadcrumb__item"
                        >

                            {isLast ? (

                                <span
                                    className="breadcrumb__current"
                                    aria-current="page"
                                >

                                    {item.label}

                                </span>

                            ) : (

                                <Link
                                    to={item.path}
                                    className="breadcrumb__link"
                                >

                                    {item.label}

                                </Link>

                            )}

                            {!isLast && (

                                <Separator
                                    size={16}
                                    className="breadcrumb__separator"
                                />

                            )}

                        </li>

                    );

                })}

            </ol>

        </nav>

    );

}

export default Breadcrumb;