import {
    User,
    Mail,
    Phone,
    MessageSquare,
    FileText,
    Send,
    Paperclip,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@components/ui/Button";
import contactSchema from "@schemas/contactSchema";

import "./ContactForm.css";

function ContactForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    const attachment = watch("attachment");

    const onSubmit = async () => {

        // TODO: brancher sur contactService une fois le backend disponible
        // (Document 07). Aucun endpoint de contact n'existe encore.

    };

    return (

        <form
            className="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
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
                        placeholder="Prénom"
                        {...register("firstName")}
                    />

                </label>

                <label>

                    <User size={18} />

                    <input
                        type="text"
                        placeholder="Nom"
                        {...register("lastName")}
                    />

                </label>

                <label>

                    <Mail size={18} />

                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        {...register("email")}
                    />

                </label>

                <label>

                    <Phone size={18} />

                    <input
                        type="tel"
                        placeholder="Téléphone"
                        {...register("phone")}
                    />

                </label>

            </div>

            {(errors.firstName || errors.lastName || errors.email) && (
                <span className="contact-form__field-error">
                    {errors.firstName?.message ?? errors.lastName?.message ?? errors.email?.message}
                </span>
            )}

            <label>

                <FileText size={18} />

                <input
                    type="text"
                    placeholder="Sujet"
                    {...register("subject")}
                />

            </label>

            {errors.subject && (
                <span className="contact-form__field-error">
                    {errors.subject.message}
                </span>
            )}

            <label>

                <MessageSquare size={18} />

                <textarea
                    rows="8"
                    placeholder="Votre message..."
                    {...register("message")}
                />

            </label>

            {errors.message && (
                <span className="contact-form__field-error">
                    {errors.message.message}
                </span>
            )}

            <label className="contact-form__file">

                <Paperclip size={18} />

                <span>
                    {attachment?.[0]?.name ?? "Ajouter une pièce jointe"}
                </span>

                <input
                    type="file"
                    {...register("attachment")}
                />

            </label>

            <Button
                type="submit"
                disabled={isSubmitting}
            >

                <Send size={18} />

                {isSubmitting ? "Envoi..." : "Envoyer le message"}

            </Button>

        </form>

    );

}

export default ContactForm;
