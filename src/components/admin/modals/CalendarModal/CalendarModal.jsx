import {

    Calendar,

    Clock,

    MapPin,

    User,

} from "lucide-react";

import Modal from "../Modal";

import "./CalendarModal.css";

function CalendarModal({

    open = false,

    event,

    onClose,

    onEdit,

}) {

    if (!event) {

        return null;

    }

    return (

        <Modal

            open={open}

            width="800px"

            title={event.title}

            subtitle="Détails de l'évènement"

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="calendar-modal__secondary"

                        onClick={onClose}

                    >

                        Fermer

                    </button>

                    <button

                        type="button"

                        className="calendar-modal__primary"

                        onClick={() =>

                            onEdit?.(event)

                        }

                    >

                        Modifier

                    </button>

                </>

            }

        >

            <div className="calendar-modal">

                {

                    event.image && (

                        <img

                            src={event.image}

                            alt={event.title}

                            className="calendar-modal__image"

                        />

                    )

                }

                <div className="calendar-modal__details">

                    <div>

                        <Calendar size={18} />

                        <span>

                            {event.date}

                        </span>

                    </div>

                    <div>

                        <Clock size={18} />

                        <span>

                            {event.startTime}

                            {" - "}

                            {event.endTime}

                        </span>

                    </div>

                    <div>

                        <MapPin size={18} />

                        <span>

                            {event.location}

                        </span>

                    </div>

                    <div>

                        <User size={18} />

                        <span>

                            {event.organizer}

                        </span>

                    </div>

                </div>

                <section className="calendar-modal__description">

                    <h3>

                        Description

                    </h3>

                    <p>

                        {event.description}

                    </p>

                </section>

            </div>

        </Modal>

    );

}

export default CalendarModal;