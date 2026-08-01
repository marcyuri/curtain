import { useEffect, useState } from "react";
import { Languages, ChevronDown } from "lucide-react";

import "./LanguageSwitcher.css";

const DEFAULT_LANGUAGES = [
    {
        code: "fr",
        label: "Français",
        flag: "🇫🇷",
    },
    {
        code: "en",
        label: "English",
        flag: "🇬🇧",
    },
];

const STORAGE_KEY = "language";

function LanguageSwitcher({

    languages = DEFAULT_LANGUAGES,

    defaultLanguage = "fr",

    onChange,

}) {

    const [language, setLanguage] = useState(defaultLanguage);

    useEffect(() => {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            setLanguage(saved);

            onChange?.(saved);

            return;

        }

        const browserLanguage = navigator.language
            .toLowerCase()
            .split("-")[0];

        const exists = languages.some(

            (item) => item.code === browserLanguage

        );

        const nextLanguage = exists
            ? browserLanguage
            : defaultLanguage;

        setLanguage(nextLanguage);

        localStorage.setItem(STORAGE_KEY, nextLanguage);

        onChange?.(nextLanguage);

    }, []);

    const handleChange = (event) => {

        const value = event.target.value;

        setLanguage(value);

        localStorage.setItem(STORAGE_KEY, value);

        onChange?.(value);

    };

    return (

        <div className="language-switcher">

            <Languages
                size={18}
                className="language-switcher__icon"
            />

            <select
                value={language}
                onChange={handleChange}
            >

                {languages.map((item) => (

                    <option
                        key={item.code}
                        value={item.code}
                    >

                        {item.flag} {item.label}

                    </option>

                ))}

            </select>

            <ChevronDown
                size={16}
                className="language-switcher__arrow"
            />

        </div>

    );

}

export default LanguageSwitcher;