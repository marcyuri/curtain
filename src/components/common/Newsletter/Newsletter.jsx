import { useState } from "react";
import {
    Mail,
    Send
} from "lucide-react";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Alert from "../../ui/Alert";

import "./Newsletter.css";

function Newsletter({

    title = "Restez informé",

    subtitle = "Recevez nos nouveautés, événements et conseils directement par email.",

    illustration,

    variant = "card",

    loading = false,

    onSubmit,

    className = ""

}) {

    const [email, setEmail] = useState("");

    const [accepted, setAccepted] = useState(false);

    const [message, setMessage] = useState(null);

    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage(null);

        if (!email.trim()) {

            setMessage({

                type: "error",

                text: "Veuillez saisir une adresse email."

            });

            return;

        }

        if (!accepted) {

            setMessage({

                type: "error",

                text: "Veuillez accepter la politique de confidentialité."

            });

            return;

        }

        try {

            await onSubmit?.({

                email

            });

            setMessage({

                type: "success",

                text: "Votre inscription a été enregistrée."

            });

            setEmail("");

            setAccepted(false);

        }

        catch {

            setMessage({

                type: "error",

                text: "Impossible de finaliser votre inscription."

            });

        }

    };

    return (

        <section

            className={`newsletter newsletter--${variant} ${className}`}

        >

            {illustration && (

                <div className="newsletter__image">

                    <img

                        src={illustration}

                        alt="Newsletter"

                    />

                </div>

            )}

            <div className="newsletter__content">

                <div className="newsletter__header">

                    <Mail size={40} />

                    <h2>

                        {title}

                    </h2>

                    <p>

                        {subtitle}

                    </p>

                </div>

                {message && (

                    <Alert

                        variant={message.type}

                    >

                        {message.text}

                    </Alert>

                )}

                <form

                    className="newsletter__form"

                    onSubmit={handleSubmit}

                >

                    <Input

                        type="email"

                        placeholder="Votre adresse email"

                        value={email}

                        onChange={(event) =>

                            setEmail(event.target.value)

                        }

                    />

                    <Checkbox

                        checked={accepted}

                        onChange={(event) =>

                            setAccepted(event.target.checked)

                        }

                        label="J'accepte la politique de confidentialité."

                    />

                    <Button

                        type="submit"

                        loading={loading}

                        fullWidth

                    >

                        <Send size={18} />

                        S'abonner

                    </Button>

                </form>

            </div>

        </section>

    );

}

export default Newsletter;