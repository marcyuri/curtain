import {

    CheckCircle2,

} from "lucide-react";

import "./SuccessMessage.css";

function SuccessMessage({

    title = "Opération réussie",

    message = "",

    children,

}) {

    return (

        <section className="success-message">

            <div className="success-message__icon">

                <CheckCircle2

                    size={40}

                />

            </div>

            <div className="success-message__content">

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

export default SuccessMessage;