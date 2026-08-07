import { ImagePlus, Trash2, RotateCw } from "lucide-react";
import { useRef } from "react";
import "./ImageUpload.css";

function ImageUpload({
  label,
  image,
  accept="image/*",
  disabled=false,
  helperText="",
  error="",
  onChange,
  onRemove,
  onRotate,
}){

  const inputRef=useRef(null);

  const handleFile=(file)=>{
    if(file){
      onChange?.(file);
    }
  };

  return(
    <div className="image-upload">

      {label&&(
        <label className="image-upload__label">
          {label}
        </label>
      )}

      <div
        className={`image-upload__dropzone ${disabled?"image-upload__dropzone--disabled":""}`}
        onClick={()=>!disabled&&inputRef.current?.click()}
      >

        {image?(
          <img
            src={typeof image==="string"?image:URL.createObjectURL(image)}
            alt="preview"
            className="image-upload__preview"
          />
        ):(
          <>
            <ImagePlus size={40}/>
            <p>Ajouter une image</p>
          </>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={(e)=>handleFile(e.target.files?.[0])}
        />

      </div>

      {image&&(
        <div className="image-upload__actions">

          <button
            type="button"
            onClick={onRotate}
          >
            <RotateCw size={18}/>
            Rotation
          </button>

          <button
            type="button"
            onClick={onRemove}
          >
            <Trash2 size={18}/>
            Supprimer
          </button>

        </div>
      )}

      {error
        ?<small className="image-upload__error">{error}</small>
        :helperText&&(
          <small className="image-upload__helper">
            {helperText}
          </small>
        )}

    </div>
  );
}

export default ImageUpload;
