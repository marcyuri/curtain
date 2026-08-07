import { useEffect, useState } from "react";

import {
    Moon,
    Sun,
    Monitor,
} from "lucide-react";

import "./ThemeSwitcher.css";

const STORAGE_KEY = "theme";

const THEMES = [
    {
        value: "light",
        label: "Clair",
        icon: Sun,
    },
    {
        value: "dark",
        label: "Sombre",
        icon: Moon,
    },
    {
        value: "system",
        label: "Système",
        icon: Monitor,
    },
];

function ThemeSwitcher({

    defaultTheme = "system",

    onChange,

}) {

    const [theme, setTheme] = useState(defaultTheme);

    useEffect(() => {

        const savedTheme = localStorage.getItem(STORAGE_KEY);

        if (savedTheme) {

            applyTheme(savedTheme);

            return;

        }

        applyTheme(defaultTheme);

    }, []);

    const applyTheme = (value) => {

        let currentTheme = value;

        if (value === "system") {

            currentTheme = window.matchMedia(

                "(prefers-color-scheme: dark)"

            ).matches

                ? "dark"

                : "light";

        }

        document.documentElement.setAttribute(

            "data-theme",

            currentTheme

        );

        localStorage.setItem(STORAGE_KEY, value);

        setTheme(value);

        onChange?.(value);

    };

    return (

        <div className="theme-switcher">

            {THEMES.map((item) => {

                const Icon = item.icon;

                return (

                    <button

                        key={item.value}

                        type="button"

                        className={

                            theme === item.value

                                ? "theme-switcher__button theme-switcher__button--active"

                                : "theme-switcher__button"

                        }

                        onClick={() =>

                            applyTheme(item.value)

                        }

                        title={item.label}

                    >

                        <Icon size={18} />

                        <span>

                            {item.label}

                        </span>

                    </button>

                );

            })}

        </div>

    );

}

export default ThemeSwitcher;