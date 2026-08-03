import {

    Pencil,

    Trash2,

    Eye,

} from "lucide-react";

export const productColumns = [

    {

        key: "image",

        label: "",

        render: (product) => (

            <img

                src={product.image}

                alt={product.name}

                className="product-table__image"

            />

        ),

    },

    {

        key: "name",

        label: "Produit",

    },

    {

        key: "category",

        label: "Catégorie",

    },

    {

        key: "price",

        label: "Prix",

    },

    {

        key: "stock",

        label: "Stock",

    },

    {

        key: "status",

        label: "Statut",

        render: (product) => (

            <span

                className={`product-status product-status--${product.status}`}

            >

                {product.statusLabel}

            </span>

        ),

    },

    {

        key: "actions",

        label: "",

        render: (

            product,

            {

                onView,

                onEdit,

                onDelete,

            }

        ) => (

            <div className="product-actions">

                <button

                    onClick={() => onView(product)}

                >

                    <Eye size={18} />

                </button>

                <button

                    onClick={() => onEdit(product)}

                >

                    <Pencil size={18} />

                </button>

                <button

                    onClick={() => onDelete(product)}

                >

                    <Trash2 size={18} />

                </button>

            </div>

        ),

    },

];