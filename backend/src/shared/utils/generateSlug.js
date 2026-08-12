// Fonction utilitaire pure (Document 02 — utils/, Document 05 Partie IV).
// Transforme un nom en slug URL-safe : minuscules, accents retirés,
// espaces/caractères spéciaux remplacés par des tirets.

export function generateSlug(text) {

    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // retire les accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

}
