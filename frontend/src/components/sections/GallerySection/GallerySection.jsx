import { useState } from "react";

import {
    Image,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import "./GallerySection.css";
import ImageWithFallback from "../../common/ImageWithFallback";

function GallerySection({

    title = "Notre galerie",

    subtitle = "LOVE CAN BUILD",

    description = "Découvrez quelques moments marquants de nos activités.",

    images = [],

}) {

    const [selected, setSelected] = useState(null);

    const previous = () => {

        if (selected === null) {

            return;

        }

        setSelected(

            selected === 0

                ? images.length - 1

                : selected - 1

        );

    };

    const next = () => {

        if (selected === null) {

            return;

        }

        setSelected(

            selected === images.length - 1

                ? 0

                : selected + 1

        );

    };

    return (

        <section className="gallery-section">

            <header className="gallery-section__header">

                <span>

                    {subtitle}

                </span>

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </header>

            <div className="gallery-section__grid">

                {images.map((image, index) => (

                    <button

                        key={index}

                        type="button"

                        className="gallery-section__item"

                        onClick={() =>

                            setSelected(index)

                        }

                    >

                        {image ? (

                            <ImageWithFallback

                                src={image}

                                alt={`Galerie ${index + 1}`}

                            />

                        ) : (

                            <div className="gallery-section__placeholder">

                                <Image size={50} />

                            </div>

                        )}

                    </button>

                ))}

            </div>

            {

                selected !== null && (

                    <div className="gallery-section__modal">

                        <button

                            className="gallery-section__close"

                            onClick={() =>

                                setSelected(null)

                            }

                        >

                            <X size={28} />

                        </button>

                        <button

                            className="gallery-section__nav gallery-section__nav--left"

                            onClick={previous}

                        >

                            <ChevronLeft size={32} />

                        </button>

                        <img

                            src={images[selected]}

                            alt="Galerie"

                        />

                        <button

                            className="gallery-section__nav gallery-section__nav--right"

                            onClick={next}

                        >

                            <ChevronRight size={32} />

                        </button>

                    </div>

                )

            }

        </section>

    );

}

export default GallerySection;