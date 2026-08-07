import {

    AlertTriangle,

} from "lucide-react";

import "./WarningMessage.css";

function WarningMessage({

    title = "Attention",

    message = "",

    children,

}) {

    return (

        <section className="warning-message">

            <div className="warning-message__icon">

                <AlertTriangle

                    size={40}

                />

            </div>

            <div className="warning-message__content">

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

export default WarningMessage;