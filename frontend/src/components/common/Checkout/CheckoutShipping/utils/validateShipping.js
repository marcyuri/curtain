export function validateShipping(shipping) {

    if (!shipping.shippingMethod) {
        return "Veuillez sélectionner un mode de livraison.";
    }

    return "";

}
