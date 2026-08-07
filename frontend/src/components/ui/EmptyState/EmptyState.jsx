import { Inbox } from "lucide-react";
import Button from "../Button";
import "./EmptyState.css";

function EmptyState({
    icon: Icon = Inbox,
    title = "Aucune donnée",
    description = "Aucun contenu n'est disponible pour le moment.",
    actionLabel,
    onAction,
    className = ""
}) {

    const classes = [
        "empty-state",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            <div className="empty-state__icon">

                <Icon size={64} />

            </div>

            <h3 className="empty-state__title">

                {title}

            </h3>

            <p className="empty-state__description">

                {description}

            </p>

            {actionLabel && onAction && (

                <Button
                    onClick={onAction}
                >

                    {actionLabel}

                </Button>

            )}

        </div>

    );

}

export default EmptyState;