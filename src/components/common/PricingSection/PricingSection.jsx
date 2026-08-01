import {
    Check,
    ArrowRight
} from "lucide-react";

import Section from "../../ui/Section";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

import "./PricingSection.css";

function PricingSection({

    title = "Nos offres",

    subtitle = "Choisissez la formule adaptée à vos besoins.",

    plans = [],

    onSelectPlan,

    className = ""

}) {

    return (

        <Section className={`pricing-section ${className}`}>

            <header className="pricing-section__header">

                <h2>

                    {title}

                </h2>

                <p>

                    {subtitle}

                </p>

            </header>

            <div className="pricing-section__grid">

                {plans.map(plan => (

                    <Card

                        key={plan.id}

                        className={`
                            pricing-card
                            ${plan.featured
                                ? "pricing-card--featured"
                                : ""
                            }
                        `}

                    >

                        {plan.featured && (

                            <Badge>

                                Recommandé

                            </Badge>

                        )}

                        <h3>

                            {plan.name}

                        </h3>

                        <div className="pricing-card__price">

                            {plan.price}

                        </div>

                        {plan.period && (

                            <span>

                                {plan.period}

                            </span>

                        )}

                        <ul>

                            {plan.features.map(feature => (

                                <li key={feature}>

                                    <Check size={18} />

                                    {feature}

                                </li>

                            ))}

                        </ul>

                        <Button

                            fullWidth

                            onClick={() =>

                                onSelectPlan?.(plan)

                            }

                        >

                            {plan.buttonLabel ?? "Choisir"}

                            <ArrowRight size={18} />

                        </Button>

                    </Card>

                ))}

            </div>

        </Section>

    );

}

export default PricingSection;