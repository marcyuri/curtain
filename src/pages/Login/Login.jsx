import { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";

import "./Login.css";

function Login({

    loading = false,

    onSubmit,

}) {

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: "",

        remember: false,

    });

    const update = ({ target }) => {

        const {

            name,

            value,

            checked,

            type,

        } = target;

        setForm((previous) => ({

            ...previous,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        }));

    };

    const submit = (event) => {

        event.preventDefault();

        onSubmit?.(form);

    };

    return (

        <main className="login-page">

            <div className="login-card">

                <header className="login-card__header">

                    <span>

                        LOVE CAN BUILD

                    </span>

                    <h1>

                        Connexion

                    </h1>

                    <p>

                        Connectez-vous à votre espace personnel.

                    </p>

                </header>

                <form

                    onSubmit={submit}

                    className="login-form"

                >

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

                        <Lock size={18} />

                        <input

                            type={

                                showPassword

                                    ? "text"

                                    : "password"

                            }

                            name="password"

                            placeholder="Mot de passe"

                            value={form.password}

                            onChange={update}

                            required

                        />

                        <button

                            type="button"

                            onClick={() =>

                                setShowPassword(

                                    !showPassword

                                )

                            }

                        >

                            {

                                showPassword

                                    ? <EyeOff size={18} />

                                    : <Eye size={18} />

                            }

                        </button>

                    </label>

                    <div className="login-form__options">

                        <label>

                            <input

                                type="checkbox"

                                name="remember"

                                checked={form.remember}

                                onChange={update}

                            />

                            Se souvenir de moi

                        </label>

                        <Link

                            to="/forgot-password"

                        >

                            Mot de passe oublié ?

                        </Link>

                    </div>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <LogIn size={18} />

                        {

                            loading

                                ? "Connexion..."

                                : "Se connecter"

                        }

                    </Button>

                </form>

                <footer className="login-card__footer">

                    Vous n&apos;avez pas encore de compte ?

                    <Link to="/register">

                        Créer un compte

                    </Link>

                </footer>

            </div>

        </main>

    );

}

export default Login;