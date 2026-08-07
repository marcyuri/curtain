import "./RadioField.css";

function RadioField({
  label,
  name,
  value,
  options=[],
  direction="column",
  required=false,
  disabled=false,
  helperText="",
  error="",
  onChange,
}){

  return(
    <div className="radio-field">
      {label&&(
        <label className="radio-field__title">
          {label}{required&&<span>*</span>}
        </label>
      )}

      <div className={`radio-field__group radio-field__group--${direction}`}>
        {options.map(option=>(
          <label
            key={option.value}
            className={`radio-field__option ${option.disabled?"radio-field__option--disabled":""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value===option.value}
              disabled={disabled||option.disabled}
              onChange={()=>onChange?.(option.value)}
            />
            <div className="radio-field__content">
              <span>{option.label}</span>
              {option.description&&(
                <small>{option.description}</small>
              )}
            </div>
          </label>
        ))}
      </div>

      {error
        ? <small className="radio-field__error">{error}</small>
        : helperText&&<small className="radio-field__helper">{helperText}</small>}
    </div>
  );
}

export default RadioField;
