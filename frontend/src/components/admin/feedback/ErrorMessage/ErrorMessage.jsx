import {

    XCircle,

} from "lucide-react";

import "./ErrorMessage.css";

function ErrorMessage({

    title = "Une erreur est survenue",

    message = "",

    children,

}) {

    return (

        <section className="error-message">

            <div className="error-message__icon">

                <XCircle

                    size={40}

                />

            </div>

            <div className="error-message__content">

                <h3>

                    {title}

                </h3>

                {

                    message && (

                        <p>

                            {message}

                        </p>

                    )

                }

                {children}

            </div>

        </section>

    );

}

export default ErrorMessage;