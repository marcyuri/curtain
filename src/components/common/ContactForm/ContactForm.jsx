import { useState } from "react";
import {
    Send,
    Paperclip
} from "lucide-react";

import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";

import "./ContactForm.css";

function ContactForm({

    categories = [],

    loading = false,

    onSubmit,

    className = ""

}) {

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        subject: "",

        category: "",

        message: "",

        file: null

    });

    const [feedback, setFeedback] = useState(null);

    const update = (field, value) => {

        setForm(previous => ({

            ...previous,

            [field]: value

        }));

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setFeedback(null);

        if (
            !form.firstName ||
            !form.lastName ||
            !form.email ||
            !form.subject ||
            !form.message
        ) {

            setFeedback({

                type: "error",

                text: "Veuillez compléter tous les champs obligatoires."

            });

            return;

        }

        try {

            await onSubmit?.(form);

            setFeedback({

                type: "success",

                text: "Votre message a bien été envoyé."

            });

            setForm({

                firstName: "",

                lastName: "",

                email: "",

                phone: "",

                subject: "",

                category: "",

                message: "",

                file: null

            });

        }

        catch {

            setFeedback({

                type: "error",

                text: "Une erreur est survenue."

            });

        }

    };

    return (

        <section className={`contact-form ${className}`}>

            <form
                onSubmit={handleSubmit}
            >

                <div className="contact-form__grid">

                    <Input
                        label="Prénom"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                    />

                    <Input
                        label="Nom"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                    />

                    <Input
                        type="email"
                        label="Email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                    />

                    <Input
                        label="Téléphone"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                    />

                    <Input
                        label="Sujet"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                    />

                    <Select
                        label="Catégorie"
                        value={form.category}
                        onChange={(e) => update("category", e.target.value)}
                        options={categories}
                    />

                </div>

                <Textarea

                    label="Message"

                    rows={7}

                    value={form.message}

                    onChange={(e) =>

                        update("message", e.target.value)

                    }

                />

                <label className="contact-form__file">

                    <Paperclip size={18} />

                    Ajouter une pièce jointe

                    <input

                        type="file"

                        hidden

                        onChange={(e) =>

                            update("file", e.target.files[0])

                        }

                    />

                </label>

                {feedback && (

                    <Alert variant={feedback.type}>

                        {feedback.text}

                    </Alert>

                )}

                <Button

                    type="submit"

                    loading={loading}

                >

                    <Send size={18} />

                    Envoyer

                </Button>

            </form>

        </section>

    );

}

export default ContactForm;