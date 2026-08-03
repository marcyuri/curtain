import {

    ImagePlus,

    Star,

    Trash2,

    Move,

} from "lucide-react";

import "./ProductImagesTab.css";

function ProductImagesTab({

    images = [],

    onUpload,

    onDelete,

    onPrimary,

}) {

    return (

        <section className="product-images">

            <div className="product-card">

                <h2>

                    Images du produit

                </h2>

                <p>

                    Ajoutez une image principale ainsi qu'une galerie.

                </p>

                <label className="product-upload">

                    <ImagePlus size={42} />

                    <span>

                        Glissez vos images ici

                    </span>

                    <small>

                        ou cliquez pour sélectionner

                    </small>

                    <input

                        type="file"

                        multiple

                        accept="image/*"

                        hidden

                        onChange={onUpload}

                    />

                </label>

            </div>

            <div className="product-gallery">

                {

                    images.map((image, index) => (

                        <article

                            key={image.id || index}

                            className="product-image"

                        >

                            <img

                                src={image.url}

                                alt="Produit"

                            />

                            <div className="product-image__actions">

                                <button

                                    onClick={() =>

                                        onPrimary?.(image)

                                    }

                                >

                                    <Star size={18} />

                                </button>

                                <button>

                                    <Move size={18} />

                                </button>

                                <button

                                    onClick={() =>

                                        onDelete?.(image)

                                    }

                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                            {

                                image.primary && (

                                    <span className="product-image__badge">

                                        Image principale

                                    </span>

                                )

                            }

                        </article>

                    ))

                }

            </div>

        </section>

    );

}

export default ProductImagesTab;