import { TriangleAlert } from "lucide-react";
import Button from "../Button";
import "./ErrorState.css";

function ErrorState({
    icon: Icon = TriangleAlert,
    title = "Une erreur est survenue",
    description = "Impossible de charger les données.",
    actionLabel = "Réessayer",
    onAction,
    className = ""
}) {

    const classes = [
        "error-state",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            <div className="error-state__icon">

                <Icon size={64} />

            </div>

            <h3 className="error-state__title">

                {title}

            </h3>

            <p className="error-state__description">

                {description}

            </p>

            {onAction && (

                <Button
                    onClick={onAction}
                >

                    {actionLabel}

                </Button>

            )}

        </div>

    );

}

export default ErrorState;