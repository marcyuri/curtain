import { useState } from "react";

import {
    Mail,
    Send,
    CheckCircle2,
} from "lucide-react";

import Button from "../../common/Button";

import "./Newsletter.css";

function Newsletter({

    title = "Restez informé",

    description = "Recevez nos actualités, nos nouveaux produits, nos événements et nos conseils directement dans votre boîte mail.",

    loading = false,

    onSubscribe,

}) {

    const [email, setEmail] = useState("");

    const [success, setSuccess] = useState(false);

    const submit = (event) => {

        event.preventDefault();

        onSubscribe?.(email);

        setSuccess(true);

    };

    return (

        <section className="newsletter">

            <div className="newsletter__content">

                <header className="newsletter__header">

                    <span>

                        Newsletter

                    </span>

                    <h2>

                        {title}

                    </h2>

                    <p>

                        {description}

                    </p>

                </header>

                <form

                    className="newsletter__form"

                    onSubmit={submit}

                >

                    <div className="newsletter__input">

                        <Mail size={20} />

                        <input

                            type="email"

                            placeholder="Votre adresse e-mail"

                            value={email}

                            onChange={(event) =>

                                setEmail(event.target.value)

                            }

                            required

                        />

                    </div>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <Send size={18} />

                        {

                            loading

                                ? "Inscription..."

                                : "S'abonner"

                        }

                    </Button>

                </form>

                {

                    success && (

                        <div className="newsletter__success">

                            <CheckCircle2 size={20} />

                            Merci ! Votre inscription a bien été enregistrée.

                        </div>

                    )

                }

                <small>

                    En vous inscrivant, vous acceptez de recevoir les communications de LOVE CAN BUILD.
                    Vous pourrez vous désabonner à tout moment.

                </small>

            </div>

        </section>

    );

}

export default Newsletter;