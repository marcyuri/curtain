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

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@components/ui/Button";
import authService from "@services/authService";
import registerSchema from "@schemas/registerSchema";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    const onSubmit = async (values) => {

        setServerError("");

        const response = await authService.register(values);

        if (response.success) {
            navigate("/login");
            return;
        }

        setServerError(response.message);

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
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >

                    {serverError && (
                        <p
                            className="register-form__error"
                            role="alert"
                        >
                            {serverError}
                        </p>
                    )}

                    <div className="register-form__row">

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

                    </div>

                    {(errors.firstName || errors.lastName) && (
                        <span className="register-form__field-error">
                            {errors.firstName?.message ?? errors.lastName?.message}
                        </span>
                    )}

                    <label>

                        <Phone size={18} />

                        <input
                            type="tel"
                            placeholder="Téléphone"
                            {...register("phone")}
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

                    {errors.email && (
                        <span className="register-form__field-error">
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
                        <span className="register-form__field-error">
                            {errors.password.message}
                        </span>
                    )}

                    <label>

                        <Lock size={18} />

                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmer le mot de passe"
                            {...register("confirmPassword")}
                        />

                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >

                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}

                        </button>

                    </label>

                    {errors.confirmPassword && (
                        <span className="register-form__field-error">
                            {errors.confirmPassword.message}
                        </span>
                    )}

                    <label className="register-form__checkbox">

                        <input
                            type="checkbox"
                            {...register("acceptTerms")}
                        />
                        J&apos;accepte les conditions d&apos;utilisation.

                    </label>

                    {errors.acceptTerms && (
                        <span className="register-form__field-error">
                            {errors.acceptTerms.message}
                        </span>
                    )}

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >

                        <UserPlus size={18} />

                        {isSubmitting ? "Création..." : "Créer mon compte"}

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
