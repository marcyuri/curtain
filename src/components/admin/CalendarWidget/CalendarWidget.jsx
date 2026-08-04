import {

    Calendar,

    Clock3,

    ChevronLeft,

    ChevronRight,

} from "lucide-react";

import calendarEvents from "./calendarData";

import "./CalendarWidget.css";

function CalendarWidget() {

    return (

        <section className="calendar-widget">

            <header className="calendar-widget__header">

                <div>

                    <h2>

                        Agenda

                    </h2>

                    <p>

                        Aujourd&apos;hui

                    </p>

                </div>

                <div className="calendar-widget__actions">

                    <button>

                        <ChevronLeft size={18} />

                    </button>

                    <button>

                        <ChevronRight size={18} />

                    </button>

                </div>

            </header>

            <div className="calendar-widget__calendar">

                <Calendar

                    size={70}

                />

                <h3>

                    02

                </h3>

                <span>

                    Août 2026

                </span>

            </div>

            <div className="calendar-widget__events">

                {

                    calendarEvents.map((event) => (

                        <article

                            key={event.id}

                            className={`calendar-event calendar-event--${event.type}`}

                        >

                            <div>

                                <Clock3

                                    size={16}

                                />

                                {event.time}

                            </div>

                            <h4>

                                {event.title}

                            </h4>

                        </article>

                    ))

                }

            </div>

        </section>

    );

}

export default CalendarWidget;