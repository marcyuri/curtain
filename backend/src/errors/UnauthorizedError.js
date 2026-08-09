import { AppError } from "./AppError.js";
import { ErrorCodes } from "./errorCodes.js";

export class UnauthorizedError extends AppError {

    constructor(message = "Authentication required.", code = ErrorCodes.UNAUTHORIZED) {

        super(message, {
            statusCode: 401,
            code,
        });

    }

}
