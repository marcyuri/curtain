import { useState } from "react";

import {

    ShieldCheck,

    Lock,

    Eye,

    EyeOff,

    ArrowRight,

} from "lucide-react";

import Button from "../../../components/common/Button";

import "./AdminAccess.css";

function AdminAccess({

    loading = false,

    onSubmit,

}) {

    const [code, setCode] = useState("");

    const [showCode, setShowCode] = useState(false);

    const submit = (event) => {

        event.preventDefault();

        onSubmit?.({

            code,

        });

    };

    return (

        <main className="admin-access">

            <div className="admin-access__card">

                <div className="admin-access__logo">

                    <ShieldCheck size={60} />

                </div>

                <span className="admin-access__badge">

                    LOVE CAN BUILD

                </span>

                <h1>

                    Accès sécurisé

                </h1>

                <p>

                    Entrez le code d'accès du Back Office avant de continuer.

                </p>

                <form

                    onSubmit={submit}

                    className="admin-access__form"

                >

                    <label>

                        <Lock size={18} />

                        <input

                            type={

                                showCode

                                    ? "text"

                                    : "password"

                            }

                            placeholder="Code d'accès"

                            value={code}

                            onChange={(event) =>

                                setCode(

                                    event.target.value

                                )

                            }

                            required

                        />

                        <button

                            type="button"

                            onClick={() =>

                                setShowCode(

                                    !showCode

                                )

                            }

                        >

                            {

                                showCode

                                    ? <EyeOff size={18} />

                                    : <Eye size={18} />

                            }

                        </button>

                    </label>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        <ArrowRight size={18} />

                        {

                            loading

                                ? "Vérification..."

                                : "Continuer"

                        }

                    </Button>

                </form>

            </div>

        </main>

    );

}

export default AdminAccess;