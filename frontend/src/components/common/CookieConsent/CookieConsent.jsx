import { useEffect, useState } from "react";
import { Cookie, Settings, Check, X } from "lucide-react";

import Button from "../../ui/Button";

import "./CookieConsent.css";

const DEFAULT_PREFERENCES = {
    necessary: true,
    preferences: false,
    analytics: false,
    marketing: false,
};

const STORAGE_KEY = "cookie-consent";

function CookieConsent({

    title = "Gestion des cookies",

    description =
    "Nous utilisons des cookies afin d'améliorer votre expérience, mesurer l'audience et personnaliser certains contenus.",

    onAccept,

    onReject,

    onSave,

}) {

    const [visible, setVisible] = useState(false);

    const [showSettings, setShowSettings] = useState(false);

    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

    useEffect(() => {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {

            setVisible(true);

            return;

        }

        setPreferences(JSON.parse(saved));

    }, []);

    const savePreferences = (values) => {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(values)

        );

        setPreferences(values);

        setVisible(false);

        onSave?.(values);

    };

    const acceptAll = () => {

        const values = {

            necessary: true,

            preferences: true,

            analytics: true,

            marketing: true,

        };

        savePreferences(values);

        onAccept?.(values);

    };

    const rejectAll = () => {

        const values = {

            necessary: true,

            preferences: false,

            analytics: false,

            marketing: false,

        };

        savePreferences(values);

        onReject?.(values);

    };

    const toggle = (key) => {

        if (key === "necessary") {

            return;

        }

        setPreferences((previous) => ({

            ...previous,

            [key]: !previous[key],

        }));

    };

    if (!visible) {

        return null;

    }

    return (

        <aside className="cookie-consent">

            <div className="cookie-consent__header">

                <Cookie size={26} />

                <div>

                    <h3>{title}</h3>

                    <p>{description}</p>

                </div>

            </div>

            {showSettings && (

                <div className="cookie-consent__settings">

                    {Object.entries(preferences).map(([key, value]) => (

                        <label

                            key={key}

                            className="cookie-consent__option"

                        >

                            <div>

                                <strong>

                                    {key.charAt(0).toUpperCase() + key.slice(1)}

                                </strong>

                            </div>

                            <input

                                type="checkbox"

                                checked={value}

                                disabled={key === "necessary"}

                                onChange={() => toggle(key)}

                            />

                        </label>

                    ))}

                </div>

            )}

            <div className="cookie-consent__actions">

                <Button

                    variant="ghost"

                    onClick={() =>

                        setShowSettings(!showSettings)

                    }

                >

                    <Settings size={18} />

                    Paramètres

                </Button>

                <Button

                    variant="outline"

                    onClick={rejectAll}

                >

                    <X size={18} />

                    Refuser

                </Button>

                <Button

                    onClick={() =>

                        savePreferences(preferences)

                    }

                >

                    <Check size={18} />

                    Enregistrer

                </Button>

                <Button

                    onClick={acceptAll}

                >

                    Tout accepter

                </Button>

            </div>

        </aside>

    );

}

export default CookieConsent;