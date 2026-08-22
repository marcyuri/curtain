import { Pencil, Trash2, Eye } from "lucide-react";

import ImageWithFallback from "@components/common/ImageWithFallback";

export const productColumns = [
    {
        key: "image",
        label: "",
        render: (product) => (
            <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="product-table__image"
            />
        ),
    },
    { key: "name", label: "Produit" },
    { key: "category", label: "Catégorie" },
    { key: "price", label: "Prix" },
    { key: "stock", label: "Stock" },
    {
        key: "status",
        label: "Statut",
        render: (product) => (
            <span className={`product-status product-status--${product.status}`}>
                {product.statusLabel}
            </span>
        ),
    },
    {
        key: "actions",
        label: "",
        render: (product, { onView, onEdit, onDelete }) => (
            <div className="product-actions">
                <button type="button" onClick={() => onView?.(product)} aria-label={`Voir ${product.name}`}>
                    <Eye size={18} />
                </button>
                <button type="button" onClick={() => onEdit?.(product)} aria-label={`Modifier ${product.name}`}>
                    <Pencil size={18} />
                </button>
                <button type="button" onClick={() => onDelete?.(product)} aria-label={`Supprimer ${product.name}`}>
                    <Trash2 size={18} />
                </button>
            </div>
        ),
    },
];
