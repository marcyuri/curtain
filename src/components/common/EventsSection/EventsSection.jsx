import { useMemo, useState } from "react";
import "./EventsSection.css";

import Input from "../../form/Input";
import Select from "../../form/Select";
import Button from "../../form/Button";
import EventCard from "../EventCard";

const SORT_OPTIONS = [
    {
        label: "Événements à venir",
        value: "upcoming",
    },
    {
        label: "Les plus récents",
        value: "recent",
    },
    {
        label: "Événements passés",
        value: "past",
    },
];

const EventsSection = ({
    title = "Nos événements",
    subtitle,
    events = [],
    categories = [],
    searchable = true,
    filterable = true,
    sortable = true,
    carousel = false,
    limit,
    showMoreLabel = "Voir tous les événements",
    onShowMore,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("upcoming");

    const filteredEvents = useMemo(() => {
        let list = [...events];

        if (category !== "all") {
            list = list.filter(
                (event) => event.category === category
            );
        }

        if (search) {
            const query = search.toLowerCase();

            list = list.filter(
                (event) =>
                    event.title.toLowerCase().includes(query) ||
                    event.location.toLowerCase().includes(query)
            );
        }

        switch (sort) {
            case "recent":
                list.sort(
                    (a, b) =>
                        new Date(b.date) - new Date(a.date)
                );
                break;

            case "past":
                list = list.filter(
                    (event) =>
                        new Date(event.date) < new Date()
                );

                list.sort(
                    (a, b) =>
                        new Date(b.date) - new Date(a.date)
                );
                break;

            default:
                list = list.filter(
                    (event) =>
                        new Date(event.date) >= new Date()
                );

                list.sort(
                    (a, b) =>
                        new Date(a.date) - new Date(b.date)
                );
        }

        return list;
    }, [events, category, search, sort]);

    const displayedEvents = limit
        ? filteredEvents.slice(0, limit)
        : filteredEvents;

    return (
        <section className="events-section">
            <header className="events-section__header">
                <h2>{title}</h2>

                {subtitle && (
                    <p>{subtitle}</p>
                )}
            </header>

            <div className="events-section__toolbar">

                {searchable && (
                    <Input
                        placeholder="Rechercher un événement..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                )}

                {filterable && (
                    <Select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        options={[
                            {
                                label:
                                    "Toutes les catégories",
                                value: "all",
                            },
                            ...categories.map((item) => ({
                                label: item,
                                value: item,
                            })),
                        ]}
                    />
                )}

                {sortable && (
                    <Select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        options={SORT_OPTIONS}
                    />
                )}

            </div>

            <div
                className={`events-section__content ${carousel
                        ? "events-section__content--carousel"
                        : ""
                    }`}
            >
                {displayedEvents.map((event) => (
                    <EventCard
                        key={event.id}
                        {...event}
                    />
                ))}
            </div>

            {limit &&
                filteredEvents.length >
                limit &&
                onShowMore && (
                    <div className="events-section__footer">
                        <Button
                            onClick={onShowMore}
                        >
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default EventsSection;