import "./PartnersSection.css";

const PartnersSection = ({
    title = "Nos partenaires",
    subtitle,
    partners = [],
    columns = 5,
    grayscale = true,
}) => (
        <section className="partners-section">
            {(title || subtitle) && (
                <header className="partners-section__header">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}

            <div
                className="partners-section__grid"
                style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(120px,1fr))`,
                }}
            >
                {partners.map((partner) => (
                    <a
                        key={partner.id}
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className={`partners-section__card ${grayscale ? "partners-section__card--gray" : ""
                            }`}
                    >
                        <img
                            src={partner.logo}
                            alt={partner.name}
                            loading="lazy"
                        />

                        <h3>{partner.name}</h3>

                        {partner.description && (
                            <p>{partner.description}</p>
                        )}
                    </a>
                ))}
            </div>
        </section>
    );

export default PartnersSection;