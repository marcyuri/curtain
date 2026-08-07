import {

    Database,

    Plus,

    RefreshCw,

} from "lucide-react";

import "./TableEmptyState.css";

function TableEmptyState({

    title = "Aucune donnée",

    description = "Aucun élément n'est disponible.",

    actionLabel = "Ajouter",

    secondaryLabel = "Actualiser",

    illustration,

    onAction,

    onRefresh,

}) {

    return (

        <section className="table-empty-state">

            {

                illustration ? (

                    <img

                        src={illustration}

                        alt={title}

                        className="table-empty-state__image"

                    />

                ) : (

                    <div

                        className="table-empty-state__icon"

                    >

                        <Database

                            size={64}

                        />

                    </div>

                )

            }

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            <div

                className="table-empty-state__actions"

            >

                {

                    onAction && (

                        <button

                            type="button"

                            className="table-empty-state__primary"

                            onClick={onAction}

                        >

                            <Plus

                                size={18}

                            />

                            {actionLabel}

                        </button>

                    )

                }

                {

                    onRefresh && (

                        <button

                            type="button"

                            className="table-empty-state__secondary"

                            onClick={onRefresh}

                        >

                            <RefreshCw

                                size={18}

                            />

                            {secondaryLabel}

                        </button>

                    )

                }

            </div>

        </section>

    );

}

export default TableEmptyState;