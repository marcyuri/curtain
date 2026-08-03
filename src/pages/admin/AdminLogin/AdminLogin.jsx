import { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
    ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../../../components/common/Button";

import "./AdminLogin.css";

function AdminLogin({

    loading = false,

    onSubmit,

}) {

    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: "",

        remember: true,

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

        <main className="admin-login">

            <div className="admin-login__card">

                <div className="admin-login__icon">

                    <ShieldCheck size={60} />

                </div>

                <span className="admin-login__badge">

                    LOVE CAN BUILD

                </span>

                <h1>

                    Back Office

                </h1>

                <p>

                    Connectez-vous avec votre compte administrateur ou employé.

                </p>

                <form

                    className="admin-login__form"

                    onSubmit={submit}

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

                    <div className="admin-login__options">

                        <label>

                            <input

                                type="checkbox"

                                name="remember"

                                checked={form.remember}

                                onChange={update}

                            />

                            Garder ma session

                        </label>

                        <Link

                            to="/admin/forgot-password"

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

            </div>

        </main>

    );

}

export default AdminLogin;