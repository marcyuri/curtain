// Document 07, Ch.15 — contrôle MIME whitelisté par contexte d'upload,
// jamais un unique "tout est permis". Document 06 Ch.12 — un service
// de fichiers unique, mais chaque usage a ses propres contraintes.

export const UPLOAD_PURPOSES = {
    PRODUCT_IMAGE: "product_image",
    AVATAR: "avatar",
    INVOICE_PDF: "invoice_pdf",
    CONSULTATION_ATTACHMENT: "consultation_attachment",
};

const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PDF_MIME_TYPE = ["application/pdf"];

export const ALLOWED_MIME_TYPES_BY_PURPOSE = {
    [UPLOAD_PURPOSES.PRODUCT_IMAGE]: IMAGE_MIME_TYPES,
    [UPLOAD_PURPOSES.AVATAR]: IMAGE_MIME_TYPES,
    [UPLOAD_PURPOSES.INVOICE_PDF]: PDF_MIME_TYPE,
    [UPLOAD_PURPOSES.CONSULTATION_ATTACHMENT]: [...IMAGE_MIME_TYPES, ...PDF_MIME_TYPE],
};
