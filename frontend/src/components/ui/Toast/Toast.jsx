import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import "./Toast.css";

const icons = {
    success: CircleCheck,
    error: CircleX,
    warning: CircleAlert,
    info: Info
};

function Toast({
    title,
    message,
    variant = "info",
    onClose
}) {

    const Icon = icons[variant] || Info;

    return (

        <div
            className={`toast toast--${variant}`}
            role="status"
            aria-live="polite"
        >

            <div className="toast__icon">

                <Icon size={22} />

            </div>

            <div className="toast__content">

                {title && (

                    <h4 className="toast__title">

                        {title}

                    </h4>

                )}

                {message && (

                    <p className="toast__message">

                        {message}

                    </p>

                )}

            </div>

            <button
                type="button"
                className="toast__close"
                onClick={onClose}
                aria-label="Fermer"
            >

                <X size={18} />

            </button>

        </div>

    );

}

export default Toast;