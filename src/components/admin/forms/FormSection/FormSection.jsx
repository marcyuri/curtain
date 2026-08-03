import "./FormSection.css";

function FormSection({
    title,
    description,
    children,
    actions,
}) {
    return (
        <section className="form-section">
            {(title || description || actions) && (
                <header className="form-section__header">
                    <div>
                        {title && <h2>{title}</h2>}
                        {description && <p>{description}</p>}
                    </div>
                    {actions && (
                        <div className="form-section__actions">
                            {actions}
                        </div>
                    )}
                </header>
            )}
            <div className="form-section__content">
                {children}
            </div>
        </section>
    );
}

export default FormSection;
