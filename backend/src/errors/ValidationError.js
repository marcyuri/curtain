import { AppError } from "./AppError.js";
import { ErrorCodes } from "./errorCodes.js";

export class ValidationError extends AppError {

    constructor(message = "Validation failed.", details = null) {

        super(message, {
            statusCode: 400,
            code: ErrorCodes.VALIDATION_FAILED,
            details,
        });

    }

}
