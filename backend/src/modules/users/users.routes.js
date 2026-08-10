import { Router } from "express";

import usersController from "./users.controller.js";
import { validate } from "../../middleware/validate.js";
import {
    createUserSchema,
    updateUserSchema,
    userIdParamSchema,
    userQuerySchema,
} from "./users.schema.js";

// ⚠️ TEMPORAIRE : voir permissions.routes.js et roles.routes.js —
// authenticate/authorize arrivent à l'Étape 9. À sécuriser avec
// authorize("user.read"), authorize("user.create"),
// authorize("user.update"), authorize("user.delete").

const router = Router();

router.get(
    "/",
    validate(userQuerySchema, "query"),
    usersController.list
);

router.get(
    "/:id",
    validate(userIdParamSchema, "params"),
    usersController.getById
);

router.post(
    "/",
    validate(createUserSchema, "body"),
    usersController.create
);

router.patch(
    "/:id",
    validate(userIdParamSchema, "params"),
    validate(updateUserSchema, "body"),
    usersController.update
);

router.delete(
    "/:id",
    validate(userIdParamSchema, "params"),
    usersController.remove
);

export default router;
