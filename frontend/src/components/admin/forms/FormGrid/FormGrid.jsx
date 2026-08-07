import "./FormGrid.css";

function FormGrid({
    children,
    columns = 2,
    gap = "24px",
    className = "",
}) {
    return (
        <div
            className={`form-grid form-grid--${columns} ${className}`}
            style={{gap}}
        >
            {children}
        </div>
    );
}

export default FormGrid;
