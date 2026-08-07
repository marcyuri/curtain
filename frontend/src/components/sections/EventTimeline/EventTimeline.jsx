import {
    CalendarDays,
    Clock3,
    MapPin,
} from "lucide-react";

import "./EventTimeline.css";

function EventTimeline({

    title = "Calendrier des évènements",

    subtitle = "LOVE CAN BUILD",

    events = [],

}) {

    return (

        <section className="event-timeline">

            <header className="event-timeline__header">

                <span>

                    {subtitle}

                </span>

                <h2>

                    {title}

                </h2>

            </header>

            <div className="event-timeline__content">

                {events.map((event, index) => (

                    <article

                        key={event.id || index}

                        className="event-timeline__item"

                    >

                        <div className="event-timeline__line">

                            <span />

                        </div>

                        <div className="event-timeline__card">

                            <span className="event-timeline__badge">

                                {event.badge || "Évènement"}

                            </span>

                            <h3>

                                {event.title}

                            </h3>

                            <p>

                                {event.description}

                            </p>

                            <div className="event-timeline__infos">

                                <div>

                                    <CalendarDays size={16} />

                                    {event.date}

                                </div>

                                <div>

                                    <Clock3 size={16} />

                                    {event.time}

                                </div>

                                <div>

                                    <MapPin size={16} />

                                    {event.location}

                                </div>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

}

export default EventTimeline;