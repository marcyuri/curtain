import "./ProgressWidget.css";

function ProgressWidget({

    label,

    value = 0,

    color = "#2563eb",

}) {

    return (

        <article className="progress-widget">

            <div className="progress-widget__header">

                <span>

                    {label}

                </span>

                <strong>

                    {value}%

                </strong>

            </div>

            <div className="progress-widget__track">

                <div

                    className="progress-widget__bar"

                    style={{

                        width: `${value}%`,

                        background: color,

                    }}

                />

            </div>

        </article>

    );

}

export default ProgressWidget;