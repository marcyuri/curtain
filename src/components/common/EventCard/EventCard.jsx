import {
    CalendarDays,
    Clock3,
    MapPin,
    Users
} from "lucide-react";

import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

import "./EventCard.css";

function EventCard({

    event,

    variant = "default",

    onRegister,

    className = ""

}) {

    const {

        image,

        category,

        title,

        description,

        date,

        time,

        location,

        remainingSeats,

        status,

        badge

    } = event;

    return (

        <article
            className={`
                event-card
                event-card--${variant}
                ${className}
            `}
        >

            <div className="event-card__image">

                <img
                    src={image}
                    alt={title}
                />

                {badge && (

                    <Badge
                        className="event-card__badge"
                    >

                        {badge}

                    </Badge>

                )}

            </div>

            <div className="event-card__content">

                <span className="event-card__category">

                    {category}

                </span>

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

                <div className="event-card__details">

                    <span>

                        <CalendarDays size={16} />

                        {date}

                    </span>

                    <span>

                        <Clock3 size={16} />

                        {time}

                    </span>

                    <span>

                        <MapPin size={16} />

                        {location}

                    </span>

                    <span>

                        <Users size={16} />

                        {remainingSeats} places

                    </span>

                </div>

                <div className="event-card__footer">

                    <Badge>

                        {status}

                    </Badge>

                    <Button

                        disabled={status === "Complet"}

                        onClick={() => onRegister?.(event)}

                    >

                        S&apos;inscrire

                    </Button>

                </div>

            </div>

        </article>

    );

}

export default EventCard;