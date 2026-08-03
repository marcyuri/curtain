import {

    Info,

} from "lucide-react";

import "./InfoMessage.css";

function InfoMessage({

    title = "Information",

    message = "",

    children,

}) {

    return (

        <section className="info-message">

            <div className="info-message__icon">

                <Info

                    size={40}

                />

            </div>

            <div className="info-message__content">

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

export default InfoMessage;