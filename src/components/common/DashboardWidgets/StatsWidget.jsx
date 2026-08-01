import {
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";

import "./StatsWidget.css";

function StatsWidget({

    title,

    value,

    subtitle,

    icon: Icon,

    trend = 0,

    color = "primary",

}) {

    const positive = trend >= 0;

    return (

        <article
            className={`stats-widget stats-widget--${color}`}
        >

            <div className="stats-widget__header">

                <div className="stats-widget__icon">

                    {Icon && <Icon size={24} />}

                </div>

                <div
                    className={
                        positive
                            ? "stats-widget__trend stats-widget__trend--up"
                            : "stats-widget__trend stats-widget__trend--down"
                    }
                >

                    {positive ? (

                        <ArrowUpRight size={16} />

                    ) : (

                        <ArrowDownRight size={16} />

                    )}

                    {Math.abs(trend)}%

                </div>

            </div>

            <div className="stats-widget__body">

                <span className="stats-widget__title">

                    {title}

                </span>

                <strong className="stats-widget__value">

                    {value}

                </strong>

                {subtitle && (

                    <small className="stats-widget__subtitle">

                        {subtitle}

                    </small>

                )}

            </div>

        </article>

    );

}

export default StatsWidget;