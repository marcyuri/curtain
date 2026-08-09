import { AppError } from "./AppError.js";
import { ErrorCodes } from "./errorCodes.js";

export class ForbiddenError extends AppError {

    constructor(message = "Permission denied.") {

        super(message, {
            statusCode: 403,
            code: ErrorCodes.PERMISSION_DENIED,
        });

    }

}
