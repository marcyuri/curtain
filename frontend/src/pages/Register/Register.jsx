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
import { useTranslation } from "react-i18next";

import Button from "@components/ui/Button";
import authService from "@services/authService";
import registerSchema from "@schemas/registerSchema";

import "./Register.css";

function Register() {

    const { t } = useTranslation();

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
                        {t("auth.register.title")}
                    </h1>

                    <p>
                        {t("auth.register.subtitle")}
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
                                placeholder={t("auth.register.firstNamePlaceholder")}
                                {...register("firstName")}
                            />

                        </label>

                        <label>

                            <User size={18} />

                            <input
                                type="text"
                                placeholder={t("auth.register.lastNamePlaceholder")}
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
                            placeholder={t("auth.register.phonePlaceholder")}
                            {...register("phone")}
                        />

                    </label>

                    <label>

                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder={t("auth.register.emailPlaceholder")}
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
                            placeholder={t("auth.register.passwordPlaceholder")}
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
                            placeholder={t("auth.register.confirmPasswordPlaceholder")}
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
                        {t("auth.register.acceptTerms")}

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

                        {isSubmitting ? t("auth.register.submitting") : t("auth.register.submit")}

                    </Button>

                </form>

                <footer className="register-card__footer">
                    {t("auth.register.hasAccount")}
                    <Link to="/login">
                        {t("auth.register.signIn")}
                    </Link>
                </footer>

            </div>

        </main>

    );

}

export default Register;
