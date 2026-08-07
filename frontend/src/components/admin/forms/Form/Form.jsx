import "./Form.css";

function Form({
    children,
    onSubmit,
    className = "",
    noValidate = true,
    autoComplete = "off",
}) {
    return (
        <form
            className={`form ${className}`}
            onSubmit={onSubmit}
            noValidate={noValidate}
            autoComplete={autoComplete}
        >
            {children}
        </form>
    );
}

export default Form;
