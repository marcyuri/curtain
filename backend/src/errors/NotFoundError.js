import { AppError } from "./AppError.js";
import { ErrorCodes } from "./errorCodes.js";

export class NotFoundError extends AppError {

    constructor(message = "Resource not found.") {

        super(message, {
            statusCode: 404,
            code: ErrorCodes.NOT_FOUND,
        });

    }

}
