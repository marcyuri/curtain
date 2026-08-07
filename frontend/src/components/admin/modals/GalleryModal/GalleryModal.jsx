import {

    Grid2X2,

    Image,

    Check,

} from "lucide-react";

import Modal from "../Modal";

import "./GalleryModal.css";

function GalleryModal({

    open = false,

    images = [],

    selected = null,

    title = "Bibliothèque d'images",

    onSelect,

    onClose,

}) {

    return (

        <Modal

            open={open}

            width="1200px"

            title={title}

            subtitle={`${images.length} image(s)`}

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="gallery-modal__cancel"

                        onClick={onClose}

                    >

                        Fermer

                    </button>

                </>

            }

        >

            {

                images.length === 0 ? (

                    <div className="gallery-modal__empty">

                        <Image

                            size={56}

                        />

                        <h3>

                            Aucune image

                        </h3>

                        <p>

                            Les images importées apparaîtront ici.

                        </p>

                    </div>

                ) : (

                    <div className="gallery-modal__grid">

                        {

                            images.map((image) => (

                                <button

                                    key={image.id}

                                    type="button"

                                    className={`

                                        gallery-modal__item

                                        ${selected === image.id

                                            ? "gallery-modal__item--active"

                                            : ""

                                        }

                                    `}

                                    onClick={() =>

                                        onSelect?.(image)

                                    }

                                >

                                    <img

                                        src={image.url}

                                        alt={image.name}

                                    />

                                    <div className="gallery-modal__overlay">

                                        <Grid2X2

                                            size={20}

                                        />

                                    </div>

                                    {

                                        selected === image.id && (

                                            <span

                                                className="gallery-modal__selected"

                                            >

                                                <Check

                                                    size={18}

                                                />

                                            </span>

                                        )

                                    }

                                </button>

                            ))

                        }

                    </div>

                )

            }

        </Modal>

    );

}

export default GalleryModal;