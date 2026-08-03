import Spinner from "../Spinner";
import ProgressBar from "../ProgressBar";

import "./LoadingScreen.css";

function LoadingScreen({

    open = true,

    logo,

    title = "LOVE CAN BUILD",

    subtitle = "Chargement de la plateforme...",

    progress = 0,

    currentStep = "",

    version = "",

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="loading-screen">

            <div className="loading-screen__container">

                {

                    logo && (

                        <img

                            src={logo}

                            alt={title}

                            className="loading-screen__logo"

                        />

                    )

                }

                <h1>

                    {title}

                </h1>

                <p>

                    {subtitle}

                </p>

                <Spinner

                    size="lg"

                />

                <ProgressBar

                    value={progress}

                />

                {

                    currentStep && (

                        <div className="loading-screen__step">

                            {currentStep}

                        </div>

                    )

                }

                {

                    version && (

                        <small>

                            Version {version}

                        </small>

                    )

                }

            </div>

        </div>

    );

}

export default LoadingScreen;