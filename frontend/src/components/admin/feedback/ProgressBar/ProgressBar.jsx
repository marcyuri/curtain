import "./ProgressBar.css";

function ProgressBar({

    value = 0,

    min = 0,

    max = 100,

    label,

    showPercentage = true,

    color = "primary",

    animated = true,

}) {

    const percentage =

        Math.min(

            100,

            Math.max(

                0,

                ((value - min) / (max - min)) * 100

            )

        );

    return (

        <div className="progress-bar">

            {

                (label || showPercentage) && (

                    <div className="progress-bar__header">

                        {

                            label && (

                                <span>

                                    {label}

                                </span>

                            )

                        }

                        {

                            showPercentage && (

                                <span>

                                    {

                                        Math.round(

                                            percentage

                                        )

                                    }%

                                </span>

                            )

                        }

                    </div>

                )

            }

            <div className="progress-bar__track">

                <div

                    className={`

                        progress-bar__fill

                        progress-bar__fill--${color}

                        ${animated

                            ? "progress-bar__fill--animated"

                            : ""

                        }

                    `}

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

}

export default ProgressBar;