import { useMemo, useState } from "react";
import "./CalendarScheduler.css";

function CalendarScheduler({
    events = [],
    views = ["day", "week", "month"],
    defaultView = "month",
    onSelectDate,
    onSelectEvent,
    onCreateEvent,
}) {

    const [view, setView] = useState(defaultView);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const groupedEvents = useMemo(() => events, [events]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onSelectDate?.(date);
    };

    return (
        <section className="calendar-scheduler">
            <header className="calendar-scheduler__header">
                <h2>Calendrier</h2>

                <div className="calendar-scheduler__toolbar">
                    {views.map((item) => (
                        <button
                            key={item}
                            className={view === item ? "active" : ""}
                            onClick={() => setView(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </header>

            <div className="calendar-scheduler__body">
                <aside className="calendar-scheduler__sidebar">
                    <h3>Événements</h3>

                    {groupedEvents.map((event) => (
                        <button
                            key={event.id}
                            className="calendar-scheduler__event"
                            onClick={() => onSelectEvent?.(event)}
                        >
                            <strong>{event.title}</strong>
                            <span>{event.date}</span>
                        </button>
                    ))}
                </aside>

                <main className="calendar-scheduler__calendar">
                    <div className="calendar-scheduler__placeholder">
                        <p>Vue : <strong>{view}</strong></p>
                        <p>Date sélectionnée : {selectedDate.toLocaleDateString()}</p>

                        <button onClick={() => handleDateClick(new Date())}>
                            Aujourd&apos;hui
                        </button>

                        <button onClick={() => onCreateEvent?.()}>
                            Nouvel événement
                        </button>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default CalendarScheduler;
