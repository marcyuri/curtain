import {

    ChevronRight,

    House,

} from "lucide-react";

import "./Breadcrumb.css";

function Breadcrumb({

    items = [],

}) {

    return (

        <nav className="breadcrumb">

            {

                items.map((item, index) => (

                    <div

                        key={item.label}

                        className="breadcrumb__item"

                    >

                        {

                            index === 0 && (

                                <House

                                    size={16}

                                />

                            )

                        }

                        {

                            item.href ? (

                                <a

                                    href={item.href}

                                >

                                    {item.label}

                                </a>

                            ) : (

                                <span>

                                    {item.label}

                                </span>

                            )

                        }

                        {

                            index < items.length - 1 && (

                                <ChevronRight

                                    size={16}

                                />

                            )

                        }

                    </div>

                ))

            }

        </nav>

    );

}

export default Breadcrumb;