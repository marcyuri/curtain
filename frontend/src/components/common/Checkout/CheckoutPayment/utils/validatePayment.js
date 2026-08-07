// Validation pure du formulaire de paiement (Document 05, Partie IV —
// une fonction, une responsabilité ; Document 03 — la logique métier ne
// reste jamais dans le composant UI).
//
// Retourne un message d'erreur (string) si la validation échoue, ou une
// chaîne vide si tout est valide.

export function validatePayment(payment) {

    if (!payment.paymentMethod) {
        return "Veuillez choisir un moyen de paiement.";
    }

    const isCardMethod =
        payment.paymentMethod.id === "card" ||
        payment.paymentMethod.id === "stripe";

    if (isCardMethod) {

        const isCardIncomplete =
            !payment.cardName ||
            !payment.cardNumber ||
            !payment.expiry ||
            !payment.cvv;

        if (isCardIncomplete) {
            return "Veuillez compléter les informations de votre carte.";
        }

    }

    const isMobileMoneyMethod =
        payment.paymentMethod.id === "orange-money" ||
        payment.paymentMethod.id === "mtn-momo";

    if (isMobileMoneyMethod && !payment.mobileNumber) {
        return "Veuillez renseigner votre numéro mobile.";
    }

    if (!payment.acceptTerms) {
        return "Vous devez accepter les conditions générales.";
    }

    return "";

}
