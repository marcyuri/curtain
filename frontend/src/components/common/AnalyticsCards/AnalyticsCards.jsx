import {
    ArrowUpRight,
    ArrowDownRight,
    Minus,
} from "lucide-react";

import "./AnalyticsCards.css";

function AnalyticsCards({

    cards = [],

    columns = 4,

    onClick,

}) {

    const getTrendIcon = (trend) => {

        if (trend > 0) {

            return <ArrowUpRight size={18} />;

        }

        if (trend < 0) {

            return <ArrowDownRight size={18} />;

        }

        return <Minus size={18} />;

    };

    const getTrendClass = (trend) => {

        if (trend > 0) {

            return "analytics-card__trend analytics-card__trend--positive";

        }

        if (trend < 0) {

            return "analytics-card__trend analytics-card__trend--negative";

        }

        return "analytics-card__trend analytics-card__trend--neutral";

    };

    return (

        <section

            className="analytics-cards"

            style={{

                gridTemplateColumns: `repeat(${columns}, minmax(220px,1fr))`,

            }}

        >

            {cards.map((card) => (

                <article

                    key={card.id}

                    className="analytics-card"

                    onClick={() => onClick?.(card)}

                >

                    <header className="analytics-card__header">

                        <div className="analytics-card__icon">

                            {card.icon && <card.icon size={24} />}

                        </div>

                        <span className={getTrendClass(card.trend)}>

                            {getTrendIcon(card.trend)}

                            {Math.abs(card.trend)}%

                        </span>

                    </header>

                    <div className="analytics-card__body">

                        <span className="analytics-card__label">

                            {card.label}

                        </span>

                        <strong className="analytics-card__value">

                            {card.value}

                        </strong>

                        {card.description && (

                            <small>

                                {card.description}

                            </small>

                        )}

                    </div>

                </article>

            ))}

        </section>

    );

}

export default AnalyticsCards;