import { useState } from "react";

import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    UserPlus,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";

import "./Register.css";

function Register({

    loading = false,

    onSubmit,

}) {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        phone: "",

        email: "",

        password: "",

        confirmPassword: "",

        acceptTerms: false,

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

        <main className="register-page">

            <div className="register-card">

                <header className="register-card__header">

                    <span>

                        LOVE CAN BUILD

                    </span>

                    <h1>

                        Créer un compte

                    </h1>

                    <p>

                        Rejoignez notre communauté.

                    </p>

                </header>

                <form

                    className="register-form"

                    onSubmit={submit}

                >

                    <div className="register-form__row">

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

                    </div>

                    <label>

                        <Phone size={18} />

                        <input

                            type="tel"

                            name="phone"

                            placeholder="Téléphone"

                            value={form.phone}

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

                    <label>

                        <Lock size={18} />

                        <input

                            type={

                                showConfirmPassword

                                    ? "text"

                                    : "password"

                            }

                            name="confirmPassword"

                            placeholder="Confirmer le mot de passe"

                            value={form.confirmPassword}

                            onChange={update}

                            required

                        />

                        <button

                            type="button"

                            onClick={() =>

                                setShowConfirmPassword(

                                    !showConfirmPassword

                                )

                            }

                        >

                            {

                                showConfirmPassword

                                    ? <EyeOff size={18} />

                                    : <Eye size={18} />

                            }

                        </button>

                    </label>

                    <label className="register-form__checkbox">

                        <input

                            type="checkbox"

                            name="acceptTerms"

                            checked={form.acceptTerms}

                            onChange={update}

                            required

                        />

                        J&apos;accepte les conditions d&apos;utilisation.

                    </label>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <UserPlus size={18} />

                        {

                            loading

                                ? "Création..."

                                : "Créer mon compte"

                        }

                    </Button>

                </form>

                <footer className="register-card__footer">

                    Vous avez déjà un compte ?

                    <Link to="/login">

                        Se connecter

                    </Link>

                </footer>

            </div>

        </main>

    );

}

export default Register;