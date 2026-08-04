import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";

import "./EventForm.css";

function EventForm({

    event = {},

    onChange,

}) {

    const handleField = (field) => (eventOrValue) => {
        const value = eventOrValue?.target
            ? eventOrValue.target.value
            : eventOrValue;

        onChange?.({
            ...event,
            [field]: value,
        });
    };

    return (
        <div className="event-form">

            <Input
                id="event-title"
                name="title"
                label="Titre"
                value={event.title ?? ""}
                onChange={handleField("title")}
                required
            />

            <Textarea
                id="event-description"
                name="description"
                label="Description"
                value={event.description ?? ""}
                onChange={handleField("description")}
                rows={4}
            />

            <div className="event-form__row">

                <Input
                    id="event-location"
                    name="location"
                    label="Lieu"
                    value={event.location ?? ""}
                    onChange={handleField("location")}
                />

                <Input
                    id="event-date"
                    name="date"
                    type="datetime-local"
                    label="Date et heure"
                    value={event.date ?? ""}
                    onChange={handleField("date")}
                    required
                />

            </div>

            <div className="event-form__row">

                <Input
                    id="event-capacity"
                    name="capacity"
                    type="number"
                    label="Capacité"
                    value={event.capacity ?? ""}
                    onChange={handleField("capacity")}
                />

                <Input
                    id="event-price"
                    name="price"
                    type="number"
                    label="Prix"
                    value={event.price ?? ""}
                    onChange={handleField("price")}
                />

            </div>

        </div>
    );
}

export default EventForm;
