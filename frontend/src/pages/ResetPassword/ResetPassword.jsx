import { useState } from "react";

import {
    Lock,
    Eye,
    EyeOff,
    KeyRound,
} from "lucide-react";

import { useSearchParams } from "react-router-dom";

import Button from "../../components/ui/Button";

import "./ResetPassword.css";

function ResetPassword({

    loading = false,

    onSubmit,

}) {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({

        password: "",

        confirmPassword: "",

    });

    const update = ({ target }) => {

        setForm((previous) => ({

            ...previous,

            [target.name]: target.value,

        }));

    };

    const submit = (event) => {

        event.preventDefault();

        onSubmit?.({

            token,

            ...form,

        });

    };

    return (

        <main className="reset-password-page">

            <div className="reset-password-card">

                <header className="reset-password-card__header">

                    <span>

                        LOVE CAN BUILD

                    </span>

                    <h1>

                        Nouveau mot de passe

                    </h1>

                    <p>

                        Choisissez un nouveau mot de passe sécurisé.

                    </p>

                </header>

                <form

                    className="reset-password-form"

                    onSubmit={submit}

                >

                    <label>

                        <Lock size={18} />

                        <input

                            type={

                                showPassword

                                    ? "text"

                                    : "password"

                            }

                            name="password"

                            placeholder="Nouveau mot de passe"

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

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <KeyRound size={18} />

                        {

                            loading

                                ? "Enregistrement..."

                                : "Mettre à jour le mot de passe"

                        }

                    </Button>

                </form>

            </div>

        </main>

    );

}

export default ResetPassword;