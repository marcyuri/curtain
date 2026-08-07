import { ImagePlus, Trash2, Star } from "lucide-react";
import { useRef } from "react";
import "./GalleryUpload.css";

function GalleryUpload({
    label,
    images = [],
    accept = "image/*",
    disabled = false,
    helperText = "",
    error = "",
    onAdd,
    onRemove,
    onSetPrimary,
}) {

    const inputRef = useRef(null);

    return (
        <div className="gallery-upload">

            {label && (
                <label className="gallery-upload__label">
                    {label}
                </label>
            )}

            <button
                type="button"
                className="gallery-upload__add"
                disabled={disabled}
                onClick={() => inputRef.current?.click()}
            >
                <ImagePlus size={20}/>
                Ajouter des images
            </button>

            <input
                ref={inputRef}
                hidden
                type="file"
                multiple
                accept={accept}
                disabled={disabled}
                onChange={(e)=>onAdd?.(Array.from(e.target.files||[]))}
            />

            <div className="gallery-upload__grid">

                {images.map((image,index)=>(

                    <div
                        key={index}
                        className={`gallery-upload__item ${image.primary?"gallery-upload__item--primary":""}`}
                    >

                        <img
                            src={typeof image==="string"?image:image.url||URL.createObjectURL(image.file||image)}
                            alt=""
                        />

                        <div className="gallery-upload__overlay">

                            <button
                                type="button"
                                onClick={()=>onSetPrimary?.(index)}
                            >
                                <Star size={18}/>
                            </button>

                            <button
                                type="button"
                                onClick={()=>onRemove?.(index)}
                            >
                                <Trash2 size={18}/>
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {error
                ? <small className="gallery-upload__error">{error}</small>
                : helperText && <small className="gallery-upload__helper">{helperText}</small>
            }

        </div>
    );

}

export default GalleryUpload;
