import { Router } from "express";

import categoriesController from "./categories.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { validate } from "../../middleware/validate.js";
import {
    createCategorySchema,
    updateCategorySchema,
    categoryIdParamSchema,
    categoryQuerySchema,
} from "./categories.schema.js";
import { PERMISSIONS } from "./categories.constants.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authorize(PERMISSIONS.CATEGORY_READ),
    validate(categoryQuerySchema, "query"),
    categoriesController.list
);

router.get(
    "/:id",
    authorize(PERMISSIONS.CATEGORY_READ),
    validate(categoryIdParamSchema, "params"),
    categoriesController.getById
);

router.post(
    "/",
    authorize(PERMISSIONS.CATEGORY_CREATE),
    validate(createCategorySchema, "body"),
    categoriesController.create
);

router.patch(
    "/:id",
    authorize(PERMISSIONS.CATEGORY_UPDATE),
    validate(categoryIdParamSchema, "params"),
    validate(updateCategorySchema, "body"),
    categoriesController.update
);

router.delete(
    "/:id",
    authorize(PERMISSIONS.CATEGORY_DELETE),
    validate(categoryIdParamSchema, "params"),
    categoriesController.remove
);

export default router;
