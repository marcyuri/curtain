import { ForbiddenError } from "../errors/ForbiddenError.js";

// Document 13, Ch.7.3. Vérifie que req.user (attaché par authenticate,
// exécuté avant) possède la permission requise. authorize() reste
// volontairement simple et générique — les règles contextuelles
// (Document 13 Ch.7.5, ex : un consultant qui ne peut lire que ses
// propres consultations) vivent dans le service du module concerné,
// jamais ici.

export function authorize(...requiredPermissions) {

    return (req, res, next) => {

        const userPermissions = req.user?.permissions ?? [];

        const hasPermission = requiredPermissions.some((permission) =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next(new ForbiddenError("Vous n'avez pas la permission d'effectuer cette action."));
        }

        return next();

    };

}
