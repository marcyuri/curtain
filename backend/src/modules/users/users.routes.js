import { Router } from "express";

import usersController from "./users.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { validate } from "../../middleware/validate.js";
import {
    createUserSchema,
    updateUserSchema,
    userIdParamSchema,
    userQuerySchema,
} from "./users.schema.js";
import { PERMISSIONS } from "./users.constants.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authorize(PERMISSIONS.USER_READ),
    validate(userQuerySchema, "query"),
    usersController.list
);

router.get(
    "/:id",
    authorize(PERMISSIONS.USER_READ),
    validate(userIdParamSchema, "params"),
    usersController.getById
);

router.post(
    "/",
    authorize(PERMISSIONS.USER_CREATE),
    validate(createUserSchema, "body"),
    usersController.create
);

router.patch(
    "/:id",
    authorize(PERMISSIONS.USER_UPDATE),
    validate(userIdParamSchema, "params"),
    validate(updateUserSchema, "body"),
    usersController.update
);

router.delete(
    "/:id",
    authorize(PERMISSIONS.USER_DELETE),
    validate(userIdParamSchema, "params"),
    usersController.remove
);

export default router;
