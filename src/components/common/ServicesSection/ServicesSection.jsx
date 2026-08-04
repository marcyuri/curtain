import { useMemo, useState } from "react";
import {
    Search,
    Filter,
    ArrowRight
} from "lucide-react";

import Section from "../../ui/Section";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import EmptyState from "../../ui/EmptyState";
import ServiceCard from "../ServiceCard";

import "./ServicesSection.css";

function ServicesSection({

    title = "Nos Services",

    subtitle = "Découvrez les services proposés par LOVE CAN BUILD.",

    services = [],

    categories = [],

    loading = false,

    onLoadMore,

    onServiceClick,

    className = ""

}) {

    const [query, setQuery] = useState("");

    const [category, setCategory] = useState("Toutes");

    const filteredServices = useMemo(() => services.filter(service => {

            const categoryMatch =
                category === "Toutes" ||
                service.category === category;

            const searchMatch =
                service.title
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||

                service.description
                    .toLowerCase()
                    .includes(query.toLowerCase());

            return categoryMatch && searchMatch;

        }), [services, query, category]);

    return (

        <Section

            className={`services-section ${className}`}

        >

            <header className="services-section__header">

                <h2>

                    {title}

                </h2>

                <p>

                    {subtitle}

                </p>

            </header>

            <div className="services-section__toolbar">

                <Input

                    placeholder="Rechercher un service..."

                    leftIcon={<Search size={18} />}

                    value={query}

                    onChange={(event) =>

                        setQuery(event.target.value)

                    }

                />

                <div className="services-section__filters">

                    <Filter size={18} />

                    {

                        ["Toutes", ...categories].map(item => (

                            <button

                                key={item}

                                className={

                                    category === item

                                        ? "services-section__filter services-section__filter--active"

                                        : "services-section__filter"

                                }

                                onClick={() =>

                                    setCategory(item)

                                }

                            >

                                {item}

                            </button>

                        ))

                    }

                </div>

            </div>

            {

                !loading && filteredServices.length === 0 && (

                    <EmptyState

                        title="Aucun service trouvé"

                        description="Essayez une autre recherche ou une autre catégorie."

                    />

                )

            }

            <div className="services-section__grid">

                {

                    filteredServices.map(service => (

                        <ServiceCard

                            key={service.id}

                            service={service}

                            onClick={() =>

                                onServiceClick?.(service)

                            }

                        />

                    ))

                }

            </div>

            {

                onLoadMore && (

                    <div className="services-section__footer">

                        <Button

                            onClick={onLoadMore}

                        >

                            Voir plus

                            <ArrowRight size={18} />

                        </Button>

                    </div>

                )

            }

        </Section>

    );

}

export default ServicesSection;