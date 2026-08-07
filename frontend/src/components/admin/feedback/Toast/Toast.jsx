import {

    CheckCircle2,

    XCircle,

    AlertTriangle,

    Info,

    X,

} from "lucide-react";

import "./Toast.css";

const icons = {

    success: CheckCircle2,

    error: XCircle,

    warning: AlertTriangle,

    info: Info,

};

function Toast({

    id,

    type = "info",

    title,

    message,

    duration = 5000,

    onClose,

}) {

    const Icon =

        icons[type] ||

        Info;

    return (

        <article

            className={`

                toast

                toast--${type}

            `}

        >

            <div className="toast__icon">

                <Icon

                    size={22}

                />

            </div>

            <div className="toast__content">

                {

                    title && (

                        <h4>

                            {title}

                        </h4>

                    )

                }

                {

                    message && (

                        <p>

                            {message}

                        </p>

                    )

                }

            </div>

            <button

                type="button"

                className="toast__close"

                onClick={() =>

                    onClose?.(id)

                }

            >

                <X size={18} />

            </button>

            <div

                className="toast__progress"

                style={{

                    animationDuration: `${duration}ms`

                }}

            />

        </article>

    );

}

export default Toast;