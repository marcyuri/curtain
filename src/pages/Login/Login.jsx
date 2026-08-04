import { useState } from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    LogIn,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@components/ui/Button";
import useAuth from "@hooks/useAuth";
import loginSchema from "@schemas/loginSchema";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (values) => {

        setServerError("");

        const response = await login(values);

        if (response.success) {
            navigate("/");
            return;
        }

        setServerError(response.message);

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
                    onSubmit={handleSubmit(onSubmit)}
                    className="login-form"
                    noValidate
                >

                    {serverError && (
                        <p
                            className="login-form__error"
                            role="alert"
                        >
                            {serverError}
                        </p>
                    )}

                    <label>

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            {...register("email")}
                        />

                    </label>

                    {errors.email && (
                        <span className="login-form__field-error">
                            {errors.email.message}
                        </span>
                    )}

                    <label>

                        <Lock size={18} />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            {...register("password")}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >

                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}

                        </button>

                    </label>

                    {errors.password && (
                        <span className="login-form__field-error">
                            {errors.password.message}
                        </span>
                    )}

                    <div className="login-form__options">

                        <label>

                            <input
                                type="checkbox"
                                {...register("remember")}
                            />
                            Se souvenir de moi

                        </label>

                        <Link to="/forgot-password">
                            Mot de passe oublié ?
                        </Link>

                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >

                        <LogIn size={18} />

                        {isSubmitting ? "Connexion..." : "Se connecter"}

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
