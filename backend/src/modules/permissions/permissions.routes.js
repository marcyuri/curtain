import { Router } from "express";

import permissionsController from "./permissions.controller.js";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { PERMISSIONS } from "./permissions.constants.js";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize(PERMISSIONS.PERMISSION_READ),
    permissionsController.list
);

export default router;
