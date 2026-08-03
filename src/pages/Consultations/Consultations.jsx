import { useMemo, useState } from "react";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import ConsultationList from "../../components/sections/ConsultationList";
import CTASection from "../../components/sections/CTASection";

import {

    consultations,

} from "./data";

import "./Consultations.css";

function Consultations() {

    const [search, setSearch] = useState("");

    const [mode, setMode] = useState("Tous");

    const filteredConsultations = useMemo(() => {

        return consultations.filter((consultation) => {

            const matchesSearch =

                consultation.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                consultation.description
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesMode =

                mode === "Tous"

                ||

                consultation.mode === mode;

            return (

                matchesSearch &&

                matchesMode

            );

        });

    }, [

        search,

        mode,

    ]);

    return (

        <main className="consultations-page">

            <section className="consultations-page__hero">

                <span>

                    LOVE CAN BUILD

                </span>

                <h1>

                    Nos consultations

                </h1>

                <p>

                    Choisissez la consultation qui répond le mieux à votre besoin.

                </p>

            </section>

            <section className="consultations-page__filters">

                <div className="consultations-page__search">

                    <Search size={18} />

                    <input

                        type="search"

                        placeholder="Rechercher..."

                        value={search}

                        onChange={(event) =>

                            setSearch(event.target.value)

                        }

                    />

                </div>

                <div className="consultations-page__select">

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

            </section>

            <ConsultationList

                consultations={filteredConsultations}

            />

            <CTASection

                title="Besoin d'un accompagnement ?"

                description="Prenez rendez-vous dès aujourd'hui avec un conseiller LOVE CAN BUILD."

                primaryLabel="Réserver une consultation"

                secondaryLabel="Nous contacter"

            />

        </main>

    );

}

export default Consultations;