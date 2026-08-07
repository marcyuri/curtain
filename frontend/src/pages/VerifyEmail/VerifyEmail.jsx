import { useEffect, useState } from "react";

import {
    LoaderCircle,
    CircleCheckBig,
    CircleX,
    MailCheck,
} from "lucide-react";

import { Link, useSearchParams } from "react-router-dom";

import Button from "../../components/ui/Button";

import "./VerifyEmail.css";

function VerifyEmail({

    onVerify,

}) {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");

    useEffect(() => {

        let mounted = true;

        async function verify() {

            try {

                if (onVerify) {

                    await onVerify(token);

                }

                if (mounted) {

                    setStatus("success");

                }

            } catch {

                if (mounted) {

                    setStatus("error");

                }

            }

        }

        verify();

        return () => {

            mounted = false;

        };

    }, [

        token,

        onVerify,

    ]);

    return (

        <main className="verify-email-page">

            <div className="verify-email-card">

                {

                    status === "loading" && (

                        <>

                            <LoaderCircle

                                size={70}

                                className="verify-email__loading"

                            />

                            <h1>

                                Vérification...

                            </h1>

                            <p>

                                Vérification de votre adresse e-mail en cours.

                            </p>

                        </>

                    )

                }

                {

                    status === "success" && (

                        <>

                            <CircleCheckBig

                                size={70}

                                className="verify-email__success"

                            />

                            <h1>

                                Adresse vérifiée

                            </h1>

                            <p>

                                Votre compte est maintenant activé.

                            </p>

                            <Button

                                as={Link}

                                to="/login"

                            >

                                <MailCheck size={18} />

                                Se connecter

                            </Button>

                        </>

                    )

                }

                {

                    status === "error" && (

                        <>

                            <CircleX

                                size={70}

                                className="verify-email__error"

                            />

                            <h1>

                                Vérification impossible

                            </h1>

                            <p>

                                Le lien est invalide ou a expiré.

                            </p>

                            <Button

                                as={Link}

                                to="/register"

                            >

                                Retour à l&apos;inscription

                            </Button>

                        </>

                    )

                }

            </div>

        </main>

    );

}

export default VerifyEmail;