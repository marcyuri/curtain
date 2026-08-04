// Fonctions utilitaires de date (Document 02 — utils/).
// Fonctions pures, sans dépendance à React.

/**
 * Retourne le jour du mois sur 2 chiffres pour une date donnée
 * (aujourd'hui par défaut).
 */
export function getDayOfMonth(date = new Date()) {

    return date.getDate().toString().padStart(2, "0");

}

/**
 * Retourne le mois et l'année formatés en français
 * (ex: "Août 2026"), pour une date donnée (aujourd'hui par défaut).
 */
export function getMonthYearLabel(date = new Date(), locale = "fr-FR") {

    const label = date.toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
    });

    return label.charAt(0).toUpperCase() + label.slice(1);

}
