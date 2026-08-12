import { Router } from "express";

import brandsController from "./brands.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { validate } from "../../middleware/validate.js";
import {
    createBrandSchema,
    updateBrandSchema,
    brandIdParamSchema,
    brandQuerySchema,
} from "./brands.schema.js";
import { PERMISSIONS } from "./brands.constants.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authorize(PERMISSIONS.BRAND_READ),
    validate(brandQuerySchema, "query"),
    brandsController.list
);

router.get(
    "/:id",
    authorize(PERMISSIONS.BRAND_READ),
    validate(brandIdParamSchema, "params"),
    brandsController.getById
);

router.post(
    "/",
    authorize(PERMISSIONS.BRAND_CREATE),
    validate(createBrandSchema, "body"),
    brandsController.create
);

router.patch(
    "/:id",
    authorize(PERMISSIONS.BRAND_UPDATE),
    validate(brandIdParamSchema, "params"),
    validate(updateBrandSchema, "body"),
    brandsController.update
);

router.delete(
    "/:id",
    authorize(PERMISSIONS.BRAND_DELETE),
    validate(brandIdParamSchema, "params"),
    brandsController.remove
);

export default router;
