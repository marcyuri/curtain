import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import "./Alert.css";

const icons = {
    success: CircleCheck,
    error: CircleX,
    warning: CircleAlert,
    info: Info
};

function Alert({
    title,
    children,
    variant = "info",
    closable = false,
    onClose,
    className = ""
}) {

    const Icon = icons[variant] || Info;

    const classes = [
        "alert",
        `alert--${variant}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div
            className={classes}
            role="alert"
        >

            <div className="alert__icon">

                <Icon size={22} />

            </div>

            <div className="alert__content">

                {title && (

                    <h4 className="alert__title">

                        {title}

                    </h4>

                )}

                {children && (

                    <div className="alert__message">

                        {children}

                    </div>

                )}

            </div>

            {closable && (

                <button
                    type="button"
                    className="alert__close"
                    onClick={onClose}
                    aria-label="Fermer l'alerte"
                >

                    <X size={18} />

                </button>

            )}

        </div>

    );

}

export default Alert;