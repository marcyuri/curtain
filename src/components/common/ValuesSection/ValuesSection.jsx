import "./ValuesSection.css";

const ValuesSection = ({
    title = "Nos valeurs",
    subtitle,
    values = [],
    columns = 3,
}) => (
        <section className="values-section">
            {(title || subtitle) && (
                <header className="values-section__header">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}

            <div
                className="values-section__grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(260px,1fr))`,
                }}
            >
                {values.map((value) => {
                    const Icon = value.icon;

                    return (
                        <article
                            key={value.id}
                            className={`values-section__card ${value.featured
                                    ? "values-section__card--featured"
                                    : ""
                                }`}
                        >
                            {Icon && (
                                <div className="values-section__icon">
                                    <Icon size={40} />
                                </div>
                            )}

                            <h3>{value.title}</h3>

                            <p>{value.description}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );

export default ValuesSection;