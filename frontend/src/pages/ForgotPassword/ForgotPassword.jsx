import { useState } from "react";

import {
    Mail,
    ArrowLeft,
    KeyRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";

import "./ForgotPassword.css";

function ForgotPassword({

    loading = false,

    onSubmit,

}) {

    const [email, setEmail] = useState("");

    const submit = (event) => {

        event.preventDefault();

        onSubmit?.({

            email,

        });

    };

    return (

        <main className="forgot-password-page">

            <div className="forgot-password-card">

                <header className="forgot-password-card__header">

                    <span>

                        LOVE CAN BUILD

                    </span>

                    <h1>

                        Mot de passe oublié

                    </h1>

                    <p>

                        Saisissez votre adresse e-mail afin de recevoir un lien de réinitialisation.

                    </p>

                </header>

                <form

                    className="forgot-password-form"

                    onSubmit={submit}

                >

                    <label>

                        <Mail size={18} />

                        <input

                            type="email"

                            placeholder="Adresse e-mail"

                            value={email}

                            onChange={(event) =>

                                setEmail(event.target.value)

                            }

                            required

                        />

                    </label>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <KeyRound size={18} />

                        {

                            loading

                                ? "Envoi..."

                                : "Envoyer le lien"

                        }

                    </Button>

                </form>

                <footer className="forgot-password-card__footer">

                    <Link to="/login">

                        <ArrowLeft size={16} />

                        Retour à la connexion

                    </Link>

                </footer>

            </div>

        </main>

    );

}

export default ForgotPassword;