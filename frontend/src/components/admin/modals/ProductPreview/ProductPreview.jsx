import {

    Package,

    Tag,

    Boxes,

    BadgeDollarSign,

} from "lucide-react";

import Modal from "../Modal";

import StatusBadge from "../../common/StatusBadge";

import "./ProductPreview.css";

function ProductPreview({

    open = false,

    product,

    onClose,

}) {

    if (!product) {

        return null;

    }

    return (

        <Modal

            open={open}

            width="1000px"

            title="Aperçu du produit"

            subtitle="Consultation rapide"

            onClose={onClose}

            footer={

                <button

                    type="button"

                    className="product-preview__close"

                    onClick={onClose}

                >

                    Fermer

                </button>

            }

        >

            <section className="product-preview">

                <div className="product-preview__image">

                    <img

                        src={product.image}

                        alt={product.name}

                    />

                </div>

                <div className="product-preview__content">

                    <header>

                        <h2>

                            {product.name}

                        </h2>

                        <StatusBadge

                            status={product.status}

                        />

                    </header>

                    <p>

                        {product.description}

                    </p>

                    <div className="product-preview__infos">

                        <div>

                            <Package size={18} />

                            <span>

                                {product.sku}

                            </span>

                        </div>

                        <div>

                            <Tag size={18} />

                            <span>

                                {product.category}

                            </span>

                        </div>

                        <div>

                            <Boxes size={18} />

                            <span>

                                {product.stock}

                            </span>

                        </div>

                        <div>

                            <BadgeDollarSign size={18} />

                            <span>

                                {product.price}

                            </span>

                        </div>

                    </div>

                </div>

            </section>

        </Modal>

    );

}

export default ProductPreview;