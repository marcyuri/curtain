import { useMemo, useState } from "react";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import ConsultationCard from "../ConsultationCard";

import "./ConsultationList.css";

function ConsultationList({

    consultations = [],

    title = "Nos consultations",

    description = "Choisissez la consultation qui correspond à vos besoins.",

    onBook,

}) {

    const [search, setSearch] = useState("");

    const [mode, setMode] = useState("Tous");

    const filteredConsultations = useMemo(() => {

        return consultations.filter((consultation) => {

            const matchesSearch =

                consultation.title
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||

                consultation.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesMode =

                mode === "Tous" ||

                consultation.mode === mode;

            return matchesSearch && matchesMode;

        });

    }, [consultations, search, mode]);

    return (

        <section className="consultation-list">

            <header className="consultation-list__header">

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </header>

            <div className="consultation-list__toolbar">

                <div className="consultation-list__search">

                    <Search size={18} />

                    <input

                        type="search"

                        placeholder="Rechercher une consultation..."

                        value={search}

                        onChange={(event) =>

                            setSearch(event.target.value)

                        }

                    />

                </div>

                <div className="consultation-list__filter">

                    <SlidersHorizontal size={18} />

                    <select

                        value={mode}

                        onChange={(event) =>

                            setMode(event.target.value)

                        }

                    >

                        <option>

                            Tous

                        </option>

                        <option>

                            Présentiel

                        </option>

                        <option>

                            En ligne

                        </option>

                    </select>

                </div>

            </div>

            <div className="consultation-list__grid">

                {filteredConsultations.map((consultation) => (

                    <ConsultationCard

                        key={consultation.id}

                        {...consultation}

                        onBook={() =>

                            onBook?.(consultation)

                        }

                    />

                ))}

            </div>

            {filteredConsultations.length === 0 && (

                <div className="consultation-list__empty">

                    Aucune consultation trouvée.

                </div>

            )}

        </section>

    );

}

export default ConsultationList;