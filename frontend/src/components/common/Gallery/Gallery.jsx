import { useMemo, useState } from "react";
import {
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import "./Gallery.css";

function Gallery({

    items = [],

    categories = [],

    defaultCategory = "Toutes",

    className = ""

}) {

    const [category, setCategory] = useState(defaultCategory);

    const [currentIndex, setCurrentIndex] = useState(null);

    const filteredItems = useMemo(() => {

        if (category === "Toutes") {

            return items;

        }

        return items.filter(item => item.category === category);

    }, [items, category]);

    const currentItem =
        currentIndex !== null
            ? filteredItems[currentIndex]
            : null;

    const previous = () => {

        setCurrentIndex(index =>

            index === 0
                ? filteredItems.length - 1
                : index - 1

        );

    };

    const next = () => {

        setCurrentIndex(index =>

            index === filteredItems.length - 1
                ? 0
                : index + 1

        );

    };

    return (

        <section className={`gallery ${className}`}>

            <div className="gallery__filters">

                {["Toutes", ...categories].map(item => (

                    <button

                        key={item}

                        className={
                            item === category
                                ? "gallery__filter gallery__filter--active"
                                : "gallery__filter"
                        }

                        onClick={() => {

                            setCategory(item);

                            setCurrentIndex(null);

                        }}

                    >

                        {item}

                    </button>

                ))}

            </div>

            <div className="gallery__grid">

                {filteredItems.map((item, index) => (

                    <button

                        key={item.id}

                        className="gallery__item"

                        onClick={() => setCurrentIndex(index)}

                    >

                        <img

                            src={item.image}

                            alt={item.title}

                            loading="lazy"

                        />

                        <div className="gallery__overlay">

                            <h3>

                                {item.title}

                            </h3>

                            <span>

                                {item.category}

                            </span>

                        </div>

                    </button>

                ))}

            </div>

            {currentItem && (

                <div className="gallery__lightbox">

                    <button
                        className="gallery__close"
                        onClick={() => setCurrentIndex(null)}
                    >

                        <X size={28} />

                    </button>

                    <button
                        className="gallery__nav gallery__nav--left"
                        onClick={previous}
                    >

                        <ChevronLeft size={28} />

                    </button>

                    <img

                        src={currentItem.image}

                        alt={currentItem.title}

                    />

                    <button
                        className="gallery__nav gallery__nav--right"
                        onClick={next}
                    >

                        <ChevronRight size={28} />

                    </button>

                </div>

            )}

        </section>

    );

}

export default Gallery;