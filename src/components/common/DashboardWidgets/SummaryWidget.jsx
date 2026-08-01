import "./SummaryWidget.css";

function SummaryWidget({

    title,

    value,

    subtitle,

    color = "primary",

}) {

    return (

        <article className={`summary-widget summary-widget--${color}`}>

            <span className="summary-widget__title">

                {title}

            </span>

            <strong className="summary-widget__value">

                {value}

            </strong>

            {subtitle && (

                <small className="summary-widget__subtitle">

                    {subtitle}

                </small>

            )}

        </article>

    );

}

export default SummaryWidget;