import {

    AlertTriangle,

    RotateCcw,

} from "lucide-react";

import "./ErrorState.css";

function ErrorState({

    title = "Une erreur est survenue",

    description = "Impossible de charger les données.",

    actionLabel = "Réessayer",

    onRetry,

}) {

    return (

        <section className="error-state">

            <div className="error-state__icon">

                <AlertTriangle

                    size={52}

                />

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            {

                onRetry && (

                    <button

                        onClick={onRetry}

                    >

                        <RotateCcw

                            size={18}

                        />

                        {actionLabel}

                    </button>

                )

            }

        </section>

    );

}

export default ErrorState;