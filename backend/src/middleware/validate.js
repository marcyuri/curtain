import { ValidationError } from "../errors/ValidationError.js";

// Document 13, Ch.9.2. Intercepte la requête, exécute
// schema.safeParse(req[source]) : en cas de succès, remplace
// req[source] par la donnée parsée et typée (le controller ne
// manipule jamais une donnée brute non validée) ; en cas d'échec,
// lève une ValidationError au format attendu par le Frontend
// (Document 07 Ch.13).

export function validate(schema, source = "body") {

    return (req, res, next) => {

        const result = schema.safeParse(req[source]);

        if (!result.success) {

            const details = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));

            return next(new ValidationError("Validation failed.", details));

        }

        req[source] = result.data;

        return next();

    };

}
