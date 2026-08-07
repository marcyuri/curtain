import {
    CalendarDays,
    Clock3,
    MapPin,
    Users,
    ArrowRight,
} from "lucide-react";

import Button from "../../ui/Button";

import "./EventCard.css";

function EventCard({

    title,

    description,

    image,

    date,

    time,

    location,

    capacity,

    badge,

    onRegister,

}) {

    return (

        <article className="event-card">

            {badge && (

                <span className="event-card__badge">

                    {badge}

                </span>

            )}

            <div className="event-card__image">

                {image ? (

                    <img
                        src={image}
                        alt={title}
                    />

                ) : (

                    <div className="event-card__placeholder">

                        <CalendarDays size={70} />

                    </div>

                )}

            </div>

            <div className="event-card__body">

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

                <div className="event-card__details">

                    <div>

                        <CalendarDays size={18} />

                        <span>{date}</span>

                    </div>

                    <div>

                        <Clock3 size={18} />

                        <span>{time}</span>

                    </div>

                    <div>

                        <MapPin size={18} />

                        <span>{location}</span>

                    </div>

                    <div>

                        <Users size={18} />

                        <span>

                            {capacity} places

                        </span>

                    </div>

                </div>

            </div>

            <footer className="event-card__footer">

                <Button

                    onClick={onRegister}

                >

                    S&apos;inscrire

                    <ArrowRight size={18} />

                </Button>

            </footer>

        </article>

    );

}

export default EventCard;