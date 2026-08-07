import { useMemo, useState } from "react";

import {
    CalendarDays,
    Search,
} from "lucide-react";

import EventCard from "../../components/sections/EventCard";
import EventTimeline from "../../components/sections/EventTimeline";
import CTASection from "../../components/sections/CTASection";

import {

    events,

} from "./data";

import "./Events.css";

function Events() {

    const [search, setSearch] = useState("");

    const filteredEvents = useMemo(() => events.filter((event) =>

            event.title
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            event.location
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            event.description
                .toLowerCase()
                .includes(search.toLowerCase())

        ), [

        search,

    ]);

    return (

        <main className="events-page">

            <section className="events-page__hero">

                <span>

                    LOVE CAN BUILD

                </span>

                <h1>

                    Nos évènements

                </h1>

                <p>

                    Découvrez nos conférences, ateliers, séminaires et rencontres.

                </p>

            </section>

            <section className="events-page__search">

                <div>

                    <Search size={18} />

                    <input

                        type="search"

                        placeholder="Rechercher un évènement..."

                        value={search}

                        onChange={(event) =>

                            setSearch(event.target.value)

                        }

                    />

                </div>

            </section>

            <section className="events-page__grid">

                {

                    filteredEvents.map((event) => (

                        <EventCard

                            key={event.id}

                            {...event}

                        />

                    ))

                }

            </section>

            <EventTimeline

                events={filteredEvents}

            />

            <CTASection

                title="Rejoignez nos prochains évènements"

                description="Inscrivez-vous dès aujourd'hui pour participer à nos conférences et ateliers."

                primaryLabel="Voir tous les évènements"

                secondaryLabel="Nous contacter"

            />

        </main>

    );

}

export default Events;