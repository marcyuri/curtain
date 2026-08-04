import { useState } from "react";

import {
    User,
    Mail,
    Phone,
    MessageSquare,
    FileText,
    Send,
    Paperclip,
} from "lucide-react";

import Button from "../../ui/Button";

import "./ContactForm.css";

const INITIAL_FORM = {

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    subject: "",

    message: "",

    attachment: null,

};

function ContactForm({

    loading = false,

    onSubmit,

}) {

    const [form, setForm] = useState(INITIAL_FORM);

    const update = (event) => {

        const {

            name,

            value,

            files,

            type,

        } = event.target;

        setForm((previous) => ({

            ...previous,

            [name]:

                type === "file"

                    ? files[0] || null

                    : value,

        }));

    };

    const submit = (event) => {

        event.preventDefault();

        onSubmit?.(form);

    };

    return (

        <form

            className="contact-form"

            onSubmit={submit}

        >

            <header className="contact-form__header">

                <h2>

                    Contactez-nous

                </h2>

                <p>

                    Nous vous répondrons dans les meilleurs délais.

                </p>

            </header>

            <div className="contact-form__grid">

                <label>

                    <User size={18} />

                    <input

                        type="text"

                        name="firstName"

                        placeholder="Prénom"

                        value={form.firstName}

                        onChange={update}

                        required

                    />

                </label>

                <label>

                    <User size={18} />

                    <input

                        type="text"

                        name="lastName"

                        placeholder="Nom"

                        value={form.lastName}

                        onChange={update}

                        required

                    />

                </label>

                <label>

                    <Mail size={18} />

                    <input

                        type="email"

                        name="email"

                        placeholder="Adresse e-mail"

                        value={form.email}

                        onChange={update}

                        required

                    />

                </label>

                <label>

                    <Phone size={18} />

                    <input

                        type="tel"

                        name="phone"

                        placeholder="Téléphone"

                        value={form.phone}

                        onChange={update}

                    />

                </label>

            </div>

            <label>

                <FileText size={18} />

                <input

                    type="text"

                    name="subject"

                    placeholder="Sujet"

                    value={form.subject}

                    onChange={update}

                    required

                />

            </label>

            <label>

                <MessageSquare size={18} />

                <textarea

                    name="message"

                    rows="8"

                    placeholder="Votre message..."

                    value={form.message}

                    onChange={update}

                    required

                />

            </label>

            <label className="contact-form__file">

                <Paperclip size={18} />

                <span>

                    {form.attachment
                        ? form.attachment.name
                        : "Ajouter une pièce jointe"}

                </span>

                <input

                    type="file"

                    name="attachment"

                    onChange={update}

                />

            </label>

            <Button

                type="submit"

                disabled={loading}

            >

                <Send size={18} />

                {loading

                    ? "Envoi..."

                    : "Envoyer le message"}

            </Button>

        </form>

    );

}

export default ContactForm;