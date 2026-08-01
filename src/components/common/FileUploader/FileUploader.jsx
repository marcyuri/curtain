import { useRef, useState } from "react";

import {
    UploadCloud,
    File,
    Image,
    Video,
    Trash2,
} from "lucide-react";

import Button from "../../form/Button";

import "./FileUploader.css";

function FileUploader({

    multiple = true,

    accept = "*",

    maxSize = 5 * 1024 * 1024,

    onChange,

}) {

    const inputRef = useRef(null);

    const [files, setFiles] = useState([]);

    const formatSize = (size) => {

        if (size < 1024) {

            return `${size} o`;

        }

        if (size < 1024 * 1024) {

            return `${(size / 1024).toFixed(1)} Ko`;

        }

        return `${(size / 1024 / 1024).toFixed(2)} Mo`;

    };

    const getIcon = (file) => {

        if (file.type.startsWith("image")) {

            return <Image size={22} />;

        }

        if (file.type.startsWith("video")) {

            return <Video size={22} />;

        }

        return <File size={22} />;

    };

    const addFiles = (list) => {

        const selected = [...list].filter(

            (file) => file.size <= maxSize

        );

        const next = multiple

            ? [...files, ...selected]

            : selected.slice(0, 1);

        setFiles(next);

        onChange?.(next);

    };

    const handleDrop = (event) => {

        event.preventDefault();

        addFiles(event.dataTransfer.files);

    };

    const removeFile = (index) => {

        const next = files.filter(

            (_, i) => i !== index

        );

        setFiles(next);

        onChange?.(next);

    };

    return (

        <section className="file-uploader">

            <div

                className="file-uploader__dropzone"

                onDragOver={(e) => e.preventDefault()}

                onDrop={handleDrop}

                onClick={() => inputRef.current.click()}

            >

                <UploadCloud size={46} />

                <h3>

                    Déposez vos fichiers ici

                </h3>

                <p>

                    ou cliquez pour sélectionner

                </p>

                <Button>

                    Choisir un fichier

                </Button>

                <input

                    ref={inputRef}

                    hidden

                    type="file"

                    multiple={multiple}

                    accept={accept}

                    onChange={(e) =>

                        addFiles(e.target.files)

                    }

                />

            </div>

            {files.length > 0 && (

                <div className="file-uploader__list">

                    {files.map((file, index) => (

                        <article

                            key={`${file.name}-${index}`}

                            className="file-uploader__item"

                        >

                            <div className="file-uploader__info">

                                {getIcon(file)}

                                <div>

                                    <strong>

                                        {file.name}

                                    </strong>

                                    <small>

                                        {formatSize(file.size)}

                                    </small>

                                </div>

                            </div>

                            <button

                                onClick={() =>

                                    removeFile(index)

                                }

                            >

                                <Trash2 size={18} />

                            </button>

                        </article>

                    ))}

                </div>

            )}

        </section>

    );

}

export default FileUploader;