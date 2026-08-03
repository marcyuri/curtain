import Spinner from "../Spinner";
import ProgressBar from "../ProgressBar";

import "./LoadingOverlay.css";

function LoadingOverlay({

    open = false,

    title = "Chargement...",

    message = "",

    progress,

    estimatedTime,

    transparent = false,

    fullscreen = false,

    cancellable = false,

    onCancel,

}) {

    if (!open) {

        return null;

    }

    return (

        <div

            className={`

                loading-overlay

                ${fullscreen ? "loading-overlay--fullscreen" : ""}

                ${transparent ? "loading-overlay--transparent" : ""}

            `}

        >

            <div className="loading-overlay__card">

                <Spinner

                    size="lg"

                />

                <h2>

                    {title}

                </h2>

                {

                    message && (

                        <p>

                            {message}

                        </p>

                    )

                }

                {

                    typeof progress === "number" && (

                        <ProgressBar

                            value={progress}

                            animated

                        />

                    )

                }

                {

                    estimatedTime && (

                        <div

                            className="loading-overlay__time"

                        >

                            <span>

                                Temps restant estimé

                            </span>

                            <strong>

                                {estimatedTime}

                            </strong>

                        </div>

                    )

                }

                {

                    cancellable && (

                        <button

                            type="button"

                            className="loading-overlay__cancel"

                            onClick={onCancel}

                        >

                            Annuler

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default LoadingOverlay;