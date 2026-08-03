import "./CheckboxField.css";

function CheckboxField({
  label,
  checked=false,
  disabled=false,
  indeterminate=false,
  helperText="",
  error="",
  onChange,
}){

  return(
    <div className="checkbox-field">
      <label className="checkbox-field__label">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          ref={el=>{if(el) el.indeterminate=indeterminate;}}
          onChange={(e)=>onChange?.(e.target.checked)}
        />
        <span>{label}</span>
      </label>

      {error
        ? <small className="checkbox-field__error">{error}</small>
        : helperText&&<small className="checkbox-field__helper">{helperText}</small>}
    </div>
  );
}

export default CheckboxField;
