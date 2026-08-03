import {
    ArrowDownRight,
    ArrowUpRight,
} from "lucide-react";

import "./StatsCard.css";

function StatsCard({

    title,

    value,

    icon: Icon,

    color = "primary",

    trend = 0,

    subtitle = "",

    loading = false,

    onClick,

}) {

    const positive = trend >= 0;

    return (

        <article

            className={`stats-card stats-card--${color}`}

            onClick={onClick}

        >

            {

                loading ? (

                    <div className="stats-card__loading" />

                ) : (

                    <>

                        <header className="stats-card__header">

                            <div>

                                <span>

                                    {title}

                                </span>

                                <h2>

                                    {value}

                                </h2>

                            </div>

                            <div className="stats-card__icon">

                                <Icon size={24} />

                            </div>

                        </header>

                        <footer className="stats-card__footer">

                            <div

                                className={

                                    positive

                                        ? "stats-card__trend stats-card__trend--up"

                                        : "stats-card__trend stats-card__trend--down"

                                }

                            >

                                {

                                    positive

                                        ? <ArrowUpRight size={16} />

                                        : <ArrowDownRight size={16} />

                                }

                                {Math.abs(trend)}%

                            </div>

                            <small>

                                {subtitle}

                            </small>

                        </footer>

                    </>

                )

            }

        </article>

    );

}

export default StatsCard;