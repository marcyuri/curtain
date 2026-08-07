import { CalendarClock } from "lucide-react";
import "./DateTimeField.css";

function DateTimeField({
  label,
  name,
  value="",
  required=false,
  disabled=false,
  readOnly=false,
  min,
  max,
  helperText="",
  error="",
  onChange,
  onBlur,
}){
  return (
    <div className="datetime-field">
      {label&&(
        <label htmlFor={name} className="datetime-field__label">
          {label}{required&&<span>*</span>}
        </label>
      )}
      <div className={`datetime-field__control ${error?"datetime-field__control--error":""}`}>
        <CalendarClock size={18}/>
        <input
          id={name}
          name={name}
          type="datetime-local"
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {error
        ? <small className="datetime-field__error">{error}</small>
        : helperText && <small className="datetime-field__helper">{helperText}</small>}
    </div>
  );
}

export default DateTimeField;
