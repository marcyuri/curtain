import { AppError } from "./AppError.js";
import { ErrorCodes } from "./errorCodes.js";

export class ConflictError extends AppError {

    constructor(message = "Conflict.", code = ErrorCodes.CONFLICT) {

        super(message, {
            statusCode: 409,
            code,
        });

    }

}
