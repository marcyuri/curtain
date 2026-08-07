import {

    LoaderCircle,

} from "lucide-react";

import "./LoadingOverlay.css";

function LoadingOverlay({

    open = false,

    title = "Chargement...",

    description = "Veuillez patienter.",

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="loading-overlay">

            <div className="loading-overlay__card">

                <LoaderCircle

                    size={48}

                    className="loading-overlay__spinner"

                />

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </div>

        </div>

    );

}

export default LoadingOverlay;