import { Router } from "express";

import rolesController from "./roles.controller.js";
import { validate } from "../../middleware/validate.js";
import { createRoleSchema, updateRoleSchema, roleIdParamSchema } from "./roles.schema.js";

// ⚠️ TEMPORAIRE : voir permissions.routes.js — authenticate/authorize
// arrivent à l'Étape 9. À sécuriser avec authorize("role.read"),
// authorize("role.create"), authorize("role.update"),
// authorize("role.delete") dès que ces middlewares existeront.

const router = Router();

router.get("/", rolesController.list);

router.get(
    "/:id",
    validate(roleIdParamSchema, "params"),
    rolesController.getById
);

router.post(
    "/",
    validate(createRoleSchema, "body"),
    rolesController.create
);

router.patch(
    "/:id",
    validate(roleIdParamSchema, "params"),
    validate(updateRoleSchema, "body"),
    rolesController.update
);

router.delete(
    "/:id",
    validate(roleIdParamSchema, "params"),
    rolesController.remove
);

export default router;
