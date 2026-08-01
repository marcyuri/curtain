import { useMemo, useState } from "react";
import "./ConsultationsSection.css";

import Input from "../../form/Input";
import Select from "../../form/Select";
import Button from "../../form/Button";
import ConsultationCard from "../ConsultationCard";

const ConsultationsSection = ({
    title = "Nos consultations",
    subtitle,
    consultations = [],
    categories = [],
    searchable = true,
    filterable = true,
    carousel = false,
    limit,
    showMoreLabel = "Voir toutes les consultations",
    onShowMore,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const filteredConsultations = useMemo(() => {
        let list = [...consultations];

        if (category !== "all") {
            list = list.filter(
                (item) => item.category === category
            );
        }

        if (search) {
            const query = search.toLowerCase();

            list = list.filter(
                (item) =>
                    item.title.toLowerCase().includes(query) ||
                    item.psychologist
                        ?.toLowerCase()
                        .includes(query) ||
                    item.speciality
                        ?.toLowerCase()
                        .includes(query)
            );
        }

        return list;
    }, [consultations, search, category]);

    const displayedConsultations = limit
        ? filteredConsultations.slice(0, limit)
        : filteredConsultations;

    return (
        <section className="consultations-section">
            <header className="consultations-section__header">
                <h2>{title}</h2>

                {subtitle && <p>{subtitle}</p>}
            </header>

            <div className="consultations-section__toolbar">
                {searchable && (
                    <Input
                        placeholder="Rechercher une consultation..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                )}

                {filterable && (
                    <Select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        options={[
                            {
                                label: "Toutes les catégories",
                                value: "all",
                            },
                            ...categories.map((item) => ({
                                label: item,
                                value: item,
                            })),
                        ]}
                    />
                )}
            </div>

            <div
                className={`consultations-section__content ${carousel
                        ? "consultations-section__content--carousel"
                        : ""
                    }`}
            >
                {displayedConsultations.map((consultation) => (
                    <ConsultationCard
                        key={consultation.id}
                        {...consultation}
                    />
                ))}
            </div>

            {limit &&
                filteredConsultations.length > limit &&
                onShowMore && (
                    <div className="consultations-section__footer">
                        <Button onClick={onShowMore}>
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default ConsultationsSection;