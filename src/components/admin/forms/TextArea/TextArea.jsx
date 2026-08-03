import "./TextArea.css";

function TextArea({
  label,
  name,
  value="",
  placeholder="",
  rows=5,
  required=false,
  disabled=false,
  readOnly=false,
  helperText="",
  error="",
  maxLength,
  onChange,
  onBlur,
}){
  return (
    <div className="text-area">
      {label && (
        <label htmlFor={name} className="text-area__label">
          {label}{required && <span>*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        className={error ? "text-area__control text-area__control--error":"text-area__control"}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className="text-area__footer">
        {error ? (
          <small className="text-area__error">{error}</small>
        ) : (
          <small className="text-area__helper">{helperText}</small>
        )}
        {maxLength && (
          <small className="text-area__count">
            {String(value).length}/{maxLength}
          </small>
        )}
      </div>
    </div>
  );
}

export default TextArea;
