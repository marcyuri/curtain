import { Calendar } from "lucide-react";
import "./DateField.css";

function DateField({
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
    <div className="date-field">
      {label && <label htmlFor={name} className="date-field__label">{label}{required&&<span>*</span>}</label>}
      <div className={`date-field__control ${error?"date-field__control--error":""}`}>
        <Calendar size={18}/>
        <input
          id={name}
          name={name}
          type="date"
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
      {error?<small className="date-field__error">{error}</small>:helperText&&<small className="date-field__helper">{helperText}</small>}
    </div>
  );
}
export default DateField;
