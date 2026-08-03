import { useState } from "react";

import {
    CalendarDays,
    Clock3,
    UserRound,
    CheckCircle2,
} from "lucide-react";

import Button from "../../components/common/Button";
import CTASection from "../../components/sections/CTASection";

import {

    specialists,

    timeSlots,

} from "./data";

import "./Booking.css";

const INITIAL_FORM = {

    specialist: "",

    date: "",

    time: "",

    firstName: "",

    lastName: "",

    phone: "",

    email: "",

    note: "",

};

function Booking() {

    const [form, setForm] = useState(INITIAL_FORM);

    const update = ({ target }) => {

        setForm((previous) => ({

            ...previous,

            [target.name]: target.value,

        }));

    };

    const submit = (event) => {

        event.preventDefault();

        console.log(form);

    };

    return (

        <main className="booking-page">

            <section className="booking-page__hero">

                <span>

                    LOVE CAN BUILD

                </span>

                <h1>

                    Réserver une consultation

                </h1>

                <p>

                    Choisissez votre spécialiste, votre date et votre créneau horaire.

                </p>

            </section>

            <section className="booking-page__container">

                <form

                    className="booking-form"

                    onSubmit={submit}

                >

                    <div className="booking-form__group">

                        <label>

                            <UserRound size={18} />

                            Spécialiste

                        </label>

                        <select

                            name="specialist"

                            value={form.specialist}

                            onChange={update}

                            required

                        >

                            <option value="">

                                Sélectionner

                            </option>

                            {

                                specialists.map((item) => (

                                    <option

                                        key={item.id}

                                        value={item.name}

                                    >

                                        {item.name}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>

                                <CalendarDays size={18} />

                                Date

                            </label>

                            <input

                                type="date"

                                name="date"

                                value={form.date}

                                onChange={update}

                                required

                            />

                        </div>

                        <div className="booking-form__group">

                            <label>

                                <Clock3 size={18} />

                                Heure

                            </label>

                            <select

                                name="time"

                                value={form.time}

                                onChange={update}

                                required

                            >

                                <option value="">

                                    Choisir

                                </option>

                                {

                                    timeSlots.map((slot) => (

                                        <option

                                            key={slot}

                                            value={slot}

                                        >

                                            {slot}

                                        </option>

                                    ))

                                }

                            </select>

                        </div>

                    </div>

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>

                                Prénom

                            </label>

                            <input

                                type="text"

                                name="firstName"

                                value={form.firstName}

                                onChange={update}

                                required

                            />

                        </div>

                        <div className="booking-form__group">

                            <label>

                                Nom

                            </label>

                            <input

                                type="text"

                                name="lastName"

                                value={form.lastName}

                                onChange={update}

                                required

                            />

                        </div>

                    </div>

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>

                                Téléphone

                            </label>

                            <input

                                type="tel"

                                name="phone"

                                value={form.phone}

                                onChange={update}

                                required

                            />

                        </div>

                        <div className="booking-form__group">

                            <label>

                                E-mail

                            </label>

                            <input

                                type="email"

                                name="email"

                                value={form.email}

                                onChange={update}

                                required

                            />

                        </div>

                    </div>

                    <div className="booking-form__group">

                        <label>

                            Informations complémentaires

                        </label>

                        <textarea

                            rows="6"

                            name="note"

                            value={form.note}

                            onChange={update}

                        />

                    </div>

                    <Button type="submit">

                        <CheckCircle2 size={18} />

                        Confirmer la réservation

                    </Button>

                </form>

            </section>

            <CTASection />

        </main>

    );

}

export default Booking;