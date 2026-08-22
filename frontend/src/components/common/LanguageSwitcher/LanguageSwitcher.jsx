import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

function LanguageSwitcher({

    languages = DEFAULT_LANGUAGES,

    onChange,

}) {

    const { i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {

        setLanguage(i18n.language);

    }, [i18n.language]);

    const handleChange = (event) => {

        const value = event.target.value;

        i18n.changeLanguage(value);

        onChange?.(value);

    };

    return (

        <div className="language-switcher">

            <Languages
                size={18}
                className="language-switcher__icon"
            />

            <span className="language-switcher__code">
                {language.slice(0, 2).toUpperCase()}
            </span>

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