import {
    CalendarDays,
    Clock3,
    UserRound,
    CheckCircle2,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@components/ui/Button";
import CTASection from "@components/sections/CTASection";
import bookingSchema from "@schemas/bookingSchema";

import { specialists, timeSlots } from "./data";

import "./Booking.css";

function Booking() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            specialist: "",
            date: "",
            time: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            note: "",
        },
    });

    const onSubmit = async () => {

        // TODO: brancher sur bookingService une fois le backend disponible
        // (Document 07). Aucun endpoint de réservation n'existe encore.

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
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >

                    <div className="booking-form__group">

                        <label>
                            <UserRound size={18} />
                            Spécialiste
                        </label>

                        <select {...register("specialist")}>

                            <option value="">
                                Sélectionner
                            </option>

                            {specialists.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.name}
                                >
                                    {item.name}
                                </option>

                            ))}

                        </select>

                        {errors.specialist && (
                            <span className="booking-form__field-error">
                                {errors.specialist.message}
                            </span>
                        )}

                    </div>

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>
                                <CalendarDays size={18} />
                                Date
                            </label>

                            <input
                                type="date"
                                {...register("date")}
                            />

                            {errors.date && (
                                <span className="booking-form__field-error">
                                    {errors.date.message}
                                </span>
                            )}

                        </div>

                        <div className="booking-form__group">

                            <label>
                                <Clock3 size={18} />
                                Heure
                            </label>

                            <select {...register("time")}>

                                <option value="">
                                    Choisir
                                </option>

                                {timeSlots.map((slot) => (

                                    <option
                                        key={slot}
                                        value={slot}
                                    >
                                        {slot}
                                    </option>

                                ))}

                            </select>

                            {errors.time && (
                                <span className="booking-form__field-error">
                                    {errors.time.message}
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>
                                Prénom
                            </label>

                            <input
                                type="text"
                                {...register("firstName")}
                            />

                        </div>

                        <div className="booking-form__group">

                            <label>
                                Nom
                            </label>

                            <input
                                type="text"
                                {...register("lastName")}
                            />

                        </div>

                    </div>

                    {(errors.firstName || errors.lastName) && (
                        <span className="booking-form__field-error">
                            {errors.firstName?.message ?? errors.lastName?.message}
                        </span>
                    )}

                    <div className="booking-form__row">

                        <div className="booking-form__group">

                            <label>
                                Téléphone
                            </label>

                            <input
                                type="tel"
                                {...register("phone")}
                            />

                        </div>

                        <div className="booking-form__group">

                            <label>
                                E-mail
                            </label>

                            <input
                                type="email"
                                {...register("email")}
                            />

                        </div>

                    </div>

                    {(errors.phone || errors.email) && (
                        <span className="booking-form__field-error">
                            {errors.phone?.message ?? errors.email?.message}
                        </span>
                    )}

                    <div className="booking-form__group">

                        <label>
                            Informations complémentaires
                        </label>

                        <textarea
                            rows="6"
                            {...register("note")}
                        />

                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >
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
