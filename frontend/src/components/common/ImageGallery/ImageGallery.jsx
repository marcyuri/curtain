import { useEffect, useState } from "react";

import {
    ChevronLeft,
    ChevronRight,
    Maximize2,
} from "lucide-react";

import "./ImageGallery.css";

function ImageGallery({

    images = [],

    initialIndex = 0,

    onImageChange,

    onOpen,

}) {

    const [selected, setSelected] = useState(initialIndex);

    useEffect(() => {

        setSelected(initialIndex);

    }, [initialIndex]);

    if (images.length === 0) {

        return null;

    }

    const current = images[selected];

    const previous = () => {

        const index =

            selected === 0

                ? images.length - 1

                : selected - 1;

        setSelected(index);

        onImageChange?.(images[index]);

    };

    const next = () => {

        const index =

            selected === images.length - 1

                ? 0

                : selected + 1;

        setSelected(index);

        onImageChange?.(images[index]);

    };

    const selectImage = (index) => {

        setSelected(index);

        onImageChange?.(images[index]);

    };

    return (

        <section className="image-gallery">

            <div className="image-gallery__viewer">

                <button

                    className="image-gallery__nav"

                    onClick={previous}

                >

                    <ChevronLeft size={24} />

                </button>

                <img

                    src={current.src}

                    alt={current.alt || current.title}

                />

                <button

                    className="image-gallery__nav"

                    onClick={next}

                >

                    <ChevronRight size={24} />

                </button>

                <button

                    className="image-gallery__fullscreen"

                    onClick={() => onOpen?.(selected)}

                >

                    <Maximize2 size={20} />

                </button>

            </div>

            <div className="image-gallery__thumbnails">

                {images.map((image, index) => (

                    <button

                        key={image.id || index}

                        className={

                            selected === index

                                ? "image-gallery__thumbnail image-gallery__thumbnail--active"

                                : "image-gallery__thumbnail"

                        }

                        onClick={() =>

                            selectImage(index)

                        }

                    >

                        <img

                            src={image.src}

                            alt={image.alt}

                            loading="lazy"

                        />

                    </button>

                ))}

            </div>

        </section>

    );

}

export default ImageGallery;