import { useMemo, useState } from "react";
import {
    Calendar,
    Clock,
    User,
    Video,
    Building2,
    Paperclip,
    CheckCircle
} from "lucide-react";

import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import Radio from "../../ui/Radio";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";

import "./AppointmentForm.css";

function AppointmentForm({

    specialists = [],

    consultationTypes = [],

    availableSlots = [],

    loading = false,

    onSubmit,

    className = ""

}) {

    const [step, setStep] = useState(1);

    const [feedback, setFeedback] = useState(null);

    const [form, setForm] = useState({

        specialist: "",

        consultationType: "",

        mode: "onsite",

        date: "",

        slot: "",

        duration: "",

        firstName: "",

        lastName: "",

        phone: "",

        email: "",

        reason: "",

        attachment: null

    });

    const update = (field, value) => {

        setForm(previous => ({

            ...previous,

            [field]: value

        }));

    };

    const slots = useMemo(() => {

        if (!form.date) {

            return [];

        }

        return availableSlots.filter(

            slot => slot.date === form.date

        );

    }, [availableSlots, form.date]);

    const next = () => setStep(step => Math.min(step + 1, 3));

    const previous = () => setStep(step => Math.max(step - 1, 1));

    const submit = async event => {

        event.preventDefault();

        setFeedback(null);

        try {

            await onSubmit?.(form);

            setFeedback({

                type: "success",

                text: "Votre demande de rendez-vous a été envoyée."

            });

        }

        catch {

            setFeedback({

                type: "error",

                text: "Impossible d'envoyer votre demande."

            });

        }

    };

    return (

        <section className={`appointment-form ${className}`}>

            <Card>

                <form onSubmit={submit}>

                    {step === 1 && (

                        <div className="appointment-form__section">

                            <h2>

                                <User size={22} />

                                Consultation

                            </h2>

                            <Select
                                label="Spécialiste"
                                value={form.specialist}
                                options={specialists}
                                onChange={e => update("specialist", e.target.value)}
                            />

                            <Select
                                label="Type de consultation"
                                value={form.consultationType}
                                options={consultationTypes}
                                onChange={e => update("consultationType", e.target.value)}
                            />

                            <div className="appointment-form__radio">

                                <Radio
                                    label="Présentiel"
                                    checked={form.mode === "onsite"}
                                    onChange={() => update("mode", "onsite")}
                                    icon={<Building2 size={18} />}
                                />

                                <Radio
                                    label="En ligne"
                                    checked={form.mode === "online"}
                                    onChange={() => update("mode", "online")}
                                    icon={<Video size={18} />}
                                />

                            </div>

                        </div>

                    )}

                    {step === 2 && (

                        <div className="appointment-form__section">

                            <h2>

                                <Calendar size={22} />

                                Date

                            </h2>

                            <Input
                                type="date"
                                value={form.date}
                                onChange={e => update("date", e.target.value)}
                            />

                            <Select
                                label="Créneau"
                                value={form.slot}
                                options={slots.map(slot => ({

                                    label: slot.time,

                                    value: slot.time

                                }))}
                                onChange={e => update("slot", e.target.value)}
                            />

                            <Input
                                label="Durée"

                                value={form.duration}

                                placeholder="60 min"

                                onChange={e => update("duration", e.target.value)}
                            />

                        </div>

                    )}

                    {step === 3 && (

                        <div className="appointment-form__section">

                            <h2>

                                <CheckCircle size={22} />

                                Informations

                            </h2>

                            <div className="appointment-form__grid">

                                <Input
                                    label="Prénom"
                                    value={form.firstName}
                                    onChange={e => update("firstName", e.target.value)}
                                />

                                <Input
                                    label="Nom"
                                    value={form.lastName}
                                    onChange={e => update("lastName", e.target.value)}
                                />

                                <Input
                                    label="Téléphone"
                                    value={form.phone}
                                    onChange={e => update("phone", e.target.value)}
                                />

                                <Input
                                    type="email"
                                    label="Email"
                                    value={form.email}
                                    onChange={e => update("email", e.target.value)}
                                />

                            </div>

                            <Textarea

                                label="Motif"

                                rows={6}

                                value={form.reason}

                                onChange={e => update("reason", e.target.value)}

                            />

                            <label className="appointment-form__file">

                                <Paperclip size={18} />

                                Ajouter un document

                                <input

                                    type="file"

                                    hidden

                                    onChange={e => update("attachment", e.target.files[0])}

                                />

                            </label>

                        </div>

                    )}

                    {feedback && (

                        <Alert variant={feedback.type}>

                            {feedback.text}

                        </Alert>

                    )}

                    <div className="appointment-form__actions">

                        {step > 1 && (

                            <Button

                                type="button"

                                variant="secondary"

                                onClick={previous}

                            >

                                Retour

                            </Button>

                        )}

                        {step < 3 ? (

                            <Button

                                type="button"

                                onClick={next}

                            >

                                Suivant

                            </Button>

                        ) : (

                            <Button

                                type="submit"

                                loading={loading}

                            >

                                <Clock size={18} />

                                Confirmer le rendez-vous

                            </Button>

                        )}

                    </div>

                </form>

            </Card>

        </section>

    );

}

export default AppointmentForm;