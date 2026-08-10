import { Router } from "express";

import rolesController from "./roles.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { validate } from "../../middleware/validate.js";
import { createRoleSchema, updateRoleSchema, roleIdParamSchema } from "./roles.schema.js";
import { PERMISSIONS } from "./roles.constants.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authorize(PERMISSIONS.ROLE_READ),
    rolesController.list
);

router.get(
    "/:id",
    authorize(PERMISSIONS.ROLE_READ),
    validate(roleIdParamSchema, "params"),
    rolesController.getById
);

router.post(
    "/",
    authorize(PERMISSIONS.ROLE_CREATE),
    validate(createRoleSchema, "body"),
    rolesController.create
);

router.patch(
    "/:id",
    authorize(PERMISSIONS.ROLE_UPDATE),
    validate(roleIdParamSchema, "params"),
    validate(updateRoleSchema, "body"),
    rolesController.update
);

router.delete(
    "/:id",
    authorize(PERMISSIONS.ROLE_DELETE),
    validate(roleIdParamSchema, "params"),
    rolesController.remove
);

export default router;
