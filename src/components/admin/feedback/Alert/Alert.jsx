import {

    AlertTriangle,

    CheckCircle2,

    Info,

    XCircle,

    X,

} from "lucide-react";

import "./Alert.css";

const icons = {

    success: CheckCircle2,

    warning: AlertTriangle,

    error: XCircle,

    info: Info,

};

function Alert({

    type = "info",

    title,

    children,

    closable = false,

    onClose,

}) {

    const Icon =

        icons[type] ||

        Info;

    return (

        <div

            className={`

                alert

                alert--${type}

            `}

        >

            <div className="alert__icon">

                <Icon

                    size={22}

                />

            </div>

            <div className="alert__content">

                {

                    title && (

                        <h4>

                            {title}

                        </h4>

                    )

                }

                {

                    children && (

                        <div>

                            {children}

                        </div>

                    )

                }

            </div>

            {

                closable && (

                    <button

                        type="button"

                        className="alert__close"

                        onClick={onClose}

                    >

                        <X

                            size={18}

                        />

                    </button>

                )

            }

        </div>

    );

}

export default Alert;