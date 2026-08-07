import "./FormActions.css";
import Spinner from "../../feedback/Spinner";

function FormActions({
    children,
    justify="end",
    saving=false,
    saveLabel="Enregistrer",
    cancelLabel="Annuler",
    resetLabel="Réinitialiser",
    showSave=true,
    showCancel=true,
    showReset=false,
    onSave,
    onCancel,
    onReset,
}){

    return(
        <footer className={`form-actions form-actions--${justify}`}>
            <div className="form-actions__group">
                {showReset&&(
                    <button
                        type="button"
                        className="form-actions__secondary"
                        onClick={onReset}
                    >
                        {resetLabel}
                    </button>
                )}

                {showCancel&&(
                    <button
                        type="button"
                        className="form-actions__secondary"
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                )}

                {showSave&&(
                    <button
                        type="submit"
                        className="form-actions__primary"
                        disabled={saving}
                        onClick={onSave}
                    >
                        {saving&&(
                            <Spinner
                                size="sm"
                                variant="white"
                            />
                        )}
                        {saving?"Enregistrement...":saveLabel}
                    </button>
                )}

                {children}
            </div>
        </footer>
    );

}

export default FormActions;
