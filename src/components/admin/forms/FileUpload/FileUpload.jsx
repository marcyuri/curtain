import { Upload, File, Trash2 } from "lucide-react";
import { useRef } from "react";
import "./FileUpload.css";

function FileUpload({
    label,
    files = [],
    multiple = true,
    accept = "*",
    maxSize,
    disabled = false,
    helperText = "",
    error = "",
    onChange,
    onRemove,
}) {

    const inputRef = useRef(null);

    const handleFiles = (list) => {
        const selected = Array.from(list);

        const valid = maxSize
            ? selected.filter(file => file.size <= maxSize)
            : selected;

        onChange?.(valid);
    };

    return (
        <div className="file-upload">

            {label && (
                <label className="file-upload__label">
                    {label}
                </label>
            )}

            <div
                className={`file-upload__dropzone ${disabled ? "file-upload__dropzone--disabled" : ""}`}
                onClick={() => !disabled && inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    if (!disabled) {
                        handleFiles(e.dataTransfer.files);
                    }
                }}
            >
                <Upload size={36} />

                <p>
                    Glissez vos fichiers ici
                </p>

                <span>
                    ou cliquez pour parcourir
                </span>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {files.length > 0 && (
                <ul className="file-upload__list">

                    {files.map((file, index) => (

                        <li
                            key={index}
                            className="file-upload__item"
                        >

                            <div className="file-upload__info">

                                <File size={18} />

                                <div>

                                    <strong>

                                        {file.name}

                                    </strong>

                                    <small>

                                        {(file.size / 1024).toFixed(1)} KB

                                    </small>

                                </div>

                            </div>

                            <button
                                type="button"
                                onClick={() => onRemove?.(index)}
                            >

                                <Trash2 size={18} />

                            </button>

                        </li>

                    ))}

                </ul>
            )}

            {error
                ? <small className="file-upload__error">{error}</small>
                : helperText && (
                    <small className="file-upload__helper">
                        {helperText}
                    </small>
                )
            }

        </div>
    );

}

export default FileUpload;
