import { Check } from "lucide-react";
import "./Stepper.css";

function Stepper({
    steps = [],
    currentStep = 0,
    orientation = "horizontal",
    className = "",
    onStepClick
}) {

    const classes = [
        "stepper",
        `stepper--${orientation}`,
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (

        <div className={classes}>

            {steps.map((step, index) => {

                const completed = index < currentStep;
                const active = index === currentStep;

                return (

                    <div
                        key={step.id ?? index}
                        className="stepper__item"
                    >

                        <button
                            type="button"
                            className={[
                                "stepper__circle",
                                completed && "stepper__circle--completed",
                                active && "stepper__circle--active",
                                step.error && "stepper__circle--error"
                            ]
                                .filter(Boolean)
                                .join(" ")}
                            disabled={!onStepClick}
                            onClick={() => onStepClick?.(index)}
                        >

                            {completed ? (

                                <Check size={18} />

                            ) : (

                                index + 1

                            )}

                        </button>

                        <div className="stepper__content">

                            <span className="stepper__label">

                                {step.label}

                            </span>

                            {step.description && (

                                <span className="stepper__description">

                                    {step.description}

                                </span>

                            )}

                        </div>

                        {index < steps.length - 1 && (

                            <div className="stepper__connector" />

                        )}

                    </div>

                );

            })}

        </div>

    );

}

export default Stepper;